'use client';

import { useRef, useState } from 'react';
import { REEL } from '@/lib/checkpoint-proposal';

/**
 * The sixty-second showreel.
 *
 * WHY THIS IS NOT HeroVideo
 * The hero loop is wallpaper: silent, endless, decorative, and suppressed on a
 * phone because nobody asked for it. This is the opposite. It is a film with a
 * voice and an edit, it is the single most persuasive thing on the page, and a
 * reader who presses play has asked for it explicitly. So it keeps its sound,
 * it gets real controls, and it plays at every width.
 *
 * `preload="none"` is what makes a 5.6MB file acceptable here: nothing is
 * fetched until the play button is pressed, so a reader who scrolls past pays
 * only for the poster. The <source> children are safe for the same reason,
 * where the hero had to withhold its URL in JavaScript to stop phones
 * downloading a video they would never see.
 *
 * The overlay is a real <button> rather than a click handler on the video, so
 * it is reachable by keyboard and announces itself. Once playing it is removed
 * from the DOM entirely and the native controls take over; there is no custom
 * transport bar to get wrong, and no second play affordance to fight with.
 */
export default function Showreel() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    const el = ref.current;
    if (!el) return;
    setStarted(true);
    // Rejection is survivable: the native controls are already visible by
    // then, so the reader simply presses play again.
    void el.play().catch(() => {});
  };

  return (
    <div className={`cp-reel__stage${started ? ' is-playing' : ''}`}>
      <video
        ref={ref}
        className="cp-reel__video"
        poster={REEL.poster}
        controls={started}
        playsInline
        preload="none"
        aria-label={REEL.label_a11y}
        onEnded={() => setStarted(false)}
      >
        <source src={REEL.video.webm} type="video/webm" />
        <source src={REEL.video.mp4} type="video/mp4" />
      </video>

      {!started && (
        <>
          <div aria-hidden="true" className="cp-reel__veil" />
          <p aria-hidden="true" className="cp-eyebrow cp-eyebrow--xs cp-reel__tag">
            {REEL.tag}
          </p>
          <p aria-hidden="true" className="cp-eyebrow cp-eyebrow--xs cp-reel__time">
            {REEL.duration}
          </p>
          <button type="button" onClick={play} className="cp-reel__play">
            <span className="cp-sr">Play the showreel, one minute</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
