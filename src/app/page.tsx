'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Scroll animation (Intersection Observer)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(
        '.service-card, .portfolio-card, .step, .pricing-card, .testimonial-card'
      )
      .forEach((el) => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'translateY(30px)';
        (el as HTMLElement).style.transition =
          'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    document.getElementById('navLinks')?.classList.toggle('open');
  };

  return (
    <>
      {/* ── NAV ── */}
      <nav id="navbar">
        <div className="nav-inner">
          <a href="#" className="logo">
            <span>Real Growth</span> Agency
          </a>
          <div className="nav-links" id="navLinks">
            <a href="#services">Services</a>
            <a href="#portfolio">Work</a>
            <a href="#process">Process</a>
            <a href="#pricing">Pricing</a>
            <a href="/blog">Blog</a>
            <a href="#contact">Contact</a>
            <a href="#contact" className="nav-cta">
              Get a Free Quote
            </a>
          </div>
          <button className="hamburger" id="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h1>
              We Build Brands That{' '}
              <span className="gradient-text">Actually Grow</span>
            </h1>
            <p>
              Full-service digital agency combining AI-powered marketing with
              world-class design. Brand identity, websites, apps, SEO — all
              under one roof, at startup-friendly prices.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn-primary">
                Start Your Project →
              </a>
              <a href="#portfolio" className="btn-secondary">
                See Our Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-header">
            <div className="section-label">💡 What We Do</div>
            <h2 className="section-title">
              Everything You Need to Grow Online
            </h2>
            <p className="section-subtitle">
              From first logo to first million in revenue — we handle the full
              stack of digital growth.
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon brand">🎨</div>
              <h3>Brand Identity</h3>
              <p>
                Complete visual identity systems — logo, color palette,
                typography, brand guidelines. We make you unforgettable.
              </p>
              <div className="service-tags">
                <span className="service-tag">Logo Design</span>
                <span className="service-tag">Style Guides</span>
                <span className="service-tag">Brand Voice</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon web">🌐</div>
              <h3>Web Development</h3>
              <p>
                Lightning-fast, responsive websites built on modern frameworks.
                From landing pages to full-stack platforms.
              </p>
              <div className="service-tags">
                <span className="service-tag">Next.js</span>
                <span className="service-tag">React</span>
                <span className="service-tag">E-Commerce</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon marketing">📣</div>
              <h3>Digital Marketing</h3>
              <p>
                Multi-channel campaigns that convert. Social media, email, paid
                ads — all driven by data and AI automation.
              </p>
              <div className="service-tags">
                <span className="service-tag">Social Media</span>
                <span className="service-tag">Email</span>
                <span className="service-tag">Paid Ads</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon seo">🔍</div>
              <h3>SEO &amp; Content</h3>
              <p>
                Dominate search results with technical SEO, keyword strategy, and
                content that ranks and converts.
              </p>
              <div className="service-tags">
                <span className="service-tag">Technical SEO</span>
                <span className="service-tag">Content</span>
                <span className="service-tag">Analytics</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon apps">📱</div>
              <h3>App Development</h3>
              <p>
                Native and cross-platform mobile apps. From MVP to market
                launch, we build apps people love.
              </p>
              <div className="service-tags">
                <span className="service-tag">iOS</span>
                <span className="service-tag">Android</span>
                <span className="service-tag">React Native</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon ai">🤖</div>
              <h3>AI Growth Engine</h3>
              <p>
                Powered by <strong>Real Growth Bot</strong> — automated lead
                gen, outreach, and conversion optimization that runs 24/7.
              </p>
              <div className="service-tags">
                <span className="service-tag">Lead Gen</span>
                <span className="service-tag">Automation</span>
                <span className="service-tag">AI Outreach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section className="portfolio" id="portfolio">
        <div className="container">
          <div className="section-header">
            <div className="section-label">🏆 Our Work</div>
            <h2 className="section-title">
              Projects That Speak for Themselves
            </h2>
            <p className="section-subtitle">
              Real results for real businesses. Here&apos;s a taste of what
              we&apos;ve built.
            </p>
          </div>
          <div id="rga-portfolio-grid" className="portfolio-grid">
            <a
              href="https://www.myfamousfinds.com"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-card"
            >
              <div
                className="portfolio-thumb"
                style={{ background: '#ffffff' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="rga-logo"
                  src="https://www.myfamousfinds.com/Famous-Finds-Logo.png"
                  alt="Famous Finds"
                  style={{
                    maxWidth: '50%',
                    maxHeight: '50%',
                    mixBlendMode: 'multiply',
                  }}
                />
              </div>
              <div className="portfolio-overlay">
                <span className="tag">E-Commerce + Brand</span>
                <h4>Famous Finds</h4>
                <p>
                  Luxury authenticated resale platform — full brand identity +
                  e-commerce build
                </p>
              </div>
            </a>
            <a
              href="https://www.arichwines.com"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-card"
            >
              <div
                className="portfolio-thumb"
                style={{ background: '#0a0a0a' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="rga-logo"
                  src="https://images.squarespace-cdn.com/content/v1/66eb05e475bbf851d58ba4b7/84405c9d-6856-44c7-8d7d-5aa2205e1f5f/a+rich+logo.png?format=1500w"
                  alt="A Rich Wines"
                />
              </div>
              <div className="portfolio-overlay">
                <span className="tag">Brand + Web</span>
                <h4>A Rich Wines</h4>
                <p>
                  Premium wine brand — elegant brand system + direct-to-consumer
                  site
                </p>
              </div>
            </a>
            <a
              href="https://www.drinkape.com"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-card"
            >
              <div className="portfolio-thumb" style={{ padding: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="rga-fill"
                  src="https://drinkape.com/cdn/shop/files/url.share.image.jpg?v=1706487497"
                  alt="Ape Beverages"
                />
              </div>
              <div className="portfolio-overlay">
                <span className="tag">Brand + Marketing</span>
                <h4>Ape Beverages</h4>
                <p>
                  Sustainable canned spring water — brand identity, Shopify, and
                  growth marketing
                </p>
              </div>
            </a>
            <a
              href="https://www.chefprepforyou.com"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-card"
            >
              <div className="portfolio-thumb" style={{ padding: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="rga-fill"
                  src="https://www.chefprepforyou.com/_next/image?url=%2Ffood-photos%2F0203DA92-08DA-4CD5-9F13-169870BBB71B.JPG&w=1200&q=75"
                  alt="Chef Prep For You"
                />
              </div>
              <div className="portfolio-overlay">
                <span className="tag">Full Stack + SEO</span>
                <h4>Chef Prep For You</h4>
                <p>
                  Private chef service — Next.js web app, SEO strategy, and lead
                  generation
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="process" id="process">
        <div className="container">
          <div className="section-header">
            <div className="section-label">⚡ How It Works</div>
            <h2 className="section-title" style={{ color: '#fff' }}>
              From Idea to Launch in 4 Steps
            </h2>
            <p className="section-subtitle">
              No bloated timelines. No mystery. Just a clear path to growth.
            </p>
          </div>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">01</div>
              <h4>Discovery Call</h4>
              <p>
                We learn your goals, audience, and competition. 30 minutes. No
                fluff.
              </p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <h4>Strategy &amp; Design</h4>
              <p>
                We map out the plan and design everything — brand, site,
                marketing funnels.
              </p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <h4>Build &amp; Launch</h4>
              <p>
                We build it fast on modern tech (Next.js, React, Firebase) and
                ship it live.
              </p>
            </div>
            <div className="step">
              <div className="step-number">04</div>
              <h4>Grow &amp; Optimize</h4>
              <p>
                Real Growth Bot takes over — AI-powered campaigns, SEO, and
                continuous optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI POWERED ── */}
      <section className="ai-powered" id="ai">
        <div className="container">
          <div className="ai-inner">
            <div className="ai-content">
              <div className="section-label">🤖 Our Secret Weapon</div>
              <h2>
                <span
                  style={{
                    background: 'var(--grad1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Generating Real Growth
                </span>
              </h2>
              <div className="ai-features">
                <div className="ai-feature">
                  <div className="check">✓</div>
                  <div>
                    <h5>Automated Lead Generation</h5>
                    <p>
                      AI finds and qualifies your ideal customers 24/7
                    </p>
                  </div>
                </div>
                <div className="ai-feature">
                  <div className="check">✓</div>
                  <div>
                    <h5>Smart Email Campaigns</h5>
                    <p>
                      Personalized outreach sequences that convert at 3x
                      industry average
                    </p>
                  </div>
                </div>
                <div className="ai-feature">
                  <div className="check">✓</div>
                  <div>
                    <h5>SEO on Autopilot</h5>
                    <p>
                      Continuous content optimization and keyword targeting
                    </p>
                  </div>
                </div>
                <div className="ai-feature">
                  <div className="check">✓</div>
                  <div>
                    <h5>Real-Time Analytics</h5>
                    <p>
                      Dashboard with live metrics — know exactly what&apos;s
                      working
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ai-visual">
              <div className="terminal-header">
                <div className="terminal-dot"></div>
                <div className="terminal-dot"></div>
                <div className="terminal-dot"></div>
              </div>
              <div className="terminal-line">
                <span className="cmd">$</span> real-growth-bot{' '}
                <span className="highlight">--deploy</span>
                <br />
                <br />
                ✓ Scanning target market...
                <br />
                ✓ 2,847 qualified leads found
                <br />
                ✓ Email sequences loaded
                <br />
                ✓ SEO keywords optimized (47 terms)
                <br />
                ✓ Social content scheduled (30 days)
                <br />
                ✓ Landing pages A/B tested
                <br />
                <br />
                <span className="highlight">
                  🚀 Growth engine running...
                </span>
                <br />
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {' '}
                  Last 7 days: +340 leads · +$28k revenue
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-header">
            <div className="section-label">💰 Simple Pricing</div>
            <h2 className="section-title">No Surprises. No BS.</h2>
            <p className="section-subtitle">
              Startup-friendly pricing without startup-quality work. Pick your
              path.
            </p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h4>Starter</h4>
              <div className="price">
                $1,499 <span>one-time</span>
              </div>
              <p className="price-sub">
                Perfect for launching your online presence
              </p>
              <ul>
                <li>Logo + Brand Kit</li>
                <li>5-Page Responsive Website</li>
                <li>Basic SEO Setup</li>
                <li>Mobile Optimized</li>
                <li>2 Rounds of Revisions</li>
              </ul>
              <a href="#contact" className="btn-price">
                Get Started
              </a>
            </div>
            <div className="pricing-card featured">
              <h4>Growth</h4>
              <div className="price">
                $4,997 <span>one-time</span>
              </div>
              <p className="price-sub">
                Full brand + site + marketing engine
              </p>
              <ul>
                <li>Everything in Starter</li>
                <li>Full Brand Identity System</li>
                <li>Custom Web App (Next.js)</li>
                <li>Real Growth Bot Setup</li>
                <li>3 Months SEO + Content</li>
                <li>Unlimited Revisions</li>
              </ul>
              <a href="#contact" className="btn-price">
                Get Started
              </a>
            </div>
            <div className="pricing-card">
              <h4>Scale</h4>
              <div className="price">
                $6,890 <span>one-time</span>
              </div>
              <p className="price-sub">
                Enterprise-grade, full-service partnership
              </p>
              <ul>
                <li>Everything in Growth</li>
                <li>Mobile App (iOS + Android)</li>
                <li>Advanced Automation Suite</li>
                <li>Dedicated Growth Manager</li>
                <li>6 Months Support + Optimization</li>
                <li>Priority 24hr Response</li>
              </ul>
              <a href="#contact" className="btn-price">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <div className="section-label">❤️ Client Love</div>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Don&apos;t take our word for it — hear from the businesses
              we&apos;ve helped grow.
            </p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <blockquote>
                &quot;They rebuilt our entire brand and site in under two weeks.
                Revenue tripled in the first quarter. The AI marketing engine is
                a game-changer.&quot;
              </blockquote>
              <div className="testimonial-author">
                <div className="testimonial-avatar">JM</div>
                <div>
                  <h5>Jake Morrison</h5>
                  <p>CEO, Morrison Retail</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <blockquote>
                &quot;Best ROI I&apos;ve ever gotten from an agency. The Real
                Growth Bot literally runs our lead gen on autopilot. We just
                close deals now.&quot;
              </blockquote>
              <div className="testimonial-author">
                <div className="testimonial-avatar">SR</div>
                <div>
                  <h5>Sarah Rodriguez</h5>
                  <p>Founder, FitLife Pro</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <blockquote>
                &quot;We went from zero online presence to ranking #1 for our
                key terms in 4 months. The team is fast, creative, and actually
                delivers.&quot;
              </blockquote>
              <div className="testimonial-author">
                <div className="testimonial-avatar">DK</div>
                <div>
                  <h5>David Kim</h5>
                  <p>Owner, Kim &amp; Associates Law</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <div className="container">
          <h2>
            Ready to <span className="gradient-text">Actually Grow?</span>
          </h2>
          <p>
            Book a free 30-minute strategy call. No pitch decks, no pressure —
            just a clear roadmap to your next level.
          </p>
          <div className="cta-buttons">
            <a href="#contact" className="btn-white">
              Book Your Free Call →
            </a>
            <a href="#pricing" className="btn-outline">
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="section-label">📬 Get In Touch</div>
              <h3>Let&apos;s Build Something Great Together</h3>
              <p>
                Fill out the form and we&apos;ll get back within 24 hours with a
                custom proposal — no templates, no cookie-cutter quotes.
              </p>
              <div className="contact-detail">
                <div className="contact-icon email">✉️</div>
                <div>
                  <h5>Email Us</h5>
                  <p>hello@realgrowthagency.com</p>
                </div>
              </div>
            </div>
            <form
              className="contact-form"
              action="https://formsubmit.co/itai.leff@gmail.com"
              method="POST"
            >
              <input
                type="hidden"
                name="_subject"
                value="New Contact Form Submission - Real Growth Agency"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input
                type="hidden"
                name="_next"
                value="https://www.realgrowthagency.com/#contact"
              />
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>What do you need?</label>
                <select name="service" required defaultValue="">
                  <option value="" disabled>
                    Select a service...
                  </option>
                  <option>Brand Identity</option>
                  <option>Website / Web App</option>
                  <option>Mobile App</option>
                  <option>SEO &amp; Content</option>
                  <option>AI Marketing (Real Growth Bot)</option>
                  <option>Full Package</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tell us about your project</label>
                <textarea
                  name="message"
                  placeholder="What are your goals? What's your timeline? Any budget in mind?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{ alignSelf: 'flex-start' }}
              >
                Send Message →
              </button>
            </form>
          </div>
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
              <a href="#services">Brand Identity</a>
              <a href="#services">Web Development</a>
              <a href="#services">App Development</a>
              <a href="#services">SEO &amp; Content</a>
              <a href="#services">AI Marketing</a>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <a href="#portfolio">Our Work</a>
              <a href="#process">How It Works</a>
              <a href="#pricing">Pricing</a>
              <a href="#contact">Contact</a>
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
              <a href="/blog">Blog</a>
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
