import { describe, expect, it } from 'vitest';
import { parseFrontmatter, readList, readString } from './frontmatter';

describe('parseFrontmatter', () => {
	it('key: value を読み、本文を残す', () => {
		const { data, body } = parseFrontmatter(
			'---\ntitle: SPSA\nstatus: 読了\n---\n\n# 見出し\n本文\n'
		);

		expect(data).toEqual({ title: 'SPSA', status: '読了' });
		expect(body).toBe('\n# 見出し\n本文\n');
	});

	it('[a, b] を配列として読む', () => {
		const { data } = parseFrontmatter('---\ntags: [VQA, NISQ, 最適化]\n---\n');

		expect(data.tags).toEqual(['VQA', 'NISQ', '最適化']);
	});

	it('引用符を外す', () => {
		const { data } = parseFrontmatter('---\ntitle: "A: B"\nnote: \'C\'\ntags: ["x", \'y\']\n---\n');

		expect(data.title).toBe('A: B');
		expect(data.note).toBe('C');
		expect(data.tags).toEqual(['x', 'y']);
	});

	it('値の中のコロンやカンマを壊さない', () => {
		const { data } = parseFrontmatter('---\nsource: IEEE TRANS, 1998年\n---\n');

		expect(data.source).toBe('IEEE TRANS, 1998年');
	});

	it('空配列を空のまま扱う', () => {
		const { data } = parseFrontmatter('---\ntags: []\n---\n');

		expect(data.tags).toEqual([]);
	});

	it('frontmatter が無ければ本文をそのまま返す', () => {
		const source = '# 見出しだけ\n';
		const { data, body } = parseFrontmatter(source);

		expect(data).toEqual({});
		expect(body).toBe(source);
	});

	it('本文中の --- を frontmatter の終端と誤認しない', () => {
		const { data, body } = parseFrontmatter('---\ntitle: X\n---\n\n本文\n\n---\n\n続き\n');

		expect(data.title).toBe('X');
		expect(body).toContain('続き');
	});

	it('CRLF 改行を扱える', () => {
		const { data } = parseFrontmatter('---\r\ntitle: X\r\n---\r\n本文\r\n');

		expect(data.title).toBe('X');
	});
});

describe('readString / readList', () => {
	it('無いキーは空を返す', () => {
		expect(readString({}, 'title')).toBe('');
		expect(readList({}, 'tags')).toEqual([]);
	});

	it('型が食い違っても落ちない', () => {
		expect(readString({ title: ['a', 'b'] }, 'title')).toBe('a');
		expect(readList({ tags: 'solo' }, 'tags')).toEqual(['solo']);
	});
});
