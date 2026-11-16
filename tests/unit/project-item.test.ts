import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import type { CollectionEntry } from 'astro:content';
import { describe, expect, it } from 'vitest';
import ProjectItem from '../../src/components/ProjectItem.astro';

type Project = CollectionEntry<'projects'>['data'];

const linkedProject: Project = {
  title: 'Lantern Board',
  description: 'A kanban board for tracking lighthouse maintenance tasks.',
  tech: ['Astro', 'SQLite'],
  github: 'https://github.com/example-org/lantern-board',
  live: 'https://lantern.example.com',
  featured: true,
  order: 1,
};

const bareProject: Project = {
  title: 'Tide Clock',
  description: 'A command-line tool that prints the next high tide.',
  tech: [],
  featured: false,
};

async function render(slug: string, project: Project): Promise<string> {
  const container = await AstroContainer.create();
  return container.renderToString(ProjectItem, { props: { slug, project } });
}

function text(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function hrefs(html: string): string[] {
  return [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map((match) => match[1]);
}

describe('ProjectItem renders title link, description, tech and links', () => {
  it('renders an article whose h2 holds only a link to the detail page named with the title', async () => {
    const html = await render('lantern-board', linkedProject);

    expect(html.trim()).toMatch(/^<article\b[\s\S]*<\/article>$/);
    expect(html.match(/<article\b/g)).toHaveLength(1);
    const card = html.match(/^\s*<article\b([^>]*)>/)![1];
    expect(card).toMatch(/\bclass="[^"]*\bproject\b[^"]*"/);
    expect(card).toMatch(/\sdata-reveal(?=[\s=]|$)/);
    const headings = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map((match) => match[1]);
    expect(headings).toHaveLength(1);
    const anchor = headings[0].trim().match(/^<a\b([^>]*)>([\s\S]*?)<\/a>$/);
    expect(anchor).not.toBeNull();
    expect(anchor![1]).toMatch(/\bhref="\/projects\/lantern-board\/"/);
    expect(text(anchor![2])).toBe('Lantern Board');
  });

  it('renders the description', async () => {
    const html = await render('lantern-board', linkedProject);

    expect(text(html)).toContain('A kanban board for tracking lighthouse maintenance tasks.');
  });

  it('renders a tech list labelled Technology with each item when tech is set', async () => {
    const html = await render('lantern-board', linkedProject);

    const list = html.match(/<ul\b[^>]*\baria-label="Technology"[^>]*>([\s\S]*?)<\/ul>/);
    expect(list).not.toBeNull();
    const items = [...list![1].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((item) => text(item[1]));
    expect(items).toEqual(['Astro', 'SQLite']);
  });

  it('omits the tech list when tech is empty', async () => {
    const html = await render('tide-clock', bareProject);

    expect(html).toMatch(/<article\b/);
    expect(html).not.toMatch(/aria-label="Technology"/);
  });

  it('includes the project links for a project with links', async () => {
    const html = await render('lantern-board', linkedProject);

    expect(hrefs(html)).toEqual(
      expect.arrayContaining(['https://github.com/example-org/lantern-board', 'https://lantern.example.com']),
    );
    expect(text(html)).toContain('View on GitHub');
    expect(text(html)).toContain('Visit lantern.example.com');
  });

  it('renders no external links for a project without links', async () => {
    const html = await render('tide-clock', bareProject);

    expect(html).toMatch(/<article\b/);
    expect(hrefs(html)).toEqual(['/projects/tide-clock/']);
    expect(html).not.toMatch(/View on GitHub/);
    expect(html).not.toMatch(/Visit /);
  });
});
