---
type: story
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: projects-pages
status: staged
branch: story/projects-pages
worktree_path: /home/nathan/development/nathanhealea-com/nathanhealea-com-worktrees/story-projects-pages
created: 2026-10-31
approved: 2026-11-02
commit_type:         # optional override for the release subject type (default: story=feat, bug=fix, task=chore)
version: 0.4.0
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the branch's last commit
---

# Projects index and detail pages

## Summary

Add `/projects/`, a list of every project on the design pack's 42% axis, and `/projects/<slug>/`, one page per project with its write-up, tech and links. Projects become linkable pages instead of a list of outbound links, which is what the Hugo site offered.

## Context

Depends on `content-collections` (`getProjects()`, project schema), `base-layout` (shell, tokens, `global.css`) and `experience-page` (the axis layout and the `enter` keyframes in `global.css`), all released. Token names follow `token-rename`: `--color-*`, `--text-*`, `--spacing-*`, `--container-*`.

Design comes from `design/DESIGN-SYSTEM.md` ("The Public Report"). The pack forbids cards ("no rules, no shadows, no gradients, no cards"), so each project is a list entry on the axis, built the way `ExperienceItem` is: at 960px and wider the heading and body start at 42% of the frame and the 0–42% zone holds a small side note, top-aligned with the heading; below 960px the side note moves above the heading. Section gap is `--spacing-section`. Links in running text are ink, underlined; controls carry functional labels ("View on GitHub"). The footer already sends social links to the same tab. Motion: the page `h1` uses RISE (global); each project uses ENTER. Banned: eyebrows, numbering, hairlines, tracked caps, borders, shadows, pills, icon cards. The pack's Mosaic (photographs) needs images, which the schema does not have.

`placeholder-alpha.md` has tech, both links, `order: 1` and a body. `placeholder-beta.md` has no tech, no links and no body. Together they cover every branch without new fixtures. `getProjects()` sorts by `order`, then title.

The shell's `currentSection()` matches by prefix, so on a detail page the nav's Projects link gets `aria-current="page"` (see Risks).

## Scope

**In scope**

- `/projects/` index in `getProjects()` order
- `ProjectItem` component (one project on the axis), reused on the home page
- `ProjectLinks` component (GitHub and live links), used by `ProjectItem` and the detail page
- `/projects/[slug].astro` detail pages via `getStaticPaths`
- ENTER motion for each project, dropping to 0ms under reduced motion

**Out of scope**

- Tag or tech filtering
- Project images and the Mosaic band (no image field; see `content-collections` open questions)
- A heading-level option on `ProjectItem` for the home page's "Featured projects" section (belongs to `home-page`, as the compact `ExperienceItem` does)
- Changing the nav's `aria-current` value on section sub-pages (shell; see Risks)

## Requirements

- **R1** — `/projects/` has one `<h1>` ("Projects") and one `<article>` per project, in `getProjects()` order.
- **R2** — Each article has an `<h2>` whose only content is a link to `/projects/<slug>/` with the project title. It shows the description and, when tech is set, a tech list labelled "Technology". The article contains no other link to the detail page, and the article itself is not a link.
- **R3** — Each project has a static page at `/projects/<slug>/` with the title as its only `<h1>`, the description, the tech list when set, the rendered markdown body when it is not empty, its links, and a link back to `/projects/` labelled "All projects". A project with an empty body still gets a page.
- **R4** — When `github` is set, a link to it is shown, with visible text "View on GitHub". When `live` is set, a link to it is shown, with visible text "Visit <host>" (for example "Visit placeholder-alpha.example.com"). Each link's accessible name starts with its visible text and also contains the project title, and the visible text names the destination, which says the link goes off-site. Links open in the same tab (no `target`).
- **R5** — When neither link is set, no link list or empty element is rendered; when only one is set, only that one is rendered.
- **R6** — Both page types pass the axe helper and the 320px no-horizontal-scroll check, with no skipped heading levels.
- **R7** — At 960px and wider, on the index each project's side note (its tech list) sits in the 0–42% zone, top-aligned with the `<h2>`, and the `<h2>` starts at the axis. On a detail page the `<h1>`, description, body and back link start at the axis, and the side note (tech and links) sits in the 0–42% zone, top-aligned with the `<h1>`. Below 960px the side note comes before its heading in one column. DOM order is side note, then heading, at every width. Body text is at most `--container-measure` wide.
- **R8** — ENTER motion runs once per project on the index, using transform and opacity only, with the `enter` keyframes already in `global.css`. Under `prefers-reduced-motion: reduce` its duration is 0ms. All content is visible with JavaScript disabled.

## Acceptance criteria

- **AC1** (R1, R2) — Given the two placeholders, when `/projects/` loads, then Alpha's article comes before Beta's, and each `<h2>` link goes to that project's detail page.
- **AC2** (R3) — Given `placeholder-alpha.md`, when the site is built, then `/projects/placeholder-alpha/` renders its body text and a link to `/projects/`. Given `placeholder-beta.md`, then `/projects/placeholder-beta/` exists and shows its description.
- **AC3** (R4) — Given Alpha, when rendered, then the GitHub link's accessible name starts with "View on GitHub" and contains "Placeholder Alpha", and it has no `target` attribute.
- **AC4** (R5) — Given Beta, when rendered, then it has no anchor to an external origin and no empty list.
- **AC5** (R6) — Given the index and each detail page, when axe runs, then there are zero violations, and at 320px nothing scrolls sideways.
- **AC6** (R7) — Given a 1280px viewport, when the index renders, then each `<h2>`'s left edge is at 42% of the frame (±1px) and the side note's left edge is at the frame's left margin, tops aligned. Given 320px, the side note is above the `<h2>`.
- **AC7** (R8) — Given reduced motion, when the index loads, then every animation on a project's parts has a 0s duration. Given JavaScript disabled, all project content is visible.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1, R2 | `index lists projects in order` | `tests/e2e/projects.spec.ts` | One `h1` "Projects"; article `h2` order matches the placeholders sorted by `order` then title (read from `src/content/projects/`); each `h2` holds exactly one link, to `/projects/<slug>/`, named with the title; no other anchor in the article points at the detail page; Alpha's tech list is labelled "Technology", Beta has none |
| T2 | R3 | `detail page renders project` | `tests/e2e/projects.spec.ts` | For each placeholder: one `h1` equal to the title; description present; "All projects" link to `/projects/`. Alpha: body text and tech present. Beta: page loads (status 200) with no empty body wrapper |
| T3 | R4 | `ProjectLinks names each link` | `tests/unit/project-links.test.ts` | Via `experimental_AstroContainer`: with both URLs, two anchors whose `href` equals each URL, visible text "View on GitHub" and "Visit <host>", accessible name (text including visually hidden text) starting with the visible text and containing the title; no `target` attribute |
| T4 | R5 | `ProjectLinks renders nothing without links` | `tests/unit/project-links.test.ts` | With neither URL, the output has no `<a>` and no `<ul>`/`<li>`; with only `github`, exactly one anchor; with only `live`, exactly one anchor |
| T5 | R6 | `projects pages are accessible and reflow` | `tests/e2e/projects.spec.ts` | On the index and each detail page: `expectNoA11yViolations`; heading levels sequential; `scrollWidth <= innerWidth` at 320px |
| T6 | R7 | `projects sit on the axis` | `tests/e2e/projects.spec.ts` | At 1280px and 960px: index `h2` left = frame left + 42% of frame width (±1px), side note left = frame left, tops aligned (±2px); detail `h1`, body and back link left at the axis, side note at frame left, tops aligned with `h1`. At 959px and 320px: side note bottom ≤ heading top. Side note precedes the heading in DOM order. Alpha's body paragraph width ≤ 62ch |
| T7 | R8 | `project entry motion respects reduced motion` | `tests/e2e/projects.spec.ts` | Under `reducedMotion: 'reduce'`, every animation on each article's parts has duration 0s; with `javaScriptEnabled: false`, every article's `h2` and description are visible |
| T7 | R8 | `project entry motion runs when motion is allowed` | `tests/e2e/projects.spec.ts` | With motion allowed, each article's parts have finite animations whose keyframes touch only transform and opacity, start at opacity 0 and translateY 24px, run 700ms, stagger by 80ms, and fill `both` or `backwards` |
| T8 | R2, R4, R5 | `ProjectItem renders title link, description, tech and links` | `tests/unit/project-item.test.ts` | Via `experimental_AstroContainer`: an `<article>` whose `h2` contains only an anchor to `/projects/<slug>/` with the title; description present; tech list labelled "Technology" with each item when tech is set and absent when empty; the `ProjectLinks` anchors present for a project with links and absent without |

**Not unit testable:** R7's alignment and R8's motion need a browser and are covered by T6 and T7. R3's static paths need a build and are covered by T2.

## Implementation plan

1. [x] Build `ProjectLinks` and `ProjectItem` — touches `src/components/ProjectLinks.astro`, `src/components/ProjectItem.astro`, `tests/unit/project-links.test.ts`, `tests/unit/project-item.test.ts` — tests T3, T4, T8
2. [x] Build the index page, its axis layout and ENTER motion — touches `src/pages/projects/index.astro`, `src/components/ProjectItem.astro`, `tests/e2e/projects.spec.ts` — tests T1, T5, T6, T7
3. [x] Build the detail pages with `getStaticPaths` — touches `src/pages/projects/[slug].astro`, `tests/e2e/projects.spec.ts` — tests T2, T5, T6

**Must not change:** project schema field names; URL pattern `/projects/<file-name>/`; token names and values in `src/styles/tokens.css`; the shell components; `ExperienceItem` and the `rise`/`enter` keyframes.

**High-risk steps:** None.

## Risks and open questions

- **Proposed — no cards.** The pack bans cards, so `ProjectCard` becomes `ProjectItem`, a list entry on the axis like `ExperienceItem`. `story-home-page.md` still names `ProjectCard`; it gets the new name when `home-page` is picked up.
- **Proposed — side note holds the tech list.** The pack's side notes hold role, dates and place; a project has none of those, and tech is the closest plain fact. Beta, with no tech, has an empty side-note zone on wide screens.
- **Proposed — same tab.** External links open in the same tab, matching the footer's social links (fewer surprises; WCAG 3.2.5 is AAA, so this is not a compliance question).
- **Proposed — thin projects still get a page.** Beta has no body, so its page repeats the index entry. Keeping the page gives every project the same URL shape, which `seo` and the sitemap rely on. The alternative is to link such entries straight to `live`/`github`.
- **Nav state on detail pages.** `currentSection()` matches by prefix, so a detail page marks the Projects link `aria-current="page"` while that link is not this page. `aria-current="true"` (or `"location"`) is the accurate value for a section. Not an axe failure; a shell change for a later task.
- **Body headings.** A project write-up's own headings must start at `h2`, or R6's no-skipped-levels check fails. The placeholders have none; `content-migration` must follow this.
- **Visually hidden text.** The title goes into each link's accessible name through text hidden only visually. No such utility exists yet, so `ProjectLinks` scopes its own; if `about-page` needs one too, it should move to `global.css`.

## Progress log

- 2026-10-31 — Planned.
- 2026-11-02 — Revised for the design pack and token names: projects are axis entries, not cards (`ProjectItem`); R4 link text and names made exact; R7 axis layout, R8 ENTER motion; unit tests T3, T4, T8; open questions moved to proposed answers.
- 2026-11-02 — Plan approved.
- 2026-11-02 — Started implementation on branch story/projects-pages at e77e3fa.
- 2026-11-02 — Step 2: the no-JS visibility test now waits for animations to settle before reading opacity, as the experience page's does; it had read opacity mid-ENTER.
- 2026-11-02 — Build complete: three steps done. The detail side-note selector in projects.spec.ts was changed to ':scope > :not(:has(h1))' because Playwright did not match the relative ':has(> ul)' form. Screenshots of the index and both detail pages at 1280px and 320px checked against the pack.
- 2026-11-02 — Review: security clean; a11y no AA failures (nav aria-current on detail pages, already in Risks); code review one LOW fixed with the back-link tap size. Mutation audit 31 mutants, 27 killed; the visually-hidden and stagger survivors are now covered; the .trim() and host-with-port survivors change nothing with current content.
- 2026-11-02 — Staged: verification passed; version 0.3.0 → 0.4.0; no changelog file.
