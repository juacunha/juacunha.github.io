// Capturas de página inteira em 390 px e 1280 px para revisão visual, salvas em .scratch/shots/.
// Uso: com `npm run preview` no ar, `node scripts/screens.mjs [caminho ...]`.
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const origin = process.env.ORIGIN ?? 'http://localhost:4322';
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/projetos/midnight-meow/'];
const viewports = [
  { name: '390', width: 390, height: 844 },
  { name: '1280', width: 1280, height: 800 },
];

await mkdir('.scratch/shots', { recursive: true });
const browser = await chromium.launch();
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of paths) {
    await page.goto(origin + path, { waitUntil: 'networkidle' });
    const height = await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      return document.body.scrollHeight;
    });
    await page.waitForLoadState('networkidle');
    const slug = path.replace(/^\/|\/$/g, '').replaceAll('/', '_') || 'home';
    const slice = vp.width < 600 ? 1800 : 1400;
    for (let y = 0, i = 1; y < height; y += slice, i++) {
      const file = `.scratch/shots/${slug}-${vp.name}-${i}.png`;
      await page.screenshot({
        path: file,
        fullPage: true,
        clip: { x: 0, y, width: vp.width, height: Math.min(slice, height - y) },
      });
      console.log(file);
    }
  }
  await page.close();
}
await browser.close();
