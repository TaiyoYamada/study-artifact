import { site } from '$lib/server/config';
import { loadNotes } from '$lib/server/notes';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	const { nav, notes } = loadNotes();
	return { nav, site, noteCount: notes.size };
};
