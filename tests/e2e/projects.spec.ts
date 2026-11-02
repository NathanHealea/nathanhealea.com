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
  order?: number;
}

function readProjects(): Project[] {
  return readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { frontmatter } = parseFrontmatter(readFileSync(resolve(PROJECTS_DIR, file), 'utf8'));
      return { ...(frontmatter as Omit<Project, 'slug'>), slug: basename(file, '.md') };
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

function detailPath(project: Project): string {
  return `/projects/${project.slug}/`;
}

function articleFor(page: Page, project: Project): Locator {
  return page.locator('article').filter({
    has: page.getByRole('heading', { level: 2, name: project.title, exact: true }),
  });
}

// The side note is identified by content (it holds the tech list), not by class.
function sideNoteOf(article: Locator): Locator {
  return article.locator(':scope > :has([aria-label="Technology"])');
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

test('projects pages are accessible and reflow', async ({ page }) => {
  const paths = [INDEX];

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

test('projects sit on the axis', async ({ page }) => {
  const projects = readProjects();
  const withTech = projects.filter(hasTech);
  expect(withTech.length, 'a placeholder project with tech').toBeGreaterThan(0);

  for (const width of [1280, 960]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(INDEX);
    await settleAnimations(page);
    await expect(page.locator('article')).toHaveCount(projects.length);

    const frame = await page.locator('main').evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      const left = rect.left + parseFloat(style.paddingLeft);
      const right = rect.right - parseFloat(style.paddingRight);
      return { left, width: right - left };
    });

    for (const project of projects) {
      const label = `${project.title} at ${width}px`;
      const headingBox = (await articleFor(page, project).getByRole('heading', { level: 2 }).boundingBox())!;
      expect(Math.abs(headingBox.x - (frame.left + 0.42 * frame.width)), `${label} h2 left`).toBeLessThanOrEqual(1);
    }

    for (const project of withTech) {
      const label = `${project.title} at ${width}px`;
      const article = articleFor(page, project);
      const side = sideNoteOf(article);
      const heading = article.getByRole('heading', { level: 2 });
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
    await page.goto(INDEX);
    await settleAnimations(page);

    for (const project of withTech) {
      const article = articleFor(page, project);
      const sideBox = (await sideNoteOf(article).boundingBox())!;
      const headingBox = (await article.getByRole('heading', { level: 2 }).boundingBox())!;
      expect(sideBox.y + sideBox.height, `${project.title} at ${width}px`).toBeLessThanOrEqual(headingBox.y);
    }
  }
});

test.describe('project entry motion respects reduced motion', () => {
  test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });

    test('every animation in each article is 0s', async ({ page }) => {
      await page.goto(INDEX);

      const articles = await page.locator('article').all();
      expect(articles.length).toBeGreaterThan(0);
      for (const [index, article] of articles.entries()) {
        const durations = await article.evaluate((element) =>
          [element, ...element.querySelectorAll('*')].flatMap((node) =>
            getComputedStyle(node)
              .animationDuration.split(',')
              .map((value) => value.trim()),
          ),
        );
        for (const duration of durations) {
          expect(duration, `article ${index}`).toBe('0s');
        }
      }
    });
  });

  test.describe('without JavaScript', () => {
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
});

test.describe('project entry motion runs when motion is allowed', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('each project runs ENTER once on transform and opacity only', async ({ page }) => {
    await page.goto(INDEX);

    const articles = await page.locator('article').all();
    expect(articles.length).toBeGreaterThan(0);
    for (const [index, article] of articles.entries()) {
      const animations = await article.evaluate((element) =>
        element.getAnimations({ subtree: true }).map((animation) => {
          const effect = animation.effect as KeyframeEffect;
          const timing = effect.getTiming();
          return {
            iterations: timing.iterations,
            fill: timing.fill,
            duration: timing.duration,
            delay: timing.delay ?? 0,
            keyframes: effect.getKeyframes().map((frame) => ({ ...frame })),
          };
        }),
      );
      const label = `article ${index}`;
      expect(animations.length, label).toBeGreaterThan(0);

      for (const animation of animations) {
        expect(animation.iterations, label).toBe(1);
        expect(animation.duration, label).toBe(700);
        expect(['both', 'backwards'], `${label} hides parts during their delay`).toContain(animation.fill);

        const animated = new Set(
          animation.keyframes.flatMap((frame) =>
            Object.keys(frame).filter((key) => !['offset', 'easing', 'composite', 'computedOffset'].includes(key)),
          ),
        );
        for (const property of animated) {
          expect(['transform', 'opacity'], `${label} animates ${property}`).toContain(property);
        }

        const start = animation.keyframes[0];
        expect(Number(start.opacity), `${label} start opacity`).toBe(0);
        const transform = String(start.transform).replace(/\s+/g, '');
        const matrix = transform.match(/^matrix\(([^)]+)\)$/);
        const translateY = matrix ? Number(matrix[1].split(',')[5]) : transform === 'translateY(24px)' ? 24 : NaN;
        expect(translateY, `${label} start transform ${start.transform}`).toBe(24);
      }

      if (animations.length > 1) {
        const delays = animations.map((animation) => animation.delay).sort((a, b) => a - b);
        for (let step = 1; step < delays.length; step += 1) {
          expect(delays[step] - delays[step - 1], `${label} stagger`).toBe(80);
        }
      }
    }
  });
});
