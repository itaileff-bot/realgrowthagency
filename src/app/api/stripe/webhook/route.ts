import { randomUUID } from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { checkAdminEnv } from '@/lib/adminEnv';
import { writeAuditLog } from '@/lib/auditLog';
import { notifyAddress, sendEmail } from '@/lib/email';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { checkOfferEnv } from '@/lib/offerEnv';
import { clientIp, enforcePublicRateLimit, RateLimitError } from '@/lib/rateLimit';
import { isCheckoutSessionId, type CheckoutSession } from '@/lib/stripe';
import { verifyStripeSignature } from '@/lib/stripeSignature';
import { formatPrice, TRAINING } from '@/lib/training';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const PAID_EVENTS = new Set(['checkout.session.completed', 'checkout.session.async_payment_succeeded']);

function reply(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

/**
 * Stripe webhook. The signature over the raw body is the authentication, so
 * there is no origin check. Records a paid training order and tells the owner.
 * Returns 500 on a storage failure so Stripe retries; order writes are keyed
 * by session id, so a retry never creates a duplicate.
 */
export async function POST(request: Request) {
  const requestId = randomUUID();
  try {
    if (!checkOfferEnv().stripeWebhook) return reply({ ok: false, error: 'Webhook not configured.' }, 503);
    if (Number(request.headers.get('content-length') || 0) > 500_000) return reply({ ok: false }, 413);
    await enforcePublicRateLimit('stripe_webhook_ip', clientIp(request), 300, 60_000);

    const raw = await request.text();
    if (!verifyStripeSignature(raw, request.headers.get('stripe-signature'), process.env.STRIPE_WEBHOOK_SECRET!.trim())) {
      return reply({ ok: false, error: 'Invalid signature.' }, 400);
    }
    const event = JSON.parse(raw) as { id?: string; type?: string; data?: { object?: CheckoutSession } };
    const session = event.data?.object;
    if (!event.type || !PAID_EVENTS.has(event.type) || !session) return reply({ ok: true, ignored: true });
    if (!isCheckoutSessionId(session.id) || session.metadata?.offer !== TRAINING.id || session.payment_status !== 'paid') {
      return reply({ ok: true, ignored: true });
    }

    const email = session.customer_details?.email || '';
    const name = session.customer_details?.name || '';
    const amount = formatPrice(session.amount_total ?? 0, session.currency || TRAINING.currency);

    if (checkAdminEnv().ok) {
      await getAdminDb().collection('trainingOrders').doc(session.id).set(
        {
          offer: TRAINING.id,
          email,
          name,
          amountTotal: session.amount_total ?? null,
          currency: session.currency ?? null,
          stripeEventId: event.id || null,
          status: 'paid',
          paidAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
      await writeAuditLog({
        action: 'training_order_paid',
        actorEmail: email || 'unknown',
        actorUid: 'stripe_webhook',
        details: { sessionId: session.id, requestId },
      });
    } else {
      console.warn('[stripe-webhook] order not stored: Firebase is not configured', { requestId, sessionId: session.id });
    }

    try {
      const owner = notifyAddress();
      if (owner) {
        await sendEmail({
          to: owner,
          subject: `New training enrolment: ${amount}`,
          text: `Package: ${TRAINING.name}\nAmount: ${amount}\nName: ${name}\nEmail: ${email}\nStripe session: ${session.id}`,
        });
      }
    } catch (error) {
      console.error('[stripe-webhook] sendEmail failed', { requestId, category: error instanceof Error ? error.name : 'unknown' });
    }
    return reply({ ok: true });
  } catch (error) {
    if (error instanceof RateLimitError) return reply({ ok: false }, 429);
    console.error('[stripe-webhook] POST failed', { requestId, category: error instanceof Error ? error.message : 'SERVER_ERROR' });
    return reply({ ok: false, reference: requestId }, 500);
  }
}
