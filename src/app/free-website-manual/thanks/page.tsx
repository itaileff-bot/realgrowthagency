import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter, SiteNav } from '@/components/offers/SiteChrome';
import { MANUAL } from '@/lib/training';
import '@/styles/offers.css';

export const metadata: Metadata = {
  title: 'Your manual is ready',
  robots: { index: false, follow: false },
};

export default function ManualThanksPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="offer-hero">
          <div className="container" style={{ maxWidth: 640 }}>
            <div className="section-label">Thank you</div>
            <h1 className="section-title">Your manual is ready</h1>
            <p className="offer-lead" style={{ marginBottom: 24 }}>
              Download {MANUAL.title} below and start with Part 1.
            </p>
            <a className="btn-primary" href={MANUAL.path} download>
              Download the manual (PDF)
            </a>
            <p className="offer-lead" style={{ marginTop: 28 }}>
              Want a guide while you build? <Link href="/website-training">See the live website training</Link>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
