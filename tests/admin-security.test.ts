import test from 'node:test';
import assert from 'node:assert/strict';
import { isOwnerEmail } from '../src/lib/adminAccess';
import { createAdminSessionToken, verifyAdminSessionToken } from '../src/lib/adminSession';
import { hashAdminPassword, verifyAdminPassword } from '../src/lib/adminPassword';
import { checkAdminEnv } from '../src/lib/adminEnv';

const KEY = 'k'.repeat(40);
const env = { ADMIN_OWNER_EMAILS: ' Owner@Example.com , not-an-email ' } as unknown as NodeJS.ProcessEnv;

test('owner allowlist: listed owners and developer only, case-insensitive', () => {
  assert.equal(isOwnerEmail('owner@example.com', env), true);
  assert.equal(isOwnerEmail('  OWNER@EXAMPLE.COM ', env), true);
  assert.equal(isOwnerEmail('Itai.leff@gmail.com', env), true);
  assert.equal(isOwnerEmail('manager@example.com', env), false);
  assert.equal(isOwnerEmail('not-an-email', env), false);
  assert.equal(isOwnerEmail('', env), false);
  assert.equal(isOwnerEmail(null, env), false);
});

test('session tokens verify, expire and reject tampering', () => {
  const now = Date.now();
  const token = createAdminSessionToken('Owner@Example.com', now, KEY);
  assert.equal(verifyAdminSessionToken(token, now, KEY)?.email, 'owner@example.com');
  assert.equal(verifyAdminSessionToken(token, now + 9 * 3600_000, KEY), null, 'expired after 8h');
  assert.equal(verifyAdminSessionToken(token, now, 'x'.repeat(40)), null, 'wrong secret');
  const [body, signature] = token.split('.');
  const forged = Buffer.from(JSON.stringify({ email: 'attacker@example.com', iat: 1, exp: 9e9, nonce: 'a' })).toString('base64url');
  assert.equal(verifyAdminSessionToken(`${forged}.${signature}`, now, KEY), null, 'forged payload');
  assert.equal(verifyAdminSessionToken(`${body}.${signature}.x`, now, KEY), null);
  assert.equal(verifyAdminSessionToken('', now, KEY), null);
  assert.equal(verifyAdminSessionToken(undefined, now, KEY), null);
});

test('short session secret is refused', () => {
  assert.throws(() => createAdminSessionToken('a@b.co', Date.now(), 'short'));
  assert.equal(verifyAdminSessionToken('a.b', Date.now(), 'short'), null);
});

test('scrypt password hash verifies only the right password', async () => {
  const hash = await hashAdminPassword('correct horse battery');
  assert.equal(await verifyAdminPassword('correct horse battery', hash), true);
  assert.equal(await verifyAdminPassword('wrong password!!', hash), false);
  assert.equal(await verifyAdminPassword('correct horse battery', 'garbage'), false);
  assert.equal(await verifyAdminPassword('x', 'scrypt$1$8$1$AAAA$BBBB'), false, 'weak params rejected');
  await assert.rejects(() => hashAdminPassword('short'));
});

test('env validation reports missing and malformed values by name', () => {
  const empty = checkAdminEnv({} as NodeJS.ProcessEnv);
  assert.equal(empty.ok, false);
  assert.ok(empty.missing.includes('ADMIN_SESSION_SECRET'));
  const bad = checkAdminEnv({
    ADMIN_SESSION_SECRET: 'short', ADMIN_OWNER_EMAILS: 'a@b.co', ADMIN_PASSWORD_HASH: 'plain',
    FIREBASE_PROJECT_ID: 'p', FIREBASE_CLIENT_EMAIL: 'c', FIREBASE_PRIVATE_KEY: 'nope',
  } as unknown as NodeJS.ProcessEnv);
  assert.equal(bad.ok, false);
  assert.equal(bad.invalid.length, 3);
});
