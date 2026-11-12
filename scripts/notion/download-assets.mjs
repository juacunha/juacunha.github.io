import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';

const BASE = 'https://melodious-pamphlet-85e.notion.site/api/v3';
const SPACE = '3a9dc609-0979-47bb-a5f4-1cfcf4e4eff6';
const val = (rec) => rec?.value?.value ?? rec?.value;
const OUT = new URL('../../.scratch/assets/', import.meta.url);

const files = [];
async function collect(path) {
  const json = JSON.parse(await readFile(path));
  const blocks = json.blocks ?? json;
  for (const [id, rec] of Object.entries(blocks)) {
    const b = val(rec);
    if (!b) continue;
    const src = b.properties?.source?.[0]?.[0];
    if (src?.startsWith('attachment:')) files.push({ id, url: src, kind: b.type });
    const cover = b.format?.page_cover;
    if (cover?.startsWith('attachment:')) files.push({ id, url: cover, kind: 'cover' });
    for (const [k, v] of Object.entries(b.properties ?? {})) {
      for (const seg of v)
        for (const fmt of seg[1] ?? [])
          if (fmt[0] === 'a' && String(fmt[1]).startsWith('attachment:'))
            files.push({ id, url: fmt[1], kind: `prop-${k}` });
    }
  }
}

const root = new URL('../../.scratch/notion/', import.meta.url);
await collect(new URL('root.json', root));
for (const dir of ['pages', 'news', 'covers']) {
  for (const f of await readdir(new URL(`${dir}/`, root)))
    if (f.endsWith('.json')) await collect(new URL(`${dir}/${f}`, root));
}

const seen = new Set();
const unique = files.filter((f) => !seen.has(f.url) && seen.add(f.url));
console.log('files', unique.length);

const r = await fetch(`${BASE}/getSignedFileUrls`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    urls: unique.map((f) => ({ url: f.url, permissionRecord: { table: 'block', id: f.id, spaceId: SPACE } })),
  }),
});
const { signedUrls } = await r.json();

await mkdir(OUT, { recursive: true });
const manifest = [];
for (const [i, f] of unique.entries()) {
  const name = `${f.id.slice(0, 8)}-${decodeURIComponent(f.url.split(':').pop())}`;
  try {
    const res = await fetch(signedUrls[i]);
    if (!res.ok) throw new Error(String(res.status));
    await writeFile(new URL(name, OUT), Buffer.from(await res.arrayBuffer()));
    manifest.push({ ...f, file: name });
  } catch (e) {
    manifest.push({ ...f, error: String(e) });
  }
}
await writeFile(new URL('manifest.json', OUT), JSON.stringify(manifest, null, 1));
console.log('errors', manifest.filter((m) => m.error).length);
