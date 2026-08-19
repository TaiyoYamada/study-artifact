export interface Crumb {
	slug: string;
	title: string;
}

export interface Heading {
	id: string;
	level: number;
	text: string;
}

/** ノート 1 本ぶんの、本文を含まないメタ情報。 */
export interface NoteMeta {
	/** notes/ からの階層パス。ホームは空文字列。 例: `quantum-computing/vqa/spsa` */
	slug: string;
	title: string;
	summary: string;
	status: string;
	date: string;
	source: string;
	cite: string;
	tags: string[];
	/** リポジトリ内の元ファイル。 例: `notes/01-quantum-computing/index.md` */
	path: string;
}

export interface Note extends NoteMeta {
	html: string;
	toc: Heading[];
	breadcrumb: Crumb[];
}

export interface NavNote {
	kind: 'note';
	slug: string;
	title: string;
	status: string;
}

export interface NavSection {
	kind: 'section';
	slug: string;
	title: string;
	/** その階層自身に index.md があるか。無ければ見出しとしてだけ存在する。 */
	hasPage: boolean;
	children: NavNode[];
	/** 配下にある項目の総数。刈り込んだ枝でも件数だけは示せるように。 */
	count?: number;
	/** 現在地から遠いので children を落としてある、という印。 */
	truncated?: boolean;
}

export type NavNode = NavNote | NavSection;

export interface SearchEntry {
	slug: string;
	title: string;
	/** パンくずを ` / ` で連結したもの。検索結果の副題に使う。 */
	path: string;
	tags: string[];
	text: string;
}

export interface SiteConfig {
	title: string;
	description: string;
	author: string;
	lang: string;
	repository?: string;
}
