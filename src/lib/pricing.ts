export type Package = {
  id: string;
  name: string;
  price: string;
  summary: string;
  features: string[];
  featured?: boolean;
};

export const STARTER_PRICE = '$599';

export const PACKAGES: Package[] = [
  {
    id: 'website',
    name: 'Website',
    price: STARTER_PRICE,
    summary: 'A complete website for your business, built for you.',
    features: [
      'Up to 5 pages, built by a real person',
      'We write the words with you',
      'Works on phones, tablets and computers',
      'Contact form that emails you',
      'Set up so Google can find you',
      '2 rounds of changes before launch',
    ],
    featured: true,
  },
  {
    id: 'brand-website',
    name: 'Brand + Website',
    price: '$1,499',
    summary: 'A new logo and look, plus your website.',
    features: [
      'Everything in Website',
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
    q: 'What do I get for $599?',
    a: 'A finished website of up to 5 pages, such as Home, About, Services, Photos and Contact. We write the words with you, set it up to work on phones and computers, add a contact form, and prepare it so Google can find it.',
  },
  {
    q: 'Do I need to know anything about computers?',
    a: 'No. We ask you about your business in plain English, on a call or by email, and we do the rest. You never have to log in to anything or learn any software.',
  },
  {
    q: 'Are there monthly fees?',
    a: 'The $599 is a one-time price for building your website. Every website also needs a domain name (your web address) and hosting. We quote both in writing before you pay anything, so there are no surprises.',
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
    q: 'What if I need more than 5 pages, or an online store?',
    a: 'Tell us what you need on the free call. We will give you a fixed price in writing before any work begins.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a free 30 minute call or send us a message. There is no cost and no obligation.',
  },
];
