import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const httpsUrl = z.url({ protocol: /^https$/ });
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Expected YYYY-MM');

export const experienceSchema = z
  .strictObject({
    company: z.string(),
    title: z.string(),
    location: z.string(),
    start: yearMonth,
    end: yearMonth.optional(),
    highlights: z.array(z.string()).min(1),
    tech: z.array(z.string()).default([]),
  })
  .superRefine((entry, ctx) => {
    if (entry.end !== undefined && entry.end < entry.start) {
      ctx.addIssue({ code: 'custom', path: ['end'], message: `end ${entry.end} is before start ${entry.start}` });
    }
  });

export const projectSchema = z.strictObject({
  title: z.string(),
  description: z.string(),
  tech: z.array(z.string()).default([]),
  github: httpsUrl.optional(),
  live: httpsUrl.optional(),
  featured: z.boolean().default(false),
  order: z.int().optional(),
});

export const aboutSchema = z.strictObject({
  name: z.string(),
  headline: z.string(),
  tagline: z.string(),
  location: z.string(),
  social: z.array(z.strictObject({ label: z.string(), url: z.url({ protocol: /^(https|mailto)$/ }) })),
  skills: z.array(z.strictObject({ group: z.string(), items: z.array(z.string()).min(1) })),
  education: z.array(z.strictObject({ school: z.string(), credential: z.string(), year: z.int().optional() })),
  resume: z.string().regex(/^\/(?![/\\])/, 'Expected a site path such as /resume.pdf').optional(),
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
