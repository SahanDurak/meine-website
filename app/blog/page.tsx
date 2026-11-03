import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <PagePlaceholder
      title="Blog"
      description="Hier erscheinen bald meine Artikel."
    />
  );
}
