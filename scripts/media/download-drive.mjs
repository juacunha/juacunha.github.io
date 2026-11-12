// Baixa os arquivos públicos do Google Drive listados em docs/context/fontes/google-drive-arquivos.txt
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';

const LIST = new URL('../../docs/context/fontes/google-drive-arquivos.txt', import.meta.url);
const OUT = new URL('../../.scratch/drive/', import.meta.url);

await mkdir(OUT, { recursive: true });
const lines = (await readFile(LIST, 'utf8')).split(/\r?\n/).filter(Boolean);

for (const line of lines) {
  const [id, title] = line.split(' | ');
  const name = title.replace(/ - Google Drive$/, '').trim();
  const target = new URL(`${id}__${name}`, OUT);
  try {
    if ((await stat(target)).size > 0) {
      console.log('skip', name);
      continue;
    }
  } catch {
    // ainda não baixado
  }
  const res = await fetch(`https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`);
  const type = res.headers.get('content-type') ?? '';
  if (!res.ok || type.includes('text/html')) {
    console.error('FALHOU', name, res.status, type);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(target, buf);
  console.log('ok', name, (buf.length / 1048576).toFixed(1), 'MB');
}
