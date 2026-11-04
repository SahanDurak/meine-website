import type { Metadata } from "next";
import { LegalPageView } from "@/components/legal/legal-page";
import { datenschutz } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: datenschutz.title,
  description: datenschutz.description,
  path: "/datenschutz",
  locale: "de_DE",
});

export default function DatenschutzPage() {
  return <LegalPageView page={datenschutz} />;
}
