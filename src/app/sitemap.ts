import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.realgrowthagency.com';
  const posts = getAllPosts();

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // getAllPosts() is sorted newest first. The blog index changes when a post
  // is added, so its lastmod is the newest post date, not the build time. The
  // homepage has no tracked edit date, so it omits lastmod rather than
  // reporting a new one on every deploy.
  const latestPost = posts[0] ? new Date(posts[0].date) : undefined;

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPost,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/free-website-manual`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/website-training`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
