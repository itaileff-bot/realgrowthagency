import { FAQS, HOSTING_PRICE, PACKAGES } from '@/lib/pricing';
import { BOOKING_URL, CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@/lib/site';

// Built once at deploy time from the same data the pricing page renders.
export const dynamic = 'force-static';

/**
 * /llms.txt: an optional plain-text guide to the public site for AI
 * assistants. It is a navigation aid, not a ranking mechanism. It lists
 * public pages only; proposals, admin and API routes are left out.
 */
function buildLlmsTxt(): string {
  const packages = PACKAGES.map(
    (pkg) =>
      `- ${pkg.name}: ${pkg.price}, one-time. ${pkg.summary} Includes: ${pkg.features.join('; ')}.`
  ).join('\n');

  const faqs = FAQS.map((faq) => `### ${faq.q}\n${faq.a}`).join('\n\n');

  return `# ${SITE_NAME}

> ${SITE_NAME} builds websites for small businesses. A real person builds the website for you, so there is no software to learn. Prices are one-time and agreed in writing before work begins.

## Pages
- [Home](${SITE_URL}/): what we do and how it works
- [Pricing](${SITE_URL}/pricing): every package, what is included and common questions
- [Blog](${SITE_URL}/blog): guides on websites and marketing

## Packages
${packages}

Hosting is ${HOSTING_PRICE}. A domain name is not included.

## Common questions
${faqs}

## Contact
- Book a free 30 minute call: ${BOOKING_URL.split('?')[0]}
- Email: ${CONTACT_EMAIL}
`;
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
