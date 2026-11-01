import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

const WCAG_21_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

// axe-core 4.14 skips rules tagged `experimental` unless they are named, and
// these four carry WCAG 2.1 A/AA tags. Adding the `experimental` tag instead
// would also pull in experimental best-practice rules.
const EXPERIMENTAL_WCAG_RULES = ['css-orientation-lock', 'p-as-heading', 'table-fake-caption', 'td-has-header'];

export async function expectNoA11yViolations(page: Page): Promise<void> {
  const byTag = await new AxeBuilder({ page }).withTags(WCAG_21_AA_TAGS).analyze();
  const experimental = await new AxeBuilder({ page }).withRules(EXPERIMENTAL_WCAG_RULES).analyze();
  const violations = [...byTag.violations, ...experimental.violations];
  if (violations.length === 0) return;

  const lines = violations.map((violation) => {
    const targets = violation.nodes.map((node) => node.target.join(' ')).join(', ');
    return `- ${violation.id} (${violation.impact ?? 'unknown'}): ${violation.help}\n  targets: ${targets}`;
  });
  throw new Error(`${violations.length} accessibility violation(s):\n${lines.join('\n')}`);
}
