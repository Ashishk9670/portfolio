import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/BrandIcons";
import { projects } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { StatGrid } from "@/components/StatGrid";
import { FlowDiagram, type FlowStep } from "@/components/FlowDiagram";

type Props = { params: Promise<{ slug: string }> };

// Presentational only — kept out of lib/data.ts since that file is also the
// schema the separate MCP server repo fetches and validates against.
const DIAGRAMS: Record<string, FlowStep[]> = {
  "portfolio-mcp-server": [
    { label: "Site build", sublabel: "lib/data.ts" },
    { label: "JSON export", sublabel: "public/data/*.json" },
    { label: "Cloudflare Worker", sublabel: "fetch + 5min cache" },
    { label: "MCP client", sublabel: "Claude, Cursor…" },
  ],
  "playwright-ai-assisted-framework": [
    { label: "AI first draft", sublabel: "Copilot + MCP" },
    { label: "Framework structure", sublabel: "POM, not one-off scripts" },
    { label: "Manual review", sublabel: "what actually ships" },
    { label: "Committed suite" },
  ],
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.tagline,
    path: `/projects/${project.slug}`,
    ogImage: "/og-image-projects.png",
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const diagram = DIAGRAMS[project.slug];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All projects
      </Link>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-2 text-lg text-muted">{project.tagline}</p>

      {project.placeholder && (
        <p className="mt-4 rounded-md border border-accent/40 bg-surface px-4 py-3 text-sm text-muted">
          This case study is a placeholder — content pending.
        </p>
      )}

      <p className="mt-4 font-mono text-xs text-muted">{project.stack.join(" · ")}</p>

      {project.links && (
        <div className="mt-4 flex gap-4">
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
            >
              <GitHubIcon className="h-4 w-4" aria-hidden="true" />
              Repository
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live
            </a>
          )}
        </div>
      )}

      {/* Results leads — the quantified proof, not buried three sections deep. */}
      <div className="mt-8 rounded-xl border border-accent bg-accent-wash p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-accent">Results</h2>
        <div className="mt-3">
          <StatGrid stats={project.results} />
        </div>
      </div>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Problem</h2>
          <p className="mt-3">{project.problem}</p>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Approach</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {project.approach.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {diagram && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">How it flows</h2>
            <div className="mt-4">
              <FlowDiagram steps={diagram} />
            </div>
          </section>
        )}

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Outcome</h2>
          <p className="mt-3">{project.outcome}</p>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Business Impact</h2>
          <p className="mt-3 border-l-2 border-accent py-1 pl-4 text-muted">{project.businessImpact}</p>
        </section>
      </div>
    </div>
  );
}
