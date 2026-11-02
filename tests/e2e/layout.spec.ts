import { expect, test, type Locator } from '@playwright/test';
import { expectNoA11yViolations } from './helpers/a11y';

const LAYOUT_ROUTES = ['/'];

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

test.describe('with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('reduced motion disables transitions', async ({ page }) => {
    await page.goto('/');

    const targets = [page.locator('h1').first(), ...(await page.locator('nav a').all())];
    await expect(targets[0]).toBeAttached();
    for (const target of targets) {
      for (const duration of await motionDurations(target)) {
        expect(duration).toBe('0s');
      }
    }
  });
});

test.describe('without reduced motion', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('page heading animates when motion is allowed', async ({ page }) => {
    await page.goto('/');

    const animationDuration = await page
      .locator('h1')
      .first()
      .evaluate((element) => getComputedStyle(element).animationDuration);
    expect(animationDuration.split(',').some((value) => value.trim() !== '0s')).toBe(true);
  });
});

test('pack typefaces load from same origin', async ({ page }) => {
  const fontUrls: string[] = [];
  page.on('response', (response) => {
    if (response.request().resourceType() === 'font') fontUrls.push(response.url());
  });

  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const loadedFamilies = await page.evaluate(() =>
    [...document.fonts].filter((face) => face.status === 'loaded').map((face) => face.family),
  );
  const loaded = loadedFamilies.map(unquote);
  expect(loaded).toContain('Source Serif 4');
  expect(loaded).toContain('Public Sans');

  const headingFamily = await page.locator('h1').first().evaluate((element) => getComputedStyle(element).fontFamily);
  const bodyFamily = await page.locator('body').evaluate((element) => getComputedStyle(element).fontFamily);
  expect(unquote(headingFamily.split(',')[0])).toBe('Source Serif 4');
  expect(unquote(bodyFamily.split(',')[0])).toBe('Public Sans');

  const pageOrigin = new URL(page.url()).origin;
  expect(fontUrls.length).toBeGreaterThanOrEqual(2);
  for (const url of fontUrls) {
    expect(new URL(url).origin).toBe(pageOrigin);
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
});

test('no horizontal scroll at 320px and 1920px', async ({ page }) => {
  for (const width of [320, 1920]) {
    await page.setViewportSize({ width, height: 800 });
    for (const route of LAYOUT_ROUTES) {
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
      for (const link of navLinks) {
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
      const tabOrder = [page.getByRole('link', { name: 'Nathan Healea', exact: true }), ...navLinks];
      for (const link of tabOrder) {
        await page.keyboard.press('Tab');
        await expect(link, route).toBeFocused();
      }
    }
  });
});
