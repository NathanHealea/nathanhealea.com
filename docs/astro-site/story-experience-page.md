---
type: story
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: experience-page
status: in-progress
branch: story/experience-page
worktree_path: /home/nathan/development/nathanhealea-com/nathanhealea-com-worktrees/story-experience-page
created: 2026-10-31
approved: 2026-11-01
commit_type:         # optional override for the release subject type (default: story=feat, bug=fix, task=chore)
version:             # set by `wi stage`
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the merge commit
---

# Work experience page

## Summary

Add `/experience/`, a reverse-chronological list of roles drawn from the `experience` collection and laid out on the design pack's 42% axis. Each role shows company, title, location, dates, highlights, and tech, marks the current role with the word "Current", and puts the longer details behind a native disclosure. This is the page a visitor uses to judge Nathan's career at a glance.

## Context

Depends on `content-collections` (schema, `getExperience()`, `formatRange()`) and `base-layout` (shell, tokens, `global.css`), both released. Token names follow `token-rename` (v0.2.1): `--color-*`, `--text-*`, `--spacing-*`, `--container-*`. The Hugo site's most recent feature was "expandable experience details", so the short-highlights / long-details split is a pattern Nathan already chose.

Design comes from `design/DESIGN-SYSTEM.md` ("The Public Report"). The Frame rule sets the layout: at 960px and wider, headings and body start at 42% of the frame, and the 0–42% zone holds side notes (role, dates, place) at small size, top-aligned with the heading. Below 960px the axis collapses to the left margin and side notes move above their heading. Section gap is `--spacing-section`, and gaps inside a section are at most `--spacing-inner`. Motion: the page `h1` uses RISE (already global). Each role uses ENTER (its parts rise 24px with opacity, 700ms, 80ms stagger, once), and the content is visible without script. Banned: eyebrows, 01/02 numbering, hairlines, tiny tracked caps, borders, shadows, pills.

`placeholder-current.md` has no `end` and no body, and `placeholder-past.md` has both. Together they cover the current label, the disclosure, and the no-disclosure case without new fixtures. `formatRange` renders an open range as "Mon YYYY – Present".

## Scope

**In scope**

- `/experience/` page in `BaseLayout`
- `ExperienceItem` component, reused on the home page
- Side-note layout on the axis, per the pack's Frame rule
- A "Current" label on roles with no `end`
- A disclosure for each role's details (the markdown body)
- ENTER motion for each role, dropping to 0ms under reduced motion

**Out of scope**

- A separate page per role (not requested)
- Filtering or search by technology
- The home page's compact variant of `ExperienceItem` (belongs to `home-page`)
- A timeline graphic (the pack's Frame rule gives a list on the axis instead)

## Requirements

- **R1** — `/experience/` lists every experience entry in `getExperience()` order.
- **R2** — Each role renders as an `<article>` with an `<h2>` of the title and company. It shows location, the `formatRange` date text inside a `<time>`-marked range, highlights as a list, and tech as a list.
- **R3** — Each role's markdown body is behind a native `<details>`/`<summary>` disclosure, collapsed by default, whose summary text names the role (e.g. "Details: Programmer Analyst II at University of Oregon").
- **R4** — A role with an empty body shows no disclosure.
- **R5** — The page has one `<h1>` ("Experience") and no skipped heading levels.
- **R6** — The page passes the axe helper and the 320px no-horizontal-scroll check.
- **R7** — A role with no `end` shows the visible text "Current" in its side note. A role with an `end` does not. The label is plain text in sentence case, at small size, weight 600, ink on paper. It is not uppercase, letter-spaced, boxed or shown by color alone, and it is part of the article's text, so screen readers read it.
- **R8** — At 960px and wider, each role's side note (dates, location, and "Current" when present) sits in the 0–42% zone, top-aligned with the `<h2>`, and the `<h2>` starts at the axis. Below 960px the side note comes before the `<h2>` in a single column. DOM order is side note, then heading, so the reading order is the same at every width.
- **R9** — ENTER motion runs once per role, using transform and opacity only. Under `prefers-reduced-motion: reduce` its duration is 0ms. All content is visible with JavaScript disabled.

## Acceptance criteria

- **AC1** (R1) — Given the placeholder entries, when `/experience/` loads, then articles appear newest first.
- **AC2** (R3) — Given a role with a body, when its summary is activated by keyboard, then the details become visible.
- **AC3** (R4) — Given a role with no body, when rendered, then it has no `<details>`.
- **AC4** (R5, R6) — Given the page, when axe runs, then there are zero violations.
- **AC5** (R7) — Given the current placeholder role, when the page renders, then its article contains the text "Current", and the past role's article does not.
- **AC6** (R8) — Given a 1280px viewport, when the page renders, then each `<h2>`'s left edge is at 42% of the frame (±1px) and the side note's left edge is at the frame's left margin. Given 320px, the side note is above the `<h2>`.
- **AC7** (R9) — Given reduced motion, when the page loads, then every article's computed animation duration is 0s. Given JavaScript disabled, all role content is visible.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1 | `lists roles newest first` | `tests/e2e/experience.spec.ts` | Article `h2` order matches placeholder order by `start` desc |
| T2 | R2 | `role shows required fields` | `tests/e2e/experience.spec.ts` | Location, date text in `<time>`, highlight items, and tech items present in each article |
| T3 | R3 | `details disclosure opens by keyboard` | `tests/e2e/experience.spec.ts` | Focus summary, press Enter, body content visible; summary text names the role; collapsed before |
| T4 | R4 | `no disclosure for empty body` | `tests/e2e/experience.spec.ts` | The current placeholder's article has no `details` |
| T5 | R5, R6 | `experience page is accessible and reflows` | `tests/e2e/experience.spec.ts` | One `h1`; heading levels sequential; `expectNoA11yViolations`; `scrollWidth <= innerWidth` at 320px |
| T6 | R7 | `marks only the current role` | `tests/e2e/experience.spec.ts` | Current article contains visible text "Current"; past article does not; label computed `text-transform: none`, `letter-spacing` normal or 0, `font-weight` 600; contrast ≥ 4.5:1 |
| T7 | R8 | `side note sits on the axis` | `tests/e2e/experience.spec.ts` | At 1280px: `h2` left = frame left + 42% of frame width (±1px), side note left = frame left, tops aligned (±2px); at 320px: side note bottom ≤ `h2` top; DOM order side note before `h2` |
| T8 | R9 | `role entry motion respects reduced motion` | `tests/e2e/experience.spec.ts` | Under `reducedMotion: 'reduce'`, each article's animation duration is 0s; with `javaScriptEnabled: false`, every article's `h2` and highlights are visible |
| T8 | R9 | `role entry motion runs when motion is allowed` | `tests/e2e/experience.spec.ts` | With motion allowed, each article has finite animations whose keyframes touch only transform and opacity, start at opacity 0 and translateY 24px, run 700ms, and stagger by 80ms; guards against the global reduced-motion rule passing T8 without ENTER |
| T9 | R2, R3, R4, R7 | `ExperienceItem renders fields, current label and disclosure` | `tests/unit/experience-item.test.ts` | Via `experimental_AstroContainer` (as `nav-render.test.ts` does): an entry without `end` renders "Current" and "– Present"; one with `end` renders neither. With `hasDetails` and slot content, renders `<details>` with the slot inside and a `<summary>` naming "Details: <title> at <company>"; without `hasDetails`, renders no `<details>` |

**Not unit testable:** R8's visual alignment and R9's motion need a browser and are covered by T7 and T8 in Playwright.

## Implementation plan

1. [x] Build `ExperienceItem` with fields, side note, current label and disclosure — touches `src/components/ExperienceItem.astro`, `tests/unit/experience-item.test.ts` — tests T9
2. [x] Build the page, the axis layout and ENTER motion — touches `src/pages/experience.astro`, `src/components/ExperienceItem.astro`, `src/styles/global.css`, `tests/e2e/experience.spec.ts` — tests T1, T2, T3, T4, T5, T6, T7, T8

**Must not change:** experience schema field names; token names and values in `src/styles/tokens.css` (add a token only through the design pack first); the shell components.

**High-risk steps:** None.

## Risks and open questions

- **Decided — layout.** A list on the 42% axis with side notes, per the pack's Frame rule. No timeline.
- **Decided — current-role emphasis.** A plain "Current" text label in the side note (Nathan, 2026-11-01). Styled within the pack's bans: no caps, tracking, pill or color-only signal.
- **"Current" next to "Present".** The current role's date already reads "– Present", so the page says it twice. Nathan asked for the label; noted so a later copy pass can choose one.
- **ENTER keyframes.** ENTER is new. It goes in `global.css` beside `rise` so `home-page` can reuse it. Content must be visible before and without animation, so it uses `animation-fill-mode: both` with a CSS-only start state and no script-added class.
- **Stale base.** Local `v10` is ahead of `origin/v10`. Push `v10` and `v0.2.1` before `wi start`, or the branch will lack `token-rename`.

## Progress log

- 2026-10-31 — Planned.
- 2026-11-01 — Revised for the design pack and token names: R7 current label (requested), R8 axis layout, R9 ENTER motion, T6–T9; open questions resolved.
- 2026-11-01 — Plan approved.
- 2026-11-01 — Started implementation on branch story/experience-page at 7836622.
- 2026-11-01 — Plan correction: step 1 has no page for the e2e tests to load, so it is proved by T9 (unit, now also covering the disclosure); T2, T3, T4, T6 move to step 2. ExperienceItem takes the entry's data plus a hasDetails flag, with the rendered body in its default slot, so the unit test needs no content loading.
- 2026-11-01 — Plan correction: T8's reduced-motion check passes through the global rule even without ENTER, so T8 gains a motion-allowed counterpart that checks ENTER's keyframes, duration and stagger.
- 2026-11-01 — Build complete: both steps done, full verify green. Screenshots at 1280px and 320px checked against the pack.
