import { Fragment } from 'react';
import type { Metadata } from 'next';
import DataTable from '@/components/checkpoint/DataTable';
import HeroVideo from '@/components/checkpoint/HeroVideo';
import {
  Container,
  Eyebrow,
  Figure,
  Section,
  SectionHeader,
  Tag,
} from '@/components/checkpoint/primitives';
import {
  BOOKING_URL,
  CHECKPOINT_NAME,
  CHECKPOINT_SITE,
  CHECKPOINT_TAGLINE,
  HERO_MEDIA,
  NEXT_STEPS as CHECKPOINT_NEXT,
} from '@/lib/checkpoint-proposal';
import {
  CLOSING_NOTE,
  EARNING,
  FEES,
  HERO,
  INVEST,
  NEXT,
  OVERVIEW,
  PHASES,
  RHP_PUBLISHED,
  RHP_WORLD_PATH,
  SECURITY,
  TIMELINE,
  paybackRows,
  scenarioRows,
  usd,
} from '@/lib/rhapsody-world-proposal';
import '@/styles/checkpoint-rhapsody.css';

/**
 * Project Rhapsody: the world proposal.
 *
 * This is the document that sits behind the Rhapsody cover at
 * /proposals/checkpoint/rhapsody. The cover is the first ten seconds; this is
 * the argument and the price. It lives under the same section, inherits its
 * layout, header, footer and palette, and adds only what the standing proposal
 * never needed: data tables and a bulleted list (see
 * src/styles/checkpoint-rhapsody.css).
 *
 * Every figure comes from src/lib/rhapsody-world-proposal.ts, which fails the
 * build if the fees stop adding up to the headline total.
 */

const SITE_URL = 'https://www.realgrowthagency.com';
const OG_IMAGE = '/images/checkpoint/og-checkpoint-proposal.jpg';

/*
 * The title and description use the codename. The link is forwarded, and the
 * share card is the one place a crawler or a chat preview reads before anyone
 * has opened the page, so the recipient's real name stays out of it. The real
 * name appears in the body, where it is addressed to the person it is for.
 */
const TITLE = `Project Rhapsody | Roblox world proposal`;
const DESCRIPTION =
  'A three-phase proposal to design, build and launch a Roblox world, with fixed fees, a payback plan and a launch timeline. Prepared by Checkpoint.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${RHP_WORLD_PATH}` },
  /*
   * Never indexed, cached or summarised. This page names a client and states
   * a price, so it carries the strictest posture in the section.
   */
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
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${RHP_WORLD_PATH}`,
    type: 'website',
    locale: 'en_GB',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  other: { 'rhapsody:published': RHP_PUBLISHED },
};

export default function RhapsodyWorldProposalPage() {
  const payback = paybackRows();
  const scenarios = scenarioRows();

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section id="top" className="cp-hero">
        <div className="cp-hero__bg">
          <img
            src={HERO_MEDIA.poster}
            alt=""
            width={1600}
            height={900}
            className="cp-hero__img"
            fetchPriority="high"
          />
          <HeroVideo src={HERO_MEDIA.video} poster={HERO_MEDIA.poster} />
          <div className="cp-hero__scrim cp-hero__scrim--h" />
          <div className="cp-hero__scrim cp-hero__scrim--v" />
          <div className="cp-hero__scrim cp-hero__scrim--r" />
          <div className="cp-hero__scrim cp-gridlines cp-hero__scrim--grid" />
        </div>

        <Container className="cp-hero__inner">
          <div className="cp-hero__copy">
            <div className="cp-hero__kicker">
              <Eyebrow tone="accent">{CHECKPOINT_TAGLINE}</Eyebrow>
              <span aria-hidden="true" className="cp-kicker__rule" />
              <Eyebrow>{HERO.eyebrow}</Eyebrow>
            </div>

            <h1 className="cp-display cp-hero__title">
              {HERO.titleLines.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && ' '}
                  <span>{line}</span>
                </Fragment>
              ))}
            </h1>
            <p className="cp-hero__lead">{HERO.lead}</p>

            <div className="cp-actions">
              <a href="#earning" className="cp-btn cp-btn--primary cp-rhp-btn">
                See the payback plan
              </a>
              <a href="#investment" className="cp-btn cp-btn--ghost">
                See the investment
              </a>
            </div>
          </div>

          <dl className="cp-hero__stats">
            {HERO.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="cp-sr">{stat.label}</dt>
                <dd>
                  <p className="cp-figure cp-hero__statvalue">{stat.value}</p>
                  <p className="cp-hero__statlabel">{stat.label}</p>
                </dd>
              </div>
            ))}
          </dl>

          <p className="cp-eyebrow cp-eyebrow--xs cp-hero__meta">{HERO.meta}</p>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 01  Overview                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section id="overview" tone="raised">
        <SectionHeader
          number={OVERVIEW.number}
          label={OVERVIEW.label}
          title={OVERVIEW.title}
          lead={OVERVIEW.lead}
        />

        <div className="cp-grid cp-grid--3 cp-grid--gap-lg">
          {OVERVIEW.points.map((point, i) => (
            <div key={point.label} className="cp-card cp-card--lg cp-card--flat">
              <p className="cp-eyebrow cp-eyebrow--accent cp-eyebrow--xs">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="cp-display cp-h3" style={{ marginTop: 12 }}>
                {point.label}
              </h3>
              <div className="cp-card__foot">
                <p className="cp-body cp-body--sm">{point.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 02  Earning capacity                                  anchor: earning */}
      {/* ------------------------------------------------------------------ */}
      <Section id="earning">
        <SectionHeader
          number={EARNING.number}
          label={EARNING.label}
          title={EARNING.title}
          lead={EARNING.lead}
        />

        <p className="cp-body cp-body--bright">{EARNING.anchorNote}</p>

        <h3 className="cp-display cp-h3 cp-rhp-subtitle">{EARNING.payback.title}</h3>
        <p className="cp-body cp-body--sm" style={{ marginTop: 12 }}>
          {EARNING.payback.intro}
        </p>

        <DataTable
          caption={EARNING.payback.title}
          columns={EARNING.payback.columns}
          rows={payback.map((r) => [r.level, r.revenue, r.net, r.payback])}
          minWidth={620}
        />
        <p className="cp-rhp-note">{EARNING.payback.note}</p>
        <p className="cp-display cp-rhp-takeaway">{EARNING.payback.takeaway}</p>

        <h3 className="cp-display cp-h3 cp-rhp-subtitle">{EARNING.streams.title}</h3>
        <p className="cp-body cp-body--sm" style={{ marginTop: 12, maxWidth: '46em' }}>
          {EARNING.streams.intro}
        </p>

        <ol className="cp-rhp-streams">
          {EARNING.streams.items.map((item, i) => (
            <li key={item.name} className="cp-numbered">
              <span className="cp-numbered__n cp-display">{i + 1}</span>
              <div style={{ paddingTop: 2 }}>
                <p className="cp-body cp-body--bright" style={{ fontWeight: 600 }}>
                  {item.name}
                </p>
                <p className="cp-body cp-body--sm" style={{ marginTop: 6 }}>
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="cp-display cp-h3 cp-rhp-subtitle">{EARNING.scenarios.title}</h3>
        <p className="cp-body cp-body--sm" style={{ marginTop: 12, maxWidth: '46em' }}>
          {EARNING.scenarios.intro}
        </p>

        <DataTable
          caption={EARNING.scenarios.title}
          columns={EARNING.scenarios.columns}
          rows={scenarios.map((r) => [
            r.name,
            r.placements,
            r.visits,
            r.inWorld,
            r.revenue,
            r.cost,
            r.breakeven,
          ])}
          minWidth={900}
        />
        <p className="cp-rhp-note">{EARNING.scenarios.costNote}</p>
        <p className="cp-body cp-body--sm" style={{ marginTop: 20 }}>
          {EARNING.scenarios.closing}
        </p>
        <p className="cp-rhp-note">Source: {EARNING.scenarios.closingSource}</p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 03  The three phases                                      anchor: build */}
      {/* ------------------------------------------------------------------ */}
      <Section id="build" tone="raised">
        <SectionHeader
          number={PHASES.number}
          label={PHASES.label}
          title={PHASES.title}
          lead={PHASES.lead}
        />

        <div className="cp-grid cp-grid--3 cp-grid--gap-lg">
          {PHASES.items.map((phase) => (
            <div key={phase.n} className="cp-card cp-card--lg">
              <Eyebrow tone="accent">Phase {phase.n}</Eyebrow>
              <h3 className="cp-display cp-h3" style={{ marginTop: 12 }}>
                {phase.name}
              </h3>
              <div className="cp-card__foot cp-card__foot--lg">
                <Figure value={usd(phase.fee)} accent="lime" size="sm" />
                <p className="cp-eyebrow cp-eyebrow--xs" style={{ marginTop: 12 }}>
                  {phase.duration}
                </p>
                <p className="cp-eyebrow cp-eyebrow--xs" style={{ marginTop: 6 }}>
                  {phase.paid}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="cp-body cp-body--sm" style={{ marginTop: 24, maxWidth: '50em' }}>
          {PHASES.phase0Note}
        </p>

        {PHASES.items.map((phase) => (
          <div key={phase.n} className="cp-card cp-card--lg cp-card--flat" style={{ marginTop: 24 }}>
            <div className="cp-rhp-phase">
              <div>
                <Eyebrow tone="accent">Phase {phase.n}</Eyebrow>
                <h3 className="cp-display cp-h3" style={{ marginTop: 12 }}>
                  {phase.name}
                </h3>
                <div className="cp-rhp-phase__meta">
                  <Tag>{usd(phase.fee)}</Tag>
                  <Tag>{phase.duration}</Tag>
                </div>
                <p className="cp-body cp-body--sm" style={{ marginTop: 20 }}>
                  {phase.summary}
                </p>
              </div>

              <div>
                <Eyebrow>{phase.listTitle}</Eyebrow>
                <ul className="cp-rhp-list">
                  {phase.list.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
                <p className="cp-rhp-phase__reviews">{phase.reviews}</p>
              </div>
            </div>
          </div>
        ))}

        <h3 className="cp-display cp-h3 cp-rhp-subtitle">{PHASES.milestones.title}</h3>
        <DataTable
          caption={PHASES.milestones.title}
          columns={PHASES.milestones.columns}
          rows={PHASES.milestones.rows}
          minWidth={760}
        />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 04  Safe by design                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <SectionHeader
          number={SECURITY.number}
          label={SECURITY.label}
          title={SECURITY.title}
          lead={SECURITY.lead}
        />

        <div className="cp-grid cp-grid--3 cp-grid--gap-lg">
          {SECURITY.points.map((point) => (
            <div key={point.label} className="cp-card cp-card--lg cp-card--deep">
              <h3 className="cp-display cp-h3">{point.label}</h3>
              <div className="cp-card__foot">
                <p className="cp-body cp-body--sm">{point.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 05  Investment                                    anchor: investment */}
      {/* ------------------------------------------------------------------ */}
      <Section id="investment" tone="raised">
        <SectionHeader
          number={INVEST.number}
          label={INVEST.label}
          title={INVEST.title}
          lead={INVEST.lead}
        />

        <DataTable
          caption="Investment by phase"
          columns={INVEST.columns}
          rows={INVEST.rows}
          emphasisRow={4}
          minWidth={820}
        />

        <div className="cp-grid cp-grid--3 cp-grid--gap-lg" style={{ marginTop: 24 }}>
          {INVEST.notes.map((note) => (
            <div key={note.label} className="cp-card cp-card--lg cp-card--flat">
              <Eyebrow>{note.label}</Eyebrow>
              <p className="cp-body cp-body--sm" style={{ marginTop: 12 }}>
                {note.body}
              </p>
            </div>
          ))}
        </div>

        <p className="cp-rhp-note">
          Live operations are optional after the first four weeks and are priced between{' '}
          {usd(5_000)} and {usd(8_000)} a month. Additional revision rounds are{' '}
          {usd(FEES.revisionRound)} each.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 06  Timeline                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <SectionHeader
          number={TIMELINE.number}
          label={TIMELINE.label}
          title={TIMELINE.title}
          lead={TIMELINE.lead}
        />

        <ol className="cp-steps">
          <span aria-hidden="true" className="cp-steps__spine" />
          {TIMELINE.steps.map((step) => (
            <li key={step.n} className="cp-steps__item">
              <span className="cp-steps__dot cp-display">{step.n}</span>
              <div className="cp-steps__body">
                <p className="cp-eyebrow cp-eyebrow--xs">{step.when}</p>
                <h3 className="cp-display cp-h3" style={{ marginTop: 8 }}>
                  {step.name}
                </h3>
                <p className="cp-body cp-body--sm" style={{ marginTop: 8 }}>
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 07  Next steps                                          anchor: next */}
      {/* ------------------------------------------------------------------ */}
      <Section id="next" tone="raised">
        <div className="cp-split">
          <div className="cp-split__wide">
            <SectionHeader
              number={NEXT.number}
              label={NEXT.label}
              title={NEXT.title}
              tight
            />

            <ol>
              {NEXT.steps.map((step, i) => (
                <li key={step} className="cp-numbered">
                  <span className="cp-numbered__n cp-display">{i + 1}</span>
                  <p className="cp-body cp-body--bright" style={{ paddingTop: 4 }}>
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            <div className="cp-actions">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cp-btn cp-btn--primary cp-rhp-btn"
              >
                Book the discovery session
              </a>
              <a href={`tel:${CHECKPOINT_NEXT.contact.phone}`} className="cp-btn cp-btn--ghost">
                Call {CHECKPOINT_NEXT.contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="cp-split__narrow">
            <div className="cp-contact cp-gridlines">
              <img
                src="/images/checkpoint/blocks-isometric.webp"
                alt=""
                width={900}
                height={922}
                className="cp-contact__art"
                loading="lazy"
                decoding="async"
              />

              <div
                style={{
                  marginTop: 32,
                  borderTop: '1px solid var(--cp-line)',
                  paddingTop: 32,
                }}
              >
                <Eyebrow tone="accent">Your contact</Eyebrow>
                <p className="cp-display cp-cream" style={{ marginTop: 16, fontSize: 25 }}>
                  {CHECKPOINT_NEXT.contact.name}
                </p>
                <p className="cp-body cp-body--sm" style={{ marginTop: 4 }}>
                  Co-Founder, {CHECKPOINT_NAME}
                </p>
                <ul className="cp-contact__list cp-body--sm">
                  <li>
                    <a
                      href={`tel:${CHECKPOINT_NEXT.contact.phone}`}
                      className="cp-link cp-link--bright"
                    >
                      {CHECKPOINT_NEXT.contact.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a
                      href={CHECKPOINT_SITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cp-link cp-link--bright"
                    >
                      {CHECKPOINT_NEXT.contact.siteLabel}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p
          className="cp-body"
          style={{
            marginTop: 48,
            borderTop: '1px solid var(--cp-line)',
            paddingTop: 24,
            fontSize: 16,
          }}
        >
          {CLOSING_NOTE}
        </p>
      </Section>
    </>
  );
}
