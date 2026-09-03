import { test, expect } from "@playwright/test";

test.describe("projects", () => {
  test("listing links through to a case study with all sections", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("link", { name: "Playwright UI & Automation Framework" }).click();

    await expect(page).toHaveURL(/\/projects\/playwright-ai-assisted-framework$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Playwright UI & Automation Framework"
    );
    for (const section of ["Problem", "Approach", "Outcome"]) {
      await expect(page.getByRole("heading", { name: section })).toBeVisible();
    }
    await expect(page.getByRole("link", { name: "Repository" })).toHaveAttribute(
      "href",
      /github\.com/
    );
  });
});

test.describe("experience", () => {
  test("lists all roles in reverse-chronological order", async ({ page }) => {
    await page.goto("/experience");
    const companies = page.getByRole("heading", { level: 2 });

    await expect(companies).toHaveCount(3);
    await expect(page.getByText("Triomics Healthcare")).toBeVisible();
    await expect(page.getByText("LiveSwitch")).toBeVisible();
    await expect(page.getByText("Mastercard Data & Services")).toBeVisible();
  });
});

test.describe("skills", () => {
  test("renders grouped skill categories", async ({ page }) => {
    await page.goto("/skills");
    await expect(page.getByRole("heading", { name: "Test Automation" })).toBeVisible();
    await expect(page.getByText("Playwright", { exact: true })).toBeVisible();
  });
});

test.describe("blog", () => {
  test("listing links through to the WCAG post with rendered MDX content", async ({ page }) => {
    await page.goto("/blog");
    await page
      .getByRole("link", { name: "Building This Site to WCAG 2.1 AA, From Scratch" })
      .click();

    await expect(page).toHaveURL(/\/blog\/wcag-2-1-aa-from-scratch$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("WCAG 2.1 AA");
    await expect(page.getByRole("heading", { name: "Start with the DOM, not the CSS" })).toBeVisible();
  });
});
