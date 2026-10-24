import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { qualityMetrics, qualityStatement, qualityStudies, type QualityMetric } from "@/lib/quality";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Quality Engineering",
  description:
    "How I approach quality engineering: risk-based testing, release decisions, AI-assisted QA, accessibility, and production signals — with the metrics behind them.",
  path: "/quality",
});

const SOURCE_STYLES: Record<QualityMetric["source"], string> = {
  "Measured at work": "border-accent text-accent",
  "Public project": "border-border text-foreground",
  "How I use it": "border-border text-muted",
};

export default function QualityPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="font-mono text-sm text-accent">Quality Engineering</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{qualityStatement.heading}</h1>
      <div className="mt-6 max-w-3xl space-y-4 text-muted">
        {qualityStatement.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Quality engineering principles">
        {qualityStatement.pillars.map((pillar) => (
          <li key={pillar} className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs">
            {pillar}
          </li>
        ))}
      </ul>

      <section aria-labelledby="deep-dives" className="mt-16">
        <h2 id="deep-dives" className="text-xl font-semibold">
          Deep dives
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {qualityStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/quality/${study.slug}`}
              className="group flex flex-col rounded-lg border border-border p-5 transition-colors hover:border-accent"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-accent">{study.eyebrow}</p>
              <h3 className="mt-2 font-semibold group-hover:text-accent">{study.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{study.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent">
                Read
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="quality-metrics" className="mt-16">
        <h2 id="quality-metrics" className="text-xl font-semibold">
          Quality metrics
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          The signals I use to make quality decisions. Where I have a real figure, it&apos;s shown and labeled with
          where it came from; where I don&apos;t have one I can publish, I explain how I use the metric instead of
          inventing a number.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {qualityMetrics.map((metric) => (
            <li key={metric.name} className="rounded-lg border border-border p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold">{metric.name}</h3>
                <span className={`rounded-full border px-2.5 py-0.5 font-mono text-xs ${SOURCE_STYLES[metric.source]}`}>
                  {metric.source}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{metric.shows}</p>
              <p className="mt-3 border-t border-border pt-3 text-sm">{metric.evidence}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
