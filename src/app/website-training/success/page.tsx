import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter, SiteNav } from '@/components/offers/SiteChrome';
import { getCheckoutSession, isCheckoutSessionId } from '@/lib/stripe';
import { TRAINING } from '@/lib/training';
import '@/styles/offers.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Enrolment',
  robots: { index: false, follow: false },
};

/** Confirms the payment with Stripe before showing the booking link. */
async function isPaid(sessionId: unknown): Promise<boolean> {
  if (!isCheckoutSessionId(sessionId)) return false;
  try {
    const session = await getCheckoutSession(sessionId);
    return session.payment_status === 'paid' && session.metadata?.offer === TRAINING.id;
  } catch (error) {
    console.error('[training-success] getCheckoutSession failed', { category: error instanceof Error ? error.message : 'unknown' });
    return false;
  }
}

export default async function TrainingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) {
  const paid = await isPaid((await searchParams).session_id);
  return (
    <>
      <SiteNav />
      <main>
        <section className="offer-hero">
          <div className="container" style={{ maxWidth: 640 }}>
            {paid ? (
              <>
                <div className="section-label">Payment received</div>
                <h1 className="section-title">You are enrolled</h1>
                <p className="offer-lead" style={{ marginBottom: 24 }}>
                  Thank you. Stripe has emailed your receipt. Book your first session now and we will take it from
                  there.
                </p>
                <a className="btn-primary" href={TRAINING.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book your first session
                </a>
              </>
            ) : (
              <>
                <div className="section-label">Enrolment</div>
                <h1 className="section-title">We could not confirm a payment</h1>
                <p className="offer-lead" style={{ marginBottom: 24 }}>
                  If you have just paid, your receipt from Stripe is your confirmation and we will be in touch. If
                  not, you can go back and enrol.
                </p>
                <Link className="btn-primary" href="/website-training">
                  Back to website training
                </Link>
              </>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
