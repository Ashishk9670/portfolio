import Link from "next/link";
import type { ReactNode } from "react";
import {
  CircleCheck,
  Compass,
  Download,
  Heart,
  Languages,
  Mail,
  MessageCircle,
  MessagesSquare,
  Mountain,
  Music,
  Phone,
  Sparkles,
  Sunrise,
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
  biodataQr,
  biodataTravels,
  type Lang,
} from "@/lib/biodata";
import { withBasePath } from "@/lib/basePath";
import { PlaceChips } from "@/components/PlaceGallery";
import { IndiaMap } from "@/components/IndiaMap";
import { ContactMenu } from "@/components/ContactMenu";

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

const serifHeading = "font-[family-name:var(--font-serif)]";

// Renders "[label](https://…)" inside biodata strings as links.
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
        return m ? (
          <a key={i} href={m[2]} target="_blank" rel="noreferrer noopener" className="font-semibold underline underline-offset-2" style={{ color: c.maroon }}>
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
    <div aria-hidden="true" className="flex items-center justify-center gap-3" style={{ color: c.gold }}>
      <span className="h-px w-12" style={{ background: c.gold }} />
      <span className="text-sm">✦</span>
      <span className="h-px w-12" style={{ background: c.gold }} />
    </div>
  );
}

function Card({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section
      aria-labelledby={`bio-${id}`}
      className="rounded-2xl border p-6 sm:p-8 print:break-inside-avoid print:p-5"
      style={{ background: c.card, borderColor: c.line }}
    >
      <h2 id={`bio-${id}`} className={`${serifHeading} text-2xl font-semibold`} style={{ color: c.maroon }}>
        {title}
      </h2>
      <div className="mt-2 h-0.5 w-10" style={{ background: c.gold }} aria-hidden="true" />
      <div className="mt-4">{children}</div>
    </section>
  );
}


export function BiodataView({ lang }: { lang: Lang }) {
  const t = biodata[lang];
  // Letter-spacing breaks Devanagari conjuncts, so small-caps styling is English-only.
  const label = lang === "en" ? "text-xs font-semibold uppercase tracking-[0.15em]" : "text-sm font-semibold";
  const { ui } = t;
  const { hero, gallery } = biodataPhotos;
  const contacts = biodataContacts;

  const Journey = (
    <Card id="journey" title={ui.journeyTitle}>
      <p className="text-[15px] leading-6" style={{ color: c.muted }}>
        {ui.journeyIntro}
      </p>
      <ol className="mt-6 space-y-5 border-l-2 pl-6" style={{ borderColor: c.line }}>
        {t.journey.map((step, i) => (
          <li key={i} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[33px] top-1 h-4 w-4 rounded-full border-[3px]"
              style={{ background: c.card, borderColor: i === t.journey.length - 1 ? c.maroon : c.gold }}
            />
            {step.when && (
              <p className={label} style={{ color: c.maroon }}>
                {step.when}
              </p>
            )}
            <p className="mt-0.5 font-semibold">{step.place}</p>
            {step.note && (
              <p className="text-[15px]" style={{ color: c.muted }}>
                {step.note}
              </p>
            )}
          </li>
        ))}
      </ol>
    </Card>
  );

  const Enjoy = (
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
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "#F3E6D3" }}>
                <Icon className="h-5 w-5" style={{ color: c.maroon }} aria-hidden="true" />
              </span>
              {item.label[lang]}
            </li>
          );
        })}
      </ul>
    </Card>
  );

  const Travels = (
    <Card id="travels" title={ui.travelsTitle}>
      <p className="text-[15px] leading-6" style={{ color: c.muted }}>
        {ui.travelsIntro}
        <span className="print:hidden"> {ui.tapHint}</span>
      </p>
      <IndiaMap lang={lang} labels={ui.gallery} legend={{ lived: ui.mapLived, visited: ui.mapVisited, note: ui.mapNote }} />
      <div className="mt-6 space-y-5">
        {biodataTravels.map((group) => (
          <div key={group.region.en}>
            <h3 className={`flex items-center gap-2 ${label}`} style={{ color: c.maroon }}>
              <Mountain className="h-3.5 w-3.5" aria-hidden="true" />
              {group.region[lang]}
            </h3>
            <PlaceChips places={group.places.map((p) => ({ key: p.key, label: p.label[lang] }))} labels={ui.gallery} />
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border p-4" style={{ borderColor: c.line, background: c.bg }}>
          <h3 className={label} style={{ color: c.maroon }}>
            {ui.doneTitle}
          </h3>
          <ul className="mt-3 space-y-2">
            {t.adventures.done.map((a) => (
              <li key={a} className="flex items-center gap-2 text-[15px]">
                <CircleCheck className="h-4 w-4 shrink-0" style={{ color: c.maroon }} aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border p-4" style={{ borderColor: c.line, background: c.bg }}>
          <h3 className={label} style={{ color: c.maroon }}>
            {ui.wishTitle}
          </h3>
          <ul className="mt-3 space-y-2">
            {t.adventures.wishlist.map((a) => (
              <li key={a} className="flex items-center gap-2 text-[15px]">
                <Sparkles className="h-4 w-4 shrink-0" style={{ color: c.gold }} aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );

  const buttonSecondary = "inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border bg-white px-4 text-sm font-semibold";

  return (
    <div lang={lang} className="min-h-screen print:min-h-0" style={{ background: c.bg, color: c.ink }}>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-8 sm:py-16 print:max-w-none print:py-0">
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
          <p className={lang === "en" ? "text-xs font-semibold uppercase tracking-[0.25em]" : "text-base font-semibold"} style={{ color: c.maroon }}>
            {ui.eyebrow}
          </p>
          <h1 className={`mt-3 ${serifHeading} text-4xl font-semibold sm:text-5xl`}>{t.name}</h1>
          <div className="mt-5">
            <Ornament />
          </div>
        </header>

        <section
          aria-label={t.name}
          className="mt-10 grid items-center gap-8 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] print:mt-6 print:grid-cols-[2fr_3fr]"
        >
          <figure className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border-4 bg-white shadow-sm sm:max-w-none" style={{ borderColor: c.card }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
            <img src={withBasePath(`${hero.src}.webp`)} alt={hero.alt[lang]} width={hero.w} height={hero.h} className="h-auto w-full" />
          </figure>
          <div className="rounded-2xl border p-6 sm:p-8" style={{ background: c.card, borderColor: c.line }}>
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
            <div className="mt-6 flex flex-wrap items-center gap-3 print:hidden">
              <ContactMenu email={biodataEmail} phone={biodataPhone} labels={ui} colors={c} />
              <a href={`tel:${biodataPhone.tel}`} className={buttonSecondary} style={{ borderColor: c.line, color: c.maroon }}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {biodataPhone.display}
              </a>
              <a href={withBasePath(biodataPoster.pdf)} download className={buttonSecondary} style={{ borderColor: c.line, color: c.maroon }}>
                <Download className="h-4 w-4" aria-hidden="true" />
                {ui.savePdf}
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="bio-poster" className="mt-12 print:hidden">
          <h2 id="bio-poster" className={`text-center ${serifHeading} text-2xl font-semibold`} style={{ color: c.maroon }}>
            {ui.posterTitle}
          </h2>
          <div className="mt-3">
            <Ornament />
          </div>
          <div className="mt-8 grid items-start gap-6 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <figure className="overflow-hidden rounded-2xl border-4 bg-white shadow-sm" style={{ borderColor: c.card }}>
              <a href={withBasePath(`${biodataPoster.src}.webp`)} target="_blank" rel="noreferrer noopener" className="block" aria-label={`${ui.posterAlt} (${ui.posterOpen})`}>
                {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
                <img
                  src={withBasePath(`${biodataPoster.src}-sm.webp`)}
                  srcSet={`${withBasePath(`${biodataPoster.src}-sm.webp`)} 720w, ${withBasePath(`${biodataPoster.src}.webp`)} ${biodataPoster.w}w`}
                  sizes="(min-width: 640px) 480px, 100vw"
                  alt={ui.posterAlt}
                  width={biodataPoster.w}
                  height={biodataPoster.h}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </a>
            </figure>
            <div className="flex flex-col items-center gap-4 rounded-2xl border p-6 text-center sm:sticky sm:top-6" style={{ background: c.card, borderColor: c.line }}>
              <p className={`${serifHeading} text-xl font-semibold`} style={{ color: c.maroon }}>
                {ui.qrTitle}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element -- static export; tiny PNG */}
              <img src={withBasePath(biodataQr)} alt={ui.qrAlt} width={172} height={172} className="h-[172px] w-[172px] [image-rendering:pixelated]" />
              <p className="text-sm leading-6" style={{ color: c.muted }}>
                {ui.qrText}
              </p>
              <a href={withBasePath(biodataPoster.pdf)} download className={buttonSecondary} style={{ borderColor: c.line, color: c.maroon }}>
                <Download className="h-4 w-4" aria-hidden="true" />
                {ui.savePdf}
              </a>
            </div>
          </div>
        </section>

        <div className="mt-12 space-y-6 print:mt-6 print:space-y-4">
          {t.sections.map((s) => (
            <div key={s.id} className="space-y-6 print:space-y-4">
              <Card id={s.id} title={s.title}>
                <ul className="mb-5 space-y-2 rounded-xl border-l-4 px-4 py-3" style={{ borderColor: c.gold, background: "#FBF3E4" }}>
                  {s.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-[15px] font-medium leading-6" style={{ color: c.ink }}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: c.maroon }} aria-hidden="true" />
                      <span>
                        <Rich text={h} />
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-4 text-[16px] leading-7" style={{ color: c.muted }}>
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

        <section aria-labelledby="bio-photos" className="mt-12 print:break-before-page">
          <h2 id="bio-photos" className={`text-center ${serifHeading} text-2xl font-semibold`} style={{ color: c.maroon }}>
            {ui.photosTitle}
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

        <section aria-labelledby="bio-contact" className="mt-12 text-center print:mt-6">
          <h2 id="bio-contact" className={`${serifHeading} text-2xl font-semibold`} style={{ color: c.maroon }}>
            {ui.contactTitle}
          </h2>
          <div className="mt-3">
            <Ornament />
          </div>
          <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-3 [&>li]:w-full sm:[&>li]:w-[calc(50%-0.375rem)]">
            <li className="rounded-xl border p-4" style={{ background: c.card, borderColor: c.line }}>
              <p className="font-semibold">{t.name}</p>
              <div className="mt-2 flex flex-col items-center gap-1 text-sm">
                <a href={`tel:${biodataPhone.tel}`} className="inline-flex min-h-8 items-center gap-1.5 underline underline-offset-2" style={{ color: c.maroon }}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {biodataPhone.display}
                </a>
                <a
                  href={`https://wa.me/${biodataPhone.tel.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-8 items-center gap-1.5 underline underline-offset-2 print:hidden"
                  style={{ color: c.maroon }}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {ui.whatsapp}
                </a>
                <a href={`mailto:${biodataEmail}`} className="inline-flex min-h-8 items-center gap-1.5 underline underline-offset-2" style={{ color: c.maroon }}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {biodataEmail}
                </a>
              </div>
            </li>
            {contacts.map((person) => (
              <li key={person.label.en} className="rounded-xl border p-4" style={{ background: c.card, borderColor: c.line }}>
                <p className="font-semibold">{person.label[lang]}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-3 text-sm">
                  {person.phone && (
                    <a href={`tel:${person.phone}`} className="inline-flex min-h-8 items-center gap-1.5 underline underline-offset-2" style={{ color: c.maroon }}>
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
                    <a href={`mailto:${person.email}`} className="inline-flex min-h-8 items-center gap-1.5 underline underline-offset-2" style={{ color: c.maroon }}>
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      {person.email}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-12 text-center print:mt-6">
          <Ornament />
          <p className="mt-4 text-sm" style={{ color: c.muted }}>
            {ui.thanks}
          </p>
        </footer>
      </div>
    </div>
  );
}
