export type Package = {
  id: string;
  name: string;
  price: string;
  summary: string;
  features: string[];
  featured?: boolean;
};

export const STARTER_PRICE = '$599';
export const HOSTING_PRICE = '$20 a year';

export const PACKAGES: Package[] = [
  {
    id: 'website',
    name: 'Landing Page',
    price: STARTER_PRICE,
    summary:
      'A one-page website for your business, with a customer sign-up form.',
    features: [
      'A landing page (one-page website), built by a real person',
      'Customer sign-up form that emails you',
      'We write the words with you',
      'Works on phones, tablets and computers',
      'Set up so Google can find you',
      `Hosting for ${HOSTING_PRICE}`,
    ],
    featured: true,
  },
  {
    id: 'brand-website',
    name: 'Brand + Website',
    price: '$1,499',
    summary: 'A new logo and look, plus your website.',
    features: [
      'Everything in Landing Page',
      'Logo and brand kit',
      'Colors and lettering chosen for you',
      'Matching look across every page',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$4,997',
    summary: 'Brand, website and marketing working together.',
    features: [
      'Everything in Brand + Website',
      'Full brand identity system',
      'Custom-built website or web app',
      'Real Growth Bot marketing setup',
      '3 months of Google search work and content',
      'Unlimited revisions',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$6,890',
    summary: 'A full-service partnership for a growing business.',
    features: [
      'Everything in Growth',
      'Mobile app for iPhone and Android',
      'Advanced automation',
      'Dedicated growth manager',
      '6 months of support and improvements',
      'Priority 24-hour response',
    ],
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: `What do I get for ${STARTER_PRICE}?`,
    a: 'A finished landing page, which is a one-page website about your business, with a sign-up form your customers can fill in. Each time someone signs up, you get an email. We write the words with you and set it up to work on phones and computers.',
  },
  {
    q: 'Do I need to know anything about computers?',
    a: 'No. We ask you about your business in plain English, on a call or by email, and we do the rest. You never have to log in to anything or learn any software.',
  },
  {
    q: 'Are there monthly fees?',
    a: `No monthly fees. The ${STARTER_PRICE} is a one-time price for building your landing page. We host it for you for ${HOSTING_PRICE}. If you need a domain name (your web address), we quote that in writing before you pay anything.`,
  },
  {
    q: 'Who owns the website?',
    a: 'You do. Your web address and your website are registered in your name, and you can take them anywhere you like.',
  },
  {
    q: 'I already have a website. Can you replace it?',
    a: 'Yes. We can rebuild it and keep your existing web address, so your customers find you in the same place.',
  },
  {
    q: 'What if I need changes later?',
    a: 'Send us an email and tell us what you want changed. We give you a price before we start, and small updates are usually quick.',
  },
  {
    q: 'What if I need more than one page, or an online store?',
    a: 'Tell us what you need on the free call. We will give you a fixed price in writing before any work begins.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a free 30 minute call or send us a message. There is no cost and no obligation.',
  },
];
