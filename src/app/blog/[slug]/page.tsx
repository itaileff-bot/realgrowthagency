import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, markdownToHtml } from '@/lib/blog';

// Return 404 for slugs not in generateStaticParams
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://realgrowthagency.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      siteName: 'Real Growth Agency',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

function extractFAQs(
  htmlContent: string
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  // Look for content after an FAQ heading
  const faqSectionMatch = htmlContent.match(
    /<h2[^>]*>.*?FAQ.*?<\/h2>([\s\S]*?)(?=<h2|$)/i
  );
  if (!faqSectionMatch) return faqs;

  const faqHtml = faqSectionMatch[1];
  // Match h3 (questions) followed by p (answers)
  const questionRegex =
    /<h3[^>]*>(.*?)<\/h3>\s*<p>([\s\S]*?)(?=<h3|<h2|$)/gi;
  let match;
  while ((match = questionRegex.exec(faqHtml)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  return faqs;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const htmlContent = await markdownToHtml(post.content);
  const faqs = extractFAQs(htmlContent);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://realgrowthagency.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Real Growth Agency',
      url: 'https://realgrowthagency.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://realgrowthagency.com/blog/${slug}`,
    },
  };

  const faqJsonLd =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

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

      {/* ── POST HEADER ── */}
      <section className="blog-post-hero">
        <div className="container">
          <div className="blog-post-header">
            <Link href="/blog" className="blog-post-back">
              ← Back to Blog
            </Link>
            <div className="blog-post-meta">
              <span className="blog-card-category">{post.category}</span>
              <span className="blog-card-date">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <h1>{post.title}</h1>
            <p className="blog-post-description">{post.description}</p>
          </div>
        </div>
      </section>

      {/* ── POST CONTENT ── */}
      <article
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* ── CTA ── */}
      <div className="container">
        <div className="blog-cta">
          <div className="blog-cta-inner">
            <h3>Ready to Grow Your Startup?</h3>
            <p>
              Get a free strategy call with our team. We&apos;ll audit your
              current SEO and map out a growth plan — no strings attached.
            </p>
            <Link href="/#contact" className="btn-primary">
              Book Your Free Call →
            </Link>
          </div>
        </div>
      </div>

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
