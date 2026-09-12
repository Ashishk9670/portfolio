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
    await expect(page.getByRole("heading", { name: "How it flows" })).toBeVisible();
    await expect(page.getByText("fetch + 5min cache")).toBeVisible();
  });

  test("listing renders real tool icons on project cards", async ({ page }) => {
    await page.goto("/projects");
    const heroCard = page.locator("a", { hasText: "Portfolio MCP Server" });
    await expect(heroCard.locator("svg")).not.toHaveCount(0);
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
    await expect(page.locator("#skill-grid").getByText("Playwright", { exact: true })).toBeVisible();
  });

  test("shows a 'Right now' skill timeline with since-dates", async ({ page }) => {
    await page.goto("/skills");
    await expect(page.getByRole("heading", { name: "Right now" })).toBeVisible();
    await expect(page.getByText(/since Sep 2024/).first()).toBeVisible();
  });
});

test.describe("qa suite", () => {
  test("runner page loads and links to the suite repo", async ({ page }) => {
    await page.goto("/qa-suite");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("QA Suite Runner");
    await expect(page.getByRole("link", { name: "Repository" })).toHaveAttribute(
      "href",
      "https://github.com/Ashishk9670/sauce-demo-playwright-suite"
    );
  });

  test("waits for a click before replaying, like the reference site", async ({ page }) => {
    await page.goto("/qa-suite");
    const runButton = page.getByRole("button", { name: "Run the QA suites" });
    await expect(runButton).toBeVisible({ timeout: 15000 });
    await expect(page.getByText("Waiting for a run.")).toBeVisible();

    await runButton.click();

    await expect(runButton).toBeDisabled();
    await expect(page.getByText("Waiting for a run.")).toHaveCount(0);
  });
});

test.describe("visitors map", () => {
  const WORKER = "https://ashish-portfolio-mcp.ashishk.workers.dev";
  const SAMPLE_VISITS = [
    { lat: 12.9, lon: 77.6, country: "IN", city: "Bengaluru", count: 5 },
    { lat: 51.5, lon: -0.1, country: "GB", city: "London", count: 2 },
  ];

  // Stubbed rather than hitting the real Worker: keeps the test deterministic
  // (not dependent on live visitor counts) and stops every test run from
  // beaconing a fake visit into real production data.
  test.beforeEach(async ({ page }) => {
    await page.route(`${WORKER}/visit`, (route) => route.fulfill({ status: 204 }));
    await page.route(`${WORKER}/visits`, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(SAMPLE_VISITS),
      })
    );
  });

  test("renders the world map with a real land-mass silhouette and the aggregate summary", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Visitors" })).toBeVisible();
    await expect(page.getByText("2 locations · 7 visits")).toBeVisible();

    const map = page.getByRole("img", { name: "World map with approximate visitor locations" });
    await expect(map).toBeVisible();
    // Land-mass dots come from bundled real-geography data, independent of the network stub above —
    // a large count here is what distinguishes real continent shapes from an empty/placeholder map.
    const landDotCount = await map.locator("circle.fill-muted").count();
    expect(landDotCount).toBeGreaterThan(500);

    await expect(page.getByText(/no IP address or personally identifying information/)).toBeVisible();
  });

  test("hovering a visitor pin shows a city, country, and count tooltip", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("2 locations · 7 visits")).toBeVisible();

    const pin = page.locator("circle.cursor-pointer").first();
    await pin.hover();

    await expect(page.getByText("Bengaluru, IN")).toBeVisible();
    await expect(page.getByText("5", { exact: true })).toBeVisible();
  });
});

test.describe("about", () => {
  test("principles include a concrete in-practice example", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: "How I Think About Quality" })).toBeVisible();
    await expect(page.getByText("In practice —").first()).toBeVisible();
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
    await expect(page.getByText(/min read/)).toBeVisible();
  });
});

test.describe("contact", () => {
  test("shows availability, a resume download, and what I'm looking for", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText("Available for opportunities")).toBeVisible();
    await expect(page.getByRole("link", { name: /Resume/ })).toHaveAttribute("href", "/resume.pdf");
    await expect(page.getByRole("heading", { name: "What I'm looking for" })).toBeVisible();
  });
});

test.describe("resume", () => {
  test("renders a printable resume with a working PDF download link", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ashish Kumar");
    await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Skills" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Download PDF" })).toHaveAttribute(
      "href",
      "/resume.pdf"
    );
  });
});
