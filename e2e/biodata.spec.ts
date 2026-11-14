import { test, expect } from "@playwright/test";
import { stubVisitorBeacon } from "./stubVisitorBeacon";

test.beforeEach(({ page }) => stubVisitorBeacon(page));

test("the biodata page renders as a standalone, unlisted page", async ({ page, request }) => {
  await page.goto("/marriage");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ashish Kumar");
  for (const title of ["About Me", "Professional Background", "Family Background", "Partner Preferences & Outlook on Marriage", "Future & Settlement Plans", "Photos"]) {
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  }

  await expect(page.getByRole("navigation", { name: "Primary" })).toHaveCount(0);
  await expect(page.locator("footer nav")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Message Ashish" })).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/marriage");
});

test("the biodata offers a PDF download, the poster, and a QR code", async ({ page, request }) => {
  await page.goto("/marriage");
  const downloads = page.getByRole("link", { name: "Download biodata (PDF)" });
  await expect(downloads).toHaveCount(2);
  for (const link of await downloads.all()) {
    await expect(link).toHaveAttribute("download", "");
    await expect(link).toHaveAttribute("href", /\/biodata\/ashish-kumar-biodata\.pdf$/);
  }
  const pdf = await request.get((await downloads.first().getAttribute("href"))!);
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");

  const poster = page.getByRole("heading", { name: "Biodata at a glance" });
  await poster.scrollIntoViewIfNeeded();
  for (const img of [page.getByRole("img", { name: /^Marriage biodata poster/ }), page.getByRole("img", { name: "QR code linking to this biodata page" })]) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toBeVisible();
    expect(await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }

  const a4 = page.getByRole("link", { name: "Printable A4 (PDF)" });
  await expect(a4).toHaveCount(2);
  await expect(a4.first()).toHaveAttribute("href", /\/biodata\/ashish-kumar-biodata-a4\.pdf$/);

  await page.goto("/marriage/hi");
  const hiDownloads = page.getByRole("link", { name: "बायोडाटा डाउनलोड करें (PDF)" });
  await expect(hiDownloads).toHaveCount(2);
  await expect(hiDownloads.first()).toHaveAttribute("href", /\/biodata\/ashish-kumar-biodata-hi\.pdf$/);
  await expect(page.getByRole("link", { name: "प्रिंट के लिए A4 (PDF)" }).first()).toHaveAttribute("href", /a4-hi\.pdf$/);
  await expect(page.getByRole("img", { name: "इस बायोडाटा पेज का QR कोड" })).toHaveAttribute("src", /qr-hi\.png$/);
  await expect(page.getByRole("img", { name: /^आशीष कुमार का हिंदी विवाह बायोडाटा पोस्टर/ })).toHaveAttribute("src", /poster-hi-sm\.webp$/);
  for (const file of ["ashish-kumar-biodata-hi.pdf", "ashish-kumar-biodata-a4.pdf", "ashish-kumar-biodata-a4-hi.pdf"]) {
    const res = await request.get(`/biodata/${file}`);
    expect(res.status(), file).toBe(200);
  }
});

test("quick facts, family details, and the last-updated date are shown", async ({ page }) => {
  await page.goto("/marriage");
  const facts = page.getByRole("region", { name: "Quick facts" });
  await expect(facts.getByText(/^\d{2} years$/)).toBeVisible();
  for (const text of ["6 ft (183 cm)", "Non-vegetarian", "Hindi, English, Bhojpuri", "Siwan, Bihar"]) {
    await expect(facts.getByText(text)).toBeVisible();
  }
  const family = page.getByRole("region", { name: "Family Background" });
  for (const who of ["Father", "Mother", "Elder brother", "Elder sister"]) {
    await expect(family.getByRole("listitem").filter({ hasText: who })).toHaveCount(1);
  }
  await expect(page.getByText(/^Last updated: [A-Z][a-z]+ \d{4}$/)).toBeVisible();

  await page.goto("/marriage/hi");
  await expect(page.getByRole("region", { name: "संक्षिप्त जानकारी" }).getByText(/^\d{2} वर्ष$/)).toBeVisible();
  await expect(page.getByText(/^अंतिम अपडेट: /)).toBeVisible();
});

test("the short links forward to the biodata without site chrome", async ({ page }) => {
  await page.goto("/m");
  await expect(page).toHaveURL(/\/marriage\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ashish Kumar");
  await page.goto("/m/hi");
  await expect(page).toHaveURL(/\/marriage\/hi\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("आशीष कुमार");
  // A tagged share link keeps its tag through the redirect.
  await page.goto("/m/?utm_source=whatsapp");
  await expect(page).toHaveURL(/\/marriage\/?\?utm_source=whatsapp$/);
  // /mentoring shares the "/m" prefix but keeps its header.
  await page.goto("/mentoring");
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
});

test("partner preferences show as tiles in both languages", async ({ page }) => {
  await page.goto("/marriage");
  const partner = page.getByRole("region", { name: "Partner Preferences & Outlook on Marriage" });
  for (const label of ["Education & work", "After marriage", "Nature", "Outlook"]) {
    await expect(partner.getByRole("listitem").filter({ hasText: label })).toHaveCount(1);
  }
  await page.goto("/marriage/hi");
  const partnerHi = page.getByRole("region", { name: "जीवनसाथी से अपेक्षाएँ और विवाह पर मेरे विचार" });
  await expect(partnerHi.getByRole("listitem").filter({ hasText: "शिक्षा और कार्य" })).toHaveCount(1);
});

test("the biodata can be shared on WhatsApp, copied, and saved as a contact", async ({ page, request, context }) => {
  await page.goto("/marriage");
  const share = page.getByRole("link", { name: "Share on WhatsApp" });
  const href = new URL((await share.getAttribute("href"))!);
  expect(href.hostname).toBe("wa.me");
  const text = href.searchParams.get("text")!;
  expect(text).toContain("Marriage biodata of Ashish Kumar");
  expect(text).toContain("https://ashishk9670.github.io/portfolio/m/?utm_source=whatsapp");

  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy link" }).click();
  await expect(page.getByRole("button", { name: "Link copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("https://ashishk9670.github.io/portfolio/m/");

  const vcard = page.getByRole("link", { name: "Save to contacts" });
  const res = await request.get((await vcard.getAttribute("href"))!);
  expect(res.ok()).toBe(true);
  const card = await res.text();
  expect(card).toMatch(/^BEGIN:VCARD\r\nVERSION:3\.0\r\n/);
  expect(card).toContain("FN:Ashish Kumar");
  expect(card).toMatch(/\r\nTEL;TYPE=CELL:\+91\d{10}\r\n/);
  expect(card).toContain("PHOTO;ENCODING=b;TYPE=JPEG:");
  expect(card.trimEnd().endsWith("END:VCARD")).toBe(true);

  await page.goto("/marriage/hi");
  const hiText = new URL((await page.getByRole("link", { name: "व्हाट्सएप पर भेजें" }).getAttribute("href"))!).searchParams.get("text")!;
  expect(hiText).toContain("/portfolio/m/hi/?utm_source=whatsapp");
  await expect(page.getByRole("link", { name: "फ़ोन में संपर्क सेव करें" })).toBeVisible();
});

test("the professional site never links to the biodata page", async ({ page }) => {
  for (const path of ["/", "/experience", "/about", "/contact"]) {
    await page.goto(path);
    await expect(page.locator('a[href*="marriage"]')).toHaveCount(0);
  }
});

test("the Hindi biodata is linked from the English one and back", async ({ page }) => {
  await page.goto("/marriage");
  await page.getByRole("link", { name: "हिंदी में पढ़ें" }).click();
  await expect(page).toHaveURL(/\/marriage\/hi$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("आशीष कुमार");
  await expect(page.getByRole("heading", { name: "मेरे बारे में" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await page.getByRole("link", { name: "Read in English" }).click();
  await expect(page).toHaveURL(/\/marriage$/);
});

test("tapping a travel place opens its photo gallery", async ({ page }) => {
  await page.goto("/marriage");
  await page.getByRole("listitem").getByRole("button", { name: /^Mysuru\b/ }).click();
  const dialog = page.getByRole("dialog", { name: "Mysuru" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Mysore Palace", { exact: true })).toBeVisible();
  await dialog.getByRole("button", { name: "Next photo" }).click();
  await expect(dialog.getByText("Photo 2 of 3")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("map pins open photo galleries by tap and by keyboard", async ({ page }) => {
  await page.goto("/marriage");
  const map = page.getByRole("group", { name: /^Map of places/ });
  await map.scrollIntoViewIfNeeded();

  await page.getByRole("button", { name: "Ajmer · Pushkar · Nasirabad: view photos" }).click();
  await expect(page.getByRole("dialog", { name: "Ajmer · Pushkar · Nasirabad" })).toBeVisible();
  await page.keyboard.press("Escape");

  await page.getByRole("button", { name: "Kolkata: view photos" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Kolkata" })).toBeVisible();
});

test("Get in touch offers email, call, and WhatsApp", async ({ page }) => {
  await page.goto("/marriage");
  await page.getByRole("button", { name: /Get in touch/ }).click();
  const options = page.getByRole("list", { name: "Contact options" });
  await expect(options.getByRole("link", { name: /Email/ })).toHaveAttribute("href", "mailto:ashishk2026k@gmail.com");
  await expect(options.getByRole("link", { name: /Call/ })).toHaveAttribute("href", /^tel:\+91/);
  await expect(options.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", /^https:\/\/wa\.me\/91/);
  await page.keyboard.press("Escape");
  await expect(options).toBeHidden();
  await expect(page.getByRole("link", { name: "Triomics" }).first()).toHaveAttribute("href", "https://triomics.com/");
});
