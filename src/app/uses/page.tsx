import { usesStack } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Uses",
  description: "The tools and stack behind my test automation and AI-assisted engineering work.",
  path: "/uses",
});

export default function UsesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Uses</h1>
      <p className="mt-4 text-muted">
        Not just a tag list — the stack I actually reach for, and why. See{" "}
        <a href="/skills" className="text-accent underline underline-offset-2">
          Skills
        </a>{" "}
        for the full inventory.
      </p>

      <div className="mt-12 space-y-10">
        {usesStack.map((group) => (
          <div key={group.category}>
            <h2 className="text-lg font-semibold">{group.category}</h2>
            <p className="mt-2 text-muted">{group.blurb}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-md border border-border px-3 py-1.5 font-mono text-sm">
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
