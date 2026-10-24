import Link from "next/link";
import { ArrowRight, Boxes, FileCheck2, ScanEye } from "lucide-react";
import { profile, projects, type Project } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { SKILL_ICONS } from "@/lib/skillIcons";
import { snippets, type CodeSnippet } from "@/lib/snippets";
import { GitHubIcon } from "@/components/BrandIcons";
import { ButtonLink, Card, Chip, CodePanel, Container, CtaBand, SectionHeader } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Projects & Frameworks",
  description: `Test automation frameworks, an MCP server, and live CI-driven suites by ${profile.name} — with the architecture and reasoning behind each.`,
  path: "/projects",
  ogImage: "/og-image-projects.png",
});

const SHOWCASE: Record<string, { tag: string; snippet: CodeSnippet }> = {
  "multi-layer-playwright-framework": { tag: "UI → API → DB → Kafka → WebSocket", snippet: snippets.orderFlow },
  "portfolio-mcp-server": { tag: "Model Context Protocol", snippet: snippets.mcpTool },
  "sauce-demo-playwright-suite": { tag: "Live public testbed", snippet: snippets.sauceJourney },
  "food-recommendations": { tag: "Built & load-hardened", snippet: snippets.rateLimit },
};

const PRINCIPLES = [
  {
    icon: Boxes,
    title: "Isolated test state",
    body: "Every test creates its own data through factories or a seeding API and matches events by its own order id, with cleanup fixtures undoing setup in reverse order — so tests run in any order, in parallel.",
    invariant: "Order independence",
  },
  {
    icon: FileCheck2,
    title: "Strict contract boundaries",
    body: "Responses are validated against the OpenAPI spec and typed schemas at every boundary, and the GraphQL schema is snapshotted, so a contract change fails a test instead of a customer.",
    invariant: "Schema-validated payloads",
  },
  {
    icon: ScanEye,
    title: "Flakiness made visible",
    body: "Retries exist in CI, but any test that passes only on retry is listed in a pull-request comment. A retry that hides a flaky test is a defect in the suite, not weather.",
    invariant: "No silent retries",
  },
];

function StackChips({ project }: { project: Project }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={`${project.title} stack`}>
      {project.stack.map((item) => {
        const skillIcon = SKILL_ICONS[item];
        return (
          <li
            key={item}
            className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2/60 py-0.5 font-mono text-xs text-foreground ${
              skillIcon ? "pl-1 pr-2.5" : "px-2.5"
            }`}
          >
            {skillIcon && (
              <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-white">
                <skillIcon.Icon
                  className="h-[11px] w-[11px]"
                  style={skillIcon.color ? { color: skillIcon.color } : undefined}
                  aria-hidden="true"
                />
              </span>
            )}
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export default function ProjectsPage() {
  const showcase = projects.filter((p) => SHOWCASE[p.slug]);
  const others = projects.filter((p) => !SHOWCASE[p.slug]);

  return (
    <>
      <section className="hero-glow pb-10 pt-12 sm:pt-16">
        <Container>
          <Chip tone="accent">Systems & repositories</Chip>
          <h1 className="mt-6 max-w-3xl text-[30px] font-bold leading-[38px] tracking-[-0.025em] sm:text-[44px] sm:leading-[52px] sm:tracking-[-0.03em]">
            Projects &amp; Frameworks
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-7 text-muted">
            Test harnesses, an MCP server, live CI-driven suites, and AI-assisted automation — each with the
            architecture and the reasoning behind it, not just the tool list.
          </p>
        </Container>
      </section>

      <section aria-label="Featured frameworks" className="pb-16">
        <Container>
          <ul className="space-y-6">
            {showcase.map((project) => {
              const { tag, snippet } = SHOWCASE[project.slug];
              return (
                <Card as="li" key={project.slug} className="p-6 sm:p-8">
                  <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
                    <div className="flex flex-col">
                      <Chip tone="accent">{tag}</Chip>
                      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">
                        <Link href={`/projects/${project.slug}`} className="hover:text-accent">
                          {project.title}
                        </Link>
                      </h2>
                      <p className="mt-3 text-[15px] leading-6 text-muted">{project.tagline}</p>
                      <div className="mt-5">
                        <StackChips project={project} />
                      </div>
                      <dl className="mt-6 grid grid-cols-2 gap-3">
                        {project.results.slice(0, 2).map((result) => (
                          <div key={result.label} className="rounded-lg border border-border bg-surface-2/50 p-3">
                            <dt className="font-mono text-lg font-bold text-success">{result.value}</dt>
                            <dd className="mt-1 text-[12px] leading-[18px] text-muted">{result.label}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <ButtonLink href={`/projects/${project.slug}`} variant="primary" icon={ArrowRight}>
                          Read the case study
                        </ButtonLink>
                        {project.links?.repo && (
                          <ButtonLink href={project.links.repo} icon={GitHubIcon} mono>
                            Repository
                          </ButtonLink>
                        )}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <CodePanel snippet={snippet} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="more-projects" className="border-t border-border py-12 sm:py-16">
        <Container>
          <SectionHeader
            id="more-projects"
            eyebrow="more case studies"
            title="Frameworks, Tools & Experiments"
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {others.map((project) => (
              <Card as="li" key={project.slug} className="flex flex-col p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">
                    <Link href={`/projects/${project.slug}`} className="hover:text-accent">
                      {project.title}
                    </Link>
                  </h3>
                  {project.results[0] && (
                    <span className="font-mono text-sm font-bold text-success">{project.results[0].value}</span>
                  )}
                </div>
                <p className="mt-2 flex-1 text-[15px] leading-6 text-muted">{project.tagline}</p>
                <div className="mt-5">
                  <StackChips project={project} />
                </div>
              </Card>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="principles" className="border-t border-border py-12 sm:py-16">
        <Container>
          <SectionHeader
            id="principles"
            eyebrow="engineering rigor"
            title="Deterministic Test Design Principles"
            intro="Automation suites have to be as dependable as the software they certify. These are the rules the multi-layer framework is built on."
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {PRINCIPLES.map((principle) => (
              <Card as="li" key={principle.title} className="flex flex-col p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-2">
                  <principle.icon className="h-4 w-4 text-accent" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{principle.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-6 text-muted">{principle.body}</p>
                <p className="mt-5 rounded-md bg-surface-2/60 px-3 py-2 font-mono text-[11px] text-accent">
                  Invariant: {principle.invariant}
                </p>
              </Card>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        eyebrow="source inspection"
        title="Want to inspect the suites yourself?"
        body="All of the featured frameworks are public, with CI runs and reports you can open — including the runs that go red, and why."
      >
        <ButtonLink href={profile.github} variant="primary" icon={GitHubIcon}>
          Explore GitHub repos
        </ButtonLink>
        <ButtonLink href="/qa-suite" icon={ScanEye}>
          Replay the live QA suite
        </ButtonLink>
      </CtaBand>
    </>
  );
}
