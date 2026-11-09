"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { FESTIVALS, festivalFor, isoDate, regionFromTimeZone, type Festival } from "@/lib/festivals";

const DISMISS_PREFIX = "ak_festival_dismissed";

function localToday(): string {
  const now = new Date();
  return isoDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

function storage(action: "get" | "set", key: string): string | null {
  try {
    if (action === "set") localStorage.setItem(key, "1");
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function FestivalGreeting() {
  const [festival, setFestival] = useState<Festival | null>(null);
  const [dismissKey, setDismissKey] = useState("");

  useEffect(() => {
    const today = localToday();
    // ?festival=<id> previews a greeting on any day, but only locally (for design checks and tests);
    // on the live site a card only ever appears on the festival day itself.
    const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const preview = isLocal ? new URLSearchParams(window.location.search).get("festival") : null;
    const match = preview
      ? (FESTIVALS.find((f) => f.id === preview) ?? null)
      : festivalFor(today, regionFromTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone));
    if (!match) return;
    const key = `${DISMISS_PREFIX}:${match.id}:${today}`;
    if (!preview && storage("get", key)) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- date and time zone are only known in the browser
    setDismissKey(key);
    setFestival(match);
  }, []);

  if (!festival) return null;

  function dismiss() {
    storage("set", dismissKey);
    setFestival(null);
  }

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "Escape") dismiss();
  }

  return (
    <aside
      aria-label="Festival greeting"
      onKeyDown={onKeyDown}
      className="festival-in fixed bottom-4 left-4 right-20 z-30 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] sm:right-auto sm:w-[22rem] print:hidden"
    >
      <div
        aria-hidden="true"
        className="h-1.5"
        style={{ background: `linear-gradient(90deg, ${festival.accent.join(", ")})` }}
      />
      <div className="flex items-start gap-3 p-4" role="status">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground">{festival.title}</p>
          <p className="mt-1 text-[13px] leading-5 text-muted">{festival.message}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">— Ashish</p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss greeting"
          className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
