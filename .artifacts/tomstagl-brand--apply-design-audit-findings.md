# PR: a11y: single h1 per page, AA byline contrast; fix broken test run

Branch: `design-audit-fixes/h1-contrast-test` → `master`
Commit: e4afe2af9714f3e4ea416ecbf5d1978805eb8b4c

## Title

a11y: single h1 per page, AA byline contrast; fix broken test run

## Body

Fixes three defects found in an audit against commit `d8dd7964159a0c8289e3b8b424b9574fec881a51`, verified against current `master` before changing anything.

### 1. Duplicate `<h1>` per page

`Header.tsx` unconditionally rendered a site-title `<h1>` inside `Layout`, and every page also renders its own top-level `<h1>` (home `Cover`, `about.js`, `blog.js`, `blog-post.js`, `404.js`, `impressum.js` via `Headers.tsx`). Two `<h1>`s per route breaks one-h1-per-page heading hierarchy (WCAG 2.4.6 / `page-has-heading-one`).

Fix: demoted the site-title element in `Header.tsx` from `<h1>` to `<span>` with the same classes — every route already supplies its own `<h1>`, so nothing else needs to change.

### 2. Byline text fails WCAG AA contrast

`text-sm text-slate-400` (`#94a3b8`) was used for real body copy — the "Published …" date in `blog-post.js` and the post-list date in `blogPost.tsx` — not decoration. Computed against the actual white background both render on (confirmed via `Layout`/`Section`), that's **2.56:1**, under the 4.5:1 AA minimum for normal-size text.

Fix: bumped both to `text-slate-500` (`#64748b`), which computes to **4.76:1** on white — passes AA with margin.

### 3. `yarn test` couldn't run its one test

`yarn install --frozen-lockfile && NODE_ENV=test yarn test` failed with `Cannot find module '@testing-library/dom'`. `@testing-library/react@16.0.1` needs `@testing-library/dom@^10.0.0` as a peer, but it wasn't a direct dependency anywhere.

Added `@testing-library/dom` as a devDependency. That surfaced a second, previously-masked failure: `ReferenceError: document is not defined`. Jest 28+ no longer bundles jsdom by default and requires the separate `jest-environment-jsdom` package plus an explicit `testEnvironment` setting; this project had neither (only the unrelated, older `jest-environment-jsdom-global`, which was already listed in `yarn install` output as having an unmet peer dependency on `jest-environment-jsdom`). Added `jest-environment-jsdom` as a devDependency and set `testEnvironment: 'jsdom'` in `jest.config.js`.

Test was not skipped, `.skip`'d, or deleted at any point.

## Out of scope (explicitly not touched)

- No Gatsby or TailwindCSS version changes.
- No newsletter signup added.
- Palette, footer, nav, and blog SEO copy untouched.
- No general accessibility sweep — only the three defects above.

## Verification

- `rm -rf node_modules && yarn install --frozen-lockfile` — succeeds, no `@testing-library/dom` unmet-peer warning.
- `NODE_ENV=test yarn test` (exact repro command from the audit) — **PASS**, 1/1 tests, exit 0.
- `yarn build` — **fails**, but at the DatoCMS `createSchemaCustomization` step (`API token must be provided!`), before touching any of the changed files. This environment has no DatoCMS API token configured and `site-api.datocms.com` / `tomstagl.com` may be refused by egress here regardless — this is a pre-existing environment limitation, not something introduced by this change. Stating this plainly rather than claiming a green build.
- `yarn eslint` — fails on unrelated pre-existing CLI/config mismatch (`--ignore-path` is not supported by the project's `eslint.config.js` flat config); confirmed unrelated to the changed files and out of scope for these three defects.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01Ehu4bkD5eaZEGrQGxVECbL
