"use client";

import { useRef, useState } from "react";
import indiaDots from "@/lib/geo/indiaLandDots.json";
import { biodataLived, biodataTravels, type Lang } from "@/lib/biodata";
import { hasPhotos, usePlaceGallery, type GalleryLabels } from "@/components/PlaceGallery";

const c = { maroon: "#7A1F2B", gold: "#B8862B", land: "#C9B79C", muted: "#5F5044", card: "#FFFFFF" };

const { bounds, step, dots } = indiaDots as { bounds: { west: number; east: number; south: number; north: number }; step: number; dots: [number, number][] };

// Equirectangular, with longitude scaled by cos(22°) so the subcontinent isn't stretched.
const K = Math.cos((22 * Math.PI) / 180);
const W = (bounds.east - bounds.west) * K;
const H = bounds.north - bounds.south;
const x = (lon: number) => (lon - bounds.west) * K;
const y = (lat: number) => bounds.north - lat;

// Fades the land outside the subcontinent so it reads as a map of India, not a block of Asia.
function fade(lon: number, lat: number) {
  const d = Math.hypot((lon - 80) / 15, (lat - 21.5) / 14.5);
  return Math.max(0, Math.min(1, 1.35 - d));
}

const visited = biodataTravels.flatMap((g) => g.places);

export function IndiaMap({ lang, labels, legend }: { lang: Lang; labels: GalleryLabels; legend: { lived: string; visited: string; note: string } }) {
  const { open, dialog } = usePlaceGallery(labels);
  const [hover, setHover] = useState<string | null>(null);

  // A lived city that's also a travel place opens that place's photos.
  const lived = biodataLived.map((l) => ({ ...l, place: visited.find((v) => v.label.en === l.label.en) }));
  const visitedOnly = visited.filter((v) => !biodataLived.some((l) => l.label.en === v.label.en));

  type Pin = { key: string; label: string; cx: number; cy: number; kind: "lived" | "visited"; placeKeys: string[] };
  const raw: Pin[] = [
    ...visitedOnly.map((p) => ({ key: `v-${p.key}`, label: p.label[lang], cx: x(p.lon), cy: y(p.lat), kind: "visited" as const, placeKeys: [p.key] })),
    ...lived.map((l) => ({ key: `l-${l.label.en}`, label: l.label[lang], cx: x(l.lon), cy: y(l.lat), kind: "lived" as const, placeKeys: l.place ? [l.place.key] : [] })),
  ];
  // Places a few km apart (Ajmer and Pushkar, Mumbai and Elephanta) can't be told apart by a
  // tap on a phone-sized map, so they share one pin that opens all their photos.
  const pins: Pin[] = [];
  for (const p of raw) {
    const near = pins.find((q) => Math.hypot(q.cx - p.cx, q.cy - p.cy) < 0.35);
    if (near) {
      near.key += `+${p.key}`;
      near.label += ` · ${p.label}`;
      near.placeKeys.push(...p.placeKeys);
      if (p.kind === "lived") near.kind = "lived";
    } else {
      pins.push({ ...p, placeKeys: [...p.placeKeys] });
    }
  }
  const clickable = (p: Pin) => p.placeKeys.some(hasPhotos);

  // A tap or hover anywhere on the map goes to the nearest pin (within ~2°), so every pin
  // gets the largest possible target without stealing taps from its neighbours.
  const svgRef = useRef<SVGSVGElement>(null);
  function nearestPin(clientX: number, clientY: number) {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return null;
    const pt = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
    let best: Pin | null = null;
    let bestDist = 2;
    for (const p of pins) {
      const d = Math.hypot(p.cx - pt.x, p.cy - pt.y);
      if (d < bestDist) {
        best = p;
        bestDist = d;
      }
    }
    return best;
  }

  const openPin = (p: Pin) => open({ key: p.placeKeys[0], keys: p.placeKeys, label: p.label });

  return (
    <figure className="mt-6 print:hidden">
      <div className="relative mx-auto max-w-md rounded-xl border p-2 sm:p-3" style={{ borderColor: "#E9DFD0", background: "#FBF7F0" }}>
        <svg
          ref={svgRef}
          viewBox={`-0.6 -0.6 ${W + 1.2} ${H + 1.2}`}
          className="h-auto w-full touch-manipulation"
          role="group"
          aria-label={legend.note}
          onClick={(e) => {
            const p = nearestPin(e.clientX, e.clientY);
            if (p && clickable(p)) openPin(p);
          }}
          onPointerMove={(e) => {
            const p = nearestPin(e.clientX, e.clientY);
            setHover(p?.label ?? null);
            e.currentTarget.style.cursor = p && clickable(p) ? "pointer" : "default";
          }}
          onPointerLeave={() => setHover(null)}
        >
          {dots.map(([lon, lat]) => {
            const o = fade(lon, lat);
            return o > 0.02 ? <circle key={`${lon},${lat}`} cx={x(lon)} cy={y(lat)} r={step * 0.32} fill={c.land} opacity={o} /> : null;
          })}
          {pins.map((p) => {
            const dot =
              p.kind === "lived" ? (
                <circle cx={p.cx} cy={p.cy} r={0.42} fill={c.maroon} stroke={c.card} strokeWidth={0.12} />
              ) : (
                <circle cx={p.cx} cy={p.cy} r={0.34} fill={c.gold} stroke={c.card} strokeWidth={0.12} />
              );
            if (!clickable(p)) return <g key={p.key}>{dot}</g>;
            return (
              <g
                key={p.key}
                role="button"
                tabIndex={0}
                aria-label={`${p.label}: ${labels.view}`}
                className="outline-none [&:focus-visible>circle]:stroke-[#2B2118] [&:focus-visible>circle]:stroke-[0.2]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openPin(p);
                  }
                }}
                onFocus={() => setHover(p.label)}
                onBlur={() => setHover(null)}
              >
                {dot}
              </g>
            );
          })}
        </svg>
        <p aria-live="polite" className="pointer-events-none absolute left-3 top-3 min-h-6 rounded-md bg-white/90 px-2 py-0.5 text-sm font-semibold shadow-sm empty:hidden" style={{ color: c.maroon }}>
          {hover ?? ""}
        </p>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm" style={{ color: c.muted }}>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: c.maroon }} aria-hidden="true" />
          {legend.lived}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: c.gold }} aria-hidden="true" />
          {legend.visited}
        </span>
      </figcaption>
      {dialog}
    </figure>
  );
}

