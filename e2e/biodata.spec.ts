import { test, expect } from "@playwright/test";
import { stubVisitorBeacon } from "./stubVisitorBeacon";

test.beforeEach(({ page }) => stubVisitorBeacon(page));

test("the biodata page renders as a standalone, unlisted page", async ({ page, request }) => {
  await page.goto("/marriage");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ashish Kumar");
  for (const title of ["About Me", "Professional Background", "Family Background", "Partner Preferences & Outlook on Marriage", "Future & Settlement Plans", "Photos"]) {
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  }
  await expect(page.getByRole("button", { name: "Save as PDF" })).toBeVisible();

  await expect(page.getByRole("navigation", { name: "Primary" })).toHaveCount(0);
  await expect(page.locator("footer nav")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Message Ashish" })).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/marriage");
});

test("the professional site never links to the biodata page", async ({ page }) => {
  for (const path of ["/", "/experience", "/about", "/contact"]) {
    await page.goto(path);
    await expect(page.locator('a[href*="marriage"]')).toHaveCount(0);
  }
});
