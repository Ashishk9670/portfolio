// Verbatim excerpts from public repos (trimmed with "// …" only). Never edit the code itself.

export type CodeSnippet = { file: string; label: string; language: string; code: string; source: string };

export const snippets = {
  orderFlow: {
    file: "tests/e2e/order-flow.spec.ts",
    label: "@e2e @smoke",
    language: "ts",
    source: "https://github.com/Ashishk9670/plawight-ui-api-wss-db-kafka",
    code: `/**
 * UI -> REST / GraphQL -> Database -> Kafka / WebSocket -> UI
 * One business transaction verified at every layer.
 */
// …
await test.step('DB: order row, item row and stock', async () => {
  // …
  const stock = await db.queryOne<{ stock: number }>(
    'SELECT stock FROM products WHERE id = $1', [product.id]);
  expect(stock!.stock).toBe(23);
});

await test.step('Kafka: order.created event', async () => {
  const event = await listener.waitForEvent(
    (e) => e.value?.order?.id === orderId && e.value.eventType === 'order.created',
  );
  expect(validate(OrderEventSchema, event.value).order.total).toBe(39.98);
});`,
  },
  mcpTool: {
    file: "src/tools.ts",
    label: "MCP SDK",
    language: "ts",
    source: "https://github.com/Ashishk9670/ashish-portfolio-mcp",
    code: `export function registerPortfolioTools(server: McpServer) {
  server.registerTool(
    "get_experience",
    {
      title: "Get work experience",
      description:
        "Ashish Kumar's work experience history — company, role, dates, responsibilities, quantified results, and business impact for each position.",
    },
    async () => jsonResult(await getExperience())
  );
  // … 6 more tools
}`,
  },
  sauceJourney: {
    file: "tests/journey/full-purchase-journey.spec.ts",
    label: "@account @journey",
    language: "ts",
    source: "https://github.com/Ashishk9670/sauce-demo-playwright-suite",
    code: `test.describe('Full purchase journey @account @journey', () => {
  test('signup, login, add to cart, checkout, and browse site pages', async ({
    registerPage, loginPage, homePage, productPage, cartPage, checkoutPage, page,
  }) => {
    const user = buildDisposableUser();

    await test.step('sign up as a new customer', async () => {
      await registerPage.goto();
      await registerPage.register(user);
      await expect(homePage.header.logOutLink).toBeVisible();
    });
    // …
  });
});`,
  },
  rateLimit: {
    file: "lib/rateLimit.ts",
    label: "Upstash Redis",
    language: "ts",
    source: "https://github.com/Ashishk9670/food-recommendations",
    code: `// Redis-backed so limits actually hold across Vercel's ephemeral serverless
// instances — the previous in-memory Map only limited requests hitting the
// same warm instance, which on serverless is close to no protection at all.
export async function isRateLimited(key: string, limit: number, windowMs: number): Promise<boolean> {
  const { success } = await getLimiter(limit, windowMs).limit(key);
  return !success;
}`,
  },
  a11yGate: {
    file: "lighthouserc.json",
    label: "CI gate",
    language: "json",
    source: "https://github.com/Ashishk9670/portfolio",
    code: `"assertions": {
  "categories:accessibility": ["error", { "minScore": 0.95 }],
  "categories:best-practices": ["warn", { "minScore": 0.9 }],
  "categories:seo": ["warn", { "minScore": 0.9 }]
}`,
  },
  smokeTier: {
    file: ".github/workflows/ci.yml",
    label: "risk tiers",
    language: "yaml",
    source: "https://github.com/Ashishk9670/plawight-ui-api-wss-db-kafka",
    code: `# Pull requests and pushes run @smoke; the nightly schedule
# and a manual "full" run execute everything.
if [ "$FULL_RUN" = "true" ]; then GREP=""; else GREP="--grep @smoke"; fi`,
  },
  openApiContract: {
    file: "utils/openapi-validator.ts",
    label: "contract gate",
    language: "ts",
    source: "https://github.com/Ashishk9670/plawight-ui-api-wss-db-kafka",
    code: `/**
 * Validates a response body against the OpenAPI spec of the AUT (aut/openapi.json).
 * Returns a list of readable violations; empty means the response matches the contract.
 */
export function openApiViolations(method: string, pathTemplate: string, status: number, body: unknown): string[] {
  const op = spec.paths?.[pathTemplate]?.[method.toLowerCase()];
  if (!op) return [\`\${method.toUpperCase()} \${pathTemplate} is not in the OpenAPI spec\`];
  // …
}`,
  },
  aiWorkflow: {
    file: "ai/README.md",
    label: "human-reviewed",
    language: "md",
    source: "https://github.com/Ashishk9670/plawight-ui-api-wss-db-kafka",
    code: `AI agent -> Playwright MCP -> browser -> AUT -> human-reviewed Playwright tests

1. Planner: explores the AUT from the seed and writes specs/<feature>.md.
2. You review and edit the plan.
3. Generator: turns each scenario into a spec under tests/.
4. Healer: runs failing tests, debugs, and patches them. Review its diffs.
   A healer that edits an assertion to make a test pass may be hiding a product bug.`,
  },
} satisfies Record<string, CodeSnippet>;

// Real nightly run of the public multi-layer framework (GitHub Actions run 40072611883).
export const nightlyRun = {
  repo: "plawight-ui-api-wss-db-kafka",
  url: "https://github.com/Ashishk9670/plawight-ui-api-wss-db-kafka/actions/runs/40072611883",
  date: "Oct 24, 2026",
  wallClock: "2m 57s",
  jobs: [
    { name: "typecheck + lint", duration: "0:20" },
    { name: "api (2 shards)", duration: "1:04" },
    { name: "ui-chromium (2 shards)", duration: "1:47" },
    { name: "db", duration: "1:29" },
    { name: "messaging (Kafka)", duration: "1:17" },
    { name: "websocket", duration: "1:06" },
    { name: "e2e", duration: "2:01" },
    { name: "ui-firefox · ui-webkit", duration: "1:45" },
    { name: "mobile-chrome · mobile-safari", duration: "1:58" },
  ],
};

export const projectSnippets: Record<string, CodeSnippet> = {
  "multi-layer-playwright-framework": snippets.orderFlow,
  "portfolio-mcp-server": snippets.mcpTool,
  "sauce-demo-playwright-suite": snippets.sauceJourney,
  "food-recommendations": snippets.rateLimit,
};
