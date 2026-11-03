import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <PagePlaceholder
      title="About"
      description="I will tell you a bit more about myself here soon."
    />
  );
}
