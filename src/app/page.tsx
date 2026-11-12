import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';
import { jsonLd, SITE_NAME, SITE_URL } from '@/lib/site';

/**
 * The homepage markup lives in a client component (it drives the navbar and
 * scroll animations), and a client component cannot export metadata. This
 * server page owns the canonical URL and the site-wide structured data.
 *
 * The canonical is declared here, not in the root layout, so it is never
 * inherited by another route.
 */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  sameAs: [
    'https://x.com/RealGrowthHQ',
    'https://www.linkedin.com/company/real-growth-agency',
    'https://www.instagram.com/realgrowthagency',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
