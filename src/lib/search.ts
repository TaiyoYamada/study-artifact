/**
 * 検索の絞り込みとスコアリング。
 *
 * 日本語は分かち書きしないので、形態素解析を持ち込まず部分一致で引く。
 * 語をスペースで区切ると AND 検索になる。
 * 純粋関数だけにしてあるので、UI を通さず単体テストできる。
 */
import type { SearchEntry } from './types';

export interface Hit {
	entry: SearchEntry;
	score: number;
}

/** タイトルに出た語ほど強く効かせる。 */
const WEIGHT = {
	title: 12,
	tags: 6,
	slug: 4,
	text: 1
} as const;

export function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 1 語ぶんの得点。どこにも出てこなければ 0。 */
export function scoreTerm(entry: SearchEntry, term: string): number {
	if (entry.title.toLowerCase().includes(term)) return WEIGHT.title;
	if (entry.tags.join(' ').toLowerCase().includes(term)) return WEIGHT.tags;
	if (entry.slug.toLowerCase().includes(term)) return WEIGHT.slug;
	if (entry.text.toLowerCase().includes(term)) return WEIGHT.text;
	return 0;
}

/** 全語を含むノートだけを、得点の高い順に返す。 */
export function rank(entries: SearchEntry[], terms: string[], limit = 40): Hit[] {
	if (terms.length === 0) return [];

	const hits: Hit[] = [];
	for (const entry of entries) {
		let score = 0;
		let matchedAll = true;
		for (const term of terms) {
			const termScore = scoreTerm(entry, term);
			if (termScore === 0) {
				matchedAll = false;
				break;
			}
			score += termScore;
		}
		if (matchedAll) hits.push({ entry, score });
	}

	hits.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, 'ja'));
	return hits.slice(0, limit);
}

/**
 * 最初に見つかった語の周辺を切り出し、一致部分を <mark> で囲む。
 * 戻り値は HTML。元テキストは先にエスケープしてから <mark> だけを足す。
 */
export function snippet(text: string, terms: string[], radius = 45, length = 165): string {
	const lower = text.toLowerCase();

	let at = -1;
	for (const term of terms) {
		const found = lower.indexOf(term);
		if (found >= 0 && (at < 0 || found < at)) at = found;
	}
	if (at < 0) return escapeHtml(text.slice(0, 130));

	const from = Math.max(0, at - radius);
	const to = Math.min(text.length, from + length);
	const raw = (from > 0 ? '…' : '') + text.slice(from, to) + (to < text.length ? '…' : '');

	let out = escapeHtml(raw);
	for (const term of terms) {
		out = out.replace(new RegExp(`(${escapeRegExp(escapeHtml(term))})`, 'gi'), '<mark>$1</mark>');
	}
	return out;
}
