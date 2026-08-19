<script lang="ts">
	import { resolve } from '$app/paths';
	import { search } from '$lib/search.svelte';
	import { snippet } from '$lib/search';
</script>

<div class="results">
	{#if search.failed}
		<p class="results-empty">検索インデックスを読み込めませんでした。再読み込みしてください。</p>
	{:else if !search.entries}
		<p class="results-empty">読み込み中…</p>
	{:else if search.hits.length === 0}
		<p class="results-empty">「{search.query.trim()}」に一致するノートはありません。</p>
	{:else}
		{#each search.hits as hit, index (hit.entry.slug)}
			<a
				class="result"
				class:is-cursor={index === search.cursor}
				href={resolve('/[...slug]', { slug: hit.entry.slug })}
			>
				<span class="result-title">{hit.entry.title}</span>
				{#if hit.entry.path}
					<span class="result-path">{hit.entry.path}</span>
				{/if}
				<!-- snippet は本文をエスケープしたうえで <mark> だけを足して返す ($lib/search)。 -->
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<span class="result-snip">{@html snippet(hit.entry.text, search.terms)}</span>
			</a>
		{/each}
	{/if}
</div>
