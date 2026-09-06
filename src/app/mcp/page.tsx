import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/BrandIcons";
import { mcpServer } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "MCP Server",
  description: "An MCP server that exposes this portfolio's data as structured tools for any AI client to query.",
  path: "/mcp",
});

export default function McpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">MCP Server</h1>
      <p className="mt-4 text-muted">
        This site exposes its own data — experience, projects, skills, writing — as MCP tools, so
        any MCP-aware AI client can query accurate, structured information about my background
        instead of scraping HTML. See the full write-up on the{" "}
        <Link href="/projects/portfolio-mcp-server" className="text-accent underline underline-offset-2">
          project case study
        </Link>
        .
      </p>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Connect</h2>
        {mcpServer.remoteUrl ? (
          <div className="mt-3 rounded-lg border border-border p-4">
            <p className="font-mono text-sm">
              <span className="text-muted">Streamable HTTP:</span> {mcpServer.remoteUrl}/mcp
            </p>
            <p className="mt-1 font-mono text-sm">
              <span className="text-muted">SSE (legacy):</span> {mcpServer.remoteUrl}/sse
            </p>
          </div>
        ) : (
          <p className="mt-3 rounded-lg border border-dashed border-border p-4 text-sm text-muted">
            Not deployed yet — the code is complete and verified locally (see the repository), but
            the remote endpoint isn&apos;t live. In the meantime, it runs locally via stdio for
            Claude Desktop/Code — instructions in the README.
          </p>
        )}
        <a
          href={mcpServer.repoUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
        >
          <GitHubIcon className="h-4 w-4" aria-hidden="true" />
          Repository
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Tools</h2>
        <div className="mt-3 divide-y divide-border rounded-lg border border-border">
          {mcpServer.tools.map((tool) => (
            <div key={tool.name} className="p-4">
              <p className="font-mono text-sm text-accent">{tool.name}</p>
              <p className="mt-1 text-sm text-muted">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
