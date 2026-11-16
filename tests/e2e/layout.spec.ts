import { readdirSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { parseFrontmatter } from '@astrojs/internal-helpers/frontmatter';
import { expect, test, type Locator } from '@playwright/test';
import { expectNoA11yViolations } from './helpers/a11y';

const LAYOUT_ROUTES = ['/', '/404'];
const REVEAL_ROUTES = ['/', '/experience/', '/projects/', '/404'];
const PROJECT_ROUTES = readdirSync(resolve(import.meta.dirname, '../../src/content/projects'))
  .filter((file) => file.endsWith('.md'))
  .map((file) => `/projects/${basename(file, '.md')}/`);
const EVERY_ROUTE = ['/', '/experience/', '/projects/', ...PROJECT_ROUTES, '/this-page-does-not-exist/'];

async function motionDurations(locator: Locator): Promise<string[]> {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return [...style.transitionDuration.split(','), ...style.animationDuration.split(',')].map((value) =>
      value.trim(),
    );
  });
}

function unquote(family: string): string {
  return family.trim().replace(/^["']|["']$/g, '');
}

test('layout renders landmarks', async ({ page }) => {
  for (const route of LAYOUT_ROUTES) {
    await page.goto(route);

    await expect(page.locator('html'), route).toHaveAttribute('lang', 'en');
    await expect(page.locator('header'), route).toHaveCount(1);
    await expect(page.locator('nav'), route).toHaveCount(1);
    await expect(page.locator('nav[aria-label="Primary"]'), route).toHaveCount(1);
    await expect(page.locator('main'), route).toHaveCount(1);
    await expect(page.locator('main#main'), route).toHaveCount(1);
    await expect(page.locator('footer'), route).toHaveCount(1);
  }
});

test('skip link moves focus to main', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');

  const skipLink = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skipLink).toBeFocused();

  // A visually-hidden pattern can pass toBeVisible() at 1px, so require real size and no clipping.
  await expect(skipLink).toBeVisible();
  const box = await skipLink.boundingBox();
  const viewport = page.viewportSize();
  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(box!.width).toBeGreaterThanOrEqual(8);
  expect(box!.height).toBeGreaterThanOrEqual(8);
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width);
  expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height);
  const clipping = await skipLink.evaluate((element) => {
    const style = getComputedStyle(element);
    return { clip: style.clip, clipPath: style.clipPath, opacity: style.opacity };
  });
  expect(clipping.clip).toBe('auto');
  expect(clipping.clipPath).toBe('none');
  expect(clipping.opacity).toBe('1');

  await page.keyboard.press('Enter');
  const focusInMain = await page.evaluate(() => {
    const main = document.querySelector('main#main');
    return main !== null && main.contains(document.activeElement);
  });
  expect(focusInMain).toBe(true);
});

test('layout has no axe violations', async ({ page }) => {
  for (const route of LAYOUT_ROUTES) {
    await page.goto(route);
    await expectNoA11yViolations(page);
  }
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('reveal content is visible without JS', async ({ page }) => {
    for (const route of REVEAL_ROUTES) {
      await page.goto(route);
      const reveals = await page.locator('[data-reveal]').all();
      expect(reveals.length, route).toBeGreaterThan(0);
      for (const reveal of reveals) {
        const opacity = await reveal.evaluate((element) => getComputedStyle(element).opacity);
        expect(opacity, route).toBe('1');
      }
    }
  });
});

test.describe('with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('nothing animates', async ({ page }) => {
    for (const route of REVEAL_ROUTES) {
      await page.goto(route);

      const reveals = await page.locator('[data-reveal]').all();
      expect(reveals.length, route).toBeGreaterThan(0);
      const targets = [
        page.locator('h1').first(),
        ...(await page.locator('nav a').all()),
        page.locator('header button[data-theme-toggle]'),
        ...reveals,
      ];
      for (const target of targets) {
        for (const duration of await motionDurations(target)) {
          expect(duration, route).toBe('0s');
        }
      }
      for (const reveal of reveals) {
        const opacity = await reveal.evaluate((element) => getComputedStyle(element).opacity);
        expect(opacity, route).toBe('1');
      }
    }
  });
});

test.describe('without reduced motion', () => {
  test.use({ reducedMotion: 'no-preference', viewport: { width: 1280, height: 400 } });

  test('reveal runs once on transform and opacity', async ({ page }) => {
    const settledOpacity = (element: Element) =>
      new Promise<void>((done) => requestAnimationFrame(() => requestAnimationFrame(() => done())))
        .then(() => Promise.all(element.getAnimations().map((animation) => animation.finished)))
        .then(() => getComputedStyle(element).opacity);

    await page.goto('/experience/');
    const reveal = page.locator('footer [data-reveal]');
    await expect(reveal).toHaveCount(1);

    const box = await reveal.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThan(400);

    const before = await reveal.evaluate((element) => {
      const style = getComputedStyle(element);
      return { opacity: style.opacity, properties: style.transitionProperty.split(',').map((value) => value.trim()) };
    });
    expect(before.opacity).toBe('0');
    expect([...before.properties].sort()).toEqual(['opacity', 'transform']);

    await reveal.scrollIntoViewIfNeeded();
    await expect.poll(() => reveal.evaluate(settledOpacity)).toBe('1');

    await page.evaluate(() => window.scrollTo(0, 0));
    expect(await reveal.evaluate(settledOpacity)).toBe('1');
  });
});

test('typefaces load from same origin', async ({ page }) => {
  const fontUrls: string[] = [];
  page.on('response', (response) => {
    if (response.request().resourceType() === 'font') fontUrls.push(response.url());
  });
  const loadedFamilies = () =>
    page.evaluate(async () => {
      await document.fonts.ready;
      return [...document.fonts].filter((face) => face.status === 'loaded').map((face) => face.family);
    });
  const firstFamily = (locator: Locator) =>
    locator.evaluate((element) => getComputedStyle(element).fontFamily).then((family) => unquote(family.split(',')[0]));

  await page.goto('/');
  expect((await loadedFamilies()).map(unquote)).toContain('Geist');
  expect(await firstFamily(page.locator('body'))).toBe('Geist');
  expect(await firstFamily(page.locator('h1').first())).toBe('Geist');

  await page.goto('/experience/');
  expect((await loadedFamilies()).map(unquote)).toContain('Geist Mono');
  expect(await firstFamily(page.locator('time').first())).toBe('Geist Mono');

  const pageOrigin = new URL(page.url()).origin;
  expect(fontUrls.length).toBeGreaterThanOrEqual(2);
  for (const url of fontUrls) {
    expect(new URL(url).origin, url).toBe(pageOrigin);
  }
});

test('nav marks current section', async ({ page }) => {
  await page.goto('/');

  const nav = page.locator('nav[aria-label="Primary"]');
  const expected = [
    { name: 'Experience', href: '/experience/' },
    { name: 'Projects', href: '/projects/' },
    { name: 'About', href: '/about/' },
  ];
  await expect(nav.getByRole('link')).toHaveCount(expected.length);
  for (const { name, href } of expected) {
    const link = nav.getByRole('link', { name, exact: true });
    await expect(link).toHaveAttribute('href', href);
    await expect(link).not.toHaveAttribute('aria-current', /.*/);
  }

  // /about/ is not built yet (story about-page); nav-render.test.ts covers its marking.
  for (const current of expected.filter(({ href }) => href !== '/about/')) {
    await page.goto(current.href);
    for (const { name, href } of expected) {
      const link = nav.getByRole('link', { name, exact: true });
      const boxShadow = await link.evaluate((element) => getComputedStyle(element).boxShadow);
      if (href === current.href) {
        await expect(link, current.href).toHaveAttribute('aria-current', 'page');
        expect(boxShadow, `${current.href} ${name}`).not.toBe('none');
      } else {
        await expect(link, current.href).not.toHaveAttribute('aria-current', /.*/);
        expect(boxShadow, `${current.href} ${name}`).toBe('none');
      }
    }
  }
});

test('header stays in view', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 400 });
  await page.goto('/experience/');
  const header = page.locator('header.site-header');
  const scrollable = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  expect(scrollable).toBeGreaterThan(200);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200);

  const box = await header.boundingBox();
  expect(box).not.toBeNull();
  expect(Math.round(box!.y)).toBe(0);
  await expect(header.getByRole('link', { name: 'Nathan Healea', exact: true })).toBeInViewport();
  await expect(header.locator('nav[aria-label="Primary"]')).toBeInViewport();
  await expect(header.locator('button[data-theme-toggle]')).toBeInViewport();
});

test('no horizontal scroll at 320px and 1920px', async ({ page }) => {
  for (const width of [320, 1920]) {
    await page.setViewportSize({ width, height: 800 });
    expect(PROJECT_ROUTES.length).toBeGreaterThan(0);
    for (const route of EVERY_ROUTE) {
      await page.goto(route);
      const { scrollWidth, innerWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(scrollWidth, `${route} at ${width}px`).toBeLessThanOrEqual(innerWidth);
    }
  }
});

test.describe('at 320px', () => {
  test.use({ viewport: { width: 320, height: 640 } });

  test('narrow nav stays visible and in tab order', async ({ page }) => {
    for (const route of LAYOUT_ROUTES) {
      await page.goto(route);

      const nav = page.locator('nav[aria-label="Primary"]');
      const navLinks = ['Experience', 'Projects', 'About'].map((name) =>
        nav.getByRole('link', { name, exact: true }),
      );
      const toggle = page.locator('header button[data-theme-toggle]');
      for (const link of [...navLinks, toggle]) {
        await expect(link, route).toBeVisible();
        const box = await link.boundingBox();
        expect(box, route).not.toBeNull();
        expect(box!.x, route).toBeGreaterThanOrEqual(0);
        expect(box!.y, route).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width, route).toBeLessThanOrEqual(320);
        expect(box!.y + box!.height, route).toBeLessThanOrEqual(640);
      }

      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Skip to main content' }), route).toBeFocused();
      const tabOrder = [page.getByRole('link', { name: 'Nathan Healea', exact: true }), ...navLinks, toggle];
      for (const link of tabOrder) {
        await page.keyboard.press('Tab');
        await expect(link, route).toBeFocused();
      }
    }
  });

  test('narrow nav sits on one row under the wordmark', async ({ page }) => {
    for (const route of LAYOUT_ROUTES) {
      await page.goto(route);
      const wordmark = await page.getByRole('link', { name: 'Nathan Healea', exact: true }).boundingBox();
      const links = await Promise.all(
        ['Experience', 'Projects', 'About'].map((name) =>
          page.locator('nav[aria-label="Primary"]').getByRole('link', { name, exact: true }).boundingBox(),
        ),
      );
      const tops = links.map((box) => Math.round(box!.y));
      expect(new Set(tops).size, route).toBe(1);
      expect(tops[0], route).toBeGreaterThanOrEqual(Math.floor(wordmark!.y + wordmark!.height));
    }
  });
});

test('footer social links have names', async ({ page }) => {
  const aboutSource = readFileSync(resolve(import.meta.dirname, '../../src/content/about/about.md'), 'utf8');
  const social = parseFrontmatter(aboutSource).frontmatter.social as { label: string; url: string }[];
  expect(social.length).toBeGreaterThan(0);

  for (const route of LAYOUT_ROUTES) {
    await page.goto(route);

    const links = page.locator('footer').getByRole('link');
    await expect(links, route).toHaveCount(social.length);
    for (const [index, { label, url }] of social.entries()) {
      const link = links.nth(index);
      await expect(link, route).toHaveAttribute('href', url);
      await expect(link, route).toHaveAccessibleName(/\S/);
      await expect(link, route).toHaveAccessibleName(label);
      await expect(link, route).not.toHaveAttribute('target', /.+/);
    }
  }
});

test('footer shows location', async ({ page }) => {
  const aboutSource = readFileSync(resolve(import.meta.dirname, '../../src/content/about/about.md'), 'utf8');
  const { name, location } = parseFrontmatter(aboutSource).frontmatter as { name: string; location: string };
  expect(location).toMatch(/\S/);

  for (const route of LAYOUT_ROUTES) {
    await page.goto(route);
    const footer = page.locator('footer');
    await expect(footer, route).toContainText(name);
    await expect(footer.getByText(`Based in ${location}.`, { exact: true }), route).toBeVisible();
  }
});

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

test('every keyboard stop shows a focus ring with 3:1 contrast', async ({ page }) => {
  const themes = [
    { colorScheme: 'light', background: 'rgb(251, 251, 250)' },
    { colorScheme: 'dark', background: 'rgb(11, 12, 14)' },
  ] as const;
  for (const { colorScheme, background } of themes) {
    await page.emulateMedia({ colorScheme });
    for (const route of LAYOUT_ROUTES) {
      await page.goto(route);
      const where = `${route} ${colorScheme}`;
      const bodyBackground = await page.locator('body').evaluate((element) => getComputedStyle(element).backgroundColor);
      expect(bodyBackground, where).toBe(background);
      await expect(page.locator('header button[data-theme-toggle]'), where).toBeVisible();

      const stops = await page.locator('a, button').count();
      let reachedToggle = false;
      for (let index = 0; index < stops; index += 1) {
        await page.keyboard.press('Tab');
        const ring = await page.evaluate(() => {
          const element = document.activeElement as HTMLElement;
          const style = getComputedStyle(element);
          let ground = element.parentElement;
          while (ground && getComputedStyle(ground).backgroundColor === 'rgba(0, 0, 0, 0)') ground = ground.parentElement;
          return {
            name: element.getAttribute('aria-label') ?? element.textContent?.trim(),
            isToggle: element.hasAttribute('data-theme-toggle'),
            style: style.outlineStyle,
            width: parseFloat(style.outlineWidth),
            color: style.outlineColor,
            background: ground ? getComputedStyle(ground).backgroundColor : 'rgb(255, 255, 255)',
          };
        });
        reachedToggle ||= ring.isToggle;
        expect(ring.style, `${where} ${ring.name}`).not.toBe('none');
        expect(ring.width, `${where} ${ring.name}`).toBeGreaterThanOrEqual(2);
        expect(contrast(ring.color, ring.background), `${where} ${ring.name}`).toBeGreaterThanOrEqual(3);
      }
      expect(reachedToggle, where).toBe(true);
    }
  }
});

test('layout renders the page title and description', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Nathan Healea');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/);

  await page.goto('/404');
  await expect(page).toHaveTitle('Page not found | Nathan Healea');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/);
});

test('404 page renders', async ({ page }) => {
  const response = await page.goto('/does-not-exist');

  expect(response).not.toBeNull();
  expect(response!.status()).toBe(404);
  await expect(page.locator('main#main')).toHaveCount(1);
  await expect(page.locator('header')).toHaveCount(1);
  await expect(page.locator('footer')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Nothing here.');
  await expect(
    page.locator('main#main').getByText("This page doesn't exist, or it moved when the site was rebuilt.", { exact: true }),
  ).toBeVisible();
  const home = page.locator('main#main').getByRole('link', { name: 'Return to the home page', exact: true });
  await expect(home).toHaveAttribute('href', '/');
  await expect(page.getByText('Not in the record.')).toHaveCount(0);
});

test('no third-party requests', async ({ page }) => {
  for (const route of LAYOUT_ROUTES) {
    const requestUrls: string[] = [];
    const record = (request: { url(): string }) => requestUrls.push(request.url());
    page.on('request', record);

    await page.goto(route, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    page.off('request', record);

    const pageOrigin = new URL(page.url()).origin;
    expect(requestUrls.length, route).toBeGreaterThan(0);
    for (const url of requestUrls) {
      // data: URLs are decoded in the browser and never reach a server, and their origin is always "null".
      if (url.startsWith('data:')) continue;
      expect(new URL(url).origin, `${route} requested ${url}`).toBe(pageOrigin);
    }
  }
});
