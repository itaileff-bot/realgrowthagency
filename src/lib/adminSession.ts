import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

/**
 * Stateless owner session: base64url(JSON payload) + "." + HMAC-SHA256.
 * The cookie is httpOnly, SameSite=Strict and Secure in production, so it is
 * never readable by page scripts and is not sent on cross-site requests.
 */
export const ADMIN_SESSION_COOKIE = 'rga_admin_session';
export const ADMIN_SESSION_TTL_SECONDS = 8 * 60 * 60;

export type AdminSession = { email: string; iat: number; exp: number; nonce: string };

function secret(explicit?: string): string {
  const value = (explicit ?? process.env.ADMIN_SESSION_SECRET ?? '').trim();
  if (value.length < 32) throw new Error('ADMIN_SESSION_SECRET_INVALID');
  return value;
}

function sign(body: string, key: string): string {
  return createHmac('sha256', key).update(body).digest('base64url');
}

export function createAdminSessionToken(email: string, now = Date.now(), key?: string): string {
  const iat = Math.floor(now / 1000);
  const payload: AdminSession = {
    email: email.trim().toLowerCase(),
    iat,
    exp: iat + ADMIN_SESSION_TTL_SECONDS,
    nonce: randomBytes(12).toString('base64url'),
  };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${body}.${sign(body, secret(key))}`;
}

export function verifyAdminSessionToken(
  token: string | undefined | null,
  now = Date.now(),
  key?: string,
): AdminSession | null {
  try {
    if (!token || token.length > 1024) return null;
    const [body, signature, extra] = token.split('.');
    if (!body || !signature || extra !== undefined) return null;
    const expected = Buffer.from(sign(body, secret(key)));
    const actual = Buffer.from(signature);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as Partial<AdminSession>;
    const seconds = Math.floor(now / 1000);
    if (typeof payload.email !== 'string' || typeof payload.exp !== 'number' || typeof payload.iat !== 'number') return null;
    if (payload.exp <= seconds || payload.iat > seconds + 60) return null;
    return payload as AdminSession;
  } catch {
    return null;
  }
}

export function adminCookieOptions(maxAge = ADMIN_SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge,
  };
}
