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

test("the Hindi biodata is linked from the English one and back", async ({ page }) => {
  await page.goto("/marriage");
  await page.getByRole("link", { name: "हिंदी में पढ़ें" }).click();
  await expect(page).toHaveURL(/\/marriage\/hi$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("आशीष कुमार");
  await expect(page.getByRole("heading", { name: "मेरे बारे में" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await page.getByRole("link", { name: "Read in English" }).click();
  await expect(page).toHaveURL(/\/marriage$/);
});

test("tapping a travel place opens its photo gallery", async ({ page }) => {
  await page.goto("/marriage");
  await page.getByRole("listitem").getByRole("button", { name: /^Mysuru\b/ }).click();
  const dialog = page.getByRole("dialog", { name: "Mysuru" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Mysore Palace", { exact: true })).toBeVisible();
  await dialog.getByRole("button", { name: "Next photo" }).click();
  await expect(dialog.getByText("Photo 2 of 3")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("map pins open photo galleries by tap and by keyboard", async ({ page }) => {
  await page.goto("/marriage");
  const map = page.getByRole("group", { name: /^Map of places/ });
  await map.scrollIntoViewIfNeeded();

  await page.getByRole("button", { name: "Ajmer · Pushkar · Nasirabad: view photos" }).click();
  await expect(page.getByRole("dialog", { name: "Ajmer · Pushkar · Nasirabad" })).toBeVisible();
  await page.keyboard.press("Escape");

  await page.getByRole("button", { name: "Kolkata: view photos" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Kolkata" })).toBeVisible();
});

test("Get in touch offers email, call, and WhatsApp", async ({ page }) => {
  await page.goto("/marriage");
  await page.getByRole("button", { name: /Get in touch/ }).click();
  const options = page.getByRole("list", { name: "Contact options" });
  await expect(options.getByRole("link", { name: /Email/ })).toHaveAttribute("href", "mailto:ashishk2026k@gmail.com");
  await expect(options.getByRole("link", { name: /Call/ })).toHaveAttribute("href", /^tel:\+91/);
  await expect(options.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", /^https:\/\/wa\.me\/91/);
  await page.keyboard.press("Escape");
  await expect(options).toBeHidden();
  await expect(page.getByRole("link", { name: "Triomics" }).first()).toHaveAttribute("href", "https://triomics.com/");
});
