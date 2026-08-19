# Study Notes

読んだ論文と勉強した内容を、`notes/` のディレクトリ構造そのままの階層で残すためのサイト。
SvelteKit で全ページを事前生成し、静的配信する。

```
notes/01-quantum-computing/01-vqa/01-spsa-implementation.md
  ↓ ビルド
/quantum-computing/vqa/spsa-implementation
```

## 使い方

```bash
npm install
npm run dev        # http://localhost:5173  notes/ を書き換えると即反映される
```

### ノートを増やす

`notes/` の好きな深さに `.md` を置くだけ。

```bash
cp templates/note.md notes/01-quantum-computing/01-vqa/04-新しい論文.md

mkdir notes/02-machine-learning
cp templates/index.md notes/02-machine-learning/index.md
```

決まりごとは 3 つだけ。

| 規則                | 意味                                                  |
| ------------------- | ----------------------------------------------------- |
| ディレクトリ = 階層 | ネストがそのままサイドバーのツリーと URL になる       |
| `index.md`          | そのディレクトリ自身のページ。URL に `index` は出ない |
| 先頭の `01-`        | 並び順のためだけのもの。URL にもタイトルにも出ない    |

`_` で始まるファイルとディレクトリは下書き扱いで、ビルドに含まれない。

### frontmatter

すべて任意。書いたものだけがノート冒頭のチップとして出る。

```yaml
---
title: 論文タイトル # 省略時は本文先頭の h1、それも無ければファイル名
status: 読了 # 「読了/done/完了」を含むと緑、それ以外は橙
date: 2026-03-07
source: IEEE TRANS. AEROSPACE AND ELECTRONIC SYSTEMS, 1998年
cite: Spall, 1998
tags: [SPSA, 確率的最適化]
summary: 1〜2 文の要約。ノート冒頭と、親階層の一覧に出る
order: 10 # ファイル名の番号より優先される
---
```

### 本文に書けるもの

- **数式** — `$a_k = a/(A+k+1)^\alpha$` と `$$ … $$`。ビルド時に MathML へ変換するので、閲覧側に JavaScript もフォントの追加ダウンロードも要らない。リテラルのドル記号は `\$`。
- **ノート間リンク** — `[[quantum-computing/vqa/spsa-implementation]]`、表示名を変えるなら `[[slug|SPSA]]`。相対 `.md` リンクも解決される。
- **コード** — 言語を書くと色が付く（python / clike 系 / bash / json / yaml / sql / diff とその別名）。
- **callout** — `> [!note] 見出し`。note / tip / important / warning / caution / todo / question。
- 表・脚注・チェックリストなど GitHub Markdown はそのまま通る。

## コマンド

| コマンド            | 内容                                            |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | 開発サーバー                                    |
| `npm run build`     | `build/` に全ページを事前生成                   |
| `npm run preview`   | 生成結果をローカルで配信                        |
| `npm run lint`      | Prettier の検査 + ESLint                        |
| `npm run format`    | Prettier で整形                                 |
| `npm run check`     | svelte-check による型検査                       |
| `npm run test:unit` | Vitest（Markdown パイプラインと階層の組み立て） |
| `npm run test:e2e`  | Playwright（build + preview に対して実行）      |
| `npm run verify`    | 上の検査をまとめて実行。CI と同じ内容           |

初回のみ `npx playwright install chromium` が必要。

## 構成

```
notes/                     Markdown。ここだけ触れば運用できる
templates/                 ノートと階層のひな形
src/
├─ app.css                 デザイン。配色・タイポグラフィはここの CSS 変数
├─ temml.css               Temml (LaTeX → MathML) 付属のスタイル
├─ lib/
│  ├─ search.ts            絞り込みとスコアリング（純粋関数）
│  ├─ search.svelte.ts     検索欄と結果一覧で共有する状態
│  ├─ components/          ツリー・検索・テーマ切替
│  └─ server/              ビルド時にだけ動く。クライアントには入らない
│     ├─ frontmatter.ts    `---` ブロックの読み取り
│     ├─ highlight.ts      シンタックスハイライト
│     ├─ markdown.ts       Markdown → HTML（数式・callout・リンク解決）
│     └─ notes.ts          notes/ → 階層ツリー・検索インデックス
└─ routes/
   ├─ [...slug]/           全ノートがこの 1 ルートに載る
   └─ search-index.json/   検索欄に触れたときだけ取得される
static/                    favicon と Temml のフォント
```

依存は実行時 2 つ（`marked`、`temml`）だけ。どちらもビルド時にしか動かないので、
閲覧側に届く JavaScript は SvelteKit のランタイムと自前のコードのみ。

### 設計上の決めごと

- **ツリーの開閉は `<details>`** に任せている。JavaScript を切っても階層を辿れる。
  狭い画面のドロワーも `:target` で開くので同じく JavaScript を要さない
  （クライアント遷移では `:target` が更新されないため、ハイドレーション後だけクラスで上書きしている）。
- **検索インデックスは遅延取得**。初期表示の転送量に乗せない。
- **数式はビルド時に MathML 化**。KaTeX と違いフォントを配らずに済む。
- **`paths.relative: false`**。`{@html}` で差し込む本文中のリンクは相対化の対象外なので、
  サイト全体を絶対パスに揃えてコンポーネント側と食い違わせない。

## デプロイ

事前生成した `build/` を静的配信するだけなので、どのホストでも動く。
既定では **CI を通過したその成果物**を Cloudflare Pages へ公開する。
検査したものと配信されるものが同じになるよう、公開用に再ビルドはしない。

### Cloudflare 側でやること

1. **API トークンを作る** — ダッシュボード右上のアイコン → Profile → API Tokens →
   Create Token → Custom token。権限は 1 つだけでよい:
   **Account / Cloudflare Pages / Edit**。生成後は再表示できないので控えておく。
2. **Account ID を控える** — Workers & Pages のページ右側に出ている。
3. **Pages プロジェクトを 1 つ作る** — Workers & Pages → Create application → Pages →
   Direct Upload。名前は `study-notes`（変えるなら次の手順で変数を設定する）。

### GitHub 側でやること

Settings → Secrets and variables → Actions で登録する。

| 種別   | 名前                      | 中身                                               |
| ------ | ------------------------- | -------------------------------------------------- |
| Secret | `CLOUDFLARE_API_TOKEN`    | 上で作ったトークン                                 |
| Secret | `CLOUDFLARE_ACCOUNT_ID`   | 上で控えたアカウント ID                            |
| 変数   | `CLOUDFLARE_PROJECT_NAME` | Pages のプロジェクト名（任意。既定 `study-notes`） |

登録するまでの間、公開ジョブは**失敗ではなく通知付きのスキップ**になる。

### 他のホストを使う場合

**Vercel** — フレームワークプリセットに SvelteKit を選び、出力ディレクトリは `build`。

**Cloudflare の Git 連携** — ダッシュボードでリポジトリを繋ぎ、
ビルドコマンド `npm run build`、出力ディレクトリ `build`、環境変数 `NODE_VERSION=22`。
この場合 Cloudflare 側はテストを走らせないので、公開がテスト通過に紐づかなくなる点に注意。

サブパス配信（`example.com/notes/` など）にする場合は、`vite.config.ts` の
`paths.base` を設定する。

## CI

`.github/workflows/ci.yml` が push と pull request で
Prettier → ESLint → svelte-check → Vitest → Playwright を通し、
`main` への push なら**そのすべてが通ったときだけ**公開ジョブへ進む。
コミット時には lint-staged が変更ファイルだけを整形する
（`npm run hooks:install` で有効化。`npm install` 時に自動で入る）。

依存の更新は Dependabot が毎週 pull request を出す。
