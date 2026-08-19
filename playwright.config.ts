import { defineConfig, devices } from '@playwright/test';

const CI = !!process.env.CI;

export default defineConfig({
	testDir: 'e2e',
	testMatch: '**/*.e2e.{ts,js}',
	fullyParallel: true,
	// CI で .only を置き忘れたまま通してしまわないように
	forbidOnly: CI,
	retries: CI ? 2 : 0,
	reporter: CI ? [['github'], ['html', { open: 'never' }]] : 'list',

	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry',
		// アニメーション中のクリックで揺れないように。CSS 側に reduced-motion 対応がある。
		reducedMotion: 'reduce'
	},

	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile', use: { ...devices['Pixel 7'] } }
	],

	// 事前生成の結果そのものを検証したいので、dev サーバーではなく build + preview を使う
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		reuseExistingServer: !CI,
		timeout: 120_000
	}
});
