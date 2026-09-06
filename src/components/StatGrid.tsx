import type { Stat } from "@/lib/data";

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-border p-4">
          <dd className="font-mono text-xl font-semibold text-accent">{stat.value}</dd>
          <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}
