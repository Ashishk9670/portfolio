// Renders the biodata's generated assets with Playwright's Chromium:
//   - link previews (WhatsApp and other apps): public/images/biodata/og.jpg and og-hi.jpg
//   - the Hindi poster: public/images/biodata/poster-hi(.webp|-sm.webp) and
//     public/biodata/ashish-kumar-biodata-hi.pdf
//   - printable A4 PDFs of both pages: public/biodata/ashish-kumar-biodata-a4(-hi).pdf
//   - the "Save to contacts" card: public/biodata/ashish-kumar.vcf
// The A4 PDFs are printed from a running copy of the site, so start one first.
// Usage: BASE_URL=http://localhost:3005 node scripts/render-biodata-assets.mjs
// ONLY=a4,vcard (any of og, poster, a4, vcard) renders just those.
// Decorations on the Hindi poster (Ganesha, lotus) are cropped from the English poster.
import fs from "node:fs";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3005";
const IMG = "public/images/biodata";
const DOCS = "public/biodata";
const ONLY = process.env.ONLY?.split(",");
const want = (step) => !ONLY || ONLY.includes(step);

const dataUri = (file) => `data:image/${file.endsWith(".png") ? "png" : "webp"};base64,${fs.readFileSync(file).toString("base64")}`;
const photo = dataUri(`${IMG}/formal.webp`);
const kurta = dataUri(`${IMG}/kurta.webp`);
const posterEn = dataUri(`${IMG}/poster.webp`);
const qrHi = dataUri(`${IMG}/qr-hi.png`);

const C = { bg: "#FBF7F0", cream: "#FFF8EC", maroon: "#7A1F2B", gold: "#B8862B", ink: "#2B2118", muted: "#5F5044", navy: "#1F2F5C", green: "#1F5E4A" };
const DEVA_SERIF = `"ITF Devanagari", "Devanagari Sangam MN", serif`;
const DEVA_SANS = `"Kohinoor Devanagari", "Devanagari Sangam MN", sans-serif`;

function ogHtml(lang) {
  const t =
    lang === "en"
      ? {
          font: `Georgia, serif`,
          body: `Georgia, serif`,
          eyebrow: "MARRIAGE BIODATA",
          name: "Ashish Kumar",
          lines: ["B.Tech, NIT Warangal", "SDET II at Triomics, Bengaluru", "Gorakhpur, Uttar Pradesh · Siwan, Bihar"],
          cta: "Photos · Journey · Travels · Contact",
        }
      : {
          font: DEVA_SERIF,
          body: DEVA_SANS,
          eyebrow: "विवाह हेतु बायोडाटा",
          name: "आशीष कुमार",
          lines: ["बी.टेक, एनआईटी वारंगल", "बेंगलुरु स्थित ट्रायोमिक्स में SDET II", "गोरखपुर, उत्तर प्रदेश · सिवान, बिहार"],
          cta: "तस्वीरें · जीवन-यात्रा · यात्राएँ · संपर्क",
        };
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;box-sizing:border-box} body{width:1200px;height:630px;display:flex;background:${C.bg};font-family:${t.body};color:${C.ink}}
    .photo{width:520px;height:630px;background:url(${photo}) center 18%/cover}
    .text{flex:1;padding:0 64px;display:flex;flex-direction:column;justify-content:center;border-left:6px solid ${C.gold}}
    .eyebrow{color:${C.maroon};font-weight:700;font-size:${lang === "en" ? 22 : 30}px;letter-spacing:${lang === "en" ? ".22em" : "0"}}
    h1{font-family:${t.font};font-weight:700;color:${C.maroon};font-size:${lang === "en" ? 76 : 80}px;line-height:1.15;margin-top:14px}
    .orn{display:flex;align-items:center;gap:14px;color:${C.gold};margin:22px 0 24px} .orn span{height:2px;width:64px;background:${C.gold}}
    p{font-size:${lang === "en" ? 30 : 32}px;line-height:1.5}
    .cta{margin-top:26px;color:${C.muted};font-size:24px}
  </style></head><body><div class="photo"></div><div class="text">
    <div class="eyebrow">${t.eyebrow}</div><h1>${t.name}</h1>
    <div class="orn"><span></span>✦<span></span></div>
    ${t.lines.map((l) => `<p>${l}</p>`).join("")}
    <div class="cta">${t.cta}</div>
  </div></body></html>`;
}

// Mirrors the English poster's content, in Hindi.
function posterHiHtml() {
  const card = (title, color, body) => `<section class="card"><h3 style="background:${color}">${title}</h3>${body}</section>`;
  const rows = (pairs) => `<dl>${pairs.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>`;
  return `<!doctype html><html lang="hi"><head><meta charset="utf-8"><style>
    *{margin:0;box-sizing:border-box}
    body{width:1200px;font-family:${DEVA_SANS};color:${C.ink};background:radial-gradient(ellipse at 50% 30%,#FFFBF2 0%,#FBF0DC 70%,#F6E6C8 100%);padding-bottom:34px}
    .crop{background-image:url(${posterEn});background-size:1199px auto;background-repeat:no-repeat;margin:0 auto;-webkit-mask-image:radial-gradient(ellipse 50% 50% at 50% 50%,#000 62%,transparent 100%);mask-image:radial-gradient(ellipse 50% 50% at 50% 50%,#000 62%,transparent 100%)}
    .ganesha{width:560px;height:172px;background-position:-320px 0;-webkit-mask-image:radial-gradient(ellipse 52% 75% at 50% 30%,#000 78%,transparent 100%);mask-image:radial-gradient(ellipse 52% 75% at 50% 30%,#000 78%,transparent 100%)}
    .banner{margin:2px auto 0;width:520px;text-align:center;background:linear-gradient(#8E2433,#6A1622);color:#fff;border:4px solid ${C.gold};border-radius:60px;padding:8px 0 14px;font-family:${DEVA_SERIF};font-weight:700;font-size:54px;box-shadow:0 4px 10px rgba(0,0,0,.15)}
    .main{display:grid;grid-template-columns:330px 1fr;gap:20px;padding:26px 22px 0 26px}
    .photo{border-radius:26px;border:5px solid ${C.gold};background:url(${kurta}) 50% 0/cover;box-shadow:0 6px 16px rgba(0,0,0,.18)}
    .head{padding-left:8px}
    .head h1{font-family:${DEVA_SERIF};font-weight:700;color:${C.maroon};font-size:70px;line-height:1.15}
    .head p{color:${C.navy};font-weight:600;font-size:26px;margin-top:6px}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:34px 16px;margin-top:40px}
    .card{background:rgba(255,253,247,.92);border:2px solid #E7C98B;border-radius:22px;padding:46px 16px 16px;position:relative}
    .card h3{position:absolute;top:-20px;left:10px;color:#fff;font-family:${DEVA_SERIF};font-weight:700;font-size:26px;padding:5px 22px 7px;border-radius:24px 24px 24px 6px}
    dl{display:grid;grid-template-columns:auto 1fr;gap:6px 12px;font-size:20px;line-height:1.38}
    dt{color:${C.maroon};font-weight:700;white-space:nowrap} dt::after{content:" :";color:${C.ink}} dd{font-weight:500}
    .para{font-size:20px;line-height:1.55}
    .lotus{width:600px;height:96px;margin-top:14px;background-position:-300px -1196px}
    .qr{margin:6px auto 0;width:900px;background:#fff;border:3px solid ${C.gold};border-radius:22px;display:flex;align-items:center;gap:30px;padding:14px}
    .qr img{width:258px;height:258px;image-rendering:pixelated}
    .qr b{display:block;font-family:${DEVA_SERIF};color:${C.maroon};font-size:40px;line-height:1.3}
    .qr i{display:block;font-style:normal;color:${C.muted};font-size:25px;margin-top:6px}
    .qr span{display:block;color:${C.muted};font-family:Georgia,serif;font-size:21px;margin-top:16px;padding-top:14px;border-top:2px solid ${C.gold};width:max-content}
  </style></head><body>
    <div class="crop ganesha"></div>
    <div class="banner">विवाह बायोडाटा</div>
    <div class="main"><div class="photo"></div><div>
    <div class="head"><h1>आशीष कुमार</h1><p>बी.टेक (एनआईटी वारंगल) &nbsp;|&nbsp; सॉफ़्टवेयर प्रोफ़ेशनल (SDET II)</p></div>
    <div class="grid">
      ${card(
        "व्यक्तिगत विवरण",
        C.maroon,
        rows([
          ["नाम", "आशीष कुमार"],
          ["जन्म तिथि", "26 अक्टूबर 1997"],
          ["जन्म स्थान", "रांची, झारखंड"],
          ["वज़न", "74–78 किग्रा"],
          ["लंबाई", "6 फ़ीट (183 सेमी)"],
          ["राशि", "ज्ञात नहीं"],
          ["धर्म", "हिंदू"],
          ["जाति", "कोइरी (कुशवाहा)"],
        ])
      )}
      ${card(
        "पारिवारिक विवरण",
        C.green,
        rows([
          ["पिता", "श्री कन्हैया भगत (भारतीय सेना एवं DSC से सेवानिवृत्त)"],
          ["माता", "श्रीमती विद्यावती देवी (गृहिणी)"],
          ["बड़े भाई", "भारतीय वायु सेना में कार्यरत; भाभी एलएलबी स्नातक"],
          ["बड़ी बहन", "एमएससी, बी.एड; जीजाजी CRPF (कोबरा कमांडो) में"],
        ])
      )}
      ${card(
        "शिक्षा एवं करियर",
        C.green,
        rows([
          ["शिक्षा", "बी.टेक, एनआईटी वारंगल (तेलंगाना)"],
          ["पेशा", "सॉफ़्टवेयर प्रोफ़ेशनल (SDET II)"],
          ["कार्यस्थल", "बेंगलुरु"],
          ["अनुभव", "5+ वर्ष"],
        ])
      )}
      ${card(
        "मेरे बारे में",
        "#5B2A6E",
        `<p class="para">मैं एक व्यावहारिक, भावनात्मक रूप से जुड़ा हुआ और साहसी व्यक्ति हूँ, जो ईमानदारी, सहानुभूति और खुले संवाद को महत्व देता है। मुझे यात्रा करना, नई जगहें और व्यंजन खोजना, 90 के दशक का संगीत, लंबी बातचीत, सुबह की सैर और प्रियजनों के साथ समय बिताना पसंद है।</p>`
      )}
      ${card(
        "पता एवं संपर्क",
        C.maroon,
        rows([
          ["पारिवारिक पता", "गोरखपुर, उत्तर प्रदेश"],
          ["मूल निवास", "सिवान, बिहार"],
          ["मोबाइल", `<b style="color:${C.navy};font-size:24px">98899 92650</b>`],
        ])
      )}
      ${card(
        "जीवनसाथी से अपेक्षाएँ",
        C.maroon,
        `<p class="para">मुझे एक महत्वाकांक्षी, समझदार, भावनात्मक रूप से परिपक्व और परिवार को महत्व देने वाली जीवनसाथी की तलाश है, जो आर्थिक रूप से आत्मनिर्भर हों, खुले संवाद को महत्व देती हों, और विश्वास, आपसी सम्मान व समझ पर आधारित रिश्ते में विश्वास रखती हों।</p>`
      )}
    </div></div></div>
    <div class="crop lotus"></div>
    <div class="qr"><img src="${qrHi}" alt=""><div>
      <b>पूरा बायोडाटा देखने के लिए स्कैन करें</b>
      <i>तस्वीरें, जीवन-यात्रा, यात्राएँ और संपर्क</i>
      <span>ashishk9670.github.io/portfolio/marriage/hi</span>
    </div></div>
  </body></html>`;
}

// vCard 3.0: CRLF line endings, long lines folded at 75 characters.
async function writeVcard() {
  const data = fs.readFileSync("src/lib/biodata.ts", "utf8");
  const email = data.match(/biodataEmail = "([^"]+)"/)[1];
  const tel = data.match(/biodataPhone = \{[^}]*tel: "([^"]+)"/)[1];
  const photo = await sharp(`${IMG}/formal.webp`).resize(320, 320, { fit: "cover", position: "top" }).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  const fold = (line) => line.match(/.{1,74}/g).join("\r\n ");
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Kumar;Ashish;;;",
    "FN:Ashish Kumar",
    `TEL;TYPE=CELL:${tel}`,
    `EMAIL;TYPE=INTERNET:${email}`,
    "URL:https://ashishk9670.github.io/portfolio/m/",
    `PHOTO;ENCODING=b;TYPE=JPEG:${photo.toString("base64")}`,
    "END:VCARD",
  ];
  fs.writeFileSync(`${DOCS}/ashish-kumar.vcf`, lines.map(fold).join("\r\n") + "\r\n");
}

if (want("vcard")) await writeVcard();

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

  for (const lang of want("og") ? ["en", "hi"] : []) {
    await page.setContent(ogHtml(lang), { waitUntil: "load" });
    const png = await page.screenshot({ type: "png" });
    await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(`${IMG}/${lang === "en" ? "og" : "og-hi"}.jpg`);
  }

  if (want("poster")) {
    await page.setViewportSize({ width: 1200, height: 1600 });
    await page.setContent(posterHiHtml(), { waitUntil: "load" });
    const height = await page.evaluate(() => Math.ceil(document.body.getBoundingClientRect().height));
    await page.setViewportSize({ width: 1200, height });
    console.log(`Hindi poster: 1200x${height} (keep biodataPoster.hi in src/lib/biodata.ts in sync)`);
    const poster = await page.screenshot({ type: "png" });
    await sharp(poster).webp({ quality: 88 }).toFile(`${IMG}/poster-hi.webp`);
    await sharp(poster).resize(720).webp({ quality: 85 }).toFile(`${IMG}/poster-hi-sm.webp`);
    // Like the English poster PDF: one page holding the poster image (a few hundred KB, not MB).
    const jpeg = await sharp(poster).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
    await page.setContent(`<html><body style="margin:0"><img src="data:image/jpeg;base64,${jpeg.toString("base64")}" style="display:block;width:1200px"></body></html>`, { waitUntil: "load" });
    await page.pdf({ path: `${DOCS}/ashish-kumar-biodata-hi.pdf`, width: "1200px", height: `${height}px`, printBackground: true, pageRanges: "1" });
  }

  // Chromium stores WebP photos losslessly in a PDF (1.6 MB for the portrait), but passes
  // JPEGs through as they are, so the printed portrait is swapped for a JPEG.
  const heroJpeg = `data:image/jpeg;base64,${(await sharp(`${IMG}/formal.webp`).resize(600).jpeg({ quality: 82, mozjpeg: true }).toBuffer()).toString("base64")}`;
  for (const [path, file] of !want("a4") ? [] : [
    ["/marriage", "ashish-kumar-biodata-a4.pdf"],
    ["/marriage/hi", "ashish-kumar-biodata-a4-hi.pdf"],
  ]) {
    const doc = await browser.newPage({ viewport: { width: 1000, height: 1400 } });
    await doc.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle" });
    await doc.evaluate(async (jpeg) => {
      for (const img of document.images) {
        img.loading = "eager";
        if (img.getAttribute("src")?.endsWith("/images/biodata/formal.webp")) {
          img.removeAttribute("srcset");
          img.src = jpeg;
        }
      }
      await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => img.addEventListener("load", r, { once: true })))));
    }, heroJpeg);
    await doc.emulateMedia({ media: "print" });
    await doc.pdf({ path: `${DOCS}/${file}`, format: "A4", printBackground: true, margin: { top: "10mm", bottom: "10mm", left: "12mm", right: "12mm" } });
    await doc.close();
  }
} finally {
  await browser.close();
}
console.log(`rendered: ${ONLY?.join(", ") ?? "og, poster, a4, vcard"}`);
