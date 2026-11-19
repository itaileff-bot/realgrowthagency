import Link from 'next/link';
import { AdminLoginButton } from '@/components/AdminLoginButton';

export function SiteFooter() {
  return (
    <footer className="rg-footer">
      <div className="rg-wrap">
        <div className="rg-footer__grid">
          <div className="rg-footer__brand">
            <div className="rg-brand">Real Growth Agency</div>
            <p>
              Websites, brands and marketing for small businesses, built for
              you by real people.
            </p>
          </div>
          <div className="rg-footer__col">
            <h2>Websites</h2>
            <Link href="/#process">How it works</Link>
            <Link href="/#services">What you get</Link>
            <Link href="/#portfolio">Our work</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
          <div className="rg-footer__col">
            <h2>Help</h2>
            <Link href="/pricing#questions">Common questions</Link>
            <Link href="/#contact">Contact us</Link>
            <Link href="/blog">Blog</Link>
            <AdminLoginButton />
          </div>
          <div className="rg-footer__col">
            <h2>More from us</h2>
            <a
              href="https://www.real-growth-bot.com/landing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Real Growth Bot
            </a>
            <a href="https://www.cpg-advisory.com/">CPG Advisory website</a>
            <a href="https://www.cpg-advisory.com/services">
              CPG consulting services
            </a>
          </div>
        </div>
        <div className="rg-footer__bottom">
          <span>
            © 2026 Real Growth Agency, a{' '}
            <a href="https://www.cpg-advisory.com/">Brand Refinery</a> company.
            All rights reserved.
          </span>
          <div className="rg-footer__social">
            <a
              href="https://x.com/RealGrowthHQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <a
              href="https://www.linkedin.com/company/real-growth-agency"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/realgrowthagency"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
