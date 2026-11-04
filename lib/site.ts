// Production origin. metadataBase, canonical URLs, sitemap and robots.txt
// are built from it.
export const siteUrl = "https://www.sahandurak.com";

export const siteName = "Sahan";

export const siteDescription =
  "Personal website of Sahan: a blog and a creative outlet for texts, images and videos.";

// Shared Open Graph image (app/opengraph-image.tsx). Pages that set their own
// `openGraph` must list it again: nested metadata fields are replaced, not
// merged, between segments.
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Sahan – a drawing sheet with a sketched lighthouse, mono labels and a dimension line",
} as const;
