---
type: task
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: token-rename
status: staged
branch: task/token-rename
worktree_path: /home/nathan/development/nathanhealea-com/nathanhealea-com-worktrees/task-token-rename
created: 2026-11-01
approved: 2026-11-01
commit_type: refactor
version: 0.2.1
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the merge commit
---

# Rename design tokens to Tailwind theme conventions

## Summary

Rename the CSS custom properties in `src/styles/tokens.css` to Tailwind v4's theme variable namespaces (`--color-*`, `--text-*`, `--container-*`, `--spacing-*`), and update every reference and the design pack to match. The names become familiar to anyone who knows Tailwind, and the token file can become a Tailwind `@theme` block with little change if Tailwind is ever adopted. No token value changes, nothing on the page changes, and no dependency is added.

## Context

`base-layout` (released as v0.2.0) introduced 43 tokens in `src/styles/tokens.css`, each prefixed by role: `--paper`, `--size-display`, `--gap-inner`. Seven files read them: `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `Nav.astro`, `Footer.astro`, and `src/pages/404.astro`. No test file references a token name. `design/DESIGN-SYSTEM.md` names six of them. The comment at the top of `tokens.css` says to change the pack first, then the file.

Tailwind v4 groups theme variables into namespaces, and each namespace produces a family of utility classes. Source: https://tailwindcss.com/docs/theme (v4.3, read 2026-11-01). The namespaces used here:

| Namespace | Tailwind utilities it drives |
|---|---|
| `--color-*` | color utilities such as `bg-*`, `text-*` |
| `--font-*` | font family utilities such as `font-sans` |
| `--text-*` | font size utilities such as `text-xl` |
| `--leading-*` | line height utilities such as `leading-tight` |
| `--tracking-*` | letter spacing utilities such as `tracking-wide` |
| `--container-*` | size utilities such as `max-w-md` |
| `--spacing-*` | spacing and sizing utilities such as `px-4`, `max-h-16` |
| `--ease-*` | timing function utilities such as `ease-out` |

The branch was cut from `origin/v10`, which lacks `base-layout`. Local `v10` was merged in (`5c3b3de`) so the files exist on the branch.

### Rename map

| Current | New | Rule |
|---|---|---|
| `--paper` `--ink` `--fir` `--slate` `--stone` `--sage` | `--color-paper` `--color-ink` `--color-fir` `--color-slate` `--color-stone` `--color-sage` | `--color-*` |
| `--size-display` `--size-section` `--size-statement` `--size-standfirst` `--size-body` `--size-small` `--size-wordmark` `--size-nav` | `--text-display` `--text-section` `--text-statement` `--text-standfirst` `--text-body` `--text-small` `--text-wordmark` `--text-nav` | `--text-*` |
| `--measure` | `--container-measure` | `--container-*` (a max width) |
| `--content-max` | `--container-content` | `--container-*` (a max width) |
| `--margin` | `--spacing-margin` | `--spacing-*` |
| `--gap-section` | `--spacing-section` | `--spacing-*` |
| `--gap-inner` | `--spacing-inner` | `--spacing-*` |
| `--tap-min` | `--spacing-tap` | `--spacing-*` (a min height) |
| `--font-display` `--font-text` | unchanged | already `--font-*` |
| `--leading-*` (6) `--tracking-*` (2) | unchanged | already in namespace |
| `--ease-out` | unchanged | already `--ease-*` |
| `--axis` `--focus-width` `--focus-offset` `--mark-rest` `--mark-hover` `--mark-current` `--rise-duration` `--rise-stagger` `--enter-duration` `--enter-stagger` `--mark-duration` `--turn-duration` | unchanged | no Tailwind namespace fits; keep the project name |

The map renames 20 tokens and leaves 23 as they are. Tokens with no matching namespace keep their names (decided). Inventing a prefix for them would make them look like Tailwind tokens when Tailwind would not read them.

## Scope

**In scope**

- Renaming the tokens in `src/styles/tokens.css` per the rename map, including the `@media (min-width: 960px)` override of `--gap-section`.
- Updating every `var()` reference in `src/`.
- Updating the token names in `design/DESIGN-SYSTEM.md`, and adding a short section stating the naming convention and the rename map's rule column.
- A unit test guarding the rename.

**Out of scope**

- Adding Tailwind or any other dependency.
- Changing any token value, adding tokens, or removing tokens.
- Converting `--leading-*` and `--tracking-*` into Tailwind's `--text-*--line-height` companion form (see risks).
- Editing released work item documents (`story-base-layout.md` and others), which record history under the old names.
- Pushing `v10`.

## Requirements

- **R1** — `src/styles/tokens.css` declares every token under its new name from the rename map, and declares none of the 20 old names that the map renames.
- **R2** — Every `var(--name)` reference in `src/**/*.css` and `src/**/*.astro` names a custom property declared in `src/` (in `tokens.css` or in the same file), so no reference falls back silently.
- **R3** — Rendered pages are unchanged. For every element on `/` and `/404` at 320px and 1280px wide, at rest and with the nav link, body link, and skip link hovered and focused, the computed styles match the output of `v10` at `0af365a`.
- **R4** — `design/DESIGN-SYSTEM.md` uses the new names and states the naming convention: which namespace each token group maps to, and that tokens with no namespace keep their names.
- **R5** — Accessibility is unchanged: the existing axe, contrast, focus, reflow and reduced-motion end-to-end tests pass with no edits to any file under `tests/e2e/`.

## Acceptance criteria

- **AC1** (R1) — Given the built branch, when `tokens.css` is read, then it declares every new name in the map, and no `--paper`, `--size-*`, `--gap-*`, `--margin`, `--measure`, `--content-max` or `--tap-min` declaration remains.
- **AC2** (R2) — Given any `.css` or `.astro` file under `src/`, when its `var()` references are listed, then each name is declared in `src/styles/tokens.css` or in that same file.
- **AC3** (R3) — Given `0af365a` and the branch head, when the computed-style capture runs against both, then the two captures are identical.
- **AC4** (R4) — Given `design/DESIGN-SYSTEM.md`, when it is searched for the 20 old names, then none appears, and a naming section lists the namespace for each token group.
- **AC5** (R5) — Given the branch, when `npm run test:e2e` runs, then all tests pass and `git diff 0af365a -- tests/e2e` is empty.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1 | `declares every token under its new name` | `tests/unit/tokens.test.ts` | Each new name in the map is declared in `tokens.css` |
| T2 | R1 | `declares none of the renamed old names` | `tests/unit/tokens.test.ts` | None of the 20 old names is declared in `tokens.css`, including inside the `@media` block |
| T3 | R2 | `every var() reference resolves to a declared token` | `tests/unit/tokens.test.ts` | Collects `var(--x)` from all `src/**/*.{css,astro}` and fails, listing the names, if any is undeclared. Must also catch a reference with a fallback, `var(--x, 0)`, and a reference inside a `@media` block |
| T4 | R3 | computed-style diff (one-off, not committed) | scratchpad Playwright script | For all elements on `/` and `/404`, at 320px and 1280px, at rest and with nav, body and skip link hovered and focused: `getComputedStyle` output from `0af365a` equals output from the branch. The result is recorded in the progress log |
| T5 | R5 | existing suites | `tests/e2e/layout.spec.ts`, `smoke.spec.ts`, `a11y-helper.spec.ts` | Pass unchanged |

T1 and T2 fail on current code. T3 passes on current code, because every reference resolves today. That is expected: it guards the rename, and it is what fails if a reference is missed. To show T3 can fail, rename one declaration in a scratch copy and run it.

T4 is not committed because a committed snapshot of every computed style would break on every intentional style change after this item.

**Not unit testable:** R4 is verified in review, plus the AC4 search run during step 1.

## Implementation plan

1. [x] Rename the tokens in the design pack and add the naming convention section — touches `design/DESIGN-SYSTEM.md` — tests none (documentation; AC4 search)
2. [x] Capture the T4 baseline from `0af365a`, then rename every token and reference in one commit so no intermediate commit renders broken — touches `src/styles/tokens.css`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`, `src/pages/404.astro`, `tests/unit/tokens.test.ts` — tests T1, T2, T3, T4, T5

Step 2 touches eight files, more than the usual five. It is one mechanical rename: splitting it would leave commits where some `var()` references point to names that no longer exist.

**Must not change:** token values; the `@font-face` rules and font files; any rendered computed style; files under `tests/e2e/`; `package.json` dependencies; released work item documents.

**High-risk steps:** None.

## Risks and open questions

- **A missed reference fails silently.** An undefined `var()` makes the property invalid at computed-value time, so it falls back to inherited or initial values with no error. Mitigation: T3 (static, covers hover and focus rules that might not render) and T4 (rendered).
- **Line height and letter spacing form (decided: keep standalone).** Tailwind's default theme pairs each size with `--text-*--line-height`, but the theme docs show that form only in the default listing, without explaining it. The standalone `--leading-*` and `--tracking-*` names are documented namespaces and already in use. If Tailwind is adopted later, add the companion pairs then.
- **Spacing names (proposed).** `--spacing-margin`, `--spacing-section`, `--spacing-inner` and `--spacing-tap` would make Tailwind classes such as `px-margin` and `min-h-tap`. If you prefer other suffixes, say so before approval.
- **Stale base (open, blocks stage, not build).** `origin/v10` is 21 commits behind local `v10` and lacks `v0.2.0`. `wi stage` bumps from `origin/v10`, which is still at 0.1.0. That would produce 0.1.1, a version below the released 0.2.0. Push `v10` and `v0.2.0` before staging, so the bump is 0.2.0 → 0.2.1.

## Progress log

- 2026-11-01 — Planned.
- 2026-11-01 — Merged local `v10` (`5c3b3de`): the branch was cut from `origin/v10`, which lacks `base-layout`.
- 2026-11-01 — Plan approved.
- 2026-11-01 — Started implementation on branch task/token-rename at 47aa3c4.
- 2026-11-01 — Build complete. T4: computed styles on / and /404 at 320px and 1280px, 50 states (rest, hover on nav/body/footer links, keyboard focus on every link), 3690 element snapshots, identical to the pre-rename build. A deliberate missed reference (Nav.astro var(--fir)) failed both T3 and T4, then was restored.
- 2026-11-01 — Review: fixed MED, T3 resolved references against every file's declarations instead of tokens.css plus the same file (R2); AC2 wording aligned with R2. Fixed LOW, the design pack overstated the @theme conversion as unchanged.
- 2026-11-01 — Mutation audit: 10 mutants, 6 killed. Closed M6 (old name redeclared in a component), M7 (960px override deleted) and M9 (stray token) with stronger T1/T2 checks; all three now fail. M8 and M10 (token value changes) are guarded only by T4, by design.
- 2026-11-01 — Staged: verification passed; version 0.2.0 → 0.2.1; no changelog file.
