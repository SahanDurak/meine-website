import type { MetadataRoute } from "next";
import { getPublishedPostMetas } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

const staticPaths = [
  "/",
  "/about",
  "/blog",
  "/creative",
  "/impressum",
  "/datenschutz",
];

// Static pages plus every published article (drafts are never listed).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPostMetas();

  return [
    ...staticPaths.map((path) => ({ url: `${siteUrl}${path}` })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}
