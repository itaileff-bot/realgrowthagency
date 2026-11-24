import { FAQS, PACKAGES } from '@/lib/pricing';
import { jsonLd, SITE_NAME, SITE_URL } from '@/lib/site';

const PAGE_URL = `${SITE_URL}/pricing`;

/** '$1,499' -> '1499'. Schema.org prices are plain numbers. */
function toAmount(price: string): string {
  return price.replace(/[^0-9.]/g, '');
}

/**
 * Structured data for /pricing. Every value comes from src/lib/pricing.ts,
 * the same source the visible page renders, so the two cannot drift apart.
 */
const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${PAGE_URL}#service`,
  name: 'Website design and build for small businesses',
  serviceType: 'Website design',
  url: PAGE_URL,
  provider: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  offers: PACKAGES.map((pkg) => ({
    '@type': 'Offer',
    name: pkg.name,
    description: pkg.summary,
    price: toAmount(pkg.price),
    priceCurrency: 'USD',
    url: PAGE_URL,
  })),
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${PAGE_URL}#questions`,
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

export function PricingJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }}
      />
    </>
  );
}
