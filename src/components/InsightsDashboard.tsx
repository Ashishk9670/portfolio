"use client";

import { useCallback, useEffect, useState, type FormEvent, type PointerEvent } from "react";
import { Lock, LogOut, RefreshCw } from "lucide-react";
import { OPT_OUT_KEY } from "@/lib/analytics";
import {
  ACTION_LABELS,
  PAGE_NAMES,
  TOKEN_KEY,
  fetchStats,
  formatDuration,
  type Range,
  type Stats,
} from "@/lib/insights";

const RANGES: Range[] = [7, 30, 90];
const ERRORS = {
  unauthorized: "That token didn't work. Check it and try again.",
  network: "Couldn't reach the analytics API. Try again in a moment.",
  invalid: "The analytics API returned data in an unexpected shape.",
};

const pageName = (path: string) => (PAGE_NAMES[path] ? `${PAGE_NAMES[path]} (${path})` : path);
const pct = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);

function readStorage(store: "local" | "session", key: string): string | null {
  try {
    return (store === "local" ? localStorage : sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(store: "local" | "session", key: string, value: string | null) {
  try {
    const s = store === "local" ? localStorage : sessionStorage;
    if (value === null) s.removeItem(key);
    else s.setItem(key, value);
  } catch {
    // Storage unavailable (private mode): the dashboard still works for this page load.
  }
}

export function InsightsDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [range, setRange] = useState<Range>(30);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [excludeMe, setExcludeMe] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read browser-only storage after mount
    setToken(readStorage("session", TOKEN_KEY));
    setExcludeMe(readStorage("local", OPT_OUT_KEY) !== "0");
  }, []);

  const load = useCallback(async (t: string, r: Range) => {
    setLoading(true);
    setError(null);
    const result = await fetchStats(t, r);
    setLoading(false);
    if (result.ok) {
      setStats(result.stats);
      return true;
    }
    setError(ERRORS[result.reason]);
    if (result.reason === "unauthorized") {
      writeStorage("session", TOKEN_KEY, null);
      setToken(null);
      setStats(null);
    }
    return false;
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch on token/range change
    if (token) void load(token, range);
  }, [token, range, load]);

  async function unlock(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("token") ?? "").trim();
    if (!value) return;
    writeStorage("session", TOKEN_KEY, value);
    writeStorage("local", OPT_OUT_KEY, excludeMe ? "1" : "0");
    setToken(value);
  }

  function lock() {
    writeStorage("session", TOKEN_KEY, null);
    setToken(null);
    setStats(null);
  }

  function toggleExclude(next: boolean) {
    setExcludeMe(next);
    writeStorage("local", OPT_OUT_KEY, next ? "1" : "0");
  }

  if (!token) {
    return (
      <form onSubmit={unlock} className="mx-auto mt-10 max-w-md rounded-xl border border-border bg-surface p-6" data-no-track>
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-accent" aria-hidden="true" />
          <h2 className="font-semibold">Private dashboard</h2>
        </div>
        <p className="mt-2 text-sm text-muted">Enter the dashboard token to load stats. It&apos;s kept only for this browser tab.</p>
        <label htmlFor="token" className="mt-5 block text-sm font-medium">
          Dashboard token
        </label>
        <input
          id="token"
          name="token"
          type="password"
          autoComplete="off"
          required
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
        />
        <label className="mt-4 flex items-start gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={excludeMe}
            onChange={(e) => setExcludeMe(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[var(--accent)]"
          />
          Don&apos;t count my own visits from this browser
        </label>
        {error && (
          <p role="alert" className="mt-4 text-sm text-danger">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:brightness-110"
        >
          Unlock
        </button>
      </form>
    );
  }

  return (
    <div className="mt-8" data-no-track>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Date range" className="inline-flex rounded-lg border border-border bg-surface p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={range === r}
              onClick={() => setRange(r)}
              className={`min-h-8 rounded-md px-3 font-mono text-xs ${
                range === r ? "bg-accent-wash text-accent ring-1 ring-accent/30" : "text-muted hover:text-foreground"
              }`}
            >
              {r} days
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={excludeMe}
              onChange={(e) => toggleExclude(e.target.checked)}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            Exclude my visits
          </label>
          <button
            type="button"
            onClick={() => token && void load(token, range)}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-xs hover:bg-surface"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
            Refresh
          </button>
          <button
            type="button"
            onClick={lock}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-xs hover:bg-surface"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            Lock
          </button>
        </div>
      </div>

      <p aria-live="polite" className="mt-3 font-mono text-[11px] text-subtle">
        {loading ? "Loading…" : stats ? `Updated ${new Date(stats.generatedAt).toLocaleString()}` : ""}
      </p>
      {error && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {error}
        </p>
      )}

      {stats && <Report stats={stats} />}
    </div>
  );
}

function Report({ stats }: { stats: Stats }) {
  const { totals, funnel } = stats;
  if (totals.pageviews === 0) {
    return (
      <p className="mt-8 rounded-xl border border-border bg-surface p-6 text-muted">
        No visits recorded in the last {stats.rangeDays} days yet.
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {[
          ["Page views", totals.pageviews.toLocaleString()],
          ["Visits (sessions)", totals.sessions.toLocaleString()],
          ["Tracked clicks", totals.clicks.toLocaleString()],
          ["Avg. time on a page", formatDuration(totals.avgSeconds)],
        ].map(([label, value]) => (
          <li key={label} className="rounded-lg border border-border bg-surface p-4 sm:p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">{label}</p>
            <p className="mt-2 font-mono text-[22px] font-bold leading-8 text-foreground sm:text-[28px] sm:leading-9">{value}</p>
          </li>
        ))}
      </ul>

      <Panel title="Page views per day">
        <TrendChart daily={stats.daily} />
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Recruiter funnel" note="Reached out = downloaded the resume, clicked Get in Touch, Email, or LinkedIn, or sent a message. Dossier → reached out is shown as a share of dossier visits.">
          <BarList
            rows={[
              { label: "All visits", value: funnel.sessions, display: `${funnel.sessions}` },
              {
                label: "Viewed Recruiter Dossier",
                value: funnel.viewedDossier,
                display: `${funnel.viewedDossier} · ${pct(funnel.viewedDossier, funnel.sessions)}%`,
              },
              {
                label: "Dossier → reached out",
                value: funnel.dossierThenReachedOut,
                display: `${funnel.dossierThenReachedOut} · ${pct(funnel.dossierThenReachedOut, funnel.viewedDossier)}%`,
              },
              {
                label: "Reached out (any page)",
                value: funnel.reachedOut,
                display: `${funnel.reachedOut} · ${pct(funnel.reachedOut, funnel.sessions)}%`,
              },
            ]}
            max={funnel.sessions}
          />
        </Panel>
        <Panel title="Key actions">
          <BarList
            rows={stats.keyActions.map((a) => ({
              label: ACTION_LABELS[a.action] ?? a.action,
              value: a.clicks,
              display: `${a.clicks} · ${a.sessions} visit${a.sessions === 1 ? "" : "s"}`,
            }))}
            empty="No key actions yet."
          />
        </Panel>
        <Panel title="Where visits come from">
          <BarList rows={stats.referrers.map((r) => ({ label: r.source, value: r.sessions }))} empty="No entry visits yet." />
        </Panel>
        <Panel title="Landing pages">
          <BarList rows={stats.entries.map((e) => ({ label: pageName(e.path), value: e.sessions }))} empty="No entry visits yet." />
        </Panel>
        <Panel title="Countries">
          <BarList rows={stats.countries.map((c) => ({ label: c.country, value: c.sessions }))} />
        </Panel>
        <Panel title="Devices">
          <BarList rows={stats.devices.map((d) => ({ label: d.device, value: d.sessions }))} />
        </Panel>
      </div>

      <Panel title="Pages">
        <DataTable
          caption="Page views, visits, average time, and scroll depth per page"
          columns={["Page", "Views", "Visits", "Avg. time", "Avg. scroll"]}
          rows={stats.pages.map((p) => [
            pageName(p.path),
            p.views.toLocaleString(),
            p.sessions.toLocaleString(),
            formatDuration(p.avgSeconds),
            p.avgScroll == null ? "—" : `${p.avgScroll}%`,
          ])}
        />
      </Panel>

      <Panel title="Top clicks">
        <DataTable
          caption="Most-clicked links and buttons"
          columns={["Clicked", "Goes to", "On page", "Clicks"]}
          rows={stats.clicks.map((c) => [c.label ?? "—", c.target ?? "—", pageName(c.path), c.clicks.toLocaleString()])}
        />
      </Panel>
    </div>
  );
}

function Panel({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="min-w-0 rounded-xl border border-border bg-surface p-5">
      <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">{title}</h2>
      {note && <p className="mt-1 text-xs text-subtle">{note}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

type BarRow = { label: string; value: number; display?: string };

function BarList({ rows, max, empty = "No data yet." }: { rows: BarRow[]; max?: number; empty?: string }) {
  if (!rows.length) return <p className="text-sm text-muted">{empty}</p>;
  const top = max ?? Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.label}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 truncate text-foreground" title={row.label}>
              {row.label}
            </span>
            <span className="shrink-0 font-mono text-xs text-muted">{row.display ?? row.value.toLocaleString()}</span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-surface-2" aria-hidden="true">
            <div
              className="h-2 rounded-full bg-chart"
              style={{ width: `${row.value ? Math.max(2, (row.value / top) * 100) : 0}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function DataTable({ caption, columns, rows }: { caption: string; columns: string[]; rows: string[][] }) {
  if (!rows.length) return <p className="text-sm text-muted">No data yet.</p>;
  return (
    <div role="region" aria-label={caption} tabIndex={0} className="overflow-x-auto">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border">
            {columns.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={`pb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-subtle ${i > 0 ? "text-right" : ""}`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-border last:border-0">
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="max-w-[18rem] truncate py-2 pr-4 font-normal text-foreground" title={cell}>
                    {cell}
                  </th>
                ) : (
                  <td
                    key={i}
                    className={`py-2 pl-4 font-mono text-xs text-muted ${i === row.length - 1 ? "text-right text-foreground" : "max-w-[16rem] truncate text-right"}`}
                    title={cell}
                  >
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const W = 640;
const H = 200;
const PAD = { top: 12, right: 12, bottom: 28, left: 40 };

function TrendChart({ daily }: { daily: Stats["daily"] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...daily.map((d) => d.pageviews), 1);
  const niceMax = max <= 4 ? 4 : Math.ceil(max / 4) * 4;
  const x = (i: number) => PAD.left + (daily.length === 1 ? 0 : (i / (daily.length - 1)) * (W - PAD.left - PAD.right));
  const y = (v: number) => PAD.top + (1 - v / niceMax) * (H - PAD.top - PAD.bottom);
  const line = daily.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d.pageviews).toFixed(1)}`).join(" ");
  const area = `${line} L${x(daily.length - 1).toFixed(1)},${y(0)} L${x(0).toFixed(1)},${y(0)} Z`;
  const ticks = [0, niceMax / 2, niceMax];
  const fmtDay = (day: string) => new Date(`${day}T00:00:00Z`).toLocaleDateString(undefined, { month: "short", day: "numeric", timeZone: "UTC" });

  function onMove(e: PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const step = (W - PAD.left - PAD.right) / Math.max(1, daily.length - 1);
    setHover(Math.min(daily.length - 1, Math.max(0, Math.round((px - PAD.left) / step))));
  }

  const point = hover == null ? null : daily[hover];

  return (
    <div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full touch-none"
          role="img"
          aria-label={`Page views per day over the last ${daily.length} days; ${daily.reduce((s, d) => s + d.pageviews, 0)} in total. Full values are in the table below.`}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          {ticks.map((t) => (
            <line key={t} x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="var(--border)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={area} fill="var(--chart)" opacity="0.12" />
          <path d={line} fill="none" stroke="var(--chart)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          {point && hover != null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={y(0)} stroke="var(--border-strong)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <circle cx={x(hover)} cy={y(point.pageviews)} r="4.5" fill="var(--chart)" stroke="var(--surface)" strokeWidth="2" />
            </g>
          )}
        </svg>
        {ticks.map((t) => (
          <span
            key={t}
            aria-hidden="true"
            className="absolute -translate-y-1/2 font-mono text-[11px] text-subtle"
            style={{ top: `${(y(t) / H) * 100}%`, right: `${100 - ((PAD.left - 6) / W) * 100}%` }}
          >
            {t}
          </span>
        ))}
        <div
          aria-hidden="true"
          className="absolute bottom-0 flex justify-between font-mono text-[11px] text-subtle"
          style={{ left: `${(PAD.left / W) * 100}%`, right: `${(PAD.right / W) * 100}%` }}
        >
          <span>{fmtDay(daily[0].day)}</span>
          <span>{fmtDay(daily[daily.length - 1].day)}</span>
        </div>
        {point && hover != null && (
          <div
            className="pointer-events-none absolute top-0 rounded-md border border-border bg-surface-2 px-3 py-2 text-xs shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)]"
            style={{
              left: `${(x(hover) / W) * 100}%`,
              transform: `translateX(${hover > daily.length / 2 ? "calc(-100% - 10px)" : "10px"})`,
            }}
          >
            <p className="font-mono text-sm font-semibold text-foreground">{point.pageviews} views</p>
            <p className="text-muted">{point.sessions} visits</p>
            <p className="mt-0.5 font-mono text-[11px] text-subtle">{fmtDay(point.day)}</p>
          </div>
        )}
      </div>
      <details className="mt-3">
        <summary className="inline-flex min-h-6 cursor-pointer items-center font-mono text-xs text-accent">Show as table</summary>
        <div className="mt-3">
          <DataTable
            caption="Page views and visits per day"
            columns={["Day", "Views", "Visits"]}
            rows={daily.map((d) => [d.day, String(d.pageviews), String(d.sessions)])}
          />
        </div>
      </details>
    </div>
  );
}
