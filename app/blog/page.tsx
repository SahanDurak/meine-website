import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";
import { PencilStroke } from "@/components/pencil-stroke";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <PagePlaceholder
      title={<PencilStroke tone="sea">Blog</PencilStroke>}
      description="My articles will appear here soon."
    />
  );
}
