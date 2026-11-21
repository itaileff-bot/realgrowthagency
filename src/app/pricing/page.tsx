import type { Metadata } from 'next';
import { SiteNav } from '@/components/site/SiteNav';
import { SiteFooter } from '@/components/site/SiteFooter';
import {
  BookCallButton,
  ContactSection,
  FaqList,
} from '@/components/site/sections';
import { FAQS, PACKAGES, STARTER_PRICE } from '@/lib/pricing';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import '@/styles/site.css';

const title = `Pricing: Websites from ${STARTER_PRICE}`;
const description = `Clear, one-time prices for a website built for you. A landing page with up to 3 pages starts at ${STARTER_PRICE}. See exactly what is included.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: `${SITE_URL}/pricing`,
    siteName: SITE_NAME,
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${SITE_NAME}`,
    description,
    images: ['/twitter-image'],
  },
};

const NOT_INCLUDED = [
  'More than 3 pages',
  'Your domain name (web address). Hosting does not cover it',
  'A new logo (see Brand + Website)',
  'An online store. We can connect Shopify for an additional fee',
  'Booking systems',
  'Professional photography',
];

export default function PricingPage() {
  return (
    <div className="rg">
      <a href="#main" className="rg-skip">
        Skip to main content
      </a>
      <SiteNav />

      <main id="main">
        <section className="rg-hero" style={{ paddingBottom: 72 }}>
          <div className="rg-wrap">
            <p className="rg-eyebrow">Pricing</p>
            <h1 className="rg-h1">Clear prices. No surprises.</h1>
            <p className="rg-lead">
              A landing page for your business, with up to 3 pages and an
              optional customer form, starts at {STARTER_PRICE}. You get a fixed price in writing
              before any work begins.
            </p>
            <div className="rg-actions">
              <BookCallButton />
              <a href="#questions" className="rg-link">
                Read common questions
              </a>
            </div>
          </div>
        </section>

        <section className="rg-section rg-alt">
          <div className="rg-wrap">
            <div className="rg-head">
              <h2 className="rg-h2">Choose what fits.</h2>
              <p className="rg-lead">
                Most small businesses start with the Landing Page package.
                Every price is one-time.
              </p>
            </div>
            <div className="rg-packages">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={
                    pkg.featured
                      ? 'rg-package rg-package--featured'
                      : 'rg-package'
                  }
                >
                  {pkg.featured && (
                    <span className="rg-package__flag">Most popular</span>
                  )}
                  <h3>{pkg.name}</h3>
                  <p className="rg-package__price">
                    {pkg.price} <small>one-time</small>
                  </p>
                  <p className="rg-package__summary">{pkg.summary}</p>
                  <ul className="rg-checks">
                    {pkg.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <BookCallButton />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rg-section">
          <div className="rg-wrap">
            <div className="rg-head">
              <h2 className="rg-h2">
                What the {STARTER_PRICE} landing page covers.
              </h2>
              <p className="rg-lead">
                We would rather tell you now than surprise you later.
              </p>
            </div>
            <div className="rg-notes">
              <div className="rg-note">
                <h3>Included</h3>
                <ul className="rg-checks">
                  {PACKAGES[0].features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="rg-note rg-note--plain">
                <h3>Not included</h3>
                <ul>
                  {NOT_INCLUDED.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="rg-section rg-alt" id="questions">
          <div className="rg-wrap">
            <div className="rg-head">
              <h2 className="rg-h2">Common questions.</h2>
            </div>
            <FaqList faqs={FAQS} />
          </div>
        </section>

        <section className="rg-section rg-dark rg-close">
          <div className="rg-wrap">
            <h2 className="rg-h2">Ready when you are.</h2>
            <p className="rg-lead">
              Book a free 30 minute call. No cost and no obligation.
            </p>
            <div className="rg-actions">
              <BookCallButton light />
            </div>
          </div>
        </section>

        <ContactSection returnPath="/pricing#contact" />
      </main>

      <SiteFooter />
    </div>
  );
}
