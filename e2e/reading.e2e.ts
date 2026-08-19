import { expect, test } from '@playwright/test';
import { openSidebar } from './helpers';

const NOTE = '/quantum-computing/vqa/spsa-implementation';

test('ホームが表示され、ツリーから階層を辿れる', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Study Notes');

	await openSidebar(page);
	const tree = page.getByRole('navigation', { name: 'ノート一覧' });
	await expect(tree.getByRole('link', { name: '量子計算' })).toBeVisible();

	await tree.getByRole('link', { name: '変分量子アルゴリズム (VQA)' }).click();
	await expect(page).toHaveURL('/quantum-computing/vqa');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('変分量子アルゴリズム (VQA)');
});

test('ノートに本文・メタ情報・目次が出る', async ({ page }) => {
	await page.goto(NOTE);

	await expect(page).toHaveTitle(/Implementation of the Simultaneous Perturbation/);
	await expect(page.locator('.chip-status-done')).toHaveText('読了');
	await expect(page.locator('.chip-date')).toHaveText('2026-03-07');
	await expect(page.locator('.chip-tag').first()).toBeVisible();

	// 数式はビルド時に MathML へ落としてある
	await expect(page.locator('.prose math').first()).toBeVisible();
});

test('パンくずで上の階層へ戻れる', async ({ page }) => {
	await page.goto(NOTE);

	await page
		.getByRole('navigation', { name: '現在位置' })
		.getByRole('link', { name: '量子計算' })
		.click();

	await expect(page).toHaveURL('/quantum-computing');
});

test('前後ナビで隣のノートへ移動できる', async ({ page }) => {
	await page.goto(NOTE);

	await page
		.getByRole('navigation', { name: '前後のノート' })
		.getByRole('link', { name: /次/ })
		.click();

	await expect(page).toHaveURL('/quantum-computing/vqa/optimizer-benchmark');
});

test('見つからない URL は 404 になる', async ({ page }) => {
	const response = await page.goto('/does-not-exist');

	expect(response?.status()).toBe(404);
});
