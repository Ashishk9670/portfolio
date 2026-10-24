import { test, expect } from "@playwright/test";
import { stubVisitorBeacon } from "./stubVisitorBeacon";

test.beforeEach(({ page }) => stubVisitorBeacon(page));

const NAV_PAGES = [
  { href: "/experience", navLabel: "Recruiter Dossier", heading: "Recruiter Dossier" },
  { href: "/projects", navLabel: "Projects & Frameworks", heading: "Projects & Frameworks" },
  { href: "/quality", navLabel: "Metrics & Impact", heading: "Metrics & Impact" },
  { href: "/about", navLabel: "Philosophy & Stack", heading: "Quality Engineering Philosophy" },
];

const FOOTER_PAGES = [
  { href: "/blog", label: "Writing", heading: "Writing" },
  { href: "/skills", label: "Skills timeline", heading: "Skills" },
  { href: "/uses", label: "Uses", heading: "Uses" },
  { href: "/accessibility", label: "Accessibility statement", heading: "Accessibility Statement" },
];

test.describe("primary navigation", () => {
  test("home page shows the hero and CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Quality Engineering Beyond Test Automation.");
    const hero = page.locator("#main-content section").first();
    await expect(hero.getByRole("link", { name: "Explore case studies" })).toHaveAttribute("href", "/quality");
    await expect(hero.getByRole("link", { name: "Resume (PDF)" })).toHaveAttribute("href", "/resume.pdf");
    await expect(hero.getByRole("link", { name: /Real GitHub Actions run/ })).toHaveAttribute("href", /actions\/runs\//);
    await expect(page.getByRole("heading", { name: "By the Numbers" })).toBeVisible();
    await expect(page.getByRole("banner").getByRole("link", { name: "Get in Touch", exact: true })).toHaveAttribute("href", "/contact");
  });

  for (const { href, navLabel, heading } of NAV_PAGES) {
    test(`nav link to ${href} loads the ${heading} page`, async ({ page }) => {
      await page.goto("/");
      const navLink = page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: navLabel, exact: true });
      await navLink.click();
      await expect(page).toHaveURL(new RegExp(`${href}$`));
      await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
      await expect(navLink).toHaveAttribute("aria-current", "page");
    });
  }

  test("Overview nav link returns home and is marked current there", async ({ page }) => {
    await page.goto("/projects");
    const overview = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Overview" });
    await overview.click();
    await expect(page).toHaveURL(/\/$/);
    await expect(overview).toHaveAttribute("aria-current", "page");
  });

  for (const { href, label, heading } of FOOTER_PAGES) {
    test(`footer link to ${href} loads the ${heading} page`, async ({ page }) => {
      await page.goto("/");
      await page.locator("footer").getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${href}$`));
      await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
    });
  }

  test("unknown quality deep-dive slug renders the not-found page", async ({ page }) => {
    const response = await page.goto("/quality/does-not-exist");
    expect(response?.status()).toBe(404);
  });

  test("unknown project slug renders the not-found page", async ({ page }) => {
    const response = await page.goto("/projects/does-not-exist");
    expect(response?.status()).toBe(404);
  });
});

test.describe("footer", () => {
  test("has working contact links with safe external attributes", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");

    await expect(footer.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:ak1545861@gmail.com"
    );

    for (const name of ["GitHub", "LinkedIn"]) {
      const link = footer.getByRole("link", { name });
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noreferrer/);
    }
  });
});
