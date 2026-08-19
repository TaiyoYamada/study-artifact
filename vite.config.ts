import { defineConfig } from 'vitest/config';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// 全ルートを事前生成して静的配信する (Cloudflare Pages / Vercel にそのまま乗る)。
			adapter: adapter({ fallback: '404.html' }),

			prerender: {
				// notes/ に対応しないパスはビルド時に落とす
				handleHttpError: 'fail'
			},

			// {@html} で差し込む本文中のリンクは相対化の対象外なので、
			// サイト全体を絶対パスに揃えてコンポーネント側と食い違わせない。
			paths: { relative: false }
		})
	],
	server: {
		// notes/ は src/ の外にあるので、変更を拾えるよう監視対象に含める
		watch: { ignored: ['!**/notes/**'] }
	},
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
