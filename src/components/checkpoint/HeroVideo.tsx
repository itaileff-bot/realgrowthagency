'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Ambient world footage behind the proposal hero.
 *
 * WHY THIS IS A COMPONENT AND NOT JUST A <video> TAG
 * --------------------------------------------------
 * A hero video is easy to add and easy to get wrong. Three things have to hold
 * on a page that goes to a named prospect who may open it on a phone, on a
 * train, or with motion sensitivity:
 *
 *  1. It must never be the reason the page looks broken. The poster still sits
 *     underneath as a real <img> in the markup, so with JavaScript off, on a
 *     slow connection, or if the file 404s, the hero is exactly the page we
 *     shipped before this: a framed, HUD-free still. The video only ever
 *     fades in on top of it.
 *
 *  2. It must not cost a phone user megabytes. `preload="none"` plus a src
 *     that is attached in JS means the file is not fetched at all below 768px.
 *     Hiding a <video> in CSS does not prevent the download; only withholding
 *     the src does.
 *
 *  3. It must respect `prefers-reduced-motion`. A looping push-in is decorative
 *     motion, so a visitor who has asked for less gets the still and nothing
 *     downloads.
 *
 * The handoff is invisible because the poster is frame 0 of this exact video,
 * at the same crop and scale, so the still and the video's first frame are the
 * same pixels. The fade is from a frame to itself.
 *
 * Autoplay is only permitted for muted video, and the file is encoded with no
 * audio track at all (`-an`), so `muted` here is a statement of fact rather
 * than a hope. `play()` is still awaited and its rejection swallowed: Low Power
 * Mode on iOS refuses autoplay regardless, and the correct outcome there is
 * the poster, not an unhandled rejection.
 */

export interface HeroVideoSources {
  mp4: string;
  /** Optional: our own loops ship a VP9 twin, a licensed clip may not. */
  webm?: string;
}

/**
 * Ask the browser what it can actually decode, rather than declaring both and
 * hoping. Using <source> children would let the browser choose, but it also
 * means the URLs sit in the markup and cannot be withheld on a phone, which is
 * the whole point of the gate below. One attached src, chosen here, keeps both
 * properties.
 *
 * `canPlayType` returns "probably" | "maybe" | "" — anything non-empty is a
 * usable answer, and "" for VP9 is the signal to fall back to H.264.
 *
 * With no WebM twin there is nothing to choose and the MP4 is attached
 * directly, which is correct for every browser a prospect will open this in.
 */
function pickSource(el: HTMLVideoElement, sources: HeroVideoSources): string {
  if (!sources.webm) return sources.mp4;
  return el.canPlayType('video/webm; codecs="vp9"') ? sources.webm : sources.mp4;
}

export default function HeroVideo({
  src,
  poster,
}: {
  src: HeroVideoSources;
  /** Omitted when no still exists; the ground behind shows through instead. */
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const wideEnough = window.matchMedia('(min-width: 768px)');
    const wantsLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Bail before touching the network if either gate says no. Re-running on
    // change means rotating a tablet into landscape starts the video, and
    // switching Reduce Motion on stops it, without a reload.
    const sync = () => {
      const allowed = wideEnough.matches && !wantsLessMotion.matches;

      if (!allowed) {
        if (el.getAttribute('src')) {
          el.pause();
          el.removeAttribute('src');
          el.load(); // releases the buffered data
        }
        setPlaying(false);
        return;
      }

      if (el.getAttribute('src')) return;
      el.setAttribute('src', pickSource(el, src));
      el.load();
      void el.play().catch(() => {
        /* Autoplay refused (iOS Low Power Mode, a strict policy). Poster stays. */
      });
    };

    sync();
    wideEnough.addEventListener('change', sync);
    wantsLessMotion.addEventListener('change', sync);
    return () => {
      wideEnough.removeEventListener('change', sync);
      wantsLessMotion.removeEventListener('change', sync);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={`cp-hero__video${playing ? ' is-playing' : ''}`}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      // Decorative: the still underneath carries the same content, and the
      // headline beside it says what the world is.
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      onError={() => setPlaying(false)}
    />
  );
}
