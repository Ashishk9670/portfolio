"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchVisits, recordVisit, type VisitLocation } from "@/lib/visitors";
import worldLandDots from "@/lib/geo/worldLandDots.json";

const VIEW_W = 960;
const VIEW_H = 460;

// Equirectangular projection — matches the [lon, lat] pairs in worldLandDots.json,
// generated from Natural Earth's public-domain 110m country outlines (via the
// world-atlas npm package) rather than hand-drawn, so continent proportions are real.
function project(lon: number, lat: number): [number, number] {
  const x = (lon + 180) * (VIEW_W / 360);
  const y = (90 - lat) * (VIEW_H / 180);
  return [x, y];
}

const LAND_POINTS = (worldLandDots as [number, number][]).map(([lon, lat]) => project(lon, lat));

type Tooltip = { x: number; y: number; city: string; country: string; count: number } | null;

export function VisitorsMap() {
  const [visits, setVisits] = useState<VisitLocation[] | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("visit-recorded")) {
      sessionStorage.setItem("visit-recorded", "1");
      recordVisit();
    }
    fetchVisits().then(setVisits);
  }, []);

  const summary = useMemo(() => {
    if (!visits || visits.length === 0) return null;
    const total = visits.reduce((sum, v) => sum + v.count, 0);
    return `${visits.length} location${visits.length === 1 ? "" : "s"} · ${total} visit${total === 1 ? "" : "s"}`;
  }, [visits]);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">Visitors</h2>
        {summary && <p className="font-mono text-xs text-muted">{summary}</p>}
      </div>
      <p className="mt-2 text-sm text-muted">Approximate, aggregated locations of people reading this site.</p>

      <div className="relative mt-6 rounded-lg border border-border bg-surface p-4 sm:p-6">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full" role="img" aria-label="World map with approximate visitor locations">
          {LAND_POINTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={1.3} className="fill-muted" opacity={0.35} />
          ))}

          {visits?.map((v) => {
            const [x, y] = project(v.lon, v.lat);
            const r = 2.6 + Math.sqrt(v.count) * 1.15;
            return (
              <g key={`${v.lat},${v.lon}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  className="pulse-ring fill-none stroke-accent"
                  strokeWidth={1.5}
                  opacity={0.55}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  className="cursor-pointer fill-accent"
                  onMouseEnter={() => setTooltip({ x, y, city: v.city, country: v.country, count: v.count })}
                  onMouseLeave={() => setTooltip(null)}
                />
              </g>
            );
          })}
        </svg>

        {tooltip && (
          <div
            className="pointer-events-none absolute rounded-md border border-border bg-background px-2.5 py-1.5 text-xs shadow-lg"
            style={{
              left: `${(tooltip.x / VIEW_W) * 100}%`,
              top: `${(tooltip.y / VIEW_H) * 100}%`,
              transform: "translate(-50%, -130%)",
            }}
          >
            <span className="font-medium">{tooltip.city}, {tooltip.country}</span>{" "}
            <span className="font-mono text-accent">{tooltip.count}</span>
          </div>
        )}

        {visits === null && (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-muted">
            Loading visitor data…
          </p>
        )}
      </div>

      <p className="mt-3 text-xs text-muted">
        Approximate location only, rounded to roughly city-level — no IP address or personally
        identifying information is ever stored, only an aggregate count per location.
      </p>
    </div>
  );
}
