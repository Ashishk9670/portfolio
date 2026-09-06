import { achievements, certifications, education, milestones, philosophy, profile } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: `About ${profile.name}, ${profile.role}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>

      <div className="mt-8 space-y-5 text-foreground">
        <p>
          I&apos;m an SDET who started out writing test cases and ended up building the systems that
          run them. Over 5+ years I&apos;ve gone from payments QA at Mastercard to owning
          cross-platform automation at LiveSwitch, to now building an automation suite from scratch
          for a healthcare platform at Triomics — a domain where a flaky test isn&apos;t just an
          inconvenience, it&apos;s a risk you can&apos;t ship with.
        </p>
        <p>
          What I actually do day to day is closer to software engineering than most people picture
          when they hear &quot;QA&quot;: I design framework architecture (Page Object Model, reusable
          API clients, CI pipelines), make build-vs-buy calls on tooling, and increasingly, decide
          where AI coding agents genuinely help — first-draft test scaffolding, debugging flaky
          failures — versus where they don&apos;t: test strategy and deciding what actually needs
          coverage still has to be a human call.
        </p>
        <p>
          Accessibility is the other half of what I do. I audit against WCAG 2.1 AA professionally,
          and I built this site to the same bar I hold production software to — semantic markup,
          full keyboard navigation, verified contrast, and a written{" "}
          <a href="/accessibility" className="text-accent underline underline-offset-2">
            accessibility statement
          </a>{" "}
          instead of a footnote claim.
        </p>
        <p>
          Outside of client work, I tinker with infrastructure — Redis, Sentry, and small cloud
          projects — mostly as an excuse to work at a layer I don&apos;t always get to touch in QA
          roles.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-semibold">The Journey So Far</h2>
        <ol className="mt-8 space-y-8 border-l border-border pl-8">
          {milestones.map((milestone) => (
            <li key={milestone.year} className="relative">
              <span
                className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
                aria-hidden="true"
              />
              <p className="font-mono text-sm text-accent">{milestone.year}</p>
              <h3 className="mt-1 font-semibold">{milestone.title}</h3>
              <p className="mt-1 text-sm text-muted">{milestone.blurb}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-semibold">How I Think About Quality</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {philosophy.map((principle) => (
            <div key={principle.title} className="rounded-lg border border-border p-5">
              <h3 className="font-semibold">{principle.title}</h3>
              <p className="mt-2 text-sm text-muted">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Education</h2>
          <p className="mt-2 font-medium">{education.school}</p>
          <p className="text-sm text-muted">
            {education.degree} · {education.gpa} · {education.start}–{education.end}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Certifications</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Achievements</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
