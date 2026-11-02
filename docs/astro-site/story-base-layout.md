---
type: story
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: base-layout
status: staged
branch: story/base-layout
worktree_path: /home/nathan/development/nathanhealea-com/nathanhealea-com-worktrees/story-base-layout
created: 2026-10-31
approved: 2026-11-01
commit_type:         # optional override for the release subject type (default: story=feat, bug=fix, task=chore)
version: 0.1.0
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the branch's last commit
---

# Base layout, design tokens, and navigation

## Summary

Build the shared shell every page uses: the HTML document, design tokens, typography, header with primary navigation, and footer. Accessibility and responsive behavior are built in here, so every page inherits them. This is where the site's visual identity is set.

## Context

Depends on `astro-scaffold`. `content-collections` has landed, so the `about` entry exists (placeholder content). The Hugo site's dark "Spatial" theme (Inter, cyan/indigo) does not carry over.

Design direction decided 2026-11-01 through `/hone:design` with taste-skill (`design-taste-frontend`) as the direction source: **The Public Report**. It's a public employee's annual report: one axis at 42%, paper and ink, fir and slate color pages, Source Serif 4 display with Public Sans text, one theme. The locked pack, `design/DESIGN-SYSTEM.md` and `design/VOICE.md`, is the contract for this story and children 4–7. Any deviation edits the pack in its own commit. The four explored directions are in the planning session's scratchpad, not in the repo.

## Scope

**In scope**

- The locked design pack committed at `design/DESIGN-SYSTEM.md` and `design/VOICE.md`
- `BaseLayout.astro` with a `title`/`description` prop contract that `seo` extends later
- Design tokens as CSS custom properties from the pack: color, type scale, spacing, frame and axis, motion
- Self-hosted, unmodified upstream woff2 files for Source Serif 4 (adobe-fonts/source-serif) and Public Sans (uswds/public-sans), both OFL 1.1, with their license files
- Header with site name linking home, and primary nav: Experience, Projects, About
- Narrow-viewport nav that wraps under the wordmark (no toggle, no script)
- Footer as a fir color page: name, `about.location`, social links
- Skip link, landmarks, focus styles, `prefers-reduced-motion` handling
- A 404 page using the layout

**Out of scope**

- Page content (children 4–7), including the mosaic band, color-page statements, and taste-skill's per-page floors (pictures, motion count, interactive element), which apply to content pages, not the shell
- Meta tags beyond `<title>` and description (`seo`)
- Dark mode and any theme toggle (decided: one theme)

## Requirements

- **R1** — Every page using `BaseLayout` renders `<html lang="en">`, one `<header>`, one `<nav aria-label="Primary">`, one `<main id="main">`, and one `<footer>`.
- **R2** — The first focusable element is a "Skip to main content" link that is visible on focus and moves focus to `<main>`.
- **R3** — The nav link for the current section has `aria-current="page"` (for `/projects/<slug>/`, the Projects link).
- **R4** — Every interactive element shows a visible focus indicator with at least 3:1 contrast against adjacent colors (WCAG 2.4.7, 1.4.11).
- **R5** — Text meets 4.5:1 contrast (3:1 for large text) in every color theme shipped (WCAG 1.4.3).
- **R6** — From 320px to 1920px wide, no page scrolls horizontally, and the content reflows at 400% zoom of a 1280px viewport (WCAG 1.4.10).
- **R7** — At every width from 320px up, all three primary nav links are visible without a toggle, fit inside the viewport, and are reachable by Tab in reading order (wordmark, Experience, Projects, About).
- **R8** — With `prefers-reduced-motion: reduce`, no transitions or animations longer than 0ms run.
- **R9** — Unknown routes render a 404 page in the layout with a link home.
- **R10** — No external requests are made for fonts, scripts, or styles at page load.
- **R11** — Footer social links come from the `about` entry, open in the same tab, and have accessible names.
- **R12** — Rendered pages use only the pack's typefaces: computed `font-family` resolves to Source Serif 4 on `h1` and to Public Sans on `body`, and both font files load from the site's own origin.

## Acceptance criteria

- **AC1** (R1) — Given any route, when inspected, then exactly one of each landmark exists.
- **AC2** (R2) — Given a fresh page load, when Tab is pressed once, then the skip link is focused and visible; when Enter is pressed, then focus is inside `main`.
- **AC3** (R3) — Given `/projects/`, when inspected, then only the Projects nav link has `aria-current="page"`.
- **AC4** (R5, R4) — Given every route, when axe runs, then there are zero violations.
- **AC5** (R6) — Given a 320px viewport, when any route loads, then `scrollWidth <= innerWidth`.
- **AC6** (R7) — Given a 320px viewport, when the page loads, then all three nav links are visible with bounding boxes inside the viewport; when Tab is pressed after the skip link, then focus moves through wordmark, Experience, Projects, About in that order.
- **AC7** (R9) — Given `/does-not-exist`, when requested on the preview server, then the 404 page renders with a link to `/`.
- **AC8** (R10) — Given a page load, when network requests are recorded, then all are same-origin.
- **AC9** (R12) — Given `/`, when fonts have loaded, then `document.fonts` reports Source Serif 4 and Public Sans as `loaded` and the `h1` and `body` computed families start with them.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1 | `layout renders landmarks` | `tests/e2e/layout.spec.ts` | Landmark counts on `/` and `/404` |
| T2 | R2 | `skip link moves focus to main` | `tests/e2e/layout.spec.ts` | First Tab focuses skip link; it is visible; Enter moves focus into `main` |
| T3 | R3 | `nav marks current section` | `tests/unit/nav.test.ts`, `tests/e2e/layout.spec.ts` | Unit: `currentSection` maps each section path, slug paths and missing trailing slash to its link, and lookalike prefixes to none. E2E: on `/`, three links with the right names and hrefs, none current |
| T4 | R4, R5 | `layout has no axe violations` | `tests/e2e/layout.spec.ts` | `expectNoA11yViolations` on `/` and `/404` |
| T5 | R6 | `no horizontal scroll at 320px and 1920px` | `tests/e2e/layout.spec.ts` | `scrollWidth <= innerWidth` at both widths |
| T6 | R7 | `narrow nav stays visible and in tab order` | `tests/e2e/layout.spec.ts` | AC6 at 320px |
| T7 | R8 | `reduced motion disables transitions` | `tests/e2e/layout.spec.ts` | With `reducedMotion: 'reduce'`, computed `transition-duration` and `animation-duration` on nav links and the page heading are `0s` |
| T8 | R9 | `404 page renders` | `tests/e2e/layout.spec.ts` | AC7 |
| T9 | R10 | `no third-party requests` | `tests/e2e/layout.spec.ts` | Every request URL origin equals the preview origin |
| T10 | R11 | `footer social links have names` | `tests/e2e/layout.spec.ts` | Each footer link has non-empty accessible name and matches `about.social` |
| T11 | R12 | `pack typefaces load from same origin` | `tests/e2e/layout.spec.ts` | AC9 |

**Not unit testable:** R6's 400% zoom reflow and R4's focus contrast are partly beyond axe; verified manually at 1280px with browser zoom at 400% and with a focus-contrast check, recorded in the progress log. Fidelity to the design pack (tokens, frame, banned devices) is checked by screenshots at 1440, 768 and 390px of `/` and `/404`, critiqued against `design/DESIGN-SYSTEM.md` and taste-skill's house rules. This is taste-skill's no-inspector fallback, because auto mode blocks running its `inspect.mjs`/`lint.mjs` (downloaded code). The critique is recorded in the progress log.

## Implementation plan

1. [x] Commit the locked design pack — touches `design/DESIGN-SYSTEM.md`, `design/VOICE.md` — tests none (documentation)
2. [x] Write design tokens, base styles, and self-hosted fonts from the pack — touches `src/styles/tokens.css`, `src/styles/global.css`, `public/fonts/*` (woff2 plus OFL license files fetched from the upstream GitHub releases) — tests T4, T7, T11
3. [x] Build `BaseLayout` with landmarks and the skip link — touches `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, `tests/e2e/layout.spec.ts` — tests T1, T2
4. [x] Build header and primary nav with current-section marking and the wrapping narrow layout — touches `src/components/Header.astro`, `src/components/Nav.astro` — tests T3, T5, T6
5. [x] Build the footer color page from the `about` entry — touches `src/components/Footer.astro` — tests T10
6. [x] Add the 404 page and the same-origin check, then run the screenshot critique — touches `src/pages/404.astro` — tests T8, T9

**Must not change:** The `BaseLayout` props `title` and `description` are the contract `seo` builds on; keep their names. Token names and values come from `design/DESIGN-SYSTEM.md`; component code never introduces a color, size, or motion that is not in the pack.

**High-risk steps:** None.

## Risks and open questions

- **Decided — design direction.** The Public Report, locked in `design/DESIGN-SYSTEM.md` and `design/VOICE.md` (2026-11-01).
- **Decided — dark mode.** One theme, no toggle, no theme script.
- **Decided — narrow nav.** No toggle. The nav wraps under the wordmark as one row of three links.
- **Risk — taste-skill gate cannot run.** Auto mode blocks running taste-skill's `inspect.mjs` and `lint.mjs` as downloaded code. The screenshot critique replaces them. To use the real inspector, add a Bash permission rule for `node ~/.claude/skills/design-taste-frontend/scripts/*`.
- **Risk — taste-skill floors vs. WCAG.** Its per-page minimum of 8 moving elements applies to children 4–7, not here. Every move in the pack drops to 0ms under reduced motion (R8), so the floor can only ever be met with motion allowed.
- **Risk — font licensing.** Source Serif's Reserved Font Name "Source" means the woff2 files ship exactly as released. No subsetting or renaming without first checking OFL §3.
- **Resolved — `about` dependency.** `content-collections` has landed. The footer reads the placeholder `about` entry until `content-migration`.

## Progress log

- 2026-10-31 — Planned.
- 2026-11-01 — Design direction decided via /hone:design + taste-skill: The Public Report (one theme, serif display + sans text, no-toggle nav). Plan revised: design pack step added, R7/AC6/T6 rewritten for no toggle, R12/AC9/T11 added for self-hosted pack fonts, open questions resolved.
- 2026-11-01 — Plan approved.
- 2026-11-01 — Started implementation on branch story/base-layout at e14e121.
- 2026-11-01 — wi start branched from origin/v10 (e14e121), 19 commits behind local v10; merged local v10 (94e210b) to pick up content-collections. Epic status conflict resolved: content-collections released, base-layout in-progress.
- 2026-11-01 — Step 2: T4, T7 passed before implementation (T4 is a regression guard; T7 is made meaningful by a motion-allowed counterpart test that failed first). T11 red until step 3: the home page has no body-font text yet.
- 2026-11-01 — Step 4: T3 split into a unit test of currentSection (src/lib/nav.ts) plus an e2e check on /, because /experience/, /projects/ and /about/ don't exist until children 4-6. T5 passed before the nav rendered (nothing to overflow); it passes with the nav in place.
- 2026-11-01 — Step 6 critique (screenshots of / and /404 at 1440, 768, 390, plus 320): fixed blank paper below the footer on short pages (sticky footer), an empty zone left of the axis on the 404 (side note), and a header shrink regression from the flex body. Manual checks: 320px reflow is equivalent to 1280px at 400% zoom with no horizontal scroll; focus rings are fir on paper 10.4:1, paper on fir 10.4:1, and ink around the ink skip link offset on paper 16.5:1. The home page is still a bare h1 placeholder until home-page (child 7).
- 2026-11-01 — Stage review: code-reviewer MED (RISE vs pack, persistent clip) fixed via pack amendment 731dca4 + 8982156; a11y LOW (same clip) fixed; code LOW (404 offset) fixed 8f78151; cycle-2 a11y LOW (axe ran mid-fade) fixed 10bf3e7; cycle-2 code note (MARK on focus) fixed 409d92e; mutation audit: 18 mutants, 4 survived plus 2 weak assertions, all now caught (commit after 409d92e). Font binaries verified byte-identical to upstream release zips. No changelog file in the project; skipped.
- 2026-11-01 — Staged: verification passed; version 0.0.2 → 0.1.0; no changelog file.
