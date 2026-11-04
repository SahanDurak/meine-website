import { readdirSync } from "node:fs";
import path from "node:path";
import type { MDXContent } from "mdx/types";

// Categories shown as a mono label in the blog index. "books" is reserved for
// the book reviews (issue #27) and has no entries yet.
export type BlogCategory = "article" | "books";

export const categoryLabel: Record<BlogCategory, string> = {
  article: "Article",
  books: "Books",
};

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  category: BlogCategory;
};

export type Post = PostMeta & {
  Content: MDXContent;
};

type MdxModule = {
  default: MDXContent;
  frontmatter?: unknown;
};

const blogDirectory = path.join(process.cwd(), "content", "blog");

// Slugs that would collide with fixed routes below /blog.
const reservedSlugs = new Set<string>(["books"]);

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function fail(slug: string, message: string): never {
  throw new Error(`content/blog/${slug}.mdx: ${message}`);
}

function isValidDate(value: string): boolean {
  if (!datePattern.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

// Runs at build time: a missing or invalid field fails the build.
function parseFrontmatter(slug: string, data: unknown): PostFrontmatter {
  if (typeof data !== "object" || data === null) {
    fail(slug, "frontmatter is missing");
  }
  const { title, date, description, tags, draft } = data as Record<
    string,
    unknown
  >;

  if (typeof title !== "string" || title.trim() === "") {
    fail(slug, "`title` must be a non-empty string");
  }
  if (typeof date !== "string" || !isValidDate(date)) {
    fail(slug, '`date` must be a date like "2026-11-04"');
  }
  if (typeof description !== "string" || description.trim() === "") {
    fail(slug, "`description` must be a non-empty string");
  }
  if (
    !Array.isArray(tags) ||
    !tags.every((tag) => typeof tag === "string" && tag.trim() !== "")
  ) {
    fail(slug, "`tags` must be a list of non-empty strings");
  }
  if (typeof draft !== "boolean") {
    fail(slug, "`draft` must be true or false");
  }

  return { title, date, description, tags, draft };
}

function getAllSlugs(): string[] {
  return readdirSync(blogDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

async function loadPost(slug: string): Promise<Post> {
  if (reservedSlugs.has(slug)) {
    fail(slug, `the slug "${slug}" is reserved`);
  }
  const mdx = (await import(`@/content/blog/${slug}.mdx`)) as MdxModule;
  const frontmatter = parseFrontmatter(slug, mdx.frontmatter);
  return { ...frontmatter, slug, category: "article", Content: mdx.default };
}

async function loadAllPosts(): Promise<Post[]> {
  return Promise.all(getAllSlugs().map(loadPost));
}

// Published posts only (drafts are never listed or routed), newest first.
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await loadAllPosts();
  return posts
    .filter((post) => !post.draft)
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title),
    );
}

// Metadata only, without the MDX component, so lists stay plain data (safe
// to pass to Client Components later).
export async function getPublishedPostMetas(): Promise<PostMeta[]> {
  const posts = await getPublishedPosts();
  return posts.map(
    ({ slug, category, title, date, description, tags, draft }) => ({
      slug,
      category,
      title,
      date,
      description,
      tags,
      draft,
    }),
  );
}

export async function getPublishedPost(slug: string): Promise<Post | null> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

// "2026-11-04" as "04 Nov 2026", independent of the server's time zone.
export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
