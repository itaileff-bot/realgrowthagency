'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  CHECKPOINT_NAME,
  CHECKPOINT_PATH,
  CHECKPOINT_SITE,
  CHECKPOINT_TAGLINE,
  ENQUIRY_MAILTO,
  NAV_SECTIONS,
  NEXT_STEPS,
} from '@/lib/checkpoint-proposal';

/**
 * Header and footer for the Checkpoint proposal.
 *
 * Two behaviours justify this being a client component:
 *
 *  1. Scroll-spy. In a pitch that is one long scroll, the nav is the only
 *     wayfinding a reader has; without an active state it is decoration. An
 *     IntersectionObserver is used rather than scroll maths so the browser
 *     does the work off the main thread.
 *  2. The mobile drawer.
 *
 * Both degrade cleanly: with JavaScript disabled the nav is still a list of
 * working anchor links, because that is all it is underneath.
 *
 * ONE HEADER, TWO KINDS OF PAGE
 * The layout wraps both the proposal and the per-prospect cover pages, but the
 * section anchors only exist on the proposal. Rendering them on a cover would
 * give a prospect a row of links that do nothing, so the route decides: on the
 * cover the nav is dropped entirely and the one call to action points back at
 * the proposal's closing section by URL rather than by fragment.
 *
 * `usePathname` is used rather than probing the DOM because it is known during
 * the server render, so the header is correct in the first painted frame; a
 * DOM probe would flash six dead links and then remove them.
 */

function Wordmark() {
  return (
    <a href="#top" className="cp-wordmark cp-display" aria-label={`${CHECKPOINT_NAME}, back to top`}>
      <img
        src="/images/checkpoint/checkpoint-mark.png"
        alt=""
        width={104}
        height={104}
        className="cp-wordmark__mark"
      />
      <span>{CHECKPOINT_NAME}</span>
    </a>
  );
}

export function CheckpointHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(NAV_SECTIONS[0].id);
  const [scrolled, setScrolled] = useState(false);

  // The proposal is the only page carrying the section anchors.
  const onProposal = usePathname() === CHECKPOINT_PATH;
  const ctaHref = onProposal ? '#next' : `${CHECKPOINT_PATH}#next`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const targets = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Take the entry nearest the top of the viewport rather than the first
        // intersecting one: sections are tall enough that two are often in
        // view at once, and "first in DOM order" makes the marker lag.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Top inset clears the fixed header; the deep bottom inset means a
      // section only counts as active once it reaches the upper third.
      { rootMargin: '-72px 0px -60% 0px', threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // Close the drawer on Escape, which is the one key a reader will reach for.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`cp-header${scrolled || open ? ' cp-header--solid' : ''}`}>
      <div className="cp-container">
        <div className="cp-header__bar">
          <Wordmark />

          {onProposal && (
            <nav className="cp-nav" aria-label="Proposal sections">
              {NAV_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="cp-nav__link"
                  aria-current={active === section.id ? 'true' : undefined}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          )}

          <div className="cp-header__actions">
            {/*
              With no drawer to fall back to on a cover page, the call to
              action has to survive below 640px, where it is normally hidden
              behind the burger.
            */}
            <a
              href={ctaHref}
              className={`cp-btn cp-btn--primary cp-btn--sm cp-header__cta${
                onProposal ? '' : ' cp-header__cta--solo'
              }`}
            >
              Book a brief
            </a>
            {onProposal && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="cp-mobile-nav"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className={`cp-burger${open ? ' cp-burger--open' : ''}`}
              >
                <span />
                <span />
                <span />
              </button>
            )}
          </div>
        </div>

        {onProposal && open && (
          <div id="cp-mobile-nav" className="cp-drawer">
            <ul>
              {NAV_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setOpen(false)}
                    className="cp-drawer__link"
                    aria-current={active === section.id ? 'true' : undefined}
                  >
                    {section.label}
                    <span aria-hidden="true" className="cp-muted">
                      &rarr;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#next"
              onClick={() => setOpen(false)}
              className="cp-btn cp-btn--primary cp-drawer__cta"
            >
              Book a brief session
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export function CheckpointFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="cp-footer">
      <div className="cp-container cp-footer__inner">
        <div>
          <Wordmark />
          <p className="cp-eyebrow cp-eyebrow--accent" style={{ marginTop: 16 }}>
            {CHECKPOINT_TAGLINE}
          </p>
          <p className="cp-body cp-body--sm" style={{ marginTop: 12, maxWidth: '34em' }}>
            Roblox worlds, built and run for brands. Brand strategy, engineering and
            world-building under one roof.
          </p>
        </div>

        <div>
          <p className="cp-eyebrow">Contact</p>
          <ul className="cp-footer__list cp-body--sm">
            <li className="cp-cream">{NEXT_STEPS.contact.name}</li>
            <li>
              <a href={ENQUIRY_MAILTO} className="cp-link">
                {NEXT_STEPS.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${NEXT_STEPS.contact.phone}`} className="cp-link">
                {NEXT_STEPS.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={CHECKPOINT_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="cp-link"
              >
                {NEXT_STEPS.contact.siteLabel}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="cp-eyebrow">Prepared by</p>
          <ul className="cp-footer__list cp-body--sm">
            <li>
              <a href="/" className="cp-link">
                Real Growth Agency
              </a>
            </li>
            <li>
              <a
                href="https://www.cpg-advisory.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cp-link"
              >
                Brand Refinery
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="cp-container">
        <div className="cp-footer__base">
          <p>
            &copy; {year} {CHECKPOINT_NAME}. Confidential; prepared for the named recipient.
          </p>
          <p>Roblox is a trademark of Roblox Corporation. Not affiliated.</p>
        </div>
      </div>
    </footer>
  );
}
