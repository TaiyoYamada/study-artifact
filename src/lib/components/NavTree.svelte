<script lang="ts">
	import { resolve } from '$app/paths';
	import { domainHue } from '$lib/domains';
	import type { NavNode } from '$lib/types';
	import Self from './NavTree.svelte';

	interface Props {
		nodes: NavNode[];
		currentSlug: string;
		depth?: number;
	}

	const { nodes, currentSlug, depth = 0 }: Props = $props();

	// 開閉は <details> に任せる。JavaScript が無くてもツリーを辿れる。
	// いま開いているノートの祖先は最初から開いておく。
	const onPath = (slug: string) => currentSlug === slug || currentSlug.startsWith(`${slug}/`);
</script>

<ul>
	{#each nodes as node (node.slug)}
		{@const active = node.slug === currentSlug}
		<!-- 最上位の枝にだけ分野色を下ろす。木のどこにいるかの手がかりになる。 -->
		<li style={depth === 0 ? `--domain-h: ${domainHue(node.slug)}` : undefined}>
			{#if node.kind === 'note'}
				<div class="row" class:is-active={active}>
					<a
						href={resolve('/[...slug]', { slug: node.slug })}
						aria-current={active ? 'page' : undefined}
						class:is-draft={node.status === '未執筆'}
					>
						{node.title}
					</a>
				</div>
			{:else if node.children.length === 0}
				<!--
					現在地から遠いので中身は落としてある。入口だけ置き、
					たどればその階層のページで続きが見られる。
				-->
				<div class="row is-section" class:is-active={active}>
					{#if node.hasPage}
						<a
							href={resolve('/[...slug]', { slug: node.slug })}
							aria-current={active ? 'page' : undefined}
						>
							{node.title}
						</a>
					{:else}
						<span class="label">{node.title}</span>
					{/if}
					{#if node.count}
						<span class="row-count">{node.count}</span>
					{/if}
				</div>
			{:else}
				<details open={onPath(node.slug) || depth === 0}>
					<summary class="row is-section" class:is-active={active}>
						{#if node.hasPage}
							<a
								href={resolve('/[...slug]', { slug: node.slug })}
								aria-current={active ? 'page' : undefined}
							>
								{node.title}
							</a>
						{:else}
							<span class="label">{node.title}</span>
						{/if}
					</summary>
					<Self nodes={node.children} {currentSlug} depth={depth + 1} />
				</details>
			{/if}
		</li>
	{/each}
</ul>
