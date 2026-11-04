import Link from "next/link";
import { PostMetaLine } from "@/components/blog/post-meta";
import type { PostMeta } from "@/lib/blog";

type PostListProps = {
  posts: PostMeta[];
};

// Index-like list: one row per post, the whole row is the link target.
export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-pencil">No articles yet.</p>;
  }

  return (
    <ol aria-label="Articles" className="flex flex-col border-t border-line">
      {posts.map((post) => (
        <li
          key={post.slug}
          className="border-b border-line even:[--pen:var(--sea)]"
        >
          <Link
            href={`/blog/${post.slug}`}
            className="group relative flex min-h-11 flex-col gap-2 py-5 pr-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 32 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute top-1/2 right-0 hidden h-4 w-8 -translate-x-2 -translate-y-1/2 text-pen opacity-0 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:transition-[opacity,translate] motion-safe:duration-300 fine:block fine:group-hover:translate-x-0 fine:group-hover:opacity-100"
            >
              <path d="M2 9c6-3 14-3 25-1M21 3l7 5-7 5" />
            </svg>
            <PostMetaLine post={post} />
            <span className="text-xl font-medium tracking-[-0.01em]">
              <span className="relative inline">
                {post.title}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-pen ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:transition-transform motion-safe:duration-300 fine:group-hover:scale-x-100"
                />
              </span>
            </span>
            <span className="max-w-prose text-sm leading-6 text-pencil">
              {post.description}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
