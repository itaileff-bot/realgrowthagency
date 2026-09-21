/**
 * Checkpoint x brand partnerships: the client-facing proposal site.
 *
 * Single source of truth for every figure, claim and citation rendered at
 * /proposals/checkpoint. The page component holds layout only; nothing
 * numeric is typed inline there.
 *
 * Why the data lives here rather than in JSX: this is a pitch document that
 * goes to named prospects, so a number that drifts between the hero, a stat
 * card and the sources block is a credibility problem, not a cosmetic one.
 * One object per claim, rendered in every place it appears.
 *
 * SOURCING POLICY
 * ---------------
 * The source deck carried the footnote "Source references to be confirmed
 * before external distribution" on five slides. Rather than invent citations,
 * every claim declares a `source` key resolving to SOURCES below:
 *
 *   - `verified: true`  the deck named a specific, checkable document. It is
 *     attributed by name on the page.
 *   - `verified: false` the deck asserted the figure without naming a
 *     document. It is attributed to its general class of source and listed
 *     under the "available on request" note, so nothing on the page claims a
 *     citation that does not exist.
 *
 * To promote a source: confirm the underlying document, add its title and
 * publisher here, and flip `verified` to true. The page updates everywhere.
 */

/*
 * Contact details are declared here rather than imported, because this repo
 * has no site-identity module.
 *
 * There is deliberately no address here. The only one available was the
 * agency's own, and an agency reply-to on a page credited to Checkpoint Games
 * reads as the wrong company having written the pitch. The response paths are
 * the booking link and the phone. To put one back, declare it here and render
 * it again in the footer and in section 17.
 */
const CONTACT_PHONE = "+1-424-397-3047";
const CONTACT_PHONE_DISPLAY = "(424) 397-3047";
export const BOOKING_URL =
  "https://calendly.com/itai-cpg-advisory/30min?utm_source=realgrowthagency&utm_campaign=checkpoint-proposal";

export const CHECKPOINT_PATH = "/proposals/checkpoint";
export const CHECKPOINT_NAME = "Checkpoint";
export const CHECKPOINT_TAGLINE = "Ideas. Built. Playable.";
export const CHECKPOINT_SITE = "https://checkpointgames.co.uk";
export const CHECKPOINT_DECK_DATE = "September 2026";

/**
 * Published for the proposal's own metadata. Bump MODIFIED whenever the copy
 * or a figure in this file changes so the page's dateModified stays truthful.
 */
export const CHECKPOINT_PUBLISHED = "2026-09-19";
export const CHECKPOINT_MODIFIED = "2026-09-19";

/* -------------------------------------------------------------------------- */
/* Sources                                                                    */
/* -------------------------------------------------------------------------- */

export interface ProposalSource {
  /** Short attribution rendered inline beneath a figure or section. */
  short: string;
  /** Full attribution rendered in the sources block at the foot of the page. */
  full: string;
  /** True only where the source deck named a specific, checkable document. */
  verified: boolean;
}

export const SOURCES = {
  robloxResults: {
    short: "Roblox Q2 2026 results",
    full: "Roblox Corporation, Q2 2026 results and Q4 2025 shareholder letter.",
    verified: true,
  },
  platformData: {
    short: "Roblox platform data",
    full: "Roblox platform engagement and demographic disclosures. Specific references available on request.",
    verified: false,
  },
  brandReporting: {
    short: "Public brand reporting",
    full: "Publicly reported brand campaign results and trade-press coverage. Specific references available on request.",
    verified: false,
  },
  checkpointInternal: {
    short: "Checkpoint studio data",
    full: "Checkpoint studio analytics for Boho Salon, as at September 2026.",
    verified: true,
  },
  robloxMonetisation: {
    short: "Roblox creator monetisation terms",
    full: "Roblox creator monetisation and Developer Exchange terms, including Marketplace revenue shares and advertising eligibility. Rates are set by Roblox and change; specific references available on request.",
    verified: false,
  },

  robloxPolicy: {
    short: "Roblox advertising and safety standards",
    full: "Roblox Community Standards, Advertising Standards and age-verification policy.",
    verified: true,
  },
} as const satisfies Record<string, ProposalSource>;

export type SourceKey = keyof typeof SOURCES;

/** Sources whose underlying document the deck named, for the citation block. */
export const VERIFIED_SOURCES = (
  Object.keys(SOURCES) as SourceKey[]
).filter((key) => SOURCES[key].verified);

/** Sources still to be pinned to a document before external distribution. */
export const UNVERIFIED_SOURCES = (
  Object.keys(SOURCES) as SourceKey[]
).filter((key) => !SOURCES[key].verified);

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Six anchors, not fifteen. The deck ran to seventeen slides; a nav with one
 * entry per slide is unusable on a phone, so the sections are grouped into the
 * six questions a brand actually asks in the room.
 */
export const NAV_SECTIONS = [
  { id: "opportunity", label: "Opportunity" },
  { id: "studio", label: "Studio" },
  { id: "work", label: "Work" },
  { id: "build", label: "What we build" },
  { id: "investment", label: "Investment" },
  { id: "next", label: "Next steps" },
] as const;

/* -------------------------------------------------------------------------- */
/* 01 Hero                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Ambient hero footage: a 19-second silent loop of Checkpoint's own Boho Salon
 * world, cut from the four world shots in the deck as a slow camera move.
 *
 * It is Checkpoint's own world on purpose. A Roblox pitch could be dressed up
 * with gameplay footage pulled off the web, but that footage belongs to
 * whoever captured it, and a studio's own world is the more persuasive thing
 * to put behind its own headline anyway.
 *
 * The Roblox HUD is cropped out at encode time rather than hidden behind a CSS
 * transform, and `poster` is frame 0 of `video` at that same crop, so the still
 * and the first frame of the loop are identical pixels.
 *
 * To swap in real gameplay capture later: replace the file at `video`, export
 * its first frame to `poster`, and change nothing else. Keep it silent (no
 * audio track at all, which is what lets it autoplay), 16:9, and under ~2MB.
 */
export const HERO_MEDIA = {
  /*
   * Two encodes of the same 19-second loop, not a size optimisation but a
   * coverage one: HeroVideo asks the browser which it can decode and attaches
   * only that URL, so nothing downloads twice.
   *
   * H.264 is the universal baseline and what Safari wants for hardware decode.
   * VP9 covers the Chromium builds compiled without proprietary codecs, where
   * the MP4 fails outright with MEDIA_ERR_SRC_NOT_SUPPORTED. At matched
   * quality VP9 also came out slightly smaller here, so most visitors get the
   * lighter file as a side effect.
   */
  video: {
    webm: "/video/checkpoint-boho-loop.webm",
    mp4: "/video/checkpoint-boho-loop.mp4",
  },
  poster: "/images/checkpoint/hero-poster.webp",
  alt: "The Boho Salon world in Roblox: a domed atrium in blush and gold, its styling floor, spa suite and reception hall.",
} as const;

export const HERO = {
  eyebrow: "Roblox worlds, built and run for brands",
  title: "Worlds your audience actually wants to play in",
  lead: "Gen Z and Gen Alpha do not watch brands. They play with them. Checkpoint designs, builds and runs the world they play in, and the traffic engine that fills it.",
  meta: `Checkpoint brand partnerships ${CHECKPOINT_DECK_DATE}`,
  /*
   * Value and label only, no inline unit. A unit set beside the figure pushed
   * "8–16 weeks" past a 375px column and wrapped the figure itself, which
   * knocked the third stat off the row's baseline. Carrying the unit in the
   * label keeps all three figures on one line at every width.
   */
  stats: [
    { value: "41.2M", label: "visits to our own world" },
    { value: "1.4M", label: "community members" },
    { value: "8–16", label: "weeks, brief to live world" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 02 The shift                                                             */
/* -------------------------------------------------------------------------- */

export const SHIFT = {
  number: "02",
  label: "The shift",
  title: "The next generation does not watch brands. They play with them.",
  body: [
    "Gen Z and Gen Alpha spend their free time inside games, not in front of ads.",
    "Roblox is where that time goes: 2.8 hours a day for the average user.",
  ],
  attention: {
    value: "12",
    unit: "minutes",
    caption: "of active attention per visit to a brand world",
  },
  comparison: [
    { label: "Brand world visit", value: "About 12 minutes", weight: 100 },
    { label: "Social ad", value: "Seconds", weight: 4 },
  ],
  source: "platformData" as SourceKey,
} as const;

/* -------------------------------------------------------------------------- */
/* 02 Roblox by the numbers, part of The shift                              */
/* -------------------------------------------------------------------------- */

export const PLATFORM_STATS = [
  {
    value: "123M",
    label: "daily active users",
    note: "Q2 2026, up 10% year over year",
    accent: "lime" as const,
  },
  {
    value: "29B",
    label: "hours played in a single quarter",
    note: "Q2 2026",
    accent: "cream" as const,
  },
  {
    value: "$6.8B",
    label: "in user spending",
    note: "Full year 2025",
    accent: "coral" as const,
  },
  {
    value: "$1.5B",
    label: "paid out to creators",
    note: "Full year 2025",
    accent: "cream" as const,
  },
  {
    value: "27M",
    label: "paying users every month",
    note: "Q2 2026",
    accent: "lime" as const,
  },
] as const;

export const PLATFORM = {
  label: "Roblox by the numbers",
  title: "One of the largest daily audiences in entertainment",
  source: "robloxResults" as SourceKey,
} as const;

/* -------------------------------------------------------------------------- */
/* 03 Who is there                                                          */
/* -------------------------------------------------------------------------- */

export const AUDIENCE = {
  number: "03",
  label: "Who is there",
  title: "Older, more global and better verified than you think",
  ageCaption: "Age, verified by Roblox age checks",
  ageHeadline: "65% are 13 or older",
  ageNote: "In the US, about one in three is 18 or over.",
  /** Ordered largest-first so the donut reads clockwise from the top. */
  ages: [
    { label: "Aged 13 to 17", value: 38, accent: "lime" as const },
    { label: "Under 13", value: 35, accent: "stone" as const },
    { label: "Aged 18 and over", value: 27, accent: "coral" as const },
  ],
  regionCaption: "Daily users by region",
  regions: [
    { label: "Asia-Pacific", value: 41 },
    { label: "Rest of World", value: 34 },
    { label: "Europe", value: 26 },
    { label: "US and Canada", value: 22 },
  ],
  regionUnit: "million daily users",
  spendNote:
    "US and Canada users spend the most by a wide margin: about $39 per daily user per quarter, against $13 in Europe.",
  source: "platformData" as SourceKey,
} as const;

/* -------------------------------------------------------------------------- */
/* 04 Brands already winning                                                */
/* -------------------------------------------------------------------------- */

export const PROOF = {
  number: "04",
  label: "Brands already winning",
  title: "From fashion to fast food, the playbook is proven",
  cases: [
    { brand: "Gucci", value: "20M+", detail: "visitors to its Roblox world" },
    { brand: "Chipotle", value: "17M", detail: "players, 4 million in the first week" },
    { brand: "Nike", value: "7M", detail: "visitors in four months" },
    {
      brand: "Universal Pictures",
      value: "8B",
      detail:
        "impression campaign for Wicked: For Good, and the most-visited brand world of 2025",
    },
  ],
  commerce: {
    brands: "e.l.f. and Fenty Beauty",
    detail: "Selling physical product inside Roblox through Shopify",
  },
  source: "brandReporting" as SourceKey,
} as const;

/* -------------------------------------------------------------------------- */
/* 04 What has changed, part of Brands already winning                      */
/* -------------------------------------------------------------------------- */

export const CHANGE = {
  label: "What has changed",
  title: "Building a world is not enough. It needs an audience plan.",
  columns: [
    {
      heading: "Build and hope",
      value: "−57%",
      valueLabel: "brand-owned worlds in 2025",
      body: "The reason: worlds launched without a traffic plan sat empty.",
      tone: "negative" as const,
    },
    {
      heading: "World + traffic engine",
      value: "+14%",
      valueLabel: "placements inside existing hit games in 2025",
      body: "The brands winning now pair a world with creators, in-game placements, paid Roblox media and regular content updates.",
      tone: "positive" as const,
    },
  ],
  kicker: "That is exactly how we build.",
  source: "brandReporting" as SourceKey,
} as const;

/* -------------------------------------------------------------------------- */
/* 05 Who we are                                                            */
/* -------------------------------------------------------------------------- */

export const TEAM = {
  number: "05",
  label: "Who we are",
  title: "Brand builders and world builders under one roof",
  kicker:
    "Brand strategy, Roblox engineering and world-building under one roof.",
  people: [
    {
      initial: "L",
      name: "Lala",
      role: "Co-Founder / World Builder",
      bio: "Co-Founder of Checkpoint. Leads the Roblox studio behind Boho Salon: 41.2M visits, 1.4M community members and a Bloxy Award.",
      accent: "lime" as const,
    },
    {
      initial: "H",
      name: "Harry Smith",
      role: "Co-Founder / Technical",
      bio: "Co-Founder of Checkpoint and Boho Salon. Leads Roblox engineering, systems architecture and game development.",
      accent: "coral" as const,
    },
    {
      initial: "I",
      name: "Itai Leffler",
      role: "Brand Builder",
      bio: "10 years in major retail and consumer brands; first employee at Beach House Group and founder of multiple consumer brands.",
      accent: "cream" as const,
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 06 Showreel                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The studio's own sixty-second reel, as published on checkpointgames.co.uk.
 *
 * Unlike the hero loop this is a film, not wallpaper: it has a voice, captions
 * and an edit, so it is click-to-play with sound and controls rather than an
 * autoplaying ambience. `preload="none"` means a reader who never presses play
 * never pays for it, which is the whole reason a 60-second file is acceptable
 * on a page that also carries a hero loop.
 */
export const REEL = {
  number: "06",
  label: "Our work in 60 seconds",
  title: "The wider picture.",
  lead: "Worlds, interfaces and gameplay. See them in motion.",
  tag: "Selected work / Showreel",
  duration: "01:00",
  caption: "Real gameplay, from the worlds we are building.",
  covers: "Environments / Interfaces / Interactive systems",
  video: {
    mp4: "/video/checkpoint-showreel.mp4",
    webm: "/video/checkpoint-showreel.webm",
  },
  poster: "/images/checkpoint/showreel-poster.webp",
  label_a11y:
    "Checkpoint showreel: sixty seconds of gameplay from Boho Salon, The Lab and Slime Game.",
} as const;

/* -------------------------------------------------------------------------- */
/* 07 Boho Salon case study                                                 */
/* -------------------------------------------------------------------------- */

export const BOHO = {
  number: "07",
  label: "Our worlds",
  title: "Boho Salon",
  subtitle: "Checkpoint original, beauty and fashion",
  tag: "Commerce and loyalty",
  brief: {
    heading: "The brief",
    body: "A world for styling, self-expression and social play.",
  },
  built: {
    heading: "What we built",
    body: "Grand atrium, styling floor, spa and tanning suites, plus a custom catalogue interface for hair, clothing and accessories.",
  },
  resultsHeading: "Results, September 2026",
  /*
   * The same five figures the studio site publishes, in its order. Revenue is
   * promoted from the sentence it used to sit in: it was already being
   * claimed, and a figure buried in prose is a figure nobody reads.
   */
  results: [
    { value: "1.4M", label: "community members" },
    { value: "41.2M", label: "game visits" },
    { value: "31M+", label: "YouTube views" },
    { value: "270K", label: "favourites" },
    { value: "Millions", label: "USD revenue generated" },
  ],
  resultsNote: "Boho Salon community and reach, September 2026",
  /** The studio site's own framing of what the world is made of. */
  tags: ["Interiors", "Custom interfaces", "Social play"],
  recognition: {
    eyebrow: "Bloxy Award winner",
    title: "Best Clothing Company",
    subject: "Boho Salon",
    event: "5th Annual Bloxy Awards, 2018",
  },
  gallery: [
    {
      src: "/images/checkpoint/boho-atrium.webp",
      alt: "The Boho Salon grand atrium in Roblox: a domed skylight, chandelier and sweeping central staircase in blush and gold.",
      caption: "Grand atrium",
    },
    {
      src: "/images/checkpoint/boho-reception.webp",
      alt: "The Boho Salon reception desk in Roblox, with a curved counter and styling stations behind it.",
      caption: "Reception",
    },
    {
      src: "/images/checkpoint/boho-styling-floor.webp",
      alt: "The Boho Salon styling floor in Roblox: a row of salon chairs and mirrors along a gallery wall.",
      caption: "Styling floor",
    },
    {
      src: "/images/checkpoint/boho-spa.webp",
      alt: "The Boho Salon spa and tanning suite in Roblox, with treatment beds beneath tall arched windows.",
      caption: "Spa and tanning",
    },
  ],
  source: "checkpointInternal" as SourceKey,
} as const;

/* -------------------------------------------------------------------------- */
/* 08 Lil Pump collaboration                                                */
/* -------------------------------------------------------------------------- */

export const COLLAB = {
  number: "08",
  label: "Our worlds",
  title: "Custom assets for a creator collaboration",
  tag: "Creator partnership",
  partner: "Lil Pump",
  built: {
    heading: "What we built",
    body: "Custom 3D assets designed to the artist's look: a personalised salon seat and a tattoo gun, built for play inside Roblox.",
  },
  assets: [
    {
      src: "/images/checkpoint/lilpump-chair.webp",
      alt: "A custom Lil Pump salon chair modelled in 3D: pink upholstery on a gold frame with jewelled detailing.",
      title: "Custom salon seat",
      detail: "Pink upholstery, gold framework",
    },
    {
      src: "/images/checkpoint/lilpump-tattoo-gun.webp",
      alt: "A custom Lil Pump tattoo gun modelled in 3D in pink and gold, with star detailing.",
      title: "Custom tattoo gun",
      detail: "Pink and gold materials, star details",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 09 What we can build                                                     */
/* -------------------------------------------------------------------------- */

/*
 * Lifted from the studio's own "What we can build" page rather than the deck.
 *
 * The deck framed this as four products to buy (Signature World, Pop-Up, Game
 * Integration, Avatar Items). The studio site frames it as five things it can
 * make, starting from whatever the client already has. That is the better
 * frame for a first conversation, and it is the one Checkpoint actually
 * publishes, so the proposal should not contradict it.
 *
 * Rendered as a native disclosure list, open by default: a reader scanning the
 * pitch sees all five, and anyone who wants the page shorter can collapse
 * them. No JavaScript is involved.
 */
export const FORMATS = {
  number: "09",
  label: "What we can build",
  title: "Your idea. A playable possibility.",
  lead: "Full Roblox experiences, branded worlds and special collaborations. We can help shape the right starting point.",
  ctaLabel: "Let us find your starting point",
  options: [
    {
      name: "Full Roblox experiences",
      body: "From the first concept to connected worlds, gameplay and interfaces. We bring the pieces together into an experience people can actually play.",
    },
    {
      name: "Branded worlds and collaborations",
      body: "Bring your brand or a special collaboration into Roblox, from a complete world to custom assets and interactive activities. Our Lil Pump salon seat and tattoo gun show how a distinctive identity can become part of the experience.",
    },
    {
      name: "Interactive systems",
      body: "Crafting, collection, trading, vehicles, building and more. Purposeful mechanics that give players something to do.",
    },
    {
      name: "Custom interfaces",
      body: "Inventories, catalogues, shops and avatar customisation. Clear interfaces designed around the way people play.",
    },
    {
      name: "Build on what is there",
      body: "New features, refreshed environments or improvements to an existing Roblox game. We start by understanding what you already have.",
    },
  ],
  addOnsLabel: "Add-ons",
  addOns: [
    "Physical product sales inside the world",
    "Creator partnerships",
    "Roblox ad campaigns",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 10 How a world earns                                                       */
/* -------------------------------------------------------------------------- */

/**
 * The revenue section, and the one that changes what kind of conversation the
 * pitch is. Everything before it argues for attention; this argues that the
 * attention has a P&L line underneath it.
 *
 * ON THE FIGURES
 * The rates, revenue shares and eligibility thresholds here are Roblox's, not
 * ours, and Roblox changes them. They are attributed to its published
 * monetisation terms and marked unverified, which is this file's way of
 * saying checkable but unchecked: confirm the current numbers before any of
 * it is quoted to a client.
 *
 * Written for any prospect on purpose. The order reflects how well each
 * stream tends to suit a brand-owned world, which holds generally; where a
 * particular pitch needs a different order, reorder it in that pitch rather
 * than bending the general case.
 */
export const REVENUE = {
  number: "10",
  label: "How a world earns",
  title: "Five ways a world pays for itself",
  lead: "What turns the build from a marketing expense into a P&L line, in rough order of how well each suits a brand-owned world.",
  streams: [
    {
      name: "In-experience purchases",
      tag: "Biggest lever",
      body: "Game passes for one-time unlocks, developer products for repeatables, both sold for Robux.",
      points: [
        "Roblox takes its platform cut and the experience owner keeps the remainder",
        "Cashed out through the Developer Exchange at $0.0038 per earned Robux, rising to $0.0054 on qualifying earnings from verified US players aged 18 and over",
        "Minimum 30,000 earned Robux to cash out",
      ],
    },
    {
      name: "Avatar items and UGC",
      tag: "Where partners pay",
      body: "Branded wearables sold on the Marketplace or inside the world. This is where a brand partner is monetised rather than merely featured.",
      points: [
        "Marketplace sale: the creator takes 30%",
        "In-world sale: the creator takes 30% and the world owner a further 40%",
        "The Marketplace share rises with price: 50% at twice the floor, 70% at six times or above",
      ],
    },
    {
      name: "Immersive advertising",
      tag: "Opt in",
      body: "Billboards in 2D and 3D, portal ads that teleport a player into a branded world, and rewarded video, bought through Roblox's Ads Manager and its programmatic partners.",
      points: [
        "Eligible experiences opt in and earn a share of that ad revenue",
        "Rewarded video needs 2,000 or more unique monthly visitors, a public experience, ID verification and two-factor authentication",
        "Completion rates are reported above 90%",
      ],
      caveat:
        "On the official ad network the experience owner cannot choose which brands appear.",
    },
    {
      name: "Direct brand integrations",
      tag: "Highest margin",
      body: "Sponsored placements sold directly instead of through the ad network: a branded zone, a sponsored mission, a named vehicle, a portal into a partner's own world.",
      points: [
        "Negotiated off platform, so the world keeps 100% of the fee",
        "Full control over which brands appear, which the ad network does not offer",
        "Maps onto the sponsorship a brand already sells in physical space",
      ],
    },
    {
      name: "Physical commerce",
      tag: "Real product",
      body: "Roblox's Commerce APIs with Shopify let eligible brands sell physical product inside the experience to US users aged 13 and over, usually bundling an avatar item with the purchase.",
      points: [
        "The Approved Merchandiser Program ties physical retail purchases to redeemable in-world rewards",
        "One early partner reported six-figure commerce revenue in its first few weeks",
        "Roughly 90% of those orders came through the in-world integration",
      ],
    },
  ],
  source: "robloxMonetisation" as SourceKey,
  commerceSource: "brandReporting" as SourceKey,
} as const;

/* -------------------------------------------------------------------------- */
/* 11 How we work                                                           */
/* -------------------------------------------------------------------------- */

export const PROCESS = {
  number: "11",
  label: "How we work",
  title: "From brief to live world in 8 to 16 weeks",
  kicker: "Launch is a beginning, not the end.",
  steps: [
    { n: "1", when: "Week 1", name: "Brief", body: "Goals, audience, success measures." },
    { n: "2", when: "Weeks 2–3", name: "Concept", body: "Game design, world look and feel, launch plan." },
    { n: "3", when: "Weeks 4–12", name: "Build", body: "Art, scripting and testing with real players." },
    { n: "4", when: "At launch", name: "Launch", body: "Creators, placements and paid media go live together." },
    { n: "5", when: "Every month", name: "Live", body: "Content drops, events and reporting." },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 12 Go to market                                                          */
/* -------------------------------------------------------------------------- */

export const TRAFFIC = {
  number: "12",
  label: "Go to market",
  title: "Every world ships with a traffic engine",
  hubLabel: "The hub",
  hubName: "Your brand world",
  channels: [
    "Placements inside popular games that send players through a portal into your world",
    "Roblox paid media: video ads, homepage features, sponsored listings",
    "Roblox creators and YouTubers playing the world at launch",
    "Your own channels: social, email, packaging, retail, QR codes",
    "Reward loops: free avatar items and codes that give players a reason to come back and to share",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 13 Keeping it alive                                                      */
/* -------------------------------------------------------------------------- */

export const LIVE_OPS = {
  number: "13",
  label: "Keeping it alive",
  title: "A world is a channel, not a campaign",
  body: [
    "Monthly content updates, seasonal events and new items keep players returning.",
    "Quarterly review against the goals set in the brief, with a plan for the next quarter.",
    "We also report on any click-through or sales you want tracked.",
  ],
  reportHeading: "We report on",
  metrics: [
    "Visits",
    "Unique players",
    "Average play time",
    "Return rate",
    "Items claimed",
    "Favorites",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 14 Investment                                                            */
/* -------------------------------------------------------------------------- */

export const INVESTMENT = {
  number: "14",
  label: "Investment",
  title: "Scoped to the brief",
  disclaimer:
    "Indicative pricing. Final scope and quote are confirmed against the client brief.",
  tiers: [
    {
      name: "Pop-Up or Integration",
      price: "From $25,000",
      duration: "4 to 6 weeks",
      featured: false,
    },
    {
      name: "Signature World",
      price: "$60,000 to $120,000",
      duration: "8 to 12 weeks",
      featured: true,
    },
    {
      name: "Flagship Live World",
      price: "From $150,000",
      duration: "12 to 16 weeks",
      featured: false,
    },
  ],
  ongoing: [
    {
      label: "Live operations retainer",
      value: "$8,000 to $20,000 per month",
      detail: "Content updates, events, community, reporting",
    },
    {
      label: "Launch media and creators",
      value: "20% to 30% of build budget",
      detail: "Recommended; billed at cost plus management fee",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 15 Safe by design                                                        */
/* -------------------------------------------------------------------------- */

export const SAFETY = {
  number: "15",
  label: "Safe by design",
  title: "Brand safety and compliance built in",
  points: [
    "Roblox age-checks users for chat and runs separate account tiers for younger children.",
    "Ads are not served to under-13s, and all branded content is clearly disclosed.",
    "Every world we build is moderated, tested with the target age group and reviewed against Roblox advertising standards before launch.",
  ],
  source: "robloxPolicy" as SourceKey,
} as const;

/* -------------------------------------------------------------------------- */
/* 16 Next steps                                                            */
/* -------------------------------------------------------------------------- */

export const NEXT_STEPS = {
  number: "16",
  label: "Next steps",
  title: "Let us build your world",
  steps: [
    "45-minute brief session to define goals and audience",
    "Concept and quote back within one week",
    "Kick-off",
  ],
  contact: {
    name: "Itai Leffler",
    role: "Brand Builder, Checkpoint",
    phone: CONTACT_PHONE,
    phoneDisplay: CONTACT_PHONE_DISPLAY,
    site: CHECKPOINT_SITE,
    siteLabel: "checkpointgames.co.uk",
  },
} as const;
