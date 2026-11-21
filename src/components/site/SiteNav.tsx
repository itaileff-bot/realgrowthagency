'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BOOKING_URL } from '@/lib/site';

const LINKS = [
  { href: '/#process', label: 'How it works' },
  { href: '/#services', label: 'What you get' },
  { href: '/#portfolio', label: 'Our work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="rg-nav" aria-label="Main">
      <div className="rg-nav__inner">
        <Link href="/" className="rg-brand" onClick={close}>
          Real Growth Agency
        </Link>
        <button
          type="button"
          className="rg-nav__toggle"
          aria-expanded={open}
          aria-controls="rg-nav-links"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <div
          id="rg-nav-links"
          className={open ? 'rg-nav__links is-open' : 'rg-nav__links'}
        >
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={close}>
              {link.label}
            </Link>
          ))}
          <a
            href={BOOKING_URL}
            className="rg-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a free call
          </a>
        </div>
      </div>
    </nav>
  );
}
