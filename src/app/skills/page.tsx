import { profile, skills } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Skills",
  description: `Technical skills of ${profile.name}, ${profile.role}.`,
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Skills</h1>
      <p className="mt-4 text-muted">Grouped by area rather than dumped in one list.</p>

      <div className="mt-12 space-y-8">
        {skills.map((group) => (
          <div key={group.category}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">{group.category}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border px-3 py-1.5 font-mono text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
