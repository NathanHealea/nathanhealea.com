---
type: epic
slug: astro-site
status: planned      # planned | in-progress | released
created: 2026-10-31
approved:
---

# Astro personal website

## Summary

Rebuild nathanhealea.com as an Astro static site that presents Nathan's work experience, projects, and background to a general professional audience. All content lives in markdown files with schema-validated frontmatter, so adding a role or project means adding one file. The site ships with complete SEO metadata, meets WCAG 2.1 AA, and deploys to Cloudflare Pages, replacing the Hugo site currently on Vercel.

## Context

`main` holds the live Hugo site (v9): a custom theme, `data/experience.yaml` (multiple roles with highlights, details, and tech lists), `data/projects.yaml` (title, slug, description, tech, GitHub and live links, featured flag), dark mode, and a `vercel.json` build config. Local `main` has diverged from `origin/main` (3 local-only, 4 remote-only commits).

`v10` is the rebuild branch. It contains only the 2021 initial commit, with `.gitignore` and `README.md` deleted in the working tree but not committed. `CLAUDE.md` sets `base_branch: v10`, so every child work item branches from and merges into `v10`. The Hugo site on `main` stays live until the cutover in child 10.

Decisions made in planning (2026-10-31):

- Audience: mixed / general professional presence, weighting experience and projects equally, no single call to action.
- Sections at launch: work experience, projects, about / résumé. No blog.
- Content source: files Nathan provides (not yet supplied).
- Testing: Vitest for schemas and helpers; Playwright with `@axe-core/playwright` for rendered pages, SEO tags, and accessibility.
- Hosting: Cloudflare Pages.

## Scope

**In scope**

- Astro project, npm scripts, and test tooling on `v10`
- Content collections for experience, projects, and about, with Zod schemas
- Base layout, design tokens, typography, header, navigation, and footer
- Home, experience, projects index, project detail, and about pages
- SEO: per-page meta, canonical URLs, Open Graph and Twitter cards, sitemap, robots.txt, Person JSON-LD
- WCAG 2.1 AA compliance on every page
- Real content entered from Nathan's files
- Cloudflare Pages deployment and domain cutover

**Out of scope**

- Blog or writing section, and RSS
- Contact form or any server-side code
- Analytics or tracking (none until Nathan picks a privacy-respecting option)
- A CMS or admin UI
- Changes to the Hugo site on `main`

## Requirements

- **R1** — The site is an Astro static build: `npm run build` produces a deployable `dist/` with no server runtime.
- **R2** — Experience, project, and about content are markdown files with frontmatter validated by a schema; a file with missing or wrongly typed frontmatter fails the build with a message naming the file and field.
- **R3** — The site has a home page, an experience page, a projects index, one detail page per project, and an about page, all reachable from the primary navigation within one click of the home page.
- **R4** — Every page has a unique `<title>`, a meta description, a canonical URL, Open Graph and Twitter card tags, and is listed in `sitemap-index.xml`; the site serves `robots.txt` and a Person JSON-LD block.
- **R5** — Every page has zero axe violations for the `wcag2a`, `wcag2aa`, `wcag21a`, and `wcag21aa` tags, is fully operable by keyboard, and shows a visible focus indicator.
- **R6** — Every page renders without horizontal scrolling from 320px to 1920px viewport width.
- **R7** — nathanhealea.com serves the Astro build from Cloudflare Pages over HTTPS.
- **R8** — No page contains student records or other FERPA-protected data; experience entries describe work, not people served.

## Acceptance criteria

- **AC1** (R1) — Given a clean checkout of `v10`, when `npm ci && npm run build` runs, then it exits 0 and `dist/` contains only static files.
- **AC2** (R2) — Given a project file with `title` removed, when the build runs, then it fails and the error names that file and `title`.
- **AC3** (R3) — Given the home page, when a visitor uses the primary navigation, then experience, projects, and about each load with one activation.
- **AC4** (R4) — Given any built page, when its HTML is inspected, then title, description, canonical, `og:*`, and `twitter:*` tags are present and the title is unique across the site.
- **AC5** (R5) — Given the Playwright suite, when it runs axe on every route, then it reports zero violations.
- **AC6** (R6) — Given a 320px viewport, when any page loads, then `document.documentElement.scrollWidth` is no greater than the viewport width.
- **AC7** (R7) — Given the cutover is complete, when `https://nathanhealea.com` is requested, then the response comes from Cloudflare and serves the Astro home page.

## Child work items

Each child gets its own planning pass when it is picked up. `wi` updates the
Status column by matching the Slug column, so keep slugs exact.

| # | Type | Slug | Title | Covers | Depends on | Status |
|---|------|------|-------|--------|-----------|--------|
| 1 | task | astro-scaffold | Scaffold Astro project with test tooling | R1 | — | released |
| 2 | story | content-collections | Define content collections and schemas | R2, R8 | 1 | released |
| 3 | story | base-layout | Base layout, design tokens, and navigation | R3, R5, R6 | 1 | released |
| 4 | story | experience-page | Work experience page | R3, R5, R6 | 2, 3 | released |
| 5 | story | projects-pages | Projects index and detail pages | R3, R5, R6 | 2, 3 | planned |
| 6 | story | about-page | About page with résumé download | R3, R5, R6 | 2, 3 | planned |
| 7 | story | home-page | Home page | R3, R5, R6 | 4, 5, 6 | planned |
| 8 | story | seo | SEO metadata, sitemap, and structured data | R4 | 3 | planned |
| 9 | task | content-migration | Enter real content from source files | R2, R8 | 2 | planned |
| 10 | task | cloudflare-deploy | Deploy to Cloudflare Pages and cut over the domain | R7 | 7, 8, 9 | planned |

**Independently shippable:** None to production; the domain cutover (10) waits on everything else. On `v10`, each child merges on its own. 3 and 2 can run in parallel after 1; 4, 5, 6, 8, and 9 can run in parallel once their dependencies land.

## Risks and open questions

- **Open — content files.** Nathan has not supplied the source files yet. Child 9 is blocked on them. The Hugo `data/*.yaml` on `main` is a possible fallback or cross-check, but the stated source is Nathan's files.
- **Open — design direction.** No visual direction, palette, typography, or reference sites given. Decided during child 3's planning pass.
- **Open — dark mode.** The Hugo site has a dark-mode toggle. Whether to carry it forward is decided during child 3.
- **Open — performance targets.** No Lighthouse or Core Web Vitals targets given. None are invented here; add them to child 8 or 10 if wanted.
- **Risk — domain cutover.** Moving nathanhealea.com from Vercel to Cloudflare means changing DNS, and possibly nameservers. A mistake takes the live site down, and DNS propagation delays any rollback. Child 10 is high-risk and needs sign-off before that step.
- **Risk — Cloudflare product direction.** Cloudflare now also offers static assets on Workers alongside Pages. Confirm the current recommended path against Cloudflare's and Astro's docs when child 10 is planned; not verified here.
- **Risk — unclean base.** `v10` has uncommitted deletions of `.gitignore` and `README.md`, plus the untracked `CLAUDE.md` and `docs/`. `wi start` needs these committed or resolved first.
- **Risk — diverged `main`.** Local and remote `main` have diverged. This does not block the epic (base is `v10`) but needs reconciling before cutover so the Hugo fallback is the version Nathan expects.

## Progress log

- 2026-10-31 — Planned.
