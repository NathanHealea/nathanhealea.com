import { expect, test } from '@playwright/test';
import { expectNoA11yViolations } from './helpers/a11y';

test('home page loads and is accessible', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('main')).toHaveCount(1);
  expect((await page.title()).trim()).not.toBe('');
  await expectNoA11yViolations(page);
});
