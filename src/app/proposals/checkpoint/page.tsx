import { Fragment } from 'react';
import type { Metadata } from 'next';
import { AgeDonut, AttentionBars, RegionBars } from '@/components/checkpoint/Charts';
import HeroVideo from '@/components/checkpoint/HeroVideo';
import SectionNav from '@/components/checkpoint/SectionNav';
import Showreel from '@/components/checkpoint/Showreel';
import {
  Container,
  Eyebrow,
  Figure,
  Kicker,
  Section,
  SectionHeader,
  SourceNote,
  StatCard,
  Tag,
} from '@/components/checkpoint/primitives';
import {
  AUDIENCE,
  BOHO,
  CHANGE,
  CHECKPOINT_DECK_DATE,
  CHECKPOINT_NAME,
  CHECKPOINT_PATH,
  CHECKPOINT_SITE,
  CHECKPOINT_TAGLINE,
  COLLAB,
  BOOKING_URL,
  FORMATS,
  HERO,
  HERO_MEDIA,
  INVESTMENT,
  LIVE_OPS,
  NEXT_STEPS,
  PLATFORM,
  PLATFORM_STATS,
  PROCESS,
  PROOF,
  REVENUE,
  REEL,
  SAFETY,
  SHIFT,
  SOURCES,
  TEAM,
  TRAFFIC,
  UNVERIFIED_SOURCES,
  VERIFIED_SOURCES,
} from '@/lib/checkpoint-proposal';

const SITE_URL = 'https://www.realgrowthagency.com';
const OG_IMAGE = '/images/checkpoint/og-checkpoint-proposal.jpg';

const TITLE = `${CHECKPOINT_NAME} | Roblox worlds, built and run for brands`;
const DESCRIPTION =
  'Checkpoint designs, builds and runs Roblox worlds for brands, and the traffic engine that fills them. Brand partnerships proposal.';

export const metadata: Metadata = {
  /*
   * `absolute` escapes the root layout's "%s | Real Growth Agency" template.
   * This page presents Checkpoint to Checkpoint's prospects; the agency's name
   * belongs in the footer credit, not in the browser tab of a client pitch.
   */
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${CHECKPOINT_PATH}` },
  /*
   * Deliberately excluded from search.
   *
   * This is a pitch document prepared for named prospects, not a page anyone
   * should arrive at from a search result. It is also not ours to rank: it
   * presents a third party's brand, pricing and client results.
   *
   * `nocache` and the Google-specific directives stop an assistant or a SERP
   * feature surfacing a cached copy after the link stops being shared.
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
  /*
   * A share card still matters on a noindex page: the link is pasted into
   * email, Slack and WhatsApp, and an unfurl falling back to the Real Growth
   * Agency card would undercut the pitch at the moment it lands.
   */
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${CHECKPOINT_PATH}`,
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${CHECKPOINT_NAME}: Roblox worlds, built and run for brands`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function CheckpointProposalPage() {
  return (
    <>
      {/* Fixed prev/next arrows. Walks the same anchors as the header nav. */}
      <SectionNav />

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section id="top" className="cp-hero">
        <div className="cp-hero__bg">
          {/*
            Still first, motion on top. The <img> is the hero's actual
            background and always renders; HeroVideo fades a silent loop of the
            same footage over it on wide screens where motion is welcome. With
            JS off, on a phone, or under reduced-motion, this still is the
            whole hero and nothing extra is downloaded.
          */}
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
              {/*
                The space between the lines is deliberate. Each line is its own
                block so the break is the copy's, but without it the accessible
                name runs the two sentences together as "worlds.You".
              */}
              {HERO.titleLines.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && ' '}
                  <span>{line}</span>
                </Fragment>
              ))}
            </h1>
            <p className="cp-hero__lead">{HERO.lead}</p>

            <div className="cp-actions">
              <a href="#next" className="cp-btn cp-btn--primary">
                Book a 45-minute brief
              </a>
              <a href="#work" className="cp-btn cp-btn--ghost">
                See the work
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
      {/* 02  The opportunity                              anchor: opportunity */}
      {/* ------------------------------------------------------------------ */}
      {/*
        The shift and the platform's size were two sections making one
        argument, so they are one section. It keeps the same centre measure as
        every other band: a single full-width section read as a break in the
        page rather than as emphasis.
      */}
      <Section id="opportunity" tone="raised">
        <SectionHeader number={SHIFT.number} label={SHIFT.label} title={SHIFT.title} />

        <div className="cp-split">
          <div className="cp-split__narrow">
            {SHIFT.body.map((paragraph) => (
              <p key={paragraph} className="cp-body">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="cp-split__wide">
            <div className="cp-card cp-card--lg cp-card--flat">
              <Figure
                value={SHIFT.attention.value}
                unit={SHIFT.attention.unit}
                accent="lime"
                size="lg"
              />
              <p className="cp-card__label" style={{ maxWidth: '28em' }}>
                {SHIFT.attention.caption}
              </p>
              <div
                style={{
                  marginTop: 40,
                  borderTop: '1px solid var(--cp-line)',
                  paddingTop: 40,
                }}
              >
                <AttentionBars rows={SHIFT.comparison} />
              </div>
            </div>
          </div>
        </div>

        <div className="cp-subhead">
          <Eyebrow tone="accent">{PLATFORM.label}</Eyebrow>
          <h3 className="cp-display cp-h3">{PLATFORM.title}</h3>
        </div>

        <div className="cp-grid cp-grid--5up">
          {PLATFORM_STATS.map((stat) => (
            <StatCard
              key={stat.value}
              value={stat.value}
              label={stat.label}
              note={stat.note}
              accent={stat.accent}
            />
          ))}
        </div>

        <SourceNote source={SHIFT.source} />
        <SourceNote source={PLATFORM.source} />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 03  Who is there                                                    */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <SectionHeader number={AUDIENCE.number} label={AUDIENCE.label} title={AUDIENCE.title} />

        <div className="cp-grid cp-grid--2md cp-grid--gap-lg">
          <div className="cp-card cp-card--lg cp-card--flat">
            <Eyebrow>{AUDIENCE.ageCaption}</Eyebrow>
            <div style={{ marginTop: 32 }}>
              <AgeDonut segments={AUDIENCE.ages} centreValue="65%" centreLabel="13 OR OLDER" />
            </div>
            <div className="cp-card__foot cp-card__foot--lg">
              <p className="cp-body cp-body--sm">{AUDIENCE.ageNote}</p>
            </div>
          </div>

          <div className="cp-card cp-card--lg cp-card--flat">
            <Eyebrow>{AUDIENCE.regionCaption}</Eyebrow>
            <div style={{ marginTop: 32 }}>
              <RegionBars regions={AUDIENCE.regions} unit={AUDIENCE.regionUnit} />
            </div>
            <div className="cp-card__foot cp-card__foot--lg">
              <p className="cp-body cp-body--sm">{AUDIENCE.spendNote}</p>
            </div>
          </div>
        </div>

        <SourceNote source={AUDIENCE.source} />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 04  What has changed                                                */}
      {/* ------------------------------------------------------------------ */}
      {/*
        The proof and the lesson drawn from it, together. Brands are winning
        here, and the second half says what separates the ones that do; split
        across two sections a reader could take the first and stop.
      */}
      <Section tone="raised">
        <SectionHeader number={PROOF.number} label={PROOF.label} title={PROOF.title} />

        <div className="cp-grid cp-grid--4">
          {PROOF.cases.map((item) => (
            <div key={item.brand} className="cp-card cp-card--flat">
              <p className="cp-display cp-body--sm cp-cream">{item.brand}</p>
              <div style={{ marginTop: 16 }}>
                <Figure value={item.value} accent="lime" size="sm" />
              </div>
              <div className="cp-card__foot">
                <p className="cp-body cp-body--sm">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cp-card cp-card--coral" style={{ marginTop: 16 }}>
          <p className="cp-display cp-body--sm cp-coral">{PROOF.commerce.brands}</p>
          <p className="cp-body cp-body--sm cp-body--bright" style={{ marginTop: 8 }}>
            {PROOF.commerce.detail}
          </p>
        </div>

        <div className="cp-subhead">
          <Eyebrow tone="accent">{CHANGE.label}</Eyebrow>
          <h3 className="cp-display cp-h3">{CHANGE.title}</h3>
        </div>

        <div className="cp-grid cp-grid--2md cp-grid--gap-lg">
          {CHANGE.columns.map((column) => {
            const positive = column.tone === 'positive';
            return (
              <div
                key={column.heading}
                className={`cp-card cp-card--lg${positive ? ' cp-card--lime' : ''}`}
              >
                <Eyebrow tone={positive ? 'accent' : 'muted'}>{column.heading}</Eyebrow>
                <div style={{ marginTop: 24 }}>
                  <Figure value={column.value} accent={positive ? 'lime' : 'coral'} size="lg" />
                </div>
                <p className="cp-card__label" style={{ fontWeight: 500 }}>
                  {column.valueLabel}
                </p>
                <div className="cp-card__foot cp-card__foot--lg">
                  <p className="cp-body cp-body--sm">{column.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="cp-display cp-lime" style={{ marginTop: 32, fontSize: 28 }}>
          {CHANGE.kicker}
        </p>

        <SourceNote source={PROOF.source} />
        <SourceNote source={CHANGE.source} />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 05  Who we are                                        anchor: studio */}
      {/* ------------------------------------------------------------------ */}
      <Section id="studio" tone="raised">
        <SectionHeader number={TEAM.number} label={TEAM.label} title={TEAM.title} />

        <div className="cp-grid cp-grid--3 cp-grid--gap-lg">
          {TEAM.people.map((person) => (
            <article key={person.name} className="cp-card cp-card--lg cp-card--flat">
              <span aria-hidden="true" className={`cp-avatar cp-avatar--${person.accent} cp-display`}>
                {person.initial}
              </span>
              <p className="cp-eyebrow cp-eyebrow--xs" style={{ marginTop: 24 }}>
                {person.role}
              </p>
              <h3 className="cp-display cp-h3" style={{ marginTop: 8 }}>
                {person.name}
              </h3>
              <p className="cp-body cp-body--sm" style={{ marginTop: 12 }}>
                {person.bio}
              </p>
            </article>
          ))}
        </div>

        <p className="cp-display cp-cream" style={{ marginTop: 32, fontSize: 24, fontWeight: 500 }}>
          {TEAM.kicker}
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 06  Showreel                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section id="reel" tone="raised">
        <div className="cp-reel__head">
          <div>
            <Kicker number={REEL.number} label={REEL.label} />
            <h2 className="cp-display cp-h2" style={{ marginTop: 20 }}>
              {REEL.title}
            </h2>
          </div>
          <p className="cp-body cp-reel__lead">{REEL.lead}</p>
        </div>

        <Showreel />

        <div className="cp-reel__foot">
          <p className="cp-body cp-body--sm">{REEL.caption}</p>
          <p className="cp-eyebrow cp-eyebrow--xs">{REEL.covers}</p>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 07  Boho Salon                                          anchor: work */}
      {/* ------------------------------------------------------------------ */}
      <Section id="work">
        <div className="cp-section__head">
          <Kicker number={BOHO.number} label={BOHO.label} />
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px 16px',
            }}
          >
            <h2 className="cp-display cp-h2" style={{ margin: 0 }}>
              {BOHO.title}
            </h2>
            <Tag>{BOHO.tag}</Tag>
          </div>
          <p className="cp-body" style={{ marginTop: 12 }}>
            {BOHO.subtitle}
          </p>
        </div>

        <ul className="cp-rail">
          {BOHO.gallery.map((shot, i) => (
            <li key={shot.src}>
              <figure className="cp-shot">
                <div className="cp-shot__frame">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width={1200}
                    height={675}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <figcaption className="cp-eyebrow cp-eyebrow--xs cp-shot__cap">
                  {shot.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="cp-grid cp-grid--2md cp-grid--gap-lg" style={{ marginTop: 40 }}>
          <div className="cp-card">
            <Eyebrow>{BOHO.brief.heading}</Eyebrow>
            <p className="cp-body cp-body--bright" style={{ marginTop: 12 }}>
              {BOHO.brief.body}
            </p>
          </div>
          <div className="cp-card">
            <Eyebrow>{BOHO.built.heading}</Eyebrow>
            <p className="cp-body cp-body--bright" style={{ marginTop: 12 }}>
              {BOHO.built.body}
            </p>
          </div>
        </div>

        <div className="cp-card cp-card--lg cp-card--lime" style={{ marginTop: 40 }}>
          <Eyebrow tone="accent">{BOHO.resultsHeading}</Eyebrow>
          <dl className="cp-results">
            {BOHO.results.map((result) => (
              <div key={result.label}>
                <dt className="cp-sr">{result.label}</dt>
                <dd>
                  <Figure value={result.value} accent="lime" size="sm" />
                  <p className="cp-body cp-body--sm" style={{ marginTop: 8 }}>
                    {result.label}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
          <div className="cp-results__foot">
            <p className="cp-body cp-body--sm">{BOHO.resultsNote}</p>
            <ul className="cp-tags">
              {BOHO.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>

        {/*
          The award used to be the tail of a sentence. The studio site gives it
          a panel of its own, which is the right weight: an industry award is
          third-party proof, and proof is the scarcest thing in a pitch.
        */}
        <div className="cp-recog">
          <p className="cp-eyebrow cp-eyebrow--accent">{BOHO.recognition.eyebrow}</p>
          <p className="cp-display cp-recog__title">{BOHO.recognition.title}</p>
          <p className="cp-body cp-body--sm cp-recog__meta">
            {BOHO.recognition.subject}
            <span aria-hidden="true" className="cp-source__sep">
              /
            </span>
            {BOHO.recognition.event}
          </p>
        </div>

        <SourceNote source={BOHO.source} />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 08  Lil Pump collaboration                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="raised">
        <div className="cp-section__head">
          <Kicker number={COLLAB.number} label={COLLAB.label} />
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px 16px',
            }}
          >
            <h2 className="cp-display cp-h2" style={{ margin: 0 }}>
              {COLLAB.title}
            </h2>
            <Tag>{COLLAB.tag}</Tag>
          </div>
          <p className="cp-body" style={{ marginTop: 16 }}>
            <span className="cp-cream" style={{ fontWeight: 500 }}>
              {COLLAB.partner}.
            </span>{' '}
            {COLLAB.built.body}
          </p>
        </div>

        <div className="cp-grid cp-grid--2 cp-grid--gap-lg">
          {COLLAB.assets.map((asset) => (
            <figure key={asset.src} className="cp-asset">
              <div className="cp-asset__frame">
                <img
                  src={asset.src}
                  alt={asset.alt}
                  width={1000}
                  height={1236}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="cp-asset__cap">
                <p className="cp-display cp-cream" style={{ fontSize: 20 }}>
                  {asset.title}
                </p>
                <p className="cp-body cp-body--sm" style={{ marginTop: 6 }}>
                  {asset.detail}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 09  How a world earns                                               */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="raised">
        <SectionHeader
          number={REVENUE.number}
          label={REVENUE.label}
          title={REVENUE.title}
          lead={REVENUE.lead}
        />

        <ol className="cp-streams">
          {REVENUE.streams.map((stream, i) => (
            <li key={stream.name} className="cp-stream">
              <div className="cp-stream__head">
                <span className="cp-eyebrow cp-eyebrow--xs cp-stream__n">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="cp-display cp-stream__name">{stream.name}</h3>
                <Tag>{stream.tag}</Tag>
              </div>

              <p className="cp-body cp-body--sm cp-stream__body">{stream.body}</p>

              <ul className="cp-stream__points">
                {stream.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              {'caveat' in stream && stream.caveat && (
                <p className="cp-stream__caveat">
                  <span className="cp-eyebrow cp-eyebrow--xs">Worth knowing</span>
                  {stream.caveat}
                </p>
              )}
            </li>
          ))}
        </ol>

        <SourceNote source={REVENUE.source} />
        <SourceNote source={REVENUE.commerceSource} />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 10  Go to market                                                    */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <SectionHeader number={TRAFFIC.number} label={TRAFFIC.label} title={TRAFFIC.title} />

        {/*
          The deck drew this as a radial hub with five spokes, which is where
          most of its misalignment lived: the spokes could not be kept at equal
          length or angle, and the labels collided. The same idea reads better
          as a hub card against a numbered list of inbound channels, and it
          survives a 375px screen without redrawing.
        */}
        <div className="cp-split">
          <div className="cp-split__third">
            <div className="cp-hub cp-gridlines">
              <Eyebrow tone="accent">{TRAFFIC.hubLabel}</Eyebrow>
              <p className="cp-display cp-cream" style={{ marginTop: 16, fontSize: 30 }}>
                {TRAFFIC.hubName}
              </p>
              <span aria-hidden="true" className="cp-hub__rule" />
              <p className="cp-body cp-body--sm" style={{ marginTop: 24 }}>
                Five inbound channels, live from day one and tuned every month.
              </p>
            </div>
          </div>

          <ol className="cp-split__twothirds">
            {TRAFFIC.channels.map((channel, i) => (
              <li key={channel} className="cp-channel">
                <span className="cp-figure cp-channel__n">{String(i + 1).padStart(2, '0')}</span>
                <p className="cp-body cp-body--sm cp-body--bright">{channel}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 11  How we work                                                     */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="raised">
        <SectionHeader number={PROCESS.number} label={PROCESS.label} title={PROCESS.title} />

        <ol className="cp-steps">
          <span aria-hidden="true" className="cp-steps__spine" />
          {PROCESS.steps.map((step) => (
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

        <p className="cp-display cp-lime" style={{ marginTop: 48, fontSize: 28 }}>
          {PROCESS.kicker}
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 12  Keeping it alive                                                */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="raised">
        <SectionHeader number={LIVE_OPS.number} label={LIVE_OPS.label} title={LIVE_OPS.title} />

        <div className="cp-split">
          <div className="cp-split__half">
            {LIVE_OPS.body.map((paragraph) => (
              <p key={paragraph} className="cp-body">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="cp-split__half">
            <div className="cp-card cp-card--lg cp-card--flat">
              <Eyebrow tone="accent">{LIVE_OPS.reportHeading}</Eyebrow>
              <ul className="cp-metrics">
                {LIVE_OPS.metrics.map((metric) => (
                  <li key={metric}>
                    <span aria-hidden="true" className="cp-dot" />
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 13  Safe by design                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="raised">
        <SectionHeader number={SAFETY.number} label={SAFETY.label} title={SAFETY.title} />

        <ul className="cp-grid cp-grid--3 cp-grid--gap-lg">
          {SAFETY.points.map((point) => (
            <li key={point} className="cp-card cp-card--flat">
              <span aria-hidden="true" className="cp-check">
                <svg viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10.5 8 14.5 16 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="cp-body cp-body--sm cp-body--bright" style={{ marginTop: 20 }}>
                {point}
              </p>
            </li>
          ))}
        </ul>

        <SourceNote source={SAFETY.source} />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 14  What we build                                      anchor: build */}
      {/* ------------------------------------------------------------------ */}
      <Section id="build">
        <div className="cp-build">
          <div className="cp-build__intro">
            <Kicker number={FORMATS.number} label={FORMATS.label} />
            <h2 className="cp-display cp-h2 cp-build__title">{FORMATS.title}</h2>
            <p className="cp-body" style={{ marginTop: 20, maxWidth: '30em' }}>
              {FORMATS.lead}
            </p>
            <a href="#next" className="cp-build__cta">
              {FORMATS.ctaLabel}
              <span aria-hidden="true">&#8599;</span>
            </a>
          </div>

          {/*
            Native <details>, open by default. A disclosure list is the right
            shape here: five things, each a sentence or two, and a reader who
            only wants the headings can close them. Using the element the
            browser already ships means it works with no JavaScript, carries
            its own keyboard and screen-reader behaviour, and cannot get out of
            sync with a piece of state.
          */}
          <ul className="cp-build__list">
            {FORMATS.options.map((option, i) => (
              <li key={option.name}>
                <details open className="cp-build__item">
                  <summary className="cp-build__summary">
                    <span className="cp-eyebrow cp-eyebrow--xs cp-build__n">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="cp-build__name">{option.name}</span>
                    <span aria-hidden="true" className="cp-build__mark" />
                  </summary>
                  <p className="cp-body cp-body--sm cp-build__body">{option.body}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>

        <div className="cp-card cp-card--deep" style={{ marginTop: 40 }}>
          <Eyebrow tone="accent">{FORMATS.addOnsLabel}</Eyebrow>
          <ul className="cp-pills">
            {FORMATS.addOns.map((addOn) => (
              <li key={addOn}>{addOn}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 15  Investment                                    anchor: investment */}
      {/* ------------------------------------------------------------------ */}
      <Section id="investment">
        <SectionHeader
          number={INVESTMENT.number}
          label={INVESTMENT.label}
          title={INVESTMENT.title}
          lead={INVESTMENT.disclaimer}
        />

        <div className="cp-grid cp-grid--3 cp-grid--gap-lg">
          {INVESTMENT.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`cp-card cp-card--lg${tier.featured ? ' cp-card--lime-strong' : ''}`}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 12,
                  minHeight: 24,
                }}
              >
                <h3 className="cp-display cp-h3">{tier.name}</h3>
                {tier.featured && <Tag>Most chosen</Tag>}
              </div>
              {/*
                `margin-top: auto` on the price block pins every tier's price
                and duration to the same line from the bottom, so the three
                cards read as a row whatever the length of the name above.
              */}
              <div className="cp-card__foot cp-card__foot--lg">
                <p
                  className={`cp-figure cp-figure--sm ${
                    tier.featured ? 'cp-lime' : 'cp-cream'
                  }`}
                >
                  {tier.price}
                </p>
                <p className="cp-eyebrow cp-eyebrow--xs" style={{ marginTop: 12 }}>
                  {tier.duration}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="cp-grid cp-grid--2md cp-grid--gap-lg" style={{ marginTop: 16 }}>
          {INVESTMENT.ongoing.map((item) => (
            <div key={item.label} className="cp-card cp-card--deep">
              <Eyebrow>{item.label}</Eyebrow>
              <p className="cp-display cp-cream" style={{ marginTop: 12, fontSize: 23 }}>
                {item.value}
              </p>
              <div className="cp-card__foot">
                <p className="cp-body cp-body--sm">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 16  Next steps                                          anchor: next */}
      {/* ------------------------------------------------------------------ */}
      <Section id="next">
        <div className="cp-split">
          <div className="cp-split__wide">
            <SectionHeader
              number={NEXT_STEPS.number}
              label={NEXT_STEPS.label}
              title={NEXT_STEPS.title}
              tight
            />

            <ol>
              {NEXT_STEPS.steps.map((step, i) => (
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
                className="cp-btn cp-btn--primary"
              >
                Book a 45-minute brief
              </a>
              <a href={`tel:${NEXT_STEPS.contact.phone}`} className="cp-btn cp-btn--ghost">
                Call {NEXT_STEPS.contact.phoneDisplay}
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
                  {NEXT_STEPS.contact.name}
                </p>
                <p className="cp-body cp-body--sm" style={{ marginTop: 4 }}>
                  {NEXT_STEPS.contact.role}
                </p>
                <ul className="cp-contact__list cp-body--sm">
                  <li>
                    <a href={`tel:${NEXT_STEPS.contact.phone}`} className="cp-link cp-link--bright">
                      {NEXT_STEPS.contact.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a
                      href={CHECKPOINT_SITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cp-link cp-link--bright"
                    >
                      {NEXT_STEPS.contact.siteLabel}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Sources                                                             */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="raised" tight>
        <Eyebrow>Sources</Eyebrow>
        <div className="cp-sources">
          <ul>
            {VERIFIED_SOURCES.map((key) => (
              <li key={key}>
                <span aria-hidden="true" className="cp-lime">
                  &bull;
                </span>
                {SOURCES[key].full}
              </li>
            ))}
          </ul>
          <ul>
            {UNVERIFIED_SOURCES.map((key) => (
              <li key={key}>
                <span aria-hidden="true" className="cp-coral">
                  &bull;
                </span>
                {SOURCES[key].full}
              </li>
            ))}
          </ul>
        </div>
        <p
          className="cp-body"
          style={{
            marginTop: 32,
            borderTop: '1px solid var(--cp-line)',
            paddingTop: 24,
            fontSize: 16,
          }}
        >
          Figures are current as at {CHECKPOINT_DECK_DATE}. Platform metrics move quarter to
          quarter; the live figures are restated in the brief session.
        </p>
      </Section>
    </>
  );
}
