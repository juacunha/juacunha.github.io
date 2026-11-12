// Gera a mídia publicada a partir das origens brutas (não versionadas).
// Áudio → public/media/audio/<projeto>/<id>.mp3 + picos/duração em src/data/media-manifest.json
// Vídeo → public/media/video/<grupo>/<id>.mp4 + pôster .jpg
// Também copia imagens para src/assets/, documentos para public/ e baixa miniaturas do YouTube.
// Uso: npm run media [-- --force]
import { spawn } from 'node:child_process';
import { copyFile, mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';
import { audio, docs, images, video, youtube } from './sources.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const sourceDirs = ['media-src', '.scratch/assets', '.scratch/drive'].map((d) => path.join(root, d));
const manifestPath = path.join(root, 'src/data/media-manifest.json');
const force = process.argv.includes('--force');
const PEAKS = 64;
const PEAK_RATE = 8000;

const sourceFiles = [];
for (const dir of sourceDirs) {
  if (!existsSync(dir)) continue;
  for (const name of await readdir(dir)) sourceFiles.push(path.join(dir, name));
}

function findSource(suffix) {
  const matches = sourceFiles.filter((f) => path.basename(f).endsWith(suffix));
  if (matches.length === 0) throw new Error(`origem não encontrada: ${suffix}`);
  if (matches.length > 1) throw new Error(`origem ambígua: ${suffix} → ${matches.join(', ')}`);
  return matches[0];
}

async function isFresh(out, src) {
  if (force || !existsSync(out)) return false;
  return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs;
}

function run(args, { capture = false } = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath, ['-hide_banner', '-y', ...args]);
    const chunks = [];
    let stderr = '';
    proc.stdout.on('data', (c) => capture && chunks.push(c));
    proc.stderr.on('data', (c) => (stderr += c));
    proc.on('error', reject);
    proc.on('close', (code) =>
      code === 0 || capture
        ? resolve({ stdout: Buffer.concat(chunks), stderr })
        : reject(new Error(`ffmpeg ${code}: ${stderr.slice(-800)}`)),
    );
  });
}

async function analyzeAudio(file) {
  const { stdout } = await run(['-i', file, '-ac', '1', '-ar', String(PEAK_RATE), '-f', 's16le', '-'], {
    capture: true,
  });
  const samples = new Int16Array(stdout.buffer, stdout.byteOffset, Math.floor(stdout.length / 2));
  const bucket = Math.max(1, Math.floor(samples.length / PEAKS));
  const raw = [];
  for (let i = 0; i < PEAKS; i++) {
    let max = 0;
    for (let j = i * bucket; j < Math.min((i + 1) * bucket, samples.length); j++) {
      const v = Math.abs(samples[j]);
      if (v > max) max = v;
    }
    raw.push(max);
  }
  const top = Math.max(...raw, 1);
  return {
    duration: Math.round((samples.length / PEAK_RATE) * 10) / 10,
    peaks: raw.map((v) => Math.round((v / top) * 100) / 100),
  };
}

async function probeVideo(file) {
  const { stderr } = await run(['-i', file], { capture: true });
  const d = stderr.match(/Duration: (\d+):(\d+):([\d.]+)/);
  const s = stderr.match(/Video: .*?, (\d{2,5})x(\d{2,5})/);
  return {
    duration: d ? Math.round((+d[1] * 3600 + +d[2] * 60 + +d[3]) * 10) / 10 : 0,
    width: s ? +s[1] : 0,
    height: s ? +s[2] : 0,
  };
}

/** Vários vídeos foram gravados na vertical e exportados em 16:9 com faixas pretas; recorta-as. */
async function detectCrop(file) {
  const { stderr } = await run(
    ['-ss', '1', '-i', file, '-t', '4', '-vf', 'cropdetect=24:2:0', '-f', 'null', '-'],
    {
      capture: true,
    },
  );
  const all = [...stderr.matchAll(/crop=(\d+):(\d+):(\d+):(\d+)/g)];
  if (!all.length) return undefined;
  const [, w, h, x, y] = all.at(-1).map(Number);
  const full = await probeVideo(file);
  return w < full.width * 0.95 || h < full.height * 0.95 ? `crop=${w}:${h}:${x}:${y}` : undefined;
}

const manifest = { audio: {}, video: {} };

for (const [project, entries] of Object.entries(audio)) {
  const outDir = path.join(root, 'public/media/audio', project);
  await mkdir(outDir, { recursive: true });
  for (const [id, suffix] of Object.entries(entries)) {
    const key = `${project}/${id}`;
    const src = findSource(suffix);
    const out = path.join(outDir, `${id}.mp3`);
    if (!(await isFresh(out, src))) {
      await run(['-i', src, '-vn', '-ac', '2', '-codec:a', 'libmp3lame', '-b:a', '160k', out]);
      console.log('áudio', key);
    }
    manifest.audio[key] = { src: `media/audio/${project}/${id}.mp3`, ...(await analyzeAudio(out)) };
  }
}

for (const [group, entries] of Object.entries(video)) {
  const outDir = path.join(root, 'public/media/video', group);
  await mkdir(outDir, { recursive: true });
  for (const [id, suffix] of Object.entries(entries)) {
    const key = `${group}/${id}`;
    const src = findSource(suffix);
    const out = path.join(outDir, `${id}.mp4`);
    const poster = path.join(outDir, `${id}.jpg`);
    if (!(await isFresh(out, src))) {
      const crop = await detectCrop(src);
      await run([
        '-i',
        src,
        '-vf',
        `${crop ? `${crop},` : ''}scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'`,
        '-c:v',
        'libx264',
        '-crf',
        '30',
        '-preset',
        'slow',
        '-pix_fmt',
        'yuv420p',
        '-c:a',
        'aac',
        '-b:a',
        '128k',
        '-movflags',
        '+faststart',
        out,
      ]);
      console.log('vídeo', key);
    }
    if (!(await isFresh(poster, out))) {
      await run(['-ss', '1', '-i', out, '-frames:v', '1', '-q:v', '5', poster]);
    }
    manifest.video[key] = {
      src: `media/video/${group}/${id}.mp4`,
      poster: `media/video/${group}/${id}.jpg`,
      ...(await probeVideo(out)),
    };
  }
}

for (const [dest, suffix] of Object.entries(images)) {
  const out = path.join(root, 'src/assets', dest);
  const src = findSource(suffix);
  if (await isFresh(out, src)) continue;
  await mkdir(path.dirname(out), { recursive: true });
  await copyFile(src, out);
  console.log('imagem', dest);
}

for (const [dest, suffix] of Object.entries(docs)) {
  const out = path.join(root, 'public', dest);
  const src = findSource(suffix);
  if (await isFresh(out, src)) continue;
  await mkdir(path.dirname(out), { recursive: true });
  await copyFile(src, out);
  console.log('documento', dest);
}

const ogOut = path.join(root, 'public/og.jpg');
const banner = findSource('banner-NboJ6VK.png');
if (!(await isFresh(ogOut, banner))) {
  await run(['-i', banner, '-vf', 'scale=-2:630,crop=1200:630', '-q:v', '4', ogOut]);
  console.log('og.jpg');
}

const ytDir = path.join(root, 'src/assets/youtube');
await mkdir(ytDir, { recursive: true });
for (const id of youtube) {
  const out = path.join(ytDir, `${id}.jpg`);
  if (existsSync(out) && !force) continue;
  let res = await fetch(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  if (!res.ok) res = await fetch(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
  if (!res.ok) throw new Error(`miniatura indisponível: ${id}`);
  await writeFile(out, Buffer.from(await res.arrayBuffer()));
  console.log('miniatura', id);
}

await mkdir(path.dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, JSON.stringify(manifest, null, 1) + '\n');
console.log(
  `manifesto: ${Object.keys(manifest.audio).length} áudios, ${Object.keys(manifest.video).length} vídeos`,
);
