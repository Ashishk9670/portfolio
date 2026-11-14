import { z } from "zod";
import { mcpServer } from "@/lib/data";

const count = z.number();

export const StatsSchema = z.object({
  rangeDays: z.number(),
  generatedAt: z.string(),
  totals: z.object({ pageviews: count, sessions: count, clicks: count, avgSeconds: z.number().nullable() }),
  daily: z.array(z.object({ day: z.string(), pageviews: count, sessions: count })),
  pages: z.array(
    z.object({
      path: z.string(),
      views: count,
      sessions: count,
      avgSeconds: z.number().nullable(),
      avgScroll: z.number().nullable(),
    })
  ),
  entries: z.array(z.object({ path: z.string(), sessions: count })),
  referrers: z.array(z.object({ source: z.string(), sessions: count })),
  clicks: z.array(
    z.object({
      label: z.string().nullable(),
      target: z.string().nullable(),
      path: z.string(),
      action: z.string().nullable(),
      clicks: count,
    })
  ),
  keyActions: z.array(z.object({ action: z.string(), clicks: count, sessions: count })),
  countries: z.array(z.object({ country: z.string(), sessions: count })),
  devices: z.array(z.object({ device: z.string(), sessions: count })),
  biodata: z
    .object({
      views: count,
      visits: count,
      pages: z.array(z.object({ path: z.string(), views: count })),
      sources: z.array(z.object({ source: z.string(), visits: count })),
      // Added later; older Worker responses don't have it.
      countries: z.array(z.object({ country: z.string(), visits: count })).default([]),
      actions: z.array(z.object({ action: z.string(), clicks: count, visits: count })).default([]),
      people: count.default(0),
      returning: z
        .array(z.object({ visits: count, firstSeen: z.string(), lastSeen: z.string(), source: z.string(), country: z.string() }))
        .default([]),
      returningCount: count.default(0),
    })
    .optional(),
  funnel: z.object({
    sessions: count,
    viewedDossier: count,
    dossierThenReachedOut: count,
    reachedOut: count,
  }),
});

export type Stats = z.infer<typeof StatsSchema>;
export type Range = 7 | 30 | 90;

export const TOKEN_KEY = "ak_stats_token";

export type StatsResult = { ok: true; stats: Stats } | { ok: false; reason: "unauthorized" | "network" | "invalid" };

export async function fetchStats(token: string, range: Range): Promise<StatsResult> {
  if (!mcpServer.remoteUrl) return { ok: false, reason: "network" };
  let res: Response;
  try {
    res = await fetch(`${mcpServer.remoteUrl}/stats?range=${range}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  } catch {
    return { ok: false, reason: "network" };
  }
  if (res.status === 401) return { ok: false, reason: "unauthorized" };
  if (!res.ok) return { ok: false, reason: "network" };
  const parsed = StatsSchema.safeParse(await res.json().catch(() => null));
  return parsed.success ? { ok: true, stats: parsed.data } : { ok: false, reason: "invalid" };
}

export const ACTION_LABELS: Record<string, string> = {
  resume: "Resume downloads",
  contact: "Get in touch clicks",
  email: "Email clicks",
  message: "Messages sent",
  linkedin: "LinkedIn clicks",
  topmate: "Topmate (mentoring)",
  repo: "Repository clicks",
  github: "GitHub profile clicks",
  ask: "Questions asked to the assistant",
  "path-dossier": "Home → Recruiter Dossier card",
  "path-projects": "Home → See the code card",
  "path-quality": "Home → How I measure quality card",
};

export function formatDuration(seconds: number | null): string {
  if (seconds == null) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m ? `${m}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}

export const PAGE_NAMES: Record<string, string> = {
  "/": "Overview",
  "/experience": "Recruiter Dossier",
  "/projects": "Projects & Frameworks",
  "/quality": "Metrics & Impact",
  "/about": "Philosophy & Stack",
  "/mentoring": "Mentoring",
  "/contact": "Contact",
};

// Clicks the biodata pages count: downloads, sharing, and contact taps.
export const BIODATA_ACTION_LABELS: Record<string, string> = {
  "bio-poster-pdf": "Poster PDF downloads",
  "bio-a4-pdf": "A4 PDF downloads",
  "bio-poster-open": "Poster opened full size",
  "bio-share-whatsapp": "Shared on WhatsApp",
  "bio-copy-link": "Link copied",
  "bio-save-contact": "Saved to contacts",
  "bio-call": "Call taps",
  "bio-whatsapp": "WhatsApp message taps",
  "bio-email": "Email taps",
};
