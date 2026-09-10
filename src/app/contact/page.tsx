import { FileDown, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { profile } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/basePath";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      {profile.availableForOpportunities && (
        <div className="mb-6">
          <AvailabilityBadge />
        </div>
      )}
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 text-muted">
        The fastest way to reach me is email. I read everything that comes in.
      </p>

      <div className="mt-10 space-y-4">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-3 rounded-lg border border-border p-5 transition-colors hover:border-accent"
        >
          <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
          <div>
            <p className="font-medium">Email</p>
            <p className="text-sm text-muted">{profile.email}</p>
          </div>
        </a>

        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-3 rounded-lg border border-border p-5 transition-colors hover:border-accent"
        >
          <LinkedInIcon className="h-5 w-5 text-accent" aria-hidden="true" />
          <div>
            <p className="font-medium">LinkedIn</p>
            <p className="text-sm text-muted">linkedin.com/in/as9670</p>
          </div>
        </a>

        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-3 rounded-lg border border-border p-5 transition-colors hover:border-accent"
        >
          <GitHubIcon className="h-5 w-5 text-accent" aria-hidden="true" />
          <div>
            <p className="font-medium">GitHub</p>
            <p className="text-sm text-muted">github.com/Ashishk9670</p>
          </div>
        </a>

        <a
          href={withBasePath("/resume.pdf")}
          className="flex items-center gap-3 rounded-lg border border-dashed border-border p-5 transition-colors hover:border-accent"
        >
          <FileDown className="h-5 w-5 text-accent" aria-hidden="true" />
          <div>
            <p className="font-medium">Resume</p>
            <p className="text-sm text-muted">Download as PDF</p>
          </div>
        </a>
      </div>

      <div className="mt-10 border-t border-border pt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">What I&apos;m looking for</h2>
        <p className="mt-3 text-muted">
          SDET / QA engineering roles centered on test automation architecture, framework design, or
          accessibility-focused engineering — not pure manual QA. If that&apos;s what you&apos;re hiring
          for, say hello.
        </p>
      </div>
    </div>
  );
}
