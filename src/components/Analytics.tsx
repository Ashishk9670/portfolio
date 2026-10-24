"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ACTION_EVENT, describeClick, normalizePath, send, trackPageview, trackingAllowed } from "@/lib/analytics";

const TRACKED = "a, button, summary, [data-track]";

type PageState = { path: string; visibleMs: number; since: number; maxScroll: number };

// Sends the visible time accumulated on the current page (if any) and resets it.
function flushEngagement(current: PageState) {
  if (!current.path) return;
  if (current.since) {
    current.visibleMs += Date.now() - current.since;
    current.since = 0;
  }
  const seconds = Math.min(3600, Math.round(current.visibleMs / 1000));
  if (seconds >= 1) send({ type: "engagement", path: current.path, seconds, scroll: current.maxScroll });
  current.visibleMs = 0;
}

export function Analytics() {
  const pathname = usePathname();
  const page = useRef<PageState>({ path: "", visibleMs: 0, since: 0, maxScroll: 0 });

  // Clicks, explicit actions, scroll depth, and flushing time-on-page when the tab is hidden.
  useEffect(() => {
    if (!trackingAllowed()) return;

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(TRACKED);
      if (!el || el.closest("[data-no-track]")) return;
      send({ type: "click", path: page.current.path || normalizePath(location.pathname), ...describeClick(el) });
    };
    const onAction = (e: Event) => {
      const { action, label } = (e as CustomEvent<{ action: string; label: string }>).detail;
      send({ type: "click", path: page.current.path, action, label });
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 100;
      page.current.maxScroll = Math.max(page.current.maxScroll, Math.min(100, pct));
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flushEngagement(page.current);
      else page.current.since = Date.now();
    };
    const onPageHide = () => flushEngagement(page.current);

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener(ACTION_EVENT, onAction);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener(ACTION_EVENT, onAction);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  // A pageview per route change; the previous page's engagement is flushed first.
  useEffect(() => {
    if (!trackingAllowed()) return;
    flushEngagement(page.current);
    const path = normalizePath(pathname);
    page.current = { path, visibleMs: 0, since: Date.now(), maxScroll: 0 };
    trackPageview(path);
  }, [pathname]);

  return null;
}

export function trackAction(action: string, label: string): void {
  window.dispatchEvent(new CustomEvent(ACTION_EVENT, { detail: { action, label } }));
}
