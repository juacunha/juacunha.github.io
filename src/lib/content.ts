import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export async function getProfile() {
  const entry = await getEntry('profile', 'juliana');
  if (!entry) throw new Error('profile.yaml sem a entrada "juliana"');
  return entry.data;
}

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getSorted<
  C extends 'experience' | 'education' | 'awards' | 'tools' | 'skills' | 'process',
>(collection: C) {
  const all = await getCollection(collection);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** SFX e vozes originais (sem curadoria) de todos os projetos, para o sound board. */
export function boardSounds(projects: Project[]) {
  return projects.flatMap((project) =>
    project.data.sfx.filter((s) => !s.curated).map((sound) => ({ ...sound, project })),
  );
}
