import type { MarkdownHeading } from 'astro';
import { describe, expect, it } from 'vitest';
import { headingsForToc } from '../../src/lib/toc';

describe('headingsForToc', () => {
  it('headingsForToc keeps depth 2 only, in order', () => {
    const headings: MarkdownHeading[] = [
      { depth: 2, slug: 'context', text: 'Context' },
      { depth: 3, slug: 'detail', text: 'Detail' },
      { depth: 2, slug: 'approach', text: 'Approach' },
      { depth: 4, slug: 'aside', text: 'Aside' },
      { depth: 1, slug: 'title', text: 'Title' },
      { depth: 2, slug: 'outcome', text: 'Outcome' },
    ];

    expect(headingsForToc(headings)).toEqual([
      { slug: 'context', text: 'Context' },
      { slug: 'approach', text: 'Approach' },
      { slug: 'outcome', text: 'Outcome' },
    ]);
  });

  it('headingsForToc returns exactly two entries when two depth-2 headings exist', () => {
    const headings: MarkdownHeading[] = [
      { depth: 2, slug: 'first', text: 'First' },
      { depth: 2, slug: 'second', text: 'Second' },
    ];

    expect(headingsForToc(headings)).toEqual([
      { slug: 'first', text: 'First' },
      { slug: 'second', text: 'Second' },
    ]);
  });

  it('headingsForToc returns empty when fewer than two depth-2 headings remain', () => {
    expect(headingsForToc([])).toEqual([]);
    expect(headingsForToc([{ depth: 2, slug: 'only', text: 'Only' }])).toEqual([]);
    expect(
      headingsForToc([
        { depth: 2, slug: 'only', text: 'Only' },
        { depth: 3, slug: 'sub-one', text: 'Sub one' },
        { depth: 3, slug: 'sub-two', text: 'Sub two' },
      ]),
    ).toEqual([]);
  });
});
