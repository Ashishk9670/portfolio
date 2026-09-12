import { z } from "zod";
import { mcpServer } from "@/lib/data";

const VisitLocationSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
  city: z.string(),
  count: z.number(),
});

export type VisitLocation = z.infer<typeof VisitLocationSchema>;

const VISITORS_BASE = mcpServer.remoteUrl;

export async function recordVisit(): Promise<void> {
  if (!VISITORS_BASE) return;
  try {
    await fetch(`${VISITORS_BASE}/visit`, { method: "POST", keepalive: true });
  } catch {
    // Best-effort — a failed beacon shouldn't affect the page.
  }
}

export async function fetchVisits(): Promise<VisitLocation[] | null> {
  if (!VISITORS_BASE) return null;
  try {
    const res = await fetch(`${VISITORS_BASE}/visits`);
    if (!res.ok) return null;
    return z.array(VisitLocationSchema).parse(await res.json());
  } catch {
    return null;
  }
}
