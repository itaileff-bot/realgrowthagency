/**
 * Single source of truth for the paid website training package. The Stripe
 * Checkout session is created from these values (inline price_data), so the
 * price shown on the page is always the price charged. Change it here only.
 */
export const TRAINING = {
  id: 'website-training',
  name: 'Build Your Own Website: Guided Training',
  summary:
    'Four live one-to-one sessions that take you from no website to a live, search-ready site you own and can update yourself.',
  sessions: 4,
  sessionMinutes: 60,
  priceCents: 120_000,
  currency: 'usd',
  // Booking page shown after payment. utm tags attribute the booking.
  bookingUrl:
    'https://calendly.com/itai-cpg-advisory/30min?utm_source=realgrowthagency&utm_medium=website&utm_campaign=website-training',
} as const;

export const MANUAL = {
  title: 'The Website Builder Manual',
  path: '/downloads/website-builder-manual.pdf',
  pages: 22,
} as const;

export function formatPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
