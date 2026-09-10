import {
  certifications,
  education,
  experience,
  profile,
  skills,
} from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/basePath";

export const metadata = pageMetadata({
  title: "Resume",
  description: `${profile.name}'s resume — ${profile.role}.`,
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 print:max-w-none print:px-0 print:py-0">
      <div className="mb-8 flex items-center justify-between print:hidden">
        <p className="text-sm text-muted">
          A printable version of this site&apos;s data — use your browser&apos;s Print → Save as PDF,
          or the download link below.
        </p>
        <a
          href={withBasePath("/resume.pdf")}
          className="ml-4 shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Download PDF
        </a>
      </div>

      <article className="rounded-xl border border-border bg-background p-8 text-foreground print:rounded-none print:border-0 print:bg-white print:p-0 print:text-black sm:p-10">
        <header className="border-b border-border pb-5 print:border-black">
          <h1 className="text-2xl font-semibold tracking-tight">{profile.name}</h1>
          <p className="mt-1 text-muted print:text-black/70">{profile.role}</p>
          <p className="mt-3 font-mono text-xs text-muted print:text-black/70">
            {profile.location} · {profile.email} · {profile.linkedin.replace("https://", "")} ·{" "}
            {profile.github.replace("https://", "")}
          </p>
        </header>

        <section className="mt-6">
          <p className="text-sm leading-relaxed">{profile.summary}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted print:text-black">
            Experience
          </h2>
          <div className="mt-3 space-y-6">
            {experience.map((entry) => (
              <div key={`${entry.company}-${entry.start}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-medium">
                    {entry.role} <span className="text-muted print:text-black/70">— {entry.company}</span>
                  </p>
                  <p className="font-mono text-xs text-muted print:text-black/70">
                    {entry.start} – {entry.end}
                  </p>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {entry.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted print:text-black">
            Skills
          </h2>
          <div className="mt-3 space-y-1.5 text-sm">
            {skills.map((group) => (
              <p key={group.category}>
                <span className="font-medium">{group.category}:</span>{" "}
                <span className="text-muted print:text-black/70">{group.items.join(", ")}</span>
              </p>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted print:text-black">
              Education
            </h2>
            <p className="mt-3 text-sm font-medium">{education.school}</p>
            <p className="text-sm text-muted print:text-black/70">
              {education.degree} · {education.gpa} · {education.start}–{education.end}
            </p>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted print:text-black">
              Certifications
            </h2>
            <ul className="mt-3 space-y-1 text-sm">
              {certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}
