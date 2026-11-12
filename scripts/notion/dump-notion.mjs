import { mkdir, writeFile } from 'node:fs/promises';

const BASE = 'https://melodious-pamphlet-85e.notion.site/api/v3';
const ROOT = '4107d106-c759-8094-84cb-d871fb73f8cb';
const OUT = new URL('../../.scratch/notion/', import.meta.url);

async function post(path, body) {
  const r = await fetch(`${BASE}/${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`${path} ${r.status}`);
  return r.json();
}

async function loadPage(pageId) {
  const blocks = {};
  const extra = {};
  let cursor = { stack: [] };
  for (let chunk = 0; chunk < 20; chunk++) {
    const j = await post('loadPageChunk', { pageId, limit: 500, cursor, chunkNumber: chunk, verticalColumns: false });
    Object.assign(blocks, j.recordMap.block ?? {});
    for (const k of ['collection', 'collection_view', 'custom_emoji']) {
      extra[k] = { ...(extra[k] ?? {}), ...(j.recordMap[k] ?? {}) };
    }
    if (!j.cursor?.stack?.length) break;
    cursor = j.cursor;
  }
  return { blocks, ...extra };
}

const val = (rec) => rec?.value?.value ?? rec?.value;
const text = (prop) => (prop ?? []).map((seg) => seg[0]).join('');

function richText(prop) {
  return (prop ?? [])
    .map(([t, fmt]) => {
      const link = fmt?.find((f) => f[0] === 'a');
      return link ? `[${t}](${link[1]})` : t;
    })
    .join('');
}

function render(blocks, id, depth = 0, lines = []) {
  const b = val(blocks[id]);
  if (!b) return lines;
  const pad = '  '.repeat(depth);
  const p = b.properties ?? {};
  const f = b.format ?? {};
  const src = p.source?.[0]?.[0] ?? f.display_source ?? '';
  const label = richText(p.title);
  const info = [b.type];
  if (src) info.push(`src=${src}`);
  if (p.link) info.push(`link=${text(p.link)}`);
  if (f.page_icon) info.push(`icon=${f.page_icon}`);
  lines.push(`${pad}- (${info.join(' ')}) ${label}`);
  if (depth === 0 || b.type !== 'page') {
    for (const c of b.content ?? []) render(blocks, c, depth + 1, lines);
  }
  return lines;
}

async function queryCollection(collectionId, viewId) {
  const j = await post('queryCollection', {
    collection: { id: collectionId },
    collectionView: { id: viewId },
    loader: { type: 'reducer', reducers: { results: { type: 'results', limit: 200 } }, searchQuery: '', userTimeZone: 'America/Sao_Paulo' },
  });
  return j;
}

await mkdir(OUT, { recursive: true });

const root = await loadPage(ROOT);
await writeFile(new URL('root.json', OUT), JSON.stringify(root, null, 1));
await writeFile(new URL('root.md', OUT), render(root.blocks, ROOT).join('\n'));

const pageIds = new Set();
const collections = [];
for (const [id, rec] of Object.entries(root.blocks)) {
  const b = val(rec);
  if (b?.type === 'collection_view' || b?.type === 'collection_view_page') {
    const collectionId = b.collection_id ?? b.format?.collection_pointer?.id;
    for (const viewId of b.view_ids ?? []) collections.push({ block: id, collectionId, viewId });
  }
}

const collectionDump = {};
for (const c of collections) {
  try {
    const j = await queryCollection(c.collectionId, c.viewId);
    const ids = j.result?.reducerResults?.results?.blockIds ?? [];
    const coll = val(j.recordMap?.collection?.[c.collectionId]) ?? val(root.collection?.[c.collectionId]);
    const view = val(root.collection_view?.[c.viewId]);
    const schema = coll?.schema ?? {};
    const rows = ids.map((rid) => {
      const rb = val(j.recordMap.block[rid]);
      const props = {};
      for (const [k, v] of Object.entries(rb?.properties ?? {})) props[schema[k]?.name ?? k] = text(v);
      pageIds.add(rid);
      return { id: rid, cover: rb?.format?.page_cover, icon: rb?.format?.page_icon, props };
    });
    collectionDump[`${coll?.name ? text(coll.name) : c.collectionId} / ${view?.name ?? c.viewId}`] = {
      ...c,
      viewType: view?.type,
      schema: Object.fromEntries(Object.entries(schema).map(([k, s]) => [s.name, { type: s.type, options: s.options?.map((o) => o.value) }])),
      rows,
    };
  } catch (e) {
    collectionDump[c.viewId] = { error: String(e) };
  }
}
await writeFile(new URL('collections.json', OUT), JSON.stringify(collectionDump, null, 1));

await mkdir(new URL('pages/', OUT), { recursive: true });
for (const pid of pageIds) {
  const page = await loadPage(pid);
  const title = text(val(page.blocks[pid])?.properties?.title) || pid;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  await writeFile(new URL(`pages/${slug}.md`, OUT), render(page.blocks, pid).join('\n'));
  await writeFile(new URL(`pages/${slug}.json`, OUT), JSON.stringify(page, null, 1));
  console.log('page', slug);
}
console.log('collections', Object.keys(collectionDump));
