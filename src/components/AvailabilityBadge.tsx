import { profile } from "@/lib/data";

export function AvailabilityBadge() {
  if (!profile.availableForOpportunities) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted">
      <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
      Available for opportunities
    </div>
  );
}
