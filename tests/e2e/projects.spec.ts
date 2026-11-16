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

// The title is in the link's name but clipped off screen; a 1px box proves the clipping applies.
async function titleHiddenBox(link: Locator): Promise<{ width: number; height: number }> {
  return link.evaluate((anchor) => {
    const hidden = [...anchor.querySelectorAll('*')].filter((node) => node.textContent?.trim().startsWith(':'));
    if (hidden.length !== 1) throw new Error(`expected one title span, found ${hidden.length}`);
    const box = hidden[0].getBoundingClientRect();
    return { width: Math.round(box.width), height: Math.round(box.height) };
  });
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

test('detail shows breadcrumb and toc', async ({ page }) => {
  const projects = readProjects();

  for (const project of projects) {
    const path = detailPath(project);
    await page.goto(path);

    const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumb', exact: true });
    await expect(breadcrumb, path).toHaveCount(1);
    const items = breadcrumb.locator('ol > li');
    await expect(items, path).toHaveCount(2);
    const projectsLink = items.nth(0).getByRole('link', { name: 'Projects', exact: true });
    await expect(projectsLink, path).toHaveAttribute('href', INDEX);
    const current = items.nth(1).locator('span[aria-current="page"]');
    await expect(current, path).toHaveText(project.title);
    await expect(breadcrumb.locator('[aria-current]'), `${path} one current crumb`).toHaveCount(1);

    const precedesH1 = await breadcrumb.evaluate(
      (nav, h1) => Boolean(nav.compareDocumentPosition(h1!) & Node.DOCUMENT_POSITION_FOLLOWING),
      await page.locator('h1').elementHandle(),
    );
    expect(precedesH1, `${path} breadcrumb before h1`).toBe(true);
  }

  const alpha = projects.find((project) => project.slug === 'placeholder-alpha');
  const beta = projects.find((project) => project.slug === 'placeholder-beta');
  expect(alpha, 'placeholder-alpha fixture').toBeDefined();
  expect(beta, 'placeholder-beta fixture').toBeDefined();

  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(detailPath(alpha!));

  const sections = await page
    .locator('main .body h2')
    .evaluateAll((headings) => headings.map((heading) => ({ id: heading.id, text: heading.textContent!.trim() })));
  expect(sections.map((section) => section.text), 'fixture h2s').toEqual(['Context', 'Approach', 'Outcome']);
  for (const section of sections) expect(section.id, `${section.text} has an id`).not.toBe('');

  const toc = page.getByRole('navigation', { name: 'On this page', exact: true });
  await expect(toc).toHaveCount(1);
  await expect(toc).toBeVisible();
  const tocLinks = toc.locator('ul a');
  await expect(tocLinks).toHaveText(sections.map((section) => section.text));
  expect(await tocLinks.evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href')))).toEqual(
    sections.map((section) => `#${section.id}`),
  );
  expect(await toc.evaluate((element) => getComputedStyle(element).position), 'toc sticks at 1280px').toBe('sticky');

  const approach = page.locator('main .body h2').nth(1);
  const target = await approach.evaluate((heading) => {
    const top = heading.getBoundingClientRect().top + window.scrollY - 0.25 * window.innerHeight;
    window.scrollTo({ top, behavior: 'instant' });
    return 0.25 * window.innerHeight;
  });
  await expect
    .poll(async () => Math.abs((await approach.boundingBox())!.y - target), 'Approach at 25% (fixture long enough)')
    .toBeLessThanOrEqual(2);
  await expect
    .poll(() => tocLinks.evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('aria-current'))))
    .toEqual([null, 'true', null]);

  await page.setViewportSize({ width: 999, height: 720 });
  const tocElement = page.locator('nav[aria-label="On this page"]');
  await expect(tocElement).toHaveCount(1);
  await expect(tocElement, 'toc hidden below 1000px').toBeHidden();

  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(detailPath(beta!));
  await expect(page.getByRole('navigation', { name: 'On this page' }), 'placeholder-beta has no toc').toHaveCount(0);
  await expect(page.locator('nav[aria-label="On this page"]'), 'no toc element at all').toHaveCount(0);
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

test('toc marks the last section once the page is scrolled to the end', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/projects/placeholder-alpha/');
  const toc = page.getByRole('navigation', { name: 'On this page' });
  const links = toc.getByRole('link');
  await links.last().click();
  await expect.poll(() => links.evaluateAll((all) => all.map((link) => link.getAttribute('aria-current')))).toEqual([
    null,
    null,
    'true',
  ]);
});

test('breadcrumb separator is not announced', async ({ page }) => {
  await page.goto('/projects/placeholder-alpha/');
  await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toMatchAriaSnapshot(`
    - navigation "Breadcrumb":
      - list:
        - listitem:
          - link "Projects"
        - listitem: Placeholder Alpha
  `);
});

test('paired project cards stagger their reveal', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(INDEX);
  const delays = await page
    .locator('main article.project')
    .evaluateAll((cards) => cards.slice(0, 2).map((card) => getComputedStyle(card).transitionDelay));
  expect(delays).toEqual(['0s', '0.07s']);
});

test('toc sits beside the write-up and its targets clear the sticky header', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/projects/placeholder-alpha/');
  const toc = page.getByRole('navigation', { name: 'On this page' });
  const tocBox = (await toc.boundingBox())!;
  const articleBox = (await page.locator('.article').boundingBox())!;
  expect(tocBox.x + tocBox.width).toBeLessThanOrEqual(articleBox.x);
  expect(Math.abs(tocBox.y - articleBox.y)).toBeLessThanOrEqual(24);

  const header = page.locator('header.site-header');
  for (const link of await toc.getByRole('link').all()) {
    await link.click();
    const target = page.locator(decodeURIComponent((await link.getAttribute('href'))!));
    await expect
      .poll(async () => {
        const headerBox = (await header.boundingBox())!;
        const targetBox = (await target.boundingBox())!;
        return targetBox.y >= headerBox.y + headerBox.height;
      })
      .toBe(true);
  }
});
