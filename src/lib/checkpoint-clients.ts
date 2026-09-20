/**
 * Per-prospect cover pages for the Checkpoint proposal.
 *
 * The proposal at /proposals/checkpoint is the document and does not change
 * between pitches. This is the page in front of it: one screen, the prospect's
 * name on it, the reason this pitch is being made to them, and a way in. The
 * link you actually send is the cover; the proposal is what it opens onto.
 *
 * Adding a prospect is one object in CLIENTS below. Nothing else needs
 * touching: the route, its metadata, its static params and its 404 for unknown
 * slugs all read from this array.
 *
 * ON CODENAMES
 * `confidential: true` is the normal case early on. A prospect's real name on
 * a URL is a leak waiting to happen — the link gets forwarded, and the slug
 * itself tells anyone who sees it who is being pitched. A codename costs
 * nothing and means the URL can be pasted into a thread safely.
 */

import { CHECKPOINT_PATH, HERO_MEDIA } from "./checkpoint-proposal";

export interface ClientMedia {
  /**
   * `mp4` is required and `webm` is optional, which is the difference between
   * a file we host and a URL someone else hosts.
   *
   * Our own loops ship as both, because a few Chromium builds are compiled
   * without the proprietary H.264 decoder and fail an MP4 outright. A stock
   * library only ever hands over one H.264 MP4, and every browser a prospect
   * will realistically use decodes that: Chrome, Edge, Safari, Firefox and
   * both mobile engines. So a single MP4 is a real answer here, not a
   * shortcut, and HeroVideo simply attaches it when there is no WebM twin.
   */
  video: { mp4: string; webm?: string };
  /**
   * First frame of the loop. Optional, because an off-the-shelf URL arrives
   * without one and we cannot extract a frame from a file we do not hold.
   * Without a poster the cover falls back to a tuned gradient ground, which
   * is what a phone, a reduced-motion visitor and the first paint all get.
   */
  poster?: string;
  /**
   * Set when the footage is bright (sky, cloud, snow, daylight). White type
   * over white cloud is the one way this layout breaks, so it deepens the
   * scrim. See .cp-cover--bright in src/styles/checkpoint.css.
   */
  bright?: boolean;
}

export interface CheckpointClient {
  /** URL segment. Keep it opaque when `confidential`. */
  slug: string;
  /** What appears beside the Checkpoint mark. */
  name: string;
  /** True when `name` is a codename rather than the prospect's real name. */
  confidential: boolean;
  /**
   * The two lines to rewrite per prospect once their category is known. The
   * rest of the page is Checkpoint's standing argument and holds for anyone.
   */
  headline: string;
  lead: string;
  /** Three reasons this studio, kept short enough to read in one pass. */
  points: { label: string; body: string }[];
  /** Rendered as "Prepared <prepared>". */
  prepared: string;
  /**
   * Optional bespoke cover footage. Defaults to the Checkpoint world loop,
   * which is real work and always present.
   *
   * Two ways to set it, and the trade is worth knowing:
   *
   *  HOTLINK. Point `mp4` at a stock library's CDN URL. Nothing to build and
   *  nothing to commit; the prospect's browser fetches it straight from that
   *  CDN. The cost is that the file is not ours: if the URL rotates or the
   *  subscription lapses the background goes blank, there is no poster frame
   *  to extract, and that CDN sees the IP of everyone the link is sent to.
   *
   *  SELF-HOST. Drop the files into public/video, export a first frame as the
   *  poster, and point at those paths. One origin, no third party watching
   *  who opens the pitch, and a still for phones and reduced motion.
   *
   * Hotlink to get a pitch out today; self-host before the link is the one a
   * client actually receives.
   */
  media?: ClientMedia;
}

const RHAPSODY: CheckpointClient = {
  slug: "rhapsody",
  name: "Project Rhapsody",
  confidential: true,
  headline: "A world your audience chooses to spend time in",
  lead: "Not an ad they scroll past. A place they come back to, built and run by the studio behind a 41-million-visit world, with the traffic engine that fills it from day one.",
  points: [
    {
      label: "A studio that has already built one",
      body: "Boho Salon is Checkpoint's own world: 41.2M visits, 1.4M community members and a Bloxy Award. Not a deck, a live thing with players in it.",
    },
    {
      label: "A traffic engine, not just a build",
      body: "Brand-owned worlds fell 57% in 2025 because they launched empty. Every world we ship comes with placements, creators, paid Roblox media and monthly content.",
    },
    {
      label: "Live in 8 to 16 weeks",
      body: "Brief, concept, build, launch, then live operations. Launch is the beginning of the channel, not the end of the project.",
    },
  ],
  prepared: "September 2026",
  /*
   * Licensed from the motionsites library and re-encoded to self-host: the
   * 17.7MB, 10-second, 1764x1176 source with an audio track became a silent
   * 9-second seamless loop at 1600x1066, 1.30MB as H.264 and 0.82MB as VP9.
   * The last second is crossfaded over the first, so the loop point is a
   * dissolve between two frames of the same shot rather than a cut; measured
   * seam difference 1.69/255.
   *
   * `bright` because the sky behind the eclipse is a pale wash, which is the
   * one thing that breaks white type on this layout.
   */
  media: {
    video: {
      mp4: "/video/rhapsody-loop.mp4",
      webm: "/video/rhapsody-loop.webm",
    },
    poster: "/images/checkpoint/rhapsody-poster.webp",
    bright: true,
  },
};

export const CHECKPOINT_CLIENTS: CheckpointClient[] = [RHAPSODY];

export function getClient(slug: string): CheckpointClient | undefined {
  return CHECKPOINT_CLIENTS.find((c) => c.slug === slug);
}

/** Cover footage for a prospect, falling back to the Checkpoint world loop. */
export function clientMedia(client: CheckpointClient): ClientMedia {
  return client.media ?? { video: HERO_MEDIA.video, poster: HERO_MEDIA.poster };
}

export const clientPath = (slug: string) => `${CHECKPOINT_PATH}/${slug}`;
