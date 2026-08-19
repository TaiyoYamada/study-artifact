/**
 * 検索の状態。入力欄 (SearchBox) と結果一覧 (SearchResults) が
 * サイドバーの別々の場所に置かれるので、状態だけ切り出して共有する。
 * 絞り込みのロジック自体は $lib/search に純粋関数として置いてある。
 */
import { base } from '$app/paths';
import { rank, type Hit } from './search';
import type { SearchEntry } from './types';

class SearchState {
	query = $state('');
	entries = $state<SearchEntry[] | null>(null);
	failed = $state(false);
	cursor = $state(0);

	terms = $derived(this.query.trim().toLowerCase().split(/\s+/).filter(Boolean));
	active = $derived(this.terms.length > 0);
	hits = $derived<Hit[]>(this.entries && this.terms.length ? rank(this.entries, this.terms) : []);

	#request: Promise<void> | null = null;

	/** インデックスは検索欄に触れた時点で初めて取りに行く。初期表示の転送量に乗せない。 */
	load(): Promise<void> {
		this.#request ??= fetch(`${base}/search-index.json`)
			.then((response) => {
				if (!response.ok) throw new Error(`HTTP ${response.status}`);
				return response.json();
			})
			.then((data: SearchEntry[]) => {
				this.entries = data;
			})
			.catch(() => {
				this.failed = true;
			});
		return this.#request;
	}

	move(delta: number) {
		if (this.hits.length === 0) return;
		this.cursor = (this.cursor + delta + this.hits.length) % this.hits.length;
	}

	reset() {
		this.query = '';
		this.cursor = 0;
	}
}

export const search = new SearchState();
