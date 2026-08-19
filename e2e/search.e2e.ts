import { expect, test } from '@playwright/test';
import { openSidebar, searchFor } from './helpers';

test('検索でノートを絞り込み、開ける', async ({ page }) => {
	await page.goto('/');
	await openSidebar(page);
	await searchFor(page, '探索と活用');

	const results = page.locator('.result');
	await expect(results.first()).toBeVisible();

	await results.first().click();
	await page.waitForURL((url) => decodeURIComponent(url.pathname).endsWith('/探索と活用'));
});

test('一致が無いときはその旨を出す', async ({ page }) => {
	await page.goto('/');
	await openSidebar(page);
	await searchFor(page, '該当しない語句xyz');

	await expect(page.locator('.results-empty')).toContainText('一致するノートはありません');
});

test('複数語は AND として扱う', async ({ page }) => {
	await page.goto('/');
	await openSidebar(page);

	await searchFor(page, '最適化');
	await expect(page.locator('.result').first()).toBeVisible();

	await searchFor(page, '最適化 該当しない語句xyz');
	await expect(page.locator('.result')).toHaveCount(0);
});

test('検索インデックスは初期表示では取りに行かない', async ({ page }) => {
	const requests: string[] = [];
	page.on('request', (request) => requests.push(request.url()));

	await page.goto('/');
	await page.waitForLoadState('networkidle');

	expect(requests.some((url) => url.includes('search-index.json'))).toBe(false);

	await openSidebar(page);
	await page.getByRole('searchbox', { name: 'ノートを検索' }).focus();
	await expect.poll(() => requests.some((url) => url.includes('search-index.json'))).toBe(true);
});

test('スラッシュキーで検索欄に飛べる', async ({ page, isMobile }) => {
	test.skip(isMobile, 'ハードウェアキーボードのある環境向けの操作');

	await page.goto('/');
	await page.keyboard.press('/');

	await expect(page.getByRole('searchbox', { name: 'ノートを検索' })).toBeFocused();
});
