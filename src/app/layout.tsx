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
    default: 'Real Growth Agency | Web Design, Brand, SEO and AI',
    template: '%s | Real Growth Agency',
  },
  description:
    'Websites, brands, apps and AI marketing engines built to be found, trusted and booked. Powered by AI, priced for startups, from the team behind Brand Refinery.',
  metadataBase: new URL('https://www.realgrowthagency.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.realgrowthagency.com',
    siteName: 'Real Growth Agency',
    title: 'Real Growth Agency | Web Design, Brand, SEO and AI',
    description:
      'Websites, brands, apps and AI marketing engines built to be found, trusted and booked. Powered by AI, priced for startups, from the team behind Brand Refinery.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Growth Agency | Web Design, Brand, SEO and AI',
    description:
      'Websites, brands, apps and AI marketing engines built to be found, trusted and booked. Powered by AI, priced for startups, from the team behind Brand Refinery.',
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
