<script lang="ts">
	import { resolve } from '$app/paths';
	import type { NavNode } from '$lib/types';
	import Self from './NavTree.svelte';

	interface Props {
		nodes: NavNode[];
		currentSlug: string;
		depth?: number;
	}

	const { nodes, currentSlug, depth = 0 }: Props = $props();

	// 開閉は <details> に任せる。JavaScript が無くてもツリーを辿れる。
	// 浅い階層と、いま開いているノートの祖先は最初から開いておく。
	const openByDefault = (slug: string) =>
		depth < 2 || currentSlug === slug || currentSlug.startsWith(`${slug}/`);
</script>

<ul>
	{#each nodes as node (node.slug)}
		<li>
			{#if node.kind === 'note' || node.children.length === 0}
				<div
					class="row"
					class:is-section={node.kind === 'section'}
					class:is-active={node.slug === currentSlug}
				>
					{#if node.kind === 'note' || node.hasPage}
						<a
							href={resolve('/[...slug]', { slug: node.slug })}
							aria-current={node.slug === currentSlug ? 'page' : undefined}
						>
							{node.title}
						</a>
					{:else}
						<span class="label">{node.title}</span>
					{/if}
				</div>
			{:else}
				<details open={openByDefault(node.slug)}>
					<summary class="row is-section" class:is-active={node.slug === currentSlug}>
						{#if node.hasPage}
							<a
								href={resolve('/[...slug]', { slug: node.slug })}
								aria-current={node.slug === currentSlug ? 'page' : undefined}
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
