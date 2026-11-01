---
type: task
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: astro-scaffold
status: in-progress
branch: task/astro-scaffold
worktree_path: /Users/nhealea/Personal/Development/nathanhealea-com-worktrees/task-astro-scaffold
created: 2026-10-31
approved: 2026-10-31
commit_type:         # optional override for the release subject type (default: story=feat, bug=fix, task=chore)
version:             # set by `wi stage`
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the branch's last commit
---

# Scaffold Astro project with test tooling

## Summary

Create the Astro project on `v10` with TypeScript, npm scripts, Vitest, and Playwright with axe, so every later work item has a build to extend and a test harness to prove its requirements. No user-facing content ships here beyond a placeholder home page.

## Context

`v10` contains only the 2021 initial commit. Its `.gitignore` and `README.md` are deleted in the working tree and not yet committed. Node 24.19.0 and npm are installed locally; bun and pnpm are not. There is no test framework. Testing tools were chosen in epic planning: Vitest for schemas and helpers, and Playwright with `@axe-core/playwright` for rendered pages. Part of epic `astro-site` (child 1).

## Scope

**In scope**

- Astro project via the official `create astro` minimal template, TypeScript strict
- `site: 'https://nathanhealea.com'` in `astro.config.mjs`
- npm scripts: `dev`, `build`, `preview`, `typecheck`, `test`, `test:e2e`
- Vitest config and directory `tests/unit/`
- Playwright config (Chromium) serving the built site via `astro preview`, directory `tests/e2e/`
- Shared axe helper used by every later page test
- `.gitignore` for Node, Astro, and Playwright output
- `test_command` and `verify_commands` in `CLAUDE.md`

**Out of scope**

- Any real page, layout, or content (children 2–7)
- SEO integrations (child 8)
- Hosting config (child 10)
- A README (none requested; delete the one the template generates)
- Linting and formatting tools (not requested)

## Requirements

- **R1** — `npm ci && npm run build` on a clean checkout exits 0 and writes a static `dist/index.html`.
- **R2** — `npm run typecheck` runs `astro check` and exits 0 on the scaffold.
- **R3** — `npm test` runs the Vitest suite and exits 0.
- **R4** — `npm run test:e2e` builds nothing itself, serves `dist/` with `astro preview`, and runs Playwright against it.
- **R5** — A helper `expectNoA11yViolations(page)` fails a test when axe reports any violation tagged `wcag2a`, `wcag2aa`, `wcag21a`, or `wcag21aa`, and lists each violation's id and target in the failure message.
- **R6** — The placeholder home page has `lang="en"`, a `<title>`, and a `<main>` landmark, and passes the axe helper.

## Acceptance criteria

- **AC1** (R1) — Given a clean checkout, when `npm ci && npm run build` runs, then it exits 0 and `dist/index.html` exists.
- **AC2** (R2) — Given the scaffold, when `npm run typecheck` runs, then it exits 0.
- **AC3** (R3) — Given the scaffold, when `npm test` runs, then Vitest reports at least one passing test and exits 0.
- **AC4** (R4, R6) — Given a built `dist/`, when `npm run test:e2e` runs, then the home page loads with status 200 and passes the axe check.
- **AC5** (R5) — Given a page with an `<img>` missing `alt`, when the helper runs, then the test fails and the message includes `image-alt`.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1 | `npm ci && npm run build` | — (verify command) | Exit 0; `dist/index.html` exists |
| T2 | R2 | `npm run typecheck` | — (verify command) | Exit 0 |
| T3 | R3 | `vitest runs` | `tests/unit/smoke.test.ts` | Suite discovered and passes |
| T4 | R4, R6 | `home page loads and is accessible` | `tests/e2e/smoke.spec.ts` | Status 200, `html[lang=en]`, one `main`, non-empty title, `expectNoA11yViolations` passes |
| T5 | R5 | `axe helper reports violations` | `tests/e2e/a11y-helper.spec.ts` | `page.setContent('<img src="x.png">')` then helper throws with `image-alt` in the message |

**Not unit testable:** None.

## Implementation plan

1. [x] Scaffold Astro minimal template with TypeScript strict, set `site`, add `.gitignore`, delete the generated README, set `engines.node` — touches `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore` — tests T1
2. [x] Add `@astrojs/check` and `typescript`, and the `typecheck` script — touches `package.json`, `package-lock.json` — tests T2
3. [x] Add Vitest with config and smoke test, and the `test` script — touches `package.json`, `package-lock.json`, `vitest.config.ts`, `tests/unit/smoke.test.ts` — tests T3
4. [x] Add Playwright (Chromium) and `@axe-core/playwright`, config serving `dist/` via `astro preview`, the axe helper, and the `test:e2e` script — touches `package.json`, `package-lock.json`, `playwright.config.ts`, `tests/e2e/helpers/a11y.ts`, `tests/e2e/a11y-helper.spec.ts` — tests T5
5. [x] Make the placeholder home page accessible and add the e2e smoke test — touches `src/pages/index.astro`, `tests/e2e/smoke.spec.ts` — tests T4
6. [x] Record `test_command` and `verify_commands` (`npm run typecheck`, `npm run build`, `npm test`, `npm run test:e2e`) in the Work Item Workflow section — touches `CLAUDE.md` — tests none (config only)

**Must not change:** `base_branch: v10` in `CLAUDE.md`.

**High-risk steps:** None.

## Risks and open questions

- **Prerequisite — clean base.** `v10` has uncommitted deletions of `.gitignore` and `README.md` and untracked `CLAUDE.md` and `docs/`. These must be committed (or the deletions reverted) before `wi start`. Nathan's call.
- **Open — browsers.** Proposed: Chromium only in Playwright, to keep installs small. Add Firefox and WebKit if Nathan wants cross-browser coverage.
- **Open — Node version on Cloudflare.** `engines.node` is set to the local major (24). Child 10 confirms Cloudflare Pages supports it; not verified here.
- **Dependencies added.** `astro`, `@astrojs/check`, `typescript`, `vitest`, `@playwright/test`, `@axe-core/playwright`. Approving this plan approves these. Versions are whatever is current stable at build time, pinned by `package-lock.json`.
- **Verify at build time.** Exact `create astro` flags and the Astro major version: check docs.astro.build rather than relying on recall.

## Progress log

- 2026-10-31 — Planned.
- 2026-10-31 — Plan approved.
- 2026-10-31 — Started on branch task/astro-scaffold from v10.
- 2026-10-31 — Steps 1-3: Astro 7.4.4 scaffolded, astro check and Vitest wired. T3 written inline rather than by test-engineer: it is a tooling smoke test with no behavior to specify, so a red phase is not meaningful (npx fetched vitest on the fly and it passed before install).
- 2026-10-31 — Build complete. Steps 4-6: Playwright webServer uses astro preview --ignore-lock because Astro 7 auto-backgrounds preview under an agent shell (withastro/astro#17903). CLAUDE.md verify_commands take effect once merged to v10 (wi reads the main checkout's CLAUDE.md). npm blocks the fsevents install script (optional macOS watcher); build and tests unaffected. Full verify green from clean npm ci.
