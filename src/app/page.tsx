import type { Metadata } from 'next';
import Home from '@/components/Home';
import { jsonLd, SITE_NAME, SITE_URL } from '@/lib/site';

const title = 'Websites Built for You, from $599';
const description =
  'A real person builds your business website for you, from $599. No software to learn, no tech talk. Book a free call with Real Growth Agency.';

/**
 * The canonical is declared here, not in the root layout, so it is never
 * inherited by another route.
 */
export const metadata: Metadata = {
  // The root layout's title template does not apply to its own page.
  title: { absolute: `${title} | ${SITE_NAME}` },
  description,
  alternates: { canonical: '/' },
  openGraph: { title: `${title} | ${SITE_NAME}`, description, url: SITE_URL },
  twitter: { title: `${title} | ${SITE_NAME}`, description },
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
      <Home />
    </>
  );
}
