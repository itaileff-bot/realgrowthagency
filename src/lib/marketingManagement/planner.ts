export type MarketingBrief = {
  audience: string;
  goal: string;
  tone: string;
  publicFacts: string;
  competitorNotes: string;
  campaign: string;
  mode: 'templates' | 'gemini';
};
export type MarketingDocument = { title: string; body: string };
export type MarketingDraft = { channel: string; title: string; body: string };
export type MarketingPlan = {
  documents: MarketingDocument[];
  drafts: MarketingDraft[];
  researchLinks: { label: string; url: string }[];
  checklist: string[];
};
export type MarketingRun = {
  id: string;
  generatedAt: string;
  status: 'draft';
  provider: 'templates' | 'gemini';
  model: string | null;
  notice: string;
  brief: MarketingBrief;
  plan: MarketingPlan;
};

export const SITE = 'https://www.realgrowthagency.com';
export const MARKETING_DOCUMENT_TITLES = [
  'Product information', 'Marketing strategy', 'Competitor analysis', 'Brand voice', 'Content strategy',
] as const;
export const MARKETING_DRAFT_CHANNELS = [
  'Article', 'LinkedIn', 'X', 'Reddit', 'Influencer brief', 'Video brief', 'GEO',
] as const;

/** Campaign links always land on the agency site; user input only fills query values. */
export function campaignUrl(campaign: string, source: string): string {
  const url = new URL('/', SITE);
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', 'organic');
  url.searchParams.set('utm_campaign', campaign);
  url.hash = 'contact';
  return url.toString();
}

export function researchLinks(audience: string) {
  const query = `web design SEO AI marketing agency ${audience}`;
  return [
    { label: 'Find public competitor pages', url: `https://www.google.com/search?q=${encodeURIComponent(query)}` },
    { label: 'Find relevant Reddit discussions', url: `https://www.reddit.com/search/?q=${encodeURIComponent(query)}` },
    { label: 'Find relevant creators (manual research)', url: `https://www.google.com/search?q=${encodeURIComponent('site:linkedin.com/in/ ' + query)}` },
    { label: 'Google Search Console (requires your account)', url: 'https://search.google.com/search-console' },
    { label: 'Google Analytics (requires your account)', url: 'https://analytics.google.com/' },
    { label: 'Real Growth Bot', url: 'https://www.real-growth-bot.com/landing' },
  ];
}

export function buildTemplatePlan(brief: MarketingBrief): MarketingPlan {
  const callToAction = 'Book a free 30 minute call';
  const facts = [
    'Source: src/app/page.tsx (public homepage, read at install time).',
    'Real Growth Agency is a Brand Refinery company offering brand identity, web development, digital marketing, SEO and content, app development and an AI Growth Engine.',
    'Process: discovery call (site, search and brand audited before the call), fixed-price proposal within two business days, build and launch on Next.js, React and Firebase, then Real Growth Bot for campaigns, SEO and monitoring.',
    'Published one-time packages: Starter $1,499, Growth $4,997, Scale $6,890. Check the live pricing section before quoting any price.',
    'Portfolio shown on the site: Famous Finds, A Rich Wines, Ape Beverages, Chef Prep For You.',
  ].join('\n');
  const sourceNotice = 'This is a template assembled from public site copy and your brief, not AI research. Owner-supplied notes below are unverified. No website or competitor was crawled.';
  return {
    documents: [
      { title: MARKETING_DOCUMENT_TITLES[0], body: `${facts}\n\n${sourceNotice}\n\nOwner-supplied public facts: ${brief.publicFacts || 'None supplied.'}` },
      { title: MARKETING_DOCUMENT_TITLES[1], body: `Audience: ${brief.audience}\nGoal: ${brief.goal}\nCampaign: ${brief.campaign}\n\nWeek 1: confirm public facts and approve one practical explainer for the audience.\nWeek 2: publish the explainer on the blog through the normal review workflow; share the LinkedIn and X drafts.\nWeek 3: join relevant public discussions only where helpful and permitted; shortlist suitable creators.\nWeek 4: compare Search Console and GA4 results with the starting period; keep what worked, rewrite weak messages.\n\nNo traffic, lead or ranking forecast is available. Record a real baseline before judging results.` },
      { title: MARKETING_DOCUMENT_TITLES[2], body: `Owner-supplied competitor observations:\n${brief.competitorNotes || 'No competitor evidence supplied. Use the research links to collect source URLs, dates, positioning, public prices and content examples.'}\n\nThese notes are not independently verified. Compare offer clarity, pricing transparency, proof of results and speed to launch. Do not infer competitors' revenue, ad spend or traffic from visible content.` },
      { title: MARKETING_DOCUMENT_TITLES[3], body: `Requested tone: ${brief.tone}\nAudience: ${brief.audience}\nGoal: ${brief.goal}\n\nPlain, direct language. Lead with the outcome for the client, then how we deliver it. Use real numbers only when they are published and current. No invented client results, testimonials, rankings or guarantees. Review all copy before publication.` },
      { title: MARKETING_DOCUMENT_TITLES[4], body: `Campaign: ${brief.campaign}\n\nPillar 1: what a startup needs before launching a website.\nPillar 2: how SEO and AI search visibility work for small brands.\nPillar 3: using AI marketing without a big team.\nPillar 4: case notes from published portfolio work.\n\nSuggested cadence: one reviewed article and two reviewed social posts per week. Channel order: blog, LinkedIn, X, then relevant community replies. This is a plan, not a scheduled job. UTM links identify the campaign; they do not prove conversions.` },
    ],
    drafts: [
      { channel: 'Article', title: 'What a startup actually needs before its website goes live', body: `Most early teams start with the website. The order that saves money is brand first, then site, then search and marketing.\n\n1. A clear brand: name, logo, colours and a one-line promise.\n2. A fast, mobile-first site that answers what you do, who it is for and how to book.\n3. Search basics: titles, descriptions, sitemap and pages written for the questions buyers ask, including AI search.\n4. A simple marketing engine that keeps publishing and measuring.\n\nReal Growth Agency builds all four under one roof, with fixed-price proposals inside two business days.\n\n${callToAction}: ${campaignUrl(brief.campaign, 'website')}` },
      { channel: 'LinkedIn', title: 'Brand, site, search: in that order', body: `Founders often build the website first and fix the brand later. It costs twice. Start with the brand, build the site on it, then switch on SEO and AI marketing. That is how we run every Real Growth Agency project, with a fixed-price proposal inside two business days.\n\n${callToAction}: ${campaignUrl(brief.campaign, 'linkedin')}` },
      { channel: 'X', title: 'Order of operations', body: `Brand first. Site second. Search and AI marketing third. Get the order right and the budget goes further. ${campaignUrl(brief.campaign, 'x')}` },
      { channel: 'Reddit', title: 'Reply draft: use only in a relevant discussion', body: 'Disclosure: I work with Real Growth Agency. If you are comparing agencies, ask each one for a fixed scope and price in writing, who owns the code and domain after launch, and how they handle SEO basics on day one. Those answers tell you more than a portfolio. Only post where self-promotion is allowed and it answers the actual question.' },
      { channel: 'Influencer brief', title: 'Creator selection and briefing', body: `Look for creators whose public audience overlaps with ${brief.audience}: founder, small-business and marketing educators. Verify identity, audience fit, past ad disclosures and claim accuracy. No creator has been found or endorsed by this tool.\n\nBrief: a factual walkthrough of launching a brand and site in the right order. No invented results or guarantees. Owner review required; disclose any paid relationship.\n\nTrack each candidate, permission and decision in your own workflow. This tool sends no outreach.` },
      { channel: 'Video brief', title: '15-second order-of-operations explainer', body: `0 to 5 seconds: presenter asks, "Building your website first?"\n5 to 10 seconds: screen recording of the Real Growth Agency services section.\n10 to 15 seconds: presenter says, "Brand first, site second, growth third. Book a free call."\nEnd card: ${SITE}\n\nUse consenting talent or a clearly disclosed synthetic presenter. No client results unless published and approved. This is a production brief; no video is rendered.` },
      { channel: 'GEO', title: 'AI-search visibility review brief', body: 'Check that the homepage, blog and structured data state clearly who Real Growth Agency is, what it offers, prices and how to book. Keep these facts identical across the site, LinkedIn and Brand Refinery pages. Draft a short factual FAQ for owner review and ship it through the normal code review. Manually test a fixed set of AI-search questions and record date, answer and cited URLs. This workspace has no AI-search integration and reports no citation or ranking score.' },
    ],
    researchLinks: researchLinks(brief.audience),
    checklist: [
      'Check every statement against the live site; owner notes are not independently verified.',
      'Remove client confidential details and any unsupported result, ranking or guarantee.',
      'Review each draft for the audience and channel rules before copying or publishing.',
      'Record actual GA4 and Search Console results separately; analytics are not connected here.',
      'No automatic publishing, outreach, code editing, scheduled job or video rendering occurs.',
    ],
  };
}

export function planAsMarkdown(run: MarketingRun): string {
  return [
    '# Real Growth Agency marketing draft',
    `Run: ${run.id}\nGenerated: ${run.generatedAt}\nProvider: ${run.provider}\nStatus: ${run.status}\n\n${run.notice}`,
    ...run.plan.documents.map((document) => `## ${document.title}\n\n${document.body}`),
    ...run.plan.drafts.map((draft) => `## ${draft.channel}: ${draft.title}\n\n${draft.body}`),
    '## Review checklist\n\n' + run.plan.checklist.map((item) => '- ' + item).join('\n'),
    '## Research links\n\n' + run.plan.researchLinks.map((link) => `- [${link.label}](${link.url})`).join('\n'),
  ].join('\n\n');
}
