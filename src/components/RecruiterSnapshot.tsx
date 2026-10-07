import { Download, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/BrandIcons";
import { education, experience, profile, recruiterSnapshot } from "@/lib/data";
import { withBasePath } from "@/lib/basePath";

export function RecruiterSnapshot() {
  const current = experience[0];
  const facts = [
    { term: "Current role", detail: `${current.role} at ${current.company}` },
    { term: "Experience", detail: `${recruiterSnapshot.experience} in UI, API & mobile test automation` },
    { term: "Looking for", detail: `${recruiterSnapshot.targetRoles} roles` },
    { term: "Location", detail: `${profile.location} · ${recruiterSnapshot.relocation}` },
    { term: "Domains", detail: recruiterSnapshot.domains },
    { term: "Leadership", detail: recruiterSnapshot.leadership },
    { term: "Global teams", detail: recruiterSnapshot.globalTeams },
    { term: "Education", detail: `${education.degree}, ${education.school}` },
  ];

  return (
    <section aria-labelledby="for-recruiters" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-wide text-accent">TL;DR</p>
          <h2 id="for-recruiters" className="mt-1 text-xl font-semibold">
            For recruiters &amp; hiring managers
          </h2>

          <div className="mt-6 grid gap-8 lg:grid-cols-[3fr_2fr]">
            <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.term}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{fact.term}</dt>
                  <dd className="mt-1 text-sm text-foreground">{fact.detail}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Highlights</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  {recruiterSnapshot.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Core stack</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {recruiterSnapshot.coreStack.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-md border border-border bg-background px-2 py-1 font-mono text-xs"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
            <a
              href={withBasePath("/resume.pdf")}
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Resume (PDF)
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
