import {
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_URL,
  formatPhone,
} from '@/lib/site';
import type { Faq } from '@/lib/pricing';

export function BookCallButton({ light = false }: { light?: boolean }) {
  return (
    <a
      href={BOOKING_URL}
      className={light ? 'rg-btn rg-btn--light' : 'rg-btn'}
      target="_blank"
      rel="noopener noreferrer"
    >
      Book a free call
    </a>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="rg-faq">
      {faqs.map((faq) => (
        <details key={faq.q}>
          <summary>{faq.q}</summary>
          <p>{faq.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ContactSection({ returnPath }: { returnPath: string }) {
  return (
    <section className="rg-section rg-alt" id="contact">
      <div className="rg-wrap rg-contact">
        <div>
          <h2 className="rg-h2">Talk to a real person.</h2>
          <p className="rg-lead">
            Tell us a little about your business. We reply within one business
            day, in plain English.
          </p>
          <ul className="rg-contact__ways">
            {CONTACT_PHONE && (
              <li>
                <strong>Call us</strong>
                <a href={`tel:+1${CONTACT_PHONE}`}>
                  {formatPhone(CONTACT_PHONE)}
                </a>
              </li>
            )}
            <li>
              <strong>Pick a time for a free call</strong>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Open the calendar
              </a>
            </li>
            <li>
              <strong>Email us</strong>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
          </ul>
        </div>
        <form
          className="rg-form"
          action="https://formsubmit.co/itai.leff@gmail.com"
          method="POST"
        >
          <input
            type="hidden"
            name="_subject"
            value="New Contact Form Submission - Real Growth Agency"
          />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_next"
            value={`${SITE_URL}${returnPath}`}
          />
          <div className="rg-form__row">
            <div className="rg-field">
              <label htmlFor="rg-name">Your name</label>
              <input id="rg-name" type="text" name="name" autoComplete="name" required />
            </div>
            <div className="rg-field">
              <label htmlFor="rg-phone">
                Phone <span>(optional)</span>
              </label>
              <input id="rg-phone" type="tel" name="phone" autoComplete="tel" />
            </div>
          </div>
          <div className="rg-field">
            <label htmlFor="rg-email">Email</label>
            <input id="rg-email" type="email" name="email" autoComplete="email" required />
          </div>
          <div className="rg-field">
            <label htmlFor="rg-message">Tell us about your business</label>
            <textarea id="rg-message" name="message" required />
          </div>
          <button type="submit" className="rg-btn">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
