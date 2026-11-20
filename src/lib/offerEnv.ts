/**
 * Environment validation for the free manual and paid training offers.
 * Everything here is optional: the pages degrade to an enquiry flow when a
 * service is not configured, so a missing key never takes the site down.
 * Values are never logged, only names.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SES_ENV = ['AWS_SES_REGION', 'AWS_SES_ACCESS_KEY_ID', 'AWS_SES_SECRET_ACCESS_KEY', 'SES_FROM_EMAIL'] as const;

export type OfferEnvReport = { stripe: boolean; stripeWebhook: boolean; ses: boolean; invalid: string[] };

export function checkOfferEnv(env: NodeJS.ProcessEnv = process.env): OfferEnvReport {
  const invalid: string[] = [];
  const key = env.STRIPE_SECRET_KEY?.trim() || '';
  const stripe = /^(sk|rk)_(test|live)_[A-Za-z0-9]+$/.test(key);
  if (key && !stripe) invalid.push('STRIPE_SECRET_KEY (expected sk_test_... or sk_live_...)');

  const hook = env.STRIPE_WEBHOOK_SECRET?.trim() || '';
  const stripeWebhook = /^whsec_[A-Za-z0-9+/=]+$/.test(hook);
  if (hook && !stripeWebhook) invalid.push('STRIPE_WEBHOOK_SECRET (expected whsec_...)');

  const present = SES_ENV.filter((name) => env[name]?.trim());
  let ses = present.length === SES_ENV.length;
  if (present.length > 0 && !ses) {
    invalid.push('SES (set all of: ' + SES_ENV.join(', ') + ')');
  }
  if (ses && !EMAIL.test(env.SES_FROM_EMAIL!.trim())) {
    invalid.push('SES_FROM_EMAIL (not an email address)');
    ses = false;
  }
  const notify = env.LEAD_NOTIFY_EMAIL?.trim() || '';
  if (notify && !EMAIL.test(notify)) invalid.push('LEAD_NOTIFY_EMAIL (not an email address)');

  return { stripe, stripeWebhook, ses, invalid };
}
