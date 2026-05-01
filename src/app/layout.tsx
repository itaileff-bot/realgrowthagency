import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Real Growth Agency — Brand · Web · Marketing · SEO',
    template: '%s | Real Growth Agency',
  },
  description:
    'We build brands, websites, apps, and marketing engines that drive real growth. Powered by AI. Priced for startups.',
  metadataBase: new URL('https://realgrowthagency.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://realgrowthagency.com',
    siteName: 'Real Growth Agency',
    title: 'Real Growth Agency — Brand · Web · Marketing · SEO',
    description:
      'We build brands, websites, apps, and marketing engines that drive real growth. Powered by AI. Priced for startups.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Growth Agency — Brand · Web · Marketing · SEO',
    description:
      'We build brands, websites, apps, and marketing engines that drive real growth. Powered by AI. Priced for startups.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
