import { GitHubIcon } from "@/components/BrandIcons";
import { QaSuiteRunner } from "@/components/QaSuiteRunner";
import { QA_SUITE_REPO_URL } from "@/lib/qaSuite";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "QA Suite Runner",
  description:
    "A live look at the published Allure report from a real Playwright E2E suite against a public Shopify storefront.",
  path: "/qa-suite",
});

export default function QaSuitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">QA Suite Runner</h1>
      <p className="mt-4 text-muted">
        Every push to{" "}
        <a
          href={QA_SUITE_REPO_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent underline underline-offset-2"
        >
          sauce-demo-playwright-suite
        </a>{" "}
        publishes an Allure report as a GitHub Pages site. This page reads that report at request
        time and replays it, result by result, with the statuses and durations the run actually
        recorded — it&apos;s a consumer of another repository&apos;s build output, not a demo running
        in your browser.
      </p>

      <a
        href={QA_SUITE_REPO_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
      >
        <GitHubIcon className="h-4 w-4" aria-hidden="true" />
        Repository
      </a>

      <div className="mt-8">
        <QaSuiteRunner />
      </div>
    </div>
  );
}
