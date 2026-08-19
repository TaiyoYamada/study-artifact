import { error } from '@sveltejs/kit';
import { loadNotes } from '$lib/server/notes';
import type { NavNode, NavSection } from '$lib/types';
import type { EntryGenerator, PageServerLoad } from './$types';

/** notes/ に存在する全ノートを事前生成の対象として申告する。 */
export const entries: EntryGenerator = () =>
	[...loadNotes().notes.keys()].map((slug) => ({ slug }));

/** ツリーの中から、その階層の直下にぶら下がる項目を探す。 */
function childrenOf(slug: string, node: NavNode): NavNode[] | null {
	if (node.kind !== 'section') return null;
	if (node.slug === slug) return node.children;
	for (const child of node.children) {
		const found = childrenOf(slug, child);
		if (found) return found;
	}
	return null;
}

function countNotes(node: NavNode): number {
	if (node.kind === 'note') return 1;
	return (node.hasPage ? 1 : 0) + node.children.reduce((sum, child) => sum + countNotes(child), 0);
}

export const load: PageServerLoad = ({ params }) => {
	const slug = params.slug.replace(/^\/+|\/+$/g, '');
	const { notes, nav, reading } = loadNotes();

	const note = notes.get(slug);
	if (!note) error(404, `ノートが見つかりません: /${slug}`);

	const position = reading.indexOf(slug);
	const previousSlug = position > 0 ? reading[position - 1] : undefined;
	const nextSlug =
		position >= 0 && position < reading.length - 1 ? reading[position + 1] : undefined;
	const brief = (target: string | undefined) => {
		const found = target === undefined ? undefined : notes.get(target);
		return found ? { slug: found.slug, title: found.title } : null;
	};

	const children = childrenOf(slug, nav as NavSection) ?? [];

	return {
		note,
		previous: brief(previousSlug),
		next: brief(nextSlug),
		children: children.map((child) => ({
			kind: child.kind,
			slug: child.slug,
			title: child.title,
			// セクションは中に何本あるかを添える。ノートは自分自身なので出さない。
			count: child.kind === 'section' ? countNotes(child) : 0,
			linkable: child.kind === 'note' || child.hasPage
		}))
	};
};
