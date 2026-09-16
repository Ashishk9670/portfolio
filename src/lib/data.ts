export const siteUrl = "https://ashishk9670.github.io/portfolio";

export const profile = {
  name: "Ashish Kumar",
  role: "Software Development Engineer in Test II (SDET II)",
  location: "Bangalore, India",
  tagline:
    "I build test automation and accessibility systems that scale — not just test scripts.",
  summary:
    "SDET with 5+ years designing scalable UI and API automation frameworks for web and mobile applications across healthcare and fintech. Strong expertise in Playwright, Selenium, API testing, CI/CD, and performance testing. I use AI-assisted tooling to move faster without cutting corners, and I treat accessibility as a first-class engineering requirement, not an afterthought.",
  email: "ak1545861@gmail.com",
  github: "https://github.com/Ashishk9670",
  linkedin: "https://linkedin.com/in/as9670",
  availableForOpportunities: true,
};

export type Stat = { value: string; label: string };

export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  stats: Stat[];
  impact: string;
};

export const experience: ExperienceEntry[] = [
  {
    company: "Triomics Healthcare",
    role: "Software Development Engineer in Test II (SDET II)",
    location: "Bangalore",
    start: "Jun 2026",
    end: "Present",
    bullets: [
      "Authored the automation suite from scratch for an oncology clinical-trial matching platform, in a HIPAA-regulated environment.",
    ],
    stats: [
      { value: "0 → 1", label: "automation suite built from scratch" },
      { value: "HIPAA", label: "regulated environment — compliance-aware test design" },
    ],
    impact:
      "Establishing the testing foundation for a healthcare platform where a missed regression carries real clinical-trial-matching risk, not just a support ticket.",
  },
  {
    company: "LiveSwitch",
    role: "Software Development Engineer in Test II (SDET II)",
    location: "Bangalore",
    start: "Sep 2024",
    end: "Mar 2026",
    bullets: [
      "Designed and owned scalable UI and API automation frameworks using Selenium, TestNG, REST Assured, Appium, and BDD (Cucumber) across Chrome, Safari, Edge, Firefox, and Android/iOS.",
      "Built Playwright test suites from scratch for new workflows, enabling early regression coverage and reducing production defects.",
      "Authored feature-level test plans and detailed test cases for comprehensive coverage.",
      "Optimized test execution strategy, cutting regression execution time by ~40%.",
      "Validated API responses and backend data consistency using SQL queries and schema validation.",
      "Integrated automated test suites into CI/CD pipelines (GitHub Actions, Jenkins).",
      "Applied AI-powered coding agents (Claude Code, Cursor, MCP Server) to generate test cases, debug automation failures, and streamline manual and automated testing workflows.",
      "Performed API load and performance testing with JMeter to identify bottlenecks and ensure system stability.",
    ],
    stats: [
      { value: "~40%", label: "reduction in regression execution time" },
      { value: "4 + 2", label: "browsers and mobile platforms covered end-to-end" },
      { value: "90%+", label: "automation suite coverage across Web, Android, and iOS" },
      { value: "AI-assisted", label: "workflow using Claude Code, Cursor, and MCP Server" },
    ],
    impact:
      "Turned a slow, manual-heavy release process into a fast, cross-platform regression system the team could trust before every release.",
  },
  {
    company: "Mastercard Data & Services",
    role: "Software Development Engineer, Quality",
    location: "Pune",
    start: "Jul 2021",
    end: "Sep 2024",
    bullets: [
      "Led end-to-end testing for a commercial payments rewards platform supporting large-scale transaction workflows.",
      "Collaborated with Product Managers and developers to define feature-level test strategies.",
      "Built and maintained 1000+ automated test cases using Cypress (JavaScript) and Selenium, achieving 95%+ test coverage across multiple releases.",
      "Improved defect resolution speed by ~20% by initiating structured QA-Dev syncs and better triaging practices.",
      "Worked in Agile (Scrum) teams with CI/CD-driven delivery pipelines supporting high-volume commercial payments workflows.",
    ],
    stats: [
      { value: "1000+", label: "automated test cases (Cypress + Selenium)" },
      { value: "95%+", label: "test coverage across releases" },
      { value: "~20%", label: "faster defect resolution via structured QA-Dev syncs" },
    ],
    impact:
      "Gave a high-volume commercial payments platform release confidence at a scale where manual testing alone couldn't keep up.",
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  stack: string[];
  featured: boolean;
  placeholder?: boolean;
  problem: string;
  approach: string[];
  results: Stat[];
  outcome: string;
  businessImpact: string;
  links?: { repo?: string; live?: string };
};

export const projects: Project[] = [
  {
    slug: "portfolio-mcp-server",
    title: "Portfolio MCP Server",
    tagline: "Exposing this site's data as MCP tools any AI client can query.",
    stack: ["Cloudflare Workers", "MCP SDK", "TypeScript", "Zod"],
    featured: true,
    problem:
      "Recruiters and AI assistants can only learn about a candidate by scraping HTML — brittle, lossy, and disconnected from whatever the candidate actually maintains. I wanted any MCP-aware AI client to be able to query my experience, projects, and skills as accurate, structured data instead.",
    approach: [
      "Built a Cloudflare Worker using the agents SDK's McpAgent, exposing 7 tools (get_experience, get_projects, get_skills, get_about, get_contact_info, list_blog_posts, get_blog_post) over both Streamable HTTP and legacy SSE.",
      "Added a prebuild step to this site that exports the same data.ts/posts.ts modules it renders from as static JSON — single source of truth, no duplicated resume data between the site and the server.",
      "Validated every fetched payload with Zod schemas, since the data crosses a network boundary between two separately deployed repos.",
      "Shipped both a remote transport (zero-install, via Claude Code/Desktop) and a bundled stdio entry point for local use.",
    ],
    results: [
      { value: "7", label: "MCP tools covering experience, projects, skills, and writing" },
      { value: "2", label: "transports — remote (Streamable HTTP/SSE) and local (stdio)" },
      { value: "5 min", label: "edge cache — new site data propagates with no server redeploy" },
    ],
    outcome:
      "A deployed MCP server that any MCP client can query for structured information about my background — verified end-to-end with the MCP Inspector CLI against both transports before calling it done.",
    businessImpact:
      "A working demonstration of the exact skill I'm selling — deliberate AI-tooling integration — not just a bullet point claiming I know MCP.",
    links: { repo: "https://github.com/Ashishk9670/ashish-portfolio-mcp" },
  },
  {
    slug: "demowebshop-automation-framework",
    title: "DemoWebShop Automation Framework",
    tagline: "A modular Selenium framework built to be maintained, not just to pass.",
    stack: ["Selenium", "Java", "TestNG", "Log4j", "Extent Reports", "GitHub Actions"],
    featured: false,
    problem:
      "Most reference Selenium frameworks online are single-file demos that don't reflect how a real regression suite has to be organized, reported on, or run in CI. I wanted a framework I could point to that shows how I actually structure automation code.",
    approach: [
      "Built on the Page Object Model to separate locators/page interactions from test logic, keeping tests readable as the suite grows.",
      "Added Log4j logging and Extent Reports so failures are diagnosable from the report alone, without re-running locally.",
      "Wired the suite into GitHub Actions so every push runs the full regression pack and publishes a report artifact.",
    ],
    results: [
      { value: "100%", label: "of the regression pack runs unattended in CI" },
      { value: "POM", label: "architecture — locators separated from test logic" },
    ],
    outcome:
      "A CI-integrated regression suite that runs unattended on every push and produces a readable failure report — the same pattern I use for production frameworks, minus the proprietary code.",
    businessImpact:
      "A framework I can walk through end-to-end in an interview — the same structure I use in production, without the proprietary code attached.",
    links: { repo: "https://github.com/Ashishk9670" },
  },
  {
    slug: "api-automation-framework",
    title: "API Automation Framework",
    tagline: "REST Assured + Maven, built for automated execution and reporting from day one.",
    stack: ["REST Assured", "Java", "Maven", "GitHub Actions"],
    featured: true,
    problem:
      "API test suites are easy to write and easy to let rot — this project was about proving out a Maven-based structure that stays maintainable and runs automatically instead of being triggered by hand.",
    approach: [
      "Structured request/response validation and schema checks as reusable components rather than one-off test methods.",
      "Set up Maven profiles for targeted test execution (smoke vs. full regression).",
      "Automated execution and reporting through GitHub Actions on every commit.",
    ],
    results: [
      { value: "100%", label: "automated execution and reporting on every commit" },
      { value: "2", label: "Maven profiles — smoke vs. full regression" },
    ],
    outcome:
      "A self-contained API regression suite with automated execution and reporting, requiring no manual trigger to stay current.",
    businessImpact:
      "Proves the CI wiring holds up on its own — nobody has to remember to trigger it before a release.",
    links: { repo: "https://github.com/Ashishk9670" },
  },
  {
    slug: "playwright-ai-assisted-framework",
    title: "Playwright UI & Automation Framework",
    tagline: "Using AI coding agents deliberately inside the test-authoring workflow.",
    stack: ["Playwright", "MCP Server", "GitHub Copilot"],
    featured: true,
    problem:
      "AI coding agents are genuinely useful for test automation, but only if you know where they help (boilerplate, first-draft locators, debugging flaky failures) and where they don't (test strategy, what actually needs coverage). Most \"AI-assisted testing\" takes are either hype or dismissal.",
    approach: [
      "Built a Playwright framework structured so AI-generated test drafts still land in the right architecture instead of sprawling into one-off scripts.",
      "Used an MCP server + GitHub Copilot inside the loop for faster first drafts and faster debugging of failures, with manual review on what actually gets committed.",
    ],
    results: [
      { value: "AI-assisted", label: "first-draft test authoring and failure debugging" },
      { value: "Manual", label: "review gate on everything that ships to the suite" },
    ],
    outcome:
      "Faster test creation and maintenance without giving up control over what the suite actually verifies — a workflow, not just a tool swap.",
    businessImpact:
      "A concrete, honest answer to \"how do you actually use AI in testing\" — not a hype answer and not a dismissal.",
    links: { repo: "https://github.com/Ashishk9670" },
  },
  {
    slug: "sauce-demo-playwright-suite",
    title: "Sauce Demo Playwright Suite",
    tagline: "A real E2E suite against a live public store, with its report published and replayable here.",
    stack: ["Playwright", "TypeScript", "Allure", "GitHub Actions", "Shopify"],
    featured: true,
    problem:
      "A portfolio project is easy to dismiss as a toy — a single-file demo nobody could point coworkers at. I wanted a suite that runs against a real, live target with real failure modes, and a report a stranger could open and trust, not a screenshot.",
    approach: [
      "Built 25 functional cases (catalog, cart, checkout, account, and a chained signup-to-checkout journey) in Playwright + TypeScript, Page Object Model, typed fixtures, matrixed across Chromium, Firefox, and WebKit in CI.",
      "Wired Allure reporting into the pipeline and added a GitHub Pages publish step, so every push to main produces a public, browsable report with history and trends, not just a CI artifact.",
      "Documented two real constraints from the live target instead of hiding them: Cloudflare's bot management can challenge automated browsers regardless of IP reputation, and hCaptcha hard-blocks registration/login under CDP-driven automation entirely — confirmed via network inspection, not treated as a bug in the suite.",
      "Built this site's own /qa-suite page to fetch that published report's JSON at request time and replay it case by case, with the full Allure report embedded underneath.",
    ],
    results: [
      { value: "25", label: "functional cases across catalog, cart, checkout, account, and journey" },
      { value: "3", label: "browsers — Chromium, Firefox, WebKit, matrixed in CI" },
      { value: "Public", label: "Allure report published to GitHub Pages on every push, with trend history" },
    ],
    outcome:
      "A suite that runs against a real store and is honest when the store — not the suite — is the reason a run goes red, with a report anyone can open and check for themselves.",
    businessImpact:
      "The same discipline I bring to production suites — a flaky test is a defect to diagnose, not weather to retry away — applied somewhere anyone can verify it firsthand.",
    links: {
      repo: "https://github.com/Ashishk9670/sauce-demo-playwright-suite",
      live: "https://ashishk9670.github.io/portfolio/qa-suite",
    },
  },
  {
    slug: "food-recommendations",
    title: "Food Recommendations",
    tagline: "A no-login food and dish recommendation board, built and load-hardened like a real product.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Sentry"],
    featured: false,
    problem:
      "A recommendation board only works if anyone can post without friction, but \"no accounts\" creates real problems the moment it's live: who can edit a post, what stops one person from spamming submissions or likes, and what happens when something breaks with no user account to trace it back to.",
    approach: [
      "Ownership without accounts: each submission gets a secret edit token at creation time, so the original poster's browser can edit or delete it later with no login — moderation (reports, an admin panel to review and dismiss them) covers the rest.",
      "Rate limiting on submissions, likes, comments, and reports via Upstash Redis. It replaced an in-memory limiter that only worked per warm serverless instance — on Vercel that was close to no protection at all, since the next request can land on a different instance with no shared memory.",
      "Sentry wired into both the server and edge runtimes, so a failure in either surfaces with a real stack trace instead of a silent 500 a user just bounces off.",
      "Postgres via Prisma, with a trigram-search migration for the browse/search page, and a 28-case Playwright suite (happy path, submission validation, admin auth, filtering/pagination, accessibility, SEO/error pages) run in CI on every push and on a daily schedule.",
    ],
    results: [
      { value: "28", label: "Playwright cases — happy path, admin, validation, a11y, SEO/errors" },
      { value: "Redis", label: "rate limiting that actually holds across serverless instances" },
      { value: "Daily", label: "scheduled CI run, independent of whether anything changed that day" },
    ],
    outcome:
      "A live, publicly usable app that handles the unglamorous parts of \"no login required\" honestly — abuse prevention and ownership — instead of skipping them because there's no user table to hang them off of.",
    businessImpact:
      "The same instinct I bring to test strategy — what actually needs to hold up under real, unauthenticated traffic — applied to building the thing, not just testing it.",
    links: {
      repo: "https://github.com/Ashishk9670/food-recommendations",
      live: "https://food-recommendations-six.vercel.app",
    },
  },
  {
    slug: "screenshot-to-drive-extension",
    title: "Screenshot to Drive",
    tagline: "A Chrome extension that gets a screenshot from the active tab into a shared Drive folder in two clicks.",
    stack: ["Chrome Extension", "JavaScript", "Google Drive API", "OAuth"],
    featured: false,
    problem:
      "Sharing a screenshot with a team sounds trivial until it's a daily habit: capture, find the right shared folder, rename it to something searchable, upload, repeat. I wanted that down to two clicks, with no native helper app or screen-recording permission prompt to set up first.",
    approach: [
      "Built as a Manifest V3 extension using chrome.tabs.captureVisibleTab instead of the desktopCapture screen-picker — it captures the focused tab directly on click, with no \"choose what to share\" dialog and no offscreen document needed just to draw a video frame to canvas.",
      "The rename-before-saving review window opens via chrome.windows.create rather than a default_popup, specifically because a popup bubble auto-closes the instant it loses focus — a real bug hit in an earlier iteration, where the OS's own share-picker dialog stole focus and silently killed the popup mid-capture.",
      "Local save and the Drive upload run concurrently via Promise.allSettled, so one failing doesn't block the other, with a single OS notification summarizing both outcomes.",
      "Uses the broader `drive` OAuth scope instead of the narrower `drive.file` — the target folder is shared with each teammate rather than created by their own account, and `drive.file` only ever grants access to files a user's own token created.",
    ],
    results: [
      { value: "2 clicks", label: "from toolbar icon to a saved, uploaded screenshot" },
      { value: "2", label: "independent save paths (local + Drive) via Promise.allSettled" },
      { value: "0", label: "native helper apps or extra permission dialogs beyond one-time sign-in" },
    ],
    outcome:
      "A small tool the team actually uses instead of the manual screenshot-then-upload routine it replaced — proof that cutting friction doesn't always need a big system, just the right two Chrome APIs.",
    businessImpact:
      "The same instinct I bring to test tooling — cut the manual steps between \"I need this artifact\" and \"it's where it needs to be\" — applied to a small internal tool instead of a test framework.",
  },
];

export const mcpServer = {
  repoUrl: "https://github.com/Ashishk9670/ashish-portfolio-mcp",
  remoteUrl: "https://ashish-portfolio-mcp.ashishk.workers.dev" as string | null,
  tools: [
    { name: "get_experience", description: "Work history with quantified results and business impact per role." },
    { name: "get_projects", description: "Project case studies — problem, approach, results, outcome, impact." },
    { name: "get_skills", description: "Skills by category, plus the tools actually used and why." },
    { name: "get_about", description: "Career timeline, engineering philosophy, education, certifications." },
    { name: "get_contact_info", description: "Email, GitHub, LinkedIn, and current availability status." },
    { name: "list_blog_posts", description: "Blog post titles, descriptions, and dates." },
    { name: "get_blog_post", description: "Full Markdown content of one post, by slug." },
  ],
};

export type SkillGroup = { category: string; items: string[] };

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["Java", "TypeScript", "JavaScript", "C++"] },
  {
    category: "Test Automation",
    items: ["Playwright", "Selenium", "Cypress", "TestNG", "Appium", "REST Assured", "Cucumber"],
  },
  {
    category: "Testing Disciplines",
    items: [
      "UI Testing",
      "API Testing",
      "Regression",
      "Smoke Testing",
      "Performance (JMeter)",
      "Load Testing (k6)",
      "Contract Testing (Pact)",
      "UAT",
      "Integration Testing",
      "Cross-Browser Testing",
      "E2E Testing",
      "Chaos Testing",
      "Accessibility (WCAG)",
      "Internationalization (i18n)",
    ],
  },
  { category: "Platforms", items: ["Web", "Android", "iOS", "macOS", "Windows"] },
  { category: "CI/CD & Cloud", items: ["GitHub Actions", "Jenkins", "Azure DevOps", "Docker", "AWS"] },
  { category: "Data & Observability", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Sentry"] },
  { category: "Version Control & PM", items: ["Git", "Bitbucket", "Jira", "TestRail"] },
  { category: "AI-Assisted Development", items: ["Claude Code", "Cursor", "GitHub Copilot", "MCP Server", "ChatGPT"] },
];

export type UsesGroup = { category: string; blurb: string; items: string[] };

export const usesStack: UsesGroup[] = [
  {
    category: "UI & mobile automation",
    blurb: "Playwright is what I reach for first on new projects; Selenium and Appium still earn their keep on legacy suites and cross-browser/mobile coverage.",
    items: ["Playwright", "Selenium", "Cypress", "Appium", "TestNG", "Cucumber"],
  },
  {
    category: "API & performance",
    blurb: "REST Assured plus SQL-level checks for backend data consistency, JMeter when I need load numbers, not just pass/fail.",
    items: ["REST Assured", "JMeter"],
  },
  {
    category: "AI-assisted workflow",
    blurb: "Cursor and Claude Code for first-draft test scaffolding and debugging flaky failures fast; GitHub Copilot inline; ChatGPT for one-off research. None of these replace deciding what actually needs coverage — that part stays manual.",
    items: ["Cursor", "Claude Code", "GitHub Copilot", "MCP Server", "ChatGPT"],
  },
  {
    category: "CI/CD & infra",
    blurb: "GitHub Actions for anything greenfield, Jenkins where it's already entrenched, Docker to keep environments reproducible, AWS for the infra underneath.",
    items: ["GitHub Actions", "Jenkins", "Docker", "AWS"],
  },
  {
    category: "Data & observability",
    blurb: "MySQL/MongoDB for the systems under test, Redis and Sentry mostly from side-project infra work.",
    items: ["MySQL", "MongoDB", "Redis", "Sentry"],
  },
  {
    category: "Process",
    blurb: "Git and Bitbucket for version control, Jira for tracking, TestRail when a project needs formal test-case management.",
    items: ["Git", "Bitbucket", "Jira", "TestRail"],
  },
];

export const education = {
  school: "National Institute of Technology, Warangal",
  degree: "Bachelor of Technology",
  gpa: "8.69 CGPA",
  start: "2017",
  end: "2021",
};

export const certifications = ["Cypress End-to-End JavaScript Testing", "HackerRank – Problem Solving"];

export const achievements = ["CodeChef 4-star", "Merit Scholarship (3x) – NIT Warangal & CBSE"];

export type Milestone = { year: string; title: string; blurb: string };

export const milestones: Milestone[] = [
  {
    year: "2017",
    title: "Started at NIT Warangal",
    blurb: "B.Tech, graduated 2021 with an 8.69 CGPA.",
  },
  {
    year: "2021",
    title: "Joined Mastercard Data & Services",
    blurb: "Built 1000+ automated tests and hit 95%+ coverage on a commercial payments platform.",
  },
  {
    year: "2024",
    title: "Joined LiveSwitch",
    blurb: "Owned cross-platform UI/API automation, cut regression execution time by ~40%.",
  },
  {
    year: "2026",
    title: "Joined Triomics Healthcare",
    blurb: "Building the automation suite from scratch for an oncology clinical-trial matching platform.",
  },
];

export type Principle = { title: string; description: string; practice: string };

export const philosophy: Principle[] = [
  {
    title: "Quality is architecture, not a checklist",
    description:
      "A test suite is a piece of software. Page objects, reusable API clients, and CI wiring are design decisions, not busywork — treating them that way is what keeps a suite alive past the first few sprints.",
    practice:
      "Every framework I've built — LiveSwitch, the DemoWebShop suite, the API Automation project — starts from Page Object Model and reusable clients before the first test case is written.",
  },
  {
    title: "Accessibility is a constraint, not an audit",
    description:
      "WCAG compliance works when it's designed in from the first component, not checked for after launch. I hold my own work — including this site — to the same bar I audit other software against.",
    practice:
      "This site runs an axe-core audit and a Lighthouse accessibility gate (≥95) in CI on every push, not just a one-time check before launch.",
  },
  {
    title: "AI is a tool with judgment attached",
    description:
      "AI-assisted coding is genuinely useful for first-draft scaffolding and debugging flaky failures fast. Deciding what actually needs test coverage stays a human, strategic call — that part doesn't get automated away.",
    practice:
      "Claude Code and Cursor draft first-pass tests and chase down flaky failures at LiveSwitch and on this site's own tooling; what actually ships is still a manual review call.",
  },
];

export type SkillTimelineEntry = { skill: string; since: string; years: string; note: string };

export const skillTimeline: SkillTimelineEntry[] = [
  {
    skill: "Playwright",
    since: "Sep 2024",
    years: "~2y",
    note: "Built from scratch for new workflows at LiveSwitch, enabling early regression coverage.",
  },
  {
    skill: "Selenium + TestNG",
    since: "Jul 2021",
    years: "~5y",
    note: "1000+ automated tests and 95%+ coverage on a commercial payments platform at Mastercard.",
  },
  {
    skill: "AI-assisted testing",
    since: "Sep 2024",
    years: "~2y",
    note: "Claude Code, Cursor, and MCP for first-draft test generation and flaky-failure debugging — manual review before anything ships.",
  },
  {
    skill: "API Testing (REST Assured)",
    since: "Jul 2021",
    years: "~5y",
    note: "Request/response validation and backend data consistency, cross-checked with SQL.",
  },
];

export const impactHighlights: (Stat & { company: string })[] = [
  { ...experience[1].stats[0], company: experience[1].company },
  { ...experience[1].stats[2], company: experience[1].company },
  { ...experience[2].stats[1], company: experience[2].company },
  { ...experience[2].stats[0], company: experience[2].company },
  { ...experience[2].stats[2], company: experience[2].company },
];
