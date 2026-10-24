export type QualityTable = { caption: string; columns: string[]; rows: string[][] };

export type QualitySection = {
  heading: string;
  label?: string;
  body?: string[];
  bullets?: string[];
  table?: QualityTable;
};

export type QualityStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  notice?: string;
  sections: QualitySection[];
  links?: { label: string; href: string }[];
};

export const qualityStatement = {
  heading: "Quality starts at product discovery and continues into production.",
  body: [
    "Test automation is one tool in that system, not the whole of it. I start in requirement reviews, where an edge case costs a conversation instead of a hotfix, and I stay involved after release, where production incidents tell you what the suite missed.",
    "In between, the work is choosing where to spend effort: risk-based prioritization of customer journeys, shift-left quality, automation where it pays for itself, exploratory testing where scripted checks won't find the problem, and release decisions that run on signals rather than a green checkmark alone.",
  ],
  pillars: [
    "Risk-based testing",
    "Critical customer journeys",
    "Shift-left quality",
    "Automation where it pays off",
    "Exploratory testing",
    "Signal-driven release decisions",
  ],
};

export type QualityMetric = {
  name: string;
  value?: string;
  context?: string;
  shows: string;
  evidence: string;
  source: "Measured at work" | "Public project" | "How I use it";
};

export const qualityMetrics: QualityMetric[] = [
  {
    name: "Critical journey coverage",
    value: "90%+",
    context: "LiveSwitch · Web, Android, iOS",
    shows: "How many of the user journeys that matter most are protected by tests — not raw test count.",
    evidence:
      "90%+ automation coverage across Web, Android, and iOS at LiveSwitch; 95%+ test coverage across releases at Mastercard. In public: a 34-test smoke tier covering every critical layer runs on every pull request.",
    source: "Measured at work",
  },
  {
    name: "Regression duration",
    value: "~40%",
    context: "LiveSwitch · faster regression runs",
    shows: "How fast the team gets a trustworthy answer before a release.",
    evidence:
      "~40% lower regression execution time at LiveSwitch, before vs. after the Selenium-to-Playwright migration and AI-assisted workflow.",
    source: "Measured at work",
  },
  {
    name: "Defect resolution speed",
    value: "~20%",
    context: "Mastercard · faster resolution",
    shows: "Whether QA and Dev are closing the loop on what testing finds.",
    evidence: "~20% faster defect resolution at Mastercard after introducing structured QA-Dev syncs and better triage.",
    source: "Measured at work",
  },
  {
    name: "Escaped defects",
    value: "<5%",
    context: "Triomics · LiveSwitch",
    shows: "Production defects that testing should have caught — the clearest signal of whether the suite guards the right things.",
    evidence:
      "Under 5% of defects escaped to production at Triomics and LiveSwitch. Each one that did was traced back to the test that should have caught it, and that test was added to regression so the same defect can't escape twice.",
    source: "Measured at work",
  },
  {
    name: "Flaky-test rate",
    shows: "Share of tests with inconsistent outcomes — the thing that teaches a team to ignore red builds.",
    evidence:
      "Failures get triaged into product defects vs. automation issues before anyone re-runs. In my public multi-layer framework, any test that only passes on retry is listed in a pull-request comment instead of being hidden by the retry.",
    source: "How I use it",
  },
  {
    name: "Release readiness",
    value: "4 gates",
    context: "This site · every push, plus daily e2e",
    shows: "Whether a build is safe to ship: defect severity, critical-workflow results, and unresolved risks together.",
    evidence:
      "Every push to this site runs lint, a type-checked build, an axe-core audit of every page, and a Lighthouse accessibility gate (≥95); the full Playwright e2e suite runs on a daily schedule.",
    source: "Public project",
  },
  {
    name: "AI effectiveness",
    value: "70%+",
    context: "Triomics · LiveSwitch · less time writing & debugging",
    shows: "Time saved by AI-assisted testing, weighed against the review effort it adds and the quality of what it produces.",
    evidence:
      "70%+ less time spent writing and debugging tests at Triomics and LiveSwitch, with every AI-generated test still passing a manual review gate. That's separate from the ~40% regression-time figure, which covers the Playwright migration and AI workflow together.",
    source: "Measured at work",
  },
];

export const qualityStudies: QualityStudy[] = [
  {
    slug: "end-to-end-quality-strategy",
    eyebrow: "End-to-End Quality Strategy",
    title: "One order, every layer: a quality strategy for an event-driven app",
    summary:
      "Product risk, critical workflows, test layers from UI to Kafka, CI tiers, and what the suite actually caught — on a public framework of 154 Playwright tests.",
    notice:
      "Public practice project: a shop app built to be tested (Express, Postgres, Kafka, WebSocket, GraphQL), with a Playwright + TypeScript framework covering every layer. Work projects follow the same approach; their code isn't public.",
    sections: [
      {
        heading: "The product risk",
        body: [
          "A single order touches five systems: the UI, a REST/GraphQL API, Postgres, a Kafka event, and a WebSocket push back to the user. The expensive failures live between those layers — an order that's saved but never announced, stock that goes negative under concurrent orders, events that arrive out of order, or a real-time update that reaches the wrong user.",
          "UI tests alone can't see most of that, so the strategy puts each risk at the layer where it can be checked directly and cheaply, and keeps only a thin end-to-end layer to prove the layers agree.",
        ],
      },
      {
        heading: "Critical workflows",
        bullets: [
          "Login and session handling, including token tampering and expired or missing auth.",
          "Product search and catalog.",
          "Cart to order placement, including stock under concurrent orders.",
          "Order events on Kafka and real-time order updates over WebSocket.",
        ],
      },
      {
        heading: "Test layers",
        table: {
          caption: "Test layers and what each one proves",
          columns: ["Layer", "Tests", "What it proves"],
          rows: [
            ["UI", "27", "User flows through page objects, axe WCAG 2.1 AA checks, XSS and token-exposure checks; the smoke set also runs on Firefox, WebKit, Pixel 7, and iPhone 14"],
            ["API (REST + GraphQL)", "84", "CRUD and 400/401/403/404/409 error paths, OpenAPI contract validation, a GraphQL schema snapshot, JWT tampering, SQL injection, mass assignment, rate limiting, and 20 parallel orders racing for 5 units of stock"],
            ["Database", "9", "API calls persist correctly, failed writes roll back with no partial data, stock decrements, passwords are hashed, foreign keys hold"],
            ["Kafka", "4", "Event payload schema, message key equals the order id, events arrive in order, rejected orders publish nothing"],
            ["WebSocket", "11", "Auth, per-user pushes, event order, and no replay of pushes missed while disconnected"],
            ["End to end", "2", "One order traced UI → API → DB → Kafka → WebSocket → UI, with a step per layer"],
            ["Opt-in", "—", "p95 latency budgets, visual diffs, chaos tests that stop Kafka mid-flow, and a k6 smoke script"],
          ],
        },
      },
      {
        heading: "How risk decides what runs when",
        bullets: [
          "A 34-test @smoke tier — the critical set across every layer — runs on every pull request and push to main.",
          "The full regression suite runs nightly and on demand; cross-browser and mobile runs are limited to the smoke tier, where they earn their cost.",
          "API and UI suites are sharded, and every test creates its own data and matches events by order id, so parallel runs never collide.",
          "Performance, visual, and chaos tests are opt-in and single-worker, because they're slow and intentionally disruptive.",
        ],
      },
      {
        heading: "What the suite caught",
        body: [
          "The chaos tests stop the Kafka broker mid-flow. One of them exposed a real defect: when Kafka is down, the order is saved but the API returns a 500 — so the user sees a failure for an order that actually went through, and may place it again.",
          "Rather than deleting or skipping the test, it's kept as an expected failure that documents the bug. The day the API is fixed to handle a broker outage, the suite flags it.",
        ],
      },
      {
        heading: "Measurable outcome",
        bullets: [
          "154 tests across 24 files, covering every layer of the app.",
          "Nightly full runs take roughly 3 to 15 minutes end to end, and most of that is Docker start-up — the tests themselves take seconds per layer (84 API tests in under 8 seconds across two shards).",
          "As of October 2026, the last 20 CI runs are green. Tests that pass only on retry are listed in a pull-request comment instead of being hidden by the retry.",
          "Results publish as merged HTML, JUnit, and Allure reports.",
        ],
      },
      {
        heading: "AI in the loop",
        body: [
          "The repo includes a Playwright MCP setup with planner, generator, and healer agents for drafting and repairing tests, with human review before anything is committed — the same workflow described on the AI-Powered QA page.",
        ],
      },
    ],
    links: [
      { label: "Repository", href: "https://github.com/Ashishk9670/plawight-ui-api-wss-db-kafka" },
      { label: "AI-Powered QA", href: "/quality/ai-powered-qa" },
    ],
  },
  {
    slug: "ai-powered-qa",
    eyebrow: "AI-Powered QA",
    title: "Using AI in testing, with judgment attached",
    summary:
      "Where Claude Code, Cursor, and MCP-assisted workflows speed up my QA work, how I check what they produce, and what I hold them to.",
    sections: [
      {
        heading: "Where AI does the work",
        bullets: [
          "First-draft test generation and automation scaffolding with Claude Code and Cursor, at LiveSwitch and Triomics.",
          "Failure investigation: working through traces and logs faster to separate product defects from automation issues.",
          "Coverage-gap analysis: comparing what the suite exercises against the features it's meant to protect, to surface missing scenarios.",
          "An MCP server in the loop for faster first drafts and faster debugging of failing tests.",
          "In public: a Playwright MCP setup with planner, generator, and healer agents in my multi-layer framework, with human review before anything is committed.",
        ],
      },
      {
        heading: "How I validate what it produces",
        bullets: [
          "Every AI-generated scenario is checked against the business requirement it claims to cover, not just whether it passes.",
          "Generated code has to land in the framework's existing architecture (page objects, fixtures, API clients) instead of sprawling into one-off scripts.",
          "Nothing joins a suite without a manual review. Deciding what actually needs coverage stays a human call.",
        ],
      },
      {
        heading: "Why the assertions stay deterministic",
        body: [
          "An AI-drafted test will happily assert whatever the application currently does — which means it passes on a bug. So the steps can be drafted by AI, but the expected values come from the requirement or from known test data, and the review checks that every assertion would fail if the behavior were wrong.",
        ],
        table: {
          caption: "What I look for when reviewing an AI-drafted test",
          columns: ["Common in AI drafts", "What ships instead"],
          rows: [
            ["Asserts on whatever the page currently shows", "Asserts on expected values from the requirement or seeded test data"],
            ["Fixed waits and sleeps", "Web-first assertions that wait for a specific state"],
            ["Brittle CSS or XPath locators", "Role- and label-based locators that survive markup changes"],
            ["One long test covering many behaviors", "Focused tests, each failing for one clear reason"],
          ],
        },
      },
      {
        heading: "How I measure the benefit",
        body: [
          "The direct number is time: AI-assisted workflows cut the time I spend writing and debugging tests by 70%+ at Triomics and LiveSwitch — measured on authoring and debugging, not on total QA time.",
          "The downstream number is regression execution time: ~40% lower at LiveSwitch after the Selenium-to-Playwright migration plus the AI-assisted workflow. That figure covers both changes together, so I don't claim it for AI alone.",
          "The cost side is review effort. AI makes drafting cheap; it doesn't make reviewing free, and a workflow that saves authoring time but ships weaker assertions is a net loss.",
        ],
      },
      {
        heading: "Testing AI itself",
        label: "Practice project — not yet public",
        body: [
          "Testing LLM features needs different tools. I built a DeepEval suite against a synthetic support assistant and a small RAG pipeline: 33 evaluation cases across four levels, from answer relevancy, correctness, toxicity, and bias on the chatbot, to faithfulness, hallucination, and contextual precision/recall on the RAG pipeline, custom G-Eval rubrics, and a golden-dataset regression suite.",
          "The next step there is the same principle as above: pairing the LLM-judged metrics with deterministic checks — for example, asserting that retrieval returns the expected documents before any judge model scores the answer.",
        ],
      },
    ],
    links: [
      { label: "Playwright AI-assisted framework case study", href: "/projects/playwright-ai-assisted-framework" },
      { label: "Multi-layer framework with the Playwright MCP agents", href: "https://github.com/Ashishk9670/plawight-ui-api-wss-db-kafka" },
      { label: "Portfolio MCP server", href: "/mcp" },
    ],
  },
  {
    slug: "production-quality-demo",
    eyebrow: "Production Quality & Observability",
    title: "Turning production signals into test priorities",
    summary:
      "How error rates, logs, latency, and incidents should feed test prioritization and release decisions — shown on a live app anyone can inspect.",
    notice:
      "Demo on a personal project. My production-quality work at Mastercard, LiveSwitch, and Triomics is on the Experience page; this page shows the same thinking applied to code that's public.",
    sections: [
      {
        heading: "The loop",
        bullets: [
          "A production error or customer report comes in.",
          "Reproduce it with a test that fails for the right reason, before the fix.",
          "Fix it, and keep that test in regression so the same defect can't escape twice.",
          "Workflows with rising error rates or latency get more test depth, and open errors on critical paths count against release readiness.",
        ],
      },
      {
        heading: "What's wired today in Food Recommendations",
        table: {
          caption: "Production signals in the Food Recommendations app",
          columns: ["Signal", "How", "Status"],
          rows: [
            ["Server and edge errors", "Sentry via instrumentation.ts, with captureRequestError on every request error", "Wired"],
            ["Browser errors and render crashes", "Client-side Sentry, plus error.tsx and global-error.tsx boundaries", "Wired"],
            ["Readable stack traces", "Source-map upload, verified against a real production error", "Wired"],
            ["Performance traces", "Sentry tracing at a 100% sample rate", "Wired — fine at hobby traffic, would be sampled down at scale"],
            ["Abuse and traffic spikes", "Upstash Redis sliding-window rate limits on 5 routes, returning 429", "Wired, not yet covered by a test"],
            ["Structured logs and request IDs", "—", "Not yet"],
            ["Release tagging", "—", "Not yet"],
          ],
        },
      },
      {
        heading: "How those signals set test priority",
        table: {
          caption: "From production signal to testing and release decision",
          columns: ["Signal", "Testing and release decision"],
          rows: [
            ["New error on the submit or like route", "Reproduce it with a Playwright test against that route before fixing; the test joins regression"],
            ["Error rate up on a critical workflow after a deploy", "Treat it as a release blocker and widen test depth around that workflow"],
            ["Search latency creeping up", "Add a performance check on the trigram search path before the next release"],
            ["Spike in 429 responses on one route", "Check the limit is right, and add a test that asserts the 429 path"],
          ],
        },
      },
      {
        heading: "Honest gaps, and what I'd add next",
        bullets: [
          "No test asserts the rate limiter's 429 path today — the suite clears its own keys to stay out of the limiter's way. That's the first test I'd add.",
          "No structured logging or request IDs, so a user report can't yet be tied to a specific trace.",
          "No release tagging in Sentry, so an error spike can't be attributed to the deploy that caused it.",
          "Two security fixes — image content-type spoofing and unbounded field lengths — shipped without regression tests. Those are the next tests I'd write, and exactly the gap the loop above exists to close.",
        ],
      },
    ],
    links: [
      { label: "Food Recommendations case study", href: "/projects/food-recommendations" },
      { label: "Repository", href: "https://github.com/Ashishk9670/food-recommendations" },
    ],
  },
  {
    slug: "accessibility-risk-based-testing",
    eyebrow: "Accessibility & Risk-Based Testing",
    title: "What accessibility scans catch, and what they don't",
    summary:
      "How I audit against WCAG 2.1 and 2.2 A/AA with Playwright and axe-core, and where manual, keyboard, and exploratory testing take over.",
    sections: [
      {
        heading: "How I run an audit",
        label: "Work — Triomics",
        bullets: [
          "Playwright walks every page and every form of the product, and axe-core scans each view against WCAG 2.0, 2.1, and 2.2 A/AA rules plus best practices.",
          "Around 25 custom checks cover what axe can't: keyboard navigation and keyboard traps, focus order, focus not obscured (2.4.11), on-focus and on-input behavior, text resize and text spacing, non-text contrast, use of color, content on hover or focus, reading order, language of parts, link purpose, multiple ways, pointer cancellation, dragging movements, accessible authentication (3.3.8), and status messages.",
          "Findings are grouped by WCAG guideline and impact (critical, serious, moderate, minor) and roll up into VPAT-style conformance reports.",
          "A mandatory accessibility checklist gates every new feature before production, and a monthly review covers everything shipped — up from twice-yearly reporting.",
        ],
      },
      {
        heading: "Where automated scans stop",
        bullets: [
          "axe-core automates only one rule specific to WCAG 2.2 (target size). The rest of 2.2's new criteria need custom checks or a human.",
          "A scan can confirm alt text exists, not that it's meaningful; that a label is present, not that it makes sense; that focus is visible, not that the order is logical.",
          "Some heuristics are low-confidence and produce false positives. Each one needs a human call before it becomes a ticket.",
          "Some criteria — error prevention (3.3.4) and redundant entry (3.3.7) — are tested by hand on purpose, because automating them would change shared QA data.",
          "Media, timing, and gesture criteria are checked manually.",
        ],
      },
      {
        heading: "What manual and exploratory testing add",
        bullets: [
          "Keyboard-only passes through critical journeys, end to end, the way a keyboard user actually moves through the product.",
          "Exploratory sessions on new features, where the question is \"can someone actually complete this?\" rather than \"does it pass a rule?\"",
          "A manual review checklist for everything a rule engine can't judge: meaning, context, and whether the experience makes sense.",
        ],
      },
      {
        heading: "Risk-based: what gets audited first",
        bullets: [
          "New features, before production — that's the checkpoint where a fix is cheapest.",
          "Forms and sign-in get their own dedicated audit alongside the all-pages audit, because that's where an accessibility blocker stops a user outright.",
          "Everything shipped in the month, in the monthly review — so nothing waits half a year to be looked at.",
        ],
      },
      {
        heading: "On this site",
        label: "Public project",
        bullets: [
          "Every push runs an axe-core audit of every page and a Lighthouse accessibility gate that fails the build below 95.",
          "Full keyboard navigation, a skip link, verified contrast in both themes, and a written accessibility statement.",
        ],
      },
    ],
    links: [
      { label: "Accessibility statement for this site", href: "/accessibility" },
      { label: "Writing: WCAG 2.1 AA from scratch", href: "/blog/wcag-2-1-aa-from-scratch" },
    ],
  },
];
