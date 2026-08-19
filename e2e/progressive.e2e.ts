import { expect, test } from '@playwright/test';
import { closeSidebar, openSidebar } from './helpers';

test.describe('JavaScript が無い環境', () => {
	test.use({ javaScriptEnabled: false });

	test('本文が読める', async ({ page }) => {
		await page.goto('/最適化/最適化の基礎/探索と活用');

		await expect(page.getByRole('heading', { level: 1 })).toHaveText('探索と活用');
		await expect(page.getByRole('heading', { name: '参考文献' })).toBeVisible();
	});

	test('数式が読める', async ({ page }) => {
		await page.goto('/最適化/最適化の基礎/最適化問題');

		await expect(page.locator('.prose math').first()).toBeVisible();
	});

	test('ツリーを辿ってノートへ行ける', async ({ page }) => {
		await page.goto('/');
		await openSidebar(page);

		await page
			.getByRole('navigation', { name: 'ノート一覧' })
			.getByRole('link', { name: '最適化', exact: true })
			.click();

		await page.waitForURL((url) => decodeURIComponent(url.pathname) === '/最適化');
	});

	test('階層の開閉が <details> だけで動く', async ({ page }) => {
		// ツリーは現在地の周辺だけを出すので、開閉できる枝があるページで確かめる
		await page.goto('/最適化');
		await openSidebar(page);

		const branch = page.locator('details').first();
		await expect(branch).toHaveAttribute('open', '');

		// リンク部分は移動用なので、キャレット側を押して開閉する
		await branch.locator('> summary').click({ position: { x: 8, y: 12 } });
		await expect(branch).not.toHaveAttribute('open', '');
	});
});

test.describe('ナビゲーションの刈り込み', () => {
	test('ホームでは分野だけを出す', async ({ page }) => {
		await page.goto('/');
		await openSidebar(page);

		const tree = page.getByRole('navigation', { name: 'ノート一覧' });
		// 500 本すべてを埋め込まない。トップレベルの分野だけが並ぶ。
		await expect(tree.locator('li')).toHaveCount(15);
	});

	test('階層に入るとその中身が開く', async ({ page }) => {
		await page.goto('/最適化/最適化の基礎');
		await openSidebar(page);

		const tree = page.getByRole('navigation', { name: 'ノート一覧' });
		await expect(tree.getByRole('link', { name: '探索と活用', exact: true })).toBeVisible();
		// 遠い分野の中身までは出さない
		await expect(tree.getByRole('link', { name: '線形代数', exact: true })).toHaveCount(0);
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
		await page.goto('/最適化');

		const tree = page.getByRole('navigation', { name: 'ノート一覧' });
		await expect(tree).not.toBeInViewport();

		await openSidebar(page);
		await expect(tree).toBeInViewport();

		await closeSidebar(page);
		await expect(tree).not.toBeInViewport();
	});

	test('ノートを開くとドロワーは閉じる', async ({ page }) => {
		await page.goto('/');
		await openSidebar(page);

		const tree = page.getByRole('navigation', { name: 'ノート一覧' });
		await tree.getByRole('link', { name: '最適化', exact: true }).click();

		await page.waitForURL((url) => decodeURIComponent(url.pathname) === '/最適化');
		await expect(tree).not.toBeInViewport();
	});
});
