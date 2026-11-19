export const SITE_URL = 'https://www.realgrowthagency.com';
export const SITE_NAME = 'Real Growth Agency';
export const CONTACT_EMAIL = 'hello@realgrowthagency.com';
export const BOOKING_URL =
  'https://calendly.com/itai-cpg-advisory/30min?utm_source=realgrowthagency&utm_medium=website&utm_campaign=book-now';
// Digits only, e.g. '4045550123'. Empty hides every phone button on the site.
export const CONTACT_PHONE = '';

export function formatPhone(digits: string): string {
  return digits.length === 10
    ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    : digits;
}

/**
 * Serialises structured data for a <script type="application/ld+json"> tag.
 * Escaping "<" stops any value that contains "</script>" from closing the tag
 * early, so the output is safe to inject with dangerouslySetInnerHTML.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
