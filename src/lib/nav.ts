export const primaryNav: ReadonlyArray<{ label: string; href: string }> = [
	{ label: 'Experience', href: '/experience/' },
	{ label: 'Projects', href: '/projects/' },
	{ label: 'About', href: '/about/' },
];

export function currentSection(pathname: string): string | undefined {
	const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
	return primaryNav.find((item) => path.startsWith(item.href))?.href;
}
