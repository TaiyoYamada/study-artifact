<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import NavTree from '$lib/components/NavTree.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import SearchResults from '$lib/components/SearchResults.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { search } from '$lib/search.svelte';
	import '../temml.css';
	import '../app.css';

	const { data, children } = $props();

	const home = resolve('/');
	// /quantum-computing/vqa → quantum-computing/vqa
	const currentSlug = $derived(
		page.url.pathname.startsWith(home) ? page.url.pathname.slice(home.length) : ''
	);
	const currentTitle = $derived(page.data.note?.title ?? data.site.title);

	// ドロワーの開閉は :target だけで成立する (JavaScript 無しでも開ける) が、
	// クライアント遷移は pushState なので :target が更新されず開いたままになる。
	// そこでハイドレーション後だけ、ハッシュの実態に合わせてクラスで上書きする。
	// サーバー側の HTML にはどちらのクラスも付けないので、:target の経路を潰さない。
	// onMount はハイドレーション後にだけ走る。サーバー描画の HTML には
	// どちらのクラスも入らないので、:target による経路を潰さない。
	let hydrated = $state(false);
	onMount(() => {
		hydrated = true;
	});
	const drawerOpen = $derived(page.url.hash === '#nav');
</script>

<a class="skip" href="#doc">本文へスキップ</a>

<div class="app">
	<!--
		狭い画面ではドロワーになる。開閉は :target で行うので JavaScript を要さない。
		ノートへ移動すると URL からハッシュが外れ、自然に閉じる。
	-->
	<aside
		class="nav"
		id="nav"
		class:is-open={hydrated && drawerOpen}
		class:is-closed={hydrated && !drawerOpen}
	>
		<div class="nav-head">
			<a class="brand" href={home}>
				<span class="brand-title">{data.site.title}</span>
				<span class="brand-count">{data.noteCount} notes</span>
			</a>
			<SearchBox />
		</div>

		{#if search.active}
			<SearchResults />
		{:else}
			<nav class="tree" aria-label="ノート一覧">
				<NavTree nodes={data.nav.children} {currentSlug} />
			</nav>
		{/if}

		<div class="nav-foot">
			<span>{data.site.author}</span>
			<ThemeToggle />
		</div>
	</aside>

	<main class="main" id="main">
		<header class="topbar">
			<a class="icon-btn" href="#nav" aria-label="ノート一覧を開く">
				<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5.5h14M3 10h14M3 14.5h14" /></svg>
			</a>
			<span class="topbar-title">{currentTitle}</span>
		</header>

		{@render children()}
	</main>

	<a class="scrim" href="#top" aria-label="ノート一覧を閉じる">
		<span class="visually-hidden">ノート一覧を閉じる</span>
	</a>
</div>
