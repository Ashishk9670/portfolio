"use client";

import { useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import placePhotos from "@/lib/placePhotos.json";

type Photo = {
  src: string;
  width: number;
  height: number;
  caption: string;
  author: string;
  license: string;
  source: string;
};
const PHOTOS = placePhotos as Record<string, Photo[]>;

const c = {
  maroon: "#7A1F2B",
  gold: "#B8862B",
  line: "#E9DFD0",
  bg: "#FBF7F0",
  ink: "#2B2118",
  muted: "#5F5044",
};

export type GalleryLabels = {
  photoOf: string;
  credit: string;
  close: string;
  prev: string;
  next: string;
  view: string;
};
type Place = { key: string; label: string; keys?: string[] };

export const hasPhotos = (key: string) => (PHOTOS[key]?.length ?? 0) > 0;

// One photo dialog, shared by whatever opens it (place chips, map pins).
export function usePlaceGallery(labels: GalleryLabels) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [place, setPlace] = useState<Place | null>(null);
  const [index, setIndex] = useState(0);

  const photos = place ? (place.keys ?? [place.key]).flatMap((k) => PHOTOS[k] ?? []) : [];
  const photo = photos[index];

  function open(p: Place) {
    setPlace(p);
    setIndex(0);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  const step = (delta: number) =>
    setIndex((i) => (i + delta + photos.length) % photos.length);

  const dialog = (
    <dialog
      ref={dialogRef}
      aria-labelledby="place-dialog-title"
      onClose={() => setPlace(null)}
      onClick={(e) => e.target === dialogRef.current && close()}
      onKeyDown={(e) => {
        if (photos.length > 1 && e.key === "ArrowRight") step(1);
        if (photos.length > 1 && e.key === "ArrowLeft") step(-1);
      }}
      className="m-auto w-[min(56rem,calc(100vw-2rem))] overflow-hidden rounded-2xl p-0 shadow-2xl backdrop:bg-black/70"
      style={{ background: "#FFFFFF", color: c.ink }}
    >
      {place && photo && (
        <div>
          <div
            className="flex items-center justify-between gap-3 border-b px-5 py-3"
            style={{ borderColor: c.line }}
          >
            <div>
              <h3
                id="place-dialog-title"
                className="font-[family-name:var(--font-serif)] text-xl font-semibold"
                style={{ color: c.maroon }}
              >
                {place.label}
              </h3>
              {photos.length > 1 && (
                <p
                  className="text-xs"
                  style={{ color: c.muted }}
                  aria-live="polite"
                >
                  {labels.photoOf
                    .replace("{i}", String(index + 1))
                    .replace("{n}", String(photos.length))}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={labels.close}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md hover:bg-black/5"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <figure>
            <div className="relative bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element -- remote Wikimedia Commons thumbnail */}
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.caption}
                width={photo.width}
                height={photo.height}
                className="mx-auto max-h-[65vh] w-auto object-contain"
              />
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={labels.prev}
                    className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={labels.next}
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
            <figcaption className="px-5 py-3">
              <p className="font-semibold">{photo.caption}</p>
              <p className="mt-0.5 text-xs" style={{ color: c.muted }}>
                {labels.credit}: {photo.author} · {photo.license} ·{" "}
                <a
                  href={photo.source}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline underline-offset-2"
                >
                  Wikimedia Commons
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </figcaption>
          </figure>

          {photos.length > 1 && (
            <ul
              className="flex gap-2 overflow-x-auto px-5 pb-4"
              aria-label="All photos"
            >
              {photos.map((p, i) => (
                <li key={p.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show photo ${i + 1}: ${p.caption}`}
                    aria-current={i === index}
                    className="block cursor-pointer overflow-hidden rounded-md border-2"
                    style={{
                      borderColor: i === index ? c.maroon : "transparent",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- remote Wikimedia Commons thumbnail */}
                    <img
                      src={p.src}
                      alt=""
                      width={96}
                      height={64}
                      loading="lazy"
                      className="h-16 w-24 object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </dialog>
  );

  return { open, dialog };
}

export function PlaceChips({
  places,
  labels,
}: {
  places: Place[];
  labels: GalleryLabels;
}) {
  const { open, dialog } = usePlaceGallery(labels);
  return (
    <>
      <ul className="mt-2 flex flex-wrap gap-2">
        {places.map((p) => {
          const has = hasPhotos(p.key);
          return (
            <li key={p.key}>
              {has ? (
                <button
                  type="button"
                  onClick={() => open(p)}
                  className="inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors hover:border-[#B8862B] hover:bg-white"
                  style={{
                    borderColor: c.line,
                    background: c.bg,
                    color: c.ink,
                  }}
                >
                  <Camera
                    className="h-3.5 w-3.5"
                    style={{ color: c.gold }}
                    aria-hidden="true"
                  />
                  {p.label}
                  <span className="sr-only">: {labels.view}</span>
                </button>
              ) : (
                <span
                  className="inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-sm"
                  style={{ borderColor: c.line, background: c.bg }}
                >
                  {p.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {dialog}
    </>
  );
}
