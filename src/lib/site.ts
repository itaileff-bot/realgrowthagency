export const SITE_URL = 'https://www.realgrowthagency.com';
export const SITE_NAME = 'Real Growth Agency';

/**
 * Serialises structured data for a <script type="application/ld+json"> tag.
 * Escaping "<" stops any value that contains "</script>" from closing the tag
 * early, so the output is safe to inject with dangerouslySetInnerHTML.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
