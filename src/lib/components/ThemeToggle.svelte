<script lang="ts">
	import { browser } from '$app/environment';

	const STORAGE_KEY = 'study-notes-theme';

	// 既定は OS 設定にまかせ、明示的に選んだときだけ data-theme で上書きする。
	// OS 設定と同じ側に戻したときは属性ごと外し、以後 OS に追従させる。
	function toggle() {
		if (!browser) return;

		const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const current =
			document.documentElement.getAttribute('data-theme') ?? (systemDark ? 'dark' : 'light');
		const next = current === 'dark' ? 'light' : 'dark';

		try {
			if (next === (systemDark ? 'dark' : 'light')) {
				document.documentElement.removeAttribute('data-theme');
				localStorage.removeItem(STORAGE_KEY);
			} else {
				document.documentElement.setAttribute('data-theme', next);
				localStorage.setItem(STORAGE_KEY, next);
			}
		} catch {
			// localStorage が使えなくても、その場の切り替えだけは効かせる
			document.documentElement.setAttribute('data-theme', next);
		}
	}
</script>

<button
	class="theme-btn"
	type="button"
	onclick={toggle}
	aria-label="テーマを切り替え"
	title="テーマを切り替え"
>
	<svg class="i-sun" viewBox="0 0 20 20" aria-hidden="true">
		<circle cx="10" cy="10" r="3.6" />
		<path
			d="M10 1.6v2.2M10 16.2v2.2M18.4 10h-2.2M3.8 10H1.6M15.9 4.1l-1.6 1.6M5.7 14.3l-1.6 1.6M15.9 15.9l-1.6-1.6M5.7 5.7L4.1 4.1"
		/>
	</svg>
	<svg class="i-moon" viewBox="0 0 20 20" aria-hidden="true">
		<path d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9z" />
	</svg>
</button>
