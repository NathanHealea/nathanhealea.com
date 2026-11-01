import { expect, test } from '@playwright/test';
import { expectNoA11yViolations } from './helpers/a11y';

test('axe helper reports violations', async ({ page }) => {
  await page.setContent('<img src="x.png">');

  const error = await expectNoA11yViolations(page).then(
    () => null,
    (thrown: unknown) => thrown,
  );

  expect(error).toBeInstanceOf(Error);
  const message = (error as Error).message;
  expect(message).toContain('image-alt');
  expect(message).toMatch(/\bimg\b/);
});

test('axe helper passes an accessible page', async ({ page }) => {
  await page.setContent(
    '<!doctype html><html lang="en"><head><title>Accessible page</title></head>' +
      '<body><main><h1>Hello</h1><p>Plain content.</p></main></body></html>',
  );

  await expect(expectNoA11yViolations(page)).resolves.toBeUndefined();
});

test('axe helper runs experimental WCAG rules', async ({ page }) => {
  await page.setContent(
    '<!doctype html><html lang="en"><head><title>Locked</title>' +
      '<style>@media screen and (orientation: portrait) { html { transform: rotate(90deg); } }</style>' +
      '</head><body><main><h1>Locked</h1></main></body></html>',
  );

  await expect(expectNoA11yViolations(page)).rejects.toThrow('css-orientation-lock');
});
