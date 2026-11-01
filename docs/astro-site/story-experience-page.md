---
type: story
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: experience-page
status: planned      # planned | in-progress | changes-requested | staged | released
branch: story/experience-page
worktree_path:       # set by `wi start`
created: 2026-10-31
approved:            # set by `wi approve`
commit_type:         # optional override for the release subject type (default: story=feat, bug=fix, task=chore)
version:             # set by `wi stage`
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the branch's last commit
---

# Work experience page

## Summary

Add `/experience/`, a reverse-chronological list of roles drawn from the `experience` collection. Each role shows company, title, location, dates, highlights, and tech, with the longer details available on demand. This is the page a visitor uses to judge Nathan's career at a glance.

## Context

Depends on `content-collections` (schema and `getExperience()`, `formatRange()`) and `base-layout`. The Hugo site's most recent feature was "expandable experience details", so the short-highlights / long-details split is a pattern Nathan already chose.

## Scope

**In scope**

- `/experience/` page in `BaseLayout`
- `ExperienceItem` component, reused on the home page
- Disclosure for each role's details (markdown body)

**Out of scope**

- A separate page per role (not requested)
- Filtering or search by technology

## Requirements

- **R1** — `/experience/` lists every experience entry in `getExperience()` order.
- **R2** — Each role renders as an `<article>` with an `<h2>` of the title and company, and shows location, the `formatRange` date text inside a `<time>`-marked range, highlights as a list, and tech as a list.
- **R3** — Each role's markdown body is behind a native `<details>`/`<summary>` disclosure, collapsed by default, whose summary text names the role (e.g. "Details: Programmer Analyst II at University of Oregon").
- **R4** — A role with an empty body shows no disclosure.
- **R5** — The page has one `<h1>` ("Experience") and no skipped heading levels.
- **R6** — The page passes the axe helper and the 320px no-horizontal-scroll check.

## Acceptance criteria

- **AC1** (R1) — Given the placeholder entries, when `/experience/` loads, then articles appear newest first.
- **AC2** (R3) — Given a role with a body, when its summary is activated by keyboard, then the details become visible.
- **AC3** (R4) — Given a role with no body, when rendered, then it has no `<details>`.
- **AC4** (R5, R6) — Given the page, when axe runs, then zero violations.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1 | `lists roles newest first` | `tests/e2e/experience.spec.ts` | Article `h2` order matches placeholder order by `start` desc |
| T2 | R2 | `role shows required fields` | `tests/e2e/experience.spec.ts` | Location, date text, highlight items, tech items present for each article |
| T3 | R3 | `details disclosure opens by keyboard` | `tests/e2e/experience.spec.ts` | Focus summary, press Enter, body content visible; summary text names the role |
| T4 | R4 | `no disclosure for empty body` | `tests/e2e/experience.spec.ts` | Needs a placeholder with an empty body; asserts no `details` in that article |
| T5 | R5, R6 | `experience page is accessible and reflows` | `tests/e2e/experience.spec.ts` | One `h1`; heading levels sequential; `expectNoA11yViolations`; `scrollWidth <= innerWidth` at 320px |

**Not unit testable:** None.

## Implementation plan

1. [ ] Build `ExperienceItem` with fields and the disclosure — touches `src/components/ExperienceItem.astro` — tests T2, T3, T4
2. [ ] Build the page and add a body-less placeholder entry for T4 — touches `src/pages/experience.astro`, `src/content/experience/placeholder-*.md`, `tests/e2e/experience.spec.ts` — tests T1, T5

**Must not change:** Experience schema field names.

**High-risk steps:** None.

## Risks and open questions

- **Open — layout.** List vs. timeline visual is part of the design direction set in `base-layout`.
- **Open — current-role emphasis.** Should current roles be visually marked (e.g. a "Current" label)? Not assumed.

## Progress log

- 2026-10-31 — Planned.
