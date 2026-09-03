import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { experience, profile, projects } from "@/lib/data";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);
  const latestRole = experience[0];

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-mono text-sm text-accent">{profile.role}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
          {profile.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{profile.summary}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            View Experience
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
          >
            Contact
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">Currently</h2>
            <Link href="/experience" className="text-sm text-accent hover:underline">
              Full experience →
            </Link>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-background p-6">
            <p className="font-mono text-sm text-muted">
              {latestRole.role} · {latestRole.company} · {latestRole.start} – {latestRole.end}
            </p>
            <p className="mt-2 text-foreground">{latestRole.bullets[0]}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-accent hover:underline">
            All projects →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group rounded-lg border border-border p-5 transition-colors hover:border-accent"
            >
              <h3 className="font-medium group-hover:text-accent">{project.title}</h3>
              <p className="mt-2 text-sm text-muted">{project.tagline}</p>
              <p className="mt-4 font-mono text-xs text-muted">{project.stack.slice(0, 3).join(" · ")}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
