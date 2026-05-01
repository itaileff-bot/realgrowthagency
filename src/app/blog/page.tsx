import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practical guides on SEO, branding, web development, and digital marketing for startups and growing businesses.',
  openGraph: {
    title: 'Blog | Real Growth Agency',
    description:
      'Practical guides on SEO, branding, web development, and digital marketing for startups and growing businesses.',
    url: 'https://realgrowthagency.com/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* ── NAV ── */}
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

      {/* ── BLOG HERO ── */}
      <section className="blog-hero">
        <div className="container">
          <div className="section-label">📝 Our Blog</div>
          <h1 className="section-title">Insights &amp; Guides</h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Actionable tips on SEO, branding, and digital growth — straight from
            the team that builds it every day.
          </p>
        </div>
      </section>

      {/* ── BLOG GRID ── */}
      <section style={{ padding: '0' }}>
        <div className="container">
          {posts.length === 0 ? (
            <p
              style={{
                textAlign: 'center',
                padding: '80px 0',
                color: '#888',
              }}
            >
              No posts yet. Check back soon!
            </p>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => (
                <article className="blog-card" key={post.slug}>
                  <span className="blog-card-category">{post.category}</span>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <div className="blog-card-date">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="blog-card-link">
                    Read More →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <span>Real Growth</span> Agency
              </div>
              <p>
                AI-powered digital agency building brands, websites, and
                marketing engines that drive real, measurable growth.
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
              <a
                href="https://www.real-growth-bot.com/landing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Real Growth Bot
              </a>
              <Link href="/blog">Blog</Link>
              <a href="#">Case Studies</a>
              <a href="#">Free SEO Audit</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Real Growth Agency. All rights reserved.</span>
            <div className="footer-social">
              <a href="#">𝕏</a>
              <a href="#">in</a>
              <a href="#">ig</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
