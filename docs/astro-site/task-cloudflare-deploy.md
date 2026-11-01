---
type: task
epic: astro-site    # removed by `wi new` when there is no parent epic
slug: cloudflare-deploy
status: planned      # planned | in-progress | changes-requested | staged | released
branch: task/cloudflare-deploy
worktree_path:       # set by `wi start`
created: 2026-10-31
approved:            # set by `wi approve`
commit_type:         # optional override for the release subject type (default: story=feat, bug=fix, task=chore)
version:             # set by `wi stage`
review_approved:     # set by `wi accept`
pr:                  # set by `wi pr`
tag:                 # set by `wi release`; the tag sits on the branch's last commit
---

# Deploy to Cloudflare Pages and cut over the domain

## Summary

Deploy the Astro build to Cloudflare Pages, verify it on the preview URL, then point nathanhealea.com at it, replacing the Hugo site on Vercel. This is the only step in the epic that changes what the public sees.

## Context

Depends on `home-page`, `seo`, and `content-migration`. The Hugo site deploys from `main` to Vercel (`vercel.json` pins Hugo 0.163.3). Where the nathanhealea.com DNS is managed today (registrar, Vercel, or Cloudflare) is unknown. The site is a static build, so no Astro adapter is needed for hosting static files.

## Scope

**In scope**

- Any repo config Cloudflare Pages needs (build command, output directory, Node version)
- Running the e2e suite against the Cloudflare preview URL
- Custom domain setup and DNS cutover, with a written rollback
- Manual link-preview check (from `seo`)

**Out of scope**

- Removing the Vercel project or the Hugo code (after a stable period, separately)
- Analytics, redirects from old Hugo URLs unless they differ (see open questions)

## Requirements

- **R1** — A Cloudflare Pages project builds `v10` (or the production branch decided below) with `npm run build`, output `dist/`, on a supported Node version.
- **R2** — The Playwright suite passes against the Cloudflare preview URL by setting a `BASE_URL` environment variable.
- **R3** — After cutover, `https://nathanhealea.com/` and `https://www.nathanhealea.com/` (if used today) serve the Astro site over HTTPS with a valid certificate, and one redirects to the other.
- **R4** — Every URL the Hugo site served either serves equivalent content or redirects with a 301.
- **R5** — A written rollback restores the Vercel site, and its expected time is recorded before cutover.

## Acceptance criteria

- **AC1** (R1) — Given a push to the production branch, when Cloudflare builds, then the deploy succeeds.
- **AC2** (R2) — Given `BASE_URL=<preview URL>`, when `npm run test:e2e` runs, then all tests pass.
- **AC3** (R3) — Given cutover, when `curl -I https://nathanhealea.com/` runs, then the response is 200 from Cloudflare.
- **AC4** (R4) — Given the list of Hugo URLs, when each is requested, then each returns 200 or a 301 to the matching page.

## Test plan

| ID | Covers | Test | File | Asserts |
|----|--------|------|------|---------|
| T1 | R2 | `BASE_URL overrides the local server` | `playwright.config.ts` | With `BASE_URL` set, no local `webServer` starts and tests hit the URL |
| T2 | R2 | Full e2e on preview URL | — (command) | `BASE_URL=<preview> npm run test:e2e` passes |
| T3 | R3 | Post-cutover check | — (manual, `curl -I`) | 200, Cloudflare server header, valid cert, apex/www redirect |
| T4 | R4 | Hugo URL check | `tests/e2e/legacy-urls.spec.ts` | Each old URL (from the Hugo sitemap) returns 200 or 301 to the right place |

**Not unit testable:** R1 and R3 are platform configuration; verified by T2 and T3. R5 is a document reviewed by Nathan.

## Implementation plan

1. [ ] Support `BASE_URL` in Playwright config — touches `playwright.config.ts` — tests T1
2. [ ] Record the Hugo URL list and add redirects for any that change — touches `tests/e2e/legacy-urls.spec.ts`, `public/_redirects` — tests T4
3. [ ] Nathan creates the Cloudflare Pages project and connects the repo; run e2e on the preview URL — touches nothing in the repo (dashboard), progress log — tests T2
4. [ ] Write the rollback plan and record current DNS records — touches `docs/astro-site/task-cloudflare-deploy.md` — tests none (document)
5. [ ] Cut over DNS to Cloudflare Pages and verify — touches nothing in the repo (DNS) — tests T3, T4

**Must not change:** The Hugo site on `main` and the Vercel project, until a stable period after cutover.

**High-risk steps:** 5 (DNS change on the live domain; `git revert` cannot undo it, and propagation delays rollback). Step 3 also requires Nathan's Cloudflare account; no agent touches account credentials.

## Risks and open questions

- **Open — production branch.** Deploy from `v10` directly, or merge `v10` into `main` first so `main` stays the production branch? Merging into `main` replaces the Hugo code there.
- **Open — DNS location.** Where is nathanhealea.com's DNS today? Moving nameservers to Cloudflare is a bigger change than adding a CNAME.
- **Open — www.** Is `www` used today, and which host is canonical?
- **Verify at plan time.** Cloudflare's current recommendation for static Astro sites (Pages vs. Workers static assets), supported Node versions, and the `_redirects` format. Check Cloudflare's and Astro's docs; nothing here is verified.
- **Risk — diverged `main`.** Local and `origin/main` have diverged. Reconcile before cutover so the Vercel rollback target is the right version.

## Progress log

- 2026-10-31 — Planned.
