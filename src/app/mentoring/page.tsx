import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CircleCheck,
  Compass,
  FileText,
  MessageCircle,
  Route,
  Video,
} from "lucide-react";
import {
  globalTeams,
  leadership,
  mentoring,
  profile,
  recruiterSnapshot,
} from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import {
  ButtonLink,
  Card,
  Chip,
  Container,
  CtaBand,
  Eyebrow,
  SectionHeader,
} from "@/components/ui";
import { Portrait } from "@/components/Portrait";

export const metadata = pageMetadata({
  title: "Career Guidance for QA & SDETs",
  description: `1:1 mentoring, interview prep, resume reviews, and mock interviews for QA engineers and SDETs, with ${profile.name}.`,
  path: "/mentoring",
});

const AUDIENCE_ICONS = [Route, CalendarCheck, Compass];

const STEPS = [
  {
    title: "Start free",
    body: "Book the 15-minute discovery call, or send a question as a priority DM.",
  },
  {
    title: "Pick a focused session",
    body: "Mentorship, career guidance, resume review, interview prep, or a full mock interview.",
  },
  {
    title: "Bring something real",
    body: "Your resume, a job description, a framework you're building, or the interview you're preparing for.",
  },
];

export default function MentoringPage() {
  const cities = [...new Set(globalTeams.flatMap((t) => t.locations))].length;
  const mentoringRecord = leadership.find(
    (l) => l.title === "Mentoring, from day one",
  )!;

  return (
    <>
      <section className="hero-glow pb-12 pt-12 sm:pt-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <Chip tone="accent">Mentoring · career guidance</Chip>
            <h1 className="mt-6 max-w-3xl text-[30px] font-bold leading-[38px] tracking-[-0.025em] sm:text-[44px] sm:leading-[52px] sm:tracking-[-0.03em]">
              Career Guidance for QA &amp; SDETs
            </h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-7 text-muted">
              I&apos;ve spent {recruiterSnapshot.experience} in functional
              testing, API testing, automation, and building reliable QA
              processes — and I&apos;ve onboarded interns and new joiners at
              every company along the way. If you&apos;re working out your next
              step in QA, let&apos;s figure it out together.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={mentoring.url} variant="primary" icon={Video}>
                Book a free discovery call
              </ButtonLink>
              <ButtonLink href="#sessions" icon={ArrowRight}>
                See all sessions
              </ButtonLink>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">
              Sessions are booked and hosted on Topmate
            </p>
          </div>
          <figure className="mx-auto w-48 sm:w-60 lg:mx-0">
            <Portrait
              size={240}
              priority
              className="aspect-square w-full rounded-xl border border-border"
            />
            <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">
              {profile.name} · SDET II
            </figcaption>
          </figure>
        </Container>
      </section>

      <section
        aria-labelledby="audience"
        className="border-t border-border py-12 sm:py-16"
      >
        <Container>
          <SectionHeader
            id="audience"
            eyebrow="who it's for"
            title="Where I can help"
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {mentoring.audiences.map((audience, i) => {
              const Icon = AUDIENCE_ICONS[i];
              return (
                <Card as="li" key={audience.title} className="p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-2">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold">{audience.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-muted">
                    {audience.body}
                  </p>
                </Card>
              );
            })}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
            {mentoring.topics.map((topic) => (
              <li key={topic}>
                <Chip tone="success">{topic}</Chip>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="sessions"
        aria-labelledby="sessions-heading"
        className="scroll-mt-28 border-t border-border py-12 sm:py-16"
      >
        <Container>
          <SectionHeader
            id="sessions-heading"
            eyebrow="sessions"
            title="Ways to work together"
            intro="Start with a free call or a question. Current availability and booking are on Topmate."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mentoring.sessions.map((session) => {
              const Icon =
                session.format === "Priority DM" ? MessageCircle : Video;
              return (
                <Card as="li" key={session.name} className="flex flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    {session.free && <Chip tone="success">Free</Chip>}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{session.name}</h3>
                  <p className="mt-1 flex-1 font-mono text-xs text-subtle">
                    {session.format} · {session.length}
                  </p>
                  <div className="mt-5">
                    <ButtonLink
                      href={mentoring.url}
                      variant={session.free ? "primary" : "ghost"}
                      icon={ArrowRight}
                    >
                      Book on Topmate
                      <span className="sr-only">: {session.name}</span>
                    </ButtonLink>
                  </div>
                </Card>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="why"
        className="border-t border-border py-12 sm:py-16"
      >
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="self-start">
            <SectionHeader
              id="why"
              eyebrow="track record"
              title="Why talk to me"
              intro="The same things I do with new joiners at work, offered to the wider QA community."
            />
          </div>
          <ul className="space-y-3">
            {[
              mentoringRecord.practice,
              "Moved from payments QA at Mastercard to cross-platform automation at LiveSwitch to leading automation at Triomics — career moves I can talk through from experience.",
              `Worked with distributed teams across ${cities} locations in Asia, Europe, Australia, and North America.`,
              "Public frameworks you can learn from directly: a multi-layer Playwright suite, a live e-commerce suite, and an MCP server.",
            ].map((point) => (
              <li
                key={point}
                className="flex gap-3 text-[15px] leading-6 text-muted"
              >
                <CircleCheck
                  className="mt-1 h-4 w-4 shrink-0 text-success"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/projects"
                className="inline-flex min-h-6 items-center gap-1.5 font-mono text-xs text-accent hover:underline"
              >
                Browse the public frameworks
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="how"
        className="border-t border-border py-12 sm:py-16"
      >
        <Container>
          <SectionHeader id="how" eyebrow="how it works" title="Three steps" />
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Card as="li" key={step.title} className="p-6">
                <Eyebrow tone="success">{`Step 0${i + 1}`}</Eyebrow>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-muted">
                  {step.body}
                </p>
              </Card>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        eyebrow="career guidance"
        title="Not sure where to start? Start with the free call."
        body="A short, no-cost conversation to work out what would actually help."
      >
        <ButtonLink href={mentoring.url} variant="primary" icon={Video}>
          Book a free discovery call
        </ButtonLink>
        <ButtonLink href={`mailto:${profile.email}`} icon={FileText}>
          Email instead
        </ButtonLink>
      </CtaBand>
    </>
  );
}
