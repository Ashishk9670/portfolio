import { z } from "zod";

export const QA_SUITE_REPORT_URL =
  "https://ashishk9670.github.io/sauce-demo-playwright-suite";
export const QA_SUITE_REPO_URL =
  "https://github.com/Ashishk9670/sauce-demo-playwright-suite";

const SummarySchema = z.object({
  reportName: z.string(),
  statistic: z.object({
    failed: z.number(),
    broken: z.number(),
    skipped: z.number(),
    passed: z.number(),
    unknown: z.number(),
    total: z.number(),
  }),
  time: z.object({
    start: z.number(),
    stop: z.number(),
    duration: z.number(),
  }),
});

export type QaSuiteCase = {
  uid: string;
  name: string;
  status: "passed" | "failed" | "broken" | "skipped" | "unknown";
  duration: number;
};

const SuiteNodeSchema: z.ZodType<{
  uid: string;
  name: string;
  status?: string;
  time?: { duration: number };
  children?: unknown[];
}> = z.lazy(() =>
  z.object({
    uid: z.string(),
    name: z.string(),
    status: z.string().optional(),
    time: z.object({ duration: z.number() }).optional(),
    children: z.array(SuiteNodeSchema).optional(),
  })
);

const SuitesSchema = z.object({
  uid: z.string(),
  name: z.string(),
  children: z.array(SuiteNodeSchema),
});

function collectLeafCases(
  node: z.infer<typeof SuiteNodeSchema>,
  out: QaSuiteCase[]
): void {
  if (!node.children || node.children.length === 0) {
    if (node.status) {
      out.push({
        uid: node.uid,
        name: node.name,
        status: (node.status as QaSuiteCase["status"]) ?? "unknown",
        duration: node.time?.duration ?? 0,
      });
    }
    return;
  }
  for (const child of node.children) {
    collectLeafCases(child as z.infer<typeof SuiteNodeSchema>, out);
  }
}

export type QaSuiteRun = {
  reportName: string;
  total: number;
  passed: number;
  failed: number;
  broken: number;
  skipped: number;
  durationMs: number;
  cases: QaSuiteCase[];
};

export async function fetchQaSuiteRun(): Promise<QaSuiteRun | null> {
  try {
    const [summaryRes, suitesRes] = await Promise.all([
      fetch(`${QA_SUITE_REPORT_URL}/widgets/summary.json`),
      fetch(`${QA_SUITE_REPORT_URL}/data/suites.json`),
    ]);

    if (!summaryRes.ok || !suitesRes.ok) return null;

    const summary = SummarySchema.parse(await summaryRes.json());
    const suites = SuitesSchema.parse(await suitesRes.json());

    const cases: QaSuiteCase[] = [];
    for (const child of suites.children) {
      collectLeafCases(child, cases);
    }

    return {
      reportName: summary.reportName,
      total: summary.statistic.total,
      passed: summary.statistic.passed,
      failed: summary.statistic.failed,
      broken: summary.statistic.broken,
      skipped: summary.statistic.skipped,
      durationMs: summary.time.duration,
      cases,
    };
  } catch {
    return null;
  }
}
