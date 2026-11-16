---
type: story
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: product-grade-design
status: in-progress
branch: story/product-grade-design
worktree_path: /Users/nhealea/Personal/Development/nathanhealea/nathanhealea-com-worktrees/story-product-grade-design
created: 2026-11-16
approved: 2026-11-16
commit_type:         # optional override for the merge commit type (default: story=feat, bug=fix, task=chore)
version:             # set by `wi stage`
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the merge commit
---

# Product-grade visual redesign

## Summary

Replace the "Public Report" design with the product-grade design Nathan picked on 2026-11-16: Geist type, a near-white or near-black ground, one blue accent, thin borders and soft radii, light and dark themes that follow the system with a toggle to override it. The old design read as too formal, did not fit the audience and gave projects no weight. This story re-skins the shell (layout, header, nav, footer) and every page that exists today: Experience, the Projects index, project detail and 404. Home and About keep their own stories, which are revised in this item to build against the new design.

## Context

**The design source** is the static mockup on branch `design/product-grade`, commit `9abb610`, under `public/mockups/product-grade/` (`index.html`, `project.html`, `style.css`, `site.js`). Read it with `git show 9abb610:public/mockups/product-grade/<file>`. It is the visual reference, not code to copy: the mockup's sample content, sample UI fragments, hero and home sections do not ship in this item. Do not merge or delete that branch as part of this work.

**What exists now (v10 at 8d90aee):**

- `src/styles/tokens.css` holds the Public Report tokens (Tailwind v4 namespaces, one light theme). `tests/unit/tokens.test.ts` pins the exact token list (43 names) and checks that every `var()` under `src/` resolves.
- `src/styles/global.css` sets base type and defines the `rise` and `enter` keyframes. Headings run RISE on load; `ExperienceItem` and `ProjectItem` run ENTER.
- `public/fonts/` self-hosts Source Serif 4 Display and Public Sans. `tests/e2e/layout.spec.ts` asserts these families load from the same origin and that the site makes no third-party requests.
- Pages use a 42% "axis" grid. `tests/e2e/experience.spec.ts` and `tests/e2e/projects.spec.ts` assert axis geometry, RISE and ENTER timing, and no-JS visibility.
- `/` is a placeholder `h1`. `/about/` does not exist yet (story `about-page`, planned). Nav links to it already.
- `design/DESIGN-SYSTEM.md` and `design/VOICE.md` describe the Public Report. `tokens.css` says to change the pack first.
- Content is placeholders; `projectSchema` has no image or visual field.

Related: `story-home-page.md`, `story-about-page.md` (both planned; revised here), `story-seo.md` (planned; independent).

## Scope

**In scope**

- New tokens: light and dark palettes, Geist and Geist Mono, radii, shadow, spacing, motion.
- Self-hosted Geist 400/500/600 and Geist Mono 400/500 woff2 with the OFL; remove Source Serif 4 and Public Sans.
- Theme: follows `prefers-color-scheme`; a header toggle overrides it and remembers the choice.
- Shell: sticky header with wordmark, primary nav and theme toggle; compact footer; skip link.
- Experience page, Projects index, project detail (breadcrumb, table of contents from the write-up's `h2`s), 404, all restyled.
- Scroll reveal motion replacing RISE and ENTER.
- Update existing tests that assert Public Report specifics; add tests for theme and the dark palette.
- Rewrite `design/DESIGN-SYSTEM.md` as v2; update `design/VOICE.md` persona and the report-metaphor copy (404, footer line).
- Revise `story-home-page.md` and `story-about-page.md` to the new design; add this item's row to the epic.

**Out of scope**

- Building Home or About (their own stories).
- Project visuals or UI fragments: needs a schema field and per-project components, a follow-up story.
- Case-study facts (role, timeline, "runs on"): not in the schema.
- A header "Get in touch" button: no contact target exists until Home builds one.
- The mockup's `?theme=` URL override (a review convenience, not a feature).
- SEO tags, real content, deployment.

## Requirements

- **R1** — Colors come from tokens with a light and a dark value. With no stored choice, the page uses the dark palette when the system prefers dark and the light palette otherwise.
- **R2** — A theme toggle button in the header switches between light and dark. Its accessible name names the theme it switches to ("Switch to dark theme"). The choice persists across page loads. If storage is unavailable, the toggle still switches the current page and nothing throws.
- **R3** — A stored theme is applied before first paint: the page never renders in the other palette first.
- **R4** — Without JavaScript, the system palette applies and the toggle is not shown.
- **R5** — Body text is Geist and code, tech chips and dates are Geist Mono, both served from the site's own origin. The site makes no third-party requests. Source Serif 4 and Public Sans are no longer shipped.
- **R6** — Every text and token pair used for text meets 4.5:1 (3:1 for large text and UI boundaries) in both palettes. UO green #154733 and yellow #FEE123 do not appear.
- **R7** — The header stays at the top while scrolling and shows the wordmark (home link), the primary nav (Experience, Projects, About) and the toggle. The current section is marked with `aria-current` and a visible indicator that is not color alone. At 320px every nav link stays visible and in tab order.
- **R8** — The footer shows the name, the location line from `about.location`, and the `about.social` links, each with a discernible name.
- **R9** — The Experience page lists roles newest first. Each role shows title, company, date range, location, a "Current" label when it has no end date, highlights, tech chips and, when the entry has a body, the details disclosure that opens by keyboard. At ≥1000px the dates and location sit in a left column beside the role; narrower, above it.
- **R10** — The Projects index lists projects in order as cards. Each card shows the title as a link to its detail page, the description, tech chips and the GitHub and live links (named as today, title in the accessible name).
- **R11** — A project detail page shows a breadcrumb (`nav` named "Breadcrumb", the Projects link, then the current title with `aria-current="page"`), the title as `h1`, the description as the lede, tech chips, links, and the write-up. When the write-up has two or more `h2`s, a table of contents named "On this page" links to each; at ≥1000px it stays in view beside the write-up and marks the section being read with `aria-current`. With fewer than two, no table of contents renders.
- **R12** — The 404 page uses the new design and new copy without the report metaphor; it links to the home page.
- **R13** — Sections reveal on scroll (opacity and transform only, once). All content is visible without JavaScript and under `prefers-reduced-motion: reduce`, where nothing moves.
- **R14** — Every route has zero axe violations (the existing `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` set plus the experimental WCAG rules) in both themes. Every keyboard stop shows a focus ring with 3:1 contrast against its ground in both themes. No route scrolls horizontally from 320px to 1920px.
- **R15** — Every `var()` under `src/` resolves to a declared token, and `tokens.css` declares exactly the token set documented in `design/DESIGN-SYSTEM.md`.

## Acceptance criteria

- **AC1** (R1) — Given no stored theme and a dark system scheme, when any route loads, then `body` background is the dark `--color-bg`; with a light system scheme, the light one.
- **AC2** (R2) — Given a light page, when the toggle is activated by keyboard, then the page is dark, the toggle is named "Switch to light theme", and after reload the page is still dark.
- **AC3** (R2) — Given `localStorage` throws, when the toggle is activated, then the page switches and no page error is raised.
- **AC4** (R3) — Given a stored "dark" and a light system scheme, when a route loads, then `html[data-theme="dark"]` is set before any stylesheet-dependent paint (set by an inline script in `<head>`).
- **AC5** (R4) — Given JavaScript disabled and a dark system scheme, when a route loads, then the dark palette applies and no theme toggle is visible or focusable.
- **AC6** (R5) — Given any route, when fonts settle, then Geist and Geist Mono are loaded from the site origin and no request leaves it.
- **AC7** (R6) — Given the token values in both palettes, when contrast is computed for each text pair, then each meets its threshold.
- **AC8** (R7) — Given `/projects/<slug>/` scrolled to the bottom, then the header is in the viewport and the Projects link has `aria-current` and a non-color indicator.
- **AC9** (R9) — Given the placeholder roles, when `/experience/` loads at 1280px, then the side column is left of the role heading; at 390px it is above it.
- **AC10** (R10) — Given the placeholder projects, when `/projects/` loads, then each project is one card in `order`, with its title linking to `/projects/<id>/`.
- **AC11** (R11) — Given a project whose body has three `h2`s, when its page loads, then "On this page" lists three links to their ids; given one with none, there is no table of contents.
- **AC12** (R13) — Given JavaScript disabled, when any route loads, then every revealed element has opacity 1.
- **AC13** (R14) — Given the Playwright suite, when axe runs on every route in light and in dark, then it reports zero violations.

## Test plan

Existing e2e tests that assert the Public Report (axis geometry, RISE, ENTER, Source Serif and Public Sans) are replaced, not kept alongside. Tests that assert behavior still required (order, fields, disclosure, links, no third-party requests, skip link, reflow, focus rings) are kept and pointed at the new markup.

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1, R2 | `initialTheme prefers stored over system` / `nextTheme flips` | `tests/unit/theme.test.ts` | Pure `initialTheme(stored, systemDark)` returns stored when valid, else system; ignores junk values; `nextTheme` flips |
| T2 | R1 | `follows the system scheme` | `tests/e2e/theme.spec.ts` | `colorScheme: 'dark'` → dark `body` background; `'light'` → light |
| T3 | R2 | `toggle switches, renames and persists` | `tests/e2e/theme.spec.ts` | Keyboard activation flips `data-theme`, accessible name updates, survives reload |
| T4 | R2 | `toggle works when storage throws` | `tests/e2e/theme.spec.ts` | `addInitScript` makes `localStorage` throw; toggle still flips; no `pageerror` |
| T5 | R3 | `stored theme applies before paint` | `tests/e2e/theme.spec.ts` | With stored "dark" and light system, `data-theme` is set when `DOMContentLoaded` fires and the head script precedes stylesheets |
| T6 | R4 | `no-JS follows system and hides toggle` | `tests/e2e/theme.spec.ts` | `javaScriptEnabled: false`: dark background under dark scheme; toggle hidden and not focusable |
| T7 | R5 | `typefaces load from same origin` | `tests/e2e/layout.spec.ts` | Replaces the pack-typeface test: Geist and Geist Mono loaded, every font URL same-origin |
| T8 | R5 | `no third-party requests` | `tests/e2e/layout.spec.ts` | Kept |
| T9 | R5 | `old typefaces are gone` | `tests/unit/tokens.test.ts` | No `@font-face` for Source Serif 4 or Public Sans; their files absent from `public/fonts/` |
| T10 | R6 | `token pairs meet contrast in both palettes` | `tests/unit/tokens.test.ts` | Parses light and dark values; ink, ink-2 and muted on bg, surface and raised ≥4.5; accent text on bg ≥4.5; accent-ink on accent ≥4.5; ok, warn and bad on their soft grounds ≥4.5; line and line-strong are decorative separators, not control boundaries, so no 3:1 check |
| T11 | R6 | `no UO colors` | `tests/unit/tokens.test.ts` | No file under `src/` contains #154733 or #FEE123 (case-insensitive) |
| T12 | R1 | `dark palette declared for system and override` | `tests/unit/tokens.test.ts` | The dark block appears under `prefers-color-scheme: dark` scoped to `:root:not([data-theme="light"])` and under `:root[data-theme="dark"]`, with identical names and values; both cover every color token |
| T13 | R7 | `header stays in view` / `nav marks current section` | `tests/e2e/layout.spec.ts` | Sticky after scrolling to bottom; `aria-current` on the section link plus a computed non-color indicator (underline or background) differing from other links |
| T14 | R7 | `narrow nav stays visible and in tab order` | `tests/e2e/layout.spec.ts` | Kept, adapted to the new header at 320px |
| T15 | R8 | `footer social links have names` / `footer shows location` | `tests/e2e/layout.spec.ts` | Kept; plus the location line text from the about entry |
| T16 | R9 | Existing order, fields, disclosure, current-label tests | `tests/e2e/experience.spec.ts`, `tests/unit/experience-item.test.ts` | Kept, selectors updated |
| T17 | R9 | `side column sits beside then above` | `tests/e2e/experience.spec.ts` | Replaces the axis test: at 1280px side box right edge ≤ heading left; at 390px side box bottom ≤ heading top |
| T18 | R10 | Existing index order, link and naming tests | `tests/e2e/projects.spec.ts`, `tests/unit/project-item.test.ts`, `tests/unit/project-links.test.ts` | Kept, selectors updated; each project is one card element |
| T19 | R11 | `headingsForToc` | `tests/unit/toc.test.ts` | Pure function over Astro's `headings`: keeps depth 2 only, returns empty when fewer than two |
| T20 | R11 | `detail shows breadcrumb and toc` | `tests/e2e/projects.spec.ts` | Breadcrumb landmark and `aria-current`; a test fixture project with three `h2`s lists three links; scrolling to the second marks it `aria-current`; placeholder-beta has no TOC |
| T21 | R12 | `404 page renders` | `tests/e2e/layout.spec.ts` | Kept, new heading text, home link |
| T22 | R13 | `reveal content is visible without JS` / `with reduced motion nothing animates` | `tests/e2e/layout.spec.ts` | Replaces RISE and ENTER tests across specs: no-JS opacity 1 on every `[data-reveal]`; reduced motion → zero transition and animation durations |
| T23 | R13 | `reveal runs once on transform and opacity` | `tests/e2e/layout.spec.ts` | Motion allowed: a below-fold `[data-reveal]` starts hidden, becomes visible after scroll, transition properties are only `opacity` and `transform` |
| T24 | R14 | `every route is accessible in both themes` | `tests/e2e/themes-a11y.spec.ts` | `expectNoA11yViolations` on `/`, `/experience/`, `/projects/`, each detail page and 404, under light and dark |
| T25 | R14 | `every keyboard stop shows a focus ring with 3:1 contrast` | `tests/e2e/layout.spec.ts` | Kept, run in both themes |
| T26 | R14 | `no horizontal scroll at 320px and 1920px` | `tests/e2e/layout.spec.ts` | Kept, extended to every route |
| T27 | R15 | `declares the documented token set` / `every var() resolves` | `tests/unit/tokens.test.ts` | Rewritten list from DESIGN-SYSTEM v2; the resolve test and its helpers kept as is |

**Not unit testable:** Visual fidelity to the mockup (radii, spacing, shadows). Verified by screenshots of every route at 1440, 768 and 390px in both themes, compared against the mockup, recorded in the progress log.

**Test fixture for T20:** the placeholders have no `h2`s. Add one to `placeholder-alpha.md` (three short `##` sections of placeholder prose). Placeholder content only; `content-migration` replaces it.

## Implementation plan

1. [x] Add theme logic and its unit tests — touches `src/lib/theme.ts`, `tests/unit/theme.test.ts` — tests T1
2. [x] Swap the typefaces: add Geist and Geist Mono woff2 with the OFL, remove Source Serif 4 and Public Sans, point `--font-*` at Geist, add `--font-mono` — touches `public/fonts/*`, `src/styles/tokens.css`, `tests/unit/tokens.test.ts`, `tests/e2e/layout.spec.ts` — tests T7, T8, T9
3. [x] Replace the palette with light and dark tokens; keep the old color names as temporary aliases to the new ones so every page still resolves — touches `src/styles/tokens.css`, `src/styles/global.css`, `tests/unit/tokens.test.ts` — tests T10, T11, T12, T27
4. [x] Rebuild the shell: head theme script, sticky header, nav indicator, toggle, footer, skip link; reveal script and `[data-reveal]` styles replacing `rise` — touches `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`, `tests/e2e/theme.spec.ts`, `tests/e2e/layout.spec.ts` — tests T2, T3, T4, T5, T6, T13, T14, T15, T22, T23, T25
5. [x] Restyle the Experience page — touches `src/components/ExperienceItem.astro`, `src/pages/experience.astro`, `tests/e2e/experience.spec.ts`, `tests/unit/experience-item.test.ts` — tests T16, T17
6. [x] Restyle the Projects index as cards — touches `src/components/ProjectItem.astro`, `src/components/ProjectLinks.astro`, `src/pages/projects/index.astro`, `tests/e2e/projects.spec.ts`, `tests/unit/project-item.test.ts` — tests T18
7. [x] Restyle project detail with breadcrumb and table of contents — touches `src/pages/projects/[slug].astro`, `src/lib/toc.ts`, `tests/unit/toc.test.ts`, `src/content/projects/placeholder-alpha.md`, `tests/e2e/projects.spec.ts` — tests T19, T20
8. [x] Restyle 404, remove the temporary aliases and the `enter` keyframes, add the both-themes accessibility sweep — touches `src/pages/404.astro`, `src/styles/tokens.css`, `src/styles/global.css`, `tests/e2e/themes-a11y.spec.ts`, `tests/e2e/layout.spec.ts` — tests T21, T24, T26, T27
9. [x] Rewrite the design pack and voice, revise the Home and About plans, add the epic row — touches `design/DESIGN-SYSTEM.md`, `design/VOICE.md`, `docs/astro-site/story-home-page.md`, `docs/astro-site/story-about-page.md`, `docs/astro-site/epic-astro-site.md` — tests none (docs)

The v2 token list is the contract T27 checks. Step 3 writes it into `tests/unit/tokens.test.ts`; step 9 copies the same list into `design/DESIGN-SYSTEM.md`, so the pack and the code match at merge.

**Must not change:** content schemas in `src/content.config.ts`; URL patterns (`/experience/`, `/projects/`, `/projects/<id>/`, `/about/`); `primaryNav` labels, hrefs and order and `currentSection()` in `src/lib/nav.ts`; `src/lib/collections.ts` and `src/lib/content.ts` behavior; the accessible names of project links; the no-third-party-requests guarantee; `tests/e2e/helpers/a11y.ts`.

**High-risk steps:** None. No auth, data, secrets or student records. Deleting the old font files (step 2) is undone by `git revert`.

## Risks and open questions

- **Proposed — font source.** Download Geist and Geist Mono woff2 and the OFL from the upstream `vercel/geist-font` GitHub release and commit them under `public/fonts/`, like the current fonts. No npm dependency. Check the file sizes; prefer static cuts at the weights in use unless the variable file is smaller in total.
- **Proposed — no project visuals yet.** The mockup's strongest element is a UI view per project. The schema has no field for it, so cards here are copy-only. A follow-up story adds an optional `visual` field and fragment components; it changes the schema, which is why it is not folded in.
- **Proposed — no header CTA.** The mockup's "Get in touch" button has nowhere to go until Home's contact section exists. Home's revised plan adds it.
- **Proposed — new 404 and footer copy.** "Not in the record" and "Published from Eugene, Oregon" belong to the report metaphor. Proposed 404: "Nothing here." / "This page doesn't exist, or it moved when the site was rebuilt." Footer keeps the location line, reworded to "Based in {location}." Nathan to confirm or rewrite.
- **Proposed — nav indicator.** The mockup marks the current link by color only (WCAG 1.4.1 concern). The build adds a 2px underline in `--color-ink` under the current link.
- **Risk — flash of the wrong theme.** The head script must be inline (`is:inline`) and run before stylesheets. Astro hoists and bundles non-inline scripts, which would cause the flash.
- **Risk — test churn.** Roughly half of `experience.spec.ts` and `projects.spec.ts` asserts axis geometry and ENTER timing. Replacing those is in scope; reviewers should check that no still-required behavior lost its test.
- **Risk — sticky header and anchors.** A sticky header covers in-page targets (TOC links, skip link). Set `scroll-padding-top` to the header height.
- **Open — Geist Mono in tech chips.** The old pack banned monospace outside code; the new design uses it for chips, dates and meta. Kept as designed unless Nathan objects.
- **Open — mockup branch.** `design/product-grade` stays until this item is released, as the design reference. Delete it afterward only on Nathan's say-so.

## Progress log

- 2026-11-16 — Planned.
- 2026-11-16 — Plan approved.
- 2026-11-16 — Started implementation on branch story/product-grade-design at f3cba49.
- 2026-11-16 — Step 3: dropped T10's line-strong ≥3:1 row. line and line-strong only draw decorative separators and card edges; no control relies on them to be identified (WCAG 1.4.11), and the mockup values score 1.44 and 1.55. Temporary aliases keep Public Report motion and axis values so the old page tests stay green until steps 5–8 replace them.
- 2026-11-16 — Build complete: nine steps done, verify green (74 unit, 49 e2e). Step 5 T17 was tightened to pin the 1000px breakpoint (stacked at 999px) and require data-reveal on roles, since the old layout already met the row as written; the 'header stays in view' test got a 400px-tall viewport so it no longer depends on placeholder content length; the 'nav marks current section' loop skips /about/ until about-page builds it (nav-render.test.ts covers its marking). Toc scroll-spy marks the last heading above 35% of the viewport. Screenshots of every route at 1440, 768 and 390 in both themes checked against the mockup; no horizontal overflow.
- 2026-11-16 — Staging: tests/e2e/helpers/a11y.ts (listed under Must not change) now waits two animation frames before collecting animations. One sync run failed axe color-contrast on the footer mid-fade; the reveal transition starts in an IntersectionObserver callback after the helper's wait. Not reproduced in 441 reruns before or after; the change only lengthens the wait and checks nothing less.
