import { describe, expect, it } from 'vitest';
import { currentSection, primaryNav } from '../../src/lib/nav';

describe('primaryNav', () => {
  it('lists Experience, Projects, About in order with section hrefs', () => {
    expect(primaryNav.map(({ label, href }) => ({ label, href }))).toEqual([
      { label: 'Experience', href: '/experience/' },
      { label: 'Projects', href: '/projects/' },
      { label: 'About', href: '/about/' },
    ]);
  });
});

describe('currentSection', () => {
  it('nav marks current section for a section index', () => {
    expect(currentSection('/experience/')).toBe('/experience/');
    expect(currentSection('/projects/')).toBe('/projects/');
    expect(currentSection('/about/')).toBe('/about/');
  });

  it('nav marks current section for a project detail page', () => {
    expect(currentSection('/projects/some-slug/')).toBe('/projects/');
  });

  it('nav marks current section without a trailing slash', () => {
    expect(currentSection('/projects')).toBe('/projects/');
  });

  it('nav marks no section on the home page or a 404', () => {
    expect(currentSection('/')).toBeUndefined();
    expect(currentSection('/404')).toBeUndefined();
  });

  it('nav marks no section for a lookalike prefix', () => {
    expect(currentSection('/projectsx/')).toBeUndefined();
    expect(currentSection('/about-me/')).toBeUndefined();
  });
});
