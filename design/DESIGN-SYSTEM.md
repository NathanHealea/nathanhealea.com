# nathanhealea.com — Design System v1 ("The Public Report")

*Source: /hone:design, 2026-11-01. Direction III of four explored (Paint Card, Valley Light, The Public Report, Plain Statement), picked by Nathan. Taste inputs: "technical portfolio for a full stack developer, software engineer"; warm, grounded; one theme; serif display + sans text. Composition from taste-skill direction `editorial-report`; house rules from taste-skill v2 (`~/.claude/skills/design-taste-frontend/SKILL.md`) apply on top.*

**The rule:** the site is a public employee's annual report. One vertical axis at 42% organizes every page; paper and ink carry the reading; fir and slate arrive only as whole pages of flat color. Dates, employers and places are stated plainly, the way a report states findings. Nothing is decorated: no rules, no shadows, no gradients, no cards.

## Tokens (one theme, no dark mode)

`--color-paper #F5F5F1` (page ground; never pure white, report stock) · `--color-ink #151716` (all running text, 16.5:1 on paper) · `--color-fir #22402E` (color pages, current-page bar, focus ring on paper: 10.4:1) · `--color-slate #2E5266` (second color page, used at most once per page: 7.6:1 with paper) · `--color-stone #DCD8CC` (tone step for a raised block and mosaic tiles; never text ground below 16px) · `--color-sage #B9C4BB` (mosaic tile only, never behind text) · On fir/slate pages text and focus ring swap to `--color-paper`. No pure #FFF/#000. UO green/yellow (#154733, #FEE123) are banned so the site never reads as official university branding.

### Token names

Tokens in `src/styles/tokens.css` follow Tailwind v4's theme variable namespaces (tailwindcss.com/docs/theme), so the file could become a Tailwind `@theme` block unchanged. Colors are `--color-*`, typefaces `--font-*`, type sizes `--text-*`, line heights `--leading-*`, letter spacing `--tracking-*`, max widths (`--container-measure`, `--container-content`) `--container-*`, and the outer margin, section gap, inner gap and tap target (`--spacing-margin`, `--spacing-section`, `--spacing-inner`, `--spacing-tap`) `--spacing-*`. Timing curves are `--ease-*`. Tokens with no Tailwind namespace keep a plain project name: `--axis`, `--focus-*`, `--mark-*`, and the motion durations and staggers.

## Type

Source Serif 4 Display 600/700 (static cuts, 172KB for both; the variable file is 429KB) = page titles, section headings, statements on color pages; never below 24px, never in nav or body. Public Sans 400/600 (static cuts) = all running text, nav, footer, captions. Both self-hosted as unmodified upstream woff2 (OFL 1.1; Source Serif's Reserved Font Name forbids shipping a subset under its name), `font-display: swap`, fallbacks `Georgia, serif` / `system-ui, sans-serif`. No monospace outside `<pre>/<code>`.

Scale (five sizes, the ceiling): display `clamp(40px, 6.4vw, 92px)` / 0.95 / -0.03em · section `clamp(30px, 3.6vw, 48px)` / 1.05 / -0.02em · statement `clamp(24px, 2.6vw, 34px)` / 1.2 (serif, color pages only) · standfirst `clamp(19px, 1.6vw, 21px)` / 1.45 · body 18px / 1.55, small 16px / 1.45 (side notes, footer). Body measure ≤ 62ch. Left-aligned everywhere; nothing centered.

## Frame

Outer margin `clamp(16px, 3vw, 40px)`, equal both sides at every width. The axis: at ≥ 960px, headings and body start at 42% of the frame; the 0–42% zone holds side notes (role, dates, place) at small size, top-aligned with the heading, or a figure. Below 960px the axis collapses to the left margin and side notes move above their heading. Section gap 160px desktop / 96px phone; inside a section ≤ 48px. Color pages run full-bleed. Max content width 1280px.

## The report shell (header, nav, footer)

Header: wordmark "Nathan Healea" (Source Serif 4 700, 20px) left; nav right: Experience, Projects, About (Public Sans 17px, ink, no underline). Current section: inset 4px `--color-fir` bar under the link (`box-shadow: inset 0 -4px 0`), plus `aria-current="page"`. Hover: the same bar at 2px. Below ~520px the nav wraps under the wordmark as one row of three links; no toggle, no script. No bar chrome, no sticky header, no pill, no blur.
Footer: a full-bleed `--color-fir` page. The name returns at section size in paper; one line from `about.location`; social links from `about.social` in paper, underlined, same tab. Nothing else.
Skip link: first focusable element, paper on ink, top-left inside the margin, visible only on focus.

## Material rules

1. Surfaces separate by a tone step (`--color-paper` → `--color-stone`) or a whole color page; never by a line, border or shadow.
2. Zero shadows, zero gradients, zero blur, zero rotation. Corners square (radius 0) on everything.
3. Mosaic (home and project pages only): gutterless 6-cell band, color tiles plus photographs in one treatment, `filter: grayscale(1) contrast(1.05)`.
4. Buttons: flat `--color-ink` fill, `--color-paper` text, 600, radius 0, 48px min height. At most one per screen.
5. Links in running text: ink, underline 1px offset 3px; hover 3px. Focus ring everywhere: 3px solid `--color-fir` (or `--color-paper` on color pages), offset 3px.
6. Banned (taste-skill house rules): eyebrows, 01/02 numbering, hairlines, tiny tracked caps, icon cards, glass, emoji, styled accent words, violet/indigo.

## Motion (four named moves; all drop to 0ms under `prefers-reduced-motion: reduce`)

RISE (signature): page and section headings rise into place, `translateY(0.35em) → 0` with opacity `0 → 1`, on the heading element itself (no mask, so no glyph is ever clipped), 1000ms `cubic-bezier(.2,.8,.2,1)`, lines staggered 120ms, once on entry. ENTER: a section's parts follow its heading (text, then figure) 24px up + opacity, 700ms, 80ms stagger, once; content is visible without script. MARK: nav current-bar and link underline thicken 150ms ease-out on hover/focus. TURN: a color page's statement fades in 400ms as it enters. Transform and opacity only, except MARK, which animates the bar and underline thickness.

## Copy rules

Functional labels on controls ("Experience", "Download résumé", "View on GitHub"). Voice lives in standfirsts, side notes, color-page statements, the 404 and the footer line. State facts with their numbers and dates; never invent proof, metrics or quotes. Full voice: `design/VOICE.md`.

## Screen inventory (7)

Shell: header + nav + footer (`navigation-shell`, `mobile-patterns`) · Home★ (`landing-pages`, `marketing-copy`) · Experience★ (`visual-foundations`, `microcopy`) · Projects index★ (`navigation-shell`, `states`) · Project detail (`visual-foundations`, `marketing-copy`) · About + résumé download (`marketing-copy`, `microcopy`) · 404 (`states`).
(★ = the three a hiring manager hits in their first minute.)
