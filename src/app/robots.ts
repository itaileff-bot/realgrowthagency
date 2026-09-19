import type { MetadataRoute } from 'next';

/**
 * Crawlers that train or retrieve for AI answers, named explicitly.
 *
 * Client proposals under /proposals are pitch documents prepared for a named
 * recipient. They present a third party's brand, results and rate card, so
 * they are kept out of both search and AI training corpora.
 *
 * The two crawler classes are handled differently on purpose, because
 * "Disallow" and "noindex" do not compose:
 *
 *   - Search crawlers are NOT disallowed here. Each proposal page serves
 *     `robots: noindex, nofollow, nocache`, and a crawler blocked from
 *     fetching the page can never read that directive. Blocking the path
 *     would leave a URL Google may still list from an external link, with no
 *     way to tell it not to. Letting the page be fetched is what gets it
 *     positively de-indexed.
 *   - Training and retrieval crawlers ARE disallowed, because robots.txt is
 *     the only lever that reliably applies to them, and the content is not
 *     ours to publish into someone else's model.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Meta-ExternalFetcher',
  'Amazonbot',
  'Bytespider',
  'CCBot',
  'cohere-ai',
  'DuckAssistBot',
  'MistralAI-User',
  'YouBot',
];

const PROPOSALS_PATH = '/proposals/';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: AI_CRAWLERS,
        allow: '/',
        disallow: [PROPOSALS_PATH],
      },
    ],
    sitemap: 'https://www.realgrowthagency.com/sitemap.xml',
  };
}
