import type { Metadata } from 'next';
import Link from 'next/link';
import ManualRequestForm from '@/components/offers/ManualRequestForm';
import { SiteFooter, SiteNav } from '@/components/offers/SiteChrome';
import { checkAdminEnv } from '@/lib/adminEnv';
import { jsonLd, SITE_NAME, SITE_URL } from '@/lib/site';
import { MANUAL } from '@/lib/training';
import '@/styles/offers.css';

// The form mode depends on runtime configuration, so render per request.
export const dynamic = 'force-dynamic';

const title = 'Free Website Builder Manual: Build Your Own Site Step by Step';
const description =
  'A free 22-page manual for people who have never built a website. GitHub and Vercel setup, the benchmark method, favicon, SEO, AI search, social and back end, in order.';

export const metadata: Metadata = {
  title: { absolute: `${title} | ${SITE_NAME}` },
  description,
  alternates: { canonical: '/free-website-manual' },
  openGraph: { title, description, url: `${SITE_URL}/free-website-manual`, siteName: SITE_NAME, type: 'website', images: ['/opengraph-image'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/twitter-image'] },
};

const parts = [
  'Set up GitHub, Vercel, your domain and your Google tools the right way',
  'Use three to five benchmark websites as a reference, without copying them',
  'Prepare a brand kit, a full favicon set and a social share image',
  'Build the site with Claude Code using paste-ready instructions',
  'Go live on your own domain with a launch-day checklist',
  'SEO: titles, schema, sitemap, Search Console and content',
  'AI search (GEO): get read and quoted by ChatGPT, Claude and Perplexity',
  'Social previews, analytics, forms, email and security',
];

const faqs = [
  {
    q: 'Do I need to know how to code?',
    a: 'No. The manual shows you how to describe what you want in plain English and have an AI coding assistant write the site, while you make the decisions and check the work.',
  },
  {
    q: 'How long does it take to build a website with the manual?',
    a: 'Plan for two focused days: one to set up accounts, prepare your brand kit, build and go live, and a second for SEO, AI search, social and back end setup.',
  },
  {
    q: 'What does it cost to run a site built this way?',
    a: 'GitHub and Vercel have free plans to start. You pay for a domain name, usually 10 to 20 US dollars a year, and a Claude subscription for the AI assistant.',
  },
  {
    q: 'What if I get stuck?',
    a: 'You can book our live website training, where we work through the manual with you on your own site over four one-to-one sessions.',
  },
];

export default function FreeWebsiteManualPage() {
  const mode = checkAdminEnv().ok ? 'api' : 'fallback';
  const pageJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/free-website-manual#webpage`,
        url: `${SITE_URL}/free-website-manual`,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageJsonLd) }} />
      <SiteNav />
      <main>
        <section className="offer-hero">
          <div className="container offer-grid">
            <div>
              <div className="section-label">Free download</div>
              <h1 className="section-title">Build your own website, step by step</h1>
              <p className="offer-lead">
                {MANUAL.title} is a free {MANUAL.pages}-page guide for people who have never built a website. Follow
                ten parts in order and finish with a live site on your own domain that Google and AI assistants can
                find.
              </p>
              <ul className="offer-list">
                {parts.map((part) => (
                  <li key={part}>{part}</li>
                ))}
              </ul>
            </div>
            <ManualRequestForm mode={mode} thanksUrl={`${SITE_URL}/free-website-manual/thanks`} />
          </div>
        </section>

        <section className="offer-section">
          <div className="container">
            <h2>Common questions</h2>
            <div className="offer-faq">
              {faqs.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
            <p className="offer-lead" style={{ marginTop: 28 }}>
              Prefer to build it with a guide beside you? <Link href="/website-training">See the live website training</Link>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
