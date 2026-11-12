import manifest from '../../src/data/media-manifest.json' with { type: 'json' };
import { expect, test } from '../fixtures';

const MB = 1024 * 1024;

test('nenhuma página carrega iframe de terceiros antes do clique (R-13)', async ({ page }) => {
  for (const path of ['./', 'en/', 'projetos/molten-metal/', 'projetos/midnight-meow/']) {
    await page.goto(path);
    await expect(page.locator('iframe'), path).toHaveCount(0);
  }
});

test('só um som toca por vez (R-03, R-12)', async ({ page }) => {
  await page.goto('./#sounds');
  const cards = page.locator('#sounds [data-sound]');
  const first = cards.nth(0).locator('[data-sound-toggle]');
  const second = cards.nth(1).locator('[data-sound-toggle]');

  await first.click();
  await expect(first).toHaveAttribute('aria-pressed', 'true');
  await expect(first).toHaveAccessibleName(/^Pausar: /);

  await second.click();
  await expect(second).toHaveAttribute('aria-pressed', 'true');
  await expect(first).toHaveAttribute('aria-pressed', 'false');

  await second.click();
  await expect(second).toHaveAttribute('aria-pressed', 'false');
});

test('áudio que falha volta o card ao estado inicial e avisa', async ({ page }) => {
  await page.route('**/*.mp3', (route) => route.fulfill({ status: 404 }));
  await page.goto('./#sounds');
  const card = page.locator('#sounds [data-sound]').first();
  const toggle = card.locator('[data-sound-toggle]');

  await toggle.click();
  await expect(card.locator('[data-sound-time]')).toHaveText('não carregou');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
});

test('filtro do sound board mostra só a categoria escolhida', async ({ page }) => {
  await page.goto('./#sounds');
  const group = page.getByRole('group', { name: 'Filtrar sons por categoria' });
  await group.getByRole('button', { name: /^Voz/ }).click();
  const visible = page.locator('#sounds li[data-tags]:visible');
  await expect(visible.first()).toBeVisible();
  expect(
    await visible.evaluateAll((items) => items.every((i) => i.getAttribute('data-tags') === 'voice')),
  ).toBe(true);
});

test('fachada do YouTube só cria o iframe após o clique', async ({ page }) => {
  await page.goto('./#reel');
  await page.getByRole('button', { name: /^Reproduzir vídeo: Meu Portfólio/ }).click();
  await expect(page.locator('#reel iframe')).toHaveAttribute(
    'src',
    /youtube-nocookie\.com\/embed\/JByBcjKhWck/,
  );
});

test('sem JavaScript, cada som tem um <audio controls> de reserva (N-08)', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(test.info().project.use.baseURL + '#sounds');
  const fallback = page.locator('#sounds noscript');
  expect(await fallback.count()).toBeGreaterThan(10);
  expect(await fallback.first().innerHTML()).toContain('<audio controls');
  await context.close();
});

test('toda mídia do manifesto existe e respeita o limite de tamanho (N-02)', async ({ request }) => {
  const entries = [
    ...Object.values(manifest.audio).map((a) => ({ src: a.src, limit: 5 * MB })),
    ...Object.values(manifest.video).flatMap((v) => [
      { src: v.src, limit: 8 * MB },
      { src: v.poster, limit: 0.5 * MB },
    ]),
  ];
  for (const { src, limit } of entries) {
    const response = await request.head(src);
    expect(response.ok(), src).toBe(true);
    expect(Number(response.headers()['content-length']), src).toBeLessThanOrEqual(limit);
  }
});
