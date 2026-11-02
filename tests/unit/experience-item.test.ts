import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import type { CollectionEntry } from 'astro:content';
import { describe, expect, it } from 'vitest';
import ExperienceItem from '../../src/components/ExperienceItem.astro';

type Role = CollectionEntry<'experience'>['data'];

const openRole: Role = {
  company: 'Northwind Analytics',
  title: 'Data Engineer',
  location: 'Springfield, OR',
  start: '2023-01',
  highlights: ['Rebuilt the nightly import pipeline', 'Cut report load time in half'],
  tech: ['TypeScript', 'PostgreSQL'],
};

const closedRole: Role = {
  company: 'Contoso Labs',
  title: 'Web Developer',
  location: 'Riverton, WA',
  start: '2019-04',
  end: '2022-12',
  highlights: ['Shipped the volunteer signup form'],
  tech: ['PHP'],
};

async function render(role: Role, hasDetails: boolean, body?: string): Promise<string> {
  const container = await AstroContainer.create();
  return container.renderToString(ExperienceItem, {
    props: { role, hasDetails },
    slots: body === undefined ? {} : { default: body },
  });
}

function text(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function lists(html: string): string[][] {
  return [...html.matchAll(/<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/g)].map((list) =>
    [...list[2].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((item) => text(item[1])),
  );
}

describe('ExperienceItem renders fields, current label and disclosure', () => {
  it('renders an article with one h2 naming the title and company', async () => {
    const html = await render(closedRole, false);

    expect(html.trim()).toMatch(/^<article\b[\s\S]*<\/article>$/);
    const headings = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map((match) => text(match[1]));
    expect(headings).toHaveLength(1);
    expect(headings[0]).toContain('Web Developer');
    expect(headings[0]).toContain('Contoso Labs');
  });

  it('renders the location and the date range inside time markup', async () => {
    const html = await render(closedRole, false);

    expect(text(html)).toContain('Riverton, WA');
    expect(html).toMatch(/<time\b[^>]*\bdatetime="2019-04"/);
    const timeSpan = html.slice(html.indexOf('<time'), html.lastIndexOf('</time>') + '</time>'.length);
    expect(text(timeSpan)).toContain('Apr 2019 – Dec 2022');
  });

  it('renders highlights and tech as items in separate lists', async () => {
    const html = await render(openRole, false);

    expect(lists(html)).toContainEqual(['Rebuilt the nightly import pipeline', 'Cut report load time in half']);
    expect(lists(html)).toContainEqual(['TypeScript', 'PostgreSQL']);
  });

  it('labels a role without an end as Current and Present', async () => {
    const html = await render(openRole, false);

    expect(html).toMatch(/>\s*Current\s*</);
    expect(text(html)).toContain('Jan 2023 – Present');
    expect(html).toMatch(/<time\b[^>]*\bdatetime="2023-01"/);
  });

  it('shows neither Current nor Present for a role with an end', async () => {
    const html = await render(closedRole, false);

    expect(html).not.toMatch(/Current/);
    expect(html).not.toMatch(/Present/);
  });

  it('puts the body in a details disclosure whose summary names the role', async () => {
    const html = await render(openRole, true, '<p>Owned the warehouse schema migration.</p>');

    const details = html.match(/<details\b[^>]*>([\s\S]*?)<\/details>/);
    expect(details).not.toBeNull();
    expect(details![1]).toContain('<p>Owned the warehouse schema migration.</p>');
    const summary = details![1].match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/);
    expect(summary).not.toBeNull();
    expect(text(summary![1])).toBe('Details: Data Engineer at Northwind Analytics');
  });

  it('renders no details disclosure without hasDetails', async () => {
    const html = await render(closedRole, false);

    expect(html).not.toMatch(/<details\b/);
    expect(html).not.toMatch(/<summary\b/);
  });
});
