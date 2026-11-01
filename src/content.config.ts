import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const httpsUrl = z.url({ protocol: /^https$/ });
const SITE_ORIGIN = 'https://site.invalid';

// Compares origins instead of matching a pattern: URL parsing strips tabs and newlines, so /\t/host also escapes the site.
function isSitePath(value: string): boolean {
  return value.startsWith('/') && new URL(value, SITE_ORIGIN).origin === SITE_ORIGIN;
}

const text = z.string().trim().min(1);
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Expected YYYY-MM');

export const experienceSchema = z
  .strictObject({
    company: text,
    title: text,
    location: text,
    start: yearMonth,
    end: yearMonth.optional(),
    highlights: z.array(text).min(1),
    tech: z.array(text).default([]),
  })
  .superRefine((entry, ctx) => {
    if (entry.end !== undefined && entry.end < entry.start) {
      ctx.addIssue({ code: 'custom', path: ['end'], message: `end ${entry.end} is before start ${entry.start}` });
    }
  });

export const projectSchema = z.strictObject({
  title: text,
  description: text,
  tech: z.array(text).default([]),
  github: httpsUrl.optional(),
  live: httpsUrl.optional(),
  featured: z.boolean().default(false),
  order: z.int().optional(),
});

export const aboutSchema = z.strictObject({
  name: text,
  headline: text,
  tagline: text,
  location: text,
  social: z.array(z.strictObject({ label: text, url: z.url({ protocol: /^(https|mailto)$/ }) })),
  skills: z.array(z.strictObject({ group: text, items: z.array(text).min(1) })),
  education: z.array(z.strictObject({ school: text, credential: text, year: z.int().optional() })),
  resume: z.string().refine(isSitePath, 'Expected a site path such as /resume.pdf').optional(),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: experienceSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: projectSchema,
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: aboutSchema,
});

export const collections = { experience, projects, about };
