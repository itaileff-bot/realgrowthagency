import { randomUUID } from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { AdminConfigError } from '@/lib/adminEnv';
import { assertSameOrigin, requireOwnerAdminActor } from '@/lib/apiSecurity';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { enforceRateLimit, RateLimitError } from '@/lib/rateLimit';
import { buildTemplatePlan, type MarketingRun } from '@/lib/marketingManagement/planner';
import { enhanceMarketingPlan } from '@/lib/marketingManagement/gemini';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

const schema = z
  .object({
    audience: z.string().trim().min(3).max(200),
    goal: z.string().trim().min(3).max(300),
    tone: z.string().trim().min(3).max(200),
    publicFacts: z.string().trim().max(3000),
    competitorNotes: z.string().trim().max(3000),
    campaign: z.string().trim().min(1).max(80),
    mode: z.enum(['templates', 'gemini']),
  })
  .strict();
const LIMIT = 12_000;
const HOUR = 3_600_000;

function reply(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

async function readBody(request: Request) {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new Error('INVALID_INPUT');
  if (Number(request.headers.get('content-length') || 0) > LIMIT) throw new Error('BODY_TOO_LARGE');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('INVALID_INPUT');
  let bytes = 0;
  let content = '';
  const decoder = new TextDecoder('utf-8', { fatal: true });
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      bytes += part.value.byteLength;
      if (bytes > LIMIT) {
        await reader.cancel();
        throw new Error('BODY_TOO_LARGE');
      }
      content += decoder.decode(part.value, { stream: true });
    }
    content += decoder.decode();
    try {
      return schema.parse(JSON.parse(content));
    } catch {
      throw new Error('INVALID_INPUT');
    }
  } finally {
    reader.releaseLock();
  }
}

function failure(error: unknown, requestId: string, action: string) {
  if (error instanceof AdminConfigError) return reply({ ok: false, error: 'Owner admin is not configured yet.', reference: requestId }, 503);
  if (error instanceof RateLimitError) return reply({ ok: false, error: 'Marketing limit reached. Try again next hour.', reference: requestId }, 429);
  const message = error instanceof Error ? error.message : '';
  const known: Record<string, [number, string]> = {
    UNAUTHORIZED: [401, 'Owner admin login required.'],
    FORBIDDEN: [403, 'Owner access required.'],
    ORIGIN_DENIED: [403, 'Request origin denied.'],
    INVALID_INPUT: [400, 'Enter a valid public marketing brief.'],
    BODY_TOO_LARGE: [413, 'The marketing brief is too large.'],
  };
  const [status, text] = known[message] || [500, 'Marketing workspace is unavailable. Your previous draft is unchanged.'];
  // Never log the brief, provider output, session, key or raw exception.
  console.warn('[marketing-management]', { requestId, action, category: known[message] ? message : 'SERVER_ERROR' });
  return reply({ ok: false, error: text, reference: requestId }, status);
}

export async function POST(request: Request) {
  const requestId = randomUUID();
  try {
    const actor = await requireOwnerAdminActor();
    assertSameOrigin(request);
    const brief = await readBody(request);
    await enforceRateLimit('marketing_run', actor.uid, 5, HOUR);
    let plan = buildTemplatePlan(brief);
    let provider: MarketingRun['provider'] = 'templates';
    let model: string | null = null;
    let notice = 'Template mode: no external AI request. Drafts require owner review.';
    if (brief.mode === 'gemini') {
      try {
        const enhanced = await enhanceMarketingPlan(brief, plan);
        plan = enhanced.plan;
        provider = 'gemini';
        model = enhanced.model;
        notice = 'Gemini draft: provider quota or billing applies. No browsing or fact checking occurred. Owner review required.';
      } catch (error) {
        const code = error instanceof Error ? error.message : '';
        const reason = code === 'GEMINI_NOT_CONFIGURED' ? 'Gemini is not configured.' : 'Gemini did not return a valid draft in time.';
        notice = `${reason} The template draft is shown instead.`;
        console.warn('[marketing-management]', { requestId, action: 'ai-fallback', category: code === 'GEMINI_NOT_CONFIGURED' ? code : 'AI_UNAVAILABLE' });
      }
    }
    const run: MarketingRun = { id: requestId, generatedAt: new Date().toISOString(), status: 'draft', provider, model, notice, brief, plan };
    const db = getAdminDb();
    const batch = db.batch();
    // Run and audit commit together: no unlogged success.
    batch.create(db.collection('marketingManagementRuns').doc(requestId), { ...run, createdAt: FieldValue.serverTimestamp(), createdBy: actor.uid });
    batch.create(db.collection('auditLogs').doc(), {
      action: 'marketing_management_draft_created',
      actorUid: actor.uid,
      actorEmail: actor.email,
      details: { runId: requestId, provider, model, documentCount: 5, draftCount: 7 },
      createdAt: FieldValue.serverTimestamp(),
    });
    await batch.commit();
    return reply({ ok: true, run });
  } catch (error) {
    return failure(error, requestId, 'run');
  }
}

export async function GET() {
  const requestId = randomUUID();
  try {
    const actor = await requireOwnerAdminActor();
    await enforceRateLimit('marketing_history', actor.uid, 30, HOUR);
    const db = getAdminDb();
    const snapshot = await db.collection('marketingManagementRuns').orderBy('createdAt', 'desc').limit(10).get();
    const runs = snapshot.docs.map((document) => {
      const data = document.data();
      return {
        id: document.id,
        generatedAt: String(data.generatedAt || ''),
        status: 'draft',
        provider: data.provider,
        model: data.model,
        notice: data.notice,
        brief: data.brief,
        plan: data.plan,
      };
    });
    await db.collection('auditLogs').add({
      action: 'marketing_management_history_read',
      actorUid: actor.uid,
      actorEmail: actor.email,
      details: { count: runs.length },
      createdAt: FieldValue.serverTimestamp(),
    });
    return reply({ ok: true, runs });
  } catch (error) {
    return failure(error, requestId, 'history');
  }
}
