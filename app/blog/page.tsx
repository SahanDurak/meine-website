import type { Metadata } from "next";
import { PostList } from "@/components/blog/post-list";
import { PencilStroke } from "@/components/pencil-stroke";
import { getPublishedPostMetas } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles by Sahan, newest first.",
};

export default async function BlogPage() {
  const posts = await getPublishedPostMetas();

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h1 className="text-4xl leading-[1.1] font-semibold tracking-[-0.02em] sm:text-5xl">
          <PencilStroke tone="sea">Blog</PencilStroke>
        </h1>
        <p className="text-pencil">Articles, newest first.</p>
      </section>
      <PostList posts={posts} />
    </div>
  );
}
