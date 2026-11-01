import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseFrontmatter } from '@astrojs/internal-helpers/frontmatter';
import { describe, expect, it } from 'vitest';
import { aboutSchema, experienceSchema, projectSchema } from '../../src/content.config';

const contentRoot = resolve(import.meta.dirname, '../../src/content');

const schemaByCollection = {
  experience: experienceSchema,
  projects: projectSchema,
  about: aboutSchema,
};

function readFrontmatter(relativePath: string): Record<string, unknown> {
  const source = readFileSync(join(contentRoot, relativePath), 'utf8');
  return parseFrontmatter(source).frontmatter;
}

function issuePaths(result: { success: boolean; error?: { issues: { path: PropertyKey[] }[] } }) {
  return (result.error?.issues ?? []).map((issue) => issue.path);
}

const validExperience = {
  company: 'Example Co',
  title: 'Engineer',
  location: 'Remote',
  start: '2022-03',
  end: '2023-01',
  highlights: ['Shipped a thing'],
  tech: ['TypeScript'],
};

const validProject = {
  title: 'Example Project',
  description: 'A project.',
  tech: ['Astro'],
  github: 'https://github.com/example/example',
  live: 'https://example.com',
  featured: true,
  order: 1,
};

const validAbout = {
  name: 'Example Person',
  headline: 'Engineer',
  tagline: 'Builds things.',
  location: 'Somewhere',
  social: [
    { label: 'GitHub', url: 'https://github.com/example' },
    { label: 'Email', url: 'mailto:someone@example.com' },
  ],
  skills: [{ group: 'Languages', items: ['TypeScript'] }],
  education: [{ school: 'Example University', credential: 'B.S.', year: 2014 }],
  resume: '/resume.pdf',
};

type SchemaDef = {
  type: string;
  shape?: Record<string, { _zod: { def: SchemaDef } }>;
  element?: { _zod: { def: SchemaDef } };
  innerType?: { _zod: { def: SchemaDef } };
  in?: { _zod: { def: SchemaDef } };
};

type FieldTree = { [key: string]: FieldTree | null };

const wrapperTypes = ['optional', 'default', 'prefault', 'nullable', 'readonly', 'catch'];

function fieldTree(schema: unknown): FieldTree | null {
  let def = (schema as { _zod: { def: SchemaDef } })._zod.def;
  for (;;) {
    if (wrapperTypes.includes(def.type) && def.innerType) def = def.innerType._zod.def;
    else if (def.type === 'pipe' && def.in) def = def.in._zod.def;
    else if (def.type === 'array' && def.element) def = def.element._zod.def;
    else break;
  }
  if (def.type !== 'object' || !def.shape) return null;
  return Object.fromEntries(Object.entries(def.shape).map(([key, value]) => [key, fieldTree(value)]));
}

describe('content schemas', () => {
  it('placeholder entries parse and get defaults', () => {
    const files = readdirSync(contentRoot, { recursive: true, encoding: 'utf8' })
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.split('\\').join('/'))
      .sort();

    expect(files).toEqual(
      expect.arrayContaining([
        'about/about.md',
        'experience/placeholder-current.md',
        'experience/placeholder-past.md',
        'projects/placeholder-alpha.md',
        'projects/placeholder-beta.md',
      ]),
    );

    for (const file of files) {
      const collection = file.split('/')[0] as keyof typeof schemaByCollection;
      const schema = schemaByCollection[collection];
      expect(schema, `no schema for ${file}`).toBeDefined();
      const result = schema.safeParse(readFrontmatter(file));
      expect(result.success, `${file}: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }

    const beta = projectSchema.parse(readFrontmatter('projects/placeholder-beta.md'));
    expect(beta.tech).toEqual([]);
    expect(beta.featured).toBe(false);
  });

  it('experience rejects end before start', () => {
    const result = experienceSchema.safeParse({ ...validExperience, start: '2023-05', end: '2023-01' });

    expect(result.success).toBe(false);
    expect(issuePaths(result)).toContainEqual(['end']);
  });

  it('schemas reject missing and mistyped fields', () => {
    expect(experienceSchema.safeParse(validExperience).success).toBe(true);
    expect(projectSchema.safeParse(validProject).success).toBe(true);
    expect(aboutSchema.safeParse(validAbout).success).toBe(true);

    const { company: _company, ...withoutCompany } = validExperience;
    const cases = [
      { name: 'missing company', schema: experienceSchema, input: withoutCompany, path: ['company'] },
      { name: 'empty highlights', schema: experienceSchema, input: { ...validExperience, highlights: [] }, path: ['highlights'] },
      { name: 'start as month name', schema: experienceSchema, input: { ...validExperience, start: 'Jan 2023' }, path: ['start'] },
      { name: 'start month 13', schema: experienceSchema, input: { ...validExperience, start: '2023-13' }, path: ['start'] },
      { name: 'github not a url', schema: projectSchema, input: { ...validProject, github: 'not-a-url' }, path: ['github'] },
      { name: 'github over http', schema: projectSchema, input: { ...validProject, github: 'http://github.com/example/example' }, path: ['github'] },
      { name: 'featured as string', schema: projectSchema, input: { ...validProject, featured: 'yes' }, path: ['featured'] },
      { name: 'fractional order', schema: projectSchema, input: { ...validProject, order: 1.5 }, path: ['order'] },
      { name: 'resume without leading slash', schema: aboutSchema, input: { ...validAbout, resume: 'resume.pdf' }, path: ['resume'] },
      {
        name: 'social javascript url',
        schema: aboutSchema,
        input: { ...validAbout, social: [{ label: 'Bad', url: 'javascript:alert(1)' }] },
        path: ['social', 0, 'url'],
      },
      {
        name: 'social http url',
        schema: aboutSchema,
        input: { ...validAbout, social: [{ label: 'Site', url: 'http://example.com' }] },
        path: ['social', 0, 'url'],
      },
      {
        name: 'skill group with no items',
        schema: aboutSchema,
        input: { ...validAbout, skills: [{ group: 'Languages', items: [] }] },
        path: ['skills', 0, 'items'],
      },
    ];

    for (const { name, schema, input, path } of cases) {
      const result = schema.safeParse(input);
      expect(result.success, name).toBe(false);
      expect(issuePaths(result), name).toContainEqual(path);
    }
  });

  it('schemas reject unknown fields', () => {
    const cases = [
      { schema: experienceSchema, input: { ...validExperience, hilights: ['typo'] }, key: 'hilights' },
      { schema: projectSchema, input: { ...validProject, slug: 'custom' }, key: 'slug' },
      { schema: aboutSchema, input: { ...validAbout, email: 'someone@example.com' }, key: 'email' },
    ];

    for (const { schema, input, key } of cases) {
      const result = schema.safeParse(input);
      expect(result.success, key).toBe(false);
      const unrecognized = result.error?.issues.find((issue) => issue.code === 'unrecognized_keys');
      expect(unrecognized, key).toMatchObject({ path: [], keys: [key] });
    }
  });

  it('schema fields match the allowlist', () => {
    expect(fieldTree(experienceSchema)).toEqual({
      company: null,
      title: null,
      location: null,
      start: null,
      end: null,
      highlights: null,
      tech: null,
    });
    expect(fieldTree(projectSchema)).toEqual({
      title: null,
      description: null,
      tech: null,
      github: null,
      live: null,
      featured: null,
      order: null,
    });
    expect(fieldTree(aboutSchema)).toEqual({
      name: null,
      headline: null,
      tagline: null,
      location: null,
      social: { label: null, url: null },
      skills: { group: null, items: null },
      education: { school: null, credential: null, year: null },
      resume: null,
    });
  });
});
