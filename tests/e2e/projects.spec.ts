import { readdirSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { parseFrontmatter } from '@astrojs/internal-helpers/frontmatter';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { expectNoA11yViolations } from './helpers/a11y';

const INDEX = '/projects/';
const PROJECTS_DIR = resolve(import.meta.dirname, '../../src/content/projects');

interface Project {
  slug: string;
  title: string;
  description: string;
  tech?: string[];
  github?: string;
  live?: string;
  order?: number;
  body: string;
}

function readProjects(): Project[] {
  return readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { frontmatter, content } = parseFrontmatter(readFileSync(resolve(PROJECTS_DIR, file), 'utf8'));
      return {
        ...(frontmatter as Omit<Project, 'slug' | 'body'>),
        slug: basename(file, '.md'),
        body: content.trim(),
      };
    });
}

// Mirrors sortProjects: order ascending with unset last, then title ignoring case.
function inListOrder(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const aOrder = a.order ?? Number.POSITIVE_INFINITY;
    const bOrder = b.order ?? Number.POSITIVE_INFINITY;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });
  });
}

function hasTech(project: Project): boolean {
  return (project.tech ?? []).length > 0;
}

function hasSideNote(project: Project): boolean {
  return hasTech(project) || project.github !== undefined || project.live !== undefined;
}

function firstParagraph(project: Project): string {
  return project.body.split(/\n\s*\n/)[0];
}

function detailPath(project: Project): string {
  return `/projects/${project.slug}/`;
}

function articleFor(page: Page, project: Project): Locator {
  return page.locator('article').filter({
    has: page.getByRole('heading', { level: 2, name: project.title, exact: true }),
  });
}

// On a detail page the side note holds the tech and link lists; the main column's lists sit deeper, inside the body.
// The title is in the link's name but clipped off screen; a 1px box proves the clipping applies.
async function titleHiddenBox(link: Locator): Promise<{ width: number; height: number }> {
  return link.evaluate((anchor) => {
    const hidden = [...anchor.querySelectorAll('*')].filter((node) => node.textContent?.trim().startsWith(':'));
    if (hidden.length !== 1) throw new Error(`expected one title span, found ${hidden.length}`);
    const box = hidden[0].getBoundingClientRect();
    return { width: Math.round(box.width), height: Math.round(box.height) };
  });
}

function detailSideNoteOf(article: Locator): Locator {
  return article.locator(':scope > :not(:has(h1))');
}

async function settleAnimations(page: Page): Promise<void> {
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
        .map((animation) => animation.finished),
    ),
  );
}

test('index lists projects in order', async ({ page }) => {
  const projects = inListOrder(readProjects());
  expect(projects.length).toBeGreaterThan(0);

  await page.goto(INDEX);

  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Projects');
  await expect(page.locator('article')).toHaveCount(projects.length);
  await expect(page.locator('article h2')).toHaveText(projects.map((project) => project.title));

  for (const project of projects) {
    const article = articleFor(page, project);
    await expect(article, project.title).toHaveCount(1);

    const heading = article.getByRole('heading', { level: 2 });
    const links = heading.locator('a');
    await expect(links, `${project.title} h2 links`).toHaveCount(1);
    await expect(links, project.title).toHaveAttribute('href', detailPath(project));
    await expect(links, project.title).toHaveAccessibleName(project.title);
    await expect(heading, `${project.title} h2 holds only the link`).toHaveText(project.title);

    const detailHrefs = await article.locator('a').evaluateAll(
      (anchors, path) =>
        anchors.filter((anchor) => new URL((anchor as HTMLAnchorElement).href).pathname === path).length,
      detailPath(project),
    );
    expect(detailHrefs, `${project.title} anchors to its detail page`).toBe(1);

    const techList = article.getByRole('list', { name: 'Technology' });
    if (hasTech(project)) {
      await expect(techList.getByRole('listitem'), project.title).toHaveText(project.tech!);
    } else {
      await expect(techList, project.title).toHaveCount(0);
    }
  }

  expect(projects.some(hasTech), 'a placeholder project with tech').toBe(true);
  expect(projects.some((project) => !hasTech(project)), 'a placeholder project without tech').toBe(true);
});

test('each project is one card element', async ({ page }) => {
  const projects = inListOrder(readProjects());
  expect(projects.length, 'two placeholder projects to lay out in a row').toBeGreaterThanOrEqual(2);

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(INDEX);

  const lede = page.locator('main h1 + p');
  await expect(lede, 'one lede paragraph after the h1').toHaveCount(1);
  await expect(lede).not.toHaveText('');

  const cards = page.locator('main article.project[data-reveal]');
  await expect(page.locator('main article')).toHaveCount(projects.length);
  await expect(cards).toHaveCount(projects.length);
  await expect(cards.locator('h2')).toHaveText(projects.map((project) => project.title));

  for (const project of projects) {
    const surface = await articleFor(page, project).evaluate((element) => {
      const style = getComputedStyle(element);
      return { border: parseFloat(style.borderTopWidth), radius: parseFloat(style.borderTopLeftRadius) };
    });
    expect(surface.border, `${project.title} card border`).toBeGreaterThanOrEqual(1);
    expect(surface.radius, `${project.title} card radius`).toBeGreaterThan(0);
  }

  // Layout offsets, not bounding boxes: the reveal transform shifts cards that have not scrolled in yet.
  const offsets = () =>
    cards.evaluateAll((elements) =>
      elements.map((element) => ({
        left: (element as HTMLElement).offsetLeft,
        top: (element as HTMLElement).offsetTop,
      })),
    );

  const wide = await offsets();
  expect(wide[1].top, 'two cards per row at 1280px').toBe(wide[0].top);
  expect(wide[1].left, 'second card beside the first at 1280px').toBeGreaterThan(wide[0].left);

  await page.setViewportSize({ width: 600, height: 800 });
  await page.goto(INDEX);
  const narrow = await offsets();
  for (const [index, card] of narrow.entries()) {
    expect(card.left, `card ${index} in the single column at 600px`).toBe(narrow[0].left);
  }
});

test('detail page renders project', async ({ page }) => {
  const projects = readProjects();
  expect(projects.some((project) => project.body !== ''), 'a placeholder project with a body').toBe(true);
  expect(projects.some((project) => project.body === ''), 'a placeholder project without a body').toBe(true);

  for (const project of projects) {
    const path = detailPath(project);
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);

    const main = page.locator('main');
    await expect(page.locator('h1'), path).toHaveCount(1);
    await expect(page.locator('h1'), path).toHaveText(project.title);
    await expect(main.getByText(project.description, { exact: true }), path).toBeVisible();

    const back = main.getByRole('link', { name: 'All projects', exact: true });
    await expect(back, path).toHaveCount(1);
    await expect(back, path).toHaveAttribute('href', INDEX);

    const techList = main.getByRole('list', { name: 'Technology' });
    if (hasTech(project)) {
      await expect(techList.getByRole('listitem'), path).toHaveText(project.tech!);
    } else {
      await expect(techList, path).toHaveCount(0);
    }

    if (project.body !== '') {
      await expect(main.locator('.body').getByText(firstParagraph(project)), `${path} body`).toBeVisible();
    } else {
      await expect(main.locator('.body'), `${path} empty body wrapper`).toHaveCount(0);
    }

    if (project.github !== undefined) {
      const github = main.getByRole('link', { name: /^View on GitHub/ });
      await expect(github, `${path} GitHub link`).toHaveCount(1);
      await expect(github, path).toHaveAttribute('href', project.github);
      expect(await titleHiddenBox(github), `${path} GitHub title is hidden visually`).toEqual({ width: 1, height: 1 });
      await expect(github, path).toHaveAccessibleName(new RegExp(project.title));
    }
    if (project.live !== undefined) {
      const host = new URL(project.live).host;
      const live = main.getByRole('link').filter({ hasText: `Visit ${host}` });
      await expect(live, `${path} live link`).toHaveCount(1);
      await expect(live, path).toHaveAttribute('href', project.live);
      expect(await titleHiddenBox(live), `${path} live title is hidden visually`).toEqual({ width: 1, height: 1 });
      await expect(live, path).toHaveAccessibleName(new RegExp(project.title));
    }
    if (project.github === undefined && project.live === undefined) {
      const external = await main.locator('a').evaluateAll(
        (anchors) =>
          anchors.filter((anchor) => new URL((anchor as HTMLAnchorElement).href).origin !== window.location.origin)
            .length,
      );
      expect(external, `${path} external anchors`).toBe(0);
    }
  }
});

test('projects pages are accessible and reflow', async ({ page }) => {
  const paths = [INDEX, ...readProjects().map(detailPath)];

  for (const path of paths) {
    await page.setViewportSize({ width: 1280, height: 800 });
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);

    const levels = await page.evaluate(() =>
      [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((heading) => Number(heading.tagName[1])),
    );
    expect(levels[0], path).toBe(1);
    for (let index = 1; index < levels.length; index += 1) {
      expect(levels[index], `${path} heading ${index} after h${levels[index - 1]}`).toBeLessThanOrEqual(
        levels[index - 1] + 1,
      );
    }

    await expectNoA11yViolations(page);

    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(path);
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth, path).toBeLessThanOrEqual(innerWidth);
  }
});

test('project detail pages sit on the axis', async ({ page }) => {
  const projects = readProjects();
  const withSideNote = projects.filter(hasSideNote);
  expect(withSideNote.length, 'a placeholder project with tech or links').toBeGreaterThan(0);

  for (const width of [1280, 960]) {
    await page.setViewportSize({ width, height: 800 });

    for (const project of projects) {
      const label = `${detailPath(project)} at ${width}px`;
      const response = await page.goto(detailPath(project));
      expect(response?.status(), label).toBe(200);
      await settleAnimations(page);

      const frame = await page.locator('main').evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        const left = rect.left + parseFloat(style.paddingLeft);
        const right = rect.right - parseFloat(style.paddingRight);
        return { left, width: right - left };
      });
      const axis = frame.left + 0.42 * frame.width;

      const article = page.locator('main article');
      const heading = page.locator('h1');
      const parts: [string, Locator][] = [
        ['h1', heading],
        ['description', article.getByText(project.description, { exact: true })],
        ['back link', article.getByRole('link', { name: 'All projects', exact: true })],
      ];
      if (project.body !== '') parts.push(['body', article.locator('.body')]);
      for (const [name, part] of parts) {
        const box = (await part.boundingBox())!;
        expect(Math.abs(box.x - axis), `${label} ${name} left`).toBeLessThanOrEqual(1);
      }

      if (project.body !== '') {
        const { width: paragraphWidth, ch } = await article
          .locator('.body')
          .getByText(firstParagraph(project))
          .evaluate((element) => {
            const context = document.createElement('canvas').getContext('2d')!;
            context.font = getComputedStyle(element).font;
            return { width: element.getBoundingClientRect().width, ch: context.measureText('0').width };
          });
        expect(paragraphWidth, `${label} body paragraph within 62ch`).toBeLessThanOrEqual(62 * ch + 1);
      }

      if (!hasSideNote(project)) continue;
      const side = detailSideNoteOf(article);
      await expect(side, label).toHaveCount(1);
      const sideBox = (await side.boundingBox())!;
      const headingBox = (await heading.boundingBox())!;
      expect(Math.abs(sideBox.x - frame.left), `${label} side note left`).toBeLessThanOrEqual(1);
      expect(Math.abs(sideBox.y - headingBox.y), `${label} tops`).toBeLessThanOrEqual(2);

      const sideFirst = await side.evaluate((element, headingElement) => {
        return Boolean(element.compareDocumentPosition(headingElement!) & Node.DOCUMENT_POSITION_FOLLOWING);
      }, await heading.elementHandle());
      expect(sideFirst, `${label} DOM order`).toBe(true);
    }
  }

  for (const width of [959, 320]) {
    await page.setViewportSize({ width, height: 800 });

    for (const project of withSideNote) {
      await page.goto(detailPath(project));
      await settleAnimations(page);
      const article = page.locator('main article');
      const sideBox = (await detailSideNoteOf(article).boundingBox())!;
      const headingBox = (await page.locator('h1').boundingBox())!;
      expect(sideBox.y + sideBox.height, `${detailPath(project)} at ${width}px`).toBeLessThanOrEqual(headingBox.y);
    }
  }
});

test.describe('project index without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('h2 and description of every project are visible', async ({ page }) => {
    const projects = readProjects();

    await page.goto(INDEX);
    await settleAnimations(page);
    await expect(page.locator('article')).toHaveCount(projects.length);

    for (const project of projects) {
      const article = articleFor(page, project);
      const parts = [
        article.getByRole('heading', { level: 2 }),
        article.getByText(project.description, { exact: true }),
      ];
      for (const part of parts) {
        await expect(part, project.title).toBeVisible();
        const box = (await part.boundingBox())!;
        expect(box.width, project.title).toBeGreaterThan(0);
        expect(box.height, project.title).toBeGreaterThan(0);
        const opacity = await part.evaluate((element) => {
          let product = 1;
          for (let node: Element | null = element; node; node = node.parentElement) {
            product *= Number(getComputedStyle(node).opacity);
          }
          return product;
        });
        expect(opacity, project.title).toBe(1);
      }
    }
  });
});
