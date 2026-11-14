import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Noto_Serif_Devanagari } from "next/font/google";
import { siteUrl } from "@/lib/data";
import { BiodataView } from "@/components/BiodataView";

const serif = Noto_Serif_Devanagari({ subsets: ["devanagari", "latin"], weight: ["600"], variable: "--font-serif" });
const sans = Noto_Sans_Devanagari({ subsets: ["devanagari", "latin"], weight: ["400", "600"] });

const url = `${siteUrl}/marriage/hi`;
const og = `${siteUrl}/images/biodata/og.jpg`;

export const metadata: Metadata = {
  title: "बायोडाटा",
  description: "आशीष कुमार का विवाह हेतु बायोडाटा।",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: url, languages: { en: `${siteUrl}/marriage` } },
  openGraph: {
    title: "आशीष कुमार — बायोडाटा",
    description: "आशीष कुमार का विवाह हेतु बायोडाटा।",
    url,
    type: "profile",
    locale: "hi_IN",
    images: [{ url: og, width: 1200, height: 630, alt: "आशीष कुमार" }],
  },
  twitter: { card: "summary_large_image", title: "आशीष कुमार — बायोडाटा", images: [og] },
};

export default function MarriagePageHindi() {
  return (
    <div className={`${serif.variable} ${sans.className}`}>
      <BiodataView lang="hi" />
    </div>
  );
}
