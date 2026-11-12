import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import manifest from './data/media-manifest.json';
import { deliverables, sfxCategories } from './lib/taxonomy';

const text = z.string().trim().min(1);
// strictObject: uma vírgula sem aspas em YAML inline vira chave extra e falha aqui, em vez de truncar o texto.
const localized = z.strictObject({ pt: text, en: text });
const localizedList = z
  .strictObject({ pt: z.array(text).min(1), en: z.array(text).min(1) })
  .refine((v) => v.pt.length === v.en.length, { error: 'pt e en precisam ter o mesmo número de itens' });
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'use AAAA-MM');
const youtubeId = z.string().regex(/^[\w-]{11}$/, 'id do YouTube com 11 caracteres');
const audioKey = text.refine((k) => k in manifest.audio, {
  error: (issue) =>
    `áudio "${String(issue.input)}" ausente em src/data/media-manifest.json (rode npm run media)`,
});
const videoKey = text.refine((k) => k in manifest.video, {
  error: (issue) =>
    `vídeo "${String(issue.input)}" ausente em src/data/media-manifest.json (rode npm run media)`,
});
/** Caminho relativo a src/assets/, resolvido em lib/images.ts. */
const imageKey = z.string().regex(/^[\w-]+(\/[\w.-]+)+\.(png|jpe?g|webp|svg)$/);

const profile = defineCollection({
  loader: file('src/content/profile.yaml'),
  schema: z.object({
    name: text,
    label: localized,
    tagline: localized,
    intro: localized,
    summary: localized,
    location: localized,
    email: z.email(),
    phone: z.object({ display: text, href: z.string().regex(/^\+\d{10,15}$/) }),
    reel: youtubeId,
    cv: text,
    opportunities: localizedList,
    profiles: z.array(z.object({ network: text, label: text, url: z.url() })).min(1),
    languages: z.array(z.object({ name: localized, level: localized })).min(1),
  }),
});

const experience = defineCollection({
  loader: file('src/content/experience.yaml'),
  schema: z.object({
    order: z.number().int(),
    organization: text,
    position: localized,
    location: localized,
    startDate: yearMonth,
    endDate: yearMonth.optional(),
    summary: localized.optional(),
  }),
});

const education = defineCollection({
  loader: file('src/content/education.yaml'),
  schema: z.object({
    order: z.number().int(),
    kind: z.enum(['degree', 'certificate']),
    institution: text.optional(),
    title: localized,
    detail: localized.optional(),
    startDate: yearMonth.optional(),
    inProgress: z.boolean().default(false),
  }),
});

const awards = defineCollection({
  loader: file('src/content/awards.yaml'),
  schema: z.object({
    order: z.number().int(),
    title: localized,
    edition: text,
    stage: localized,
    project: reference('projects').optional(),
    image: imageKey,
    imageAlt: localized,
    highlight: z.boolean().default(false),
  }),
});

const tools = defineCollection({
  loader: file('src/content/tools.yaml'),
  schema: z.object({
    order: z.number().int(),
    group: localized,
    items: z.array(text).min(1),
  }),
});

const skills = defineCollection({
  loader: file('src/content/skills.yaml'),
  schema: z.object({
    order: z.number().int(),
    kind: z.enum(['hard', 'soft']),
    title: localized,
    text: localized,
  }),
});

const process = defineCollection({
  loader: file('src/content/process.yaml'),
  schema: z.object({
    order: z.number().int(),
    video: videoKey,
    title: localized,
    project: reference('projects').optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
  schema: z.object({
    title: text,
    altTitle: localized.optional(),
    hook: localized,
    synopsis: localized,
    genre: localized.optional(),
    engine: z.enum(['Unity', 'Godot', 'Pyxel']),
    context: localized,
    studio: z.enum(['casulo-indie', 'ufpel', 'furg', 'jam', 'solo']).optional(),
    year: z.number().int().min(2020).optional(),
    status: z.enum(['released', 'in-development', 'prototype', 'on-hold']),
    deliverables: z.array(z.enum(deliverables)).min(1),
    role: localized,
    soundNotes: localizedList.optional(),
    team: z.array(z.object({ name: text, role: localized.optional() })).default([]),
    noGenerativeAi: z.boolean().default(false),
    links: z
      .object({
        itch: z.url().optional(),
        soundcloud: z.url().optional(),
        playable: z.boolean().default(false),
      })
      .default({ playable: false }),
    cover: imageKey,
    coverAlt: localized,
    tracks: z
      .array(z.object({ audio: audioKey, title: localized, curated: z.boolean().default(false) }))
      .default([]),
    sfx: z
      .array(
        z.object({
          audio: audioKey,
          label: localized,
          category: z.enum(sfxCategories),
          curated: z.boolean().default(false),
        }),
      )
      .default([]),
    stems: z.array(z.object({ audio: audioKey, label: localized })).default([]),
    videos: z
      .array(
        z.object({
          kind: z.enum(['teaser', 'pitch', 'trailer', 'process']),
          title: localized,
          youtube: youtubeId.optional(),
          local: videoKey.optional(),
        }),
      )
      .default([]),
    gallery: z.array(z.object({ image: imageKey, alt: localized })).default([]),
    docs: z.array(z.object({ title: localized, file: text })).default([]),
    featured: z.boolean().default(false),
    order: z.number().int(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { profile, experience, education, awards, tools, skills, process, projects };
