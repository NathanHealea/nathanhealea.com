import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const httpsUrl = z.url({ protocol: /^https$/ });

export const projectSchema = z.strictObject({
  title: z.string(),
  description: z.string(),
  tech: z.array(z.string()).default([]),
  github: httpsUrl.optional(),
  live: httpsUrl.optional(),
  featured: z.boolean().default(false),
  order: z.int().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: projectSchema,
});

export const collections = { projects };
