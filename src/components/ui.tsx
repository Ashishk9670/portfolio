import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import type { CodeSnippet } from "@/lib/snippets";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1120px] px-4 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "success" | "info" }) {
  const color = { accent: "text-accent", success: "text-success", info: "text-info" }[tone];
  return <p className={`font-mono text-[11px] font-semibold uppercase tracking-[0.08em] ${color}`}>{children}</p>;
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  aside,
  level = 2,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  const size =
    level === 1
      ? "text-[30px] leading-[38px] tracking-[-0.025em] sm:text-[44px] sm:leading-[52px] sm:tracking-[-0.03em]"
      : "text-2xl tracking-[-0.02em] sm:text-[32px] sm:leading-10";
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <Eyebrow>{`// ${eyebrow}`}</Eyebrow>
        <Heading id={id} className={`mt-2 font-semibold text-foreground ${size}`}>
          {title}
        </Heading>
        {intro && <p className="mt-3 text-[15px] leading-6 text-muted sm:text-[17px] sm:leading-7">{intro}</p>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  return <Tag className={`min-w-0 rounded-lg border border-border bg-surface ${className}`}>{children}</Tag>;
}

export function Chip({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "accent" }) {
  const styles = {
    neutral: "border-border bg-surface-2/60 text-foreground",
    success: "border-success/30 bg-success-wash text-success",
    accent: "border-accent/30 bg-accent-wash text-accent",
  }[tone];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs ${styles}`}>
      {children}
    </span>
  );
}

export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success-wash px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-success">
      <span className="status-dot" aria-hidden="true" />
      {children}
    </span>
  );
}

const BUTTON_STYLES = {
  primary:
    "bg-accent text-accent-foreground font-semibold hover:brightness-110 shadow-[0_0_24px_-6px_var(--glow)]",
  ghost: "border border-border text-foreground hover:border-border-strong hover:bg-surface",
};

export function ButtonLink({
  href,
  children,
  variant = "ghost",
  icon: IconComponent,
  mono = false,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof BUTTON_STYLES;
  icon?: Icon;
  mono?: boolean;
}) {
  const className = `inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition ${
    mono ? "font-mono text-[13px]" : "font-medium"
  } ${BUTTON_STYLES[variant]}`;
  const content = (
    <>
      {IconComponent && <IconComponent className="h-4 w-4" aria-hidden="true" />}
      {children}
    </>
  );

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  if (href.startsWith("mailto:") || href.endsWith(".pdf")) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export function MetricCard({
  value,
  label,
  context,
  tone = "success",
}: {
  value: string;
  label: string;
  context?: string;
  tone?: "success" | "accent";
}) {
  return (
    <Card as="li" className="flex flex-col p-6">
      <p
        className={`font-mono text-[28px] font-bold leading-9 tracking-[-0.02em] sm:text-[36px] sm:leading-[44px] sm:tracking-[-0.03em] ${
          tone === "success" ? "text-success" : "text-accent"
        }`}
      >
        {value}
      </p>
      <p className="mt-2 flex-1 text-[13px] leading-5 text-muted">{label}</p>
      {context && (
        <p className="mt-4 border-t border-border pt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">
          {context}
        </p>
      )}
    </Card>
  );
}

export function TerminalFrame({
  title,
  label,
  children,
  footer,
}: {
  title: string;
  label?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-code-bg text-code-fg shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f43f5e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]/80" />
          </span>
          <span className="truncate font-mono text-xs text-[#9ca3af]">{title}</span>
        </div>
        {label && <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.06em] text-[#2dd4bf]">{label}</span>}
      </div>
      {children}
      {footer && (
        <div className="border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-[#9ca3af]">{footer}</div>
      )}
    </div>
  );
}

export function CodePanel({ snippet }: { snippet: CodeSnippet }) {
  return (
    <TerminalFrame
      title={snippet.file}
      label={snippet.label}
      footer={
        <a href={snippet.source} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-6 items-center hover:text-[#2dd4bf]">
          Real excerpt · view source →<span className="sr-only">(opens in a new tab)</span>
        </a>
      }
    >
      <pre
        role="region"
        tabIndex={0}
        aria-label={`Code excerpt from ${snippet.file}`}
        className="max-h-80 overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-xs leading-[18px] focus-visible:outline-offset-[-2px] sm:whitespace-pre sm:break-normal"
      >
        <code>{snippet.code}</code>
      </pre>
    </TerminalFrame>
  );
}

export function CtaBand({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: ReactNode;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="cta-heading" className="py-12 sm:py-20">
      <Container>
        <div className="hero-glow relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>{`// ${eyebrow}`}</Eyebrow>
              <h2 id="cta-heading" className="mt-2 text-2xl font-semibold tracking-[-0.02em] sm:text-[32px] sm:leading-10">
                {title}
              </h2>
              <div className="mt-3 text-muted">{body}</div>
            </div>
            <div className="flex flex-wrap gap-3">{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Disclosure({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group mt-3">
      <summary className="inline-flex min-h-6 cursor-pointer list-none items-center gap-1.5 rounded font-mono text-xs text-accent hover:underline [&::-webkit-details-marker]:hidden">
        <ChevronRight className="h-3.5 w-3.5 transition-transform group-open:rotate-90" aria-hidden="true" />
        {summary}
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}
