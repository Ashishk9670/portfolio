import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { profile } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
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
      </div>
    </div>
  );
}
