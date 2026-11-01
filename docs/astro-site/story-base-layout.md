---
type: story
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: base-layout
status: planned      # planned | in-progress | changes-requested | staged | released
branch: story/base-layout
worktree_path:       # set by `wi start`
created: 2026-10-31
approved:            # set by `wi approve`
commit_type:         # optional override for the release subject type (default: story=feat, bug=fix, task=chore)
version:             # set by `wi stage`
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the branch's last commit
---

# Base layout, design tokens, and navigation

## Summary

Build the shared shell every page uses: the HTML document, design tokens, typography, header with primary navigation, and footer. Accessibility and responsive behavior are built in here, so every page inherits them. This is where the site's visual identity is set.

## Context

Depends on `astro-scaffold`. Runs in parallel with `content-collections`. The Hugo site has a custom theme with dark mode and a mobile nav; none of its CSS carries over. The design direction is **not decided yet** and blocks approval of this plan (see open questions).

## Scope

**In scope**

- `BaseLayout.astro` with a `title`/`description` prop contract that `seo` extends later
- Design tokens as CSS custom properties: color, type scale, spacing, radius, max width
- Self-hosted font files (no third-party font CDN), if a custom font is chosen
- Header with site name linking home, and primary nav: Experience, Projects, About
- Mobile navigation pattern for narrow viewports
- Footer with social links
- Skip link, landmarks, focus styles, `prefers-reduced-motion` handling
- A 404 page using the layout

**Out of scope**

- Page content (children 4–7)
- Meta tags beyond `<title>` and description (`seo`)
- Dark mode, unless Nathan opts in (open question)

## Requirements

- **R1** — Every page using `BaseLayout` renders `<html lang="en">`, one `<header>`, one `<nav aria-label="Primary">`, one `<main id="main">`, and one `<footer>`.
- **R2** — The first focusable element is a "Skip to main content" link that is visible on focus and moves focus to `<main>`.
- **R3** — The nav link for the current section has `aria-current="page"` (for `/projects/<slug>/`, the Projects link).
- **R4** — Every interactive element shows a visible focus indicator with at least 3:1 contrast against adjacent colors (WCAG 2.4.7, 1.4.11).
- **R5** — Text meets 4.5:1 contrast (3:1 for large text) in every color theme shipped (WCAG 1.4.3).
- **R6** — From 320px to 1920px wide, no page scrolls horizontally, and the content reflows at 400% zoom of a 1280px viewport (WCAG 1.4.10).
- **R7** — Below the mobile breakpoint, the nav is reachable and operable by keyboard and screen reader. If it collapses behind a toggle, the toggle is a `<button>` with `aria-expanded` and `aria-controls`, and Escape closes it and returns focus to the toggle.
- **R8** — With `prefers-reduced-motion: reduce`, no transitions or animations longer than 0ms run.
- **R9** — Unknown routes render a 404 page in the layout with a link home.
- **R10** — No external requests are made for fonts, scripts, or styles at page load.
- **R11** — Footer social links come from the `about` entry, open in the same tab, and have accessible names.

## Acceptance criteria

- **AC1** (R1) — Given any route, when inspected, then exactly one of each landmark exists.
- **AC2** (R2) — Given a fresh page load, when Tab is pressed once, then the skip link is focused and visible; when Enter is pressed, then focus is inside `main`.
- **AC3** (R3) — Given `/projects/`, when inspected, then only the Projects nav link has `aria-current="page"`.
- **AC4** (R5, R4) — Given every route, when axe runs, then there are zero violations.
- **AC5** (R6) — Given a 320px viewport, when any route loads, then `scrollWidth <= innerWidth`.
- **AC6** (R7) — Given a 375px viewport, when the nav toggle is activated by keyboard, then `aria-expanded` becomes `true` and the links are focusable; when Escape is pressed, then it closes and the toggle has focus.
- **AC7** (R9) — Given `/does-not-exist`, when requested on the preview server, then the 404 page renders with a link to `/`.
- **AC8** (R10) — Given a page load, when network requests are recorded, then all are same-origin.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1 | `layout renders landmarks` | `tests/e2e/layout.spec.ts` | Landmark counts on `/` and `/404` |
| T2 | R2 | `skip link moves focus to main` | `tests/e2e/layout.spec.ts` | First Tab focuses skip link; it is visible; Enter moves focus into `main` |
| T3 | R3 | `nav marks current section` | `tests/e2e/layout.spec.ts` | `aria-current` on the right link per route |
| T4 | R4, R5 | `layout has no axe violations` | `tests/e2e/layout.spec.ts` | `expectNoA11yViolations` on `/` and `/404` |
| T5 | R6 | `no horizontal scroll at 320px and 1920px` | `tests/e2e/layout.spec.ts` | `scrollWidth <= innerWidth` at both widths |
| T6 | R7 | `mobile nav toggle is keyboard operable` | `tests/e2e/layout.spec.ts` | AC6 sequence at 375px (skip if nav does not collapse) |
| T7 | R8 | `reduced motion disables transitions` | `tests/e2e/layout.spec.ts` | With `reducedMotion: 'reduce'`, computed `transition-duration` on nav links and toggle is `0s` |
| T8 | R9 | `404 page renders` | `tests/e2e/layout.spec.ts` | AC7 |
| T9 | R10 | `no third-party requests` | `tests/e2e/layout.spec.ts` | Every request URL origin equals the preview origin |
| T10 | R11 | `footer social links have names` | `tests/e2e/layout.spec.ts` | Each footer link has non-empty accessible name and matches `about.social` |

**Not unit testable:** R6's 400% zoom reflow and R4's focus contrast are partly beyond axe; verified manually at 1280px with browser zoom at 400% and with a focus-contrast check, recorded in the progress log.

## Implementation plan

1. [ ] Write design tokens and base styles from the approved design direction — touches `src/styles/tokens.css`, `src/styles/global.css`, `public/fonts/*` — tests T4, T7
2. [ ] Build `BaseLayout` with landmarks and the skip link — touches `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, `tests/e2e/layout.spec.ts` — tests T1, T2
3. [ ] Build header and primary nav with current-section marking and mobile behavior — touches `src/components/Header.astro`, `src/components/Nav.astro` — tests T3, T5, T6
4. [ ] Build footer from the `about` entry — touches `src/components/Footer.astro` — tests T10
5. [ ] Add the 404 page and the same-origin check — touches `src/pages/404.astro` — tests T8, T9

**Must not change:** The `BaseLayout` props `title` and `description` are the contract `seo` builds on; keep their names.

**High-risk steps:** None.

## Risks and open questions

- **Open, blocks approval — design direction.** No visual direction given. Needed before step 1: tone (e.g. minimal/typographic, editorial, technical), color palette or brand colors, typeface preference, and any reference sites Nathan likes. Proposed process: Nathan answers these, then 2–3 token mockups are reviewed before building.
- **Open — dark mode.** The Hugo site has a flicker-free dark mode with a toggle. Carry it forward (adds a theme script, a toggle, and both themes must pass R5), follow system preference only, or ship light only?
- **Open — mobile nav pattern.** Three links may fit at 320px without a toggle, which is simpler and needs no JavaScript. Decide once the type scale exists; T6 is skipped if there is no toggle.
- **Risk — layout depends on `about`.** Footer reads `content-collections`' `about` entry. If `base-layout` lands first, step 4 waits or uses the placeholder.

## Progress log

- 2026-10-31 — Planned.
