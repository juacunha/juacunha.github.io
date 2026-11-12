import { readFile, writeFile } from 'node:fs/promises';

const BASE = 'https://melodious-pamphlet-85e.notion.site/api/v3';
const val = (rec) => rec?.value?.value ?? rec?.value;
const text = (prop) => (prop ?? []).map((seg) => seg[0]).join('');

async function sync(table, ids) {
  const r = await fetch(`${BASE}/syncRecordValuesMain`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ requests: ids.map((id) => ({ pointer: { table, id }, version: -1 })) }),
  });
  if (!r.ok) throw new Error(`sync ${table} ${r.status} ${await r.text()}`);
  return (await r.json()).recordMap?.[table] ?? {};
}

const root = JSON.parse(await readFile(new URL('../../.scratch/notion/root.json', import.meta.url)));
const blocks = { ...root.blocks };

for (let round = 0; round < 6; round++) {
  const missing = new Set();
  for (const rec of Object.values(blocks)) {
    const b = val(rec);
    if (!b || b.type === 'page') continue;
    for (const c of b.content ?? []) if (!blocks[c]) missing.add(c);
  }
  if (!missing.size) break;
  Object.assign(blocks, await sync('block', [...missing]));
}

const automations = {};
for (const rec of Object.values(blocks)) {
  const b = val(rec);
  if (b?.type === 'button' && b.format?.automation_id) automations[b.id] = b.format.automation_id;
}
const autoRecs = await sync('automation', Object.values(automations));
const actionIds = Object.values(autoRecs).flatMap((r) => val(r)?.action_ids ?? []);
const actionRecs = actionIds.length ? await sync('automation_action', actionIds) : {};

function render(id, depth = 0, lines = []) {
  const b = val(blocks[id]);
  if (!b) return lines;
  const p = b.properties ?? {};
  const f = b.format ?? {};
  const info = [b.type];
  const src = p.source?.[0]?.[0] ?? f.display_source;
  if (src) info.push(`src=${src}`);
  if (b.type === 'button') info.push(`automation=${automations[b.id]}`);
  lines.push(`${'  '.repeat(depth)}- (${info.join(' ')}) ${text(p.title)}`);
  for (const c of b.content ?? []) render(c, depth + 1, lines);
  return lines;
}

const ROOT = '4107d106-c759-8094-84cb-d871fb73f8cb';
await writeFile(new URL('../../.scratch/notion/root-full.md', import.meta.url), render(ROOT).join('\n'));
await writeFile(
  new URL('../../.scratch/notion/automations.json', import.meta.url),
  JSON.stringify({ automations: Object.values(autoRecs).map(val), actions: Object.values(actionRecs).map(val) }, null, 1),
);

const extra = ['4147d106-c759-80f6-ac1b-cb03ac9950e1', '4147d106-c759-80fe-b6db-d001d6c2dc1a', '4147d106-c759-808f-960f-f04a44c39c08'];
const pages = await sync('block', extra);
const out = {};
for (const id of extra) {
  const b = val(pages[id]);
  const coll = val(Object.values(await sync('collection', [b.parent_id]))[0]);
  const schema = coll?.schema ?? {};
  out[text(b.properties.title)] = {
    cover: b.format?.page_cover,
    props: Object.fromEntries(Object.entries(b.properties).map(([k, v]) => [schema[k]?.name ?? k, text(v)])),
    collection: text(coll?.name),
  };
}
await writeFile(new URL('../../.scratch/notion/extra-projects.json', import.meta.url), JSON.stringify(out, null, 1));
console.log('ok', Object.keys(blocks).length);
