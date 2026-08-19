/**
 * ビルド時のシンタックスハイライト。
 *
 * 言語ごとに「名前付きグループを並べた正規表現 1 本」でトークナイズする。
 * 完全なパーサではないが、ノートに貼るコード片には十分で、依存も増えない。
 * 色は app.css の `.t-*` クラスで決まる。
 */

const KEYWORDS = {
	python:
		'False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|match|case|nonlocal|not|or|pass|raise|return|self|try|while|with|yield',
	clike:
		'abstract|as|async|await|auto|bool|break|case|catch|char|class|const|constructor|continue|debugger|default|delete|do|double|else|enum|export|extends|false|finally|float|fn|for|from|func|function|go|if|impl|implements|import|in|instanceof|int|interface|let|loop|match|mod|move|mut|namespace|new|null|of|package|private|protected|pub|public|readonly|ref|return|self|sizeof|static|string|struct|super|switch|template|this|throw|trait|true|try|type|typeof|undefined|union|unsafe|use|using|var|void|where|while|yield',
	bash: 'case|declare|do|done|elif|else|esac|export|fi|for|function|if|in|local|readonly|return|set|shift|source|then|trap|unset|until|while',
	sql: 'ADD|ALL|ALTER|AND|AS|ASC|BY|CASE|CREATE|DELETE|DESC|DISTINCT|DROP|END|FOREIGN|FROM|GROUP|HAVING|INDEX|INNER|INSERT|INTO|JOIN|KEY|LEFT|LIMIT|NOT|NULL|OFFSET|ON|OR|ORDER|OUTER|PRIMARY|REFERENCES|RIGHT|SELECT|SET|TABLE|THEN|UNION|UPDATE|VALUES|VIEW|WHEN|WHERE|WITH'
} as const;

const GRAMMARS: Record<string, RegExp> = {
	python: new RegExp(
		[
			'(?<comment>#[^\\n]*)',
			'(?<string>"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|[rbfu]{0,2}"(?:\\\\.|[^"\\\\\\n])*"|[rbfu]{0,2}\'(?:\\\\.|[^\'\\\\\\n])*\')',
			'(?<meta>@[\\w.]+)',
			`(?<keyword>\\b(?:${KEYWORDS.python})\\b)`,
			'(?<number>\\b\\d[\\d_]*\\.?\\d*(?:[eE][+-]?\\d+)?j?\\b)',
			'(?<fn>\\b[A-Za-z_]\\w*(?=\\s*\\())'
		].join('|'),
		'g'
	),

	clike: new RegExp(
		[
			'(?<comment>//[^\\n]*|/\\*[\\s\\S]*?\\*/)',
			'(?<string>`(?:\\\\.|[^`\\\\])*`|"(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\')',
			'(?<meta>#\\s*\\w+|@\\w+)',
			`(?<keyword>\\b(?:${KEYWORDS.clike})\\b)`,
			'(?<number>\\b0[xXbBoO][\\da-fA-F_]+\\b|\\b\\d[\\d_]*\\.?\\d*(?:[eE][+-]?\\d+)?\\b)',
			'(?<fn>\\b[A-Za-z_$][\\w$]*(?=\\s*\\())'
		].join('|'),
		'g'
	),

	bash: new RegExp(
		[
			'(?<comment>#[^\\n]*)',
			'(?<string>"(?:\\\\.|[^"\\\\])*"|\'[^\']*\')',
			'(?<meta>\\$\\w+|\\$\\{[^}]*\\}|\\$\\([^)]*\\))',
			`(?<keyword>\\b(?:${KEYWORDS.bash})\\b)`,
			'(?<number>(?<=\\s)-{1,2}[A-Za-z][\\w-]*)',
			'(?<fn>^[ \\t]*[a-z_][\\w.-]*)'
		].join('|'),
		'gm'
	),

	json: new RegExp(
		[
			'(?<fn>"(?:\\\\.|[^"\\\\])*"(?=\\s*:))',
			'(?<string>"(?:\\\\.|[^"\\\\])*")',
			'(?<keyword>\\b(?:true|false|null)\\b)',
			'(?<number>-?\\b\\d+\\.?\\d*(?:[eE][+-]?\\d+)?\\b)'
		].join('|'),
		'g'
	),

	yaml: new RegExp(
		[
			'(?<comment>#[^\\n]*)',
			'(?<fn>^[ \\t]*-?[ \\t]*[\\w.$-]+(?=[ \\t]*:))',
			'(?<string>"(?:\\\\.|[^"\\\\])*"|\'[^\']*\')',
			'(?<keyword>\\b(?:true|false|null|yes|no|on|off)\\b)',
			'(?<number>-?\\b\\d+\\.?\\d*\\b)'
		].join('|'),
		'gm'
	),

	sql: new RegExp(
		[
			'(?<comment>--[^\\n]*|/\\*[\\s\\S]*?\\*/)',
			"(?<string>'(?:''|[^'])*')",
			`(?<keyword>\\b(?:${KEYWORDS.sql})\\b)`,
			'(?<number>\\b\\d+\\.?\\d*\\b)'
		].join('|'),
		'gi'
	),

	diff: new RegExp(
		['(?<string>^\\+[^\\n]*)', '(?<comment>^-[^\\n]*)', '(?<meta>^@@[^\\n]*)'].join('|'),
		'gm'
	)
};

const ALIASES: Record<string, string> = {
	py: 'python',
	python3: 'python',
	ipython: 'python',
	js: 'clike',
	javascript: 'clike',
	jsx: 'clike',
	ts: 'clike',
	typescript: 'clike',
	tsx: 'clike',
	svelte: 'clike',
	java: 'clike',
	c: 'clike',
	cpp: 'clike',
	'c++': 'clike',
	cs: 'clike',
	csharp: 'clike',
	go: 'clike',
	golang: 'clike',
	rust: 'clike',
	rs: 'clike',
	swift: 'clike',
	kotlin: 'clike',
	scala: 'clike',
	sh: 'bash',
	shell: 'bash',
	zsh: 'bash',
	console: 'bash',
	terminal: 'bash',
	yml: 'yaml',
	toml: 'yaml',
	ini: 'yaml',
	conf: 'yaml',
	postgres: 'sql',
	postgresql: 'sql',
	mysql: 'sql',
	sqlite: 'sql',
	patch: 'diff'
};

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

/** 対応言語の一覧。テストと、対応状況をドキュメントに書くために公開する。 */
export const supportedLanguages: string[] = [
	...Object.keys(GRAMMARS),
	...Object.keys(ALIASES)
].sort();

export function highlight(code: string, lang: string): string {
	const key = String(lang ?? '').toLowerCase();
	const grammar = GRAMMARS[ALIASES[key] ?? key];
	if (!grammar) return escapeHtml(code);

	grammar.lastIndex = 0;
	let out = '';
	let last = 0;
	let match: RegExpExecArray | null;

	while ((match = grammar.exec(code)) !== null) {
		// 空マッチで無限ループしないように
		if (match[0] === '') {
			grammar.lastIndex++;
			continue;
		}
		const groups = match.groups ?? {};
		const kind = Object.keys(groups).find((name) => groups[name] !== undefined);
		if (!kind) continue;
		out +=
			escapeHtml(code.slice(last, match.index)) +
			`<span class="t-${kind}">${escapeHtml(match[0])}</span>`;
		last = match.index + match[0].length;
	}

	return out + escapeHtml(code.slice(last));
}
