import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTemplatePlan, campaignUrl, planAsMarkdown, type MarketingBrief, type MarketingRun } from '../src/lib/marketingManagement/planner';

const brief: MarketingBrief = { audience: 'Startup founders', goal: 'Book discovery calls', tone: 'Direct', publicFacts: '', competitorNotes: '', campaign: 'test & #campaign', mode: 'templates' };

test('template output has five unique documents and seven unique channel drafts', () => {
  const plan = buildTemplatePlan(brief);
  assert.equal(plan.documents.length, 5);
  assert.equal(new Set(plan.documents.map((item) => item.title)).size, 5);
  assert.equal(plan.drafts.length, 7);
  assert.equal(new Set(plan.drafts.map((item) => item.channel)).size, 7);
  assert.ok(plan.documents.find((item) => item.title === 'Competitor analysis')?.body.includes('No competitor evidence'));
  assert.ok(plan.drafts.find((item) => item.channel === 'Reddit')?.body.startsWith('Disclosure:'));
  assert.ok(plan.drafts.find((item) => item.channel === 'Video brief')?.body.includes('no video is rendered'));
  assert.ok(!JSON.stringify(plan).toLowerCase().includes('dr rob'), 'no DrRob content leaks into RGA');
});

test('campaign links cannot escape the agency origin', () => {
  const url = new URL(campaignUrl('https://evil.example/?x=<script>&#test', 'linkedin'));
  assert.equal(url.origin, 'https://www.realgrowthagency.com');
  assert.equal(url.pathname, '/');
  assert.equal(url.searchParams.get('utm_campaign'), 'https://evil.example/?x=<script>&#test');
  assert.equal(url.hash, '#contact');
});

test('research links encode user input and stay https', () => {
  const plan = buildTemplatePlan({ ...brief, audience: 'javascript:alert(1) & #?' });
  for (const link of plan.researchLinks) assert.equal(new URL(link.url).protocol, 'https:');
  assert.ok(plan.researchLinks.find((link) => link.label.includes('Reddit'))?.url.includes('%26'));
});

test('export includes provenance, all documents and all drafts', () => {
  const run: MarketingRun = { id: 'test-run', generatedAt: '2026-10-13T00:00:00Z', status: 'draft', provider: 'templates', model: null, notice: 'n', brief, plan: buildTemplatePlan(brief) };
  const text = planAsMarkdown(run);
  assert.ok(text.includes('Run: test-run'));
  for (const document of run.plan.documents) assert.ok(text.includes('## ' + document.title));
  for (const draft of run.plan.drafts) assert.ok(text.includes('## ' + draft.channel + ':'));
});
