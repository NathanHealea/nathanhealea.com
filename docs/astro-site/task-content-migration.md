---
type: task
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: content-migration
status: planned      # planned | in-progress | changes-requested | staged | released
branch: task/content-migration
worktree_path:       # set by `wi start`
created: 2026-10-31
approved:            # set by `wi approve`
commit_type:         # optional override for the release subject type (default: story=feat, bug=fix, task=chore)
version:             # set by `wi stage`
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the branch's last commit
---

# Enter real content from source files

## Summary

Replace the placeholder entries with Nathan's real experience, projects, and about content, converted from the source files he provides into markdown that passes the schemas. After this, the site says true things about Nathan and nothing else.

## Context

Depends on `content-collections`. **Blocked:** the source files have not been supplied. The Hugo site on `main` has `data/experience.yaml`, `data/projects.yaml`, and identity in `hugo.toml`; whether those are a source, a cross-check, or ignored is an open question. This task adds no code, only content files and a résumé PDF.

## Scope

**In scope**

- One markdown file per role in `src/content/experience/`
- One markdown file per project in `src/content/projects/`
- The `about` entry: identity, bio, skills, education, social links
- The résumé PDF in `public/`, if Nathan supplies one
- Deleting the placeholder entries and placeholder PDF

**Out of scope**

- Writing new copy Nathan has not supplied or approved (no invented bios, highlights, or project descriptions)
- Schema changes (if a field is missing, that goes back to `content-collections`)

## Requirements

- **R1** — Every role and project in the source files has exactly one content file, and the build passes.
- **R2** — No placeholder entry or placeholder file remains (`grep -ri placeholder src/content public` finds nothing).
- **R3** — Every factual statement in the content traces to a source file or to Nathan's written approval; nothing is invented.
- **R4** — No content includes student records, names of people served, or other FERPA-protected or personnel data; no home address or personal phone number.
- **R5** — The résumé PDF, if included, is tagged, has a document title, and passes a PDF accessibility check.
- **R6** — All pages still pass the full e2e suite with real content.

## Acceptance criteria

- **AC1** (R1, R6) — Given the migrated content, when `npm run build && npm run test:e2e` runs, then both pass.
- **AC2** (R2) — Given the repo, when searched for "placeholder" under `src/content` and `public`, then no matches.
- **AC3** (R3) — Given the migration, when Nathan reviews the side-by-side mapping in the progress log, then he signs off.
- **AC4** (R5) — Given the résumé PDF, when checked with a PDF accessibility checker, then it reports no failures.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1, R6 | Full verify suite | — (verify commands) | Build, typecheck, unit, and e2e pass on real content |
| T2 | R2 | `no placeholder content ships` | `tests/unit/content-integrity.test.ts` | Reads `src/content/**` and `public/` file names; none contain "placeholder" (case-insensitive) |
| T3 | R3 | Source mapping review | — (manual) | Progress log lists each content file with its source; Nathan approves |
| T4 | R4 | Privacy review | — (manual, `a11y-privacy-auditor` at stage) | No FERPA, personnel, or personal contact data in content |
| T5 | R5 | PDF accessibility check | — (manual) | Result recorded in progress log |

**Not unit testable:** R3, R4, R5 need human review; see T3–T5.

## Implementation plan

1. [ ] Add the content-integrity test — touches `tests/unit/content-integrity.test.ts` — tests T2
2. [ ] Enter the about entry and résumé from source files — touches `src/content/about/about.md`, `public/resume.pdf` — tests T5
3. [ ] Enter experience entries from source files — touches `src/content/experience/*.md` — tests T1
4. [ ] Enter project entries from source files — touches `src/content/projects/*.md` — tests T1
5. [ ] Delete placeholders and record the source mapping — touches `src/content/**/placeholder-*.md`, `public/resume-placeholder.pdf` — tests T2, T3, T4

**Must not change:** Schemas, components, and pages.

**High-risk steps:** None. (Content handling is sensitive under R4 but reversible.)

## Risks and open questions

- **Blocker — source files.** Nathan to supply the path(s): résumé, LinkedIn export, notes.
- **Open — Hugo data.** Use `main`'s `data/*.yaml` as a source, as a cross-check against the new files, or not at all?
- **Open — which projects.** Hugo lists several projects. Are all of them on the new site, and which are featured?
- **Risk — step size.** If there are many roles or projects, steps 3 and 4 exceed five files. That is acceptable for content-only steps; split per employer if review is easier.

## Progress log

- 2026-10-31 — Planned.
