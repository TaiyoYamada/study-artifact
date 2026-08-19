import { expect, test } from '@playwright/test';
import { closeSidebar, openSidebar } from './helpers';

test.describe('JavaScript が無い環境', () => {
	test.use({ javaScriptEnabled: false });

	test('本文が読める', async ({ page }) => {
		await page.goto('/quantum-computing/vqa/spsa-implementation');

		await expect(page.getByRole('heading', { level: 1 })).toContainText(
			'Implementation of the Simultaneous Perturbation'
		);
		await expect(page.locator('.prose math').first()).toBeVisible();
	});

	test('ツリーを辿ってノートへ行ける', async ({ page }) => {
		await page.goto('/');
		await openSidebar(page);

		await page
			.getByRole('navigation', { name: 'ノート一覧' })
			.getByRole('link', { name: '量子計算', exact: true })
			.click();

		await expect(page).toHaveURL('/quantum-computing');
	});

	test('階層の開閉が <details> だけで動く', async ({ page }) => {
		await page.goto('/');
		await openSidebar(page);

		const branch = page.locator('details').first();
		await expect(branch).toHaveAttribute('open', '');

		// リンク部分は移動用なので、キャレット側を押して開閉する
		await branch.locator('> summary').click({ position: { x: 8, y: 12 } });
		await expect(branch).not.toHaveAttribute('open', '');
	});
});

test.describe('テーマ', () => {
	test('切り替えると data-theme が入り、リロード後も保たれる', async ({ page }) => {
		await page.goto('/');
		await openSidebar(page);

		const before = await page.evaluate(() =>
			window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
		);
		await page.getByRole('button', { name: 'テーマを切り替え' }).click();

		const after = before === 'dark' ? 'light' : 'dark';
		await expect(page.locator('html')).toHaveAttribute('data-theme', after);

		await page.reload();
		await expect(page.locator('html')).toHaveAttribute('data-theme', after);
	});
});

test.describe('狭い画面', () => {
	test.use({ viewport: { width: 390, height: 780 } });

	test('サイドバーはドロワーとして開閉する', async ({ page }) => {
		await page.goto('/quantum-computing/vqa');

		const tree = page.getByRole('navigation', { name: 'ノート一覧' });
		await expect(tree).not.toBeInViewport();

		await openSidebar(page);
		await expect(tree).toBeInViewport();

		await closeSidebar(page);
		await expect(tree).not.toBeInViewport();
	});

	test('ノートを開くとドロワーは閉じる', async ({ page }) => {
		await page.goto('/');
		await page.getByLabel('ノート一覧を開く').click();

		const tree = page.getByRole('navigation', { name: 'ノート一覧' });
		await tree.getByRole('link', { name: '量子計算', exact: true }).click();

		await expect(page).toHaveURL('/quantum-computing');
		await expect(tree).not.toBeInViewport();
	});
});
