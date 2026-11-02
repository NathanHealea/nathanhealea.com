import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseFrontmatter } from '@astrojs/internal-helpers/frontmatter';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { formatRange } from '../../src/lib/content';
import { expectNoA11yViolations } from './helpers/a11y';

const ROUTE = '/experience/';
const EXPERIENCE_DIR = resolve(import.meta.dirname, '../../src/content/experience');

interface Role {
  company: string;
  title: string;
  location: string;
  start: string;
  end?: string;
  highlights: string[];
  tech: string[];
  body: string;
}

function readRoles(): Role[] {
  return readdirSync(EXPERIENCE_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { frontmatter, content } = parseFrontmatter(readFileSync(resolve(EXPERIENCE_DIR, file), 'utf8'));
      return { ...(frontmatter as Omit<Role, 'body'>), body: content.trim() };
    });
}

function newestFirst(roles: Role[]): Role[] {
  return [...roles].sort((a, b) => (a.start < b.start ? 1 : a.start > b.start ? -1 : 0));
}

function headingText(role: Role): string {
  return `${role.title} at ${role.company}`;
}

function articleFor(page: Page, role: Role): Locator {
  return page.locator('article').filter({
    has: page.getByRole('heading', { level: 2, name: headingText(role), exact: true }),
  });
}

// The side note is identified by content (it holds the date range), not by class.
function sideNoteOf(article: Locator): Locator {
  return article.locator(':scope > :has(time)');
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

function luminance(rgb: string): number {
  const [r, g, b] = (rgb.match(/[\d.]+/g) ?? []).slice(0, 3).map((value) => {
    const channel = Number(value) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

test('lists roles newest first', async ({ page }) => {
  const expected = newestFirst(readRoles()).map(headingText);
  expect(expected.length).toBeGreaterThan(0);

  await page.goto(ROUTE);

  await expect(page.locator('article')).toHaveCount(expected.length);
  await expect(page.locator('article h2')).toHaveText(expected);
});

test('role shows required fields', async ({ page }) => {
  await page.goto(ROUTE);

  for (const role of readRoles()) {
    const article = articleFor(page, role);
    await expect(article, role.title).toHaveCount(1);

    await expect(article.getByText(role.location, { exact: true }), role.title).toBeVisible();
    await expect(article.locator('time'), role.title).toHaveText(formatRange(role.start, role.end));

    for (const highlight of role.highlights) {
      await expect(article.getByRole('listitem').filter({ hasText: highlight }), highlight).toHaveCount(1);
    }

    await expect(article.getByRole('list', { name: 'Technology' }).getByRole('listitem'), role.title).toHaveText(
      role.tech,
    );
  }
});

test('details disclosure opens by keyboard', async ({ page }) => {
  const role = readRoles().find((entry) => entry.body !== '');
  expect(role, 'a placeholder role with a body').toBeDefined();
  const firstParagraph = role!.body.split(/\n\s*\n/)[0];

  await page.goto(ROUTE);
  const article = articleFor(page, role!);
  await expect(article).toHaveCount(1);

  const details = article.locator('details');
  const summary = details.locator('summary');
  const body = article.getByText(firstParagraph);
  await expect(summary).toHaveText(`Details: ${headingText(role!)}`);
  await expect(details).not.toHaveAttribute('open', /.*/);
  await expect(body).toBeHidden();

  await summary.focus();
  await expect(summary).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(details).toHaveAttribute('open', /.*/);
  await expect(body).toBeVisible();
});

test('no disclosure for empty body', async ({ page }) => {
  const bodiless = readRoles().filter((entry) => entry.body === '');
  expect(bodiless.length, 'a placeholder role without a body').toBeGreaterThan(0);

  await page.goto(ROUTE);

  for (const role of bodiless) {
    const article = articleFor(page, role);
    await expect(article, role.title).toHaveCount(1);
    await expect(article.locator('details'), role.title).toHaveCount(0);
  }
});

test('experience page is accessible and reflows', async ({ page }) => {
  await page.goto(ROUTE);

  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Experience');

  const levels = await page.evaluate(() =>
    [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((heading) => Number(heading.tagName[1])),
  );
  expect(levels[0]).toBe(1);
  for (let index = 1; index < levels.length; index += 1) {
    expect(levels[index], `heading ${index} after h${levels[index - 1]}`).toBeLessThanOrEqual(levels[index - 1] + 1);
  }

  await expectNoA11yViolations(page);

  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto(ROUTE);
  const { scrollWidth, innerWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
});

test('marks only the current role', async ({ page }) => {
  const roles = readRoles();
  const current = roles.filter((entry) => entry.end === undefined);
  const past = roles.filter((entry) => entry.end !== undefined);
  expect(current.length, 'a placeholder role without end').toBeGreaterThan(0);
  expect(past.length, 'a placeholder role with end').toBeGreaterThan(0);

  await page.goto(ROUTE);
  await settleAnimations(page);

  for (const role of past) {
    const article = articleFor(page, role);
    await expect(article, role.title).toHaveCount(1);
    await expect(article.getByText('Current', { exact: true }), role.title).toHaveCount(0);
  }

  for (const role of current) {
    const article = articleFor(page, role);
    await expect(article, role.title).toHaveCount(1);
    const label = article.getByText('Current', { exact: true });
    await expect(label, role.title).toBeVisible();

    const style = await label.evaluate((element) => {
      const computed = getComputedStyle(element);
      let ground: Element | null = element;
      while (ground && getComputedStyle(ground).backgroundColor === 'rgba(0, 0, 0, 0)') ground = ground.parentElement;
      return {
        textTransform: computed.textTransform,
        letterSpacing: computed.letterSpacing,
        fontWeight: computed.fontWeight,
        color: computed.color,
        background: ground ? getComputedStyle(ground).backgroundColor : 'rgb(255, 255, 255)',
      };
    });
    expect(style.textTransform).toBe('none');
    expect(['normal', '0px']).toContain(style.letterSpacing);
    expect(style.fontWeight).toBe('600');
    expect(contrast(style.color, style.background)).toBeGreaterThanOrEqual(4.5);
  }
});

test('side note sits on the axis', async ({ page }) => {
  const roles = readRoles();

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(ROUTE);
  await settleAnimations(page);
  await expect(page.locator('article')).toHaveCount(roles.length);

  const frame = await page.locator('main').evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const left = rect.left + parseFloat(style.paddingLeft);
    const right = rect.right - parseFloat(style.paddingRight);
    return { left, width: right - left };
  });

  for (const role of roles) {
    const article = articleFor(page, role);
    const side = sideNoteOf(article);
    const heading = article.getByRole('heading', { level: 2 });
    await expect(side, role.title).toHaveCount(1);

    const sideBox = (await side.boundingBox())!;
    const headingBox = (await heading.boundingBox())!;
    expect(Math.abs(headingBox.x - (frame.left + 0.42 * frame.width)), `${role.title} h2 left`).toBeLessThanOrEqual(1);
    expect(Math.abs(sideBox.x - frame.left), `${role.title} side note left`).toBeLessThanOrEqual(1);
    expect(Math.abs(sideBox.y - headingBox.y), `${role.title} tops`).toBeLessThanOrEqual(2);

    const sideFirst = await side.evaluate((element, headingElement) => {
      return Boolean(element.compareDocumentPosition(headingElement!) & Node.DOCUMENT_POSITION_FOLLOWING);
    }, await heading.elementHandle());
    expect(sideFirst, `${role.title} DOM order`).toBe(true);
  }

  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto(ROUTE);
  await settleAnimations(page);

  for (const role of roles) {
    const article = articleFor(page, role);
    const sideBox = (await sideNoteOf(article).boundingBox())!;
    const headingBox = (await article.getByRole('heading', { level: 2 }).boundingBox())!;
    expect(sideBox.y + sideBox.height, `${role.title} at 320px`).toBeLessThanOrEqual(headingBox.y);
  }
});

test.describe('role entry motion respects reduced motion', () => {
  test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });

    test('every animation in each article is 0s', async ({ page }) => {
      await page.goto(ROUTE);

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

  test.describe('with motion allowed', () => {
    test.use({ reducedMotion: 'no-preference' });

    test('each role runs ENTER once on transform and opacity only', async ({ page }) => {
      await page.goto(ROUTE);

      const articles = await page.locator('article').all();
      expect(articles.length).toBeGreaterThan(0);
      for (const [index, article] of articles.entries()) {
        const animations = await article.evaluate((element) =>
          element.getAnimations({ subtree: true }).map((animation) => {
            const effect = animation.effect as KeyframeEffect;
            const timing = effect.getTiming();
            return {
              iterations: timing.iterations,
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

  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });

    test('h2 and highlights of every role are visible', async ({ page }) => {
      const roles = readRoles();

      await page.goto(ROUTE);
      await settleAnimations(page);
      await expect(page.locator('article')).toHaveCount(roles.length);

      for (const role of roles) {
        const article = articleFor(page, role);
        const parts = [
          article.getByRole('heading', { level: 2 }),
          ...role.highlights.map((highlight) => article.getByRole('listitem').filter({ hasText: highlight })),
        ];
        for (const part of parts) {
          await expect(part, role.title).toBeVisible();
          const box = (await part.boundingBox())!;
          expect(box.width, role.title).toBeGreaterThan(0);
          expect(box.height, role.title).toBeGreaterThan(0);
          const opacity = await part.evaluate((element) => {
            let product = 1;
            for (let node: Element | null = element; node; node = node.parentElement) {
              product *= Number(getComputedStyle(node).opacity);
            }
            return product;
          });
          expect(opacity, role.title).toBe(1);
        }
      }
    });
  });
});
