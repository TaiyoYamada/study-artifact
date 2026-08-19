import { site } from '$lib/server/config';
import { loadNotes, pruneNav } from '$lib/server/notes';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
	const { nav, notes } = loadNotes();

	// url を読むことでページごとに再実行され、その現在地に合わせた木が返る。
	// 日本語 slug は pathname 上で percent-encode されているので戻す。
	const slug = decodeURIComponent(url.pathname).replace(/^\/+|\/+$/g, '');

	return { nav: pruneNav(nav, slug), site, noteCount: notes.size };
};
