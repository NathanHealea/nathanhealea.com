import { getCollection } from 'astro:content';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getAbout, getExperience, getFeaturedProjects, getProjects } from '../../src/lib/collections';

vi.mock('astro:content', () => ({ getCollection: vi.fn() }));

const mockedGetCollection = vi.mocked(getCollection);

function resolveCollection(entries: unknown[]) {
  mockedGetCollection.mockResolvedValue(entries as never);
}

function experienceEntry(id: string, start: string, end?: string) {
  return {
    id,
    collection: 'experience',
    data: { company: `Company ${id}`, title: 'Engineer', location: 'Remote', start, end, highlights: ['Did work'], tech: [] },
  };
}

function projectEntry(id: string, title: string, options: { order?: number; featured?: boolean } = {}) {
  return {
    id,
    collection: 'projects',
    data: { title, description: 'A project.', tech: [], featured: options.featured ?? false, order: options.order },
  };
}

function aboutEntry(id: string) {
  return {
    id,
    collection: 'about',
    data: { name: 'Test Person', headline: 'Engineer', tagline: 'Builds things', location: 'Nowhere', social: [], skills: [], education: [] },
  };
}

describe('get* helpers wire collections to selectors', () => {
  beforeEach(() => {
    mockedGetCollection.mockReset();
  });

  it('getExperience reads the experience collection and sorts it', async () => {
    resolveCollection([
      experienceEntry('older', '2021-01', '2022-12'),
      experienceEntry('ended', '2023-01', '2023-06'),
      experienceEntry('current', '2023-01'),
    ]);

    const result = await getExperience();

    expect(mockedGetCollection).toHaveBeenCalledWith('experience');
    expect(result.map((entry) => entry.id)).toEqual(['current', 'ended', 'older']);
  });

  it('getProjects reads the projects collection and sorts it', async () => {
    resolveCollection([
      projectEntry('second', 'Second', { order: 2 }),
      projectEntry('zeta', 'zeta'),
      projectEntry('first', 'First', { order: 1 }),
      projectEntry('alpha', 'Alpha'),
    ]);

    const result = await getProjects();

    expect(mockedGetCollection).toHaveBeenCalledWith('projects');
    expect(result.map((entry) => entry.id)).toEqual(['first', 'second', 'alpha', 'zeta']);
  });

  it('getFeaturedProjects reads the projects collection and keeps the featured subset in sort order', async () => {
    resolveCollection([
      projectEntry('second', 'Second', { order: 2, featured: true }),
      projectEntry('zeta', 'zeta', { featured: true }),
      projectEntry('first', 'First', { order: 1 }),
      projectEntry('alpha', 'Alpha', { featured: true }),
    ]);

    const result = await getFeaturedProjects();

    expect(mockedGetCollection).toHaveBeenCalledWith('projects');
    expect(result.map((entry) => entry.id)).toEqual(['second', 'alpha', 'zeta']);
  });

  it('getFeaturedProjects returns an empty array when none are featured', async () => {
    resolveCollection([projectEntry('first', 'First', { order: 1 }), projectEntry('alpha', 'Alpha')]);

    expect(await getFeaturedProjects()).toEqual([]);
  });

  it('getAbout reads the about collection and returns its single entry', async () => {
    const only = aboutEntry('profile');
    resolveCollection([only]);

    const result = await getAbout();

    expect(mockedGetCollection).toHaveBeenCalledWith('about');
    expect(result).toEqual(only);
  });

  it('getAbout throws naming src/content/about/ when the collection is empty', async () => {
    resolveCollection([]);

    await expect(getAbout()).rejects.toThrow('src/content/about/');
  });

  it('getAbout throws naming src/content/about/ when the collection has two entries', async () => {
    resolveCollection([aboutEntry('one'), aboutEntry('two')]);

    await expect(getAbout()).rejects.toThrow('src/content/about/');
  });
});
