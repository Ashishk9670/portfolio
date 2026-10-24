import { CalendarClock, CircleCheck, FileText, Globe, Mail, MapPin, Plane, Target, Users } from "lucide-react";
import {
  education,
  experience,
  globalTeams,
  impactHighlights,
  leadership,
  profile,
  recruiterFaq,
  recruiterSnapshot,
} from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/basePath";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import {
  ButtonLink,
  Card,
  Chip,
  Container,
  CtaBand,
  Disclosure,
  Eyebrow,
  MetricCard,
  SectionHeader,
  StatusPill,
} from "@/components/ui";

export const metadata = pageMetadata({
  title: "Recruiter Dossier",
  description: `${profile.name}'s career timeline, measured impact, global team experience, and recruiter FAQ.`,
  path: "/experience",
});

const FAQ_ICONS = [CalendarClock, Plane, Target, Users];
const VISIBLE_BULLETS = 4;

function Deliverables({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-3 space-y-3">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex gap-3 text-[15px] leading-6 text-muted">
          <CircleCheck className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}
const HEADLINE_METRICS = ["<5%", "~40%", "1000+", "~20%"];

export default function ExperiencePage() {
  const metrics = HEADLINE_METRICS.map((value) => impactHighlights.find((s) => s.value === value)!);
  const snapshot = [
    {
      label: "Target roles",
      title: recruiterSnapshot.targetRoles,
      body: "Owning automation strategy and quality gates in CI, and growing the people around me.",
    },
    {
      label: "Base & mobility",
      title: profile.location,
      body: "Open to relocation within India and overseas (visa sponsorship needed for overseas roles).",
      highlight: true,
    },
    {
      label: "Core tech stack",
      title: recruiterSnapshot.coreStack.slice(0, 4).join(", "),
      body: recruiterSnapshot.coreStack.slice(4).join(", ") + ", Claude Code.",
    },
    {
      label: "Academic",
      title: `B.Tech · ${education.gpa}`,
      body: `${education.school}, ${education.start}–${education.end}.`,
    },
  ];

  return (
    <>
      <section className="hero-glow pb-12 pt-12 sm:pt-16">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="accent">Recruiter dossier</Chip>
            <StatusPill>Open to Senior &amp; Lead SDET roles</StatusPill>
          </div>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-[30px] font-bold leading-[38px] tracking-[-0.025em] sm:text-[44px] sm:leading-[52px] sm:tracking-[-0.03em]">
                Recruiter Dossier &amp; Career Timeline
              </h1>
              <p className="mt-4 text-[17px] leading-7 text-muted">
                Experience, measured impact, and global team collaboration across healthcare and commercial
                payments — everything a hiring conversation usually starts with, in one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${profile.email}`} variant="primary" icon={Mail}>
                Email me
              </ButtonLink>
              <ButtonLink href={withBasePath("/resume.pdf")} icon={FileText} mono>
                Resume (PDF)
              </ButtonLink>
              <ButtonLink href={profile.github} icon={GitHubIcon} mono>
                GitHub
              </ButtonLink>
            </div>
          </div>

          <Card className="mt-10 p-6">
            <Eyebrow>Recruiter 60-second snapshot</Eyebrow>
            <dl className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {snapshot.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-surface-2/50 p-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">{item.label}</dt>
                  <dd className="mt-2">
                    <span className="block font-semibold text-foreground">{item.title}</span>
                    <span className={`mt-1 block text-[13px] leading-5 ${item.highlight ? "text-success" : "text-muted"}`}>
                      {item.body}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </Container>
      </section>

      <section aria-labelledby="impact" className="border-t border-border py-12 sm:py-16">
        <Container>
          <SectionHeader
            id="impact"
            eyebrow="observed impact"
            title="Hard Metrics & Defect Mitigation"
            intro="Measured before and after the work, on the roles themselves."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((stat, i) => (
              <MetricCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                context={stat.company}
                tone={i === 0 ? "success" : "accent"}
              />
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="timeline" className="border-t border-border py-12 sm:py-16">
        <Container>
          <SectionHeader
            id="timeline"
            eyebrow="career timeline"
            title="Engineering Work, Role by Role"
            intro="Most recent first. Scope, the deliverables that mattered, and the tools behind them."
          />
          <ol className="mt-8 space-y-6">
            {experience.map((entry, index) => (
              <Card as="li" key={`${entry.company}-${entry.start}`} className="p-6 sm:p-8">
                <article aria-labelledby={`role-${index}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 id={`role-${index}`} className="text-xl font-semibold tracking-[-0.015em]">
                        {entry.role}
                      </h3>
                      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]">
                        <span className="font-semibold text-foreground">{entry.company}</span>
                        <span className="inline-flex items-center gap-1 text-muted">
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                          {entry.location}
                        </span>
                        <span className="font-mono text-[13px] text-accent">
                          {entry.start} – {entry.end}
                        </span>
                      </p>
                    </div>
                    {index === 0 && <StatusPill>Current role</StatusPill>}
                  </div>

                  <div className="mt-6 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
                    <div>
                      <Eyebrow>Scope & mission</Eyebrow>
                      <p className="mt-2 text-[15px] leading-6 text-foreground">{entry.impact}</p>
                      <div className="mt-6">
                        <Eyebrow>Key deliverables</Eyebrow>
                        <Deliverables bullets={entry.bullets.slice(0, VISIBLE_BULLETS)} />
                        {entry.bullets.length > VISIBLE_BULLETS && (
                          <Disclosure summary={`Show ${entry.bullets.length - VISIBLE_BULLETS} more deliverables`}>
                            <Deliverables bullets={entry.bullets.slice(VISIBLE_BULLETS)} />
                          </Disclosure>
                        )}
                      </div>
                    </div>

                    <aside aria-label={`${entry.company} tools and results`} className="space-y-6 rounded-lg border border-border bg-surface-2/50 p-5">
                      <div>
                        <Eyebrow tone="info">Technologies used</Eyebrow>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {entry.stack.map((tool) => (
                            <li key={tool}>
                              <Chip>{tool}</Chip>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <Eyebrow tone="info">Quality signals</Eyebrow>
                        <ul className="mt-3 space-y-3">
                          {entry.stats.map((stat) => (
                            <li key={stat.label}>
                              <span className="font-mono text-lg font-bold text-success">{stat.value}</span>
                              <span className="block text-[13px] leading-5 text-muted">{stat.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </aside>
                  </div>
                </article>
              </Card>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="global" className="border-t border-border py-12 sm:py-16">
        <Container>
          <Card className="p-6 sm:p-8">
            <SectionHeader
              id="global"
              eyebrow="global engineering footprint"
              title="Cross-Timezone Collaboration & Mentorship"
              intro="Distributed teams across Asia, Europe, Australia, and North America, and the people I've helped ramp up along the way."
              aside={
                <Chip tone="success">
                  <Globe className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  {[...new Set(globalTeams.flatMap((t) => t.locations))].length} locations
                </Chip>
              }
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {globalTeams.map((team) => (
                <div key={team.company} className="rounded-lg border border-border bg-surface-2/50 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">{team.company}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {team.locations.map((city) => (
                      <li key={city}>
                        <Chip>{city}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {leadership.slice(0, 3).map((item) => (
                <li key={item.title} className="rounded-lg border border-border p-5">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-5 text-muted">{item.practice}</p>
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </section>

      <section aria-labelledby="faq" className="border-t border-border py-12 sm:py-16">
        <Container>
          <SectionHeader
            id="faq"
            eyebrow="hiring quick-reference"
            title="Interview & Logistics FAQ"
            intro="Direct answers to the questions recruiters usually ask first."
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {recruiterFaq.map((item, i) => {
              const Icon = FAQ_ICONS[i];
              return (
                <Card as="li" key={item.question} className="flex flex-col p-6">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    {item.question}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-6 text-muted">{item.answer}</p>
                  <p className="mt-4 rounded-md bg-surface-2/60 px-3 py-2 font-mono text-[11px] text-accent">
                    {item.meta}
                  </p>
                </Card>
              );
            })}
          </ul>
        </Container>
      </section>

      <CtaBand
        eyebrow="next step"
        title="Let's talk about your team's quality goals."
        body="Reach out directly, or start with the live test suites and case studies to see how I work."
      >
        <ButtonLink href={`mailto:${profile.email}`} variant="primary" icon={Mail}>
          Email Ashish
        </ButtonLink>
        <ButtonLink href={profile.linkedin} icon={LinkedInIcon}>
          LinkedIn
        </ButtonLink>
      </CtaBand>
    </>
  );
}
