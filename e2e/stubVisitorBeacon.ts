import type { Page } from "@playwright/test";

const VISITOR_BEACON_URL = "https://ashish-portfolio-mcp.ashishk.workers.dev/visit";

// Every test that loads "/" triggers the Home page's real visitor beacon.
// Stubbed everywhere so running the suite (locally or in CI) never writes a
// fake visit into real production data.
export async function stubVisitorBeacon(page: Page): Promise<void> {
  await page.route(VISITOR_BEACON_URL, (route) => route.fulfill({ status: 204 }));
}
