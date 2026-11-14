import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Mail } from "lucide-react";
import { biodata } from "@/lib/biodata";
import { profile, siteUrl } from "@/lib/data";
import { withBasePath } from "@/lib/basePath";
import { PrintButton } from "@/components/PrintButton";

const serif = Playfair_Display({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-serif" });

const url = `${siteUrl}/marriage`;
const og = `${siteUrl}/images/biodata/og.jpg`;

export const metadata: Metadata = {
  title: "Biodata",
  description: "Marriage biodata of Ashish Kumar.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: url },
  openGraph: {
    title: "Ashish Kumar — Biodata",
    description: "Marriage biodata of Ashish Kumar.",
    url,
    type: "profile",
    images: [{ url: og, width: 1200, height: 630, alt: "Ashish Kumar" }],
  },
  twitter: { card: "summary_large_image", title: "Ashish Kumar — Biodata", images: [og] },
};

const c = {
  bg: "#FBF7F0",
  card: "#FFFFFF",
  ink: "#2B2118",
  muted: "#5F5044",
  maroon: "#7A1F2B",
  gold: "#B8862B",
  line: "#E9DFD0",
};

function Ornament() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-3" style={{ color: c.gold }}>
      <span className="h-px w-12" style={{ background: c.gold }} />
      <span className="text-sm">✦</span>
      <span className="h-px w-12" style={{ background: c.gold }} />
    </div>
  );
}

export default function MarriagePage() {
  const { hero, gallery } = biodata.photos;
  return (
    <div className={`${serif.variable} min-h-screen print:min-h-0`} style={{ background: c.bg, color: c.ink }}>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-8 sm:py-16 print:max-w-none print:py-0">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: c.maroon }}>
            Marriage Biodata
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-semibold sm:text-5xl">{biodata.name}</h1>
          <div className="mt-5">
            <Ornament />
          </div>
        </header>

        <section aria-label="Profile summary" className="mt-10 grid items-center gap-8 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] print:mt-6 print:grid-cols-[2fr_3fr]">
          <figure className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border-4 bg-white shadow-sm sm:max-w-none" style={{ borderColor: c.card }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
            <img
              src={withBasePath(`${hero.src}.webp`)}
              alt={hero.alt}
              width={hero.w}
              height={hero.h}
              className="h-auto w-full"
            />
          </figure>
          <div className="rounded-2xl border p-6 sm:p-8" style={{ background: c.card, borderColor: c.line }}>
            <dl className="space-y-4">
              {biodata.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: c.maroon }}>
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-[15px] leading-6">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3 print:hidden">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-white"
                style={{ background: c.maroon }}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Get in touch
              </a>
              <PrintButton
                className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border bg-white px-4 text-sm font-semibold"
              />
            </div>
          </div>
        </section>

        <div className="mt-12 space-y-6 print:mt-6 print:space-y-4">
          {biodata.sections.map((s) => (
            <section
              key={s.id}
              aria-labelledby={`bio-${s.id}`}
              className="rounded-2xl border p-6 sm:p-8 print:break-inside-avoid print:p-5"
              style={{ background: c.card, borderColor: c.line }}
            >
              <h2 id={`bio-${s.id}`} className="font-[family-name:var(--font-serif)] text-2xl font-semibold" style={{ color: c.maroon }}>
                {s.title}
              </h2>
              <div className="mt-2 h-0.5 w-10" style={{ background: c.gold }} aria-hidden="true" />
              <div className="mt-4 space-y-4 text-[16px] leading-7" style={{ color: c.muted }}>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section aria-labelledby="bio-photos" className="mt-12 print:break-before-page">
          <h2 id="bio-photos" className="text-center font-[family-name:var(--font-serif)] text-2xl font-semibold" style={{ color: c.maroon }}>
            Photos
          </h2>
          <div className="mt-3">
            <Ornament />
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            {gallery.map((p) => (
              <li key={p.src} className="overflow-hidden rounded-xl border-4 bg-white shadow-sm" style={{ borderColor: c.card }}>
                <a href={withBasePath(`${p.src}.webp`)} target="_blank" rel="noreferrer noopener" className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
                  <img
                    src={withBasePath(`${p.src}-sm.webp`)}
                    alt={p.alt}
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    className="aspect-[3/4] h-auto w-full object-cover"
                  />
                  <span className="sr-only">(opens full size in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-12 text-center print:mt-6">
          <Ornament />
          <p className="mt-4 text-sm" style={{ color: c.muted }}>
            Thank you for taking the time to read this.
          </p>
        </footer>
      </div>
    </div>
  );
}
