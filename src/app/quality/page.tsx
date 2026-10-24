import Link from "next/link";
import { ArrowRight, CircleCheck, CircleDashed, Mail } from "lucide-react";
import { qualityMetrics, qualityStatement, qualityStudies, type QualityMetric } from "@/lib/quality";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, Card, Chip, Container, CtaBand, Disclosure, Eyebrow, SectionHeader, TerminalFrame } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Metrics & Impact",
  description:
    "The quality metrics I make decisions with, labeled by source, plus case studies on test strategy, AI-assisted QA, accessibility, and production signals.",
  path: "/quality",
});

const SOURCE_TONE: Record<QualityMetric["source"], "success" | "accent"> = {
  "Measured at work": "success",
  "Public project": "accent",
};

type PanelRow = { label: string; value: string; bar?: number; ok?: boolean };

// Presentational summaries of each deep dive; every figure is restated from the study itself.
const PANELS: Record<string, { title: string; label: string; rows: PanelRow[] }> = {
  "end-to-end-quality-strategy": {
    title: "test-layers.json",
    label: "154 tests",
    rows: [
      { label: "API (REST + GraphQL)", value: "84", bar: 84 },
      { label: "UI", value: "27", bar: 27 },
      { label: "WebSocket", value: "11", bar: 11 },
      { label: "Database", value: "9", bar: 9 },
      { label: "Kafka", value: "4", bar: 4 },
      { label: "End to end", value: "2", bar: 2 },
    ],
  },
  "ai-powered-qa": {
    title: "ai-workflow.md",
    label: "Review-gated",
    rows: [
      { label: "Time writing + debugging tests", value: "70%+ less", ok: true },
      { label: "AI tests merged without review", value: "0", ok: true },
      { label: "Assertions from requirements, not output", value: "By design", ok: true },
      { label: "LLM eval cases (DeepEval practice)", value: "33", ok: true },
    ],
  },
  "production-quality-demo": {
    title: "signals.yml",
    label: "Demo",
    rows: [
      { label: "Server, edge & browser errors", value: "Wired", ok: true },
      { label: "Source-mapped stack traces", value: "Wired", ok: true },
      { label: "Rate limits on 5 routes", value: "Wired", ok: true },
      { label: "Structured logs & request IDs", value: "Not yet", ok: false },
      { label: "Release tagging", value: "Not yet", ok: false },
    ],
  },
  "accessibility-risk-based-testing": {
    title: "a11y-gates.txt",
    label: "WCAG 2.1 / 2.2 AA",
    rows: [
      { label: "Review cadence at Triomics", value: "2x/yr → monthly", ok: true },
      { label: "Pre-production checklist", value: "Every feature", ok: true },
      { label: "Custom checks beyond axe", value: "~25", ok: true },
      { label: "This site: Lighthouse a11y gate", value: "≥ 95", ok: true },
    ],
  },
};

const COMPARISON = {
  caption: "Late-stage QA compared with how I work",
  columns: ["Dimension", "Late-stage QA", "How I work", "Real result"],
  rows: [
    [
      "Feedback loop",
      "Regression runs overnight or by hand before a release",
      "A risk-tiered @smoke suite on every pull request, the full suite nightly",
      "34 smoke tests per PR (public framework)",
    ],
    [
      "Defect escapes",
      "Found in production and fixed under pressure",
      "Risk-based coverage of critical journeys; every escape becomes a regression test",
      "<5% escaped defects (Triomics · LiveSwitch)",
    ],
    [
      "Regression time",
      "Long serial runs nobody wants to wait for",
      "Playwright migration, parallel shards, and AI-assisted workflows",
      "~40% faster regression runs (LiveSwitch)",
    ],
    [
      "Accessibility",
      "An audit twice a year, when a report is due",
      "A pre-production checklist for every feature, plus a monthly review",
      "2x/yr → monthly (Triomics)",
    ],
    [
      "Flaky tests",
      "Re-run until green",
      "Triage product defect vs. automation issue; tests that pass only on retry are surfaced",
      "2–3% flaky-test rate (Triomics · LiveSwitch)",
    ],
  ],
};

export default function QualityPage() {
  return (
    <>
      <section className="hero-glow pb-12 pt-12 sm:pt-16">
        <Container>
          <Chip tone="accent">Metrics · defect mitigation · release signals</Chip>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-[30px] font-bold leading-[38px] tracking-[-0.025em] sm:text-[44px] sm:leading-[52px] sm:tracking-[-0.03em]">
                Metrics &amp; Impact
              </h1>
              <p className="mt-4 text-[17px] leading-7 text-muted">
                The signals I use to make quality decisions, each labeled with where the figure came from and
                how it feeds a release decision.
              </p>
            </div>
            <ButtonLink href="/contact" variant="primary" icon={Mail}>
              Talk through the numbers
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section aria-labelledby="quality-metrics" className="pb-16">
        <Container>
          <SectionHeader id="quality-metrics" eyebrow="metric ledger" title="Quality metrics" />
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {qualityMetrics.map((metric) => (
              <Card as="li" key={metric.name} className="flex flex-col p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
                    {metric.name}
                  </h3>
                  <Chip tone={SOURCE_TONE[metric.source]}>{metric.source}</Chip>
                </div>
                <p className="mt-4 font-mono text-[28px] font-bold leading-9 tracking-[-0.02em] text-success sm:text-[36px] sm:leading-[44px]">
                  {metric.value}
                </p>
                {metric.context && (
                  <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">{metric.context}</p>
                )}
                <p className="mt-4 flex-1 border-t border-border pt-3 text-[13px] leading-5 text-foreground">
                  {metric.evidence}
                </p>
                <Disclosure summary="Why it matters">
                  <p className="text-[13px] leading-5 text-muted">{metric.shows}</p>
                </Disclosure>
              </Card>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="deep-dives" className="border-t border-border py-12 sm:py-16">
        <Container>
          <SectionHeader
            id="deep-dives"
            eyebrow="case studies"
            title="Deep dives"
            intro="Test strategy, AI-assisted QA, production signals, and accessibility — each grounded in real work or a public repo."
          />
          <ul className="mt-8 space-y-6">
            {qualityStudies.map((study) => {
              const panel = PANELS[study.slug];
              const max = Math.max(...panel.rows.map((r) => r.bar ?? 0));
              return (
                <Card as="li" key={study.slug} className="p-6 sm:p-8">
                  <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                    <div className="flex flex-col">
                      <div className="flex flex-wrap gap-2">
                        <Chip tone="accent">{study.eyebrow}</Chip>
                        {study.notice && <Chip>Personal or practice project</Chip>}
                      </div>
                      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em]">
                        <Link href={`/quality/${study.slug}`} className="hover:text-accent">
                          {study.title}
                        </Link>
                      </h3>
                      <p className="mt-3 flex-1 text-[15px] leading-6 text-muted">{study.summary}</p>
                      <div className="mt-6">
                        <ButtonLink href={`/quality/${study.slug}`} icon={ArrowRight}>
                          Read the deep dive
                        </ButtonLink>
                      </div>
                    </div>
                    <TerminalFrame title={panel.title} label={panel.label}>
                      <ul className="space-y-2.5 p-4 font-mono text-xs">
                        {panel.rows.map((row) => (
                          <li key={row.label}>
                            <div className="flex items-center justify-between gap-3">
                              <span className="flex items-center gap-2">
                                {row.ok !== undefined &&
                                  (row.ok ? (
                                    <CircleCheck className="h-3.5 w-3.5 text-[#34d399]" aria-hidden="true" />
                                  ) : (
                                    <CircleDashed className="h-3.5 w-3.5 text-[#f59e0b]" aria-hidden="true" />
                                  ))}
                                {row.label}
                              </span>
                              <span className={row.ok === false ? "text-[#f59e0b]" : "text-[#34d399]"}>{row.value}</span>
                            </div>
                            {row.bar !== undefined && (
                              <div className="mt-1.5 h-1.5 rounded-full bg-white/10" aria-hidden="true">
                                <div
                                  className="h-1.5 rounded-full bg-[#2dd4bf]"
                                  style={{ width: `${Math.max(4, (row.bar / max) * 100)}%` }}
                                />
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </TerminalFrame>
                  </div>
                </Card>
              );
            })}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="comparison" className="border-t border-border py-12 sm:py-16">
        <Container>
          <SectionHeader
            id="comparison"
            eyebrow="operating model"
            title="Late-Stage QA vs. How I Work"
            intro="Where the difference shows up, and the real numbers behind it."
          />
          <div
            role="region"
            aria-label={COMPARISON.caption}
            tabIndex={0}
            className="mt-8 overflow-x-auto rounded-lg border border-border bg-surface"
          >
            <table className="w-full min-w-[46rem] text-left text-sm">
              <caption className="sr-only">{COMPARISON.caption}</caption>
              <thead className="bg-surface-2/60">
                <tr>
                  {COMPARISON.columns.map((column, i) => (
                    <th
                      key={column}
                      scope="col"
                      className={`px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] ${
                        i === 3 ? "text-success" : i === 2 ? "text-accent" : "text-subtle"
                      }`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map(([dimension, before, after, result]) => (
                  <tr key={dimension} className="border-t border-border align-top">
                    <th scope="row" className="px-4 py-4 font-semibold">
                      {dimension}
                    </th>
                    <td className="px-4 py-4 text-muted">{before}</td>
                    <td className="px-4 py-4 text-foreground">{after}</td>
                    <td className="px-4 py-4 font-mono text-[13px] text-success">{result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section aria-labelledby="statement" className="border-t border-border py-12 sm:py-16">
        <Container>
          <Card className="p-6 sm:p-8">
            <Eyebrow>{"// quality engineering"}</Eyebrow>
            <h2 id="statement" className="mt-2 max-w-3xl text-2xl font-semibold tracking-[-0.02em] sm:text-[32px] sm:leading-10">
              {qualityStatement.heading}
            </h2>
            <div className="mt-4 max-w-3xl space-y-4 text-muted">
              {qualityStatement.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Quality engineering principles">
              {qualityStatement.pillars.map((pillar) => (
                <li key={pillar}>
                  <Chip tone="success">{pillar}</Chip>
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </section>

      <CtaBand
        eyebrow="engineering & recruiter briefing"
        title="Want the story behind a number?"
        body="Happy to walk through any of these numbers, and the decisions they drove."
      >
        <ButtonLink href="/contact" variant="primary" icon={Mail}>
          Get in touch
        </ButtonLink>
        <ButtonLink href="/experience" icon={ArrowRight}>
          Recruiter dossier
        </ButtonLink>
      </CtaBand>
    </>
  );
}
