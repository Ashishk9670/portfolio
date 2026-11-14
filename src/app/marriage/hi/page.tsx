import type { Metadata } from "next";
import type { CSSProperties } from "react";
import localFont from "next/font/local";
import { siteUrl } from "@/lib/data";
import { BiodataView } from "@/components/BiodataView";

// Each Noto family ships as a Devanagari file and a Latin file. Listing the Devanagari face
// first (with no metric fallback of its own) lets English words fall through to the Latin face.
const serifDeva = localFont({ src: "../../../fonts/noto-serif-devanagari.woff2", weight: "100 900", adjustFontFallback: false });
const serifLatin = localFont({ src: "../../../fonts/noto-serif-devanagari-latin.woff2", weight: "100 900", adjustFontFallback: "Times New Roman" });
const sansDeva = localFont({ src: "../../../fonts/noto-sans-devanagari.woff2", weight: "100 900", adjustFontFallback: false });
const sansLatin = localFont({ src: "../../../fonts/noto-sans-devanagari-latin.woff2", weight: "100 900" });
const fonts = {
  "--font-serif": `${serifDeva.style.fontFamily}, ${serifLatin.style.fontFamily}`,
  fontFamily: `${sansDeva.style.fontFamily}, ${sansLatin.style.fontFamily}`,
} as CSSProperties;

const url = `${siteUrl}/marriage/hi`;
const og = `${siteUrl}/images/biodata/og-hi.jpg?v=2`;

export const metadata: Metadata = {
  title: "बायोडाटा",
  description: "आशीष कुमार का विवाह हेतु बायोडाटा।",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: url, languages: { en: `${siteUrl}/marriage` } },
  openGraph: {
    title: "आशीष कुमार — बायोडाटा",
    description: "बी.टेक, एनआईटी वारंगल · बेंगलुरु स्थित ट्रायोमिक्स में SDET II · परिवार गोरखपुर, उत्तर प्रदेश में।",
    url,
    type: "profile",
    locale: "hi_IN",
    images: [{ url: og, width: 1200, height: 630, alt: "आशीष कुमार" }],
  },
  twitter: { card: "summary_large_image", description: "बी.टेक, एनआईटी वारंगल · बेंगलुरु स्थित ट्रायोमिक्स में SDET II · परिवार गोरखपुर, उत्तर प्रदेश में।", title: "आशीष कुमार — बायोडाटा", images: [og] },
};

export default function MarriagePageHindi() {
  return (
    <div style={fonts}>
      <BiodataView lang="hi" />
    </div>
  );
}
