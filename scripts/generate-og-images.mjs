import { chromium } from "@playwright/test";
import { ogCardHtml } from "./og-card-template.mjs";

const VARIANTS = [
  {
    file: "public/og-image.png",
    eyebrow: "Ashish Kumar · SDET II",
    heading: "I build test automation and accessibility systems that scale.",
    subtext: "Playwright, Selenium, API & mobile automation — healthcare and fintech.",
    badge: "Open to SDET &amp; Lead SDET roles",
    stats: [
      { value: "5+ yrs", label: "UI, API &amp; mobile test automation" },
      { value: "~40%", label: "faster regression runs at LiveSwitch" },
      { value: "1000+", label: "automated tests at Mastercard" },
      { value: "WCAG AA", label: "accessibility audits, done professionally" },
    ],
  },
  {
    file: "public/og-image-projects.png",
    eyebrow: "Projects",
    heading: "Case studies on how I structure automation frameworks.",
    subtext: "Not just what tools I used — the architecture, and why.",
  },
  {
    file: "public/og-image-writing.png",
    eyebrow: "Writing",
    heading: "Notes on test automation, accessibility, and AI-assisted engineering.",
    subtext: "Long-form, from someone who builds this stuff daily.",
  },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

for (const variant of VARIANTS) {
  await page.setContent(ogCardHtml(variant));
  await page.screenshot({ path: variant.file });
  console.log(`wrote ${variant.file}`);
}

await browser.close();
