---
type: story
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: seo
status: planned      # planned | in-progress | changes-requested | staged | released
branch: story/seo
worktree_path:       # set by `wi start`
created: 2026-10-31
approved:            # set by `wi approve`
commit_type:         # optional override for the release subject type (default: story=feat, bug=fix, task=chore)
version:             # set by `wi stage`
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the branch's last commit
---

# SEO metadata, sitemap, and structured data

## Summary

Give every page the metadata search engines and link previews need: unique titles, descriptions, canonical URLs, Open Graph and Twitter card tags, a sitemap, `robots.txt`, and Person structured data. Done once in the layout, so every current and future page gets it.

## Context

Depends on `base-layout` (the `title` / `description` prop contract) and reads identity from the `about` entry (`content-collections`). `astro.config.mjs` already sets `site: 'https://nathanhealea.com'` (`astro-scaffold`). The Hugo site set a description, author, and keyword list in `hugo.toml`; `meta keywords` is not carried over because major search engines ignore it.

## Scope

**In scope**

- `Seo.astro` component rendered by `BaseLayout`
- Per-page title and description for every route, including project detail pages from frontmatter
- Default social share image
- `@astrojs/sitemap` integration and `robots.txt`
- Person JSON-LD on `/`

**Out of scope**

- Analytics, Search Console verification tags (need Nathan's accounts)
- Per-project generated OG images

## Requirements

- **R1** — Every page has `<title>` in the form `<Page> | <about.name>` (home: `<about.name> | <about.headline>`), unique across the site.
- **R2** — Every page has a `meta name="description"` of 50–160 characters. Project pages use the project `description`, truncated at a word boundary if longer.
- **R3** — Every page has `link rel="canonical"` with the absolute `https://nathanhealea.com` URL ending in `/`.
- **R4** — Every page has `og:title`, `og:description`, `og:url`, `og:type`, `og:image` (absolute), `og:image:alt`, and `twitter:card="summary_large_image"`.
- **R5** — The build emits `sitemap-index.xml` listing every page except the 404, and `robots.txt` allowing all crawlers and referencing the sitemap.
- **R6** — `/` contains one `application/ld+json` block of `@type: Person` with `name`, `jobTitle` (headline), `url`, and `sameAs` (social URLs), and it parses as valid JSON.
- **R7** — The 404 page has `meta name="robots" content="noindex"`.

## Acceptance criteria

- **AC1** (R1) — Given every built page, when titles are collected, then there are no duplicates.
- **AC2** (R2, R3, R4) — Given any page, when its head is inspected, then every listed tag is present with a non-empty value and absolute URLs.
- **AC3** (R5) — Given `dist/`, when built, then `sitemap-index.xml` and `robots.txt` exist and the sitemap does not list `/404`.
- **AC4** (R6) — Given `/`, when the JSON-LD is parsed, then `@type` is `Person` and `sameAs` matches `about.social` URLs.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R1 | `titles are unique` | `tests/e2e/seo.spec.ts` | Visit every route from the sitemap; collect titles; no duplicates; format matches |
| T2 | R2 | `buildDescription truncates at word boundary` | `tests/unit/seo.test.ts` | 200-char input → ≤160 chars ending on a whole word; short input unchanged |
| T3 | R2, R3, R4 | `every page has full meta` | `tests/e2e/seo.spec.ts` | For each route: description length 50–160, canonical absolute with trailing slash, all OG/Twitter tags present |
| T4 | R5 | `sitemap and robots are emitted` | `tests/e2e/seo.spec.ts` | Fetch `/sitemap-index.xml` and `/robots.txt`; robots references sitemap; no 404 URL in sitemap |
| T5 | R6 | `home has Person JSON-LD` | `tests/e2e/seo.spec.ts` | Parse block; check fields against the about entry |
| T6 | R7 | `404 is noindex` | `tests/e2e/seo.spec.ts` | Meta robots on 404 |

**Not unit testable:** Link-preview rendering on real platforms; verified manually with a preview URL after `cloudflare-deploy` and recorded there.

## Implementation plan

1. [ ] Write `buildTitle` and `buildDescription` helpers — touches `src/lib/seo.ts`, `tests/unit/seo.test.ts` — tests T2
2. [ ] Build `Seo.astro`, wire it into `BaseLayout`, and pass page-specific props from every page — touches `src/components/Seo.astro`, `src/layouts/BaseLayout.astro`, `src/pages/**/*.astro` — tests T1, T3, T6
3. [ ] Add the sitemap integration and `robots.txt` — touches `astro.config.mjs`, `package.json`, `package-lock.json`, `public/robots.txt` — tests T4
4. [ ] Add Person JSON-LD to the home page and the default OG image — touches `src/pages/index.astro`, `public/og-default.png`, `tests/e2e/seo.spec.ts` — tests T5

**Must not change:** `BaseLayout` prop names `title` and `description`.

**High-risk steps:** None.

## Risks and open questions

- **New dependency.** `@astrojs/sitemap`. Approving this plan approves it. The alternative is a hand-written sitemap endpoint (no dependency, more code).
- **Open — share image.** Who makes the 1200×630 default OG image, and what goes on it (name and headline on brand colors is the usual choice)? Needs the design direction from `base-layout`.
- **Open — title format.** Proposed `<Page> | Nathan Healea`; Hugo used `Nathan Healea — Full-Stack Software Engineer`. Confirm separator and home title.
- **Verify at build time.** Current `@astrojs/sitemap` output file names and options; check docs.astro.build.

## Progress log

- 2026-10-31 — Planned.
