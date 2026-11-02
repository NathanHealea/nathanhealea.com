import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import ProjectLinks from '../../src/components/ProjectLinks.astro';

type Props = { title: string; github?: string; live?: string };

async function render(props: Props): Promise<string> {
  const container = await AstroContainer.create();
  return container.renderToString(ProjectLinks, { props });
}

function text(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function visibleText(html: string): string {
  return text(html.replace(/<(\w+)\b[^>]*\bclass="[^"]*visually-hidden[^"]*"[^>]*>[\s\S]*?<\/\1>/g, ' '));
}

function anchors(html: string): { attrs: string; inner: string }[] {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((match) => ({ attrs: match[1], inner: match[2] }));
}

function href(attrs: string): string | undefined {
  return attrs.match(/\bhref="([^"]*)"/)?.[1];
}

describe('ProjectLinks names each link', () => {
  const props: Props = {
    title: 'Lantern Board',
    github: 'https://github.com/example-org/lantern-board',
    live: 'https://lantern.example.com/app',
  };

  it('renders one anchor per URL with the URL as its href', async () => {
    const links = anchors(await render(props));

    expect(links.map((link) => href(link.attrs))).toEqual([
      'https://github.com/example-org/lantern-board',
      'https://lantern.example.com/app',
    ]);
  });

  it('shows "View on GitHub" and names the project in the GitHub link', async () => {
    const github = anchors(await render(props)).find((link) => href(link.attrs) === props.github)!;

    expect(visibleText(github.inner)).toBe('View on GitHub');
    expect(text(github.inner).startsWith('View on GitHub')).toBe(true);
    expect(text(github.inner)).toContain('Lantern Board');
  });

  it('shows "Visit <host>" and names the project in the live link', async () => {
    const live = anchors(await render(props)).find((link) => href(link.attrs) === props.live)!;

    expect(visibleText(live.inner)).toBe('Visit lantern.example.com');
    expect(text(live.inner).startsWith('Visit lantern.example.com')).toBe(true);
    expect(text(live.inner)).toContain('Lantern Board');
  });

  it('opens links in the same tab', async () => {
    const links = anchors(await render(props));

    expect(links).toHaveLength(2);
    for (const link of links) expect(link.attrs).not.toMatch(/\btarget=/);
  });
});

describe('ProjectLinks renders nothing without links', () => {
  it('renders no anchor and no list with neither URL', async () => {
    const html = await render({ title: 'Lantern Board' });

    expect(html).not.toMatch(/<a\b/);
    expect(html).not.toMatch(/<ul\b/);
    expect(html).not.toMatch(/<li\b/);
  });

  it('renders only the GitHub anchor with only github', async () => {
    const links = anchors(await render({ title: 'Lantern Board', github: 'https://github.com/example-org/lantern-board' }));

    expect(links).toHaveLength(1);
    expect(href(links[0].attrs)).toBe('https://github.com/example-org/lantern-board');
  });

  it('renders only the live anchor with only live', async () => {
    const links = anchors(await render({ title: 'Lantern Board', live: 'https://lantern.example.com/app' }));

    expect(links).toHaveLength(1);
    expect(href(links[0].attrs)).toBe('https://lantern.example.com/app');
  });
});
