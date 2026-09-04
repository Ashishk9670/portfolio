import type { Metadata } from "next";
import { profile, siteUrl } from "@/lib/data";

const OG_IMAGE = `${siteUrl}/og-image.png`;

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${profile.name}`,
      description,
      url,
      siteName: profile.name,
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${profile.name} — ${profile.role}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${profile.name}`,
      description,
      images: [OG_IMAGE],
    },
  };
}
