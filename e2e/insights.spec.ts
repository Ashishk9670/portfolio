import { test, expect, type Page } from "@playwright/test";
import { stubVisitorBeacon } from "./stubVisitorBeacon";

const WORKER = "https://ashish-portfolio-mcp.ashishk.workers.dev";

const FIXTURE = {
  rangeDays: 7,
  generatedAt: "2026-10-24T12:00:00.000Z",
  totals: { pageviews: 42, sessions: 17, clicks: 23, avgSeconds: 95 },
  daily: Array.from({ length: 7 }, (_, i) => ({ day: `2026-10-${18 + i}`, pageviews: i * 2, sessions: i })),
  pages: [
    { path: "/", views: 20, sessions: 15, avgSeconds: 70, avgScroll: 60 },
    { path: "/experience", views: 9, sessions: 8, avgSeconds: 140, avgScroll: 85 },
  ],
  entries: [{ path: "/", sessions: 12 }],
  referrers: [
    { source: "LinkedIn", sessions: 9 },
    { source: "Direct", sessions: 5 },
  ],
  clicks: [{ label: "Resume (PDF)", target: "/resume.pdf", path: "/experience", action: "resume", clicks: 6 }],
  keyActions: [{ action: "resume", clicks: 6, sessions: 5 }],
  countries: [{ country: "IN", sessions: 10 }],
  devices: [{ device: "desktop", sessions: 12 }],
  funnel: { sessions: 17, viewedDossier: 8, dossierThenReachedOut: 4, reachedOut: 6 },
};

async function mockStats(page: Page, status = 200) {
  const ranges: string[] = [];
  await page.route(`${WORKER}/stats**`, async (route) => {
    ranges.push(new URL(route.request().url()).searchParams.get("range") ?? "");
    const auth = route.request().headers()["authorization"];
    if (status === 401 || auth !== "Bearer test-token") {
      return route.fulfill({ status: 401, contentType: "application/json", body: '{"error":"unauthorized"}' });
    }
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(FIXTURE) });
  });
  return ranges;
}

test.beforeEach(({ page }) => stubVisitorBeacon(page));

test("no analytics events are sent from local or automated browsers", async ({ page }) => {
  const events: string[] = [];
  page.on("request", (req) => {
    const path = new URL(req.url()).pathname;
    const isWrite = req.method() === "POST" && (path === "/event" || path === "/visit");
    if (req.url().startsWith(WORKER) && isWrite) events.push(req.url());
  });
  await page.goto("/");
  await page.getByRole("link", { name: "Explore case studies" }).click();
  await expect(page).toHaveURL(/\/quality$/);
  await page.goto("/experience");
  await page.waitForTimeout(500);
  expect(events).toEqual([]);
});

test("the dashboard stays locked without a token and rejects a wrong one", async ({ page }) => {
  await mockStats(page);
  await page.goto("/insights");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Site Insights");
  await expect(page.getByText("Page views per day")).toHaveCount(0);

  await page.getByLabel("Dashboard token").fill("wrong-token");
  await page.getByRole("button", { name: "Unlock" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("That token didn't work");
  await expect(page.getByLabel("Dashboard token")).toBeVisible();
});

test("an unlocked dashboard shows totals, the funnel, and per-page detail", async ({ page }) => {
  const ranges = await mockStats(page);
  await page.goto("/insights");
  await page.getByLabel("Dashboard token").fill("test-token");
  await page.getByRole("button", { name: "Unlock" }).click();

  await expect(page.getByText("Page views", { exact: true })).toBeVisible();
  await expect(page.getByText("42", { exact: true })).toBeVisible();
  await expect(page.getByRole("region", { name: "Recruiter funnel" })).toContainText("Viewed Recruiter Dossier");
  await expect(page.getByRole("region", { name: "Where visits come from" })).toContainText("LinkedIn");
  await expect(page.getByRole("region", { name: "Most-clicked links and buttons" })).toContainText("Resume (PDF)");
  await expect(page.getByRole("region", { name: "Page views, visits, average time, and scroll depth per page" })).toContainText(
    "Recruiter Dossier (/experience)"
  );

  await page.getByRole("button", { name: "7 days" }).click();
  await expect(page.getByRole("button", { name: "7 days" })).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => ranges.at(-1)).toBe("7");
  expect(ranges[0]).toBe("30");

  await page.getByRole("button", { name: "Lock" }).click();
  await expect(page.getByLabel("Dashboard token")).toBeVisible();
});

test("the dashboard is hidden from search engines and the sitemap", async ({ page, request }) => {
  await page.goto("/insights");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/insights");
});
