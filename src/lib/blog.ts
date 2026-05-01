import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  keywords: string;
  author: string;
  category: string;
  content: string;
  excerpt: string;
}

export function getPostSlugs(): string[] {
  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const excerpt =
    content
      .replace(/^#+\s.*$/gm, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`#]/g, '')
      .trim()
      .slice(0, 200)
      .trim() + '...';

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    keywords: data.keywords || '',
    author: data.author || '',
    category: data.category || '',
    content,
    excerpt,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  return posts;
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(gfm).use(html).process(markdown);
  return result.toString();
}
