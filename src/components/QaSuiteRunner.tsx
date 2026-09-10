"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { fetchQaSuiteRun, QA_SUITE_REPORT_URL, type QaSuiteRun } from "@/lib/qaSuite";

const STEP_INTERVAL_MS = 220;

type LoadState = "loading" | "error" | "ready";

export function QaSuiteRunner() {
  const [state, setState] = useState<LoadState>("loading");
  const [run, setRun] = useState<QaSuiteRun | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetchQaSuiteRun().then((result) => {
      if (cancelled) return;
      if (!result) {
        setState("error");
        return;
      }
      setRun(result);
      setState("ready");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (state !== "ready" || !run) return;
    if (visibleCount >= run.cases.length) return;
    const timer = setTimeout(() => setVisibleCount((n) => n + 1), STEP_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [state, run, visibleCount]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [visibleCount]);

  if (state === "loading") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-dashed border-border p-6 text-sm text-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        Fetching the latest published run…
      </div>
    );
  }

  if (state === "error" || !run) {
    return (
      <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted">
        Could not load the published report right now — the suite&apos;s own CI may not have run
        yet, or GitHub Pages is between deploys. Try the{" "}
        <a
          href={QA_SUITE_REPORT_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent underline underline-offset-2"
        >
          full report
        </a>{" "}
        directly.
      </div>
    );
  }

  const passRate = run.total > 0 ? Math.round((run.passed / run.total) * 100) : 0;
  const visibleCases = run.cases.slice(0, visibleCount);
  const isDone = visibleCount >= run.cases.length;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat value={String(run.total)} label="results" />
        <Stat value={`${passRate}%`} label="passing" />
        <Stat value={String(run.failed + run.broken)} label="failed / broken" />
        <Stat value={`${Math.round(run.durationMs / 1000)}s`} label="wall time" />
      </div>

      <div
        ref={logRef}
        className="mt-6 max-h-80 overflow-y-auto rounded-lg border border-border bg-background p-4 font-mono text-xs"
        aria-live="polite"
      >
        <p className="text-muted">
          {"> "}npx playwright test — replaying {run.reportName}
        </p>
        {visibleCases.map((c) => (
          <div key={c.uid} className="mt-1.5 flex items-start gap-2">
            {c.status === "passed" ? (
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
            ) : (
              <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" aria-hidden="true" />
            )}
            <span className="text-foreground">{c.name}</span>
            <span className="ml-auto shrink-0 text-muted">{(c.duration / 1000).toFixed(1)}s</span>
          </div>
        ))}
        {!isDone && (
          <p className="mt-1.5 flex items-center gap-1.5 text-muted">
            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-accent" aria-hidden="true" />
            {"> "}running…
          </p>
        )}
        {isDone && <p className="mt-2 text-muted">{"> "}done — {visibleCount} of {run.cases.length} results replayed.</p>}
      </div>

      <p className="mt-3 text-xs text-muted">
        This replays the last run the suite&apos;s own CI published — a browser can&apos;t start
        Playwright itself, so nothing here is executing live. The full report, with traces, is
        embedded below.
      </p>

      <iframe
        src={QA_SUITE_REPORT_URL}
        title="Full Allure report"
        className="mt-6 h-[600px] w-full rounded-lg border border-border"
        loading="lazy"
      />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-border p-4 text-center">
      <p className="text-2xl font-semibold text-accent">{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}
