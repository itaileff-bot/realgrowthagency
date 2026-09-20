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
  video: { webm: string; mp4: string };
  poster: string;
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
   * which is real work and always present. To use a prospect-specific cut,
   * drop the files into public/video, export a first frame as the poster, and
   * set this — nothing else changes.
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
