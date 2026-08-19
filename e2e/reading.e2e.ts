import { expect, test, type Page } from '@playwright/test';
import { openSidebar } from './helpers';

const NOTE = '/最適化/最適化の基礎/探索と活用';

/** 日本語 slug は URL 上で percent-encode されるので、戻してから待つ。 */
const atPath = (page: Page, expected: string) =>
	page.waitForURL((url) => decodeURIComponent(url.pathname) === expected);

test('ホームが表示され、ツリーから階層を辿れる', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByRole('heading', { level: 1 })).toHaveText('知識ノート');

	await openSidebar(page);
	const tree = page.getByRole('navigation', { name: 'ノート一覧' });
	await expect(tree.getByRole('link', { name: '数学', exact: true })).toBeVisible();

	await tree.getByRole('link', { name: '最適化', exact: true }).click();
	await atPath(page, '/最適化');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('最適化');
});

test('ノートに本文・メタ情報・参考文献が出る', async ({ page }) => {
	await page.goto(NOTE);

	await expect(page).toHaveTitle(/探索と活用/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('探索と活用');
	await expect(page.locator('.chip-tag').first()).toBeVisible();

	// 出典を必ず置く方針なので、参考文献の節があること
	await expect(page.getByRole('heading', { name: '参考文献' })).toBeVisible();
});

test('数式がビルド時に MathML になっている', async ({ page }) => {
	await page.goto('/最適化/最適化の基礎/最適化問題');

	await expect(page.locator('.prose math').first()).toBeVisible();
});

test('パンくずで上の階層へ戻れる', async ({ page }) => {
	await page.goto(NOTE);

	await page
		.getByRole('navigation', { name: '現在位置' })
		.getByRole('link', { name: '最適化', exact: true })
		.click();

	await atPath(page, '/最適化');
});

test('階層のページに子ノートのカードが並ぶ', async ({ page }) => {
	await page.goto('/最適化/最適化の基礎');

	await expect(page.locator('.child')).toHaveCount(6);
});

test('節が子を持つ階層では進み具合の帯が出る', async ({ page }) => {
	await page.goto('/最適化');

	// 子が節のときだけ「書けた本数 / 全体」と帯を出す
	await expect(page.locator('.child-bar').first()).toBeVisible();
	await expect(page.locator('.child-count').first()).toContainText('/');
});

test('前後ナビで隣のノートへ移動できる', async ({ page }) => {
	await page.goto(NOTE);

	await page
		.getByRole('navigation', { name: '前後のノート' })
		.getByRole('link', { name: /前/ })
		.click();

	await atPath(page, '/最適化/最適化の基礎/凸最適化と非凸最適化');
});

test('見つからない URL は 404 になる', async ({ page }) => {
	const response = await page.goto('/does-not-exist');

	expect(response?.status()).toBe(404);
});
