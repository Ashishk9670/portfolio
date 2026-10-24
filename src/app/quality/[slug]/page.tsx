import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { qualityStudies, type QualityTable } from "@/lib/quality";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return qualityStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = qualityStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return pageMetadata({ title: study.title, description: study.summary, path: `/quality/${study.slug}` });
}

function Table({ table }: { table: QualityTable }) {
  return (
    <div
      role="region"
      aria-label={table.caption}
      tabIndex={0}
      className="mt-4 overflow-x-auto rounded-lg border border-border focus-visible:outline-2 focus-visible:outline-accent"
    >
      <table className="w-full min-w-[34rem] text-left text-sm">
        <caption className="sr-only">{table.caption}</caption>
        <thead className="bg-surface">
          <tr>
            {table.columns.map((column) => (
              <th key={column} scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]} className="border-t border-border align-top">
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="px-4 py-3 font-medium">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="px-4 py-3 text-muted">
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function QualityStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = qualityStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/quality" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Quality engineering
      </Link>

      <p className="mt-6 font-mono text-sm text-accent">{study.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{study.title}</h1>
      <p className="mt-3 text-lg text-muted">{study.summary}</p>

      {study.notice && (
        <p className="mt-6 flex gap-3 rounded-lg border border-accent bg-accent-wash px-4 py-3 text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <span>{study.notice}</span>
        </p>
      )}

      <div className="mt-10 space-y-12">
        {study.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold">{section.heading}</h2>
            {section.label && (
              <p className="mt-2 inline-block rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted">
                {section.label}
              </p>
            )}
            {section.body?.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-foreground">
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.table && <Table table={section.table} />}
          </section>
        ))}
      </div>

      {study.links && (
        <div className="mt-14 border-t border-border pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Related</h2>
          <ul className="mt-3 space-y-2">
            {study.links.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("http") ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-accent hover:underline"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href={link.href} className="inline-flex items-center gap-1.5 text-accent hover:underline">
                    {link.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
