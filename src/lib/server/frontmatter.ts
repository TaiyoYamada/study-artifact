/**
 * ノート冒頭の `---` ブロックを読む。
 *
 * YAML の全体ではなく、ノートに実際に書く 2 つの形だけを解釈する。
 *   key: value
 *   key: [a, b, c]
 * これ以上が必要になったら YAML パーサを入れる判断をする。
 */

export type FrontmatterValue = string | string[];

export interface Frontmatter {
	data: Record<string, FrontmatterValue>;
	body: string;
}

function unquote(value: string): string {
	return value.replace(/^(["'])([\s\S]*)\1$/, '$2');
}

export function parseFrontmatter(source: string): Frontmatter {
	const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/);
	if (!match) return { data: {}, body: source };

	const data: Record<string, FrontmatterValue> = {};
	for (const line of match[1]!.split(/\r?\n/)) {
		const pair = line.match(/^([A-Za-z0-9_-]+)[ \t]*:[ \t]*(.*)$/);
		if (!pair) continue;

		const raw = pair[2]!.trim();
		data[pair[1]!] =
			raw.startsWith('[') && raw.endsWith(']')
				? raw
						.slice(1, -1)
						.split(',')
						.map((item) => unquote(item.trim()))
						.filter(Boolean)
				: unquote(raw);
	}

	return { data, body: source.slice(match[0].length) };
}

/** frontmatter の値を文字列として取り出す。配列だったときは先頭を返す。 */
export function readString(data: Record<string, FrontmatterValue>, key: string): string {
	const value = data[key];
	if (value === undefined) return '';
	return Array.isArray(value) ? (value[0] ?? '') : value;
}

/** frontmatter の値を文字列配列として取り出す。 */
export function readList(data: Record<string, FrontmatterValue>, key: string): string[] {
	const value = data[key];
	if (value === undefined) return [];
	return Array.isArray(value) ? value : [value];
}
