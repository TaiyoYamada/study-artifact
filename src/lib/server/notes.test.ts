import { describe, expect, it } from 'vitest';
import { loadNotes, pruneNav } from './notes';
import type { NavNode } from '$lib/types';

const { nav, notes, reading, search } = loadNotes();

function walk(node: NavNode, visit: (node: NavNode) => void): void {
	visit(node);
	if (node.kind === 'section') for (const child of node.children) walk(child, visit);
}

const allNodes: NavNode[] = [];
walk(nav, (node) => allNodes.push(node));

describe('階層の組み立て', () => {
	it('notes/ を読み込めている', () => {
		expect(notes.size).toBeGreaterThan(100);
	});

	it('ホーム (notes/index.md) が空 slug になる', () => {
		expect(notes.has('')).toBe(true);
		expect(notes.get('')?.title).toBeTruthy();
	});

	it('ディレクトリ構造がそのまま slug になる', () => {
		expect(notes.has('数学')).toBe(true);
		expect(notes.has('数学/線形代数')).toBe(true);
		expect(notes.has('数学/線形代数/固有値分解')).toBe(true);
		expect(notes.has('最適化/進化計算/CMA-ES/CMA-ESの基本')).toBe(true);
	});

	it('並び順プレフィックス (01-) を slug に残さない', () => {
		for (const slug of notes.keys()) {
			expect(slug).not.toMatch(/(^|\/)\d+[-_.]/);
		}
	});

	it('index.md はその階層自身のページになり、子として現れない', () => {
		for (const slug of notes.keys()) {
			expect(slug.endsWith('/index')).toBe(false);
			expect(slug).not.toBe('index');
		}
	});

	/**
	 * 同じ slug のファイルが 2 つあると、片方が黙って消える。
	 * 番号プレフィックスを振り直したときに起こしやすいので、明示的に防ぐ。
	 */
	it('slug が重複しない', () => {
		const counts = new Map<string, number>();
		for (const node of allNodes) {
			if (node.kind === 'note' || node.hasPage) {
				counts.set(node.slug, (counts.get(node.slug) ?? 0) + 1);
			}
		}
		const duplicated = [...counts].filter(([, n]) => n > 1).map(([slug]) => slug);

		expect(duplicated).toEqual([]);
	});

	it('frontmatter の title を採用する', () => {
		expect(notes.get('最適化')?.title).toBe('最適化');
		expect(notes.get('最適化/最適化の基礎/探索と活用')?.title).toBe('探索と活用');
	});

	it('本文先頭の h1 をタイトルに吸い上げ、本文からは外す', () => {
		for (const note of notes.values()) {
			expect(note.html).not.toContain('<h1');
		}
	});
});

describe('ナビゲーション', () => {
	it('ツリーに出る項目と、本文を持つノートが対応する', () => {
		for (const node of allNodes) {
			const linkable = node.kind === 'note' || node.hasPage;
			if (linkable) expect(notes.has(node.slug)).toBe(true);
		}
	});

	it('番号順に並べる', () => {
		const basics = allNodes.find((node) => node.slug === '最適化/最適化の基礎');

		expect(basics?.kind).toBe('section');
		expect(basics?.kind === 'section' && basics.children.map((child) => child.title)).toEqual([
			'最適化問題',
			'目的関数',
			'制約条件',
			'局所最適解と大域最適解',
			'凸最適化と非凸最適化',
			'探索と活用'
		]);
	});

	it('前後ナビの列に全ノートが 1 度ずつ現れる', () => {
		expect(new Set(reading).size).toBe(reading.length);
		expect(new Set(reading)).toEqual(new Set(notes.keys()));
	});

	it('前後ナビの列がホームから始まる', () => {
		expect(reading[0]).toBe('');
		expect(reading[1]).toBe('数学');
	});

	it('パンくずが自分の祖先だけを指す', () => {
		for (const note of notes.values()) {
			const expected = note.slug.split('/').slice(0, -1).filter(Boolean);

			expect(note.breadcrumb.map((crumb) => crumb.slug.split('/').at(-1))).toEqual(expected);
			for (const crumb of note.breadcrumb) {
				expect(note.slug.startsWith(`${crumb.slug}/`)).toBe(true);
			}
		}
	});
});

describe('ナビゲーションの刈り込み', () => {
	const pruned = pruneNav(nav, '最適化/進化計算/CMA-ES');

	function countNodes(node: NavNode): number {
		if (node.kind === 'note') return 1;
		return 1 + node.children.reduce((sum, child) => sum + countNodes(child), 0);
	}

	it('現在地までの道筋は残る', () => {
		const slugs: string[] = [];
		walk(pruned, (node) => slugs.push(node.slug));

		expect(slugs).toContain('最適化');
		expect(slugs).toContain('最適化/進化計算');
		expect(slugs).toContain('最適化/進化計算/CMA-ES');
		expect(slugs).toContain('最適化/進化計算/CMA-ES/CMA-ESの基本');
	});

	it('遠い枝は入口だけ残して中身を落とす', () => {
		const math = pruned.children.find((child) => child.slug === '数学');

		expect(math?.kind).toBe('section');
		expect(math?.kind === 'section' && math.children).toEqual([]);
		expect(math?.kind === 'section' && math.truncated).toBe(true);
		expect(math?.kind === 'section' && math.count).toBeGreaterThan(100);
	});

	it('全体を埋め込むより十分小さくなる', () => {
		expect(countNodes(pruned)).toBeLessThan(countNodes(nav) / 4);
	});

	it('トップレベルの分野はすべて残る', () => {
		expect(pruned.children.length).toBe(nav.children.length);
	});
});

describe('検索インデックス', () => {
	it('全ノートを含む', () => {
		expect(search.map((entry) => entry.slug).sort()).toEqual([...notes.keys()].sort());
	});

	it('本文はタグの無いテキストになっている', () => {
		for (const entry of search) {
			expect(entry.text).not.toContain('<');
		}
	});

	it('パンくずを表示用の文字列にしている', () => {
		const entry = search.find((e) => e.slug === '最適化/最適化の基礎/探索と活用');

		expect(entry?.path).toBe('最適化 / 最適化の基礎');
	});
});

describe('数式', () => {
	it('notes/ 全体で変換に失敗した数式が無い', () => {
		expect(loadNotes().mathErrors).toEqual([]);
	});
});
