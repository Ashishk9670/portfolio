// Personal biodata for the unlisted /marriage pages (English and Hindi). Kept out of the
// MCP export, the assistant's context, the sitemap, and analytics.

export type Lang = "en" | "hi";

type Text = Record<Lang, string>;

export const biodataPhotos = {
  hero: {
    src: "/images/biodata/formal",
    w: 900,
    h: 1200,
    alt: { en: "Ashish in a dark bandhgala suit, smiling, in a lit courtyard", hi: "गहरे रंग के बंदगला सूट में मुस्कुराते हुए आशीष" },
  },
  gallery: [
    { src: "/images/biodata/kurta", w: 904, h: 1200, alt: { en: "Ashish in an olive kurta and white churidar at a festive decorated doorway", hi: "सजे हुए द्वार पर हरे कुर्ते और सफ़ेद चूड़ीदार में आशीष" } },
    { src: "/images/biodata/casual", w: 900, h: 1200, alt: { en: "Ashish in a light blue shirt and beige trousers, smiling", hi: "हल्की नीली शर्ट और बेज पैंट में मुस्कुराते हुए आशीष" } },
    { src: "/images/biodata/garden", w: 1200, h: 1200, alt: { en: "Ashish sitting on a stone bench in a garden lit with warm lights", hi: "रोशनी से सजे बगीचे में पत्थर की बेंच पर बैठे आशीष" } },
    { src: "/images/biodata/sunset", w: 1200, h: 800, alt: { en: "Ashish at a seaside at sunset, with palm trees and boats behind him", hi: "सूर्यास्त के समय समुद्र किनारे आशीष, पीछे ताड़ के पेड़ और नावें" } },
  ],
};

export type TravelPlace = { key: string; label: Text; lat: number; lon: number };

// `key` matches src/lib/placePhotos.json; coordinates are approximate, for the map.
export const biodataTravels: { region: Text; places: TravelPlace[] }[] = [
  {
    region: { en: "North", hi: "उत्तर" },
    places: [
      { key: "Dalhousie", label: { en: "Dalhousie", hi: "डलहौज़ी" }, lat: 32.54, lon: 75.97 },
      { key: "Khajjiar", label: { en: "Khajjiar", hi: "खज्जियार" }, lat: 32.55, lon: 76.06 },
      { key: "Temples of Kangra district", label: { en: "Temples of Kangra district", hi: "कांगड़ा ज़िले के मंदिर" }, lat: 32.1, lon: 76.27 },
      { key: "Srinagar", label: { en: "Srinagar", hi: "श्रीनगर" }, lat: 34.08, lon: 74.8 },
      { key: "Katra (Vaishno Devi)", label: { en: "Katra (Vaishno Devi)", hi: "कटरा (वैष्णो देवी)" }, lat: 32.99, lon: 74.93 },
      { key: "Rishikesh", label: { en: "Rishikesh", hi: "ऋषिकेश" }, lat: 30.09, lon: 78.27 },
      { key: "Mussoorie", label: { en: "Mussoorie", hi: "मसूरी" }, lat: 30.46, lon: 78.07 },
      { key: "Ayodhya", label: { en: "Ayodhya", hi: "अयोध्या" }, lat: 26.8, lon: 82.2 },
      { key: "Jhansi", label: { en: "Jhansi", hi: "झांसी" }, lat: 25.45, lon: 78.57 },
      { key: "Orchha", label: { en: "Orchha", hi: "ओरछा" }, lat: 25.35, lon: 78.64 },
    ],
  },
  {
    region: { en: "West", hi: "पश्चिम" },
    places: [
      { key: "Ajmer", label: { en: "Ajmer", hi: "अजमेर" }, lat: 26.45, lon: 74.64 },
      { key: "Pushkar", label: { en: "Pushkar", hi: "पुष्कर" }, lat: 26.49, lon: 74.55 },
      { key: "Mumbai", label: { en: "Mumbai", hi: "मुंबई" }, lat: 18.94, lon: 72.83 },
      { key: "Elephanta Caves", label: { en: "Elephanta Caves", hi: "एलिफेंटा गुफाएँ" }, lat: 18.96, lon: 72.93 },
      { key: "Pune", label: { en: "Pune", hi: "पुणे" }, lat: 18.52, lon: 73.86 },
    ],
  },
  {
    region: { en: "South", hi: "दक्षिण" },
    places: [
      { key: "Bengaluru", label: { en: "Bengaluru", hi: "बेंगलुरु" }, lat: 12.97, lon: 77.59 },
      { key: "Mysuru", label: { en: "Mysuru", hi: "मैसूरु" }, lat: 12.3, lon: 76.64 },
      { key: "Waterfalls near Bengaluru", label: { en: "Waterfalls near Bengaluru", hi: "बेंगलुरु के पास के झरने" }, lat: 12.27, lon: 77.17 },
      { key: "Shravanabelagola", label: { en: "Shravanabelagola", hi: "श्रवणबेलगोला" }, lat: 12.86, lon: 76.49 },
      { key: "Udupi", label: { en: "Udupi", hi: "उडुपी" }, lat: 13.34, lon: 74.75 },
      { key: "Mangaluru", label: { en: "Mangaluru", hi: "मंगलुरु" }, lat: 12.91, lon: 74.86 },
      { key: "Temples along Karnataka's west coast", label: { en: "Temples along Karnataka's west coast", hi: "कर्नाटक के पश्चिमी तट के मंदिर" }, lat: 14.09, lon: 74.48 },
      { key: "Chennai", label: { en: "Chennai", hi: "चेन्नई" }, lat: 13.08, lon: 80.27 },
      { key: "Mahabalipuram", label: { en: "Mahabalipuram", hi: "महाबलीपुरम" }, lat: 12.62, lon: 80.19 },
      { key: "Puducherry", label: { en: "Puducherry", hi: "पुडुचेरी" }, lat: 11.94, lon: 79.81 },
      { key: "Rameswaram", label: { en: "Rameswaram", hi: "रामेश्वरम" }, lat: 9.29, lon: 79.31 },
      { key: "Kanyakumari", label: { en: "Kanyakumari", hi: "कन्याकुमारी" }, lat: 8.08, lon: 77.54 },
    ],
  },
  {
    region: { en: "East & Northeast", hi: "पूर्व और पूर्वोत्तर" },
    places: [
      { key: "Kolkata", label: { en: "Kolkata", hi: "कोलकाता" }, lat: 22.57, lon: 88.36 },
      { key: "Guwahati", label: { en: "Guwahati", hi: "गुवाहाटी" }, lat: 26.14, lon: 91.74 },
    ],
  },
];

// Cities from the timeline, for the map's "lived" markers.
export const biodataLived: { label: Text; lat: number; lon: number }[] = [
  { label: { en: "Ranchi", hi: "रांची" }, lat: 23.34, lon: 85.31 },
  { label: { en: "Siwan", hi: "सिवान" }, lat: 26.22, lon: 84.36 },
  { label: { en: "Nasirabad", hi: "नसीराबाद" }, lat: 26.3, lon: 74.73 },
  { label: { en: "Palampur", hi: "पालमपुर" }, lat: 32.11, lon: 76.54 },
  { label: { en: "Jhansi", hi: "झांसी" }, lat: 25.45, lon: 78.57 },
  { label: { en: "Siliguri", hi: "सिलीगुड़ी" }, lat: 26.73, lon: 88.4 },
  { label: { en: "Gorakhpur", hi: "गोरखपुर" }, lat: 26.76, lon: 83.37 },
  { label: { en: "Warangal", hi: "वारंगल" }, lat: 17.98, lon: 79.59 },
  { label: { en: "Pune", hi: "पुणे" }, lat: 18.52, lon: 73.86 },
  { label: { en: "Bengaluru", hi: "बेंगलुरु" }, lat: 12.97, lon: 77.59 },
];

// Only things the owner's own text mentions.
export const biodataEnjoy: { icon: "mountain" | "compass" | "utensils" | "music" | "messages" | "sunrise" | "sparkles" | "heart"; label: Text }[] = [
  { icon: "mountain", label: { en: "Travelling to the mountains", hi: "पहाड़ों की यात्रा" } },
  { icon: "compass", label: { en: "Exploring new places", hi: "नई जगहें घूमना" } },
  { icon: "utensils", label: { en: "Discovering different cuisines", hi: "अलग-अलग व्यंजनों का स्वाद" } },
  { icon: "music", label: { en: "90s music", hi: "90 के दशक का संगीत" } },
  { icon: "messages", label: { en: "Long conversations", hi: "लंबी बातचीत" } },
  { icon: "sunrise", label: { en: "Morning walks", hi: "सुबह की सैर" } },
  { icon: "sparkles", label: { en: "Spontaneous plans", hi: "अचानक बनी योजनाएँ" } },
  { icon: "heart", label: { en: "Quality time with loved ones", hi: "प्रियजनों के साथ समय" } },
];

// Shown on Ashish's own contact card. Public in the repo.
// Posters are images; the A4 PDFs are rendered from the page's print layout by
// scripts/render-biodata-assets.mjs. QR codes open the page in the same language.
export const biodataPoster: Record<Lang, { src: string; w: number; h: number; pdf: string; a4: string; qr: string }> = {
  en: { src: "/images/biodata/poster", w: 1199, h: 1642, pdf: "/biodata/ashish-kumar-biodata.pdf", a4: "/biodata/ashish-kumar-biodata-a4.pdf", qr: "/images/biodata/qr.png" },
  hi: { src: "/images/biodata/poster-hi", w: 1200, h: 1820, pdf: "/biodata/ashish-kumar-biodata-hi.pdf", a4: "/biodata/ashish-kumar-biodata-a4-hi.pdf", qr: "/images/biodata/qr-hi.png" },
};

// Used to show the current age; the poster already states the date of birth.
export const biodataBirthDate = "1997-10-26";
// Bump when the content changes; shown in the footer.
export const biodataUpdated = "2026-11-15";

export type QuickFactIcon = "cake" | "ruler" | "utensils" | "languages" | "home" | "pin";

export const biodataEmail = "ashishk2026k@gmail.com";
// A contact card (vCard) with name, phone, email, and photo; made by scripts/render-biodata-assets.mjs.
export const biodataVcard = "/biodata/ashish-kumar.vcf";
// Short links used when sharing; /m forwards to the biodata in the same language.
export const biodataShortLink: Record<Lang, string> = { en: "/m/", hi: "/m/hi/" };
export const biodataPhone = { display: "+91 98899 92650", tel: "+919889992650" };

// Extra contact routes; each renders only when filled in. Numbers become public in the repo.
export const biodataContacts: { label: Text; phone?: string; whatsapp?: string; email?: string }[] = [];

const en = {
  lang: "en" as Lang,
  name: "Ashish Kumar",
  ui: {
    eyebrow: "Marriage Biodata",
    getInTouch: "Get in touch",
    contactVia: "Contact options",
    savePdf: "Download biodata (PDF)",
    printPdf: "Printable A4 (PDF)",
    phone: "Phone",
    quickTitle: "Quick facts",
    age: "{n} years",
    updated: "Last updated: {date}",
    posterTitle: "Biodata at a glance",
    posterAlt: "Marriage biodata poster of Ashish Kumar, with a QR code linking to this page",
    posterOpen: "Open full size",
    qrTitle: "Share this biodata",
    qrText: "Scan the code to open this page on a phone.",
    qrAlt: "QR code linking to this biodata page",
    switchLabel: "हिंदी में पढ़ें",
    switchHref: "/marriage/hi",
    journeyTitle: "My Journey",
    journeyIntro: "Growing up in an Army family meant a new city every few years.",
    enjoyTitle: "Things I Enjoy",
    travelsTitle: "Travels & Adventures",
    travelsIntro: "Mountains, temples, coastlines, and good food — some of the places I've been so far.",
    tapHint: "Tap a place to see photos.",
    mapTitle: "Places on the map",
    mapLived: "Lived",
    mapVisited: "Visited",
    mapNote: "Map of places I have lived in and visited (approximate locations). Tap a gold pin for photos.",
    doneTitle: "Adventures so far",
    wishTitle: "Looking forward to",
    photosTitle: "Photos",
    contactTitle: "Contact",
    call: "Call",
    whatsapp: "WhatsApp",
    email: "Email",
    thanks: "Thank you for taking the time to read this.",
    shareWhatsapp: "Share on WhatsApp",
    shareText: "Marriage biodata of Ashish Kumar: B.Tech, NIT Warangal; SDET II at Triomics, Bengaluru.",
    copyLink: "Copy link",
    linkCopied: "Link copied",
    saveContact: "Save to contacts",
    textLarger: "Larger text",
    latestVersion: "Latest version: {url}",
    gallery: {
      photoOf: "Photo {i} of {n}",
      credit: "Photo",
      close: "Close photos",
      prev: "Previous photo",
      next: "Next photo",
      view: "view photos",
    },
  },
  quick: [
    { icon: "cake" as QuickFactIcon, label: "Age", value: "" },
    { icon: "ruler" as QuickFactIcon, label: "Height", value: "6 ft (183 cm)" },
    { icon: "utensils" as QuickFactIcon, label: "Diet", value: "Non-vegetarian" },
    { icon: "languages" as QuickFactIcon, label: "Languages", value: "Hindi, English, Bhojpuri" },
    { icon: "home" as QuickFactIcon, label: "Hometown", value: "Siwan, Bihar" },
    { icon: "pin" as QuickFactIcon, label: "Lives in", value: "Bengaluru" },
  ],
  facts: [
    { label: "Education", value: "B.Tech, NIT Warangal (Telangana)" },
    { label: "Profession", value: "SDET II at [Triomics](https://triomics.com/), Bengaluru" },
    { label: "Family", value: "Settled in Gorakhpur, Uttar Pradesh, for 15+ years; hails from Siwan, Bihar" },
    { label: "Open to", value: "Relocating within India or abroad" },
  ],
  journey: [
    { when: "1997", place: "Ranchi", note: "Born" },
    { when: "1999", place: "Bihar", note: "Native place" },
    { when: "2003", place: "Nasirabad, Ajmer, Rajasthan", note: "" },
    { when: "2006", place: "Palampur, Himachal Pradesh", note: "" },
    { when: "2009", place: "Jhansi, Uttar Pradesh", note: "" },
    { when: "2012", place: "Siliguri, West Bengal", note: "" },
    { when: "2014", place: "Gorakhpur, Uttar Pradesh", note: "" },
    { when: "2017–2021", place: "NIT Warangal, Telangana", note: "B.Tech" },
    { when: "2021", place: "Mastercard, Pune", note: "Joined Mastercard" },
    { when: "2022", place: "Pune, Maharashtra", note: "Moved to Pune" },
    { when: "Feb 2023 – Sep 2024", place: "Gorakhpur, Uttar Pradesh", note: "UPSC CSE preparation" },
    { when: "Sep 2024", place: "Bengaluru, Karnataka", note: "Joined LiveSwitch, a US-based startup" },
    { when: "2026", place: "Bengaluru, Karnataka", note: "Joined Triomics" },
  ],
  adventures: { done: ["River rafting", "Zipline"], wishlist: ["Paragliding", "Hot-air balloon ride", "Skydiving"] },
  // Shown as tiles at the top of the partner section, as "Label: value".
  partnerPrefs: [
    "Education & work: A graduate, working or planning to work",
    "After marriage: Bengaluru for now; open to relocating",
    "Nature: Family-oriented, kind, and honest",
    "Outlook: Rooted in tradition, modern in outlook, and fond of travel",
  ],
  sections: [
    {
      id: "about",
      title: "About Me",
      highlights: ["Practical, emotionally connected, and adventurous by nature", "Values honesty, empathy, and open communication", "Loves the mountains, new places, different cuisines, and 90s music"],
      paragraphs: [
        "I am a B.Tech graduate from NIT Warangal, Telangana, currently working as an SDET II at [Triomics](https://triomics.com/) in Bengaluru. I would describe myself as practical, emotionally connected to the people I care about, and adventurous by nature. I value honesty, empathy, and open communication, and believe in listening patiently and understanding different perspectives, especially when navigating life's ups and downs.",
        "I love travelling, particularly to the mountains, exploring new places, and discovering different cuisines. I have a soft corner for 90s music and enjoy long conversations that can go on for hours. I also appreciate simple pleasures like morning walks, good food, spontaneous plans, and spending quality time with loved ones.",
        "I believe a fulfilling life is about balancing professional ambitions, meaningful relationships, new experiences, and family values.",
      ],
    },
    {
      id: "professional",
      title: "Professional Background",
      highlights: ["SDET II at [Triomics](https://triomics.com/), Bengaluru", "Values continuous learning and professional growth", "Open to opportunities in India or abroad"],
      paragraphs: [
        "I am currently working as an SDET II at [Triomics](https://triomics.com/) in Bengaluru. I value continuous learning, professional growth, and building a fulfilling career. I am open to opportunities in India or abroad, depending on how circumstances and career prospects evolve.",
      ],
    },
    {
      id: "family",
      title: "Family Background",
      highlights: ["Father: Indian Army (26 years), then Defence Security Corps; now retired", "Mother: homemaker", "Elder brother: Indian Air Force; sister-in-law: LLB graduate", "Elder sister: MSc, B.Ed; married to a gentleman serving in the CRPF", "Settled in Gorakhpur, Uttar Pradesh, for 15+ years; hails from Siwan, Bihar"],
      paragraphs: [
        "My father served in the Indian Army for 26 years and subsequently served in the Defence Security Corps (DSC). He is now retired, and my mother is a homemaker.",
        "My elder brother is serving in the Indian Air Force, and my sister-in-law is an LLB graduate. My elder sister holds MSc and B.Ed degrees and is married to a gentleman serving in the Central Reserve Police Force (CRPF).",
        "Our family originally hails from Siwan, Bihar, and is currently settled in Gorakhpur, Uttar Pradesh. We value education, mutual respect, family bonds, and a balanced outlook on life.",
      ],
    },
    {
      id: "partner",
      title: "Partner Preferences & Outlook on Marriage",
      highlights: ["Ambitious, intelligent, emotionally mature, and family-oriented", "Financially independent, with her own aspirations", "Values honest, open communication", "Marriage as a partnership: supporting each other's careers and sharing responsibilities"],
      paragraphs: [
        "I am looking for an ambitious, intelligent, emotionally mature, and family-oriented partner who is financially independent and values honest, open communication. Someone who has her own aspirations, approaches life with empathy, and believes in building a relationship based on trust, mutual respect, and understanding.",
        "For me, marriage is a partnership where both individuals support each other's careers, share responsibilities, listen patiently, communicate honestly, and grow together. I believe in being there for each other through life's challenges, celebrating each other's achievements, and making space for both individual aspirations and shared dreams. I'd love to have a partner with whom I can enjoy long conversations, plan spontaneous trips, explore new places, and find happiness in the little things.",
      ],
    },
    {
      id: "future",
      title: "Future & Settlement Plans",
      highlights: ["Balances career, travel, and family life", "Open to relocating within India or abroad", "In the long run, prefers to return to his hometown", "Open to living with parents if circumstances require it", "Big decisions made mutually, with equal consideration for both"],
      paragraphs: [
        "I believe in maintaining a healthy balance between career, travel, and family life. I am open to relocating within India or abroad depending on opportunities and circumstances. In the long run, I would prefer to return to my hometown rather than live in a metropolitan city permanently, while staying connected to my family and roots.",
        "I am open to living with my parents if circumstances require it. However, I believe that decisions about where we live, career moves, and our future lifestyle should always be made mutually, with both partners' aspirations, career opportunities, comfort, and family responsibilities given equal consideration. For me, building a future together means finding solutions that work for both of us, rather than expecting one person to make all the adjustments.",
      ],
    },
  ],
};

export type BiodataContent = typeof en;

const hi: BiodataContent = {
  lang: "hi",
  name: "आशीष कुमार",
  ui: {
    eyebrow: "विवाह हेतु बायोडाटा",
    getInTouch: "संपर्क करें",
    contactVia: "संपर्क के विकल्प",
    savePdf: "बायोडाटा डाउनलोड करें (PDF)",
    printPdf: "प्रिंट के लिए A4 (PDF)",
    phone: "फ़ोन",
    quickTitle: "संक्षिप्त जानकारी",
    age: "{n} वर्ष",
    updated: "अंतिम अपडेट: {date}",
    posterTitle: "एक नज़र में बायोडाटा",
    posterAlt: "आशीष कुमार का हिंदी विवाह बायोडाटा पोस्टर, इस पेज के QR कोड के साथ",
    posterOpen: "पूरे आकार में देखें",
    qrTitle: "यह बायोडाटा साझा करें",
    qrText: "फ़ोन पर यह पेज खोलने के लिए कोड स्कैन करें।",
    qrAlt: "इस बायोडाटा पेज का QR कोड",
    switchLabel: "Read in English",
    switchHref: "/marriage",
    journeyTitle: "मेरी जीवन-यात्रा",
    journeyIntro: "सेना परिवार में पलने-बढ़ने का अर्थ था हर कुछ वर्षों में एक नया शहर।",
    enjoyTitle: "मुझे क्या पसंद है",
    travelsTitle: "यात्राएँ और रोमांच",
    travelsIntro: "पहाड़, मंदिर, समुद्र तट और अच्छा खाना — अब तक जिन जगहों पर मैं गया हूँ, उनमें से कुछ।",
    tapHint: "तस्वीरें देखने के लिए किसी जगह पर टैप करें।",
    mapTitle: "नक्शे पर जगहें",
    mapLived: "जहाँ रहा",
    mapVisited: "जहाँ घूमा",
    mapNote: "जहाँ मैं रहा और जहाँ घूमा, उन जगहों का नक्शा (अनुमानित स्थान)। तस्वीरों के लिए सुनहरे निशान पर टैप करें।",
    doneTitle: "अब तक के रोमांच",
    wishTitle: "आगे करना चाहता हूँ",
    photosTitle: "तस्वीरें",
    contactTitle: "संपर्क",
    call: "कॉल करें",
    whatsapp: "व्हाट्सएप",
    email: "ईमेल",
    thanks: "इसे पढ़ने के लिए समय निकालने के लिए धन्यवाद।",
    shareWhatsapp: "व्हाट्सएप पर भेजें",
    shareText: "आशीष कुमार का विवाह बायोडाटा: बी.टेक, एनआईटी वारंगल; ट्राइओमिक्स, बेंगलुरु में SDET II।",
    copyLink: "लिंक कॉपी करें",
    linkCopied: "लिंक कॉपी हो गया",
    saveContact: "फ़ोन में संपर्क सेव करें",
    textLarger: "बड़े अक्षर",
    latestVersion: "नवीनतम संस्करण: {url}",
    gallery: {
      photoOf: "तस्वीर {i} / {n}",
      credit: "फ़ोटो",
      close: "तस्वीरें बंद करें",
      prev: "पिछली तस्वीर",
      next: "अगली तस्वीर",
      view: "तस्वीरें देखें",
    },
  },
  quick: [
    { icon: "cake", label: "आयु", value: "" },
    { icon: "ruler", label: "लंबाई", value: "6 फ़ीट (183 सेमी)" },
    { icon: "utensils", label: "भोजन", value: "मांसाहारी" },
    { icon: "languages", label: "भाषाएँ", value: "हिंदी, अंग्रेज़ी, भोजपुरी" },
    { icon: "home", label: "मूल निवास", value: "सिवान, बिहार" },
    { icon: "pin", label: "वर्तमान निवास", value: "बेंगलुरु" },
  ],
  facts: [
    { label: "शिक्षा", value: "बी.टेक, एनआईटी वारंगल (तेलंगाना)" },
    { label: "पेशा", value: "बेंगलुरु स्थित [ट्रायोमिक्स](https://triomics.com/) में SDET II" },
    { label: "परिवार", value: "15+ वर्षों से गोरखपुर, उत्तर प्रदेश में निवास; मूल रूप से सिवान, बिहार से" },
    { label: "स्थानांतरण", value: "भारत या विदेश में स्थानांतरण के लिए तैयार" },
  ],
  journey: [
    { when: "1997", place: "रांची", note: "जन्म" },
    { when: "1999", place: "बिहार", note: "मूल निवास" },
    { when: "2003", place: "नसीराबाद, अजमेर, राजस्थान", note: "" },
    { when: "2006", place: "पालमपुर, हिमाचल प्रदेश", note: "" },
    { when: "2009", place: "झांसी, उत्तर प्रदेश", note: "" },
    { when: "2012", place: "सिलीगुड़ी, पश्चिम बंगाल", note: "" },
    { when: "2014", place: "गोरखपुर, उत्तर प्रदेश", note: "" },
    { when: "2017–2021", place: "एनआईटी वारंगल, तेलंगाना", note: "बी.टेक" },
    { when: "2021", place: "मास्टरकार्ड, पुणे", note: "मास्टरकार्ड से जुड़ा" },
    { when: "2022", place: "पुणे, महाराष्ट्र", note: "पुणे आया" },
    { when: "फ़रवरी 2023 – सितंबर 2024", place: "गोरखपुर, उत्तर प्रदेश", note: "यूपीएससी सीएसई की तैयारी" },
    { when: "सितंबर 2024", place: "बेंगलुरु, कर्नाटक", note: "लाइवस्विच (अमेरिकी स्टार्टअप) से जुड़ा" },
    { when: "2026", place: "बेंगलुरु, कर्नाटक", note: "ट्रायोमिक्स से जुड़ा" },
  ],
  adventures: { done: ["रिवर राफ्टिंग", "ज़िपलाइन"], wishlist: ["पैराग्लाइडिंग", "हॉट-एयर बैलून की सवारी", "स्काईडाइविंग"] },
  partnerPrefs: [
    "शिक्षा और कार्य: स्नातक, कार्यरत या कार्य करने की इच्छुक",
    "विवाह के बाद: अभी बेंगलुरु में; स्थान बदलने के लिए तैयार",
    "स्वभाव: परिवार को महत्व देने वाली, दयालु और ईमानदार",
    "दृष्टिकोण: परंपराओं से जुड़ी, आधुनिक सोच वाली और घूमने-फिरने की शौकीन",
  ],
  sections: [
    {
      id: "about",
      title: "मेरे बारे में",
      highlights: ["व्यावहारिक, प्रियजनों से भावनात्मक रूप से जुड़ा और स्वभाव से साहसी", "ईमानदारी, सहानुभूति और खुले संवाद को महत्व", "पहाड़, नई जगहें, अलग-अलग व्यंजन और 90 के दशक का संगीत पसंद"],
      paragraphs: [
        "मैंने एनआईटी वारंगल, तेलंगाना से बी.टेक किया है और वर्तमान में बेंगलुरु स्थित [ट्रायोमिक्स](https://triomics.com/) में SDET II के पद पर कार्यरत हूँ। मैं स्वयं को व्यावहारिक, अपने प्रियजनों से भावनात्मक रूप से जुड़ा हुआ और स्वभाव से साहसी व्यक्ति मानता हूँ। मैं ईमानदारी, सहानुभूति और खुले संवाद को महत्व देता हूँ, और धैर्य से सुनने तथा अलग-अलग दृष्टिकोणों को समझने में विश्वास रखता हूँ, विशेषकर जीवन के उतार-चढ़ाव के समय।",
        "मुझे यात्रा करना, खासकर पहाड़ों की, नई जगहें देखना और अलग-अलग व्यंजनों का स्वाद लेना बहुत पसंद है। 90 के दशक के संगीत से मुझे विशेष लगाव है और घंटों चलने वाली लंबी बातचीत मुझे अच्छी लगती है। सुबह की सैर, अच्छा खाना, अचानक बनी योजनाएँ और प्रियजनों के साथ बिताया गया समय जैसी छोटी-छोटी खुशियाँ भी मुझे बहुत भाती हैं।",
        "मेरा मानना है कि एक संतुष्ट जीवन पेशेवर महत्वाकांक्षाओं, सार्थक रिश्तों, नए अनुभवों और पारिवारिक मूल्यों के बीच संतुलन में है।",
      ],
    },
    {
      id: "professional",
      title: "पेशेवर पृष्ठभूमि",
      highlights: ["बेंगलुरु स्थित [ट्रायोमिक्स](https://triomics.com/) में SDET II", "निरंतर सीखने और पेशेवर विकास को महत्व", "भारत या विदेश में अवसरों के लिए तैयार"],
      paragraphs: [
        "मैं वर्तमान में बेंगलुरु स्थित [ट्रायोमिक्स](https://triomics.com/) में SDET II के रूप में कार्यरत हूँ। मैं निरंतर सीखने, पेशेवर विकास और एक संतोषजनक करियर बनाने को महत्व देता हूँ। परिस्थितियों और करियर की संभावनाओं के अनुसार मैं भारत या विदेश में अवसरों के लिए तैयार हूँ।",
      ],
    },
    {
      id: "family",
      title: "पारिवारिक पृष्ठभूमि",
      highlights: ["पिताजी: भारतीय सेना (26 वर्ष), फिर डिफेंस सिक्योरिटी कोर; अब सेवानिवृत्त", "माताजी: गृहिणी", "बड़े भाई: भारतीय वायु सेना; भाभी: एलएलबी स्नातक", "बड़ी बहन: एमएससी, बी.एड; जीजाजी CRPF में कार्यरत", "15+ वर्षों से गोरखपुर, उत्तर प्रदेश में निवास; मूल रूप से सिवान, बिहार से"],
      paragraphs: [
        "मेरे पिताजी ने 26 वर्षों तक भारतीय सेना में सेवा दी और उसके बाद डिफेंस सिक्योरिटी कोर (DSC) में सेवा की। अब वे सेवानिवृत्त हैं, और मेरी माताजी गृहिणी हैं।",
        "मेरे बड़े भाई भारतीय वायु सेना में कार्यरत हैं, और मेरी भाभी एलएलबी स्नातक हैं। मेरी बड़ी बहन ने एमएससी और बी.एड किया है, और उनका विवाह केंद्रीय रिज़र्व पुलिस बल (CRPF) में कार्यरत एक सज्जन से हुआ है।",
        "हमारा परिवार मूल रूप से सिवान, बिहार से है और वर्तमान में गोरखपुर, उत्तर प्रदेश में बसा है। हम शिक्षा, आपसी सम्मान, पारिवारिक संबंधों और जीवन के प्रति संतुलित दृष्टिकोण को महत्व देते हैं।",
      ],
    },
    {
      id: "partner",
      title: "जीवनसाथी से अपेक्षाएँ और विवाह पर मेरे विचार",
      highlights: ["महत्वाकांक्षी, समझदार, भावनात्मक रूप से परिपक्व और परिवार को महत्व देने वाली", "आर्थिक रूप से आत्मनिर्भर, अपनी आकांक्षाओं के साथ", "ईमानदार और खुले संवाद को महत्व", "विवाह एक साझेदारी: एक-दूसरे के करियर का साथ और ज़िम्मेदारियाँ साझा"],
      paragraphs: [
        "मुझे एक महत्वाकांक्षी, समझदार, भावनात्मक रूप से परिपक्व और परिवार को महत्व देने वाली जीवनसाथी की तलाश है, जो आर्थिक रूप से आत्मनिर्भर हों और ईमानदार व खुले संवाद को महत्व देती हों। जिनकी अपनी आकांक्षाएँ हों, जो जीवन को सहानुभूति के साथ देखती हों, और विश्वास, आपसी सम्मान व समझ पर आधारित रिश्ते में विश्वास रखती हों।",
        "मेरे लिए विवाह एक साझेदारी है, जिसमें दोनों एक-दूसरे के करियर में साथ देते हैं, ज़िम्मेदारियाँ बाँटते हैं, धैर्य से सुनते हैं, ईमानदारी से बात करते हैं और साथ-साथ आगे बढ़ते हैं। मैं जीवन की चुनौतियों में एक-दूसरे का साथ देने, एक-दूसरे की उपलब्धियों का जश्न मनाने, और व्यक्तिगत आकांक्षाओं व साझा सपनों, दोनों के लिए जगह बनाने में विश्वास रखता हूँ। मैं ऐसी जीवनसाथी चाहता हूँ जिनके साथ लंबी बातचीत का आनंद ले सकूँ, अचानक यात्राओं की योजना बना सकूँ, नई जगहें घूम सकूँ और छोटी-छोटी बातों में खुशी ढूँढ सकूँ।",
      ],
    },
    {
      id: "future",
      title: "भविष्य और बसने की योजनाएँ",
      highlights: ["करियर, यात्रा और पारिवारिक जीवन में संतुलन", "भारत के भीतर या विदेश में स्थानांतरण के लिए तैयार", "लंबे समय में गृहनगर लौटना पसंद", "आवश्यकता होने पर माता-पिता के साथ रहने के लिए तैयार", "बड़े निर्णय आपसी सहमति से, दोनों को बराबर महत्व"],
      paragraphs: [
        "मैं करियर, यात्रा और पारिवारिक जीवन के बीच स्वस्थ संतुलन बनाए रखने में विश्वास रखता हूँ। अवसरों और परिस्थितियों के अनुसार मैं भारत के भीतर या विदेश में स्थानांतरित होने के लिए तैयार हूँ। लंबे समय में, मैं किसी महानगर में स्थायी रूप से रहने के बजाय अपने गृहनगर लौटना पसंद करूँगा, ताकि अपने परिवार और अपनी जड़ों से जुड़ा रहूँ।",
        "आवश्यकता पड़ने पर मैं अपने माता-पिता के साथ रहने के लिए तैयार हूँ। फिर भी, मेरा मानना है कि हम कहाँ रहेंगे, करियर से जुड़े फ़ैसले और भविष्य की जीवनशैली से जुड़े निर्णय हमेशा आपसी सहमति से लिए जाने चाहिए, जिसमें दोनों की आकांक्षाओं, करियर के अवसरों, सुविधा और पारिवारिक ज़िम्मेदारियों को बराबर महत्व दिया जाए। मेरे लिए साथ मिलकर भविष्य बनाने का अर्थ है ऐसे समाधान ढूँढना जो हम दोनों के लिए सही हों, न कि यह अपेक्षा करना कि सारे समझौते कोई एक ही करे।",
      ],
    },
  ],
};

export const biodata = { en, hi };
