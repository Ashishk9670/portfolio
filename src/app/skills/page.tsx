import type { LucideIcon } from "lucide-react";
import { Bot, Braces, Database, FolderKanban, GitBranch, ListChecks, Sparkles } from "lucide-react";
import { profile, skills } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { SKILL_ICONS } from "@/lib/skillIcons";

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

// Featured tiles get the wider, filled treatment in the bento grid below —
// the two categories most central to the site's actual positioning.
const HERO_CATEGORIES = ["Test Automation", "AI-Assisted Development"];

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

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 [grid-auto-flow:dense]">
        {skills.map((group) => {
          const CategoryIcon = CATEGORY_ICONS[group.category] ?? Braces;
          const isHero = HERO_CATEGORIES.includes(group.category);
          const isWide = isHero || group.items.length >= 8;

          return (
            <div
              key={group.category}
              className={`rounded-xl border p-5 transition-colors ${
                isWide ? "sm:col-span-2" : ""
              } ${
                isHero
                  ? "border-accent bg-accent-wash"
                  : "border-border hover:border-accent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                    isHero ? "bg-background" : "bg-surface"
                  } text-accent`}
                >
                  <CategoryIcon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h2 className={`font-semibold ${isHero ? "text-accent" : ""}`}>{group.category}</h2>
              </div>
              <p className="mt-1 font-mono text-xs text-muted">{group.items.length} skills</p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => {
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
