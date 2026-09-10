import { chromium } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.emulateMedia({ media: "print" });
await page.goto(`${BASE_URL}/resume`, { waitUntil: "networkidle" });
await page.pdf({
  path: "public/resume.pdf",
  format: "A4",
  printBackground: true,
  margin: { top: "0.5in", bottom: "0.5in", left: "0.5in", right: "0.5in" },
});
await browser.close();
console.log("wrote public/resume.pdf");
