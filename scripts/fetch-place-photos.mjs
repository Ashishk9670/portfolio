// One-off: picks free-licensed (Wikimedia Commons) photos for each travel place on the
// biodata page and writes src/lib/placePhotos.json. Images are hotlinked from
// upload.wikimedia.org with author and license credits; nothing is downloaded.
import fs from "node:fs";

const UA = "portfolio-biodata-build/1.0 (https://ashishk9670.github.io/portfolio)";
const API = "https://en.wikipedia.org/w/api.php";
const PER_PLACE = 4;

// Place label on the page → Wikipedia articles whose photos represent it.
const PLACES = {
  Dalhousie: ["Dalhousie, India", "Dainkund Peak", "Panchpula"],
  Khajjiar: ["Khajjiar", "Khajji Nag Temple", "Kalatop Wildlife Sanctuary"],
  "Temples of Kangra district": ["Jwalamukhi temple, Himachal Pradesh", "Chamunda Devi Temple", "Baijnath Temple"],
  Srinagar: ["Dal Lake", "Shalimar Bagh, Srinagar", "Nishat Bagh", "Srinagar"],
  "Katra (Vaishno Devi)": ["Vaishno Devi Temple", "Katra, Jammu and Kashmir", "Trikuta"],
  Rishikesh: ["Rishikesh", "Lakshman Jhula", "Triveni Ghat", "Ram Jhula"],
  Mussoorie: ["Mussoorie", "Kempty Falls", "Lal Tibba"],
  Ayodhya: ["Ram Mandir", "Ayodhya", "Hanuman Garhi"],
  Jhansi: ["Jhansi Fort", "Jhansi", "Rani Mahal, Jhansi"],
  Orchha: ["Orchha", "Orchha Fort complex", "Jahangir Mahal", "Chaturbhuj Temple"],
  Ajmer: ["Ajmer Sharif Dargah", "Ana Sagar Lake", "Ajmer", "Adhai Din Ka Jhonpra"],
  Pushkar: ["Pushkar", "Pushkar Lake", "Brahma Temple, Pushkar", "Savitri Temple"],
  Mumbai: ["Gateway of India", "Marine Drive, Mumbai", "Chhatrapati Shivaji Terminus", "Bandra–Worli Sea Link"],
  "Elephanta Caves": ["Elephanta Caves", "Trimurti (Elephanta Caves)", "Elephanta Island"],
  Pune: ["Shaniwar Wada", "Aga Khan Palace", "Sinhagad"],
  Bengaluru: ["Vidhana Soudha", "Bangalore Palace", "Lal Bagh", "Cubbon Park"],
  Mysuru: ["Mysore Palace", "Chamundeshwari Temple", "Brindavan Gardens"],
  "Waterfalls near Bengaluru": ["Shivanasamudra Falls"],
  Shravanabelagola: ["Shravanabelagola", "Gommateshwara statue"],
  Udupi: ["Udupi Sri Krishna Matha", "Malpe", "St. Mary's Islands"],
  Mangaluru: ["Mangalore", "Panambur Beach", "Kadri Manjunath Temple"],
  "Temples along Karnataka's west coast": ["Murdeshwar", "Gokarna, Karnataka", "Kollur Mookambika Temple", "Dharmasthala"],
  Chennai: ["Marina Beach", "Kapaleeshwarar Temple", "Fort St. George, India"],
  Mahabalipuram: ["Shore Temple", "Pancha Rathas", "Descent of the Ganges (Mahabalipuram)"],
  Puducherry: ["Promenade Beach", "Puducherry", "Basilica of the Sacred Heart of Jesus, Puducherry"],
  Rameswaram: ["Ramanathaswamy Temple", "Pamban Bridge", "Dhanushkodi"],
  Kanyakumari: ["Vivekananda Rock Memorial", "Kanyakumari", "Thiruvalluvar Statue"],
  Kolkata: ["Victoria Memorial, Kolkata", "Howrah Bridge", "Dakshineswar Kali Temple"],
  Guwahati: ["Kamakhya Temple", "Guwahati", "Umananda Temple"],
};


async function api(params) {
  const url = `${API}?${new URLSearchParams({ format: "json", formatversion: "2", origin: "*", ...params })}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

const strip = (html = "") =>
  html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#039;/g, "'").replace(/\s+/g, " ").trim();

// Only each article's lead image: other images on a page are often unrelated (events, people).
async function filesFor(article) {
  const page = (await api({ action: "query", titles: article, redirects: "1", prop: "pageimages", piprop: "name" })).query.pages[0];
  if (!page || page.missing || !page.pageimage) {
    console.warn(`  no lead image: ${article}`);
    return [];
  }
  return [{ title: `File:${page.pageimage.replace(/_/g, " ")}`, article: page.title }];
}

async function describe(files) {
  if (!files.length) return [];
  const pages = (
    await api({
      action: "query",
      titles: files.map((f) => f.title).join("|"),
      prop: "imageinfo",
      iiprop: "url|size|mime|extmetadata",
      iiurlwidth: "800",
    })
  ).query.pages;
  const byTitle = new Map(pages.map((p) => [p.title, p]));
  return files
    .map((f) => ({ f, p: byTitle.get(f.title) }))
    .filter(({ p }) => p?.imagerepository === "shared" && p.imageinfo?.[0])
    .map(({ f, p }) => ({ f, info: p.imageinfo[0] }))
    .filter(({ info }) => info.mime === "image/jpeg" && info.width >= 800)
    .map(({ f, info }) => {
      const m = info.extmetadata ?? {};
      return {
        src: info.thumburl.split("?")[0],
        width: info.thumbwidth,
        height: info.thumbheight,
        caption: f.article.replace(/, (India|Kolkata|Himachal Pradesh|Jammu and Kashmir|Karnataka|Mumbai|Srinagar|Jhansi|Orchha|Pondicherry)$/, ""),
        author: strip(m.Artist?.value) || "Unknown author",
        license: strip(m.LicenseShortName?.value) || "See source",
        source: info.descriptionurl,
      };
    });
}

const out = {};
for (const [place, articles] of Object.entries(PLACES)) {
  // One list per article, then round-robin so a place isn't four photos of the same building.
  const lists = [];
  for (const article of articles) lists.push(await describe((await filesFor(article)).slice(0, 40)));
  const picked = [];
  for (let i = 0; picked.length < PER_PLACE && i < 40; i++) {
    for (const list of lists) if (list[i] && picked.length < PER_PLACE && !picked.some((p) => p.src === list[i].src)) picked.push(list[i]);
  }
  out[place] = picked;
  console.log(`${place}: ${picked.length} photo(s)`);
}

fs.writeFileSync("src/lib/placePhotos.json", JSON.stringify(out, null, 2) + "\n");
console.log("wrote src/lib/placePhotos.json");
