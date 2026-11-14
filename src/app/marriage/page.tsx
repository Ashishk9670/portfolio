import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { siteUrl } from "@/lib/data";
import { BiodataView } from "@/components/BiodataView";

const serif = Playfair_Display({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-serif" });

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
    <div className={serif.variable}>
      <BiodataView lang="en" />
    </div>
  );
}
