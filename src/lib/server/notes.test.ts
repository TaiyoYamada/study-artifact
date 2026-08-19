import { describe, expect, it } from 'vitest';
import { loadNotes } from './notes';
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
		expect(notes.size).toBeGreaterThan(0);
	});

	it('ホーム (notes/index.md) が空 slug になる', () => {
		expect(notes.has('')).toBe(true);
		expect(notes.get('')?.title).toBeTruthy();
	});

	it('ディレクトリ構造がそのまま slug になる', () => {
		expect(notes.has('quantum-computing')).toBe(true);
		expect(notes.has('quantum-computing/vqa')).toBe(true);
		expect(notes.has('quantum-computing/vqa/spsa-implementation')).toBe(true);
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

	it('frontmatter の title を採用する', () => {
		expect(notes.get('quantum-computing')?.title).toBe('量子計算');
	});

	it('frontmatter のメタ情報を読み取る', () => {
		const note = notes.get('quantum-computing/vqa/spsa-implementation');

		expect(note?.status).toBe('読了');
		expect(note?.date).toBe('2026-03-07');
		expect(note?.cite).toBe('Spall, 1998');
		expect(note?.tags.length).toBeGreaterThan(0);
	});

	it('本文先頭の h1 をタイトルに吸い上げ、本文からは外す', () => {
		const note = notes.get('quantum-computing/vqa/spsa-implementation');

		expect(note?.html).not.toContain('<h1');
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
		const vqa = allNodes.find((node) => node.slug === 'quantum-computing/vqa');

		expect(vqa?.kind).toBe('section');
		expect(vqa?.kind === 'section' && vqa.children.map((child) => child.slug)).toEqual([
			'quantum-computing/vqa/spsa-implementation',
			'quantum-computing/vqa/optimizer-benchmark',
			'quantum-computing/vqa/noisy-landscapes'
		]);
	});

	it('前後ナビの列に全ノートが 1 度ずつ現れる', () => {
		expect(new Set(reading).size).toBe(reading.length);
		expect(new Set(reading)).toEqual(new Set(notes.keys()));
	});

	it('前後ナビの列がツリーの並びと一致する', () => {
		expect(reading[0]).toBe('');
		expect(reading[1]).toBe('quantum-computing');
		expect(reading[2]).toBe('quantum-computing/vqa');
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
		const entry = search.find((e) => e.slug === 'quantum-computing/vqa/spsa-implementation');

		expect(entry?.path).toBe('量子計算 / 変分量子アルゴリズム (VQA)');
	});
});

describe('数式', () => {
	it('notes/ 全体で変換に失敗した数式が無い', () => {
		expect(loadNotes().mathErrors).toEqual([]);
	});
});
