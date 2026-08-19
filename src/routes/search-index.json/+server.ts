import { json } from '@sveltejs/kit';
import { loadNotes } from '$lib/server/notes';
import type { RequestHandler } from './$types';

// 検索欄に最初に触れたときだけクライアントが取りに来る。
export const prerender = true;

export const GET: RequestHandler = () => json(loadNotes().search);
