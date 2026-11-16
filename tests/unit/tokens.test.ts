import { globSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '../..');
const tokensCss = readFileSync(resolve(root, 'src/styles/tokens.css'), 'utf8');

const colorTokens = [
  '--color-bg',
  '--color-surface',
  '--color-raised',
  '--color-line',
  '--color-line-strong',
  '--color-ink',
  '--color-ink-2',
  '--color-muted',
  '--color-accent',
  '--color-accent-hover',
  '--color-accent-ink',
  '--color-accent-soft',
  '--color-ok',
  '--color-ok-soft',
  '--color-warn',
  '--color-warn-soft',
  '--color-bad',
  '--color-bad-soft',
];

const finalTokens = [
  ...colorTokens,
  '--shadow-window',
  '--font-sans',
  '--font-mono',
  '--text-display',
  '--text-title',
  '--text-section',
  '--text-heading',
  '--text-card',
  '--text-lede',
  '--text-body',
  '--text-ui',
  '--text-small',
  '--text-caption',
  '--leading-tight',
  '--leading-snug',
  '--leading-body',
  '--tracking-display',
  '--tracking-section',
  '--tracking-heading',
  '--container-content',
  '--container-measure',
  '--spacing-gutter',
  '--spacing-section',
  '--spacing-header',
  '--spacing-tap',
  '--radius-sm',
  '--radius-md',
  '--radius-lg',
  '--radius-full',
  '--focus-width',
  '--focus-offset',
  '--ease-out',
  '--reveal-duration',
  '--reveal-stagger',
  '--reveal-distance',
];

// Public Report names still read by components; step 8 deletes this list and the alias block.
const temporaryAliases = [
  '--color-paper',
  '--color-fir',
  '--font-display',
  '--font-text',
  '--text-statement',
  '--text-standfirst',
  '--text-wordmark',
  '--text-nav',
  '--leading-display',
  '--leading-section',
  '--leading-statement',
  '--leading-standfirst',
  '--leading-small',
  '--spacing-margin',
  '--spacing-inner',
  '--axis',
  '--mark-rest',
  '--mark-hover',
  '--mark-current',
  '--mark-duration',
  '--rise-duration',
  '--enter-duration',
  '--enter-stagger',
];

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '');
}

function declaredNames(source: string): Set<string> {
  return new Set([...stripComments(source).matchAll(/(?<![\w-])(--[\w-]+)\s*:/g)].map((match) => match[1]));
}

function referencedNames(source: string): Set<string> {
  return new Set([...stripComments(source).matchAll(/var\(\s*(--[\w-]+)/g)].map((match) => match[1]));
}

function undeclaredReferences(files: Record<string, string>, tokensFile: string): string[] {
  const global = declaredNames(files[tokensFile] ?? '');
  return Object.entries(files).flatMap(([file, source]) => {
    const local = declaredNames(source);
    return [...referencedNames(source)]
      .filter((name) => !global.has(name) && !local.has(name))
      .map((name) => `${file}: ${name}`);
  });
}

function declarations(block: string): Map<string, string> {
  return new Map(
    [...stripComments(block).matchAll(/(?<![\w-])(--[\w-]+)\s*:\s*([^;]+);/g)].map((match) => [match[1], match[2].trim()]),
  );
}

function lightBlock(source: string): string | undefined {
  return stripComments(source).match(/^:root\s*\{([\s\S]*?)^\}/m)?.[1];
}

function systemDarkBlock(source: string): string | undefined {
  return stripComments(source).match(
    /@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root:not\(\[data-theme="light"\]\)\s*\{([\s\S]*?)\}\s*\}/,
  )?.[1];
}

function overrideDarkBlock(source: string): string | undefined {
  return stripComments(source).match(/^:root\[data-theme="dark"\]\s*\{([\s\S]*?)^\}/m)?.[1];
}

// WCAG 2.x relative luminance and contrast ratio.
function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe('token parsing helpers', () => {
  it('collects declarations in :root, scoped selectors and @media blocks', () => {
    const source = `
      :root { --a: 1px; --b:2px; }
      .card { --c: red; }
      @media (min-width: 960px) {
        :root {
          --d: 3px;
        }
      }
    `;

    expect([...declaredNames(source)].sort()).toEqual(['--a', '--b', '--c', '--d']);
  });

  it('does not read a longer name as a shorter declaration', () => {
    expect(declaredNames(':root { --spacing-margin: 1px; }').has('--margin')).toBe(false);
  });

  it('does not count a reference or a commented-out line as a declaration', () => {
    const source = `
      /* --ghost: 1px; */
      a { color: var(--only-used); }
    `;

    expect([...declaredNames(source)]).toEqual([]);
  });

  it('collects references with fallbacks, nested fallbacks and inside @media', () => {
    const source = `
      a { margin: var(--plain); padding: var( --spaced ); }
      b { width: var(--with-fallback, 0); }
      c { color: var(--outer, var(--inner, red)); }
      @media (min-width: 960px) {
        d { gap: var(--in-media); }
      }
    `;

    expect([...referencedNames(source)].sort()).toEqual([
      '--in-media',
      '--inner',
      '--outer',
      '--plain',
      '--spaced',
      '--with-fallback',
    ]);
  });

  it('reports an undeclared reference with a fallback or inside @media', () => {
    const files = {
      'tokens.css': ':root { --declared: 1px; }',
      'a.css': 'a { width: var(--declared, var(--missing-nested)); margin: var(--missing-fallback, 0); }',
      'b.astro': '<style>@media (min-width: 960px) { b { gap: var(--missing-media); } }</style>',
    };

    expect(undeclaredReferences(files, 'tokens.css')).toEqual([
      'a.css: --missing-nested',
      'a.css: --missing-fallback',
      'b.astro: --missing-media',
    ]);
  });

  it('accepts a reference declared in tokens.css or in the same file', () => {
    const files = {
      'tokens.css': ':root { --a: 1px; }',
      'nav.astro': '<style>.nav { --local: 2px; gap: var(--local); margin: var(--a); }</style>',
    };

    expect(undeclaredReferences(files, 'tokens.css')).toEqual([]);
  });

  it('rejects a reference declared only in another component', () => {
    const files = {
      'tokens.css': ':root { --a: 1px; }',
      'nav.astro': '<style>.nav { --margin: 2px; }</style>',
      'footer.astro': '<style>footer { padding: var(--margin); }</style>',
    };

    expect(undeclaredReferences(files, 'tokens.css')).toEqual(['footer.astro: --margin']);
  });
});

describe('tokens.css', () => {
  it('declares the documented token set', () => {
    const declared = declaredNames(tokensCss);
    const expected = [...finalTokens, ...temporaryAliases];

    expect(finalTokens).toHaveLength(53);
    expect(temporaryAliases).toHaveLength(23);
    expect([...declared].sort()).toEqual([...expected].sort());
  });

  it('dark palette declared for system and override', () => {
    const system = systemDarkBlock(tokensCss);
    const override = overrideDarkBlock(tokensCss);

    expect(system).toBeDefined();
    expect(override).toBeDefined();

    const systemValues = declarations(system ?? '');
    const overrideValues = declarations(override ?? '');

    expect([...systemValues.keys()].sort()).toEqual([...colorTokens, '--shadow-window'].sort());
    expect(Object.fromEntries(overrideValues)).toEqual(Object.fromEntries(systemValues));
  });

  it('token pairs meet contrast in both palettes', () => {
    const palettes = {
      light: declarations(lightBlock(tokensCss) ?? ''),
      dark: declarations(systemDarkBlock(tokensCss) ?? ''),
    };
    const pairs: [string, string, number][] = [
      ...['ink', 'ink-2', 'muted'].flatMap((fg) =>
        ['bg', 'surface', 'raised'].map((bg): [string, string, number] => [fg, bg, 4.5]),
      ),
      ['accent', 'bg', 4.5],
      ['accent-ink', 'accent', 4.5],
      ['ok', 'ok-soft', 4.5],
      ['warn', 'warn-soft', 4.5],
      ['bad', 'bad-soft', 4.5],
    ];

    const failures = Object.entries(palettes).flatMap(([name, values]) =>
      pairs.flatMap(([fg, bg, minimum]) => {
        const fgHex = values.get(`--color-${fg}`);
        const bgHex = values.get(`--color-${bg}`);
        if (!fgHex?.match(/^#[0-9a-f]{6}$/i) || !bgHex?.match(/^#[0-9a-f]{6}$/i)) {
          return [`${name}: ${fg} on ${bg} has no hex value`];
        }
        const ratio = contrast(fgHex, bgHex);
        return ratio >= minimum ? [] : [`${name}: ${fg} on ${bg} is ${ratio.toFixed(2)}, needs ${minimum}`];
      }),
    );

    expect(failures).toEqual([]);
  });

  it('old typefaces are gone', () => {
    const faceFamilies = [...stripComments(tokensCss).matchAll(/@font-face\s*\{[^}]*?font-family:\s*([^;]+);/g)].map(
      (match) => match[1].trim().replace(/^["']|["']$/g, ''),
    );
    const oldFiles = globSync('public/fonts/{SourceSerif,PublicSans}*', { cwd: root });

    expect(faceFamilies.filter((family) => family === 'Source Serif 4' || family === 'Public Sans')).toEqual([]);
    expect(oldFiles).toEqual([]);
  });
});

describe('src styles', () => {
  const paths = globSync('src/**/*.{css,astro}', { cwd: root });
  const files = Object.fromEntries(paths.map((path) => [path, readFileSync(resolve(root, path), 'utf8')]));

  it('every var() reference resolves to a declared token', () => {
    expect(paths).toContain('src/styles/tokens.css');
    expect(undeclaredReferences(files, 'src/styles/tokens.css')).toEqual([]);
  });

  it('no UO colors', () => {
    const everyFile = globSync('src/**/*', { cwd: root, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => resolve(entry.parentPath, entry.name));
    const hits = everyFile.filter((path) => /#154733|#fee123/i.test(readFileSync(path, 'utf8')));

    expect(everyFile.length).toBeGreaterThan(0);
    expect(hits).toEqual([]);
  });
});
