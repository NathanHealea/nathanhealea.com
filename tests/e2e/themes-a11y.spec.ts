import { readdirSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { expectNoA11yViolations } from './helpers/a11y';

const PROJECT_ROUTES = readdirSync(resolve(import.meta.dirname, '../../src/content/projects'))
  .filter((file) => file.endsWith('.md'))
  .map((file) => `/projects/${basename(file, '.md')}/`);
const ROUTES = ['/', '/experience/', '/projects/', ...PROJECT_ROUTES, '/this-page-does-not-exist/'];

const THEMES = [
  { colorScheme: 'light', background: 'rgb(251, 251, 250)' },
  { colorScheme: 'dark', background: 'rgb(11, 12, 14)' },
] as const;

for (const { colorScheme, background } of THEMES) {
  test.describe(`${colorScheme} theme`, () => {
    test.use({ colorScheme });

    test('every route is accessible in both themes', async ({ page }) => {
      expect(PROJECT_ROUTES.length).toBeGreaterThan(0);
      for (const route of ROUTES) {
        await page.goto(route);
        const where = `${route} ${colorScheme}`;
        const bodyBackground = await page.locator('body').evaluate((element) => getComputedStyle(element).backgroundColor);
        expect(bodyBackground, where).toBe(background);
        await expectNoA11yViolations(page).catch((error: Error) => {
          throw new Error(`${where}: ${error.message}`);
        });
      }
    });
  });
}
