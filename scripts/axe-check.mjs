import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const PATHS = [
  "/",
  "/about",
  "/experience",
  "/projects",
  "/projects/playwright-ai-assisted-framework",
  "/projects/portfolio-mcp-server",
  "/skills",
  "/uses",
  "/mcp",
  "/qa-suite",
  "/resume",
  "/blog",
  "/blog/wcag-2-1-aa-from-scratch",
  "/accessibility",
  "/contact",
];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

let hadViolations = false;

for (const path of PATHS) {
  const url = `${BASE_URL}${path}`;
  await page.goto(url, { waitUntil: "networkidle" });
  // Excludes iframe content: the /qa-suite page embeds a third-party Allure
  // report (a separately deployed GitHub Pages site under the same github.io
  // host, so same-origin) whose markup and styling this repo doesn't own.
  const results = await new AxeBuilder({ page }).exclude("iframe").analyze();

  if (results.violations.length === 0) {
    console.log(`✓ ${url} — 0 violations`);
    continue;
  }

  hadViolations = true;
  console.log(`✗ ${url} — ${results.violations.length} violation(s)`);
  for (const violation of results.violations) {
    console.log(`  [${violation.impact}] ${violation.id}: ${violation.help}`);
    for (const node of violation.nodes) {
      console.log(`    - ${node.target.join(", ")}`);
    }
  }
}

await browser.close();

if (hadViolations) {
  console.error("\nAccessibility violations found.");
  process.exit(1);
}

console.log("\nAll pages passed with 0 violations.");
