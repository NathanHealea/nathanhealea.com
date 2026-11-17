import { describe, expect, it } from 'vitest';
import { initialTheme, nextTheme, themeToggleLabel } from '../../src/lib/theme';

describe('initialTheme', () => {
  it('initialTheme prefers stored over system', () => {
    expect(initialTheme('light', true)).toBe('light');
    expect(initialTheme('dark', false)).toBe('dark');
  });

  it('initialTheme falls back to system when nothing is stored', () => {
    expect(initialTheme(null, true)).toBe('dark');
    expect(initialTheme(null, false)).toBe('light');
    expect(initialTheme(undefined, true)).toBe('dark');
    expect(initialTheme(undefined, false)).toBe('light');
  });

  it('initialTheme ignores junk stored values', () => {
    for (const junk of ['', 'Dark', 'blue']) {
      expect(initialTheme(junk, true)).toBe('dark');
      expect(initialTheme(junk, false)).toBe('light');
    }
  });
});

describe('nextTheme', () => {
  it('nextTheme flips', () => {
    expect(nextTheme('light')).toBe('dark');
    expect(nextTheme('dark')).toBe('light');
  });
});

describe('themeToggleLabel', () => {
  it('names the theme the toggle switches to', () => {
    expect(themeToggleLabel('light')).toBe('Switch to dark theme');
    expect(themeToggleLabel('dark')).toBe('Switch to light theme');
  });
});
