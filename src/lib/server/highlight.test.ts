import { describe, expect, it } from 'vitest';
import { highlight, supportedLanguages } from './highlight';

describe('highlight', () => {
	it('未知の言語では色を付けず、HTML だけエスケープする', () => {
		const out = highlight('<script>alert(1)</script>', 'brainfuck');

		expect(out).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
		expect(out).not.toContain('<span');
	});

	it('言語指定が無くてもエスケープする', () => {
		expect(highlight('a < b && c > d', '')).toBe('a &lt; b &amp;&amp; c &gt; d');
	});

	it('python のキーワード・文字列・コメントを分類する', () => {
		const out = highlight('def f(x):\n    # メモ\n    return "ok"', 'python');

		expect(out).toContain('<span class="t-keyword">def</span>');
		expect(out).toContain('<span class="t-comment"># メモ</span>');
		expect(out).toContain('<span class="t-string">&quot;ok&quot;</span>');
	});

	it('別名を正規化する (py → python, ts → clike)', () => {
		expect(highlight('def f():', 'py')).toContain('t-keyword');
		expect(highlight('const x = 1', 'ts')).toContain('t-keyword');
		expect(highlight('const x = 1', 'TypeScript')).toContain('t-keyword');
	});

	it('コード内の HTML をエスケープしたうえで色を付ける', () => {
		const out = highlight('const html = "<b>"', 'js');

		expect(out).toContain('&lt;b&gt;');
		expect(out).not.toContain('<b>');
	});

	it('JSON のキーと値を区別する', () => {
		const out = highlight('{ "name": "study", "count": 6, "ok": true }', 'json');

		expect(out).toContain('<span class="t-fn">&quot;name&quot;</span>');
		expect(out).toContain('<span class="t-number">6</span>');
		expect(out).toContain('<span class="t-keyword">true</span>');
	});

	it('bash の変数とコメントを拾う', () => {
		const out = highlight('# 起動\nnpm run build $FLAG', 'bash');

		expect(out).toContain('t-comment');
		expect(out).toContain('<span class="t-meta">$FLAG</span>');
	});

	it('同じ言語を続けて呼んでも結果が変わらない (lastIndex の持ち越しが無い)', () => {
		const code = 'def f(): return 1';

		expect(highlight(code, 'python')).toBe(highlight(code, 'python'));
	});

	it('空文字列で無限ループしない', () => {
		expect(highlight('', 'python')).toBe('');
	});

	it('色を付けても元のテキストは失われない', () => {
		const code = 'def f(x):\n    return x + 1  # 加算';
		const plain = highlight(code, 'python')
			.replace(/<[^>]+>/g, '')
			.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"');

		expect(plain).toBe(code);
	});

	it('対応言語一覧に主要なものが含まれる', () => {
		expect(supportedLanguages).toEqual(
			expect.arrayContaining(['python', 'bash', 'json', 'yaml', 'ts'])
		);
	});
});
