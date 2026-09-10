import Link from "next/link";
import { profile, projects } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { SKILL_ICONS } from "@/lib/skillIcons";
import { Reveal } from "@/components/Reveal";

export const metadata = pageMetadata({
  title: "Projects",
  description: `Test automation projects and case studies by ${profile.name}.`,
  path: "/projects",
  ogImage: "/og-image-projects.png",
});

// The MCP server gets the featured, wider treatment — it's the project that most
// directly demonstrates the site's own AI-tooling thesis.
const HERO_SLUGS = ["portfolio-mcp-server"];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-4 text-muted">
        Case studies on how I structure automation frameworks, not just what tools I used.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 [grid-auto-flow:dense]">
        {projects.map((project, i) => {
          const isHero = HERO_SLUGS.includes(project.slug);
          const isWide = isHero || project.stack.length >= 5;

          return (
            <Reveal key={project.slug} delay={i * 60} className={isWide ? "sm:col-span-2" : ""}>
              <Link
                href={`/projects/${project.slug}`}
                className={`group block h-full rounded-xl border p-5 transition-colors ${
                  isHero
                    ? "border-accent bg-accent-wash"
                    : "border-border hover:border-accent"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className={`font-semibold group-hover:text-accent ${isHero ? "text-accent" : ""}`}>
                    {project.title}
                  </h2>
                  {project.placeholder && (
                    <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                      Draft
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted">{project.tagline}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((item) => {
                    const skillIcon = SKILL_ICONS[item];
                    return (
                      <li
                        key={item}
                        className={`inline-flex items-center gap-1.5 rounded-full py-1 font-mono text-xs text-foreground ${
                          skillIcon ? "pl-1 pr-2.5" : "px-2.5"
                        } ${isHero ? "bg-background" : "bg-surface"}`}
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
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
