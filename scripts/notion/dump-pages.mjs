import { mkdir, writeFile } from 'node:fs/promises';

const BASE = 'https://melodious-pamphlet-85e.notion.site/api/v3';
const val = (rec) => rec?.value?.value ?? rec?.value;
const text = (prop) => (prop ?? []).map((seg) => seg[0]).join('');
const rich = (prop) =>
  (prop ?? [])
    .map(([t, fmt]) => {
      const a = fmt?.find((f) => f[0] === 'a');
      return a ? `[${t}](${a[1]})` : t;
    })
    .join('');

async function post(path, body) {
  const r = await fetch(`${BASE}/${path}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`${path} ${r.status}`);
  return r.json();
}

async function loadAll(pageId) {
  const blocks = {};
  let cursor = { stack: [] };
  for (let chunk = 0; chunk < 20; chunk++) {
    const j = await post('loadPageChunk', { pageId, limit: 500, cursor, chunkNumber: chunk, verticalColumns: false });
    Object.assign(blocks, j.recordMap.block ?? {});
    if (!j.cursor?.stack?.length) break;
    cursor = j.cursor;
  }
  for (let round = 0; round < 6; round++) {
    const missing = new Set();
    for (const [id, rec] of Object.entries(blocks)) {
      const b = val(rec);
      if (!b || (b.type === 'page' && id !== pageId)) continue;
      for (const c of b.content ?? []) if (!blocks[c]) missing.add(c);
    }
    if (!missing.size) break;
    const j = await post('syncRecordValuesMain', { requests: [...missing].map((id) => ({ pointer: { table: 'block', id }, version: -1 })) });
    Object.assign(blocks, j.recordMap.block ?? {});
  }
  return blocks;
}

function render(blocks, id, root, depth = 0, lines = []) {
  const b = val(blocks[id]);
  if (!b) return lines;
  const p = b.properties ?? {};
  const f = b.format ?? {};
  const info = [b.type];
  const src = p.source?.[0]?.[0] ?? f.display_source;
  if (src) info.push(`src=${src}`);
  if (f.page_cover) info.push(`cover=${f.page_cover}`);
  lines.push(`${'  '.repeat(depth)}- (${info.join(' ')}) ${rich(p.title)}`);
  if (b.type !== 'page' || id === root) for (const c of b.content ?? []) render(blocks, c, root, depth + 1, lines);
  return lines;
}

const [dir, ...ids] = process.argv.slice(2);
const out = new URL(`../../.scratch/notion/${dir}/`, import.meta.url);
await mkdir(out, { recursive: true });
for (const id of ids) {
  const blocks = await loadAll(id);
  const page = val(blocks[id]);
  const title = text(page?.properties?.title) || id;
  const slug = title.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  const props = Object.entries(page?.properties ?? {}).filter(([k]) => k !== 'title').map(([k, v]) => `  ${k}: ${text(v)}`);
  await writeFile(new URL(`${slug}.md`, out), [...render(blocks, id, id), '', 'props:', ...props].join('\n'));
  await writeFile(new URL(`${slug}.json`, out), JSON.stringify(blocks, null, 1));
  console.log(slug);
}
