import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Accessibility Statement",
  description: "How this site was built and audited against WCAG 2.1 AA.",
  path: "/accessibility",
});

const CHECKLIST = [
  "Semantic HTML5 landmarks (header, nav, main, footer) and a logical heading order on every page.",
  "A visible 'skip to main content' link for keyboard and screen-reader users.",
  "Full keyboard navigation, with a visible focus indicator on every interactive element.",
  "Color contrast checked at 4.5:1 for text and 3:1 for UI elements, in both light and dark themes.",
  "Descriptive link text and accessible labels — no bare 'click here' links or icon-only buttons without a label.",
  "Respects prefers-reduced-motion and prefers-color-scheme rather than overriding them.",
  "Usable at 200% browser zoom with no horizontal scrolling or clipped content.",
];

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Accessibility Statement</h1>
      <p className="mt-4 text-muted">
        Accessibility is part of my job, not a nice-to-have, so this site is held to the same bar I
        audit other software against: WCAG 2.1 Level AA.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">What&apos;s in place</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          {CHECKLIST.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">How it&apos;s verified</h2>
        <p className="mt-3">
          Automated checks (axe-core and Lighthouse) run in CI on every deploy, and I do a manual
          pass with a screen reader (VoiceOver/NVDA) and keyboard-only navigation before shipping
          any new page. Automated tools catch roughly a third of real accessibility issues — the
          manual pass is what actually matters.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Found a problem?</h2>
        <p className="mt-3">
          If something on this site doesn&apos;t work well with assistive technology, I want to know —
          please{" "}
          <a href="/contact" className="text-accent underline underline-offset-2">
            reach out
          </a>
          .
        </p>
      </section>
    </div>
  );
}
