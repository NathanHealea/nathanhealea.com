export type Theme = 'light' | 'dark';

export function initialTheme(stored: string | null | undefined, systemDark: boolean): Theme {
	if (stored === 'light' || stored === 'dark') return stored;
	return systemDark ? 'dark' : 'light';
}

export function nextTheme(theme: Theme): Theme {
	return theme === 'dark' ? 'light' : 'dark';
}

export function themeToggleLabel(current: Theme): string {
	return `Switch to ${nextTheme(current)} theme`;
}
