/**
 * notes/ の Markdown を読み、階層ツリー・ノート本文・検索インデックスを組み立てる。
 *
 * ファイルは import.meta.glob で取り込む。fs を触らないので、dev では Vite が
 * notes/ の変更を検知してこのモジュールごと作り直してくれる。
 */
import type { Crumb, NavNode, NavSection, Note, SearchEntry } from '$lib/types';
import { parseFrontmatter, readList, readString } from './frontmatter';
import { renderMarkdown, stripTags, type MathError } from './markdown';

const RAW_NOTES = import.meta.glob('/notes/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const ORDER_PREFIX = /^(\d+)[-_.]\s*/;

function splitOrder(name: string): { order: number | null; rest: string } {
	const match = name.match(ORDER_PREFIX);
	return match
		? { order: Number(match[1]), rest: name.slice(match[0].length) }
		: { order: null, rest: name };
}

// 大文字小文字はそのまま残す。CMA-ES や QUBO をディレクトリ名どおりに
// 書けたほうが、手書きのノート間リンクがずれにくい。
function slugify(name: string): string {
	return splitOrder(name).rest.replace(/\s+/g, '-');
}

function titleize(name: string): string {
	return splitOrder(name)
		.rest.replace(/[-_]/g, ' ')
		.replace(/\S+/g, (word) =>
			/^[a-z]/.test(word) ? word[0]!.toUpperCase() + word.slice(1) : word
		);
}

/** notes/ 直下からの生のディレクトリ構造。 */
interface RawDir {
	name: string;
	dirs: Map<string, RawDir>;
	files: Map<string, string>;
}

function buildRawTree(): RawDir {
	const root: RawDir = { name: '', dirs: new Map(), files: new Map() };

	for (const [path, content] of Object.entries(RAW_NOTES)) {
		const relative = path.replace(/^\/notes\//, '');
		const segments = relative.split('/');
		const fileName = segments.pop()!;

		// `_` 始まりはひな形などの下書き置き場として無視する
		if (fileName.startsWith('_') || segments.some((s) => s.startsWith('_'))) continue;

		let dir = root;
		for (const segment of segments) {
			let next = dir.dirs.get(segment);
			if (!next) {
				next = { name: segment, dirs: new Map(), files: new Map() };
				dir.dirs.set(segment, next);
			}
			dir = next;
		}
		dir.files.set(fileName, content);
	}

	return root;
}

interface BuildState {
	notes: Map<string, Note>;
	reading: string[];
	search: SearchEntry[];
	mathErrors: (MathError & { note: string })[];
}

function buildNote(
	fileName: string,
	content: string,
	dirSegments: string[],
	crumbs: Crumb[],
	state: BuildState
): { note: Note; order: number | null } {
	const stem = fileName.replace(/\.md$/, '');
	const isIndex = splitOrder(stem).rest.toLowerCase() === 'index';

	const parts = dirSegments.map(slugify);
	if (!isIndex) parts.push(slugify(stem));
	const slug = parts.join('/');
	const dirSlug = dirSegments.map(slugify).join('/');

	const { data, body } = parseFrontmatter(content);

	// 本文先頭の h1 はタイトルとして吸い上げ、本文からは外す (frontmatter の title が優先)
	let text = body;
	let heading: string | null = null;
	const h1 = text.match(/^\s*#\s+(.+?)\s*$/m);
	if (h1 && text.slice(0, h1.index).trim() === '') {
		heading = h1[1]!.trim();
		text = text.slice(h1.index! + h1[0].length);
	}

	const { html, toc, mathErrors } = renderMarkdown(text, { slug, dirSlug });
	for (const error of mathErrors) state.mathErrors.push({ ...error, note: slug || '(home)' });

	const fallbackTitle = isIndex ? (dirSegments.at(-1) ?? '') : stem;
	const title = readString(data, 'title') || heading || titleize(fallbackTitle);
	const orderValue = readString(data, 'order');

	const note: Note = {
		slug,
		title,
		summary: readString(data, 'summary'),
		status: readString(data, 'status'),
		date: readString(data, 'date') || readString(data, 'updated'),
		source: readString(data, 'source'),
		cite: readString(data, 'cite'),
		tags: readList(data, 'tags'),
		path: `notes/${[...dirSegments, fileName].join('/')}`,
		html,
		toc,
		breadcrumb: crumbs
	};

	state.notes.set(slug, note);
	state.search.push({
		slug,
		title,
		path: crumbs.map((c) => c.title).join(' / '),
		tags: note.tags,
		text: stripTags(html).slice(0, 24_000)
	});

	return { note, order: orderValue === '' ? splitOrder(stem).order : Number(orderValue) };
}

function compareOrder(
	a: { order: number | null; sortName: string },
	b: { order: number | null; sortName: string }
) {
	const left = a.order ?? Number.POSITIVE_INFINITY;
	const right = b.order ?? Number.POSITIVE_INFINITY;
	if (left !== right) return left - right;
	return a.sortName.localeCompare(b.sortName, 'ja');
}

function buildSection(
	dir: RawDir,
	dirSegments: string[],
	crumbs: Crumb[],
	state: BuildState
): { node: NavSection; order: number | null; sortName: string } {
	const slug = dirSegments.map(slugify).join('/');

	// index.md はその階層自身のページ。先に読んでタイトルを確定させる。
	let page: Note | null = null;
	let pageOrder: number | null = null;
	for (const [fileName, content] of dir.files) {
		if (splitOrder(fileName.replace(/\.md$/, '')).rest.toLowerCase() !== 'index') continue;
		const built = buildNote(fileName, content, dirSegments, crumbs, state);
		page = built.note;
		pageOrder = built.order;
	}

	const title = page?.title || titleize(dirSegments.at(-1) ?? '');
	const childCrumbs = slug ? [...crumbs, { slug, title }] : crumbs;

	const entries: { node: NavNode; order: number | null; sortName: string }[] = [];

	for (const [fileName, content] of dir.files) {
		if (splitOrder(fileName.replace(/\.md$/, '')).rest.toLowerCase() === 'index') continue;
		const built = buildNote(fileName, content, dirSegments, childCrumbs, state);
		entries.push({
			node: {
				kind: 'note',
				slug: built.note.slug,
				title: built.note.title,
				status: built.note.status
			},
			order: built.order,
			sortName: fileName
		});
	}

	for (const [dirName, child] of dir.dirs) {
		const built = buildSection(child, [...dirSegments, dirName], childCrumbs, state);
		entries.push(built);
	}

	entries.sort(compareOrder);

	const node: NavSection = {
		kind: 'section',
		slug,
		title,
		hasPage: page !== null,
		children: entries.map((entry) => entry.node)
	};

	// 前後ナビ用に、サイドバーに出るのと同じ順で slug を積む
	if (page) state.reading.push(slug);
	for (const entry of entries) {
		if (entry.node.kind === 'note') state.reading.push(entry.node.slug);
	}

	const sectionName = dirSegments.at(-1) ?? '';
	return {
		node,
		order: pageOrder ?? splitOrder(sectionName).order,
		sortName: sectionName
	};
}

// reading 配列はセクションを跨いだ深さ優先順にしたいので、ツリー確定後に組み直す。
function flattenReading(node: NavNode, out: string[]): void {
	if (node.kind === 'note') {
		out.push(node.slug);
		return;
	}
	if (node.hasPage) out.push(node.slug);
	for (const child of node.children) flattenReading(child, out);
}

export interface NotesData {
	nav: NavSection;
	notes: Map<string, Note>;
	reading: string[];
	search: SearchEntry[];
	mathErrors: (MathError & { note: string })[];
}

let cache: NotesData | null = null;

export function loadNotes(): NotesData {
	if (cache) return cache;

	const state: BuildState = { notes: new Map(), reading: [], search: [], mathErrors: [] };
	const { node } = buildSection(buildRawTree(), [], [], state);

	const reading: string[] = [];
	flattenReading(node, reading);

	// ノート間リンクの綴り違いはビルドを止める。500 本規模だと手書きの
	// [[...]] は必ずずれるので、機械に照合させて候補まで出す。
	const broken = findBrokenLinks(state.notes);
	if (broken.length > 0) {
		const lines = broken.map((b) => {
			const hint = suggest(b.target, [...state.notes.keys()]);
			return `  ${b.from || '(ホーム)'} → ${b.target}${hint ? `\n      もしかして: ${hint}` : ''}`;
		});
		throw new Error(`ノート間リンクの参照先が見つかりません:\n${lines.join('\n')}`);
	}

	if (state.mathErrors.length > 0) {
		for (const error of state.mathErrors) {
			console.warn(`[math] ${error.note}: ${error.tex}\n       ${error.message}`);
		}
	}

	cache = {
		nav: node,
		notes: state.notes,
		reading,
		search: state.search,
		mathErrors: state.mathErrors
	};
	return cache;
}

/** 本文中のサイト内リンクを拾い、実在しない参照先を挙げる。 */
function findBrokenLinks(notes: Map<string, Note>): { from: string; target: string }[] {
	const broken: { from: string; target: string }[] = [];

	for (const [slug, note] of notes) {
		for (const match of note.html.matchAll(/href="\/([^"#?]*)"/g)) {
			const target = decodeURIComponent(match[1] ?? '').replace(/\/+$/, '');
			if (target === '' || notes.has(target)) continue;
			if (broken.some((b) => b.from === slug && b.target === target)) continue;
			broken.push({ from: slug, target });
		}
	}

	return broken;
}

/** 綴り違いを直しやすいよう、末尾の語が一致する候補を挙げる。 */
function suggest(target: string, slugs: string[]): string {
	const leaf = target.split('/').at(-1)?.toLowerCase() ?? '';
	if (!leaf) return '';
	const hits = slugs.filter((slug) => slug.split('/').at(-1)?.toLowerCase() === leaf);
	return hits.slice(0, 3).join(', ');
}

/** その節の配下にある項目数。刈り込んだ枝の規模を示すのに使う。 */
function countAll(node: NavNode): number {
	if (node.kind === 'note') return 1;
	return (node.hasPage ? 1 : 0) + node.children.reduce((sum, child) => sum + countAll(child), 0);
}

/**
 * ナビゲーションを現在地の周辺だけに刈り込む。
 *
 * 500 を超えるノートの木をそのまま全ページに埋めると、1 ページあたり
 * 数百 KB になってしまう。現在地までの道筋とその兄弟だけを残し、
 * 遠い枝は「入口」だけ置く。どの節にも index.md があるので、
 * 入口をたどれば JavaScript 無しでも先へ進める。
 */
export function pruneNav(node: NavSection, slug: string): NavSection {
	const onPath = (target: string) => target === slug || slug.startsWith(`${target}/`);

	return {
		...node,
		children: node.children.map((child) => {
			if (child.kind === 'note') return child;
			if (onPath(child.slug)) return pruneNav(child, slug);
			return {
				...child,
				children: [],
				count: countAll(child) - (child.hasPage ? 1 : 0),
				truncated: child.children.length > 0
			};
		})
	};
}

/** 事前生成の対象となる全 URL。SvelteKit の entries() に渡す。 */
export function allSlugs(): string[] {
	return [...loadNotes().notes.keys()];
}
