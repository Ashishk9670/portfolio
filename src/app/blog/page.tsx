import Link from "next/link";
import { Rss } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Writing",
  description: "Notes on test automation, accessibility, and AI-assisted engineering.",
  path: "/blog",
  feed: true,
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
          <p className="mt-4 text-muted">
            Long-form notes on test automation, accessibility, and AI-assisted engineering.
          </p>
        </div>
        <a
          href="/feed.xml"
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <Rss className="h-4 w-4" aria-hidden="true" />
          RSS
        </a>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-border p-6 text-sm text-muted">
          No posts published yet.
        </p>
      ) : (
        <div className="mt-12 space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-lg border border-border p-6 transition-colors hover:border-accent"
            >
              <p className="font-mono text-xs text-muted">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 className="mt-2 text-lg font-semibold group-hover:text-accent">{post.title}</h2>
              <p className="mt-2 text-muted">{post.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
