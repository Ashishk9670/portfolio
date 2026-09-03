import { test, expect } from "@playwright/test";

test.describe("theme toggle", () => {
  test("switches theme and persists across reload", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const toggle = page.getByRole("button", { name: /switch to (dark|light) theme/i });

    const initiallyDark = await html.evaluate((el) => el.classList.contains("dark"));

    await toggle.click();
    await expect(html).toHaveClass(initiallyDark ? /^(?!.*dark).*$/ : /dark/);

    await page.reload();
    await expect(html).toHaveClass(initiallyDark ? /^(?!.*dark).*$/ : /dark/);
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("hamburger menu opens and closes", async ({ page }) => {
    await page.goto("/");

    const openButton = page.getByRole("button", { name: "Open menu" });
    const mobileNav = page.locator("#mobile-nav");

    await expect(mobileNav).toBeHidden();
    await openButton.click();
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "About" })).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(mobileNav).toBeHidden();
  });

  test("selecting a link from the mobile menu navigates and closes it", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator("#mobile-nav").getByRole("link", { name: "Skills" }).click();

    await expect(page).toHaveURL(/\/skills$/);
    await expect(page.locator("#mobile-nav")).toBeHidden();
  });
});
