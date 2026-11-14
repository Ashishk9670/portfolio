import { mcpServer } from "@/lib/data";

const ENDPOINT = mcpServer.remoteUrl ? `${mcpServer.remoteUrl}/event` : null;
const PRODUCTION_HOST = "ashishk9670.github.io";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SESSION_KEY = "ak_session";
const ENTRY_KEY = "ak_entry_sent";
const BIODATA_VISITOR_KEY = "ak_bio_visitor";

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
  visitor?: string;
};

export const isBiodataPath = (path: string) => path.startsWith("/marriage");
// The biodata short link only redirects; the biodata page records the visit.
export const isShortLinkPath = (path: string) => path === "/m" || path.startsWith("/m/");
// Biodata clicks are counted only for these marked controls (data-bio-track), never in general.
export const BIODATA_ACTION = /^bio-[a-z0-9-]{1,36}$/;
// A group link (/m/?for=mama) tags the visits it brings in.
export const groupTag = (name: string) =>
  name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 32);

// Only real visitors on the production site are counted: never local dev, the
// e2e suite, Lighthouse, the owner's opted-out browser, or anyone who has asked
// not to be tracked.
export function visitorAllowed(): boolean {
  if (typeof window === "undefined" || !ENDPOINT) return false;
  if (window.location.hostname !== PRODUCTION_HOST) return false;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean; webdriver?: boolean };
  if (nav.webdriver || nav.globalPrivacyControl || nav.doNotTrack === "1") return false;
  try {
    if (localStorage.getItem(OPT_OUT_KEY) === "1") return false;
  } catch {
    // Storage unavailable: fall through and count the visit.
  }
  return true;
}

// Full tracking (clicks, time on page). The dashboard is never tracked, and the
// biodata pages only ever record a page view.
export function trackingAllowed(): boolean {
  if (!visitorAllowed()) return false;
  const path = normalizePath(window.location.pathname);
  return !path.startsWith("/insights") && !isBiodataPath(path) && !isShortLinkPath(path);
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
  if (!visitorAllowed() || !ENDPOINT) return;
  const biodataEvent =
    isBiodataPath(event.path) && (event.type === "pageview" || (event.type === "click" && BIODATA_ACTION.test(event.action ?? "")));
  if (!trackingAllowed() && !biodataEvent) return;
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

// A random id kept in this browser, sent only with biodata page views, so the dashboard can
// show that someone came back. It names no one and is never used on the rest of the site.
function biodataVisitorId(): string | undefined {
  try {
    let id = localStorage.getItem(BIODATA_VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(BIODATA_VISITOR_KEY, id);
    }
    return id;
  } catch {
    return undefined;
  }
}

function entrySource(): string | undefined {
  const params = new URLSearchParams(window.location.search);
  const group = groupTag(params.get("for") ?? "");
  if (group) return `for:${group}`;
  const utm = params.get("utm_source");
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
  const visitor = isBiodataPath(path) ? biodataVisitorId() : undefined;
  send({ type: "pageview", path, entry, source: entry ? entrySource() : undefined, visitor });
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
