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
};

export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
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
  outcome: string;
  links?: { repo?: string; live?: string };
};

export const projects: Project[] = [
  {
    slug: "demowebshop-automation-framework",
    title: "DemoWebShop Automation Framework",
    tagline: "A modular Selenium framework built to be maintained, not just to pass.",
    stack: ["Selenium", "Java", "TestNG", "Log4j", "Extent Reports", "GitHub Actions"],
    featured: true,
    problem:
      "Most reference Selenium frameworks online are single-file demos that don't reflect how a real regression suite has to be organized, reported on, or run in CI. I wanted a framework I could point to that shows how I actually structure automation code.",
    approach: [
      "Built on the Page Object Model to separate locators/page interactions from test logic, keeping tests readable as the suite grows.",
      "Added Log4j logging and Extent Reports so failures are diagnosable from the report alone, without re-running locally.",
      "Wired the suite into GitHub Actions so every push runs the full regression pack and publishes a report artifact.",
    ],
    outcome:
      "A CI-integrated regression suite that runs unattended on every push and produces a readable failure report — the same pattern I use for production frameworks, minus the proprietary code.",
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
    outcome:
      "A self-contained API regression suite with automated execution and reporting, requiring no manual trigger to stay current.",
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
    outcome:
      "Faster test creation and maintenance without giving up control over what the suite actually verifies — a workflow, not just a tool swap.",
    links: { repo: "https://github.com/Ashishk9670" },
  },
  {
    slug: "cloud-infra-side-project",
    title: "Cloud Infra Side Project (Redis / Sentry)",
    tagline: "Details pending — flagged as a placeholder case study.",
    stack: ["Redis", "Sentry"],
    featured: false,
    placeholder: true,
    problem:
      "Ashish: replace this with the real problem statement for the Redis/Sentry side project (what it does, why you built it, what constraint mattered).",
    approach: [
      "Ashish: fill in the architecture decisions — e.g. what Redis is used for (caching, queues, pub/sub), how Sentry is wired in, and why.",
    ],
    outcome: "Ashish: fill in the outcome — what it does today, what you learned, or what's next.",
  },
];

export type SkillGroup = { category: string; items: string[] };

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["Java", "JavaScript", "C++"] },
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
      "UAT",
      "Integration Testing",
      "Cross-Browser Testing",
      "E2E Testing",
      "Chaos Testing",
      "Accessibility (WCAG)",
    ],
  },
  { category: "CI/CD & DevOps", items: ["GitHub Actions", "Jenkins", "Docker", "AWS"] },
  { category: "Databases", items: ["MySQL", "MongoDB", "Redis"] },
  { category: "Tooling", items: ["Git", "Bitbucket", "Jira", "TestRail", "Sentry"] },
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
