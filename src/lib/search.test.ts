import { describe, expect, it } from 'vitest';
import { rank, scoreTerm, snippet } from './search';
import type { SearchEntry } from './types';

function entry(overrides: Partial<SearchEntry> = {}): SearchEntry {
	return {
		slug: 'quantum-computing/vqa/spsa',
		title: 'SPSA の実装',
		path: '量子計算 / VQA',
		tags: ['最適化', 'NISQ'],
		text: '勾配が直接得られない問題で、2 回の評価だけで勾配を近似する。',
		...overrides
	};
}

describe('scoreTerm', () => {
	it('タイトル一致を本文一致より強く評価する', () => {
		expect(scoreTerm(entry(), 'spsa')).toBeGreaterThan(scoreTerm(entry(), '勾配'));
	});

	it('タグは本文より強く、タイトルより弱い', () => {
		const tagScore = scoreTerm(entry(), '最適化');

		expect(tagScore).toBeGreaterThan(scoreTerm(entry(), '勾配'));
		expect(tagScore).toBeLessThan(scoreTerm(entry(), 'spsa'));
	});

	it('どこにも無ければ 0', () => {
		expect(scoreTerm(entry(), 'まったく無い語')).toBe(0);
	});

	it('大文字小文字を区別しない', () => {
		expect(scoreTerm(entry({ title: 'SPSA' }), 'spsa')).toBeGreaterThan(0);
	});
});

describe('rank', () => {
	const entries = [
		entry({ slug: 'a', title: 'SPSA の実装', text: '勾配近似の話' }),
		entry({ slug: 'b', title: 'CMA-ES', tags: [], text: 'SPSA と比較した勾配フリー手法' }),
		entry({ slug: 'c', title: 'VQE', tags: [], text: '無関係な内容' })
	];

	it('語を含まないノートを落とす', () => {
		expect(rank(entries, ['spsa']).map((hit) => hit.entry.slug)).toEqual(['a', 'b']);
	});

	it('複数語は AND として扱う', () => {
		expect(rank(entries, ['spsa', '勾配']).map((hit) => hit.entry.slug)).toEqual(['a', 'b']);
		expect(rank(entries, ['spsa', 'まったく無い語'])).toEqual([]);
	});

	it('得点の高い順に並べる', () => {
		const [first] = rank(entries, ['spsa']);

		expect(first?.entry.slug).toBe('a'); // タイトル一致が本文一致に勝つ
	});

	it('語が無ければ何も返さない', () => {
		expect(rank(entries, [])).toEqual([]);
	});

	it('件数の上限を守る', () => {
		const many = Array.from({ length: 100 }, (_, i) => entry({ slug: `n${i}` }));

		expect(rank(many, ['spsa'], 40)).toHaveLength(40);
	});
});

describe('snippet', () => {
	it('一致部分を <mark> で囲む', () => {
		expect(snippet('勾配を近似する', ['勾配'])).toContain('<mark>勾配</mark>');
	});

	it('HTML をエスケープしてから mark を付ける', () => {
		const out = snippet('<script>alert(1)</script> を含む文', ['script']);

		expect(out).not.toContain('<script>');
		expect(out).toContain('&lt;');
		expect(out).toContain('<mark>');
	});

	it('mark で囲んだ部分以外にタグを混ぜない', () => {
		const out = snippet('a<b>c</b>d', ['c']);

		expect(out.replace(/<\/?mark>/g, '')).toBe('a&lt;b&gt;c&lt;/b&gt;d');
	});

	it('一致が見つからなければ先頭を返す', () => {
		const out = snippet('先頭から始まる本文', ['無い語']);

		expect(out).toBe('先頭から始まる本文');
	});

	it('長い本文では一致箇所の周辺を切り出す', () => {
		const text = `${'あ'.repeat(400)}目印${'い'.repeat(400)}`;
		const out = snippet(text, ['目印']);

		expect(out).toContain('<mark>目印</mark>');
		expect(out.startsWith('…')).toBe(true);
		expect(out.endsWith('…')).toBe(true);
		expect(out.length).toBeLessThan(text.length);
	});

	it('正規表現のメタ文字を含む語でも壊れない', () => {
		expect(() => snippet('a+b の話', ['a+b'])).not.toThrow();
		expect(snippet('a+b の話', ['a+b'])).toContain('<mark>a+b</mark>');
	});
});
