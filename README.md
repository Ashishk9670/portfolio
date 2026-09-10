# portfolio

[Ashish Kumar's](https://ashishk9670.github.io/portfolio/) portfolio and resume — written by hand, statically
exported, and checked against WCAG 2.1 AA on every push.

**Live:** [ashishk9670.github.io/portfolio](https://ashishk9670.github.io/portfolio/)

## Why static export, not a hosted Next.js app

GitHub Pages only serves static files, so `next.config.ts` switches to `output: "export"` behind a
`GITHUB_PAGES` env var, with `basePath`/`assetPrefix` set to `/portfolio` in that mode only. Anything
that needs a real server — none of this site does — would need a different host; a resume site
doesn't earn that complexity.

## What ships on every push

- `next build` in both modes (default and `GITHUB_PAGES=true`) — the two configs diverge just enough
  (basePath, raw `<a href>` links) that only building one has let bugs through before.
- Lint and typecheck.
- An axe-core accessibility audit (`scripts/axe-check.mjs`) across every route.
- A Lighthouse CI run, gated on accessibility ≥0.95.
- The Playwright e2e suite (`e2e/*.spec.ts`) — navigation, content, theme, and mobile nav — against a
  production build.
- On `main`, a deploy to GitHub Pages.

The e2e suite also runs on its own schedule (`.github/workflows/e2e.yml`), independent of a push, so a
regression surfaces even on a day nothing changed here.

## Companion project

[`ashish-portfolio-mcp`](https://github.com/Ashishk9670/ashish-portfolio-mcp) exposes this site's data
as MCP tools. `npm run export:data` (a `prebuild` step) writes `lib/data.ts` / `lib/posts.ts` out as
static JSON under `public/data/`, which that server fetches at request time — one source of truth,
two deploys, no duplicated resume data.

## Local development

```bash
npm install
npm run dev              # http://localhost:3000
```

```bash
npm run build             # default build
GITHUB_PAGES=true npm run build   # GitHub Pages build — basePath, static export
npm run lint
npm run test:a11y         # needs a server already running on :3000
npm run test:lighthouse   # needs a server already running on :3000
npm run test:e2e
```

## Structure

```
src/app/          routes (App Router)
src/components/   shared UI
src/content/posts/  blog posts, MDX
src/lib/          data.ts (single source of truth for resume content), seo.ts, basePath.ts
e2e/              Playwright specs
scripts/          axe audit, OG image generation, resume PDF generation
```
