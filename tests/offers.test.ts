import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { checkOfferEnv } from '../src/lib/offerEnv';
import { verifyStripeSignature } from '../src/lib/stripeSignature';
import { formatPrice, MANUAL, TRAINING } from '../src/lib/training';

const SECRET = 'whsec_' + 'a'.repeat(32);
const sign = (body: string, t: number, secret = SECRET) =>
  `t=${t},v1=${createHmac('sha256', secret).update(`${t}.${body}`).digest('hex')}`;

test('stripe signature: valid, tampered, stale, wrong secret, malformed', () => {
  const now = 1_800_000_000_000;
  const t = now / 1000;
  const body = '{"type":"checkout.session.completed"}';
  assert.equal(verifyStripeSignature(body, sign(body, t), SECRET, now), true);
  assert.equal(verifyStripeSignature(body + ' ', sign(body, t), SECRET, now), false, 'tampered body');
  assert.equal(verifyStripeSignature(body, sign(body, t - 301), SECRET, now), false, 'stale timestamp');
  assert.equal(verifyStripeSignature(body, sign(body, t, 'whsec_other'), SECRET, now), false, 'wrong secret');
  assert.equal(verifyStripeSignature(body, `t=${t},v1=zz`, SECRET, now), false);
  assert.equal(verifyStripeSignature(body, `v1=${'a'.repeat(64)}`, SECRET, now), false, 'no timestamp');
  assert.equal(verifyStripeSignature(body, null, SECRET, now), false);
  assert.equal(verifyStripeSignature(body, sign(body, t), '', now), false);
  // A rotated secret sends two v1 values; either may match.
  assert.equal(verifyStripeSignature(body, `${sign(body, t, 'whsec_old')},${sign(body, t).split(',')[1]}`, SECRET, now), true);
});

test('offer env: everything optional, malformed values are reported by name', () => {
  const empty = checkOfferEnv({} as NodeJS.ProcessEnv);
  assert.deepEqual(empty, { stripe: false, stripeWebhook: false, ses: false, invalid: [] });

  const good = checkOfferEnv({
    STRIPE_SECRET_KEY: 'sk_test_abc123',
    STRIPE_WEBHOOK_SECRET: SECRET,
    AWS_SES_REGION: 'us-east-1',
    AWS_SES_ACCESS_KEY_ID: 'id',
    AWS_SES_SECRET_ACCESS_KEY: 'secret',
    SES_FROM_EMAIL: 'hello@example.com',
  } as unknown as NodeJS.ProcessEnv);
  assert.deepEqual(good, { stripe: true, stripeWebhook: true, ses: true, invalid: [] });

  const bad = checkOfferEnv({
    STRIPE_SECRET_KEY: 'pk_live_publishable',
    STRIPE_WEBHOOK_SECRET: 'nope',
    AWS_SES_REGION: 'us-east-1',
    LEAD_NOTIFY_EMAIL: 'not-an-email',
  } as unknown as NodeJS.ProcessEnv);
  assert.equal(bad.stripe, false);
  assert.equal(bad.stripeWebhook, false);
  assert.equal(bad.ses, false);
  assert.equal(bad.invalid.length, 4);
  assert.ok(!bad.invalid.join(' ').includes('pk_live_publishable'), 'values are never echoed');
});

test('training offer: price formats and manual file exists', async () => {
  assert.equal(formatPrice(120_000, 'usd'), '$1,200');
  assert.equal(formatPrice(99_950, 'usd'), '$999.50');
  assert.ok(Number.isInteger(TRAINING.priceCents) && TRAINING.priceCents >= 100);
  const { existsSync } = await import('node:fs');
  assert.ok(existsSync(`public${MANUAL.path}`), 'manual PDF is committed at the linked path');
});
