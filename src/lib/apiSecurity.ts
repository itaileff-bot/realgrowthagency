import 'server-only';
import { createHash } from 'node:crypto';
import { cookies } from 'next/headers';
import { requireAdminEnv } from './adminEnv';
import { isOwnerEmail } from './adminAccess';
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from './adminSession';

export type OwnerActor = { uid: string; email: string; role: 'owner' };

export function actorUid(email: string): string {
  return 'owner_' + createHash('sha256').update(email.trim().toLowerCase()).digest('hex').slice(0, 24);
}

/** Returns the verified owner from the session cookie, or null. For pages. */
export async function getOwnerSession(): Promise<OwnerActor | null> {
  requireAdminEnv();
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  const session = verifyAdminSessionToken(token);
  if (!session || !isOwnerEmail(session.email)) return null;
  return { uid: actorUid(session.email), email: session.email, role: 'owner' };
}

/** For API routes: throws UNAUTHORIZED or FORBIDDEN. */
export async function requireOwnerAdminActor(): Promise<OwnerActor> {
  requireAdminEnv();
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  const session = verifyAdminSessionToken(token);
  if (!session) throw new Error('UNAUTHORIZED');
  if (!isOwnerEmail(session.email)) throw new Error('FORBIDDEN');
  return { uid: actorUid(session.email), email: session.email, role: 'owner' };
}

/** Same-origin check for state-changing requests (CSRF defence in depth). */
export function assertSameOrigin(request: Request): void {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) throw new Error('ORIGIN_DENIED');
}
