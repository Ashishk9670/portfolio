import type { LucideIcon } from "lucide-react";
import { Bot, Braces, Database, FolderKanban, GitBranch, ListChecks, Sparkles } from "lucide-react";
import { profile, skills } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Skills",
  description: `Technical skills of ${profile.name}, ${profile.role}.`,
  path: "/skills",
});

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Languages: Braces,
  "Test Automation": Bot,
  "Testing Disciplines": ListChecks,
  "CI/CD & Cloud": GitBranch,
  "Data & Observability": Database,
  "Version Control & PM": FolderKanban,
  "AI-Assisted Development": Sparkles,
};

export default function SkillsPage() {
  const totalSkills = skills.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Skills</h1>
      <p className="mt-4 text-muted">
        Grouped by area rather than dumped in one list —{" "}
        <span className="font-mono text-sm">
          {skills.length} categories · {totalSkills} skills
        </span>
        .
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => {
          const Icon = CATEGORY_ICONS[group.category] ?? Braces;
          return (
            <div
              key={group.category}
              className="rounded-lg border border-border p-5 transition-colors hover:border-accent"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface text-accent">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h2 className="font-semibold">{group.category}</h2>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-surface px-2.5 py-1 font-mono text-xs text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
