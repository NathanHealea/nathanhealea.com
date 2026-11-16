import { expect, test, type Page } from '@playwright/test';

const ROUTES = ['/', '/experience/', '/projects/', '/404'];
const LIGHT_BG = 'rgb(251, 251, 250)';
const DARK_BG = 'rgb(11, 12, 14)';

function bodyBackground(page: Page): Promise<string> {
  return page.locator('body').evaluate((element) => getComputedStyle(element).backgroundColor);
}

test.describe('with a dark system scheme', () => {
  test.use({ colorScheme: 'dark' });

  test('follows the system scheme', async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route);
      expect(await bodyBackground(page), route).toBe(DARK_BG);
    }
  });
});

test.describe('with a light system scheme', () => {
  test.use({ colorScheme: 'light' });

  test('follows the system scheme', async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route);
      expect(await bodyBackground(page), route).toBe(LIGHT_BG);
    }
  });

  test('toggle switches, renames and persists', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const toggle = page.locator('header button[data-theme-toggle]');

    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAccessibleName('Switch to dark theme');

    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(html).toHaveAttribute('data-theme', 'dark');
    await expect(toggle).toHaveAccessibleName('Switch to light theme');
    expect(await bodyBackground(page)).toBe(DARK_BG);

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'dark');
    await expect(toggle).toHaveAccessibleName('Switch to light theme');
    expect(await bodyBackground(page)).toBe(DARK_BG);

    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(html).toHaveAttribute('data-theme', 'light');
    await expect(toggle).toHaveAccessibleName('Switch to dark theme');

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'light');
    expect(await bodyBackground(page)).toBe(LIGHT_BG);
  });

  test('toggle works when storage throws', async ({ page }) => {
    const errors: Error[] = [];
    page.on('pageerror', (error) => errors.push(error));
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() {
          throw new DOMException('Storage is disabled', 'SecurityError');
        },
      });
    });

    await page.goto('/');
    const toggle = page.locator('header button[data-theme-toggle]');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAccessibleName('Switch to dark theme');

    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(toggle).toHaveAccessibleName('Switch to light theme');
    expect(await bodyBackground(page)).toBe(DARK_BG);
    expect(errors).toEqual([]);
  });

  test('stored theme applies before paint', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('theme', 'dark'));
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        (window as unknown as { themeAtReady: string | null }).themeAtReady =
          document.documentElement.getAttribute('data-theme');
      });
    });

    await page.reload();
    const themeAtReady = await page.evaluate(() => (window as unknown as { themeAtReady: string | null }).themeAtReady);
    expect(themeAtReady).toBe('dark');

    const head = await page.evaluate(() => {
      const children = [...document.head.children];
      const firstStylesheet = children.findIndex(
        (element) => element.matches('link[rel="stylesheet"]') || element.tagName === 'STYLE',
      );
      const themeScript = children.findIndex(
        (element) =>
          element.tagName === 'SCRIPT' && !element.hasAttribute('src') && /localStorage/.test(element.textContent ?? ''),
      );
      return { firstStylesheet, themeScript };
    });
    expect(head.themeScript).toBeGreaterThanOrEqual(0);
    expect(head.firstStylesheet).toBeGreaterThan(head.themeScript);
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, colorScheme: 'dark' });

  test('no-JS follows system and hides toggle', async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route);
      expect(await bodyBackground(page), route).toBe(DARK_BG);

      const toggle = page.locator('header button[data-theme-toggle]');
      await expect(toggle, route).toHaveCount(1);
      await expect(toggle, route).toBeHidden();

      const stops = await page.locator('a, button').count();
      for (let index = 0; index < stops; index += 1) {
        await page.keyboard.press('Tab');
        const onToggle = await page.evaluate(() => document.activeElement?.hasAttribute('data-theme-toggle') ?? false);
        expect(onToggle, `${route} tab stop ${index + 1}`).toBe(false);
      }
    }
  });
});
