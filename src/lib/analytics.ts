import { mcpServer } from "@/lib/data";

const ENDPOINT = mcpServer.remoteUrl ? `${mcpServer.remoteUrl}/event` : null;
const PRODUCTION_HOST = "ashishk9670.github.io";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SESSION_KEY = "ak_session";
const ENTRY_KEY = "ak_entry_sent";

export const ACTION_EVENT = "analytics:action";
export const OPT_OUT_KEY = "ak_no_track";

type EventPayload = {
  type: "pageview" | "click" | "engagement";
  path: string;
  entry?: boolean;
  source?: string;
  label?: string;
  target?: string;
  action?: string;
  seconds?: number;
  scroll?: number;
};

// Only real visitors on the production site are counted: never local dev, the
// e2e suite, Lighthouse, or anyone who has asked not to be tracked.
export function trackingAllowed(): boolean {
  if (typeof window === "undefined" || !ENDPOINT) return false;
  if (window.location.hostname !== PRODUCTION_HOST) return false;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean; webdriver?: boolean };
  if (nav.webdriver || nav.globalPrivacyControl || nav.doNotTrack === "1") return false;
  if (normalizePath(window.location.pathname).startsWith("/insights")) return false;
  try {
    if (localStorage.getItem(OPT_OUT_KEY) === "1") return false;
  } catch {
    // Storage unavailable: fall through and count the visit.
  }
  return true;
}

function sessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export function normalizePath(pathname: string): string {
  const withoutBase = BASE_PATH && pathname.startsWith(BASE_PATH) ? pathname.slice(BASE_PATH.length) : pathname;
  const trimmed = withoutBase.replace(/\/+$/, "");
  return trimmed || "/";
}

export function send(event: EventPayload): void {
  if (!trackingAllowed() || !ENDPOINT) return;
  const body = JSON.stringify({ ...event, session: sessionId(), width: window.innerWidth });
  // text/plain keeps this a "simple" request: no CORS preflight per event.
  const blob = new Blob([body], { type: "text/plain" });
  try {
    if (!navigator.sendBeacon?.(ENDPOINT, blob)) {
      void fetch(ENDPOINT, { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } });
    }
  } catch {
    // Best effort: analytics must never affect the page.
  }
}

function entrySource(): string | undefined {
  const utm = new URLSearchParams(window.location.search).get("utm_source");
  if (utm) return utm.slice(0, 100);
  if (!document.referrer) return undefined;
  try {
    const host = new URL(document.referrer).hostname;
    return host === window.location.hostname ? undefined : host;
  } catch {
    return undefined;
  }
}

export function trackPageview(path: string): void {
  let entry = false;
  try {
    entry = sessionStorage.getItem(ENTRY_KEY) !== "1";
    if (entry) sessionStorage.setItem(ENTRY_KEY, "1");
  } catch {
    entry = false;
  }
  send({ type: "pageview", path, entry, source: entry ? entrySource() : undefined });
}

const clean = (text: string | null | undefined) => (text ?? "").replace(/\s+/g, " ").trim().slice(0, 120);

// Turns a clicked element into a label, a target, and (for the links that
// matter) a named action. Query strings are dropped from targets.
export function describeClick(el: HTMLElement): { label: string; target?: string; action?: string } {
  const label =
    clean(el.dataset.trackLabel) ||
    clean(el.getAttribute("aria-label")) ||
    clean(el.textContent?.replace(/\(opens in a new tab\)/g, "")) ||
    el.tagName.toLowerCase();
  let action = el.dataset.track;
  let target: string | undefined;

  const href = el instanceof HTMLAnchorElement ? el.getAttribute("href") : null;
  if (href) {
    if (href.startsWith("mailto:")) {
      target = "mailto";
      action ??= "email";
    } else if (href.startsWith("#")) {
      target = href;
    } else {
      try {
        const url = new URL(href, window.location.href);
        const internal = url.hostname === window.location.hostname;
        target = internal ? normalizePath(url.pathname) + url.hash : `${url.hostname}${url.pathname}`.slice(0, 300);
        if (url.pathname.endsWith(".pdf")) action ??= "resume";
        else if (internal && normalizePath(url.pathname) === "/contact") action ??= "contact";
        else if (url.hostname.endsWith("topmate.io")) action ??= "topmate";
        else if (url.hostname.endsWith("linkedin.com")) action ??= "linkedin";
        else if (url.hostname === "github.com") action ??= url.pathname.split("/").filter(Boolean).length > 1 ? "repo" : "github";
      } catch {
        target = href.slice(0, 300);
      }
    }
  }
  return { label, target, action };
}
