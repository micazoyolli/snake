import { expect, test } from '@playwright/test';

test('loads, starts, pauses, resumes and accepts controls', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => {
    consoleErrors.push(error.message);
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Snake' })).toBeVisible();
  await expect(page.getByLabel('Tablero de Snake')).toBeVisible();

  await page.getByRole('button', { name: 'Fruta 2' }).click();
  await page.getByRole('button', { name: 'Color azul' }).click();
  await page.getByRole('button', { name: 'Play' }).click();

  await expect(page.getByRole('dialog')).toBeHidden();
  await page.keyboard.press('ArrowDown');
  await page.getByRole('button', { name: 'Pausar juego' }).click();
  await expect(page.getByRole('button', { name: 'Reanudar juego' })).toBeEnabled();
  await page.getByRole('button', { name: 'Reanudar juego' }).click();
  if ((page.viewportSize()?.width ?? 0) < 670) {
    await page.getByRole('button', { name: 'Mover derecha' }).click();
  } else {
    await page.keyboard.press('ArrowRight');
  }

  expect(consoleErrors).toEqual([]);
});
