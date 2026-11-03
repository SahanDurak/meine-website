import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = {
  title: "Creative Outlet",
};

export default function CreativePage() {
  return (
    <PagePlaceholder
      title="Creative Outlet"
      description="Texts, images and videos will land here soon, newest first."
    />
  );
}
