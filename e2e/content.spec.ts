import { test, expect } from "@playwright/test";

test.describe("projects", () => {
  test("listing links through to a case study with all sections", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("link", { name: "Playwright UI & Automation Framework" }).click();

    await expect(page).toHaveURL(/\/projects\/playwright-ai-assisted-framework$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Playwright UI & Automation Framework"
    );
    for (const section of ["Problem", "Approach", "Results", "Outcome", "Business Impact"]) {
      await expect(page.getByRole("heading", { name: section })).toBeVisible();
    }
    await expect(page.getByRole("link", { name: "Repository" })).toHaveAttribute(
      "href",
      /github\.com/
    );
  });

  test("MCP server case study links to the standalone /mcp page and its repo", async ({ page }) => {
    await page.goto("/projects/portfolio-mcp-server");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Portfolio MCP Server");
    await expect(page.getByRole("link", { name: "Repository" })).toHaveAttribute(
      "href",
      "https://github.com/Ashishk9670/ashish-portfolio-mcp"
    );
  });
});

test.describe("mcp page", () => {
  test("lists all 7 tools and links to the repo", async ({ page }) => {
    await page.goto("/mcp");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("MCP Server");
    for (const tool of [
      "get_experience",
      "get_projects",
      "get_skills",
      "get_about",
      "get_contact_info",
      "list_blog_posts",
      "get_blog_post",
    ]) {
      await expect(page.getByText(tool, { exact: true })).toBeVisible();
    }
    await expect(page.getByRole("link", { name: /Repository/ })).toHaveAttribute(
      "href",
      "https://github.com/Ashishk9670/ashish-portfolio-mcp"
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
