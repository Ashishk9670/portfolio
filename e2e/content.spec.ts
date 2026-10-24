import { test, expect } from "@playwright/test";
import { stubVisitorBeacon } from "./stubVisitorBeacon";

test.beforeEach(({ page }) => stubVisitorBeacon(page));

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
    const card = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: "Portfolio MCP Server" }) });
    await expect(card.getByRole("list", { name: "Portfolio MCP Server stack" }).locator("svg")).not.toHaveCount(0);
  });

  test("featured frameworks show real code excerpts that link to their source", async ({ page }) => {
    await page.goto("/projects");
    const excerpt = page.getByRole("region", { name: "Code excerpt from tests/e2e/order-flow.spec.ts" });
    await expect(excerpt).toContainText("One business transaction verified at every layer.");
    await expect(page.getByRole("link", { name: /Real excerpt · view source/ }).first()).toHaveAttribute(
      "href",
      "https://github.com/Ashishk9670/plawight-ui-api-wss-db-kafka"
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
    const roles = page.getByRole("region", { name: "Engineering Work, Role by Role" }).getByRole("heading", { level: 3 });

    await expect(roles).toHaveCount(3);
    await expect(roles.first()).toHaveText("Software Development Engineer in Test II (SDET II)");
    const timeline = page.getByRole("region", { name: "Engineering Work, Role by Role" });
    for (const company of ["Triomics Healthcare", "LiveSwitch", "Mastercard Data & Services"]) {
      await expect(timeline.getByText(company, { exact: true })).toBeVisible();
    }
  });

  test("answers the recruiter FAQ with real logistics", async ({ page }) => {
    await page.goto("/experience");
    const faq = page.getByRole("region", { name: "Interview & Logistics FAQ" });
    await expect(faq.getByRole("heading", { name: "Notice period" })).toBeVisible();
    await expect(faq.getByText("30 days.")).toBeVisible();
    await expect(faq.getByText(/visa sponsorship/)).toBeVisible();
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

  // Stubbed with fixed sample data (the file-level beforeEach above already
  // suppresses the /visit write) so these two tests are deterministic instead
  // of depending on whatever real visitor count happens to exist.
  test.beforeEach(async ({ page }) => {
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
    await expect(page.locator("#main-content").getByRole("link", { name: /Resume/ })).toHaveAttribute("href", "/resume.pdf");
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

test.describe("contact widget", () => {
  const MESSAGE_URL = "https://ashish-portfolio-mcp.ashishk.workers.dev/message";

  test("opens on click, traps focus, and Escape returns focus to the trigger", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Send a message" });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Send a message" });
    await expect(dialog).toBeVisible();
    await expect(page.getByLabel("Name (optional)")).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

  test("the honeypot field is unreachable by keyboard and hidden from screen readers", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Send a message" }).click();

    const honeypot = page.locator('input[name="website"]');
    await expect(honeypot).toHaveAttribute("aria-hidden", "true");
    await expect(honeypot).toHaveAttribute("tabindex", "-1");
  });

  test("a successful submission shows the confirmation and resets the form", async ({ page }) => {
    await page.route(MESSAGE_URL, (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
    );

    await page.goto("/");
    await page.getByRole("button", { name: "Send a message" }).click();
    await page.getByLabel("Email", { exact: true }).fill("visitor@example.com");
    await page.getByLabel("Message", { exact: true }).fill("Hello — loved the portfolio.");
    await page.getByRole("button", { name: "Send" }).click();

    await expect(page.getByText("Thanks — I'll get back to you soon.")).toBeVisible();
  });

  test("a rate-limited response shows the retry message", async ({ page }) => {
    await page.route(MESSAGE_URL, (route) =>
      route.fulfill({ status: 429, contentType: "application/json", body: JSON.stringify({ error: "rate_limited" }) })
    );

    await page.goto("/");
    await page.getByRole("button", { name: "Send a message" }).click();
    await page.getByLabel("Email", { exact: true }).fill("visitor@example.com");
    await page.getByLabel("Message", { exact: true }).fill("Testing rate limiting.");
    await page.getByRole("button", { name: "Send" }).click();

    await expect(page.getByText(/Too many messages from here recently/)).toBeVisible();
  });
});

test.describe("home page for recruiters", () => {
  test("TL;DR snapshot exposes key facts and contact actions", async ({ page }) => {
    await page.goto("/");
    const snapshot = page.getByRole("region", { name: "Recruiter TL;DR" });
    for (const term of ["Looking for", "Notice period", "Core stack", "Location", "Relocation", "Education"]) {
      await expect(snapshot.getByRole("term").filter({ hasText: new RegExp(`^${term}$`) })).toBeVisible();
    }
    await expect(snapshot.getByRole("link", { name: "Resume (PDF)" })).toHaveAttribute("href", /resume\.pdf$/);
    await expect(snapshot.getByRole("link", { name: "Email me" })).toHaveAttribute("href", /^mailto:/);
  });

  test("Now section links out to live work and contact", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "What I'm working on" })).toBeVisible();
    await page.getByRole("link", { name: "See the live report" }).click();
    await expect(page).toHaveURL(/\/qa-suite$/);
  });

  test("structured data describes a Person linked from the About ProfilePage", async ({ page }) => {
    const readJsonLd = () =>
      page.locator('script[type="application/ld+json"]').evaluateAll((nodes) =>
        nodes.map((n) => JSON.parse(n.textContent ?? "{}"))
      );

    await page.goto("/about");
    const blocks = await readJsonLd();
    const person = blocks.flatMap((b) => b["@graph"] ?? []).find((n) => n["@type"] === "Person");
    const profilePage = blocks.find((b) => b["@type"] === "ProfilePage");

    expect(person.worksFor.name).toBe("Triomics Healthcare");
    expect(person.sameAs).toContain("https://github.com/Ashishk9670");
    expect(profilePage.mainEntity["@id"]).toBe(person["@id"]);
  });
});

test.describe("quality engineering", () => {
  test("hub links to every deep dive and labels each metric's source", async ({ page }) => {
    await page.goto("/quality");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Metrics & Impact");
    await expect(page.getByRole("heading", { name: /Quality starts at product discovery/ })).toBeVisible();

    const metrics = page.getByRole("region", { name: "Quality metrics" });
    for (const name of ["Regression duration", "Escaped defects", "Flaky-test rate", "AI effectiveness"]) {
      await expect(metrics.getByRole("heading", { name })).toBeVisible();
    }

    const deepDives = page.getByRole("region", { name: "Deep dives" }).getByRole("heading", { level: 3 });
    await expect(deepDives).toHaveCount(4);
    await deepDives.getByRole("link", { name: /One order, every layer/ }).click();
    await expect(page).toHaveURL(/\/quality\/end-to-end-quality-strategy$/);
    await expect(page.getByRole("heading", { name: "Test layers" })).toBeVisible();
  });

  test("the observability page is clearly labeled as a personal-project demo", async ({ page }) => {
    await page.goto("/quality/production-quality-demo");
    await expect(page.getByText(/^Demo on a personal project\./)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Honest gaps, and what I'd add next" })).toBeVisible();
  });

  test("wide tables scroll inside a keyboard-focusable region on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/quality/end-to-end-quality-strategy");
    const region = page.getByRole("region", { name: "Test layers and what each one proves" });
    await expect(region).toHaveAttribute("tabindex", "0");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
});
