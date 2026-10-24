"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FileText, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { withBasePath } from "@/lib/basePath";

const NAV_LINKS = [
  { href: "/", label: "Overview", match: (p: string) => p === "/" },
  { href: "/experience", label: "Recruiter Dossier", match: (p: string) => p.startsWith("/experience") },
  { href: "/projects", label: "Projects & Frameworks", match: (p: string) => p.startsWith("/projects") },
  { href: "/quality", label: "Metrics & Impact", match: (p: string) => p.startsWith("/quality") },
  {
    href: "/about",
    label: "Philosophy & Stack",
    match: (p: string) => p.startsWith("/about") || p.startsWith("/skills"),
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const rawPathname = usePathname();
  const pathname = rawPathname.length > 1 ? rawPathname.replace(/\/$/, "") : rawPathname;

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 print:hidden sm:px-4">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 rounded-xl border border-border bg-surface/85 px-3 py-2 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.25)] backdrop-blur">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-lg pr-2">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 font-mono text-xs font-semibold text-accent"
            aria-hidden="true"
          >
            AK
          </span>
          <span className="leading-tight">
            <span className="block whitespace-nowrap text-sm font-semibold text-foreground">Ashish Kumar</span>
            <span className="block whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
              SDET II
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = link.match(pathname);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[13px] transition-colors ${
                      active
                        ? "bg-accent-wash font-medium text-accent ring-1 ring-accent/30"
                        : "text-muted hover:bg-surface-2 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={withBasePath("/resume.pdf")}
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-3 py-1.5 font-mono text-xs text-foreground transition hover:border-border-strong xl:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            Resume (PDF)
          </a>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-lg bg-accent px-3 py-1.5 text-[13px] font-semibold text-accent-foreground transition hover:brightness-110"
          >
            Get in Touch
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground"
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="mx-auto mt-2 max-w-[1240px] rounded-xl border border-border bg-surface p-2 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] lg:hidden"
        >
          <ul className="flex flex-col gap-1 text-sm">
            {NAV_LINKS.map((link) => {
              const active = link.match(pathname);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2.5 ${
                      active ? "bg-accent-wash font-medium text-accent" : "text-foreground hover:bg-surface-2"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-1 grid grid-cols-2 gap-2 border-t border-border pt-2">
              <a
                href={withBasePath("/resume.pdf")}
                className="rounded-lg border border-border px-3 py-2.5 text-center font-mono text-xs"
              >
                Resume (PDF)
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-accent px-3 py-2.5 text-center text-sm font-semibold text-accent-foreground"
              >
                Get in Touch
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
