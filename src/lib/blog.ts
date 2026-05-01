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

// Strip date prefix (YYYY-MM-DD-) from filename to create clean URL slugs
function filenameToSlug(filename: string): string {
  return filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

// Map clean slugs back to filenames for lookup
function getSlugToFileMap(): Map<string, string> {
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'));
  const map = new Map<string, string>();
  for (const file of files) {
    map.set(filenameToSlug(file), file);
  }
  return map;
}

export function getPostSlugs(): string[] {
  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => filenameToSlug(file));
}

export function getPostBySlug(slug: string): BlogPost {
  const slugMap = getSlugToFileMap();
  const filename = slugMap.get(slug);
  if (!filename) {
    throw new Error(`Blog post not found: ${slug}`);
  }
  const fullPath = path.join(postsDirectory, filename);
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
