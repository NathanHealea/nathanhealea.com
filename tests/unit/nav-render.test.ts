import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Nav from '../../src/components/Nav.astro';

async function currentLinks(pathname: string): Promise<string[]> {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Nav, { request: new Request(`https://nathanhealea.com${pathname}`) });
  return [...html.matchAll(/<a\b[^>]*\baria-current="page"[^>]*>\s*([^<]+?)\s*<\/a>/g)].map((match) => match[1]);
}

describe('rendered primary nav', () => {
  it('marks only Projects on the projects index and a project page', async () => {
    expect(await currentLinks('/projects/')).toEqual(['Projects']);
    expect(await currentLinks('/projects/some-slug/')).toEqual(['Projects']);
  });

  it('marks only the matching link on the other sections', async () => {
    expect(await currentLinks('/experience/')).toEqual(['Experience']);
    expect(await currentLinks('/about/')).toEqual(['About']);
  });

  it('marks nothing outside a section', async () => {
    expect(await currentLinks('/')).toEqual([]);
  });
});
