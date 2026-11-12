import { expect, test } from '../fixtures';

test('restos de template do Notion não aparecem no site', async ({ page }) => {
  for (const path of ['./', 'en/']) {
    await page.goto(path);
    const html = await page.content();
    for (const term of ['Scikit-learn', 'acurácia', 'p\\Ud', 'Fedral']) {
      expect(html, `${path}: ${term}`).not.toContain(term);
    }
  }
});

test('contato mostra e-mail, telefone e cidade (R-09)', async ({ page }) => {
  await page.goto('./#contact');
  const contact = page.locator('#contact');
  await expect(contact.getByRole('link', { name: 'juhaacunha@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:juhaacunha@gmail.com',
  );
  await expect(contact.getByRole('link', { name: '+55 53 99107-8829' })).toHaveAttribute(
    'href',
    'tel:+5553991078829',
  );
  await expect(contact).toContainText('Rio Grande, RS');
});

test('sons de curadoria ficam fora do sound board (R-17)', async ({ page }) => {
  await page.goto('./#sounds');
  const board = page.locator('#sounds');
  await expect(board).not.toContainText('Lançador de petiscos');
  await expect(board).toContainText('Martelada perfeita');
});

test('Midnight Meow mostra as camadas de tensão da trilha adaptativa (R-11)', async ({ page }) => {
  await page.goto('projetos/midnight-meow/');
  const stems = page.getByRole('region', { name: /camadas de tensão/ });
  await expect(stems.locator('[data-sound]')).toHaveCount(7);
});

test('créditos de equipe aparecem nos projetos coletivos (R-17)', async ({ page }) => {
  await page.goto('projetos/molten-metal/');
  const team = page.getByRole('region', { name: 'Equipe' });
  for (const name of ['mad', 'Monorelh4', 'Pedro Caurio', '0utro', 'Ito', 'Juliana Acunha']) {
    await expect(team).toContainText(name);
  }
});
