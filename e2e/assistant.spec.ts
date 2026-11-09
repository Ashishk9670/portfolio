import { test, expect, type Page } from "@playwright/test";
import { stubVisitorBeacon } from "./stubVisitorBeacon";

const ASK_URL = "https://ashish-portfolio-mcp.ashishk.workers.dev/ask";

async function mockAsk(page: Page, status = 200) {
  const questions: string[] = [];
  await page.route(ASK_URL, async (route) => {
    questions.push(JSON.parse(route.request().postData() ?? "{}").question);
    if (status !== 200) return route.fulfill({ status, contentType: "application/json", body: '{"error":"x"}' });
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        answer: "Ashish's notice period is 30 days.",
        sources: [{ label: "Interview & logistics FAQ", url: "https://ashishk9670.github.io/portfolio/experience/#faq" }],
      }),
    });
  });
  return questions;
}

test.beforeEach(({ page }) => stubVisitorBeacon(page));

test("a suggested question gets an answer with source links", async ({ page }) => {
  const questions = await mockAsk(page);
  await page.goto("/");
  const assistant = page.getByRole("region", { name: "Ask about Ashish" });
  await assistant.getByRole("button", { name: "What's his notice period, and would he relocate?" }).click();

  await expect(assistant.getByText("Ashish's notice period is 30 days.")).toBeVisible();
  await expect(assistant.getByRole("link", { name: "Interview & logistics FAQ" })).toHaveAttribute(
    "href",
    "https://ashishk9670.github.io/portfolio/experience/#faq"
  );
  expect(questions).toEqual(["What's his notice period, and would he relocate?"]);
});

test("a typed question is sent and the input clears", async ({ page }) => {
  const questions = await mockAsk(page);
  await page.goto("/experience");
  const assistant = page.getByRole("region", { name: "Ask about Ashish" });
  const input = assistant.getByLabel("Ask a question about Ashish");
  await input.fill("Is he open to relocation?");
  await assistant.getByRole("button", { name: "Ask" }).click();

  await expect(assistant.getByText("Is he open to relocation?")).toBeVisible();
  await expect(assistant.getByText("Ashish's notice period is 30 days.")).toBeVisible();
  await expect(input).toHaveValue("");
  expect(questions).toEqual(["Is he open to relocation?"]);
});

test("rate limiting and outages show a friendly message", async ({ page }) => {
  await mockAsk(page, 429);
  await page.goto("/");
  const assistant = page.getByRole("region", { name: "Ask about Ashish" });
  await assistant.getByLabel("Ask a question about Ashish").fill("Hello there");
  await assistant.getByRole("button", { name: "Ask" }).click();
  await expect(assistant.getByText(/That's a lot of questions in a minute/)).toBeVisible();

  await page.unroute(ASK_URL);
  await mockAsk(page, 503);
  await assistant.getByLabel("Ask a question about Ashish").fill("Another question");
  await assistant.getByRole("button", { name: "Ask" }).click();
  await expect(assistant.getByText(/isn't available right now/)).toBeVisible();
});
