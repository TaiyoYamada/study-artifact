import { describe, expect, it } from 'vitest';
import { renderMarkdown, stripTags } from './markdown';

const ctx = { slug: 'quantum-computing/vqa/spsa', dirSlug: 'quantum-computing/vqa' };
const render = (source: string) => renderMarkdown(source, ctx);

describe('数式', () => {
	it('インライン数式を MathML にする', () => {
		const { html, mathErrors } = render('係数は $a_k = a/(A+k+1)^\\alpha$ で決まる。');

		expect(html).toContain('<math');
		expect(mathErrors).toEqual([]);
	});

	it('アンダースコアを強調記号として食べない', () => {
		const { html } = render('$\\theta_k$ と $\\Delta_k$ を使う。');

		expect(html).not.toContain('<em>');
		expect(html.match(/<math/g)).toHaveLength(2);
	});

	it('$$ はブロックとして扱い、<p> に埋めない', () => {
		const { html } = render(
			'式:\n\n$$\\hat{\\theta}_{k+1} = \\hat{\\theta}_k - a_k \\hat{g}_k$$\n'
		);

		expect(html).toContain('tml-display');
		expect(html).not.toMatch(/<p>\s*<math[^>]*tml-display/);
	});

	it('コードブロック内の $ を数式にしない', () => {
		const { html } = render('```bash\necho $HOME\n```\n');

		expect(html).not.toContain('<math');
		expect(html).toContain('$HOME');
	});

	it('\\$ で書いたドル記号をそのまま出す', () => {
		const { html } = render('価格は \\$100 です。');

		expect(html).toContain('$100');
		expect(html).not.toContain('<math');
	});

	it('壊れた数式はエラーとして報告し、本文は落とさない', () => {
		const { html, mathErrors } = render('$\\frac{1}{$ は壊れている');

		expect(mathErrors.length).toBeGreaterThan(0);
		expect(html).toContain('math-error');
	});
});

describe('コードブロック', () => {
	it('言語ラベルとコピーボタンを付ける', () => {
		const { html } = render('```python\nprint(1)\n```\n');

		expect(html).toContain('class="code-block"');
		expect(html).toContain('<span class="code-lang">python</span>');
		expect(html).toContain('class="code-copy"');
	});

	it('言語に応じて色を付ける', () => {
		const { html } = render('```python\ndef f():\n    pass\n```\n');

		expect(html).toContain('t-keyword');
	});

	it('コード内の HTML をエスケープする', () => {
		const { html } = render('```\n<img src=x onerror=alert(1)>\n```\n');

		expect(html).toContain('&lt;img');
		expect(html).not.toContain('<img');
	});

	it('インラインコードを保つ', () => {
		const { html } = render('`node build.mjs` を実行する。');

		expect(html).toContain('<code>node build.mjs</code>');
	});
});

describe('callout', () => {
	it('> [!note] を callout に変換する', () => {
		const { html } = render('> [!note] ノート間のリンク\n> 二重角括弧で参照できる。\n');

		expect(html).toContain('class="callout callout-note"');
		expect(html).toContain('<p class="callout-title">ノート間のリンク</p>');
		expect(html).toContain('二重角括弧で参照できる。');
	});

	it('見出しを省略したら種別名を使う', () => {
		const { html } = render('> [!warning]\n> 気をつける。\n');

		expect(html).toContain('<p class="callout-title">Warning</p>');
	});

	it('リストを含む callout でも構造を壊さない', () => {
		const { html } = render('> [!todo] 次に読む\n> - 文献 A\n> - 文献 B\n');

		expect(html).toContain('callout-todo');
		expect(html).toContain('<li>文献 A</li>');
		expect(html.match(/<blockquote/g)).toHaveLength(1);
		expect(html.match(/<\/blockquote>/g)).toHaveLength(1);
	});

	it('ふつうの引用は引用のままにする', () => {
		const { html } = render('> ただの引用。\n');

		expect(html).toContain('<blockquote>');
		expect(html).not.toContain('callout');
	});
});

describe('リンク', () => {
	it('[[slug]] をノートへのリンクにする', () => {
		const { html } = render('詳細は [[quantum-computing/vqa/spsa]] を見る。');

		expect(html).toContain('href="/quantum-computing/vqa/spsa"');
	});

	it('[[slug|表示名]] の表示名を使う', () => {
		const { html } = render('[[quantum-computing/vqa/spsa|SPSA]] を参照。');

		expect(html).toContain('>SPSA</a>');
	});

	it('相対 .md リンクを解決する', () => {
		const { html } = render('[隣](./optimizer-benchmark.md) と [上](../index.md)');

		expect(html).toContain('href="/quantum-computing/vqa/optimizer-benchmark"');
		expect(html).toContain('href="/quantum-computing"');
	});

	it('外部リンクは新しいタブで開く', () => {
		const { html } = render('[arXiv](https://arxiv.org/abs/2506.01715)');

		expect(html).toContain('target="_blank"');
		expect(html).toContain('rel="noopener"');
	});
});

describe('見出しと目次', () => {
	it('h2〜h4 に id を振り、目次に積む', () => {
		const { html, toc } = render('## 概要\n\n### 手法\n\n本文\n');

		expect(html).toContain('<h2 id="概要"');
		expect(toc).toEqual([
			{ id: '概要', level: 2, text: '概要' },
			{ id: '手法', level: 3, text: '手法' }
		]);
	});

	it('同名の見出しに別々の id を振る', () => {
		const { toc } = render('## 結果\n\n## 結果\n');

		expect(toc.map((h) => h.id)).toEqual(['結果', '結果-2']);
	});

	it('見出しにアンカーリンクを添える', () => {
		const { html } = render('## 概要\n');

		expect(html).toContain('class="anchor" href="#概要"');
	});

	it('h1 は目次に含めない', () => {
		const { toc } = render('# タイトル\n\n## 概要\n');

		expect(toc.map((h) => h.level)).toEqual([2]);
	});
});

describe('stripTags', () => {
	it('タグと実体参照を落としてテキストだけにする', () => {
		expect(stripTags('<p>勾配は <code>2p</code> 回</p>')).toBe('勾配は 2p 回');
		expect(stripTags('<p>a &amp; b</p>')).toBe('a b');
	});

	it('script の中身を残さない', () => {
		expect(stripTags('<script>alert(1)</script>本文')).toBe('本文');
	});
});
