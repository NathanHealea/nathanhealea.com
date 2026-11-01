import { expect, test, type Page } from '@playwright/test';
import { expectNoA11yViolations } from './helpers/a11y';

async function helperError(page: Page): Promise<string> {
  const error = await expectNoA11yViolations(page).then(
    () => null,
    (thrown: unknown) => thrown,
  );
  expect(error).toBeInstanceOf(Error);
  return (error as Error).message;
}

function accessiblePage(body: string): string {
  return (
    '<!doctype html><html lang="en"><head><title>Fixture</title></head>' +
    `<body><main><h1>Fixture</h1>${body}</main></body></html>`
  );
}

test('axe helper reports violations', async ({ page }) => {
  await page.setContent('<img id="first" src="x.png"><img id="second" src="y.png">');

  const message = await helperError(page);
  expect(message).toContain('image-alt');
  expect(message).toContain('document-title');
  expect(message).toContain('html-has-lang');
  expect(message).toContain('#first');
  expect(message).toContain('#second');
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

const ruleFixtures = [
  { tag: 'wcag2aa', rule: 'color-contrast', body: '<p style="color: #bbb; background: #fff">Low contrast</p>' },
  { tag: 'wcag21a', rule: 'label-content-name-mismatch', body: '<button aria-label="Submit form">Send</button>' },
  { tag: 'wcag21aa', rule: 'autocomplete-valid', body: '<label>Name <input autocomplete="nonsense"></label>' },
  {
    tag: 'experimental',
    rule: 'td-has-header',
    body:
      '<table><caption>Scores</caption>' +
      '<tr><td>a</td><td>b</td><td>c</td><td>d</td></tr>'.repeat(4) +
      '</table>',
  },
];

for (const { tag, rule, body } of ruleFixtures) {
  test(`axe helper reports ${rule} (${tag})`, async ({ page }) => {
    await page.setContent(accessiblePage(body));

    expect(await helperError(page)).toContain(rule);
  });
}
