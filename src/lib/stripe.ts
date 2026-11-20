import 'server-only';
import { checkOfferEnv } from './offerEnv';
import { TRAINING } from './training';

/**
 * Minimal Stripe client over fetch. Only two calls are needed (create and
 * read a Checkout Session), so the SDK is not installed. Card details are
 * entered on Stripe's hosted page and never touch this server.
 */
const API = 'https://api.stripe.com/v1';

export class StripeConfigError extends Error {
  constructor() {
    super('STRIPE_NOT_CONFIGURED');
  }
}

export type CheckoutSession = {
  id: string;
  url: string | null;
  payment_status: string;
  amount_total: number | null;
  currency: string | null;
  customer_details?: { email?: string | null; name?: string | null } | null;
  metadata?: Record<string, string> | null;
};

async function stripeRequest(path: string, body?: URLSearchParams): Promise<CheckoutSession> {
  if (!checkOfferEnv().stripe) throw new StripeConfigError();
  const response = await fetch(API + path, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY!.trim()}`,
      ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
    },
    body,
    cache: 'no-store',
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    // Stripe error bodies can echo request data; log the type and status only.
    const detail = (await response.json().catch(() => null)) as { error?: { type?: string; code?: string } } | null;
    throw new Error(`STRIPE_HTTP_${response.status}_${detail?.error?.code || detail?.error?.type || 'unknown'}`);
  }
  return (await response.json()) as CheckoutSession;
}

export async function createTrainingCheckout(origin: string): Promise<CheckoutSession> {
  const body = new URLSearchParams({
    mode: 'payment',
    success_url: `${origin}/website-training/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/website-training`,
    'line_items[0][quantity]': '1',
    'line_items[0][price_data][currency]': TRAINING.currency,
    'line_items[0][price_data][unit_amount]': String(TRAINING.priceCents),
    'line_items[0][price_data][product_data][name]': TRAINING.name,
    'line_items[0][price_data][product_data][description]': `${TRAINING.sessions} live one-to-one sessions of ${TRAINING.sessionMinutes} minutes.`,
    'metadata[offer]': TRAINING.id,
    'phone_number_collection[enabled]': 'true',
    allow_promotion_codes: 'true',
  });
  return stripeRequest('/checkout/sessions', body);
}

export function isCheckoutSessionId(value: unknown): value is string {
  return typeof value === 'string' && /^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(value);
}

export async function getCheckoutSession(id: string): Promise<CheckoutSession> {
  if (!isCheckoutSessionId(id)) throw new Error('INVALID_SESSION_ID');
  return stripeRequest(`/checkout/sessions/${id}`);
}
