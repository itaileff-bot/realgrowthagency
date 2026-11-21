import Link from 'next/link';
import { SiteNav } from '@/components/site/SiteNav';
import { SiteFooter } from '@/components/site/SiteFooter';
import {
  BookCallButton,
  ContactSection,
  FaqList,
} from '@/components/site/sections';
import {
  FAQS,
  HOSTING_PRICE,
  PACKAGES,
  STARTER_PRICE,
} from '@/lib/pricing';
import '@/styles/site.css';

type Work = {
  name: string;
  href: string;
  about: string;
  image: string;
  fit: 'logo' | 'fill';
  background?: string;
  filter?: string;
};

const WORK: Work[] = [
  {
    name: 'Famous Finds',
    href: 'https://www.myfamousfinds.com',
    about: 'Online store for authenticated luxury resale.',
    image: 'https://www.myfamousfinds.com/Famous-Finds-Logo.png',
    fit: 'logo',
    background: '#ffffff',
  },
  {
    name: 'A Rich Wines',
    href: 'https://www.arichwines.com',
    about: 'Wine brand with an online shop.',
    image:
      'https://images.squarespace-cdn.com/content/v1/66eb05e475bbf851d58ba4b7/84405c9d-6856-44c7-8d7d-5aa2205e1f5f/a+rich+logo.png?format=1500w',
    fit: 'logo',
    background: '#0a0a0a',
  },
  {
    name: 'Ape Beverages',
    href: 'https://www.drinkape.com',
    about: 'Canned spring water brand and store.',
    image:
      'https://drinkape.com/cdn/shop/files/url.share.image.jpg?v=1706487497',
    fit: 'fill',
  },
  {
    name: 'Chef Prep For You',
    href: 'https://www.chefprepforyou.com',
    about: 'Private chef service that takes bookings online.',
    image:
      'https://www.chefprepforyou.com/_next/image?url=%2Ffood-photos%2F0203DA92-08DA-4CD5-9F13-169870BBB71B.JPG&w=1200&q=75',
    fit: 'fill',
  },
  {
    name: 'The Skincare Company',
    href: 'https://www.theskincarecompany-usa.com',
    about: 'Australian skincare brand launching in the U.S.',
    image:
      'https://theskincarecompany-usa.com/images/products/peptide-lifestyle.webp',
    fit: 'fill',
  },
  {
    name: 'The Third Space',
    href: 'https://www.thethirdspaceatlanta.com/',
    about: 'Chef-led event space in Atlanta.',
    image:
      'https://www.thethirdspaceatlanta.com/assets/images/logo-third-space.png',
    fit: 'logo',
    background: '#0a0a0a',
    filter: 'brightness(0) invert(1)',
  },
];

const starter = PACKAGES[0];

export default function Home() {
  return (
    <div className="rg">
      <a href="#main" className="rg-skip">
        Skip to main content
      </a>
      <SiteNav />

      <main id="main">
        <section className="rg-hero">
          <div className="rg-wrap">
            <p className="rg-eyebrow">Websites from {STARTER_PRICE}</p>
            <h1 className="rg-h1">
              A real website for your business. Built for you.
            </h1>
            <p className="rg-lead">
              You tell us about your business. A real person builds your
              website. No software to learn and no tech talk.
            </p>
            <div className="rg-actions">
              <BookCallButton />
              <Link href="/pricing" className="rg-link">
                See what&apos;s included
              </Link>
            </div>
            <p className="rg-hero__note">
              The call is free. There is no obligation.
            </p>

            <div className="rg-browser" aria-hidden="true">
              <div className="rg-browser__bar">
                <span className="rg-browser__dot" />
                <span className="rg-browser__dot" />
                <span className="rg-browser__dot" />
                <span className="rg-browser__url">www.yourbusiness.com</span>
              </div>
              <div className="rg-sample">
                <div className="rg-sample__copy">
                  <span className="rg-sample__name">Your business name</span>
                  <span className="rg-sample__title">
                    Family owned. Here when you need us.
                  </span>
                  <span className="rg-sample__text">
                    Your services, your photos and your phone number, easy to
                    find.
                  </span>
                  <span className="rg-sample__btn">Call us today</span>
                </div>
                <div className="rg-sample__art" />
              </div>
            </div>
          </div>
        </section>

        <section className="rg-section rg-alt">
          <div className="rg-wrap">
            <ul className="rg-facts">
              <li className="rg-fact">
                <strong>One price</strong>
                <span>
                  From {STARTER_PRICE}, agreed in writing. Hosting is{' '}
                  {HOSTING_PRICE}.
                </span>
              </li>
              <li className="rg-fact">
                <strong>Done for you</strong>
                <span>We build it and write the words. You approve it.</span>
              </li>
              <li className="rg-fact">
                <strong>Yours to keep</strong>
                <span>Your web address and website stay in your name.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="rg-section" id="process">
          <div className="rg-wrap">
            <div className="rg-head">
              <h2 className="rg-h2">Three simple steps.</h2>
              <p className="rg-lead">
                You do the talking. We do the building.
              </p>
            </div>
            <ol className="rg-steps">
              <li className="rg-step">
                <h3>We talk</h3>
                <p>
                  Book a free 30 minute call. Tell us what your business does
                  and who your customers are.
                </p>
              </li>
              <li className="rg-step">
                <h3>We build</h3>
                <p>
                  We design your website and write the words. You send photos
                  if you have them.
                </p>
              </li>
              <li className="rg-step">
                <h3>You approve</h3>
                <p>
                  You look it over and ask for changes. When you are happy, we
                  put it online.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="rg-section rg-alt" id="services">
          <div className="rg-wrap">
            <div className="rg-head">
              <h2 className="rg-h2">Everything a small business needs.</h2>
              <p className="rg-lead">
                Every website we build includes all of this.
              </p>
            </div>
            <div className="rg-tiles">
              <div className="rg-tile rg-tile--wide rg-tile--ink">
                <h3>Built by a person, not by you</h3>
                <p>
                  There is nothing to install and nothing to figure out. If you
                  can describe your business on the phone, you can have a
                  website.
                </p>
              </div>
              <div className="rg-tile">
                <h3>Works on every phone</h3>
                <p>
                  Easy to read on phones, tablets and computers, with large
                  text and clear buttons.
                </p>
              </div>
              <div className="rg-tile">
                <h3>We write the words</h3>
                <p>
                  Tell us about your business in your own words. We turn it
                  into clear, friendly pages.
                </p>
              </div>
              <div className="rg-tile">
                <h3>Ready for Google</h3>
                <p>
                  Set up so customers searching in your area can find your
                  business.
                </p>
              </div>
              <div className="rg-tile">
                <h3>Customers can reach you</h3>
                <p>
                  Add a customer form to your page. Each time someone fills it
                  in, you get an email.
                </p>
              </div>
            </div>
            <p className="rg-more">
              Need a logo, an online store or help with marketing?{' '}
              <Link href="/pricing" className="rg-link">
                See all packages
              </Link>
            </p>
          </div>
        </section>

        <section className="rg-section rg-dark" id="portfolio">
          <div className="rg-wrap">
            <div className="rg-head">
              <h2 className="rg-h2">Websites we have built.</h2>
              <p className="rg-lead">
                Real businesses, live today. Tap any one to visit it.
              </p>
            </div>
            <div className="rg-work">
              {WORK.map((work) => (
                <a
                  key={work.name}
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rg-work__card"
                >
                  <div
                    className="rg-work__thumb"
                    style={{ background: work.background }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={
                        work.fit === 'logo' ? 'rg-work__logo' : 'rg-work__fill'
                      }
                      src={work.image}
                      alt=""
                      loading="lazy"
                      style={{ filter: work.filter }}
                    />
                  </div>
                  <div className="rg-work__body">
                    <h3>{work.name}</h3>
                    <p>{work.about}</p>
                    <span>Visit website</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="rg-section rg-alt" id="pricing">
          <div className="rg-wrap">
            <div className="rg-price-hero">
              <p className="rg-eyebrow">
                A landing page with up to 3 pages
              </p>
              <p className="rg-price-hero__amount">{starter.price}</p>
              <p className="rg-price-hero__terms">
                One-time price for the build
              </p>
              <ul className="rg-checks">
                {starter.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="rg-actions">
                <BookCallButton />
                <Link href="/pricing" className="rg-link">
                  See full pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="rg-section">
          <div className="rg-wrap">
            <div className="rg-head">
              <h2 className="rg-h2">Common questions.</h2>
            </div>
            <FaqList faqs={FAQS.slice(0, 4)} />
            <p className="rg-more">
              <Link href="/pricing#questions" className="rg-link">
                Read all questions
              </Link>
            </p>
          </div>
        </section>

        <ContactSection returnPath="/#contact" />
      </main>

      <SiteFooter />
    </div>
  );
}
