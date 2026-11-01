const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type Dated = { data: { start: string; end?: string } };
type Ordered = { data: { title: string; order?: number } };
type Featurable = { data: { title: string; order?: number; featured: boolean } };

export function sortExperience<T extends Dated>(entries: readonly T[]): T[] {
  return [...entries].sort((a, b) => {
    if (a.data.start !== b.data.start) return a.data.start < b.data.start ? 1 : -1;
    if (a.data.end === b.data.end) return 0;
    if (a.data.end === undefined) return -1;
    if (b.data.end === undefined) return 1;
    return a.data.end < b.data.end ? 1 : -1;
  });
}

export function sortProjects<T extends Ordered>(entries: readonly T[]): T[] {
  return [...entries].sort((a, b) => {
    const aOrder = a.data.order ?? Number.POSITIVE_INFINITY;
    const bOrder = b.data.order ?? Number.POSITIVE_INFINITY;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.data.title.localeCompare(b.data.title, 'en', { sensitivity: 'base' });
  });
}

export function selectFeatured<T extends Featurable>(entries: readonly T[]): T[] {
  return sortProjects(entries).filter((entry) => entry.data.featured);
}

export function selectSingleAbout<T>(entries: readonly T[]): T {
  if (entries.length !== 1) {
    throw new Error(`Expected exactly one entry in src/content/about/, found ${entries.length}`);
  }
  return entries[0];
}

// Parses YYYY-MM by hand: new Date('2022-03') is midnight UTC and reads as February west of Greenwich.
function formatMonth(yearMonth: string): string {
  const [year, month] = yearMonth.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

export function formatRange(start: string, end?: string): string {
  if (end === undefined) return `${formatMonth(start)} – Present`;
  if (end === start) return formatMonth(start);
  return `${formatMonth(start)} – ${formatMonth(end)}`;
}
