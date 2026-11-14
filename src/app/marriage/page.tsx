import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteUrl } from "@/lib/data";
import { BiodataView } from "@/components/BiodataView";

const playfair = localFont({ src: "../../fonts/playfair-display-latin.woff2", weight: "400 900", variable: "--font-serif", adjustFontFallback: "Times New Roman" });

const url = `${siteUrl}/marriage`;
const og = `${siteUrl}/images/biodata/og.jpg?v=2`;

export const metadata: Metadata = {
  title: "Biodata",
  description: "Marriage biodata of Ashish Kumar.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: url, languages: { hi: `${siteUrl}/marriage/hi` } },
  openGraph: {
    title: "Ashish Kumar — Biodata",
    description: "B.Tech, NIT Warangal · SDET II at Triomics, Bengaluru · Family settled in Gorakhpur, Uttar Pradesh.",
    url,
    type: "profile",
    images: [{ url: og, width: 1200, height: 630, alt: "Ashish Kumar" }],
  },
  twitter: { card: "summary_large_image", description: "B.Tech, NIT Warangal · SDET II at Triomics, Bengaluru · Family settled in Gorakhpur, Uttar Pradesh.", title: "Ashish Kumar — Biodata", images: [og] },
};

export default function MarriagePage() {
  return (
    <div className={playfair.variable}>
      <BiodataView lang="en" />
    </div>
  );
}
