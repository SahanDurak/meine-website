import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostMetaLine } from "@/components/blog/post-meta";
import { getPublishedPost, getPublishedPosts } from "@/lib/blog";

// Every published post is prerendered. Drafts are left out, so their URLs
// (like any unknown slug) end in notFound().
// Only slugs unknown at build time read params at request time, and they all
// end in a 404, so this segment may block instead of streaming a placeholder.
export const instant = false;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const { Content } = post;

  return (
    <article className="flex flex-col gap-10 [--pen:var(--sea)]">
      <header className="flex flex-col gap-4">
        <Link
          href="/blog"
          className="-ml-2 inline-flex min-h-11 w-fit items-center gap-2 px-2 font-mono text-xs tracking-wider text-pencil uppercase fine:hover:text-ink"
        >
          <span aria-hidden="true">←</span> All articles
        </Link>
        <h1 className="text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance sm:text-5xl">
          {post.title}
        </h1>
        <PostMetaLine post={post} />
      </header>
      <div className="flex max-w-prose flex-col">
        <Content />
      </div>
    </article>
  );
}
