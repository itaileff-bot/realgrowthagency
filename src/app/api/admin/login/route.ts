import { randomUUID } from 'node:crypto';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { AdminConfigError, requireAdminEnv } from '@/lib/adminEnv';
import { isOwnerEmail } from '@/lib/adminAccess';
import { verifyAdminPassword } from '@/lib/adminPassword';
import { ADMIN_SESSION_COOKIE, adminCookieOptions, createAdminSessionToken } from '@/lib/adminSession';
import { actorUid, assertSameOrigin } from '@/lib/apiSecurity';
import { writeAuditLog } from '@/lib/auditLog';
import { clientIp, enforceRateLimit, RateLimitError } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const schema = z
  .object({
    email: z.string().trim().toLowerCase().email().max(200),
    password: z.string().min(1).max(200),
  })
  .strict();

function reply(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  const requestId = randomUUID();
  try {
    requireAdminEnv();
    assertSameOrigin(request);
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new Error('INVALID_INPUT');
    if (Number(request.headers.get('content-length') || 0) > 2_000) throw new Error('INVALID_INPUT');
    const parsed = schema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) throw new Error('INVALID_INPUT');
    const { email, password } = parsed.data;

    // Two windows: per IP and per email, both 10 attempts per 15 minutes.
    await enforceRateLimit('login_ip', clientIp(request), 10, 15 * 60_000);
    await enforceRateLimit('login_email', email, 10, 15 * 60_000);

    // Always run the hash, even for unknown emails, so timing reveals nothing.
    const passwordOk = await verifyAdminPassword(password, process.env.ADMIN_PASSWORD_HASH!);
    const allowed = passwordOk && isOwnerEmail(email);

    await writeAuditLog({
      action: allowed ? 'admin_login_success' : 'admin_login_failed',
      actorEmail: email,
      actorUid: actorUid(email),
      details: { requestId },
    });
    if (!allowed) return reply({ ok: false, error: 'Email or password is incorrect.' }, 401);

    (await cookies()).set(ADMIN_SESSION_COOKIE, createAdminSessionToken(email), adminCookieOptions());
    return reply({ ok: true });
  } catch (error) {
    const code = error instanceof Error ? error.message : '';
    if (error instanceof AdminConfigError) return reply({ ok: false, error: 'Owner admin is not configured yet.', reference: requestId }, 503);
    if (error instanceof RateLimitError) return reply({ ok: false, error: 'Too many attempts. Try again in 15 minutes.' }, 429);
    if (code === 'ORIGIN_DENIED') return reply({ ok: false, error: 'Request origin denied.' }, 403);
    if (code === 'INVALID_INPUT') return reply({ ok: false, error: 'Enter a valid email and password.' }, 400);
    console.error('[admin-login] POST failed', { requestId, category: code || 'SERVER_ERROR' });
    return reply({ ok: false, error: 'Login is unavailable right now.', reference: requestId }, 500);
  }
}
