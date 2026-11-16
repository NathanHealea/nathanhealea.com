# nathanhealea.com — Design System v2 ("Product-grade")

*Replaces v1 ("The Public Report", 2026-11-01). Picked by Nathan on 2026-11-16 after reviewing mockups; reference mockup on branch `design/product-grade` at `9abb610`, `public/mockups/product-grade/`. Benchmark: product sites in the Linear, Vercel and Stripe mold, scaled to one person. Tone: a colleague talking about their work over beers; business casual with some personality. Built by work item `product-grade-design`.*

**The rule:** the site reads like a well-made product, not a document. Quiet near-white or near-black ground, one blue accent, Geist type, thin lines and soft radii. Work is shown as working software wherever it can be: interface views built in HTML with sample data, never screenshots of internal systems. Personality lives in the words, not in ornaments.

## Tokens

Defined in `src/styles/tokens.css`. Names follow Tailwind v4's theme namespaces (tailwindcss.com/docs/theme), so the file could become a `@theme` block with little change; the `@font-face` rules and the dark blocks would stay outside it. `tests/unit/tokens.test.ts` checks that the file declares exactly this set and that every `var()` under `src/` resolves.

### Color (light / dark)

The dark palette applies when the system prefers dark (`@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }`) or when `html[data-theme="dark"]` is set by the theme toggle. Both blocks hold identical values.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-bg` | #fbfbfa | #0b0c0e | Page ground |
| `--color-surface` | #f4f4f2 | #121317 | Tone step: chips, hover fills, figure stages |
| `--color-raised` | #ffffff | #16171c | Cards, windows, controls |
| `--color-line` | #e5e5e1 | #24262c | Dividers and card edges (decorative only) |
| `--color-line-strong` | #d4d4cf | #30333a | Hover edges, breadcrumb separators (decorative only) |
| `--color-ink` | #0f1012 | #ededef | Headings, primary text, primary button fill |
| `--color-ink-2` | #3a3c42 | #c9cad0 | Running text in long reads, icons |
| `--color-muted` | #5f616a | #9a9ca6 | Ledes, side notes, nav at rest, captions |
| `--color-accent` | #2b59ff | #6d8bff | Focus ring, TOC marker, link hover, one accent button |
| `--color-accent-hover` | #1d47e6 | #8aa2ff | Accent button hover |
| `--color-accent-ink` | #ffffff | #0b0c0e | Text on accent |
| `--color-accent-soft` | #eaefff | #1a2142 | Callouts |
| `--color-ok` / `-soft` | #157040 / #e3f4ea | #4cc38a / #10261b | "Current" chip, passing states |
| `--color-warn` / `-soft` | #9a5b00 / #fbf0dc | #e3a94a / #2a2010 | Warning states in interface views |
| `--color-bad` / `-soft` | #b42318 / #fde8e6 | #ff7b6e / #2d1513 | Failing states in interface views |
| `--shadow-window` | soft, two-layer | deeper, two-layer | Interface windows only |

Contrast (tested): every text color on bg, surface and raised meets 4.5:1 in both palettes; status colors meet 4.5:1 on their soft grounds. `line` and `line-strong` never carry meaning on their own, so they are exempt from 3:1. UO green #154733 and yellow #FEE123 are banned so the site never reads as official university branding (tested).

### Type

Geist (text) and Geist Mono (dates, tech chips, code, the 404 code), self-hosted as the upstream v1.9.2 variable woff2 files under the OFL (`public/fonts/`), `font-display: swap`. No third-party requests.

`--font-sans`, `--font-mono` · sizes: `--text-display` clamp(2.5rem, 1.4rem + 4.2vw, 4.5rem) home hero only · `--text-title` clamp(2.25rem, 1.3rem + 3.6vw, 4rem) page and case-study `h1` · `--text-section` clamp(1.875rem, 1.3rem + 2vw, 2.75rem) section `h2` and index page titles · `--text-heading` clamp(1.5rem, 1.2rem + 1vw, 2rem) write-up `h2` · `--text-card` clamp(1.375rem, 1.1rem + 0.8vw, 1.75rem) card titles · `--text-lede` clamp(1.0625rem, 1rem + 0.35vw, 1.25rem) · `--text-body` 17px · `--text-ui` 15px (nav, buttons, role text) · `--text-small` 14px (side notes, footer) · `--text-caption` 13px.

Leading `--leading-tight` 1.04, `--leading-snug` 1.15, `--leading-body` 1.6. Tracking `--tracking-display` -0.045em, `--tracking-section` -0.035em, `--tracking-heading` -0.025em. Headings weight 600; body 400; labels 500. Sentence case everywhere. Measure `--container-measure` 68ch; write-ups cap at 720px.

### Frame and shape

`--container-content` 1200px, `--spacing-gutter` clamp(20px, 4vw, 40px) both sides, `--spacing-section` clamp(80px, 10vw, 128px), `--spacing-header` 64px, `--spacing-tap` 44px minimum target. Radii `--radius-sm` 6px (controls), `--radius-md` 10px (windows), `--radius-lg` 14px (cards), `--radius-full` (chips). Two breakpoints: 1000px (two-column layouts collapse; TOC hides) and 720px (grids go to one column).

### Focus and motion

Focus ring everywhere: `--focus-width` 2px solid `--color-accent`, `--focus-offset` 3px, 4px radius; ≥3:1 against the ground in both themes (tested).

One move, REVEAL: an element marked `data-reveal` fades in and rises `--reveal-distance` (14px) over `--reveal-duration` (700ms) on `--ease-out`, once, as it enters the viewport; siblings stagger by `--reveal-stagger` (70ms) × `--reveal-order`. Opacity and transform only. Content is hidden only when the inline head script has added `js` to `<html>`, so it is visible without script; under `prefers-reduced-motion: reduce` nothing moves. UI transitions (hover color, borders) run 150–200ms.

## Shell

**Header:** sticky, page ground, gains a bottom `--color-line` once scrolled. Wordmark ("NH" mark plus "Nathan Healea") left, then the primary nav (Experience, Projects, About) in `--color-muted`, then the theme toggle. Current section: `aria-current="page"`, ink color and a 2px ink underline (not color alone). Below 560px the nav wraps to its own row under the wordmark; no menu button.

**Theme toggle:** an icon button (moon in light, sun in dark) named for the theme it switches to ("Switch to dark theme"). Overrides the system scheme and stores the choice in `localStorage`; an inline head script applies a stored choice before first paint. Ships `hidden` and is shown by script, so it never appears when it cannot work.

**Footer:** one row under a `--color-line` rule: name, "Based in {location}.", social links from the about entry.

**Skip link:** first focusable element, ink pill, visible only on focus.

## Components

- **Buttons:** primary (ink fill, bg text), ghost (raised, line edge), accent (at most one per screen). 40–44px tall, `--radius-sm`, weight 500.
- **Chips:** pill, `--text-caption` or 12px mono for tech; status chips carry a dot and a text label.
- **Cards:** `--color-raised`, 1px `--color-line`, `--radius-lg`; edge darkens on hover. Used for projects and contact.
- **Interface windows:** raised panel with a title bar (three dots, a mono path), `--shadow-window`. Every one shows sample data, says so, and never imitates a real UO screen or holds student or personnel data.
- **Breadcrumb, TOC:** muted 14px; the TOC marks the section being read with an accent left bar and `aria-current`.

## Copy rules

Functional labels on controls ("Experience", "View on GitHub", "Switch to dark theme"). Voice lives in ledes, the 404 and the footer. State facts with their numbers and dates; never invent proof, metrics, logos or quotes. Full voice: `design/VOICE.md`.

## Banned

Gradients as decoration, glass and blur, emoji, eyebrow labels over every heading, 01/02 numbering, icon-in-a-tinted-square cards, violet as an accent, UO brand colors, screenshots of internal systems, and any image or interface view holding real student or personnel data.

## Screen inventory

Shell · Home (story `home-page`) · Experience · Projects index · Project detail · About (story `about-page`) · 404.
