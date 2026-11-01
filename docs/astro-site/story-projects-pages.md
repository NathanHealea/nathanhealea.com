---
type: story
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: projects-pages
status: planned      # planned | in-progress | changes-requested | staged | released
branch: story/projects-pages
worktree_path:       # set by `wi start`
created: 2026-10-31
approved:            # set by `wi approve`
commit_type:         # optional override for the release subject type (default: story=feat, bug=fix, task=chore)
version:             # set by `wi stage`
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the branch's last commit
---

# Projects index and detail pages

## Summary

Add `/projects/`, a grid of all projects, and `/projects/<slug>/`, one page per project rendering its markdown write-up with tech and links. Projects become first-class, linkable pages instead of cards only.

## Context

Depends on `content-collections` (`getProjects()`, project schema) and `base-layout`. The Hugo site shows projects as cards with GitHub and live links and a featured flag; it has no detail pages.

## Scope

**In scope**

- `/projects/` index in `getProjects()` order
- `ProjectCard` component, reused on the home page
- `/projects/[slug].astro` detail pages via `getStaticPaths`

**Out of scope**

- Tag or tech filtering
- Project images (not in the schema; see `content-collections` open questions)

## Requirements

- **R1** — `/projects/` shows one card per project, in `getProjects()` order, under one `<h1>` ("Projects").
- **R2** — Each card shows title, description, and tech, and its title is a link to `/projects/<slug>/`. The whole card is not a single giant link.
- **R3** — Each project has a static page at `/projects/<slug>/` with the title as `<h1>`, the description, tech list, rendered markdown body, and a link back to `/projects/`.
- **R4** — When `github` or `live` is set, the detail page and card show a link whose accessible name includes the project name (e.g. "grimify.app source on GitHub"). External links state that they go off-site, in visible text or in the accessible name.
- **R5** — When neither link is set, no empty link markup is rendered.
- **R6** — Both page types pass the axe helper and the 320px no-horizontal-scroll check.

## Acceptance criteria

- **AC1** (R1, R2) — Given two placeholder projects, when `/projects/` loads, then two cards appear in order, each title linking to its detail page.
- **AC2** (R3) — Given `placeholder-alpha.md`, when the build runs, then `dist/projects/placeholder-alpha/index.html` exists and renders its body.
- **AC3** (R4) — Given a project with `github`, when rendered, then the link's accessible name contains the project title.
- **AC4** (R5) — Given a project with no links, when rendered, then it has no anchor to an external origin.
- **AC5** (R6) — Given both page types, when axe runs, then zero violations.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1, R2 | `index lists project cards in order` | `tests/e2e/projects.spec.ts` | Card count and order; each card has one title link to `/projects/<slug>/` |
| T2 | R3 | `detail page renders project` | `tests/e2e/projects.spec.ts` | `h1` = title; body text present; back link to `/projects/` |
| T3 | R4 | `external links have descriptive names` | `tests/e2e/projects.spec.ts` | Accessible name of GitHub/live links contains the title and indicates external |
| T4 | R5 | `no empty external links` | `tests/e2e/projects.spec.ts` | Project without links has no external anchors |
| T5 | R6 | `projects pages are accessible and reflow` | `tests/e2e/projects.spec.ts` | `expectNoA11yViolations` and 320px check on index and each detail page |

**Not unit testable:** None.

## Implementation plan

1. [ ] Build `ProjectCard` and `ProjectLinks` — touches `src/components/ProjectCard.astro`, `src/components/ProjectLinks.astro` — tests T3, T4
2. [ ] Build the index page — touches `src/pages/projects/index.astro`, `tests/e2e/projects.spec.ts` — tests T1, T5
3. [ ] Build detail pages with `getStaticPaths` — touches `src/pages/projects/[slug].astro`, `src/content/projects/placeholder-*.md` — tests T2, T5

**Must not change:** Project schema field names; URL pattern `/projects/<file-name>/`.

**High-risk steps:** None.

## Risks and open questions

- **Open — new tab.** Proposed: external links open in the same tab (WCAG 3.2.5 advisory; fewer surprises). Confirm.
- **Open — detail pages for thin projects.** A project with no body gets a detail page that repeats its card. Options: still generate it (consistent URLs, proposed), or link the card straight to `live`/`github` when the body is empty.

## Progress log

- 2026-10-31 — Planned.
