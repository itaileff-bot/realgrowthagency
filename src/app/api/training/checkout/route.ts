import { randomUUID } from 'node:crypto';
import { assertSameOrigin } from '@/lib/apiSecurity';
import { clientIp, enforcePublicRateLimit, RateLimitError } from '@/lib/rateLimit';
import { createTrainingCheckout, StripeConfigError } from '@/lib/stripe';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function reply(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

/**
 * Starts a Stripe Checkout session for the training package. The request has
 * no body: product and price come from src/lib/training.ts on the server, so
 * a caller cannot change the amount.
 */
export async function POST(request: Request) {
  const requestId = randomUUID();
  try {
    assertSameOrigin(request);
    if (Number(request.headers.get('content-length') || 0) > 100) throw new Error('INVALID_INPUT');
    await enforcePublicRateLimit('checkout_ip', clientIp(request), 10, 60 * 60_000);
    const session = await createTrainingCheckout(new URL(request.url).origin);
    if (!session.url) throw new Error('STRIPE_NO_URL');
    return reply({ ok: true, url: session.url });
  } catch (error) {
    const code = error instanceof Error ? error.message : '';
    if (error instanceof RateLimitError) return reply({ ok: false, error: 'Too many attempts. Please try again later.' }, 429);
    if (code === 'ORIGIN_DENIED') return reply({ ok: false, error: 'Request origin denied.' }, 403);
    if (code === 'INVALID_INPUT') return reply({ ok: false, error: 'Invalid request.' }, 400);
    if (error instanceof StripeConfigError) return reply({ ok: false, error: 'Online payment is not available yet. Please contact us to enrol.' }, 503);
    console.error('[training-checkout] POST failed', { requestId, category: code || 'SERVER_ERROR' });
    return reply({ ok: false, error: 'We could not start the payment. Please try again.', reference: requestId }, 502);
  }
}
