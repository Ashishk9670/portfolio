import Link from "next/link";
import { profile, projects } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description: `Test automation projects and case studies by ${profile.name}.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-4 text-muted">
        Case studies on how I structure automation frameworks, not just what tools I used.
      </p>

      <div className="mt-12 space-y-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block rounded-lg border border-border p-6 transition-colors hover:border-accent"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold group-hover:text-accent">{project.title}</h2>
              {project.placeholder && (
                <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                  Draft
                </span>
              )}
            </div>
            <p className="mt-2 text-muted">{project.tagline}</p>
            <p className="mt-4 font-mono text-xs text-muted">{project.stack.join(" · ")}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
