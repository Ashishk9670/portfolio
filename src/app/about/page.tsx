import Link from "next/link";
import { Accessibility, ArrowRight, Crosshair, Mail, Sparkles, Target } from "lucide-react";
import {
  achievements,
  certifications,
  education,
  globalTeams,
  impactHighlights,
  leadership,
  milestones,
  philosophy,
  profile,
  siteUrl,
  skills,
} from "@/lib/data";
import { snippets, type CodeSnippet } from "@/lib/snippets";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LinkedInIcon } from "@/components/BrandIcons";
import { ButtonLink, Card, Chip, CodePanel, Container, CtaBand, Eyebrow, SectionHeader, TerminalFrame } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Philosophy & Stack",
  description: `How ${profile.name} thinks about quality engineering, leadership, and the technical stack behind it.`,
  path: "/about",
});

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${siteUrl}/about`,
  name: `About ${profile.name}`,
  mainEntity: { "@id": `${siteUrl}/#person` },
};

const PILLARS: { n: string; title: string; label: string; icon: typeof Target; snippet: CodeSnippet; tags: string[] }[] = [
  { n: "01", title: "Quality starts at discovery", label: "Shift-left & contract validation", icon: Crosshair, snippet: snippets.openApiContract, tags: ["OpenAPI", "Ajv", "Requirement reviews"] },
  { n: "02", title: "Test where the risk is", label: "Risk-based prioritization", icon: Target, snippet: snippets.smokeTier, tags: ["@smoke tier", "Nightly full run", "Critical journeys"] },
  { n: "03", title: "Accessibility is a constraint, not an audit", label: "Accessibility by default", icon: Accessibility, snippet: snippets.a11yGate, tags: ["axe-core", "Lighthouse CI", "WCAG 2.1 / 2.2 AA"] },
  { n: "04", title: "AI is a tool with judgment attached", label: "AI-assisted QA", icon: Sparkles, snippet: snippets.aiWorkflow, tags: ["Claude Code", "Playwright MCP", "Review gate"] },
];

const CREDO = ["Quality is architecture, not a checklist", "Release decisions run on signals"];

export default function AboutPage() {
  const escaped = impactHighlights.find((s) => s.value === "<5%")!;
  const regression = impactHighlights.find((s) => s.value === "~40%")!;
  const cities = [...new Set(globalTeams.flatMap((t) => t.locations))];

  return (
    <>
      <JsonLd data={profilePageJsonLd} />

      <section className="hero-glow pb-12 pt-12 sm:pt-16">
        <Container>
          <Chip tone="accent">Philosophy &amp; system architecture</Chip>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-[30px] font-bold leading-[38px] tracking-[-0.025em] sm:text-[44px] sm:leading-[52px] sm:tracking-[-0.03em]">
                Quality Engineering Philosophy &amp; Technical Stack
              </h1>
              <p className="mt-4 text-[17px] leading-7 text-muted">
                Building release systems where quality is something the architecture produces, not a phase at the
                end of the sprint.
              </p>
            </div>
            <dl className="grid shrink-0 grid-cols-2 divide-x divide-border rounded-lg border border-border bg-surface">
              {[
                ["Escaped defects", escaped.value, escaped.company],
                ["Regression time", regression.value, regression.company],
              ].map(([term, value, context]) => (
                <div key={term} className="px-5 py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">{term}</dt>
                  <dd className="mt-1 font-mono text-[28px] font-bold leading-9 text-success">{value}</dd>
                  <dd className="font-mono text-[10px] uppercase tracking-[0.06em] text-subtle">{context}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <TerminalFrame title="philosophy/credo.md" label="Core principles">
              <ul className="grid gap-6 p-5 sm:grid-cols-2">
                {CREDO.map((title, i) => {
                  const principle = philosophy.find((p) => p.title === title)!;
                  return (
                    <li key={title}>
                      <p className="font-mono text-xs text-[#2dd4bf]">{`// 0${i + 1}. ${principle.title}`}</p>
                      <p className="mt-2 text-sm leading-6 text-[#cbd5e1]">{principle.description}</p>
                    </li>
                  );
                })}
              </ul>
            </TerminalFrame>
          </div>
        </Container>
      </section>

      <section aria-labelledby="story" className="border-t border-border py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="self-start lg:sticky lg:top-28">
            <SectionHeader id="story" eyebrow="background" title="How I Got Here" />
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-muted">
            <p>
              I&apos;m an SDET who started out writing test cases and ended up building the systems that run them.
              Over 5+ years I&apos;ve gone from payments QA at Mastercard to owning cross-platform automation at
              LiveSwitch, to now building an automation suite from scratch for a healthcare platform at Triomics —
              a domain where a flaky test isn&apos;t just an inconvenience, it&apos;s a risk you can&apos;t ship
              with.
            </p>
            <p>
              What I actually do day to day is closer to software engineering than most people picture when they
              hear &quot;QA&quot;: I design framework architecture (Page Object Model, reusable API clients, CI
              pipelines), make build-vs-buy calls on tooling, and decide where AI coding agents genuinely help —
              first-draft test scaffolding, debugging flaky failures — versus where they don&apos;t: test strategy
              and deciding what actually needs coverage still has to be a human call.
            </p>
            <p>
              Accessibility is the other half of what I do. I audit against WCAG professionally, and I built this
              site to the same bar I hold production software to — semantic markup, full keyboard navigation,
              verified contrast, and a written{" "}
              <Link href="/accessibility" className="text-accent underline underline-offset-2">
                accessibility statement
              </Link>{" "}
              instead of a footnote claim.
            </p>
            <p>
              Outside of client work, I tinker with infrastructure — Redis, Sentry, and small cloud projects —
              mostly as an excuse to work at a layer I don&apos;t always get to touch in QA roles.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="quality-pillars" className="border-t border-border py-16">
        <Container>
          <SectionHeader
            id="quality-pillars"
            eyebrow="foundational architecture"
            title="How I Think About Quality"
            intro="Four pillars, each with a real excerpt from a public repo showing it in practice."
          />
          <ul className="mt-8 grid gap-4 lg:grid-cols-2">
            {PILLARS.map((pillar) => {
              const principle = philosophy.find((p) => p.title === pillar.title)!;
              return (
                <Card as="li" key={pillar.n} className="relative flex flex-col p-6">
                  <span
                    data-n={pillar.n}
                    className="absolute right-6 top-5 font-mono text-3xl font-bold text-border after:content-[attr(data-n)]"
                    aria-hidden="true"
                  />
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-2">
                      <pillar.icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    </span>
                    <Eyebrow>{pillar.label}</Eyebrow>
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.015em]">{principle.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-muted">{principle.description}</p>
                  <p className="mt-3 text-[13px] leading-5 text-muted">
                    <span className="font-semibold text-foreground">In practice — </span>
                    {principle.practice}
                  </p>
                  <div className="mt-5 flex-1">
                    <CodePanel snippet={pillar.snippet} />
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {pillar.tags.map((tag) => (
                      <li key={tag}>
                        <Chip>{tag}</Chip>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="stack" className="border-t border-border py-16">
        <Container>
          <SectionHeader
            id="stack"
            eyebrow="skills & architecture"
            title="Categorized Technical Stack"
            intro="Tools and disciplines I use in real work, grouped by where they sit."
            aside={
              <Link href="/skills" className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline">
                Skills timeline & since-dates
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <Card as="li" key={group.category} className="p-5">
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
                  {group.category}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Chip>{item}</Chip>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="leadership" className="border-t border-border py-16">
        <Container>
          <Card className="p-6 sm:p-8">
            <SectionHeader
              id="leadership"
              eyebrow="culture & scaling"
              title="Leadership & Mentoring"
              intro="Taking initiative, growing new joiners, and working across time zones."
              aside={
                <ul className="flex max-w-xs flex-wrap gap-2 sm:justify-end" aria-label="Locations I've worked with">
                  {cities.map((city) => (
                    <li key={city}>
                      <Chip>{city}</Chip>
                    </li>
                  ))}
                </ul>
              }
            />
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {leadership.map((item) => (
                <li key={item.title} className="rounded-lg border border-border bg-surface-2/40 p-5">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-5 text-muted">{item.description}</p>
                  <p className="mt-3 border-t border-border pt-3 text-[13px] leading-5 text-muted">
                    <span className="font-semibold text-success">Outcome — </span>
                    {item.practice}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </section>

      <section aria-labelledby="journey" className="border-t border-border py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeader id="journey" eyebrow="timeline" title="The Journey So Far" />
            <ol className="mt-8 space-y-8 border-l border-border pl-8">
              {milestones.map((milestone) => (
                <li key={milestone.year} className="relative">
                  <span
                    className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_var(--accent-wash)]"
                    aria-hidden="true"
                  />
                  <p className="font-mono text-sm text-accent">{milestone.year}</p>
                  <h3 className="mt-1 font-semibold">{milestone.title}</h3>
                  <p className="mt-1 text-sm text-muted">{milestone.blurb}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid content-start gap-4">
            <Card className="p-5">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">Education</h2>
              <p className="mt-2 font-medium">{education.school}</p>
              <p className="text-sm text-muted">
                {education.degree} · {education.gpa} · {education.start}–{education.end}
              </p>
            </Card>
            <Card className="p-5">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">
                Certifications
              </h2>
              <ul className="mt-2 space-y-1 text-sm">
                {certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-5">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">
                Achievements
              </h2>
              <ul className="mt-2 space-y-1 text-sm">
                {achievements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-5">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">Global Teams</h2>
              <ul className="mt-2 space-y-2 text-sm">
                {globalTeams.map((team) => (
                  <li key={team.company}>
                    <span className="font-medium">{team.company}</span>
                    <span className="block text-muted">{team.locations.join(" · ")}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="collaboration"
        title="Building a quality practice, not just a test suite?"
        body="Open to Senior and Lead SDET roles. Happy to talk about your current test debt, release cadence, and where AI fits."
      >
        <ButtonLink href="/contact" variant="primary" icon={Mail}>
          Get in touch
        </ButtonLink>
        <ButtonLink href={profile.linkedin} icon={LinkedInIcon}>
          LinkedIn
        </ButtonLink>
      </CtaBand>
    </>
  );
}
