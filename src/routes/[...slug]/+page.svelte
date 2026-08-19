<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	const note = $derived(data.note);

	const isDone = $derived(/読了|done|完了|read/i.test(note.status));
	const hasToc = $derived(note.toc.length > 1);

	let article = $state<HTMLElement | null>(null);
	let currentHeading = $state('');

	/**
	 * コードブロックのコピーボタン。ボタン自体は {@html} の中にあるので委譲で拾う。
	 * article に onclick を書くと非対話要素にハンドラを付けることになるため、
	 * 実際の対話要素 (<button>) はそのままに、購読だけを後付けする。
	 */
	$effect(() => {
		const root = article;
		if (!root) return;

		const onClick = (event: MouseEvent) => {
			const button = (event.target as HTMLElement).closest('.code-copy');
			if (!button) return;

			const code = button.parentElement?.querySelector('code');
			if (!code || !navigator.clipboard) return;

			navigator.clipboard.writeText(code.textContent ?? '').then(() => {
				button.textContent = 'コピーしました';
				button.classList.add('is-done');
				setTimeout(() => {
					button.textContent = 'コピー';
					button.classList.remove('is-done');
				}, 1600);
			});
		};

		root.addEventListener('click', onClick);
		return () => root.removeEventListener('click', onClick);
	});

	/**
	 * 目次の追従。IntersectionObserver は最後の見出しを通り過ぎた後に発火しないので、
	 * スクロール位置から直接いまの見出しを決める。
	 */
	$effect(() => {
		void note.slug;

		const scroller = document.getElementById('main');
		if (!scroller || !article) return;

		const headings = [
			...article.querySelectorAll<HTMLElement>('.prose h2[id], .prose h3[id], .prose h4[id]')
		];
		if (headings.length === 0) return;

		let queued = false;
		const update = () => {
			const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 8;
			if (atBottom) {
				currentHeading = headings.at(-1)!.id;
				return;
			}
			let found = headings[0]!.id;
			for (const heading of headings) {
				if (heading.getBoundingClientRect().top > 160) break;
				found = heading.id;
			}
			currentHeading = found;
		};

		const onScroll = () => {
			if (queued) return;
			queued = true;
			requestAnimationFrame(() => {
				queued = false;
				update();
			});
		};

		update();
		scroller.addEventListener('scroll', onScroll, { passive: true });
		return () => scroller.removeEventListener('scroll', onScroll);
	});
</script>

<svelte:head>
	<title>{note.slug ? `${note.title} — ` : ''}{data.site.title}</title>
	<meta name="description" content={note.summary || data.site.description} />
</svelte:head>

<article class="doc" class:has-toc={hasToc} id="doc" bind:this={article}>
	<div class="sheet">
		{#if note.breadcrumb.length}
			<nav class="crumbs" aria-label="現在位置">
				{#each note.breadcrumb as crumb, index (crumb.slug)}
					{#if index > 0}<span class="sep">/</span>{/if}
					<a href={resolve('/[...slug]', { slug: crumb.slug })}>{crumb.title}</a>
				{/each}
			</nav>
		{/if}

		<header class="doc-head">
			<h1>{note.title}</h1>

			{#if note.summary}
				<p class="doc-summary">{note.summary}</p>
			{/if}

			{#if note.status || note.date || note.cite || note.source || note.tags.length}
				<div class="doc-meta">
					{#if note.status}
						<span class="chip chip-status-{isDone ? 'done' : 'wip'}">{note.status}</span>
					{/if}
					{#if note.date}<span class="chip chip-date">{note.date}</span>{/if}
					{#if note.cite}<span class="chip">{note.cite}</span>{/if}
					{#if note.source}<span class="chip chip-src">{note.source}</span>{/if}
					{#each note.tags as tag (tag)}
						<span class="chip chip-tag">{tag}</span>
					{/each}
				</div>
			{/if}
		</header>

		<!-- 本文はリポジトリ内の Markdown をビルド時に変換したもので、外部入力を含まない。
		     コード・インライン HTML は $lib/server/markdown でエスケープ済み。 -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<div class="prose">{@html note.html}</div>

		{#if data.children.length}
			<div class="children">
				<p class="children-head">この階層のノート</p>
				{#each data.children as child (child.slug)}
					{#if child.linkable}
						<a class="child" href={resolve('/[...slug]', { slug: child.slug })}>
							<span class="child-name">{child.title}</span>
							{#if child.count}<span class="child-kind">{child.count} notes</span>{/if}
						</a>
					{:else}
						<div class="child">
							<span class="child-name">{child.title}</span>
							{#if child.count}<span class="child-kind">{child.count} notes</span>{/if}
						</div>
					{/if}
				{/each}
			</div>
		{/if}

		{#if data.previous || data.next}
			<nav class="pager" aria-label="前後のノート">
				{#if data.previous}
					<a class="prev" href={resolve('/[...slug]', { slug: data.previous.slug })}>
						<span class="dir">← 前</span>
						<span class="name">{data.previous.title}</span>
					</a>
				{/if}
				{#if data.next}
					<a class="next" href={resolve('/[...slug]', { slug: data.next.slug })}>
						<span class="dir">次 →</span>
						<span class="name">{data.next.title}</span>
					</a>
				{/if}
			</nav>
		{/if}
	</div>

	{#if hasToc}
		<aside class="toc">
			<p class="toc-head">目次</p>
			<ul>
				{#each note.toc as heading (heading.id)}
					<li>
						<a
							class="lv{heading.level}"
							class:is-current={heading.id === currentHeading}
							href="#{heading.id}"
						>
							{heading.text}
						</a>
					</li>
				{/each}
			</ul>
		</aside>
	{/if}
</article>
