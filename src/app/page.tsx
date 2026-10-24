import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  Briefcase,
  CircleCheck,
  Crosshair,
  FileText,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import {
  education,
  experience,
  globalTeams,
  impactHighlights,
  now,
  philosophy,
  profile,
  projects,
  recruiterFaq,
  recruiterSnapshot,
  skills,
} from "@/lib/data";
import { nightlyRun, snippets, type CodeSnippet } from "@/lib/snippets";
import { withBasePath } from "@/lib/basePath";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { VisitorsMap } from "@/components/VisitorsMap";
import {
  ButtonLink,
  Card,
  Chip,
  CodePanel,
  Container,
  CtaBand,
  Eyebrow,
  MetricCard,
  SectionHeader,
  StatusPill,
  TerminalFrame,
} from "@/components/ui";

const FEATURED: { slug: string; tag: string; snippet: CodeSnippet }[] = [
  { slug: "multi-layer-playwright-framework", tag: "UI → API → DB → Kafka", snippet: snippets.orderFlow },
  { slug: "portfolio-mcp-server", tag: "Model Context Protocol", snippet: snippets.mcpTool },
  { slug: "sauce-demo-playwright-suite", tag: "Live public testbed", snippet: snippets.sauceJourney },
  { slug: "food-recommendations", tag: "Built & load-hardened", snippet: snippets.rateLimit },
];

const PILLARS = [
  { title: "Test where the risk is", tag: "Risk-based testing", icon: Target },
  { title: "Quality starts at discovery", tag: "Shift-left", icon: Crosshair },
  { title: "Accessibility is a constraint, not an audit", tag: "WCAG in CI", icon: Accessibility },
  { title: "AI is a tool with judgment attached", tag: "Review-gated AI", icon: Sparkles },
];

const STACK_COLUMNS = [
  { title: "Automation engines", category: "Test Automation", limit: 7 },
  { title: "Languages", category: "Languages" },
  { title: "CI/CD & cloud", category: "CI/CD & Cloud" },
  { title: "AI-assisted QA", category: "AI-Assisted Development" },
];

const SPECIALIZATIONS = [
  "Accessibility (WCAG)",
  "API Testing",
  "Performance (JMeter)",
  "Contract Testing (Pact)",
  "Cross-Browser Testing",
  "LLM Testing",
  "RAG Evaluation",
];

export default function Home() {
  const current = experience[0];
  const notice = recruiterFaq[0].answer.replace(/\.$/, "");
  const cities = [...new Set(globalTeams.flatMap((t) => t.locations))];
  const [lead, accentWords] = [profile.headline.split(" ").slice(0, -2).join(" "), profile.headline.split(" ").slice(-2).join(" ")];

  return (
    <>
      {/* Hero */}
      <section className="hero-glow relative pb-16 pt-12 sm:pb-20 sm:pt-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <StatusPill>Open to Senior &amp; Lead SDET roles · India &amp; overseas</StatusPill>
            <h1 className="mt-6 text-[30px] font-bold leading-[38px] tracking-[-0.025em] sm:text-[44px] sm:leading-[52px] sm:tracking-[-0.03em]">
              {lead} <span className="text-accent">{accentWords}</span>
            </h1>
            <p className="mt-5 text-[17px] leading-7 text-muted">
              {current.role} at <span className="font-semibold text-foreground">{current.company}</span>.{" "}
              {profile.tagline}
            </p>
            <p className="mt-3 text-[15px] leading-6 text-muted">{profile.intro[1]}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/quality" variant="primary" icon={ArrowRight}>
                Explore case studies
              </ButtonLink>
              <ButtonLink href="#for-recruiters">Recruiter TL;DR</ButtonLink>
              <ButtonLink href={withBasePath("/resume.pdf")} icon={FileText} mono>
                Resume (PDF)
              </ButtonLink>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                HIPAA-regulated environment
              </li>
              <li className="flex items-center gap-1.5">
                <Accessibility className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                WCAG 2.1 / 2.2 AA audits
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                Review-gated AI workflows
              </li>
            </ul>
          </div>

          <TerminalFrame
            title={`github-actions · ${nightlyRun.repo}`}
            label={`Nightly · ${nightlyRun.date}`}
            footer={
              <a href={nightlyRun.url} target="_blank" rel="noreferrer noopener" className="hover:text-[#2dd4bf]">
                Real GitHub Actions run · view it →<span className="sr-only">(opens in a new tab)</span>
              </a>
            }
          >
            <div className="p-4 font-mono text-xs leading-6">
              <p>
                <span className="text-[#2dd4bf]">$</span> npx playwright test{" "}
                <span className="text-[#9ca3af]"># full run: every layer, every browser</span>
              </p>
              <ul className="mt-2" aria-label="Jobs in the nightly run">
                {nightlyRun.jobs.map((job) => (
                  <li key={job.name} className="flex items-center justify-between gap-4">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="text-[#34d399]" aria-hidden="true">
                        ✓
                      </span>
                      <span className="truncate">{job.name}</span>
                      <span className="sr-only">passed</span>
                    </span>
                    <span className="shrink-0 text-[#9ca3af]">{job.duration}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                {[
                  ["Test jobs", "12 / 12"],
                  ["Failed", "0"],
                  ["Wall clock", nightlyRun.wallClock],
                ].map(([term, value]) => (
                  <div key={term} className="rounded-md bg-white/5 px-3 py-2">
                    <dt className="text-[10px] uppercase tracking-[0.06em] text-[#9ca3af]">{term}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-[#34d399]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </TerminalFrame>
        </Container>
      </section>

      {/* Recruiter TL;DR */}
      <section aria-labelledby="for-recruiters" className="border-t border-border py-16 sm:py-20">
        <Container>
          <SectionHeader
            id="for-recruiters"
            eyebrow="for recruiters & hiring managers"
            title="Recruiter TL;DR"
            intro="The 60-second version: role, scope, location, and how to reach me."
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                icon: Briefcase,
                label: "Current role",
                badge: "Active",
                title: `SDET II · ${current.company}`,
                body: "Oncology clinical-trial matching platform in a HIPAA-regulated environment. Built the automation suite from scratch and lead the effort to scale it.",
                facts: [
                  ["Looking for", `${recruiterSnapshot.targetRoles} roles`],
                  ["Notice period", notice],
                ],
              },
              {
                icon: Layers,
                label: "Track record",
                badge: recruiterSnapshot.experience,
                title: "UI, API & mobile test automation",
                body: `${recruiterSnapshot.domains}. ${recruiterSnapshot.highlights[0]}; ${recruiterSnapshot.highlights[1].charAt(0).toLowerCase()}${recruiterSnapshot.highlights[1].slice(1)}.`,
                facts: [["Core stack", recruiterSnapshot.coreStack.slice(0, 5).join(" · ")]],
              },
              {
                icon: Globe,
                label: "Global delivery",
                badge: `${cities.length} locations`,
                title: "Distributed teams across time zones",
                body: `Worked with teams in ${cities.join(", ")}.`,
                facts: [
                  ["Location", profile.location],
                  ["Relocation", "India & overseas (visa sponsorship for overseas)"],
                ],
              },
              {
                icon: GraduationCap,
                label: "Foundation & leadership",
                badge: "NIT Warangal",
                title: `${education.degree} · ${education.gpa}`,
                body: recruiterSnapshot.leadership + ".",
                facts: [["Education", `${education.school}, ${education.start}–${education.end}`]],
              },
            ].map((card) => (
              <Card as="li" key={card.label} className="flex flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <card.icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    <Eyebrow>{card.label}</Eyebrow>
                  </span>
                  <Chip tone="success">{card.badge}</Chip>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.015em]">{card.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-6 text-muted">{card.body}</p>
                <dl className="mt-5 space-y-2 border-t border-border pt-4 text-[13px]">
                  {card.facts.map(([term, detail]) => (
                    <div key={term} className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">{term}</dt>
                      <dd className="text-right font-mono text-foreground">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={withBasePath("/resume.pdf")} variant="primary" icon={FileText}>
              Resume (PDF)
            </ButtonLink>
            <ButtonLink href={`mailto:${profile.email}`} icon={Mail}>
              Email me
            </ButtonLink>
            <ButtonLink href={profile.linkedin} icon={LinkedInIcon}>
              LinkedIn
            </ButtonLink>
            <ButtonLink href="/experience" icon={ArrowRight}>
              Full recruiter dossier
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Metrics */}
      <section aria-labelledby="impact" className="border-t border-border py-16 sm:py-20">
        <Container>
          <SectionHeader
            id="impact"
            eyebrow="verifiable metrics"
            title="By the Numbers"
            intro="Measured before and after the work, on the roles themselves."
            aside={
              <Link href="/quality" className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline">
                How I use these metrics
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {impactHighlights.map((stat, i) => (
              <MetricCard
                key={`${stat.company}-${stat.label}`}
                value={stat.value}
                label={stat.label}
                context={stat.company}
                tone={i % 3 === 0 ? "success" : "accent"}
              />
            ))}
          </ul>
        </Container>
      </section>

      {/* Now */}
      <section aria-labelledby="now" className="border-t border-border py-16 sm:py-20">
        <Container>
          <SectionHeader
            id="now"
            eyebrow={`now · updated ${now.updated}`}
            title="What I'm working on"
            intro={`${current.role} · ${current.company} · since ${current.start}`}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {now.items.map((item) => (
              <Card as="li" key={item.label} className="p-6">
                <Eyebrow tone="success">{item.label}</Eyebrow>
                <p className="mt-2 text-[15px] leading-6 text-foreground">{item.text}</p>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline"
                  >
                    {item.link.label}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                )}
              </Card>
            ))}
          </ul>
        </Container>
      </section>

      {/* Featured frameworks */}
      <section aria-labelledby="frameworks" className="border-t border-border py-16 sm:py-20">
        <Container>
          <SectionHeader
            id="frameworks"
            eyebrow="public repositories"
            title="Featured Frameworks & Systems"
            intro="Real code from public repos — open any of them and check."
            aside={
              <Link href="/projects" className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline">
                All projects & frameworks
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <ul className="mt-8 grid gap-4 lg:grid-cols-2">
            {FEATURED.map(({ slug, tag, snippet }) => {
              const project = projects.find((p) => p.slug === slug)!;
              return (
                <Card as="li" key={slug} className="flex flex-col p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Chip tone="accent">{tag}</Chip>
                    {project.links?.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent"
                      >
                        <GitHubIcon className="h-3.5 w-3.5" />
                        Repo
                        <span className="sr-only">for {project.title} (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.015em]">
                    <Link href={`/projects/${slug}`} className="hover:text-accent">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[15px] leading-6 text-muted">{project.tagline}</p>
                  <div className="mt-5 flex-1">
                    <CodePanel snippet={snippet} />
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} stack`}>
                    {project.stack.slice(0, 5).map((tool) => (
                      <li key={tool}>
                        <Chip>{tool}</Chip>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Philosophy */}
      <section aria-labelledby="philosophy" className="border-t border-border py-16 sm:py-20">
        <Container>
          <SectionHeader
            id="philosophy"
            eyebrow="engineering convictions"
            title="Strategic Quality Philosophy"
            intro="Quality as something the system is built to produce, not a gate at the end of the sprint."
            aside={
              <Link href="/about" className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline">
                Full philosophy & stack
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => {
              const principle = philosophy.find((p) => p.title === pillar.title)!;
              return (
                <Card as="li" key={pillar.title} className="flex flex-col p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-2">
                    <pillar.icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold">{principle.title}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-5 text-muted">{principle.description}</p>
                  <p className="mt-4 border-t border-border pt-3 font-mono text-[11px] text-accent">{`// ${pillar.tag}`}</p>
                </Card>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Stack */}
      <section aria-labelledby="stack" className="border-t border-border py-16 sm:py-20">
        <Container>
          <SectionHeader
            id="stack"
            eyebrow="tooling & infrastructure"
            title="Categorized Technical Stack"
            intro="The tools I actually use day to day, grouped by where they sit."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STACK_COLUMNS.map((column) => {
              const items = skills.find((g) => g.category === column.category)!.items.slice(0, column.limit);
              return (
                <Card key={column.title} className="p-5">
                  <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
                    {column.title}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CircleCheck className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
            <Card className="p-5">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
                Specializations
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {SPECIALIZATIONS.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CircleCheck className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16 sm:py-20">
        <Container>
          <VisitorsMap />
        </Container>
      </section>

      <CtaBand
        eyebrow="ready to talk?"
        title="Hiring a Senior or Lead SDET?"
        body={`Based in ${profile.location}. Open to Senior and Lead SDET roles, with relocation in India or overseas. ${notice} notice.`}
      >
        <ButtonLink href="/contact" variant="primary" icon={Mail}>
          Get in touch
        </ButtonLink>
        <ButtonLink href={profile.linkedin} icon={LinkedInIcon}>
          LinkedIn
        </ButtonLink>
        <ButtonLink href={profile.github} icon={GitHubIcon}>
          GitHub
        </ButtonLink>
      </CtaBand>
    </>
  );
}
