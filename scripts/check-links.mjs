#!/usr/bin/env node
/**
 * notes/ に書かれた外部リンクが実在するか確かめる。
 *
 * ノートの価値は出典の確かさで決まるので、リンク切れや存在しない論文 URL を
 * 混入させないための歯止めとして CI から回す。
 *
 *   node scripts/check-links.mjs            変更されたノートだけ調べる
 *   node scripts/check-links.mjs --all      全ノートを調べる
 *   node scripts/check-links.mjs --json     結果を JSON で出す
 *
 * 結果は .cache/link-check.json に残し、一度通った URL は再確認しない。
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const NOTES = join(ROOT, 'notes');
const CACHE_FILE = join(ROOT, '.cache', 'link-check.json');

const args = process.argv.slice(2);
const checkAll = args.includes('--all');
const asJson = args.includes('--json');

/** 一度確認できた URL は覚えておき、毎回叩かない。 */
const CACHE_TTL_DAYS = 30;
let cache = {};
if (existsSync(CACHE_FILE)) {
	try {
		cache = JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
	} catch {
		cache = {};
	}
}

function walk(dir) {
	const out = [];
	for (const name of readdirSync(dir)) {
		const full = join(dir, name);
		if (statSync(full).isDirectory()) out.push(...walk(full));
		else if (name.endsWith('.md')) out.push(full);
	}
	return out;
}

/** Markdown からリンクを拾う。`[表示](url)` と生の URL の両方。 */
function extractLinks(markdown) {
	const found = new Set();

	// コードブロックの中は対象外
	const body = markdown.replace(/```[\s\S]*?```/g, '');

	for (const m of body.matchAll(/\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/g)) found.add(m[1]);
	for (const m of body.matchAll(/<(https?:\/\/[^\s>]+)>/g)) found.add(m[1]);

	return [...found];
}

async function probe(url) {
	// HEAD を弾くサイトがあるので、失敗したら GET で確かめ直す
	for (const method of ['HEAD', 'GET']) {
		try {
			const response = await fetch(url, {
				method,
				redirect: 'follow',
				headers: {
					// 素の fetch を弾く配信元があるため、ふつうのブラウザとして名乗る
					'user-agent':
						'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
					accept: 'text/html,application/xhtml+xml,application/pdf,*/*'
				},
				signal: AbortSignal.timeout(20_000)
			});
			if (response.ok) return { ok: true, status: response.status };
			// 405/403 は方法の問題なので GET で試す価値がある
			if (method === 'HEAD' && [403, 405, 501].includes(response.status)) continue;
			return { ok: false, status: response.status };
		} catch (error) {
			if (method === 'GET') return { ok: false, status: 0, error: String(error.message ?? error) };
		}
	}
	return { ok: false, status: 0 };
}

const files = walk(NOTES);
const targets = new Map(); // url -> [file, ...]

for (const file of files) {
	for (const url of extractLinks(readFileSync(file, 'utf8'))) {
		if (!targets.has(url)) targets.set(url, []);
		targets.get(url).push(file.replace(`${ROOT}/`, ''));
	}
}

const now = Date.now();
const fresh = (entry) => entry && entry.ok && now - entry.checkedAt < CACHE_TTL_DAYS * 864e5;

const queue = [...targets.keys()].filter((url) => checkAll || !fresh(cache[url]));
const skipped = targets.size - queue.length;

if (!asJson) {
	console.log(`ノート ${files.length} 本、リンク ${targets.size} 件`);
	if (skipped) console.log(`  ${skipped} 件は確認済みなので省略 (--all で全件)`);
	if (queue.length) console.log(`  ${queue.length} 件を確認中…`);
}

const failures = [];
const CONCURRENCY = 8;

for (let i = 0; i < queue.length; i += CONCURRENCY) {
	const batch = queue.slice(i, i + CONCURRENCY);
	const results = await Promise.all(batch.map((url) => probe(url).then((r) => [url, r])));

	for (const [url, result] of results) {
		cache[url] = { ok: result.ok, status: result.status, checkedAt: now };
		if (!result.ok) {
			failures.push({ url, status: result.status, error: result.error, files: targets.get(url) });
			if (!asJson) console.log(`  ✗ ${result.status || 'ERR'}  ${url}`);
		}
	}
}

mkdirSync(dirname(CACHE_FILE), { recursive: true });
writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));

if (asJson) {
	console.log(JSON.stringify({ files: files.length, links: targets.size, failures }, null, 2));
} else if (failures.length === 0) {
	console.log(`✓ リンク切れなし`);
} else {
	console.log(`\n✗ ${failures.length} 件が到達できません:`);
	for (const f of failures) {
		console.log(`   ${f.url}`);
		console.log(`     状態: ${f.status || f.error}`);
		for (const file of f.files) console.log(`     ← ${file}`);
	}
}

process.exit(failures.length === 0 ? 0 : 1);
