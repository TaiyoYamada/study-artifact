import { expect, type Page } from '@playwright/test';

/**
 * 狭い画面ではサイドバーがドロワーになっているので開く。
 * 開閉は :target で行うため、JavaScript を切っていても同じ手順で通る。
 * 広い画面ではサイドバーが常に見えているので何もしない。
 */
export async function openSidebar(page: Page): Promise<void> {
	const opener = page.getByLabel('ノート一覧を開く');
	if (!(await opener.isVisible())) return;

	await opener.click();

	// toBeInViewport は端が数 px 見えただけで通ってしまい、まだ動いている要素を
	// 掴んでしまう。左端が 0 に着くまで待って、開ききったことを確かめる。
	await expect
		.poll(() => page.locator('#nav').evaluate((el) => Math.round(el.getBoundingClientRect().left)))
		.toBe(0);
}

/** ドロワーを閉じ、完全に画面外へ出るまで待つ。 */
export async function closeSidebar(page: Page): Promise<void> {
	await page.getByLabel('ノート一覧を閉じる').click();
	await expect
		.poll(() =>
			page.locator('#nav').evaluate((el) => {
				const box = el.getBoundingClientRect();
				return Math.round(box.right);
			})
		)
		.toBe(0);
}

/**
 * 検索欄に語を入れ、結果が確定するまで待つ。
 * サイドバーは呼び出し側であらかじめ開いておく。
 */
export async function searchFor(page: Page, query: string): Promise<void> {
	await page.getByRole('searchbox', { name: 'ノートを検索' }).fill(query);
	await page.locator('.results').waitFor({ state: 'visible' });
	// 「読み込み中…」が出ている間は結果が確定していない
	await expect(page.locator('.results-empty', { hasText: '読み込み中' })).toHaveCount(0);
}
