import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  formatRange,
  selectFeatured,
  selectSingleAbout,
  sortExperience,
  sortProjects,
} from '../../src/lib/content';

const contentModule = resolve(import.meta.dirname, '../../src/lib/content.ts');

function role(id: string, start: string, end?: string) {
  return { id, data: end === undefined ? { start } : { start, end } };
}

function project(id: string, title: string, order?: number, featured = false) {
  return { id, data: order === undefined ? { title, featured } : { title, order, featured } };
}

describe('sortExperience', () => {
  it('sortExperience orders by start then current then end', () => {
    const input = [
      role('older', '2021-01', '2022-12'),
      role('ended', '2023-01', '2023-06'),
      role('current', '2023-01'),
    ];
    const snapshot = input.map((entry) => entry.id);

    const sorted = sortExperience(input);

    expect(sorted.map((entry) => entry.id)).toEqual(['current', 'ended', 'older']);
    expect(input.map((entry) => entry.id)).toEqual(snapshot);
    expect(sorted).not.toBe(input);
  });
});

describe('sortProjects', () => {
  it('sortProjects orders by order then title', () => {
    const input = [
      project('two', 'Middle', 2),
      project('zeta', 'zeta'),
      project('one', 'Zulu', 1),
      project('beta', 'Beta'),
      project('alpha', 'alpha'),
    ];

    const sorted = sortProjects(input);

    expect(sorted.map((entry) => entry.id)).toEqual(['one', 'two', 'alpha', 'beta', 'zeta']);
  });
});

describe('selectFeatured', () => {
  it('selectFeatured keeps order and handles none', () => {
    const input = [
      project('unordered-featured', 'Unordered', undefined, true),
      project('second', 'Second', 2, true),
      project('hidden', 'Hidden', 0, false),
      project('first', 'First', 1, true),
    ];

    expect(selectFeatured(input).map((entry) => entry.id)).toEqual([
      'first',
      'second',
      'unordered-featured',
    ]);
    expect(selectFeatured([project('a', 'A', 1), project('b', 'B')])).toEqual([]);
  });
});

describe('selectSingleAbout', () => {
  it('selectSingleAbout throws on zero or many', () => {
    const only = { id: 'about', data: { name: 'Example Person' } };
    expect(selectSingleAbout([only])).toBe(only);

    expect(() => selectSingleAbout([])).toThrow(/src\/content\/about\/.*\b0\b|\b0\b.*src\/content\/about\//);
    expect(() => selectSingleAbout([only, { id: 'other', data: { name: 'Other' } }])).toThrow(
      /src\/content\/about\/.*\b2\b|\b2\b.*src\/content\/about\//,
    );
  });
});

describe('formatRange', () => {
  it('formatRange formats ranges', () => {
    expect(formatRange('2023-01')).toBe('Jan 2023 – Present');
    expect(formatRange('2022-03', '2022-10')).toBe('Mar 2022 – Oct 2022');
    expect(formatRange('2022-03', '2022-03')).toBe('Mar 2022');
    expect(formatRange('2022-12', '2022-12')).toBe('Dec 2022');
    expect(formatRange('2022-12')).toBe('Dec 2022 – Present');
  });

  it('formatRange ignores time zone', () => {
    // A runtime TZ change is not reliably honored inside the vitest process, so each zone gets its own Node.
    const script = `
      const { formatRange } = await import(${JSON.stringify(pathToFileURL(contentModule).href)});
      console.log(JSON.stringify([
        formatRange('2023-01'),
        formatRange('2022-03', '2022-10'),
        formatRange('2022-03', '2022-03'),
        formatRange('2022-12', '2022-12'),
      ]));
    `;
    const runIn = (tz: string) => {
      const result = spawnSync(process.execPath, ['--input-type=module', '--eval', script], {
        env: { ...process.env, TZ: tz },
        encoding: 'utf8',
      });
      expect(result.status, `${result.stdout}${result.stderr}`).toBe(0);
      return JSON.parse(result.stdout) as string[];
    };

    const losAngeles = runIn('America/Los_Angeles');
    const tokyo = runIn('Asia/Tokyo');

    expect(losAngeles).toEqual(tokyo);
    expect(losAngeles).toEqual([
      'Jan 2023 – Present',
      'Mar 2022 – Oct 2022',
      'Mar 2022',
      'Dec 2022',
    ]);
  });
});
