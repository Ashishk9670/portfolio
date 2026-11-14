import Link from "next/link";
import type { ReactNode } from "react";
import {
  Cake,
  CircleCheck,
  Compass,
  Download,
  Heart,
  House,
  Languages,
  Mail,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Mountain,
  Music,
  Phone,
  Printer,
  Ruler,
  Sparkles,
  Sunrise,
  UserPlus,
  UtensilsCrossed,
} from "lucide-react";
import {
  biodata,
  biodataContacts,
  biodataEmail,
  biodataEnjoy,
  biodataPhone,
  biodataPhotos,
  biodataPoster,
  biodataShortLink,
  biodataTravels,
  biodataUpdated,
  biodataVcard,
  type Lang,
  type QuickFactIcon,
} from "@/lib/biodata";
import { BiodataAge } from "@/components/BiodataAge";
import { withBasePath } from "@/lib/basePath";
import { PlaceChips } from "@/components/PlaceGallery";
import { IndiaMap } from "@/components/IndiaMap";
import { ContactMenu } from "@/components/ContactMenu";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { siteUrl } from "@/lib/data";

const c = {
  bg: "#FBF7F0",
  card: "#FFFFFF",
  ink: "#2B2118",
  muted: "#5F5044",
  maroon: "#7A1F2B",
  gold: "#B8862B",
  line: "#E9DFD0",
};

const ENJOY_ICONS = {
  mountain: Mountain,
  compass: Compass,
  utensils: UtensilsCrossed,
  music: Music,
  messages: MessagesSquare,
  sunrise: Sunrise,
  sparkles: Sparkles,
  heart: Heart,
};

const QUICK_ICONS: Record<QuickFactIcon, typeof Cake> = {
  cake: Cake,
  ruler: Ruler,
  utensils: UtensilsCrossed,
  languages: Languages,
  home: House,
  pin: MapPin,
};

const serifHeading = "font-[family-name:var(--font-serif)]";

// Renders "[label](https://…)" inside biodata strings as links.
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
        return m ? (
          <a
            key={i}
            href={m[2]}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold underline underline-offset-2"
            style={{ color: c.maroon }}
          >
            {m[1]}
          </a>
        ) : (
          part
        );
      })}
    </>
  );
}

function Ornament() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-3"
      style={{ color: c.gold }}
    >
      <span className="h-px w-12" style={{ background: c.gold }} />
      <span className="text-sm">✦</span>
      <span className="h-px w-12" style={{ background: c.gold }} />
    </div>
  );
}

function Card({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={`bio-${id}`}
      className="rounded-2xl border p-6 sm:p-8 print:rounded-none print:border-0 print:border-t print:p-0 print:pt-3"
      style={{ background: c.card, borderColor: c.line }}
    >
      <h2
        id={`bio-${id}`}
        className={`${serifHeading} text-2xl font-semibold print:text-lg print:break-after-avoid`}
        style={{ color: c.maroon }}
      >
        {title}
      </h2>
      <div
        className="mt-2 h-0.5 w-10 print:hidden"
        style={{ background: c.gold }}
        aria-hidden="true"
      />
      <div className="mt-4 print:mt-1.5">{children}</div>
    </section>
  );
}

export function BiodataView({ lang }: { lang: Lang }) {
  const t = biodata[lang];
  // Letter-spacing breaks Devanagari conjuncts, so small-caps styling is English-only.
  const label =
    lang === "en"
      ? "text-xs font-semibold uppercase tracking-[0.15em]"
      : "text-sm font-semibold";
  const { ui } = t;
  const { hero, gallery } = biodataPhotos;
  const contacts = biodataContacts;
  const poster = biodataPoster[lang];
  const shortLink = `${siteUrl}${biodataShortLink[lang]}`;
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(`${ui.shareText}\n${shortLink}?utm_source=whatsapp`)}`;
  // Family details and partner preferences show as "Label: value" tiles.
  const tilesFor = (s: { id: string; highlights: string[] }) =>
    s.id === "family" ? s.highlights : s.id === "partner" ? t.partnerPrefs : null;
  const updated = new Intl.DateTimeFormat(lang === "en" ? "en-IN" : "hi-IN", {
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${biodataUpdated}T12:00:00+05:30`));

  const Journey = (
    <Card id="journey" title={ui.journeyTitle}>
      <p className="text-[15px] leading-6 print:hidden" style={{ color: c.muted }}>
        {ui.journeyIntro}
      </p>
      <ol
        className="mt-6 space-y-5 border-l-2 pl-6 print:mt-1 print:columns-3 print:gap-6 print:space-y-0 print:border-0 print:pl-0 print:text-[11px] print:leading-[1.35]"
        style={{ borderColor: c.line }}
      >
        {t.journey.map((step, i) => (
          <li key={i} className="relative print:mb-1.5 print:break-inside-avoid">
            <span
              aria-hidden="true"
              className="absolute -left-[33px] top-1 h-4 w-4 rounded-full border-[3px] print:hidden"
              style={{
                background: c.card,
                borderColor: i === t.journey.length - 1 ? c.maroon : c.gold,
              }}
            />
            {step.when && (
              <p className={label} style={{ color: c.maroon }}>
                {step.when}
              </p>
            )}
            <p className="mt-0.5 font-semibold">{step.place}</p>
            {step.note && (
              <p className="text-[15px] print:text-[11px]" style={{ color: c.muted }}>
                {step.note}
              </p>
            )}
          </li>
        ))}
      </ol>
    </Card>
  );

  const Enjoy = (
    <div className="print:hidden">
    <Card id="enjoy" title={ui.enjoyTitle}>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {biodataEnjoy.map((item) => {
          const Icon = ENJOY_ICONS[item.icon];
          return (
            <li
              key={item.icon}
              className="flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center text-sm leading-5"
              style={{ borderColor: c.line, background: c.bg }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: "#F3E6D3" }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{ color: c.maroon }}
                  aria-hidden="true"
                />
              </span>
              {item.label[lang]}
            </li>
          );
        })}
      </ul>
    </Card>
    </div>
  );

  const Travels = (
    <Card id="travels" title={ui.travelsTitle}>
      <p className="text-[15px] leading-6 print:text-[11.5px]" style={{ color: c.muted }}>
        {ui.travelsIntro}
        <span className="print:hidden"> {ui.tapHint}</span>
      </p>
      <IndiaMap
        lang={lang}
        labels={ui.gallery}
        legend={{
          lived: ui.mapLived,
          visited: ui.mapVisited,
          note: ui.mapNote,
        }}
      />
      {/* Print: a plain list instead of the photo chips. */}
      <dl className="mt-1.5 hidden space-y-0.5 text-[11px] leading-[1.4] print:block">
        {biodataTravels.map((group) => (
          <div key={group.region.en}>
            <dt className="inline font-semibold" style={{ color: c.maroon }}>
              {group.region[lang]}:{" "}
            </dt>
            <dd className="inline">{group.places.map((p) => p.label[lang]).join(", ")}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 space-y-5 print:hidden">
        {biodataTravels.map((group) => (
          <div key={group.region.en}>
            <h3
              className={`flex items-center gap-2 ${label}`}
              style={{ color: c.maroon }}
            >
              <Mountain className="h-3.5 w-3.5" aria-hidden="true" />
              {group.region[lang]}
            </h3>
            <PlaceChips
              places={group.places.map((p) => ({
                key: p.key,
                label: p.label[lang],
              }))}
              labels={ui.gallery}
            />
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 print:mt-2 print:grid-cols-2 print:gap-2 print:text-[11px]">
        <div
          className="rounded-xl border p-4 print:p-2"
          style={{ borderColor: c.line, background: c.bg }}
        >
          <h3 className={label} style={{ color: c.maroon }}>
            {ui.doneTitle}
          </h3>
          <ul className="mt-3 space-y-2 print:mt-1 print:flex print:flex-wrap print:gap-x-4 print:space-y-0">
            {t.adventures.done.map((a) => (
              <li key={a} className="flex items-center gap-2 text-[15px] print:text-[11px]">
                <CircleCheck
                  className="h-4 w-4 shrink-0"
                  style={{ color: c.maroon }}
                  aria-hidden="true"
                />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-xl border p-4 print:p-2"
          style={{ borderColor: c.line, background: c.bg }}
        >
          <h3 className={label} style={{ color: c.maroon }}>
            {ui.wishTitle}
          </h3>
          <ul className="mt-3 space-y-2 print:mt-1 print:flex print:flex-wrap print:gap-x-4 print:space-y-0">
            {t.adventures.wishlist.map((a) => (
              <li key={a} className="flex items-center gap-2 text-[15px] print:text-[11px]">
                <Sparkles
                  className="h-4 w-4 shrink-0"
                  style={{ color: c.gold }}
                  aria-hidden="true"
                />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );

  const buttonSecondary =
    "inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border bg-white px-4 text-sm font-semibold";

  return (
    <div
      lang={lang}
      className="min-h-screen print:min-h-0 print:bg-white!"
      style={{ background: c.bg, color: c.ink }}
    >
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-8 sm:py-16 print:max-w-none print:px-0 print:py-0">
        <div className="flex justify-end print:hidden">
          <Link
            href={ui.switchHref}
            hrefLang={lang === "en" ? "hi" : "en"}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border bg-white px-3 text-sm font-medium"
            style={{ borderColor: c.line, color: c.maroon }}
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            {ui.switchLabel}
          </Link>
        </div>

        <header className="mt-2 text-center">
          <p
            className={
              lang === "en"
                ? "text-xs font-semibold uppercase tracking-[0.25em]"
                : "text-base font-semibold"
            }
            style={{ color: c.maroon }}
          >
            {ui.eyebrow}
          </p>
          <h1
            className={`mt-3 ${serifHeading} text-4xl font-semibold sm:text-5xl`}
          >
            {t.name}
          </h1>
          <div className="mt-5">
            <Ornament />
          </div>
        </header>

        <section aria-label={ui.quickTitle} className="mt-8 print:mt-4">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 print:grid-cols-3">
            {t.quick.map((q) => {
              const Icon = QUICK_ICONS[q.icon];
              return (
                <div
                  key={q.icon}
                  className="relative flex min-h-15 flex-col justify-center rounded-xl border py-3 pl-15 pr-3 sm:pr-4 print:min-h-0 print:py-1.5 print:pl-3"
                  style={{ background: c.card, borderColor: c.line }}
                >
                  {/* dt and dd must be the div's only children, so the icon sits inside the dt. */}
                  <dt className={label} style={{ color: c.maroon }}>
                    <span
                      className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full print:hidden"
                      style={{ background: "#F3E6D3", color: c.maroon }}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {q.label}
                  </dt>
                  <dd className="text-[15px] font-medium leading-5">
                    {q.icon === "cake" ? <BiodataAge template={ui.age} /> : q.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>

        <section
          aria-label={t.name}
          className="mt-10 grid items-center gap-8 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] print:mt-3 print:grid-cols-[1fr_3fr] print:gap-5"
        >
          <figure
            className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border-4 bg-white shadow-sm sm:max-w-none"
            style={{ borderColor: c.card }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
            <img
              src={withBasePath(`${hero.src}.webp`)}
              alt={hero.alt[lang]}
              width={hero.w}
              height={hero.h}
              className="h-auto w-full"
            />
          </figure>
          <div
            className="rounded-2xl border p-6 sm:p-8"
            style={{ background: c.card, borderColor: c.line }}
          >
            <dl className="space-y-4">
              {t.facts.map((f) => (
                <div key={f.label}>
                  <dt className={label} style={{ color: c.maroon }}>
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-[15px] leading-6">
                    <Rich text={f.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 hidden text-[12px] font-medium print:block">
              {ui.phone}: {biodataPhone.display} &nbsp;·&nbsp; {ui.email}: {biodataEmail}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 print:hidden">
              <ContactMenu
                email={biodataEmail}
                phone={biodataPhone}
                labels={ui}
                colors={c}
              />
              <a
                href={`tel:${biodataPhone.tel}`}
                data-bio-track="bio-call"
                className={buttonSecondary}
                style={{ borderColor: c.line, color: c.maroon }}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {biodataPhone.display}
              </a>
              <a
                href={withBasePath(poster.pdf)}
                download
                data-bio-track="bio-poster-pdf"
                className={buttonSecondary}
                style={{ borderColor: c.line, color: c.maroon }}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {ui.savePdf}
              </a>
              <a
                href={withBasePath(poster.a4)}
                download
                data-bio-track="bio-a4-pdf"
                className={buttonSecondary}
                style={{ borderColor: c.line, color: c.maroon }}
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                {ui.printPdf}
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="bio-poster" className="mt-12 print:hidden">
          <h2
            id="bio-poster"
            className={`text-center ${serifHeading} text-2xl font-semibold`}
            style={{ color: c.maroon }}
          >
            {ui.posterTitle}
          </h2>
          <div className="mt-3">
            <Ornament />
          </div>
          <div className="mt-8 grid items-start gap-6 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <figure
              className="overflow-hidden rounded-2xl border-4 bg-white shadow-sm"
              style={{ borderColor: c.card }}
            >
              <a
                href={withBasePath(`${poster.src}.webp`)}
                data-bio-track="bio-poster-open"
                target="_blank"
                rel="noreferrer noopener"
                className="block"
                aria-label={`${ui.posterAlt} (${ui.posterOpen})`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
                <img
                  src={withBasePath(`${poster.src}-sm.webp`)}
                  srcSet={`${withBasePath(`${poster.src}-sm.webp`)} 720w, ${withBasePath(`${poster.src}.webp`)} ${poster.w}w`}
                  sizes="(min-width: 640px) 480px, 100vw"
                  alt={ui.posterAlt}
                  width={poster.w}
                  height={poster.h}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </a>
            </figure>
            <div
              className="flex flex-col items-center gap-4 rounded-2xl border p-6 text-center sm:sticky sm:top-6"
              style={{ background: c.card, borderColor: c.line }}
            >
              <p
                className={`${serifHeading} text-xl font-semibold`}
                style={{ color: c.maroon }}
              >
                {ui.qrTitle}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element -- static export; tiny PNG */}
              <img
                src={withBasePath(poster.qr)}
                alt={ui.qrAlt}
                width={172}
                height={172}
                className="h-[172px] w-[172px] [image-rendering:pixelated]"
              />
              <p className="text-sm leading-6" style={{ color: c.muted }}>
                {ui.qrText}
              </p>
              <a
                href={whatsappShare}
                data-bio-track="bio-share-whatsapp"
                target="_blank"
                rel="noreferrer noopener"
                className={buttonSecondary}
                style={{ borderColor: c.line, color: c.maroon }}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {ui.shareWhatsapp}
              </a>
              <CopyLinkButton
                url={shortLink}
                label={ui.copyLink}
                copiedLabel={ui.linkCopied}
                className={buttonSecondary}
                style={{ borderColor: c.line, color: c.maroon }}
              />
              <a
                href={withBasePath(poster.pdf)}
                download
                data-bio-track="bio-poster-pdf"
                className={buttonSecondary}
                style={{ borderColor: c.line, color: c.maroon }}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {ui.savePdf}
              </a>
              <a
                href={withBasePath(poster.a4)}
                download
                data-bio-track="bio-a4-pdf"
                className={buttonSecondary}
                style={{ borderColor: c.line, color: c.maroon }}
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                {ui.printPdf}
              </a>
            </div>
          </div>
        </section>

        <div className="mt-12 space-y-6 print:mt-4 print:space-y-3">
          {t.sections.map((s) => (
            <div key={s.id} className="space-y-6 print:space-y-3">
              <Card id={s.id} title={s.title}>
                {tilesFor(s) && (
                  <ul className="mb-5 grid gap-3 sm:grid-cols-2 print:mb-2 print:grid-cols-4 print:gap-1.5 print:text-[11px]">
                    {tilesFor(s)!.map((h) => {
                      const i = h.indexOf(": ");
                      const who = i > 0 ? h.slice(0, i) : null;
                      const what = i > 0 ? h.slice(i + 2) : h;
                      return (
                        <li
                          key={h}
                          className={`rounded-xl border px-4 py-3 print:px-2.5 print:py-1.5 ${who ? "" : "sm:col-span-2 print:col-span-4"}`}
                          style={{ borderColor: c.line, background: "#FBF3E4" }}
                        >
                          {who ? (
                            <p className={label} style={{ color: c.maroon }}>
                              {who}
                            </p>
                          ) : (
                            <House
                              className="h-4 w-4"
                              style={{ color: c.maroon }}
                              aria-hidden="true"
                            />
                          )}
                          <p className="mt-1 text-[15px] font-medium leading-6 print:mt-0 print:text-[11px] print:leading-4">
                            {what.charAt(0).toUpperCase() + what.slice(1)}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {s.id !== "family" && (
                  <ul
                    className="mb-5 space-y-2 rounded-xl border-l-4 px-4 py-3 print:hidden"
                    style={{ borderColor: c.gold, background: "#FBF3E4" }}
                  >
                    {s.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2.5 text-[15px] font-medium leading-6"
                        style={{ color: c.ink }}
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: c.maroon }}
                          aria-hidden="true"
                        />
                        <span>
                          <Rich text={h} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <div
                  className={`space-y-4 text-[16px] leading-7 print:space-y-1.5 print:text-[11.5px] print:leading-[1.45] ${s.id === "family" ? "print:hidden" : ""}`}
                  style={{ color: c.muted }}
                >
                  {s.paragraphs.map((p) => (
                    <p key={p}>
                      <Rich text={p} />
                    </p>
                  ))}
                </div>
              </Card>
              {s.id === "about" && (
                <>
                  {Journey}
                  {Enjoy}
                </>
              )}
              {s.id === "future" && Travels}
            </div>
          ))}
        </div>

        <section
          aria-labelledby="bio-photos"
          className="mt-12 print:hidden"
        >
          <h2
            id="bio-photos"
            className={`text-center ${serifHeading} text-2xl font-semibold`}
            style={{ color: c.maroon }}
          >
            {ui.photosTitle}
          </h2>
          <div className="mt-3">
            <Ornament />
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            {gallery.map((p) => (
              <li
                key={p.src}
                className="overflow-hidden rounded-xl border-4 bg-white shadow-sm"
                style={{ borderColor: c.card }}
              >
                <a
                  href={withBasePath(`${p.src}.webp`)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
                  <img
                    src={withBasePath(`${p.src}-sm.webp`)}
                    alt={p.alt[lang]}
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    className="aspect-[3/4] h-auto w-full object-cover"
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="bio-contact"
          className="mt-12 text-center print:hidden"
        >
          <h2
            id="bio-contact"
            className={`${serifHeading} text-2xl font-semibold`}
            style={{ color: c.maroon }}
          >
            {ui.contactTitle}
          </h2>
          <div className="mt-3">
            <Ornament />
          </div>
          <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-3 [&>li]:w-full sm:[&>li]:w-[calc(50%-0.375rem)]">
            <li
              className="rounded-xl border p-4"
              style={{ background: c.card, borderColor: c.line }}
            >
              <p className="font-semibold">{t.name}</p>
              <div className="mt-2 flex flex-col items-center gap-1 text-sm">
                <a
                  href={`tel:${biodataPhone.tel}`}
                  data-bio-track="bio-call"
                  className="inline-flex min-h-8 items-center gap-1.5 underline underline-offset-2"
                  style={{ color: c.maroon }}
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {biodataPhone.display}
                </a>
                <a
                  href={`https://wa.me/${biodataPhone.tel.replace(/\D/g, "")}`}
                  data-bio-track="bio-whatsapp"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-8 items-center gap-1.5 underline underline-offset-2 print:hidden"
                  style={{ color: c.maroon }}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {ui.whatsapp}
                </a>
                <a
                  href={`mailto:${biodataEmail}`}
                  data-bio-track="bio-email"
                  className="inline-flex min-h-8 items-center gap-1.5 underline underline-offset-2"
                  style={{ color: c.maroon }}
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {biodataEmail}
                </a>
                <a
                  href={withBasePath(biodataVcard)}
                  download
                  data-bio-track="bio-save-contact"
                  className="inline-flex min-h-8 items-center gap-1.5 underline underline-offset-2"
                  style={{ color: c.maroon }}
                >
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  {ui.saveContact}
                </a>
              </div>
            </li>
            {contacts.map((person) => (
              <li
                key={person.label.en}
                className="rounded-xl border p-4"
                style={{ background: c.card, borderColor: c.line }}
              >
                <p className="font-semibold">{person.label[lang]}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-3 text-sm">
                  {person.phone && (
                    <a
                      href={`tel:${person.phone}`}
                      className="inline-flex min-h-8 items-center gap-1.5 underline underline-offset-2"
                      style={{ color: c.maroon }}
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {ui.call}: {person.phone}
                    </a>
                  )}
                  {person.whatsapp && (
                    <a
                      href={`https://wa.me/${person.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex min-h-8 items-center gap-1.5 underline underline-offset-2 print:hidden"
                      style={{ color: c.maroon }}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      {ui.whatsapp}
                    </a>
                  )}
                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className="inline-flex min-h-8 items-center gap-1.5 underline underline-offset-2"
                      style={{ color: c.maroon }}
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      {person.email}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-12 text-center print:mt-1.5 print:[&>div]:hidden print:[&>p]:mx-2 print:[&>p]:mt-0 print:[&>p]:inline print:[&>p]:text-[10px]">
          <Ornament />
          <p className="mt-4 text-sm" style={{ color: c.muted }}>
            {ui.thanks}
          </p>
          <p className="mt-2 text-xs" style={{ color: c.muted }}>
            {ui.updated.replace("{date}", updated)}
          </p>
        </footer>
      </div>
    </div>
  );
}
