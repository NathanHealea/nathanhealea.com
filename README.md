# nathanhealea.com

Personal portfolio site for Nathan Healea — a static site built with [Hugo](https://gohugo.io/) and a custom in-repo theme (`themes/nathanhealea`). The site is a single-page layout assembled from partials (hero, stats, experience, projects, contact) driven by YAML data files and site params, deployed to Vercel.

- **Live:** https://nathanhealea.com
- **Generator:** Hugo (extended) `0.160.0`
- **Styling:** hand-written CSS bundled through Hugo Pipes
- **Scripts:** ES modules bundled with `js.Build` (esbuild)
- **No Node dependencies** — there is no `package.json`; Hugo does all the building

---

## Prerequisites

| Tool                                    | Version                            | Notes                                                                             |
| --------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------- |
| [Hugo](https://gohugo.io/installation/) | `0.160.0` extended (min `0.110.0`) | Pinned in `vercel.json` via `HUGO_VERSION`; match it locally to avoid build drift |
| [Git](https://git-scm.com/)             | any recent                         |                                                                                   |

Node.js is **not** required. Hugo's embedded esbuild handles JavaScript bundling.

### Installing Hugo

Make sure you install the **extended** edition.

**macOS (Homebrew)**

```bash
brew install hugo
```

**Linux / WSL (Snap)**

```bash
sudo snap install hugo
```

**Linux / WSL (direct download — pins the exact version)**

```bash
curl -LO https://github.com/gohugoio/hugo/releases/download/v0.160.0/hugo_extended_0.160.0_linux-amd64.tar.gz && tar -xzf hugo_extended_0.160.0_linux-amd64.tar.gz hugo && sudo install hugo /usr/local/bin/hugo && rm hugo hugo_extended_0.160.0_linux-amd64.tar.gz
```

**Windows (winget)**

```bash
winget install Hugo.Hugo.Extended
```

Verify the install — the output must contain `+extended`:

```bash
hugo version
```

---

## Setup

Clone the repository and enter it:

```bash
git clone https://github.com/NathanHealea/nathanhealea.com.git
```

```bash
cd nathanhealea.com
```

The theme lives inside the repo at `themes/nathanhealea` (it is **not** a git submodule), so there is nothing further to fetch or install.

---

## Development

Start the dev server with live reload and draft/future content visible:

```bash
hugo server -D
```

Then open http://localhost:1313.

Useful variations:

```bash
hugo server -D --navigateToChanged
```

```bash
hugo server --disableFastRender
```

- `-D` renders content marked `draft: true`.
- `--navigateToChanged` jumps the browser to the page you just edited.
- `--disableFastRender` forces a full rebuild — use it when a partial or CSS change doesn't seem to take effect.

The dev server serves unminified, unfingerprinted CSS/JS. Minification and fingerprinting only happen in production builds (`hugo.IsProduction`).

---

## Building

Produce the production build into `public/`:

```bash
hugo --gc --minify
```

This is the exact command Vercel runs. `public/` is git-ignored.

Preview the production output locally:

```bash
hugo server --environment production --minify
```

---

## Project Structure

```
.
├── hugo.toml                  # Site config: baseURL, title, params, stats, SEO
├── vercel.json                # Vercel build config (framework, build cmd, HUGO_VERSION)
├── archetypes/default.md      # Front matter template for `hugo new`
├── content/_index.md          # Home page front matter (title + description)
├── data/
│   ├── experience.yaml        # Work history timeline entries
│   └── projects.yaml          # Portfolio project cards
├── assets/                    # Site-level assets (jsconfig.json is generated + ignored)
├── static/                    # Files copied verbatim to the site root
├── i18n/                      # Translation tables (currently unused)
├── layouts/                   # Site-level template overrides (currently empty)
└── themes/nathanhealea/
    ├── theme.toml
    ├── layouts/
    │   ├── _default/baseof.html        # HTML shell, skip link, script bundling
    │   ├── index.html                  # Home page — composes the section partials
    │   └── partials/
    │       ├── head.html               # Meta, Open Graph, JSON-LD, CSS pipeline
    │       ├── header.html footer.html
    │       ├── hero.html stats.html experience.html projects.html contact.html
    │       ├── components/             # badge-list, section-header, social-links,
    │       │                           # hire-status, contract-status
    │       └── icons/                  # github, linkedin, mail, external, arrow-right
    └── assets/
        ├── css/
        │   ├── base/       # tokens, reset, typography
        │   ├── layout/     # container, section
        │   ├── components/ # link, btn, badge, navbar, card, timeline, hero, stats, footer
        │   ├── sections/   # projects, contact
        │   └── utilities/  # reveal, helpers
        └── js/
            ├── main.js                 # Entry point
            └── modules/                # nav, reveal, hero-network
```

### Asset pipeline

- **CSS** — `head.html` holds an explicit ordered list of stylesheets and concatenates them with `resources.Concat` so the cascade order is deterministic. **Adding a new CSS file requires adding its path to that `$order` slice**, or it will not be bundled.
- **JS** — `baseof.html` runs `assets/js/main.js` through `js.Build` (esbuild, target `es2018`). Import new modules from `main.js`; no build config to edit.
- In production both bundles are minified and fingerprinted with subresource integrity hashes.

---

## Editing Content

Most day-to-day changes are config or data edits — no templates required.

### Site params (`hugo.toml`)

| Param                                                                   | Purpose                                                                   |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `title`, `baseURL`                                                      | Site identity                                                             |
| `params.description`, `params.seo.keywords`                             | Meta description and keywords                                             |
| `params.author`, `params.location`, `params.headline`, `params.tagline` | Identity shown across the page                                            |
| `params.heroSubtitle`                                                   | Hero paragraph copy                                                       |
| `params.github`, `params.linkedin`, `params.email`                      | Social/contact links                                                      |
| `params.stats`                                                          | Repeatable `[[params.stats]]` blocks (`value`, `desc`) for the stats band |
| `params.available.hire` / `params.available.contract`                   | Toggle the availability badges on or off                                  |
| `params.hire.position`, `params.hire.roles`                             | Seniority and role list shown when `available.hire` is `true`             |

### Work history (`data/experience.yaml`)

```yaml
- company: University of Oregon
  title: Analyst Programmer II
  location: Eugene, OR
  start: Jan 2023
  end: Present
  current: true
  highlights:
    - Bullet describing an accomplishment
  tech: [Drupal, PHP, Node.js]
```

Entries render top-to-bottom in file order — newest first.

### Projects (`data/projects.yaml`)

```yaml
- title: grimify.app
  slug: grimify
  icon: "🎨"
  description: "One-paragraph summary of the project."
  tech: [TypeScript, React, Node.js]
  github: https://github.com/NathanHealea/grimify.app
  live: https://grimify.app
  featured: true
```

`live` is optional — omit it for projects without a public deployment. `featured` controls prominence in the projects grid.

### Adding a page

```bash
hugo new content/about.md
```

The site sets `disableKinds = ["taxonomy", "term"]`, so tags and categories are not generated.

---

## Deployment

The site deploys to Vercel from `main`. `vercel.json` pins the setup:

```json
{
  "framework": "hugo",
  "buildCommand": "hugo --gc --minify",
  "outputDirectory": "public",
  "build": { "env": { "HUGO_VERSION": "0.160.0" } }
}
```

Pushing to `main` triggers a production deploy; pull requests get preview deploys. When bumping Hugo locally, update `HUGO_VERSION` in `vercel.json` to match.

---

## Troubleshooting

**A CSS change has no effect.** Confirm the file's path is listed in the `$order` slice in `themes/nathanhealea/layouts/partials/head.html`, then restart the server with `--disableFastRender`.

**`hugo version` doesn't say `+extended`.** Reinstall the extended edition — see [Installing Hugo](#installing-hugo).

**Stale output after a rename or delete.** Remove the build cache and output, then rebuild:

```bash
rm -rf public resources/_gen && hugo --gc --minify
```

**Port 1313 already in use.**

```bash
hugo server -D --port 1414
```

---

## License

The theme is MIT licensed (see `themes/nathanhealea/theme.toml`). Site content — copy, resume details, and project descriptions — is © Nathan Healea.
