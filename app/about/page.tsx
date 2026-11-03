import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = {
  title: "Über mich",
};

export default function AboutPage() {
  return (
    <PagePlaceholder
      title="Über mich"
      description="Hier erzähle ich bald etwas über mich."
    />
  );
}
