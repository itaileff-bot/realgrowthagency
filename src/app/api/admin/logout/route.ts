import { randomUUID } from 'node:crypto';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, adminCookieOptions, verifyAdminSessionToken } from '@/lib/adminSession';
import { actorUid, assertSameOrigin } from '@/lib/apiSecurity';
import { writeAuditLog } from '@/lib/auditLog';
import { clientIp, enforceRateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  const requestId = randomUUID();
  const jar = await cookies();
  try {
    assertSameOrigin(request);
    const session = verifyAdminSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value);
    // Clear first: signing out must work even if Firestore is down.
    jar.set(ADMIN_SESSION_COOKIE, '', adminCookieOptions(0));
    if (session) {
      try {
        await enforceRateLimit('logout_ip', clientIp(request), 30, 60 * 60_000);
        await writeAuditLog({ action: 'admin_logout', actorEmail: session.email, actorUid: actorUid(session.email), details: { requestId } });
      } catch (error) {
        console.warn('[admin-logout] audit skipped', { requestId, category: error instanceof Error ? error.message : 'UNKNOWN' });
      }
    }
    return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const code = error instanceof Error ? error.message : '';
    const status = code === 'ORIGIN_DENIED' ? 403 : 500;
    console.error('[admin-logout] POST failed', { requestId, category: code || 'SERVER_ERROR' });
    return Response.json({ ok: false, error: 'Sign out failed.', reference: requestId }, { status, headers: { 'Cache-Control': 'no-store' } });
  }
}
