/**
 * Markdown をノートの HTML に変換する。
 *
 * marked に渡す前に、壊されたくないもの (コードと数式) をプレースホルダに退避する。
 * 特に `$\theta_k$` の `_` は、そのまま渡すと marked が強調記号として食べてしまう。
 * 数式は temml でビルド時に MathML へ落とすので、閲覧側に JavaScript は要らない。
 */
import { marked } from 'marked';
import temml from 'temml';
import { base } from '$app/paths';
import type { Heading } from '$lib/types';
import { highlight } from './highlight';

export interface RenderContext {
	/** レンダリング対象ノートの slug。相対 .md リンクの解決に使う。 */
	slug: string;
	/** そのノートが属するディレクトリの slug。 */
	dirSlug: string;
}

export interface RenderResult {
	html: string;
	toc: Heading[];
	/** 変換できなかった数式。ビルド時に警告として出す。 */
	mathErrors: MathError[];
}

export interface MathError {
	tex: string;
	message: string;
}

const CALLOUT_LABELS: Record<string, string> = {
	note: 'Note',
	tip: 'Tip',
	important: 'Important',
	warning: 'Warning',
	caution: 'Caution',
	todo: 'TODO',
	question: 'Question'
};

export function escapeHtml(value: string): string {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

/**
 * ノートの slug からサイト内 URL を作る。空 slug はホーム。
 *
 * ここで resolve() を使わないのは、レンダリング結果を全ページで使い回すため。
 * resolve() は呼び出し時のリクエストに依存しうるので、キャッシュに焼き込めない。
 */
export function noteHref(slug: string): string {
	return slug ? `${base}/${slug}` : `${base}/`;
}

function renderMath(tex: string, display: boolean, errors: MathError[]): string {
	try {
		return temml.renderToString(tex.trim(), {
			displayMode: display,
			throwOnError: true,
			annotate: false
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		errors.push({ tex: tex.trim().slice(0, 90), message });
		const literal = display ? `$$${tex}$$` : `$${tex}$`;
		return `<code class="math-error" title="${escapeHtml(message)}">${escapeHtml(literal)}</code>`;
	}
}

/** `01-` のような並び順プレフィックスを外して slug 断片にする。 */
export function slugifySegment(name: string): string {
	return name.replace(/^\d+[-_.]\s*/, '').replace(/\s+/g, '-');
}

export function renderMarkdown(source: string, ctx: RenderContext): RenderResult {
	const codeBlocks: { lang: string; code: string }[] = [];
	const inlineCodes: string[] = [];
	const maths: { tex: string; display: boolean }[] = [];
	const mathErrors: MathError[] = [];

	let s = source;

	// `\$` と書かれたリテラルのドル記号は数式検出から守る
	s = s.replace(/\\\$/g, 'xxDOLLARxx');

	s = s.replace(
		/^[ \t]*```([^\n`]*)\n([\s\S]*?)\n?[ \t]*```[ \t]*$/gm,
		(_all, info: string, code: string) => {
			const index = codeBlocks.push({ lang: (info ?? '').trim().split(/\s+/)[0] ?? '', code }) - 1;
			return `\n\nxxCODEBLOCKxx${index}xx\n\n`;
		}
	);
	s = s.replace(
		/`([^`\n]+)`/g,
		(_all, code: string) => `xxINLINECODExx${inlineCodes.push(code) - 1}xx`
	);
	s = s.replace(
		/\$\$([\s\S]+?)\$\$/g,
		(_all, tex: string) => `\n\nxxMATHxx${maths.push({ tex, display: true }) - 1}xx\n\n`
	);
	s = s.replace(
		/\$(?!\s)([^$\n]+?)(?<!\s)\$/g,
		(_all, tex: string) => `xxMATHxx${maths.push({ tex, display: false }) - 1}xx`
	);

	// [[slug]] / [[slug|表示名]] でノート間リンク
	s = s.replace(
		/\[\[([^\]|]+?)(?:\\?\|([^\]]+?))?\]\]/g,
		(_all, target: string, label?: string) => {
			// 表の中では区切りの | を \| と書く必要があるため、末尾の \ を落とす
			const t = target
				.trim()
				.replace(/\\+$/, '')
				.replace(/^\/+|\/+$/g, '');
			return `[${(label ?? t).trim()}](${noteHref(t)})`;
		}
	);

	let html = await0(marked.parse(s, { gfm: true, breaks: false }));

	// 退避したものを戻す。ブロック要素は marked が <p> で包んでいるので先に剥がす。
	const mathHtml = (i: string) =>
		renderMath(maths[Number(i)]!.tex, maths[Number(i)]!.display, mathErrors);
	html = html.replace(/<p>\s*xxMATHxx(\d+)xx\s*<\/p>/g, (_all, i: string) => mathHtml(i));
	html = html.replace(/xxMATHxx(\d+)xx/g, (_all, i: string) => mathHtml(i));

	const codeHtml = (i: string) => {
		const block = codeBlocks[Number(i)]!;
		const label = block.lang ? `<span class="code-lang">${escapeHtml(block.lang)}</span>` : '';
		return (
			`<div class="code-block">${label}` +
			'<button class="code-copy" type="button">コピー</button>' +
			`<pre><code>${highlight(block.code, block.lang)}</code></pre></div>`
		);
	};
	html = html.replace(/<p>\s*xxCODEBLOCKxx(\d+)xx\s*<\/p>/g, (_all, i: string) => codeHtml(i));
	html = html.replace(/xxCODEBLOCKxx(\d+)xx/g, (_all, i: string) => codeHtml(i));
	html = html.replace(
		/xxINLINECODExx(\d+)xx/g,
		(_all, i: string) => `<code>${escapeHtml(inlineCodes[Number(i)]!)}</code>`
	);
	html = html.replace(/xxDOLLARxx/g, () => '$');

	// `> [!note] …` を callout にする。blockquote のままなので閉じタグの対応を崩さない。
	// marked は `[!note] 見出し` の行と続く本文を 1 つの <p> にまとめるため、
	// 最初の改行で切り直して見出し行だけを取り出す。
	html = html.replace(/<blockquote>(\s*)<p>([\s\S]*?)<\/p>/g, (all, ws: string, inner: string) => {
		const marker = inner.match(/^[ \t]*\[!(\w+)\][ \t]*([^\n]*)([\s\S]*)$/);
		if (!marker) return all;
		const kind = marker[1]!.toLowerCase();
		const label = marker[2]!.trim() || CALLOUT_LABELS[kind] || marker[1]!;
		const rest = marker[3]!.trim();
		return (
			`<blockquote class="callout callout-${kind}">${ws}<p class="callout-title">${label}</p>` +
			(rest ? `<p>${rest}</p>` : '')
		);
	});

	// 相対 .md リンクをサイト内 URL に寄せる
	html = html.replace(/href="([^"#:]+?)\.md"/g, (_all, target: string) => {
		const segments = ctx.dirSlug ? ctx.dirSlug.split('/') : [];
		for (const segment of target.split('/')) {
			if (segment === '.' || segment === '') continue;
			if (segment === '..') segments.pop();
			else segments.push(slugifySegment(segment));
		}
		// index.md はその階層自身のページなので、URL に index は出さない
		if (segments.at(-1) === 'index') segments.pop();
		return `href="${noteHref(segments.join('/'))}"`;
	});
	html = html.replace(/<a href="(https?:)/g, '<a target="_blank" rel="noopener" href="$1');

	// 見出しに id を振り、同時に目次を作る
	const toc: Heading[] = [];
	const seen = new Map<string, number>();
	html = html.replace(/<h([2-4])>([\s\S]*?)<\/h\1>/g, (_all, level: string, inner: string) => {
		const text = inner.replace(/<[^>]+>/g, '').trim();
		let id =
			text
				.toLowerCase()
				.replace(/[^\p{L}\p{N}\s-]/gu, '')
				.trim()
				.replace(/\s+/g, '-') || 'section';
		const count = (seen.get(id) ?? 0) + 1;
		seen.set(id, count);
		if (count > 1) id += `-${count}`;
		toc.push({ id, level: Number(level), text });
		return (
			`<h${level} id="${id}">${inner}` +
			`<a class="anchor" href="#${id}" aria-label="この見出しへのリンク">#</a></h${level}>`
		);
	});

	return { html, toc, mathErrors };
}

/** marked.parse は同期設定でも string | Promise<string> 型を返すので絞り込む。 */
function await0(value: string | Promise<string>): string {
	if (typeof value !== 'string') {
		throw new TypeError('marked が非同期モードで動作しています (async: true になっていないか確認)');
	}
	return value;
}

/** HTML からテキストだけ抜き出す。検索インデックス用。 */
export function stripTags(html: string): string {
	return html
		.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/&(?:[a-z]+|#\d+);/gi, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}
