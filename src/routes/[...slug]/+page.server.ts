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

	// その階層に何本あって、何本書けているか。未執筆が多いので進み具合を示す。
	const progress = (prefix: string) => {
		let total = 0;
		let written = 0;
		for (const [candidate, entry] of notes) {
			if (candidate !== prefix && !candidate.startsWith(`${prefix}/`)) continue;
			total++;
			if (entry.status !== '未執筆') written++;
		}
		return { total, written };
	};

	return {
		note,
		previous: brief(previousSlug),
		next: brief(nextSlug),
		children: children.map((child) => ({
			kind: child.kind,
			slug: child.slug,
			title: child.title,
			summary: notes.get(child.slug)?.summary ?? '',
			draft: (notes.get(child.slug)?.status ?? '') === '未執筆',
			linkable: child.kind === 'note' || child.hasPage,
			...progress(child.slug)
		}))
	};
};
