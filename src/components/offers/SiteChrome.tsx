import Link from 'next/link';

/** Shared nav and footer for the offer pages. Mirrors the blog page chrome. */
export function SiteNav() {
  return (
    <nav id="navbar" className="scrolled">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <span>Real Growth</span> Agency
        </Link>
        <div className="nav-links" id="navLinks">
          <Link href="/#services">Services</Link>
          <Link href="/#portfolio">Work</Link>
          <Link href="/#process">Process</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="/#contact" className="nav-cta">
            Get a Free Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <span>Real Growth</span> Agency
            </div>
            <p>
              AI-powered digital agency building brands, websites, and marketing engines that drive real, measurable
              growth. Powered by Brand Refinery LLC.
            </p>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <Link href="/#services">Brand Identity</Link>
            <Link href="/#services">Web Development</Link>
            <Link href="/#services">App Development</Link>
            <Link href="/#services">SEO &amp; Content</Link>
            <Link href="/#services">AI Marketing</Link>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <Link href="/#portfolio">Our Work</Link>
            <Link href="/#process">How It Works</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/#contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <Link href="/free-website-manual">Free Website Manual</Link>
            <Link href="/website-training">Website Training</Link>
            <Link href="/blog">Blog</Link>
            <a href="https://www.real-growth-bot.com/landing" target="_blank" rel="noopener noreferrer">
              Real Growth Bot
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Real Growth Agency. All rights reserved.</span>
          <div className="footer-social">
            <a href="https://x.com/RealGrowthHQ" target="_blank" rel="noopener noreferrer">𝕏</a>
            <a href="https://www.linkedin.com/company/real-growth-agency" target="_blank" rel="noopener noreferrer">in</a>
            <a href="https://www.instagram.com/realgrowthagency" target="_blank" rel="noopener noreferrer">ig</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
