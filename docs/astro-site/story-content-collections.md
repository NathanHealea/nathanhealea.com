---
type: story
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: content-collections
status: planned      # planned | in-progress | changes-requested | staged | released
branch: story/content-collections
worktree_path:       # set by `wi start`
created: 2026-10-31
approved:            # set by `wi approve`
commit_type:         # optional override for the release subject type (default: story=feat, bug=fix, task=chore)
version:             # set by `wi stage`
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the branch's last commit
---

# Define content collections and schemas

## Summary

Define three Astro content collections (`experience`, `projects`, and `about`), each backed by markdown files with Zod-validated frontmatter, plus query helpers the pages use. Adding a role or project becomes "add one markdown file", and bad frontmatter fails the build instead of rendering a broken page.

## Context

Depends on `astro-scaffold`. The field set comes from the Hugo site on `main` (`data/experience.yaml`, `data/projects.yaml`, `hugo.toml` params), so nothing Nathan already publishes is lost:

- Experience: company, title, location, start, end, current, highlights, details, tech.
- Projects: title, slug, description, tech, github, live, featured.
- Site identity (`hugo.toml`): name, headline, tagline, location, description, GitHub, LinkedIn.

Content files live in `src/content/<collection>/`. Sample entries here are clearly marked placeholders; `content-migration` replaces them with real content.

## Scope

**In scope**

- Zod schemas in `src/content/schemas.ts`, importable by Vitest without the Astro runtime
- Collection definitions in `src/content.config.ts` using the glob loader
- Placeholder entries: two experience, two projects, one about
- Helpers in `src/lib/content.ts`: sorted experience, featured and sorted projects, the single about entry, date-range formatting

**Out of scope**

- Pages that render the content (children 4–7)
- Real content (`content-migration`)
- Images in content (no requirement yet; see open questions)

## Requirements

- **R1** — An `experience` entry requires `company`, `title`, `location`, `start` (`YYYY-MM`), `highlights` (non-empty string list), and `tech` (string list), and accepts an optional `end` (`YYYY-MM`). A missing `end` means current. The markdown body holds the detailed description.
- **R2** — A `projects` entry requires `title` and `description`, and accepts optional `tech` (string list, default empty), `github` (URL), `live` (URL), `featured` (boolean, default false), and `order` (integer). The file name is the URL slug. The body holds the write-up.
- **R3** — The `about` collection holds exactly one entry with `name`, `headline`, `tagline`, `location`, `description` (SEO description, max 160 characters), `social` (list of `{label, url}`), `skills` (list of `{group, items[]}`), and `education` (list of `{school, credential, year?}`), plus an optional `resume` path to a file in `public/`. The body is the bio.
- **R4** — Frontmatter that violates a schema fails `npm run build` with an error naming the file and the field.
- **R5** — An `end` earlier than `start` fails validation.
- **R6** — `getExperience()` returns entries newest first by `start`, with current roles ahead of ended ones that share a start month.
- **R7** — `getProjects()` returns projects ordered by `order` ascending, then title A–Z; `getFeaturedProjects()` returns only `featured: true`, in the same order.
- **R8** — `formatRange(start, end?)` returns `"Jan 2023 – Present"` for current roles and `"Jun 2019 – Dec 2022"` for ended ones, in English.
- **R9** — Placeholder entries contain no real personal, student, or employer-confidential data, and are labeled "Placeholder" in their title or company field.

## Acceptance criteria

- **AC1** (R1, R4) — Given an experience file without `company`, when the build runs, then it fails naming the file and `company`.
- **AC2** (R2) — Given a project file `grimify.md`, when collections load, then its slug is `grimify`.
- **AC3** (R3) — Given two files in `src/content/about/`, when `getAbout()` runs, then it throws.
- **AC4** (R5) — Given `start: 2023-01` and `end: 2022-06`, when validated, then validation fails.
- **AC5** (R6) — Given roles starting 2019-06, 2023-01, and 2021-03, when `getExperience()` runs, then they come back 2023-01, 2021-03, 2019-06.
- **AC6** (R7) — Given three projects with one featured, when `getFeaturedProjects()` runs, then it returns one.
- **AC7** (R8) — Given `formatRange('2023-01')`, then the result is `Jan 2023 – Present`.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1 | `experience schema accepts a valid entry` | `tests/unit/schemas.test.ts` | Parse succeeds; `end` optional |
| T2 | R1 | `experience schema rejects missing or malformed fields` | `tests/unit/schemas.test.ts` | Missing `company`, empty `highlights`, `start: "Jan 2023"` each fail |
| T3 | R5 | `experience schema rejects end before start` | `tests/unit/schemas.test.ts` | Fails with an error on `end` |
| T4 | R2 | `project schema applies defaults and validates URLs` | `tests/unit/schemas.test.ts` | `featured` defaults false, `tech` defaults `[]`; `github: "not a url"` fails |
| T5 | R3 | `about schema enforces description length and shapes` | `tests/unit/schemas.test.ts` | 161-char description fails; social items need `label` and `url` |
| T6 | R6 | `sortExperience orders newest first` | `tests/unit/content.test.ts` | Order from AC5; current before ended on the same start |
| T7 | R7 | `sortProjects orders by order then title` | `tests/unit/content.test.ts` | Explicit `order` wins; ties break A–Z; featured filter |
| T8 | R8 | `formatRange formats current and ended roles` | `tests/unit/content.test.ts` | Both AC7 strings |
| T9 | R3 | `getAbout requires exactly one entry` | `tests/unit/content.test.ts` | Throws on zero and on two (pure function over an entry array) |
| T10 | R4 | Build fails on bad frontmatter | — (manual, recorded in progress log) | Temporarily remove `title` from a placeholder project, run `npm run build`, confirm the error names file and field, revert |

**Not unit testable:** R4's build-error wording is Astro's own; verified once by T10. R9 is verified by review of the placeholder files.

## Implementation plan

1. [ ] Write Zod schemas for the three collections, including the end-after-start refinement — touches `src/content/schemas.ts`, `tests/unit/schemas.test.ts` — tests T1, T2, T3, T4, T5
2. [ ] Register the collections with the glob loader — touches `src/content.config.ts` — tests none (wiring; proven by step 3's build)
3. [ ] Add placeholder entries — touches `src/content/experience/placeholder-*.md`, `src/content/projects/placeholder-*.md`, `src/content/about/about.md` — tests T10
4. [ ] Write pure sort/format helpers and the `astro:content` wrappers — touches `src/lib/content.ts`, `tests/unit/content.test.ts` — tests T6, T7, T8, T9

**Must not change:** Scaffold scripts and test config from `astro-scaffold`.

**High-risk steps:** None.

## Risks and open questions

- **Open — about as a collection.** Proposed: site identity (name, headline, social links) lives in the `about` markdown entry so all content stays in markdown. The alternative is a `src/site.config.ts`. Confirm at approval.
- **Open — email.** The Hugo site recently updated a contact email. Whether a public email appears on the site, and which address, is Nathan's call. The schema leaves room for it as a `social` item; no address is added here.
- **Open — images.** No requirement for project screenshots or a headshot yet. If wanted, add `image` + `imageAlt` (alt required whenever image is set) before `projects-pages` is planned.
- **Open — details field.** Hugo split experience into `highlights` (short) and `details` (long list). Proposed: highlights in frontmatter, details as the markdown body. Confirm.
- **Verify at build time.** Content Layer API (`content.config.ts`, `glob()` loader) is current Astro as of recall; confirm against docs.astro.build.

## Progress log

- 2026-10-31 — Planned.
