import { test, expect, type Browser } from "@playwright/test";
import { stubVisitorBeacon } from "./stubVisitorBeacon";

async function visit(browser: Browser, { date, timezoneId, path = "/" }: { date: string; timezoneId: string; path?: string }) {
  const context = await browser.newContext({ timezoneId });
  const page = await context.newPage();
  await stubVisitorBeacon(page);
  // Noon UTC is the same calendar date in every zone from Hawaii to India.
  await page.clock.setFixedTime(new Date(`${date}T12:00:00Z`));
  await page.goto(path);
  return { page, context };
}

const greeting = (page: import("@playwright/test").Page) => page.getByRole("complementary", { name: "Festival greeting" });

test("shows Diwali on its day to everyone, and remembers when it's dismissed", async ({ browser }) => {
  const { page, context } = await visit(browser, { date: "2027-10-29", timezoneId: "America/New_York" });
  await expect(greeting(page)).toContainText("Happy Diwali");

  await page.getByRole("button", { name: "Dismiss greeting" }).click();
  await expect(greeting(page)).toHaveCount(0);
  await page.reload();
  await page.waitForTimeout(300);
  await expect(greeting(page)).toHaveCount(0);
  await context.close();
});

test("national days only show in their own country's time zone", async ({ browser }) => {
  const india = await visit(browser, { date: "2027-01-26", timezoneId: "Asia/Kolkata" });
  await expect(greeting(india.page)).toContainText("Happy Republic Day");
  await india.context.close();

  const us = await visit(browser, { date: "2027-01-26", timezoneId: "America/Chicago" });
  await us.page.waitForTimeout(300);
  await expect(greeting(us.page)).toHaveCount(0);
  await us.context.close();

  const thanksgivingUs = await visit(browser, { date: "2027-11-25", timezoneId: "America/Los_Angeles" });
  await expect(greeting(thanksgivingUs.page)).toContainText("Happy Thanksgiving");
  await thanksgivingUs.context.close();

  const thanksgivingIndia = await visit(browser, { date: "2027-11-25", timezoneId: "Asia/Kolkata" });
  await thanksgivingIndia.page.waitForTimeout(300);
  await expect(greeting(thanksgivingIndia.page)).toHaveCount(0);
  await thanksgivingIndia.context.close();
});

test("rule-based holidays land on the right dates", async ({ browser }) => {
  for (const [date, timezoneId, title] of [
    ["2027-01-18", "America/New_York", "Martin Luther King Jr. Day"],
    ["2027-09-06", "America/Denver", "Happy Labor Day"],
    ["2027-05-20", "Europe/London", "Global Accessibility Awareness Day"],
  ]) {
    const { page, context } = await visit(browser, { date, timezoneId });
    await expect(greeting(page)).toContainText(title);
    await context.close();
  }
});

test("nothing shows on an ordinary day, or on pages other than Home", async ({ browser }) => {
  const ordinary = await visit(browser, { date: "2027-06-09", timezoneId: "Asia/Kolkata" });
  await ordinary.page.waitForTimeout(300);
  await expect(greeting(ordinary.page)).toHaveCount(0);
  await ordinary.context.close();

  const about = await visit(browser, { date: "2027-12-25", timezoneId: "Asia/Kolkata", path: "/about" });
  await about.page.waitForTimeout(300);
  await expect(greeting(about.page)).toHaveCount(0);
  await about.context.close();
});

test("Escape dismisses the card, and ?festival= previews any greeting", async ({ browser }) => {
  const { page, context } = await visit(browser, { date: "2027-06-09", timezoneId: "Asia/Kolkata", path: "/?festival=holi" });
  await expect(greeting(page)).toContainText("Happy Holi");
  await page.getByRole("button", { name: "Dismiss greeting" }).focus();
  await page.keyboard.press("Escape");
  await expect(greeting(page)).toHaveCount(0);
  await context.close();
});
