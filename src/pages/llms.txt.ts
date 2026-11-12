import type { APIRoute } from 'astro';
import { projectPath, url } from '../i18n';
import { formatYearMonth } from '../i18n/ui';
import { getProfile, getProjects, getSorted } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => new URL(url(path), site).href;
  const profile = await getProfile();
  const projects = await getProjects();
  const experience = await getSorted('experience');
  const awards = await getSorted('awards');

  const lines = [
    `# ${profile.name} — ${profile.label.en}`,
    '',
    `> ${profile.summary.en}`,
    '',
    `Location: ${profile.location.en}. Email: ${profile.email}. Resume: ${abs(profile.cv)}`,
    `Open to: ${profile.opportunities.en.join(', ')}.`,
    '',
    '## Awards',
    ...awards.map(
      (a) =>
        `- ${a.data.title.en} — ${a.data.edition} (${a.data.stage.en})${a.data.project ? `, ${a.data.project.id}` : ''}`,
    ),
    '',
    '## Experience',
    ...experience.map(
      (e) =>
        `- ${e.data.position.en}, ${e.data.organization} (${formatYearMonth(e.data.startDate, 'en')} – ${e.data.endDate ? formatYearMonth(e.data.endDate, 'en') : 'present'})`,
    ),
    '',
    '## Projects',
    ...projects.map((p) => `- [${p.data.title}](${abs(projectPath(p.id, 'en'))}): ${p.data.role.en}`),
    '',
    '## Links',
    ...profile.profiles.map((p) => `- ${p.network}: ${p.url}`),
    `- Português: ${abs('/')}`,
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
