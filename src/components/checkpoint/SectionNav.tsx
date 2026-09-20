'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV_SECTIONS } from '@/lib/checkpoint-proposal';

/**
 * Previous and next section arrows for the proposal.
 *
 * WHY THIS EXISTS
 * The proposal is one long scroll of seventeen sections. The header nav lists
 * the six anchors, but it is hidden below 1024px and, even on a laptop, it
 * asks a reader to pick a destination rather than simply move on. A reader who
 * has finished a section does not want to choose; they want the next one.
 *
 * It walks the same six anchors the header does, plus the hero, so the two
 * controls can never disagree about what the sections are.
 *
 * The buttons move the page rather than following links so that the browser
 * history is not filled with fragments: a reader clicking through fourteen
 * times should still be one Back press away from wherever they came from.
 * Both ends disable rather than wrap, because silently jumping from the last
 * section back to the top reads as a bug.
 */

const STOPS: string[] = ['top', ...NAV_SECTIONS.map((section) => section.id)];

const LABELS: Record<string, string> = {
  top: 'Top',
  ...Object.fromEntries(NAV_SECTIONS.map((section) => [section.id, section.label])),
};

/**
 * The fixed header covers the top of the viewport, so a section counts as
 * current once its top passes under the header rather than under the viewport
 * edge. Read from the token so this cannot drift from the header's real
 * height; `.cp-root` is where the proposal's custom properties are declared.
 */
function headerOffset(): number {
  const root = document.querySelector('.cp-root');
  if (!root) return 64;
  const parsed = parseFloat(getComputedStyle(root).getPropertyValue('--cp-header'));
  return Number.isFinite(parsed) ? parsed : 64;
}

/** Index of the last stop whose top has scrolled past the header. */
function currentStop(): number {
  const line = window.scrollY + headerOffset() + 8;
  return STOPS.reduce((found, id, i) => {
    const el = document.getElementById(id);
    if (!el) return found;
    return el.getBoundingClientRect().top + window.scrollY <= line ? i : found;
  }, 0);
}

function Chevron({ direction }: { direction: 'up' | 'down' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d={direction === 'up' ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SectionNav() {
  const [index, setIndex] = useState(0);

  /**
   * The stop we last sent the page to, held until the page actually arrives.
   *
   * Without this, a reader clicking the arrow three times quickly goes one
   * section, not three: each click would measure where the page is *now*,
   * which during a smooth scroll is still the section they are leaving. The
   * intent of a click is to move on from the last one, not from the animation
   * frame it happened to land in.
   */
  const pending = useRef<number | null>(null);

  useEffect(() => {
    let frame = 0;
    // rAF-coalesced: a scroll event can fire many times per frame and the
    // measurement below reads layout, which is the expensive half.
    const sync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const stop = currentStop();
        // The page has caught up with the last click, so stop overriding.
        if (pending.current !== null && stop === pending.current) pending.current = null;
        setIndex(stop);
      });
    };

    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  const go = useCallback((delta: number) => {
    const from = pending.current ?? currentStop();
    const target = Math.min(Math.max(from + delta, 0), STOPS.length - 1);
    // At either end there is nowhere to go. The arrows carry `aria-disabled`
    // rather than `disabled`, so the guard lives here.
    if (target === from) return;
    pending.current = target;

    if (target === 0) {
      // The hero sits under the fixed header, so scroll to the document top
      // rather than to the element, which would leave a header-height gap.
      window.scrollTo({ top: 0 });
      return;
    }

    // No `behavior` argument: the CSS decides, and the reduced-motion block in
    // checkpoint.css turns smooth scrolling off for anyone who asked for less.
    document.getElementById(STOPS[target])?.scrollIntoView();
  }, []);

  const atStart = index === 0;
  const atEnd = index === STOPS.length - 1;

  /*
   * `aria-disabled`, not `disabled`, and the reason is behavioural rather than
   * pedantic. Scrolling up to the top crosses the boundary that makes the up
   * arrow the first stop, so the real `disabled` attribute landed on the
   * button *while it still had focus*, part way through the animation. A
   * browser blurs a focused element the moment it is disabled, and that
   * cancelled the scroll it had just started: the page stopped 18px in,
   * short of the top. Marking it leaves focus alone, and `go` no-ops at the
   * ends instead.
   */

  return (
    <nav className="cp-stepnav" aria-label="Move between sections">
      <button
        type="button"
        className="cp-stepnav__btn"
        onClick={() => go(-1)}
        aria-disabled={atStart}
        aria-label={atStart ? 'Already at the top' : `Previous section: ${LABELS[STOPS[index - 1]]}`}
      >
        <Chevron direction="up" />
      </button>
      <button
        type="button"
        className="cp-stepnav__btn"
        onClick={() => go(1)}
        aria-disabled={atEnd}
        aria-label={atEnd ? 'Already at the last section' : `Next section: ${LABELS[STOPS[index + 1]]}`}
      >
        <Chevron direction="down" />
      </button>
    </nav>
  );
}
