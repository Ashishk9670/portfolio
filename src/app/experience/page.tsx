import type { Metadata } from "next";
import { experience, profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Experience",
  description: `${profile.name}'s work experience as an SDET.`,
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Experience</h1>
      <p className="mt-4 text-muted">5+ years designing and owning test automation, from payments to healthcare.</p>

      <ol className="mt-12 space-y-12 border-l border-border pl-8">
        {experience.map((entry) => (
          <li key={`${entry.company}-${entry.start}`} className="relative">
            <span
              className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            <p className="font-mono text-sm text-muted">
              {entry.start} – {entry.end}
            </p>
            <h2 className="mt-1 text-xl font-semibold">{entry.role}</h2>
            <p className="text-accent">
              {entry.company} · {entry.location}
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground">
              {entry.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
