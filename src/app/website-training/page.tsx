import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter, SiteNav } from '@/components/offers/SiteChrome';
import TrainingCheckoutButton from '@/components/offers/TrainingCheckoutButton';
import { checkOfferEnv } from '@/lib/offerEnv';
import { jsonLd, SITE_NAME, SITE_URL } from '@/lib/site';
import { formatPrice, TRAINING } from '@/lib/training';
import '@/styles/offers.css';

// The pay button depends on runtime configuration, so render per request.
export const dynamic = 'force-dynamic';

const price = formatPrice(TRAINING.priceCents, TRAINING.currency);
const title = 'Website Training: Build Your Own Site With a Live Guide';
const description = `${TRAINING.sessions} live one-to-one sessions that take you from no website to a live, search-ready site you own. ${price}, fixed price.`;

export const metadata: Metadata = {
  title: { absolute: `${title} | ${SITE_NAME}` },
  description,
  alternates: { canonical: '/website-training' },
  openGraph: { title, description, url: `${SITE_URL}/website-training`, siteName: SITE_NAME, type: 'website', images: ['/opengraph-image'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/twitter-image'] },
};

const sessions = [
  { n: 'Session 1', h: 'Accounts and benchmarks', p: 'GitHub, Vercel and your domain set up together, then we break down your benchmark sites into a brief.' },
  { n: 'Session 2', h: 'Brand kit and first build', p: 'Favicon, colours and share image prepared, then your first working version built with Claude Code.' },
  { n: 'Session 3', h: 'Go live and get found', p: 'Your domain connected, then SEO and AI search set up so Google and assistants can read the site.' },
  { n: 'Session 4', h: 'Back end and handover', p: 'Analytics, forms, email and security checked, plus the weekly routine to keep the site improving.' },
];

const included = [
  `${TRAINING.sessions} live one-to-one video sessions of ${TRAINING.sessionMinutes} minutes`,
  'We work on your real website, on your own accounts',
  'The Website Builder Manual and every paste-ready prompt',
  'A review of your site before launch',
  'You own everything: the code, the domain and the accounts',
];

const faqs = [
  {
    q: 'Who is the website training for?',
    a: 'Founders, small business owners and creators who want to build and run their own website instead of paying an agency for every change. No coding experience is needed.',
  },
  {
    q: 'What will I have at the end?',
    a: 'A live website on your own domain, set up for Google and AI search, with analytics and a contact form working, and the skills to update it yourself.',
  },
  {
    q: 'What do I need before the first session?',
    a: 'A computer, an email address and an idea of what the site is for. You will also need a domain name and a Claude subscription, which we set up together in session one.',
  },
  {
    q: 'How do the sessions get scheduled?',
    a: 'After payment you book your first session straight away. The remaining sessions are scheduled with you at the end of each call.',
  },
  {
    q: 'Would you rather have it built for you?',
    a: 'Yes, we do that too. See our pricing on the home page or contact us for a fixed-price proposal.',
  },
];

export default function WebsiteTrainingPage() {
  const payOnline = checkOfferEnv().stripe;
  const pageJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${SITE_URL}/website-training#course`,
        name: TRAINING.name,
        description: TRAINING.summary,
        url: `${SITE_URL}/website-training`,
        provider: { '@id': `${SITE_URL}/#organization` },
        offers: {
          '@type': 'Offer',
          price: (TRAINING.priceCents / 100).toFixed(2),
          priceCurrency: TRAINING.currency.toUpperCase(),
          category: 'Paid',
          url: `${SITE_URL}/website-training`,
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Online',
          courseWorkload: `PT${(TRAINING.sessions * TRAINING.sessionMinutes) / 60}H`,
        },
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
              <div className="section-label">Live training</div>
              <h1 className="section-title">Build your own website with a guide beside you</h1>
              <p className="offer-lead">{TRAINING.summary}</p>
              <ul className="offer-list">
                {included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="offer-form-card offer-price-card">
              <h2>{TRAINING.name}</h2>
              <div className="price">{price}</div>
              <p className="price-sub">
                One fixed price for {TRAINING.sessions} sessions. No hourly billing.
              </p>
              {payOnline ? (
                <>
                  <TrainingCheckoutButton label={`Enrol and pay ${price}`} />
                  <p className="offer-small">Secure payment by Stripe. You book your first session right after paying.</p>
                </>
              ) : (
                <>
                  <a
                    className="btn-primary offer-full"
                    href={TRAINING.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a call to enrol
                  </a>
                  <p className="offer-small">
                    Or <Link href="/#contact">send us a message</Link> and we will reply within 24 hours.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="offer-section">
          <div className="container">
            <h2>What we cover in each session</h2>
            <div className="offer-steps">
              {sessions.map((item) => (
                <div className="offer-step" key={item.n}>
                  <span>{item.n}</span>
                  <h3>{item.h}</h3>
                  <p>{item.p}</p>
                </div>
              ))}
            </div>
            <p className="offer-lead" style={{ marginTop: 28 }}>
              Want to try it alone first? <Link href="/free-website-manual">Download the free manual</Link>.
            </p>
          </div>
        </section>

        <section className="offer-section offer-alt">
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
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
