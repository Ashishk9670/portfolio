import Link from "next/link";
import { CalendarCheck, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { Container } from "@/components/ui";
import { mentoring, profile } from "@/lib/data";
import { withBasePath } from "@/lib/basePath";

const SECTIONS = [
  {
    title: "Navigate",
    links: [
      { href: "/", label: "Overview" },
      { href: "/experience", label: "Recruiter Dossier" },
      { href: "/projects", label: "Projects & Frameworks" },
      { href: "/quality", label: "Metrics & Impact" },
      { href: "/about", label: "Philosophy & Stack" },
    ],
  },
  {
    title: "More",
    links: [
      { href: "/blog", label: "Writing" },
      { href: "/mentoring", label: "Mentoring" },
      { href: "/skills", label: "Skills timeline" },
      { href: "/uses", label: "Uses" },
      { href: "/mcp", label: "MCP server" },
      { href: "/qa-suite", label: "Live QA suite" },
      { href: "/accessibility", label: "Accessibility statement" },
    ],
  },
];

const CI_BADGE = "https://github.com/Ashishk9670/portfolio/actions/workflows/ci.yml/badge.svg";
const CI_RUNS = "https://github.com/Ashishk9670/portfolio/actions/workflows/ci.yml";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-surface print:hidden">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <p className="font-semibold text-foreground">{profile.name}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
            SDET II · Quality Engineering
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Built with Next.js. Every push runs lint, a type-checked build, an axe-core audit, and a Lighthouse
            accessibility gate; the Playwright e2e suite runs daily.
          </p>
          <a href={CI_RUNS} target="_blank" rel="noreferrer noopener" className="mt-4 inline-flex min-h-6 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- live status SVG served by GitHub */}
            <img src={CI_BADGE} alt="CI workflow status for this site" height={20} className="h-5 w-auto" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        {SECTIONS.map((section) => (
          <nav key={section.title} aria-label={`Footer: ${section.title}`}>
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">
              {section.title}
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-6 items-center text-muted transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">Profiles</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-6 items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-6 items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={mentoring.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-6 items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Topmate (mentoring)
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-6 items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email
              </a>
            </li>
            <li>
              <a href={withBasePath("/resume.pdf")} className="inline-flex min-h-6 items-center text-muted transition-colors hover:text-accent">
                Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 font-mono text-[11px] text-subtle sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <p>Next.js · Tailwind CSS · GitHub Pages</p>
        </Container>
      </div>
    </footer>
  );
}
