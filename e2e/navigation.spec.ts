import { test, expect } from "@playwright/test";

const NAV_PAGES = [
  { href: "/about", navLabel: "About", heading: "About" },
  { href: "/experience", navLabel: "Experience", heading: "Experience" },
  { href: "/projects", navLabel: "Projects", heading: "Projects" },
  { href: "/skills", navLabel: "Skills", heading: "Skills" },
  { href: "/blog", navLabel: "Writing", heading: "Writing" },
  { href: "/accessibility", navLabel: "Accessibility", heading: "Accessibility Statement" },
  { href: "/contact", navLabel: "Contact", heading: "Contact" },
];

test.describe("primary navigation", () => {
  test("home page shows the hero and CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "test automation and accessibility systems"
    );
    await expect(page.getByRole("link", { name: "View Experience" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View Projects" })).toBeVisible();
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
