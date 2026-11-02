import { globSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '../..');
const tokensCss = readFileSync(resolve(root, 'src/styles/tokens.css'), 'utf8');

const renamed: Record<string, string> = {
  '--paper': '--color-paper',
  '--ink': '--color-ink',
  '--fir': '--color-fir',
  '--slate': '--color-slate',
  '--stone': '--color-stone',
  '--sage': '--color-sage',
  '--size-display': '--text-display',
  '--size-section': '--text-section',
  '--size-statement': '--text-statement',
  '--size-standfirst': '--text-standfirst',
  '--size-body': '--text-body',
  '--size-small': '--text-small',
  '--size-wordmark': '--text-wordmark',
  '--size-nav': '--text-nav',
  '--measure': '--container-measure',
  '--content-max': '--container-content',
  '--margin': '--spacing-margin',
  '--gap-section': '--spacing-section',
  '--gap-inner': '--spacing-inner',
  '--tap-min': '--spacing-tap',
};

const unchanged = [
  '--font-display',
  '--font-text',
  '--leading-display',
  '--leading-section',
  '--leading-statement',
  '--leading-standfirst',
  '--leading-body',
  '--leading-small',
  '--tracking-display',
  '--tracking-section',
  '--ease-out',
  '--axis',
  '--focus-width',
  '--focus-offset',
  '--mark-rest',
  '--mark-hover',
  '--mark-current',
  '--rise-duration',
  '--rise-stagger',
  '--enter-duration',
  '--enter-stagger',
  '--mark-duration',
  '--turn-duration',
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
  it('declares every token under its new name', () => {
    const declared = declaredNames(tokensCss);
    const expected = [...Object.values(renamed), ...unchanged];

    expect(expected).toHaveLength(43);
    expect([...declared].sort()).toEqual([...expected].sort());
  });

  it('keeps the desktop section gap override under its new name', () => {
    const override = tokensCss.match(/@media \(min-width: 960px\)\s*\{([\s\S]*?)\n\}/);

    expect(override?.[1]).toBeDefined();
    expect([...declaredNames(override?.[1] ?? '')]).toEqual(['--spacing-section']);
  });

  it('declares none of the renamed old names', () => {
    const declared = declaredNames(tokensCss);
    const oldNames = Object.keys(renamed);

    expect(oldNames).toHaveLength(20);
    expect(oldNames.filter((name) => declared.has(name))).toEqual([]);
  });
});

describe('src styles', () => {
  const paths = globSync('src/**/*.{css,astro}', { cwd: root });
  const files = Object.fromEntries(paths.map((path) => [path, readFileSync(resolve(root, path), 'utf8')]));

  it('every var() reference resolves to a declared token', () => {
    expect(paths).toContain('src/styles/tokens.css');
    expect(undeclaredReferences(files, 'src/styles/tokens.css')).toEqual([]);
  });

  it('no file under src declares a renamed old name', () => {
    const oldNames = Object.keys(renamed);
    const stale = Object.entries(files).flatMap(([file, source]) => {
      const declared = declaredNames(source);
      return oldNames.filter((name) => declared.has(name)).map((name) => `${file}: ${name}`);
    });

    expect(stale).toEqual([]);
  });
});
