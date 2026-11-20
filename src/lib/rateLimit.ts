import 'server-only';
import { createHash } from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { checkAdminEnv } from './adminEnv';
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

/**
 * Limiter for PUBLIC routes (lead form, checkout). Uses the Firestore limiter
 * when Firebase is configured. When it is not, it falls back to a per-instance
 * in-memory window: weaker across serverless instances, but it keeps a public
 * route protected instead of leaving it unlimited or switching it off.
 */
const softBuckets = new Map<string, { count: number; resetAt: number }>();

export async function enforcePublicRateLimit(scope: string, identity: string, max: number, windowMs: number): Promise<void> {
  if (checkAdminEnv().ok) return enforceRateLimit(scope, identity, max, windowMs);
  const now = Date.now();
  if (softBuckets.size > 5_000) {
    for (const [key, bucket] of softBuckets) if (bucket.resetAt <= now) softBuckets.delete(key);
  }
  const key = `${scope}_${identity}`;
  const bucket = softBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    softBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  if (bucket.count >= max) throw new RateLimitError();
  bucket.count += 1;
}
