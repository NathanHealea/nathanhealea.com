---
type: story
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: about-page
status: planned      # planned | in-progress | changes-requested | staged | released
branch: story/about-page
worktree_path:       # set by `wi start`
created: 2026-10-31
approved:            # set by `wi approve`
commit_type:         # optional override for the release subject type (default: story=feat, bug=fix, task=chore)
version:             # set by `wi stage`
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the branch's last commit
---

# About page with résumé download

## Summary

Add `/about/`, rendering Nathan's bio, grouped skills, education, social links, and an optional résumé download, all from the single `about` entry. It gives a general audience the background that the experience list does not.

## Context

Depends on `content-collections` (`getAbout()`, about schema) and `base-layout`. The Hugo site has no separate about page; identity lived in `hugo.toml` params.

## Scope

**In scope**

- `/about/` page in `BaseLayout`
- Bio (markdown body), skills by group, education, social links
- Résumé download link when `resume` is set

**Out of scope**

- Producing the résumé PDF itself (Nathan supplies it)
- A headshot (no image field yet; see open questions)

## Requirements

- **R1** — `/about/` has `<h1>` with the `name` from the about entry, followed by the rendered bio.
- **R2** — Skills render as one `<h2>` "Skills" with one list per group, each group labeled by a heading.
- **R3** — Education renders under `<h2>` "Education" with school, credential, and year when present.
- **R4** — When `resume` is set, a download link appears whose visible text states the format and size (e.g. "Download résumé (PDF, 92 KB)"), computed at build time from the file. When it is not set, no link renders.
- **R5** — If `resume` points to a file that does not exist in `public/`, the build fails naming the path.
- **R6** — The page passes the axe helper and the 320px check.

## Acceptance criteria

- **AC1** (R1) — Given the placeholder about entry, when `/about/` loads, then `h1` equals its `name`.
- **AC2** (R4) — Given `resume: /resume.pdf` and the file present, when built, then the link text includes "PDF" and a size in KB.
- **AC3** (R5) — Given `resume: /missing.pdf`, when the build runs, then it fails naming `/missing.pdf`.
- **AC4** (R6) — Given the page, when axe runs, then zero violations.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1, R2, R3 | `about page renders sections` | `tests/e2e/about.spec.ts` | `h1` text; Skills and Education `h2`s; one list per skill group |
| T2 | R4 | `resume link shows format and size` | `tests/e2e/about.spec.ts` | Link text matches `/PDF, \d+ KB/`; `href` resolves 200 |
| T3 | R4, R5 | `resumeLinkInfo returns null when unset and throws when missing` | `tests/unit/resume.test.ts` | Pure helper: unset → null; missing file → throws with path; present → `{format, sizeKb}` |
| T4 | R6 | `about page is accessible and reflows` | `tests/e2e/about.spec.ts` | `expectNoA11yViolations`; 320px check |

**Not unit testable:** None.

## Implementation plan

1. [ ] Write the résumé helper that reads file size at build time — touches `src/lib/resume.ts`, `tests/unit/resume.test.ts` — tests T3
2. [ ] Build the about page and add a placeholder PDF — touches `src/pages/about.astro`, `src/content/about/about.md`, `public/resume-placeholder.pdf`, `tests/e2e/about.spec.ts` — tests T1, T2, T4

**Must not change:** About schema field names.

**High-risk steps:** None.

## Risks and open questions

- **Open — résumé PDF accessibility.** A linked PDF is content under WCAG 2.1 AA. It must be a tagged PDF with a logical reading order, real text (not an image), and a document title. Nathan supplies it; a check with a PDF accessibility checker is part of `content-migration`.
- **Open — résumé privacy.** A public résumé should not include a home address or personal phone number. Nathan to confirm what is on it.
- **Open — headshot.** Not in scope unless Nathan wants one; it would need an `image` field and required alt text.

## Progress log

- 2026-10-31 — Planned.
