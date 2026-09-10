import type { Metadata } from "next";
import { profile, siteUrl } from "@/lib/data";

const DEFAULT_OG_IMAGE = `${siteUrl}/og-image.png`;

export function pageMetadata({
  title,
  description,
  path,
  feed = false,
  ogImage,
}: {
  title: string;
  description: string;
  path: string;
  feed?: boolean;
  /** Relative path under /public, e.g. "/og-image-projects.png". Defaults to the site-wide OG image. */
  ogImage?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const image = ogImage ? `${siteUrl}${ogImage}` : DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(feed ? { types: { "application/rss+xml": `${siteUrl}/feed.xml` } } : {}),
    },
    openGraph: {
      title: `${title} — ${profile.name}`,
      description,
      url,
      siteName: profile.name,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${title} — ${profile.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${profile.name}`,
      description,
      images: [image],
    },
  };
}
