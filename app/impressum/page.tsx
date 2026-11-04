import type { Metadata } from "next";
import { LegalPageView } from "@/components/legal/legal-page";
import { impressum } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: impressum.title,
  description: impressum.description,
  path: "/impressum",
  locale: "de_DE",
});

export default function ImpressumPage() {
  return <LegalPageView page={impressum} />;
}
