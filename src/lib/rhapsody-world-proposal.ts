/**
 * Content for the Project Rhapsody world proposal.
 *
 * This is the pitch to one named recipient, so unlike the standing Checkpoint
 * proposal in ./checkpoint-proposal.ts it is written about one client and one
 * build. It lives in its own file for that reason: the standing proposal's
 * argument stays untouched, and this file is the only place the Rhapsody
 * numbers are stated. The page reads every figure from here, so the fee table,
 * the payment schedule and the headline total cannot disagree.
 *
 * ON NUMBERS
 * The fixed fees are commercial terms and are exact. Everything under
 * `EARNING` is an illustrative estimate, labelled as one on the page, and none
 * of it is a guarantee of Roblox earnings. The payback table and the
 * year-one scenarios are both derived from the fees below, and the checks at
 * the bottom of this file fail the build if the arithmetic drifts.
 *
 * ON PUNCTUATION
 * House style for this section is no em dashes anywhere in rendered copy.
 */

export const RHP_SLUG = "rhapsody";
export const RHP_WORLD_PATH = "/proposals/checkpoint/rhapsody/world";
export const RHP_SHORT_PATH = "/ProjectRhapsodyWorld";
export const RHP_PUBLISHED = "2026-10-12";
export const RHP_DATE_LABEL = "12 October 2026";

export const RECIPIENT = {
  company: "Symphony Space",
  person: "Merry Walker",
  role: "Co-Founder and CEO",
} as const;

/* -------------------------------------------------------------------------- */
/* Fees. The single source for every dollar figure about the build.            */
/* -------------------------------------------------------------------------- */

export const FEES = {
  phase0: 10_000,
  phase1: 35_000,
  phase2: 75_000,
  phase2Milestone: 25_000,
  phase3: 40_000,
  /** Average of the $5,000 to $8,000 monthly range, rounded to the nearest $500. */
  liveOpsMonthly: 6_500,
  revisionRound: 5_000,
} as const;

export const TOTAL_FEE = FEES.phase1 + FEES.phase2 + FEES.phase3;

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const HERO = {
  eyebrow: "Proposal for Symphony Space",
  titleLines: ["Innovation Land.", "Design. Build. Fly."],
  lead: "A free, persistent Roblox world where players aged 10 to 17 design, build and fly their own space missions, with content from NASA and commercial partners. Designed, built and run by Checkpoint for Symphony Space, and planned to pay back its build cost.",
  stats: [
    { value: usd(TOTAL_FEE), label: "Fixed fee across three phases" },
    { value: "3", label: "Gated phases with review points" },
    { value: "Mar 2027", label: "Target opening" },
    { value: "20,000", label: "Concurrent players targeted by month 3" },
  ],
  meta: `Draft proposal, ${RHP_DATE_LABEL}. Final scope is confirmed against Symphony's written brief.`,
} as const;

/* -------------------------------------------------------------------------- */
/* 01 Overview                                                                 */
/* -------------------------------------------------------------------------- */

export const OVERVIEW = {
  number: "01",
  label: "Overview",
  title: "What we heard",
  lead: "Checkpoint is the Roblox studio behind Boho Salon, with strategy and commercial direction from CPG Advisory. We handle concept, design, build, code, security, launch and live operations. Symphony brings the science, the missions, the story and the partners.",
  points: [
    {
      label: "A free world for ages 10 to 17",
      body: "Players design, build and fly their own space missions. The 17 to 24 cohort and classroom use sit alongside as secondary audiences.",
    },
    {
      label: "Education fun enough to choose",
      body: "An engineer-led, STEM-first experience with a purpose. Roblox Education-ready lesson hooks let a school use it in class, not another time sink.",
    },
    {
      label: "A playable twin of real missions",
      body: "Symphony's hosted-payload model on Adagio Mini and the first demonstration mission in April 2028 get a digital counterpart players can build and watch.",
    },
    {
      label: "NASA lends content and its name",
      body: "Under a non-reimbursable Space Act Agreement, NASA contributes science, imagery, storylines and review, not budget.",
    },
    {
      label: "A place for partners to show up",
      body: "Commercial operators and the brands already activating with Symphony in space get matching placements inside the world.",
    },
    {
      label: "Symphony builds, funds and operates",
      body: "That is the promise made to NASA, and it holds here: Checkpoint carries the build and the running of the world on Symphony's behalf.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 02 Earning capacity                                                         */
/* -------------------------------------------------------------------------- */

export const EARNING = {
  number: "02",
  label: "Earning capacity",
  title: "A world built to pay for itself",
  lead: "Impact within the first 3 months. The target is an average of 20,000 concurrent players by the end of month 3 after opening. At that level the world covers its own build and running costs, and everything above it is profit for Symphony.",
  anchorNote:
    "A strong anchor, such as the NASA announcement or a creator partner, is what makes 20,000 realistic. If Symphony's own audience is small at launch, the Phase 3 launch allocation exists to build one.",

  payback: {
    title: "Payback at 20,000 average concurrent players",
    intro: `Estimated monthly revenue at four monetisation levels once the world holds 20,000 average concurrent players, and how long each takes to repay the ${usd(TOTAL_FEE)} build after ${usd(FEES.liveOpsMonthly)} a month of live operations.`,
    columns: ["Monetisation level", "Est. monthly revenue", `After ${usd(FEES.liveOpsMonthly)} live ops`, `Payback on ${usd(TOTAL_FEE)}`],
    /* Revenue bounds in dollars; net and payback are derived below. */
    levels: [
      { level: "Low", low: 10_000, high: 30_000, highOpen: false },
      { level: "Average", low: 30_000, high: 100_000, highOpen: false },
      { level: "Strong", low: 100_000, high: 250_000, highOpen: true },
      { level: "Exceptional", low: 250_000, high: 500_000, highOpen: true },
    ],
    note: "These are illustrative estimates, not guaranteed Roblox earnings or verified averages. We validate them against comparable worlds' analytics in discovery. Sponsor placements and partner deals come on top.",
    takeaway:
      "At average monetisation the world repays the build in 2 to 6 months. Even at low monetisation, the middle of the range repays it in about 11 months.",
  },

  streams: {
    title: "Where the income comes from",
    intro:
      "Several streams run at once, and the first ones need no sponsor to switch on. Roblox pays creators automatically, including Premium Payouts, and Symphony can create its own game passes and developer products at any price point.",
    items: [
      {
        name: "Sponsored zones and placements",
        body: "The commercial operators and brands already activating with Symphony in space get a matching presence in the world: a branded payload bay, billboards on the orbital platform, a named Design Challenge. A standalone brand world costs a brand $150,000 or more, so a $30,000 to $50,000 seasonal placement inside a NASA-connected educational world is an easy yes. We build the placement slots in Phase 2 so they can be sold before launch.",
      },
      {
        name: "Space-to-Roblox activation bundles",
        body: "Every physical payload or activation Symphony sells gets a digital twin and a live-mission moment inside the world. Pricing this into existing space deals adds margin to contracts already being closed.",
      },
      {
        name: "Game passes",
        body: "One-time purchases at a price Symphony sets, unlocking another part of the world: an advanced Moon and Beyond zone, a private mission-control room, a founder's cosmetic set.",
      },
      {
        name: "Developer products",
        body: "Repeatable purchases at any price point Symphony chooses, bought once or every time they are used: mission patches, suit and platform skins, extra customisation slots, Design Challenge entry packs. Cosmetic and expression items only, never pay-to-win.",
      },
      {
        name: "Roblox Premium Payouts and platform earnings",
        body: "Roblox pays creators automatically, including Premium Payouts based on how long Premium subscribers spend in the world. This is income from day one with no sponsor involved, and it grows with engagement time, which a mission-building world is designed to earn.",
      },
      {
        name: "Design Challenge sponsorship",
        body: "Seasonal challenges judged by Symphony engineers and NASA reviewers are a natural sponsor vehicle: a brand funds the prize and gets its name on the season.",
      },
      {
        name: "Creator content",
        body: "Young builders create and sell their own patches, payload designs and accessories inside the land. This stream is not in the numbers on this page; we scope it in discovery as an optional Phase 2 addition.",
      },
      {
        name: "Education partnerships",
        body: "Roblox Education-ready lesson hooks open the door to districts, after-school programmes and STEM foundations. These are usually grant or sponsor funded rather than paid by schools, so we treat them as a reach and credibility driver that lifts sponsorship.",
      },
    ],
  },

  scenarios: {
    title: "If traffic runs below the target",
    intro:
      "If traffic stays below the 20,000-player target, these illustrative year-one scenarios, from opening to 12 months live, show the slower path.",
    columns: [
      "Scenario",
      "Sponsored placements",
      "Visits in year one",
      "Passes, dev products, Premium Payouts",
      "Year-one revenue",
      "Year-one cost",
      "Breakeven",
    ],
    rows: [
      { name: "Conservative", placements: 60_000, placementLabel: "2 x $30,000", visits: "1.5M", inWorld: 35_000, breakeven: "Beyond month 24" },
      { name: "Base", placements: 120_000, placementLabel: "3 x $40,000", visits: "3M", inWorld: 90_000, breakeven: "Month 13 to 14" },
      { name: "Strong", placements: 225_000, placementLabel: "5 x $40,000 + 1 challenge sponsor at $25,000", visits: "6M", inWorld: 180_000, breakeven: "Month 6 to 7" },
    ],
    costNote: `Year-one cost is the ${usd(TOTAL_FEE)} build plus a ${usd(FEES.liveOpsMonthly)} average monthly live-operations retainer for 12 months.`,
    closing:
      "Comparable brand worlds built with a creator launch sit well above the strong scenario: Walmart Discovered reached 20M+ visits in six months and Chipotle's world drew 17M+ players. That is why the levers that matter most are the Phase 3 launch plan and the NASA joint announcement. The sponsor assumptions depend on Symphony's existing partner conversations, which is the first thing we test together in discovery.",
    closingSource:
      "Public brand and studio announcements; references on request.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 03 The three phases                                                         */
/* -------------------------------------------------------------------------- */

export const PHASES = {
  number: "03",
  label: "The build",
  title: "Three phases, each with a fixed fee",
  lead: "Three gated phases mean Symphony approves direction before production money is spent and sees working milestones before launch. Each phase is a fixed fee, with structured review points built in.",
  phase0Note: `Before Phase 1 begins we share reference worlds and visual samples at no cost, so the team reacts to real examples rather than a blank page. If Symphony wants a bespoke first-layer sample of its own environment before committing, we can produce one as an optional Phase 0 for ${usd(FEES.phase0)}.`,
  items: [
    {
      n: "1",
      name: "Design and Concept",
      duration: "2 to 3 weeks from brief sign-off",
      fee: FEES.phase1,
      paid: "Paid at kick-off",
      summary:
        "Turns the brief into a buildable plan Symphony can sign off with confidence. Everything agreed here becomes the fixed scope for Phase 2.",
      listTitle: "Deliverables",
      list: [
        "World concept: the setting, the player journey and how Symphony's real platform, payloads and missions appear as digital twins",
        "Activity roadmap: the eight activities in the NASA one-pager (Payload Builder, Mission Control, Earth Observation Lab, Orbital Debris Challenge, Moon and Beyond, Live Mission Events, Design Challenges, Career Quests) prioritised into a launch set and a post-launch roadmap",
        "Visual direction: mood boards, colour and lighting direction, and concept art for the hero environments, the orbital platform, Mission Control and the lunar base",
        "STEM and learning design: learning objectives per activity, mapped to ages 10 to 17 and to Roblox Education lesson hooks",
        "Partner and sponsor framework: where NASA imagery, data and challenge themes fit under the Space Act Agreement, and where commercial placements sit without breaking the educational experience",
        "Technical plan: systems architecture, moderation and security approach, data and analytics plan, and Roblox platform compliance",
        "Production plan: milestone schedule, review points and the Phase 2 fee confirmed against the agreed scope",
      ],
      reviews:
        "One working session with Merry, the Symphony team and the junior playtesters at the midpoint, plus a presentation at the end of the phase. Up to two rounds of revisions are included.",
    },
    {
      n: "2",
      name: "Game Production",
      duration: "About 12 weeks",
      fee: FEES.phase2,
      paid: `Three payments of ${usd(FEES.phase2Milestone)}`,
      summary:
        "The build itself, in three milestone sprints that each end in a playable review build, so Symphony sees progress on screen, not on paper.",
      listTitle: "Included across the build",
      list: [
        "A full development team: lead developer, builder, 3D asset and texture artists, environment specialist, VFX and lighting, sound and a launch trailer",
        "Core gameplay, UI, movement and controls tuned for a young audience across PC, console, mobile and tablet",
        "The launch set of activities chosen in Phase 1, typically Payload Builder, Mission Control and one Earth or lunar activity, with the live-mission and challenge systems built to switch on later",
        "Digital twins of Symphony's platform and payloads, including the hosted NASA payload",
        "Partner and sponsor placements (billboards, branded zones and activation slots) ready to sell",
        "Analytics and moderation tooling so Symphony can see who plays, what they learn and what to improve",
      ],
      reviews: `Each milestone includes a review session and up to two rounds of revisions. Changes beyond that, or new features added mid-build, are quoted at ${usd(FEES.revisionRound)} per change round.`,
    },
    {
      n: "3",
      name: "Launch and Live Support",
      duration: "Launch window plus the first 4 weeks live",
      fee: FEES.phase3,
      paid: "Paid at launch build sign-off",
      summary:
        "A Roblox world only works if players show up and keep coming back, so this phase covers the release, the launch push and the first month of live operation.",
      listTitle: "Included",
      list: [
        "Release management: store page, age and content ratings, Roblox platform submission and launch-day monitoring",
        "Launch marketing allocation: a paid and creator budget drawn from this fee, aimed at space, science and STEM creators on Roblox, YouTube and TikTok, plus Symphony's own channels, NASA's joint announcement and partners",
        "Go-to-market plan: launch sequence, creator and partner activations, and how NASA or brand partners can amplify the launch",
        "First 4 weeks live: bug fixes, balance changes, exploit patches, server monitoring and a weekly performance report",
      ],
      reviews: `After the first month, live operations are offered as a monthly retainer of $5,000 to $8,000 depending on cadence, covering content updates, seasonal events, new partner activations, new features and continued security monitoring.`,
    },
  ],

  milestones: {
    title: "Phase 2 milestones",
    columns: ["Milestone", "Weeks", "What Symphony sees", "Payment"],
    rows: [
      ["1. Greybox and core loop", "1 to 4", "Playable layout of the world, movement, camera and the first STEM activity working end to end", `${usd(FEES.phase2Milestone)} at start of Phase 2`],
      ["2. Art, content and systems", "5 to 8", "Final environments and 3D assets, lighting and sound, remaining STEM activities, progression and rewards, partner placement slots", `${usd(FEES.phase2Milestone)} at Milestone 1 sign-off`],
      ["3. Polish, security and launch build", "9 to 12", "Full QA, anti-exploit hardening, performance across devices, UI and onboarding, trailer and store assets, release candidate", `${usd(FEES.phase2Milestone)} at Milestone 2 sign-off`],
    ],
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 04 Security                                                                 */
/* -------------------------------------------------------------------------- */

export const SECURITY = {
  number: "04",
  label: "Safe by design",
  title: "Security, safety and brand protection",
  lead: "An educational world for young players carries Symphony's name and its partners' names, so it has to be built secure from day one. Cheaply built Roblox games are routinely exploited: hacked servers, injected content, broken progression and players driven away. Fixing that after launch costs more than building it right.",
  points: [
    {
      label: "Server-authoritative logic",
      body: "Progress, rewards and scores cannot be manipulated from the client.",
    },
    {
      label: "Anti-exploit systems",
      body: "Anti-cheat and exploit defences with ongoing monitoring and rapid patching.",
    },
    {
      label: "Moderation and chat safety",
      body: "Aligned to Roblox's rules for young audiences.",
    },
    {
      label: "Protected partner placements",
      body: "Sponsor and NASA content can only be changed by Symphony and Checkpoint.",
    },
    {
      label: "No third-party promotion",
      body: "Roblox permits creators to promote their own channels. The Innovation Land will only ever point players to Symphony's and its approved partners' Discord, YouTube and social accounts.",
    },
    {
      label: "Children's privacy",
      body: "Data handling that meets Roblox platform and children's privacy requirements.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 05 Investment                                                               */
/* -------------------------------------------------------------------------- */

export const INVEST = {
  number: "05",
  label: "Investment",
  title: `${usd(TOTAL_FEE)}, fixed against the agreed scope`,
  lead: "The three phases are fixed against the scope agreed in the brief and confirmed at the end of Phase 1. All figures are in US dollars.",
  columns: ["Phase", "Scope", "Timing", "Fee (USD)", "Paid"],
  rows: [
    ["Phase 0 (optional)", "Bespoke first-layer environment sample", "1 week", usd(FEES.phase0), "On request"],
    ["Phase 1", "Design and Concept", "2 to 3 weeks", usd(FEES.phase1), "At kick-off"],
    ["Phase 2", "Game Production", "About 12 weeks", usd(FEES.phase2), `3 x ${usd(FEES.phase2Milestone)} at milestones`],
    ["Phase 3", "Launch and Live Support", "Launch + 4 weeks", usd(FEES.phase3), "At launch build sign-off"],
    ["Total", "Phases 1 to 3", "About 5 months", usd(TOTAL_FEE), ""],
    ["Live operations retainer", "Content updates, events, partner activations, security", "Monthly, after Phase 3", "$5,000 to $8,000 / month", "Monthly in advance"],
  ],
  notes: [
    {
      label: "Revisions",
      body: `Each review point includes up to two rounds of revisions. Additional rounds, or features added after the Phase 1 scope is locked, are quoted at ${usd(FEES.revisionRound)} per round, reflecting the extra developer and artist time. We always flag the cost before any extra work starts.`,
    },
    {
      label: "Expansion",
      body: "If NASA or brand partners come on board with their own content requirements, such as an official NASA module, live mission data feeds or multiple sponsor activations, scope grows beyond this proposal. Based on comparable brand worlds, an expanded programme of that kind sits in the $200,000 to $300,000 range and would be scoped and quoted separately once partner requirements are known.",
    },
    {
      label: "Not included",
      body: "Roblox platform fees, paid media spend beyond the Phase 3 launch allocation, and third-party licensing.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 06 Timeline                                                                 */
/* -------------------------------------------------------------------------- */

export const TIMELINE = {
  number: "06",
  label: "Timeline",
  title: "Brief to launch",
  lead: "The schedule holds a 1 March 2027 launch if the brief is locked by late October. The Phase 2 milestones allow for the holiday period. Exact dates are fixed in the Phase 1 production plan.",
  steps: [
    { n: "1", when: "12 to 23 Oct 2026", name: "Brief and discovery", body: "Written brief, reference worlds, and the discovery session with Merry, the team and the junior playtesters." },
    { n: "2", when: "26 Oct to 13 Nov", name: "Phase 1", body: "Design and Concept, ending in the signed scope and fixed Phase 2 fee." },
    { n: "3", when: "16 Nov to 5 Feb", name: "Phase 2", body: "Game Production in three milestone sprints, with the holiday period allowed for." },
    { n: "4", when: "8 Feb to 28 Feb", name: "Phase 3 begins", body: "Release preparation, the launch marketing push and the NASA announcement lined up." },
    { n: "5", when: "1 Mar 2027", name: "Launch", body: "The world opens, followed by four weeks of live support to 26 March." },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 07 Next steps                                                               */
/* -------------------------------------------------------------------------- */

export const NEXT = {
  number: "07",
  label: "Next steps",
  title: "What happens next",
  steps: [
    "Symphony shares its written brief. The NASA one-pager is a strong start; we return a build brief for sign-off.",
    "Checkpoint sends reference worlds and visual samples for the team to react to.",
    "Discovery session with Merry, the Symphony team and the junior playtesters to lock the brief, pick the launch activities and confirm the budget.",
    "Phase 1 kick-off, targeting late October 2026 to hold the spring 2027 opening and a joint NASA announcement.",
  ],
} as const;

export const CLOSING_NOTE = `Figures marked illustrative are estimates, not guarantees of Roblox earnings, and are validated in discovery. Fees are fixed against the scope agreed in the brief. Prepared ${RHP_DATE_LABEL} for ${RECIPIENT.person}, ${RECIPIENT.role}, ${RECIPIENT.company}.`;

/* -------------------------------------------------------------------------- */
/* Derived figures and arithmetic checks                                       */
/* -------------------------------------------------------------------------- */

/** Months to repay the build at a given monthly net revenue (not rounded). */
const months = (net: number) => TOTAL_FEE / net;

export function paybackRows() {
  return EARNING.payback.levels.map((l) => {
    const netLow = l.low - FEES.liveOpsMonthly;
    const netHigh = l.high - FEES.liveOpsMonthly;
    const slow = months(netLow);
    const fast = months(netHigh);
    const plus = l.highOpen ? "+" : "";
    let payback: string;
    /* "Under 1 month" only when even the slow end of the range repays in under
       one month; otherwise the range is shown from the fast to the slow end. */
    if (slow < 1) {
      payback = "Under 1 month";
    } else {
      const lo = Math.max(1, Math.round(fast));
      const hi = Math.round(slow);
      payback = lo === hi ? `${lo} month${lo === 1 ? "" : "s"}` : `${lo} to ${hi} months`;
    }
    return {
      level: l.level,
      revenue: `${usd(l.low)} to ${usd(l.high)}${plus}`,
      net: `${usd(netLow)} to ${usd(netHigh)}${plus}`,
      payback,
    };
  });
}

export function scenarioRows() {
  const yearOneCost = TOTAL_FEE + FEES.liveOpsMonthly * 12;
  return EARNING.scenarios.rows.map((r) => ({
    name: r.name,
    placements: r.placementLabel,
    visits: r.visits,
    inWorld: usd(r.inWorld),
    revenue: usd(r.placements + r.inWorld),
    cost: usd(yearOneCost),
    breakeven: r.breakeven,
  }));
}

/**
 * Fails the build rather than shipping a proposal whose numbers disagree.
 * The headline total, the three fees and Phase 2's three payments must tie.
 */
(function assertFeesTie() {
  if (TOTAL_FEE !== 150_000) {
    throw new Error(`Rhapsody proposal: fees total ${TOTAL_FEE}, expected 150000`);
  }
  if (FEES.phase2Milestone * 3 !== FEES.phase2) {
    throw new Error("Rhapsody proposal: Phase 2 milestones do not sum to the Phase 2 fee");
  }
})();
