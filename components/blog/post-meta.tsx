import { categoryLabel, formatPostDate, type PostMeta } from "@/lib/blog";

type PostMetaLineProps = {
  post: Pick<PostMeta, "date" | "category" | "tags">;
};

// Technical layer: date, category and tags as one mono line.
export function PostMetaLine({ post }: PostMetaLineProps) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wider text-pencil uppercase">
      <time dateTime={post.date} className="tabular-nums">
        {formatPostDate(post.date)}
      </time>
      <span aria-hidden="true">/</span>
      <span data-category={post.category}>{categoryLabel[post.category]}</span>
      {post.tags.length > 0 && (
        <>
          <span aria-hidden="true">/</span>
          <span>
            <span className="sr-only">Tags: </span>
            {post.tags.map((tag) => `#${tag}`).join(" ")}
          </span>
        </>
      )}
    </p>
  );
}
