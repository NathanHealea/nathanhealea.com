---
type: story
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: content-collections
status: in-progress
branch: story/content-collections
worktree_path: /home/nathan/development/nathanhealea-com/nathanhealea-com-worktrees/story-content-collections
created: 2026-11-01
approved: 2026-11-01
commit_type:         # optional override for the merge commit type (default: story=feat, bug=fix, task=chore)
version:             # set by `wi stage`
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the merge commit
---

# Define content collections and schemas

## Summary

Define the `experience`, `projects`, and `about` content collections with strict Zod schemas, the query helpers every page reads from (`getExperience()`, `getProjects()`, `getFeaturedProjects()`, `getAbout()`), and the `formatRange()` date helper. It also adds fictional placeholder entries so the page stories can build against real collections before Nathan's content arrives. After this, adding a role or project means adding one markdown file, and a malformed file fails the build with a message naming the file and the field.

## Context

Depends on `astro-scaffold` (released, v0.0.2). This is a re-plan: the first version of this item was staged on another machine and its branch and document were lost in the repo move. Nothing from it exists on `v10`, so this plan starts from the epic and from the contracts the dependent stories already wrote against:

- `experience-page` uses `getExperience()` (newest first by `start`), `formatRange()`, the fields company, title, location, start, end, highlights, tech, and the markdown body as the role's details. It must not change "experience schema field names".
- `projects-pages` uses `getProjects()`, the fields title, description, tech, github, live, and the body. The URL is `/projects/<file-name>/` and its AC2 names `placeholder-alpha.md`.
- `home-page` uses `getFeaturedProjects()`, `getExperience()`, and about's `name`, `headline`, `tagline`, `location`, and social links.
- `about-page` uses `getAbout()`, `name`, the bio (body), `skills` by group, `education` (school, credential, year), and an optional `resume` path. Its step 2 edits `src/content/about/about.md`, so that file must exist.
- `base-layout` (footer) and `seo` (Person JSON-LD `sameAs`) use `about.social` URLs, and `seo` uses `about.headline`.
- `content-migration` replaces every `placeholder-*` file and greps `src/content` and `public` for "placeholder".

The Hugo site on `main` has `data/experience.yaml` (company, title, location, start/end as "Jan 2023" / "Present", `current`, highlights, tech) and `data/projects.yaml` (title, `slug`, `icon` emoji, description, tech, github, live, featured). The field names here follow Hugo where they carry over, with the changes listed in Requirements.

Verified against the Astro docs (docs.astro.build, content collections guide and `astro:content` reference, read 2026-11-01): collections are defined in `src/content.config.ts` with `defineCollection` from `astro:content`, `glob()` from `astro/loaders`, and `z` from `astro/zod` (Zod 4). The `glob()` loader derives each entry's `id` from its file name, and treats a frontmatter `slug` field as an `id` override. Legacy collections were removed in Astro 6; schema failures are reported as a content entry data error naming the collection and entry.

## Scope

**In scope**

- `src/content.config.ts` with the three collections and strict schemas
- `src/lib/content.ts`: pure sorting, filtering, and date-formatting helpers
- `src/lib/collections.ts`: the `get*` query helpers that wrap `astro:content`
- Fictional placeholder entries: two experience, two projects (one featured), one about
- Unit tests for schemas and helpers, and a build-failure test for a malformed entry

**Out of scope**

- Any page or component that renders this content (children 3–7)
- Real content (child 9, `content-migration`)
- Images on projects or a headshot on about (open question; would add an `image()` field with required alt text)
- Project `icon` emoji from Hugo (not carried over; see open questions)
- A `draft` flag (not requested)

## Requirements

- **R1** — `experience` entries live in `src/content/experience/*.md`. Frontmatter has `company`, `title`, `location` (strings), `start` (`YYYY-MM`), optional `end` (`YYYY-MM`; absent means current), `highlights` (at least one string), and `tech` (strings, default empty). The markdown body is the role's details and may be empty. An `end` earlier than `start` fails validation. Hugo's `current` flag is dropped because it is derivable from `end` and could contradict it.
- **R2** — `projects` entries live in `src/content/projects/*.md`. Frontmatter has `title`, `description` (strings), `tech` (strings, default empty), optional `github` and `live` (absolute `https` URLs), `featured` (boolean, default false), and optional `order` (integer). A project's identity and URL segment is its file name, so `slug` is not a schema field.
- **R3** — The `about` collection is a single entry, `src/content/about/about.md`. Frontmatter has `name`, `headline`, `tagline`, `location` (strings), `social` (list of `{ label, url }`, `url` an absolute URL using `https:` or `mailto:` only, since it becomes an `href`), `skills` (list of `{ group, items }`, at least one item per group), `education` (list of `{ school, credential, year? }`), and optional `resume` (a site path starting with `/`). The body is the bio.
- **R4** — All three schemas are strict: a missing required field, a wrongly typed field, or an unknown field fails the build, and the error names the entry's file and the offending field. (Strict objects are what make a typo like `hilights:` fail instead of being silently dropped.)
- **R5** — `getExperience()` returns every experience entry sorted by `start` descending; roles with the same `start` put the one without `end` (current) first, then later `end` first.
- **R6** — `getProjects()` returns every project sorted by `order` ascending, with unordered projects after ordered ones, and ties broken by `title` (case-insensitive). `getFeaturedProjects()` returns the featured subset in the same order, and an empty array when none are featured.
- **R7** — `getAbout()` returns the single about entry. If the collection has zero entries or more than one, it throws an error naming `src/content/about/` and the count found.
- **R8** — `formatRange(start, end?)` returns `"Jan 2023 – Present"` when `end` is absent, `"Mar 2022 – Oct 2022"` for a range, and `"Mar 2022"` when start and end are the same month. Month names are English three-letter abbreviations, the separator is a spaced en dash, and the result does not depend on the machine's time zone.
- **R9** — Placeholder entries exist so dependent stories can build: `experience/placeholder-current.md` (no `end`) and `experience/placeholder-past.md` (with `end` and a body); `projects/placeholder-alpha.md` (featured, with `github` and `live`, with a body) and `projects/placeholder-beta.md` (not featured, no links, empty body); and `about/about.md`. Every placeholder file name except `about.md` contains "placeholder", every placeholder's text says it is placeholder content, and none names a real person, employer, student, or record. `npm run build` succeeds with them.
- **R10** — FERPA (epic R8): no schema has a field for people served (student names, IDs, grades, or records), and because schemas are strict, such a field cannot be added to an entry without a schema change that review would see. Placeholder content is fictional.

## Acceptance criteria

- **AC1** (R1, R2, R3) — Given each placeholder entry, when parsed by its collection's schema, then it succeeds and defaults (`tech: []`, `featured: false`) are applied.
- **AC2** (R4) — Given a project file with `title` removed, when the build runs, then it exits non-zero and the output names that file's entry and `title`. (This is epic AC2.)
- **AC3** (R4) — Given an experience entry with an unknown field `hilights`, when parsed, then validation fails naming `hilights`.
- **AC4** (R1) — Given `start: 2023-05` and `end: 2023-01`, when parsed, then validation fails naming `end`.
- **AC5** (R5) — Given roles starting 2021-01, 2023-01 (current), and 2023-01 (ended 2023-06), when sorted, then the order is 2023-01 current, 2023-01 ended, 2021-01.
- **AC6** (R6) — Given projects with `order` 2, none, 1, and none, when sorted, then the order is order 1, order 2, then the two unordered by title.
- **AC7** (R7) — Given zero or two about entries, when `getAbout()` runs, then it throws naming `src/content/about/` and the count.
- **AC8** (R8) — Given `formatRange('2023-01')`, `formatRange('2022-03', '2022-10')`, and `formatRange('2022-03', '2022-03')`, then the results are `Jan 2023 – Present`, `Mar 2022 – Oct 2022`, and `Mar 2022`, including under `TZ=America/Los_Angeles` and `TZ=Asia/Tokyo`.
- **AC9** (R9) — Given a clean checkout, when `npm run build` runs, then it exits 0.
- **AC10** (R10) — Given the three schemas, when their field names are listed, then they equal the documented allowlist exactly.

## Test plan

Unit tests run under Vitest (`tests/unit/**/*.test.ts`, the existing `getViteConfig` setup). Schema tests import the Zod schemas from `src/content.config.ts`, which exports them by name in addition to `collections`. Placeholder files are read from disk and parsed with Astro's frontmatter parser if it is importable in Vitest, otherwise with the `yaml` package that Astro already depends on (no new dependency; confirm it resolves at build time).

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1, R2, R3, R9 | `placeholder entries parse and get defaults` | `tests/unit/content-schemas.test.ts` | Every `src/content/**/*.md` frontmatter parses with its collection's schema; `placeholder-beta` gets `tech: []`; non-featured gets `featured: false` |
| T2 | R1 | `experience rejects end before start` | `tests/unit/content-schemas.test.ts` | `start: 2023-05, end: 2023-01` fails with an issue whose path is `end` |
| T3 | R1, R2, R3 | `schemas reject missing and mistyped fields` | `tests/unit/content-schemas.test.ts` | Table of cases: missing `company`; `highlights: []`; `start: Jan 2023`; `start: 2023-13`; project `github: not-a-url`; `github: http://…` (non-https); `featured: "yes"`; `order: 1.5`; about `resume: resume.pdf` (no leading `/`); social `url: javascript:alert(1)` and `url: http://…`; skill group with empty `items`. Each fails with the expected path |
| T4 | R4 | `schemas reject unknown fields` | `tests/unit/content-schemas.test.ts` | `hilights` on experience, `slug` on projects, `email` at about top level each fail naming the key |
| T5 | R10 | `schema fields match the allowlist` | `tests/unit/content-schemas.test.ts` | Top-level and nested object keys of each schema equal the field lists in R1–R3 exactly |
| T6 | R4 | `build fails naming file and field for a malformed entry` | `tests/unit/content-build.test.ts` | Copies the project's config and `src/` into a temp dir (with `node_modules` symlinked), removes `title` from `placeholder-alpha.md`, runs `astro sync` (or `astro build` if sync does not validate). Asserts non-zero exit and output containing `placeholder-alpha` and `title`. Long timeout; temp dir removed afterward |
| T7 | R5 | `sortExperience orders by start then current then end` | `tests/unit/content.test.ts` | AC5 case, plus input array not mutated |
| T8 | R6 | `sortProjects orders by order then title` | `tests/unit/content.test.ts` | AC6 case; title tie-break is case-insensitive |
| T9 | R6 | `selectFeatured keeps order and handles none` | `tests/unit/content.test.ts` | Featured subset keeps sort order; no featured → `[]` |
| T10 | R7 | `selectSingleAbout throws on zero or many` | `tests/unit/content.test.ts` | One → returns it; zero and two → throw with `src/content/about/` and the count |
| T11 | R8 | `formatRange formats ranges` | `tests/unit/content.test.ts` | The three AC8 cases, plus December (`2022-12` → `Dec 2022`) |
| T12 | R8 | `formatRange ignores time zone` | `tests/unit/content.test.ts` | Spawns `node` with `TZ=America/Los_Angeles` and `TZ=Asia/Tokyo` (or uses `vi.stubEnv` if Node honors a runtime `TZ` change) and gets identical output |
| T13 | R5, R6, R7 | `get* helpers wire collections to selectors` | `tests/unit/collections.test.ts` | With `astro:content` mocked via `vi.mock`, `getExperience`, `getProjects`, `getFeaturedProjects`, `getAbout` call `getCollection` with the right collection name and return the sorted/selected result |
| T14 | R9 | `npm run build` | — (verify command) | Exit 0 with placeholders present |

**Not unit testable:** R10's "placeholder content is fictional" is checked by review of the placeholder files, not by a test.

## Implementation plan

1. [x] Prove the build-failure path: add `src/content.config.ts` with the projects collection only, `projects/placeholder-alpha.md` and `placeholder-beta.md`, and the build-failure test — touches `src/content.config.ts`, `src/content/projects/placeholder-alpha.md`, `src/content/projects/placeholder-beta.md`, `tests/unit/content-build.test.ts` — tests T6, T14
2. [x] Add the experience and about collections with strict schemas and their placeholders; export schemas by name — touches `src/content.config.ts`, `src/content/experience/placeholder-current.md`, `src/content/experience/placeholder-past.md`, `src/content/about/about.md`, `tests/unit/content-schemas.test.ts` — tests T1, T2, T3, T4, T5
3. [x] Write the pure helpers: sorting, featured selection, single-about selection, `formatRange` — touches `src/lib/content.ts`, `tests/unit/content.test.ts` — tests T7, T8, T9, T10, T11, T12
4. [x] Write the `get*` query helpers over `astro:content` — touches `src/lib/collections.ts`, `tests/unit/collections.test.ts` — tests T13
5. [x] Delete the scaffold's `tests/unit/smoke.test.ts` now that real unit tests exist — touches `tests/unit/smoke.test.ts` — tests none (the suite still has tests)

Step 1 goes first because it carries the most unknowns: whether `astro sync` validates schemas or only `astro build` does, the exact error text Astro 7 prints, and whether a temp-copy build works under Vitest in reasonable time.

**Must not change:** `astro.config.mjs` (`site`), the Vitest and Playwright configs, `src/pages/index.astro`, `package.json` dependencies. After this lands, the field names in R1–R3 and the `get*` / `formatRange` signatures become the contract that children 3–9 build on.

**High-risk steps:** None.

## Risks and open questions

- **Decision — month-precision dates as strings.** `start`/`end` are `YYYY-MM` strings, not `z.coerce.date()`. Coercing a bare month to a `Date` lands on midnight UTC, which renders as the previous month in US time zones. Strings also give `experience-page` a valid `<time datetime>` value as-is. This differs from Hugo's `"Jan 2023"` / `"Present"`; `content-migration` converts them.
- **Decision — project order.** Hugo used file order. Here it is an explicit optional `order` field, then title. Proposed; confirm.
- **Verified (2026-11-01) — `astro sync` validates.** A probe with a missing `title` and an unknown key exited 1 in about 2s with `InvalidContentEntryDataError: projects → placeholder-alpha data does not match collection schema`, `title: Required`, `Unrecognized key: "bogus"`, and the file path. T6 uses `astro sync`.
- **Verify at build time — `vi.mock('astro:content')`.** Whether Vitest under `getViteConfig` can mock the virtual module. Fallback: inject `getCollection` as a parameter in `collections.ts` internals and test that seam.
- **Verified (2026-11-01) — URL validation.** Zod 4 `z.url()` accepts `mailto:` but also `javascript:`, so plain `z.url()` would let a script URL into an `href`. Social URLs are restricted to `https:`/`mailto:` and project links to `https:`. Whether Nathan's email goes on the site is his call in `content-migration`.
- **Open — project icons.** Hugo had emoji icons per project. Dropped: emoji read aloud by screen readers unless marked decorative, and none of the page stories use them. Add later if wanted.
- **Open — images.** No `image` field on projects or about. `projects-pages` and `about-page` both defer to this item; adding one later is a schema change that needs alt text required.
- **Setup — this machine.** `node_modules` is absent and `wi` is not on `PATH` (it is at `~/.claude/workflow/bin/wi`). The build phase runs `npm ci` and installs the Playwright browser in the worktree.
- **Risk — re-plan drift.** The lost first version may have chosen different field names. Nothing downstream was built against it, so only the dependent story documents bind this plan, and it matches them.

## Progress log

- 2026-11-01 — Planned. Re-plan after the first version's branch and document were lost in the repo move; epic status reset from `staged` to `planned`.
- 2026-11-01 — Plan approved.
- 2026-11-01 — Started on branch story/content-collections from origin/v10.
- 2026-11-01 — Probes: astro sync validates schemas (T6 uses it); z.url() accepts javascript:, so social url restricted to https:/mailto: (R3, T3 updated).
- 2026-11-01 — Added @types/node@^24 dev dependency (approved by Nathan) after step 1's build test broke astro check; no tsconfig change needed. Schema tests read frontmatter via @astrojs/internal-helpers/frontmatter, a transitive Astro dependency; an Astro upgrade could move it.
