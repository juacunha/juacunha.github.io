import { expect, test } from '../fixtures';

const PAGES = [
  { path: './', lang: 'pt-BR' },
  { path: 'en/', lang: 'en' },
  { path: 'projetos/molten-metal/', lang: 'pt-BR' },
  { path: 'projetos/midnight-meow/', lang: 'pt-BR' },
  { path: 'en/projects/purr-anormal/', lang: 'en' },
  { path: 'en/projects/feed-the-cats/', lang: 'en' },
  { path: 'projetos/the-symphonys-awakening/', lang: 'pt-BR' },
];

for (const { path, lang } of PAGES) {
  test.describe(`página ${path}`, () => {
    test('carrega com estrutura básica, sem erros e acessível', async ({
      page,
      consoleErrors,
      expectNoA11yViolations,
      expectNoHorizontalOverflow,
    }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main#conteudo')).toBeVisible();

      await expectNoHorizontalOverflow();
      await expectNoA11yViolations();
      expect(consoleErrors).toEqual([]);
    });
  });
}

test('skip link aparece ao receber foco e leva ao conteúdo', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Pular para o conteúdo' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await skip.press('Enter');
  await expect(page).toHaveURL(/#conteudo$/);
});

test('seletor de idioma leva à mesma página no outro idioma', async ({ page }) => {
  await page.goto('projetos/eco/');
  await page.getByRole('link', { name: 'Read this page in English' }).click();
  await expect(page).toHaveURL(/\/en\/projects\/eco\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('página 404 existe e não é indexada', async ({ page }) => {
  await page.goto('404.html');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('arquivos de máquina estão publicados', async ({ request }) => {
  const robots = await request.get('robots.txt');
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain('Sitemap:');

  const llms = await request.get('llms.txt');
  expect(llms.ok()).toBe(true);
  expect(await llms.text()).toContain('Game Sound Designer');

  const sitemap = await request.get('sitemap-index.xml');
  expect(sitemap.ok()).toBe(true);

  const cv = await request.head('cv/juliana-acunha.pdf');
  expect(cv.ok()).toBe(true);
});
