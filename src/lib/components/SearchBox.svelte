<script lang="ts">
	import { resolve } from '$app/paths';
	import { search } from '$lib/search.svelte';

	let input = $state<HTMLInputElement | null>(null);

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			search.move(1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			search.move(-1);
		} else if (event.key === 'Enter') {
			const hit = search.hits[search.cursor];
			if (!hit) return;
			event.preventDefault();
			window.location.href = resolve('/[...slug]', { slug: hit.entry.slug });
		} else if (event.key === 'Escape') {
			search.reset();
			input?.blur();
		}
	}

	// `/` と ⌘K / Ctrl+K で検索欄へ飛ぶ
	function onGlobalKeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement | null;
		const typing = target ? /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) : false;
		if ((event.key === '/' && !typing) || ((event.metaKey || event.ctrlKey) && event.key === 'k')) {
			event.preventDefault();
			input?.focus();
			input?.select();
		}
	}

	// 語が変われば選択位置は先頭へ戻す
	$effect(() => {
		void search.terms;
		search.cursor = 0;
	});
</script>

<svelte:window onkeydown={onGlobalKeydown} />

<div class="search">
	<input
		bind:this={input}
		bind:value={search.query}
		onfocus={() => search.load()}
		onkeydown={onKeydown}
		type="search"
		placeholder="検索"
		autocomplete="off"
		spellcheck="false"
		aria-label="ノートを検索"
	/>
	<kbd class="search-key">/</kbd>
</div>
