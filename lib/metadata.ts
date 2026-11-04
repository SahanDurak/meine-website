import type { Metadata } from "next";
import { ogImage, siteName } from "@/lib/site";

type PageMetadataInput = {
  /** Page title without the site name ("About"); `absolute` skips the template. */
  title: string | { absolute: string };
  description: string;
  /** Path below the site origin, e.g. "/about". */
  path: string;
  /** Open Graph locale; the legal pages are German. */
  locale?: "en_US" | "de_DE";
  type?: "website" | "article";
};

// Title, description, canonical URL and Open Graph tags for one page,
// including the shared image from app/opengraph-image.tsx (a page-level
// `openGraph` replaces the root one, so the image is listed here again).
export function pageMetadata({
  title,
  description,
  path,
  locale = "en_US",
  type = "website",
}: PageMetadataInput): Metadata {
  const fullTitle =
    typeof title === "string" ? `${title} · ${siteName}` : title.absolute;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName,
      locale,
      type,
      images: [ogImage],
    },
  };
}
