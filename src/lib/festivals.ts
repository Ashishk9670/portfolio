// Festival greetings shown on the Home page on the day itself (visitor's local date).
// Lunar-calendar festivals move every year: their dates come from officeholidays.com and
// must be extended each year (the data export warns when next year's dates are missing).

export type Region = "india" | "us" | "other";
export type Audience = "everyone" | "india" | "us";

type Rule =
  | { kind: "fixed"; month: number; day: number }
  | { kind: "nth-weekday"; month: number; weekday: number; nth: number }
  | { kind: "dated"; dates: Record<number, string[]> };

export type Festival = {
  id: string;
  title: string;
  message: string;
  audience: Audience;
  accent: string[];
  rule: Rule;
};

const TRICOLOUR = ["#FF9933", "#FFFFFF", "#138808"];
const US_FLAG = ["#B22234", "#FFFFFF", "#3C3B6E"];

export const FESTIVALS: Festival[] = [
  // India — national days (India time zone only)
  { id: "republic-day", title: "Happy Republic Day", message: "Celebrating the Constitution of India.", audience: "india", accent: TRICOLOUR, rule: { kind: "fixed", month: 1, day: 26 } },
  { id: "science-day", title: "Happy National Science Day", message: "Celebrating C.V. Raman's discovery of the Raman effect, and curiosity everywhere.", audience: "india", accent: ["#2563EB", "#14B8A6"], rule: { kind: "fixed", month: 2, day: 28 } },
  { id: "labour-day-in", title: "Happy Labour Day", message: "A thank-you to everyone whose work keeps the world running.", audience: "india", accent: ["#DC2626", "#F59E0B"], rule: { kind: "fixed", month: 5, day: 1 } },
  { id: "independence-day-in", title: "Happy Independence Day", message: "Celebrating India's freedom, today and every day.", audience: "india", accent: TRICOLOUR, rule: { kind: "fixed", month: 8, day: 15 } },
  { id: "engineers-day", title: "Happy Engineers' Day", message: "Honouring Sir M. Visvesvaraya, and every engineer building what's next.", audience: "india", accent: ["#0D9488", "#2563EB"], rule: { kind: "fixed", month: 9, day: 15 } },
  { id: "gandhi-jayanti", title: "Remembering Gandhi Ji", message: "Honouring Mahatma Gandhi on his birth anniversary.", audience: "india", accent: TRICOLOUR, rule: { kind: "fixed", month: 10, day: 2 } },

  // India — festivals (everyone)
  { id: "sankranti", title: "Happy Makar Sankranti & Pongal", message: "Wishing you a joyful harvest season.", audience: "everyone", accent: ["#F59E0B", "#EAB308", "#16A34A"], rule: { kind: "dated", dates: { 2027: ["2027-01-15"] } } },
  { id: "holi", title: "Happy Holi", message: "Wishing you a colourful, joyful Holi.", audience: "everyone", accent: ["#EC4899", "#F59E0B", "#22C55E", "#3B82F6", "#A855F7"], rule: { kind: "dated", dates: { 2027: ["2027-03-22"] } } },
  { id: "eid-al-fitr", title: "Eid Mubarak", message: "Wishing you peace, joy, and blessings.", audience: "everyone", accent: ["#16A34A", "#EAB308"], rule: { kind: "dated", dates: { 2027: ["2027-03-09", "2027-03-10"] } } },
  { id: "raksha-bandhan", title: "Happy Raksha Bandhan", message: "Celebrating the bond between brothers and sisters.", audience: "everyone", accent: ["#F43F5E", "#F59E0B"], rule: { kind: "dated", dates: { 2027: ["2027-08-17"] } } },
  { id: "janmashtami", title: "Happy Janmashtami", message: "Wishing you joy on Krishna Janmashtami.", audience: "everyone", accent: ["#2563EB", "#EAB308"], rule: { kind: "dated", dates: { 2027: ["2027-08-25"] } } },
  { id: "ganesh-chaturthi", title: "Happy Ganesh Chaturthi", message: "Wishing you new beginnings and success.", audience: "everyone", accent: ["#F97316", "#DC2626"], rule: { kind: "dated", dates: { 2027: ["2027-09-04"] } } },
  { id: "dussehra", title: "Happy Dussehra", message: "Celebrating the victory of good over evil.", audience: "everyone", accent: ["#F97316", "#DC2626", "#EAB308"], rule: { kind: "dated", dates: { 2027: ["2027-10-09"] } } },
  { id: "diwali", title: "Happy Diwali", message: "Wishing you light, joy, and a bright year ahead.", audience: "everyone", accent: ["#F59E0B", "#F97316", "#DC2626"], rule: { kind: "dated", dates: { 2026: ["2026-11-08"], 2027: ["2027-10-29"] } } },
  { id: "guru-nanak-jayanti", title: "Happy Gurpurab", message: "Wishing you peace on Guru Nanak Jayanti.", audience: "everyone", accent: ["#F59E0B", "#2563EB"], rule: { kind: "dated", dates: { 2026: ["2026-11-24"], 2027: ["2027-11-13"] } } },

  // USA — national days (US time zones only)
  { id: "mlk-day", title: "Martin Luther King Jr. Day", message: "Honoring Dr. King's legacy of justice and equality.", audience: "us", accent: US_FLAG, rule: { kind: "nth-weekday", month: 1, weekday: 1, nth: 3 } },
  { id: "independence-day-us", title: "Happy Fourth of July", message: "Wishing you a happy Independence Day.", audience: "us", accent: US_FLAG, rule: { kind: "fixed", month: 7, day: 4 } },
  { id: "labor-day-us", title: "Happy Labor Day", message: "A thank-you to everyone whose work keeps things running.", audience: "us", accent: US_FLAG, rule: { kind: "nth-weekday", month: 9, weekday: 1, nth: 1 } },
  { id: "thanksgiving", title: "Happy Thanksgiving", message: "Grateful you stopped by.", audience: "us", accent: ["#B45309", "#F59E0B", "#DC2626"], rule: { kind: "nth-weekday", month: 11, weekday: 4, nth: 4 } },

  // Everyone
  { id: "new-year", title: "Happy New Year", message: "Wishing you a healthy, happy year ahead.", audience: "everyone", accent: ["#0D9488", "#EAB308"], rule: { kind: "fixed", month: 1, day: 1 } },
  { id: "gaad", title: "Global Accessibility Awareness Day", message: "A good day to try your own site with only a keyboard.", audience: "everyone", accent: ["#0D9488", "#2563EB"], rule: { kind: "nth-weekday", month: 5, weekday: 4, nth: 3 } },
  { id: "halloween", title: "Happy Halloween", message: "May your tests be less spooky than your costumes.", audience: "everyone", accent: ["#F97316", "#7C3AED"], rule: { kind: "fixed", month: 10, day: 31 } },
  { id: "idpd", title: "International Day of Persons with Disabilities", message: "Building software that works for everyone.", audience: "everyone", accent: ["#0D9488", "#2563EB"], rule: { kind: "fixed", month: 12, day: 3 } },
  { id: "christmas", title: "Merry Christmas", message: "Wishing you peace and joy this season.", audience: "everyone", accent: ["#DC2626", "#16A34A"], rule: { kind: "fixed", month: 12, day: 25 } },
];

const pad = (n: number) => String(n).padStart(2, "0");
export const isoDate = (year: number, month: number, day: number) => `${year}-${pad(month)}-${pad(day)}`;

// weekday: 0 = Sunday … 6 = Saturday; nth: 1-based occurrence in the month.
function nthWeekday(year: number, month: number, weekday: number, nth: number): string {
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const day = 1 + ((weekday - first + 7) % 7) + (nth - 1) * 7;
  return isoDate(year, month, day);
}

export function datesFor(festival: Festival, year: number): string[] {
  const { rule } = festival;
  if (rule.kind === "fixed") return [isoDate(year, rule.month, rule.day)];
  if (rule.kind === "nth-weekday") return [nthWeekday(year, rule.month, rule.weekday, rule.nth)];
  return rule.dates[year] ?? [];
}

const US_ZONES = /^(America\/(New_York|Chicago|Denver|Phoenix|Los_Angeles|Anchorage|Juneau|Sitka|Yakutat|Nome|Metlakatla|Adak|Boise|Detroit|Menominee|Indiana\/.+|Kentucky\/.+|North_Dakota\/.+)|Pacific\/Honolulu)$/;

export function regionFromTimeZone(timeZone: string | undefined): Region {
  if (!timeZone) return "other";
  if (timeZone === "Asia/Kolkata" || timeZone === "Asia/Calcutta") return "india";
  if (US_ZONES.test(timeZone)) return "us";
  return "other";
}

export function festivalFor(today: string, region: Region): Festival | null {
  const year = Number(today.slice(0, 4));
  return (
    FESTIVALS.find(
      (f) => (f.audience === "everyone" || f.audience === region) && datesFor(f, year).includes(today)
    ) ?? null
  );
}

export function missingLunarDates(year: number): string[] {
  return FESTIVALS.filter((f) => f.rule.kind === "dated" && !(year in f.rule.dates)).map((f) => f.id);
}
