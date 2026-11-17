import type { MarkdownHeading } from 'astro';

export interface TocEntry {
	slug: string;
	text: string;
}

export function headingsForToc(headings: readonly MarkdownHeading[]): TocEntry[] {
	const sections = headings.filter((heading) => heading.depth === 2).map(({ slug, text }) => ({ slug, text }));
	return sections.length >= 2 ? sections : [];
}
