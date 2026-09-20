import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroVideo from '@/components/checkpoint/HeroVideo';
import { Container, Eyebrow } from '@/components/checkpoint/primitives';
import {
  CHECKPOINT_CLIENTS,
  clientMedia,
  clientPath,
  getClient,
  type CheckpointClient,
} from '@/lib/checkpoint-clients';
import {
  BOOKING_URL,
  CHECKPOINT_NAME,
  CHECKPOINT_PATH,
  CHECKPOINT_TAGLINE,
  ENQUIRY_MAILTO,
  HERO_MEDIA,
} from '@/lib/checkpoint-proposal';

/**
 * The per-prospect cover page.
 *
 * WHY THIS EXISTS SEPARATELY FROM THE PROPOSAL
 * The proposal is a long document and it is the same document for everyone.
 * What changes per pitch is the first ten seconds: whose name is on it, and
 * why this is being sent to them rather than to anyone else. Splitting that
 * off means the argument stays in one place and only the cover is rewritten
 * per prospect, and it means the link that gets sent opens on the prospect's
 * own name rather than on slide one of a generic deck.
 *
 * One screen, then a door into the proposal. Nothing on it scrolls past the
 * fold on a laptop, which is the whole point of a cover.
 */

const SITE_URL = 'https://www.realgrowthagency.com';
const OG_IMAGE = '/images/checkpoint/og-checkpoint-proposal.jpg';

interface PageProps {
  params: Promise<{ client: string }>;
}

/** Any slug not in the registry is a 404 rather than a rendered page. */
export const dynamicParams = false;

export function generateStaticParams() {
  return CHECKPOINT_CLIENTS.map((client) => ({ client: client.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { client: slug } = await params;
  const client = getClient(slug);
  if (!client) return {};

  const title = `${CHECKPOINT_NAME} for ${client.name}`;
  const description = client.lead;

  return {
    /* `absolute` escapes the root layout's "%s | Real Growth Agency" template:
       this page presents Checkpoint to Checkpoint's prospect. */
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}${clientPath(client.slug)}` },
    /* Same posture as the proposal, and more so: this page names a prospect.
       It must never be indexed, cached or summarised by a crawler. */
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        'max-snippet': 0,
        'max-image-preview': 'none',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${clientPath(client.slug)}`,
      type: 'website',
      locale: 'en_GB',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export default async function CheckpointClientCoverPage({ params }: PageProps) {
  const { client: slug } = await params;
  const client = getClient(slug);
  if (!client) notFound();

  return <Cover client={client} />;
}

function Cover({ client }: { client: CheckpointClient }) {
  const media = clientMedia(client);

  return (
    <section
      id="top"
      className={`cp-cover${media.bright ? ' cp-cover--bright' : ''}`}
    >
      <div className="cp-cover__bg">
        {/*
          Still first, motion on top, exactly as the proposal hero does it: the
          <img> is the real background and always renders, and HeroVideo fades
          a silent loop over it only on wide screens where motion is welcome.
          On a phone, under reduced motion, or with JS off, this still is the
          whole background and no video is downloaded.

          A licensed clip can arrive without a still, and a frame cannot be
          extracted from a file we do not hold. The gradient ground is what
          renders then, so the cover reads as designed rather than as broken.
        */}
        {media.poster ? (
          <img
            src={media.poster}
            alt=""
            width={1600}
            height={900}
            className="cp-hero__img"
            fetchPriority="high"
          />
        ) : (
          <div className="cp-cover__ground" />
        )}
        <HeroVideo src={media.video} poster={media.poster} />
        <div className="cp-cover__scrim cp-cover__scrim--v" />
        <div className="cp-cover__scrim cp-cover__scrim--r" />
        <div className="cp-cover__scrim cp-gridlines cp-cover__scrim--grid" />
      </div>

      <Container className="cp-cover__inner">
        <div className="cp-cover__lockup">
          <Eyebrow tone="accent">{CHECKPOINT_TAGLINE}</Eyebrow>
          <span aria-hidden="true" className="cp-kicker__rule" />
          <Eyebrow>Prepared for</Eyebrow>
          <p className="cp-cover__client cp-display">{client.name}</p>
          {client.confidential && (
            <span className="cp-cover__badge">Confidential</span>
          )}
        </div>

        <h1 className="cp-display cp-cover__title">{client.headline}</h1>
        <p className="cp-cover__lead">{client.lead}</p>

        <ul className="cp-cover__points">
          {client.points.map((point, index) => (
            <li key={point.label} className="cp-cover__point">
              <p className="cp-eyebrow cp-eyebrow--accent cp-cover__pointnum">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="cp-cover__pointlabel">{point.label}</p>
              <p className="cp-cover__pointbody">{point.body}</p>
            </li>
          ))}
        </ul>

        <div className="cp-actions cp-cover__actions">
          <a href={CHECKPOINT_PATH} className="cp-btn cp-btn--primary">
            Open the proposal
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cp-btn cp-btn--ghost"
          >
            Book a 45-minute brief
          </a>
        </div>

        <p className="cp-eyebrow cp-eyebrow--xs cp-cover__meta">
          Prepared {client.prepared}
          <span aria-hidden="true" className="cp-source__sep">
            /
          </span>
          <a href={ENQUIRY_MAILTO} className="cp-link">
            Reply to this proposal
          </a>
        </p>

        {/*
          The background is real work, so it is worth saying whose. Only the
          default loop is described here; a prospect-specific cut is their own
          footage and needs no caption from us.
        */}
        {!client.media && <p className="cp-cover__credit">{HERO_MEDIA.alt}</p>}
      </Container>
    </section>
  );
}
