import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

const WCAG_21_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

export async function expectNoA11yViolations(page: Page): Promise<void> {
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG_21_AA_TAGS).analyze();
  if (violations.length === 0) return;

  const lines = violations.map((violation) => {
    const targets = violation.nodes.map((node) => node.target.join(' ')).join(', ');
    return `- ${violation.id} (${violation.impact ?? 'unknown'}): ${violation.help}\n  targets: ${targets}`;
  });
  throw new Error(`${violations.length} accessibility violation(s):\n${lines.join('\n')}`);
}
