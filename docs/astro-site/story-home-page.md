---
type: story
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: home-page
status: planned      # planned | in-progress | changes-requested | staged | released
branch: story/home-page
worktree_path:       # set by `wi start`
created: 2026-10-31
approved:            # set by `wi approve`
commit_type:         # optional override for the release subject type (default: story=feat, bug=fix, task=chore)
version:             # set by `wi stage`
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the branch's last commit
---

# Home page

## Summary

Replace the placeholder `/` with the real home page: an introduction from the `about` entry, recent experience, and featured projects, each linking to its full section. For a mixed audience the home page weights experience and projects equally and has no single call to action.

## Context

Depends on `experience-page` (`ExperienceItem`), `projects-pages` (`ProjectCard`), and `about-page`. Reuses those components instead of new markup.

## Scope

**In scope**

- Intro: name (`h1`), headline, tagline, location, social links
- Recent experience: the most recent N roles, compact (no details disclosure)
- Featured projects: `getFeaturedProjects()`
- Links to `/experience/`, `/projects/`, `/about/`

**Out of scope**

- New components beyond a compact variant of `ExperienceItem`
- Animation or hero imagery (design direction may add it; not assumed)

## Requirements

- **R1** — `/` has one `<h1>` with `about.name`, and shows `headline` and `tagline`.
- **R2** — A "Recent experience" section (`<h2>`) shows the first N roles from `getExperience()` in compact form, and links to `/experience/` with text that names the destination ("All experience").
- **R3** — A "Featured projects" section (`<h2>`) shows every featured project as a `ProjectCard`, and links to `/projects/` ("All projects").
- **R4** — When no project is featured, the featured section is omitted rather than rendered empty.
- **R5** — The page passes the axe helper and the 320px check.

## Acceptance criteria

- **AC1** (R1) — Given the placeholder about entry, when `/` loads, then `h1` equals its `name`.
- **AC2** (R2) — Given more than N roles, when `/` loads, then exactly N appear, newest first.
- **AC3** (R3) — Given one featured placeholder project, when `/` loads, then exactly one card appears.
- **AC4** (R4) — Given no featured projects, when built, then there is no "Featured projects" heading.
- **AC5** (R5) — Given `/`, when axe runs, then zero violations.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1 | `home shows intro` | `tests/e2e/home.spec.ts` | `h1`, headline, tagline text |
| T2 | R2 | `home shows recent experience` | `tests/e2e/home.spec.ts` | N items, newest first, no `details` element, link to `/experience/` |
| T3 | R3 | `home shows featured projects` | `tests/e2e/home.spec.ts` | Card count equals featured count; link to `/projects/` |
| T4 | R4 | `selectHomeSections omits empty featured` | `tests/unit/home.test.ts` | Pure selector returns no featured section for zero featured projects |
| T5 | R5 | `home is accessible and reflows` | `tests/e2e/home.spec.ts` | `expectNoA11yViolations`; 320px check |

**Not unit testable:** None.

## Implementation plan

1. [ ] Add the compact variant to `ExperienceItem` and the home section selector — touches `src/components/ExperienceItem.astro`, `src/lib/home.ts`, `tests/unit/home.test.ts` — tests T4
2. [ ] Build the home page — touches `src/pages/index.astro`, `tests/e2e/home.spec.ts`, `tests/e2e/smoke.spec.ts` — tests T1, T2, T3, T5

**Must not change:** `ExperienceItem` default (full) rendering used by `/experience/`.

**High-risk steps:** None.

## Risks and open questions

- **Open — N.** How many recent roles on the home page? Proposed 3.
- **Open — current focus.** A general audience may want "what Nathan does now" above the fold. The tagline may cover it; Nathan to confirm the intro copy in `content-migration`.

## Progress log

- 2026-10-31 — Planned.
