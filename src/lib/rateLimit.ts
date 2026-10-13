import 'server-only';
import { createHash } from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from './firebaseAdmin';

/**
 * Fixed-window limiter stored in Firestore so it holds across serverless
 * instances. It fails CLOSED: if Firestore is unreachable the request is
 * refused, because every caller is a sensitive admin route.
 */
export class RateLimitError extends Error {
  constructor() {
    super('RATE_LIMITED');
  }
}

export async function enforceRateLimit(scope: string, identity: string, max: number, windowMs: number): Promise<void> {
  const bucket = Math.floor(Date.now() / windowMs);
  const fingerprint = createHash('sha256').update(identity).digest('hex').slice(0, 40);
  const db = getAdminDb();
  const ref = db.collection('rateLimits').doc(`${scope}_${fingerprint}_${bucket}`);
  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const count = Number(snapshot.data()?.count || 0);
    if (count >= max) throw new RateLimitError();
    transaction.set(ref, {
      count: count + 1,
      scope,
      updatedAt: FieldValue.serverTimestamp(),
      expiresAt: new Date((bucket + 2) * windowMs),
    });
  });
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for') || '';
  return forwarded.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}
