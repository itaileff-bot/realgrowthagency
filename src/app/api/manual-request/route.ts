import { randomUUID } from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { AdminConfigError } from '@/lib/adminEnv';
import { assertSameOrigin } from '@/lib/apiSecurity';
import { escapeHtml, notifyAddress, sendEmail } from '@/lib/email';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { clientIp, enforcePublicRateLimit, RateLimitError } from '@/lib/rateLimit';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { MANUAL } from '@/lib/training';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const schema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().toLowerCase().email().max(200),
    // Honeypot: hidden from people, filled in by bots.
    company: z.string().max(200).optional(),
  })
  .strict();

function reply(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

/** Free manual request: saves the lead, emails the link, returns the download path. */
export async function POST(request: Request) {
  const requestId = randomUUID();
  try {
    assertSameOrigin(request);
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new Error('INVALID_INPUT');
    if (Number(request.headers.get('content-length') || 0) > 2_000) throw new Error('INVALID_INPUT');
    const parsed = schema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) throw new Error('INVALID_INPUT');
    const { name, email, company } = parsed.data;

    await enforcePublicRateLimit('manual_ip', clientIp(request), 5, 60 * 60_000);
    // A filled honeypot gets the same answer as a real person, with nothing stored.
    if (company) return reply({ ok: true, downloadUrl: MANUAL.path });
    await enforcePublicRateLimit('manual_email', email, 3, 24 * 60 * 60_000);

    await getAdminDb().collection('leads').add({
      name,
      email,
      source: 'free-website-manual',
      requestId,
      createdAt: FieldValue.serverTimestamp(),
    });

    // Email is best effort: the lead is already saved and the page shows the download.
    const link = SITE_URL + MANUAL.path;
    try {
      await sendEmail({
        to: email,
        subject: `Your copy of ${MANUAL.title}`,
        text: `Hi ${name},\n\nHere is your copy of ${MANUAL.title}:\n${link}\n\nIf you would like us to guide you through it live, see ${SITE_URL}/website-training\n\n${SITE_NAME}`,
        html: `<p>Hi ${escapeHtml(name)},</p><p>Here is your copy of <strong>${escapeHtml(MANUAL.title)}</strong>:</p><p><a href="${link}">Download the manual (PDF)</a></p><p>If you would like us to guide you through it live, see <a href="${SITE_URL}/website-training">our website training</a>.</p><p>${SITE_NAME}</p>`,
      });
      const owner = notifyAddress();
      if (owner) {
        await sendEmail({
          to: owner,
          subject: 'New free manual lead',
          text: `Name: ${name}\nEmail: ${email}\nSource: free website manual\nReference: ${requestId}`,
        });
      }
    } catch (error) {
      console.error('[manual-request] sendEmail failed', { requestId, category: error instanceof Error ? error.name : 'unknown' });
    }

    return reply({ ok: true, downloadUrl: MANUAL.path });
  } catch (error) {
    const code = error instanceof Error ? error.message : '';
    if (error instanceof RateLimitError) return reply({ ok: false, error: 'Too many requests. Please try again later.' }, 429);
    if (code === 'ORIGIN_DENIED') return reply({ ok: false, error: 'Request origin denied.' }, 403);
    if (code === 'INVALID_INPUT') return reply({ ok: false, error: 'Enter your name and a valid email address.' }, 400);
    if (error instanceof AdminConfigError) return reply({ ok: false, error: 'Downloads are unavailable right now.', reference: requestId }, 503);
    console.error('[manual-request] POST failed', { requestId, category: code || 'SERVER_ERROR' });
    return reply({ ok: false, error: 'Something went wrong. Please try again.', reference: requestId }, 500);
  }
}
