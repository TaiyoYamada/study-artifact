---
title: Study Notes
summary: 読んだ論文と勉強した内容を、分野ごとの階層に積み上げていく場所。左のツリーから辿るか、/ キーで検索する。
---

# Study Notes

読んだものを流さずに残すための場所。`notes/` の**ディレクトリ構造がそのまま階層**になり、1 枚の HTML に焼き上がる。

## 使い方

左のツリーが `notes/` の階層そのもの。<kbd>/</kbd> または <kbd>⌘K</kbd> で検索が開き、タイトル・タグ・本文を横断して絞り込める。ノート内の見出しは右の目次に出る。

## ノートを増やす

`notes/` の好きな深さに `.md` を置いて、ビルドし直すだけ。

```bash
# 新しいノート
cp templates/note.md notes/01-quantum-computing/01-vqa/04-新しい論文.md

# 新しい階層
mkdir notes/02-machine-learning
cp templates/index.md notes/02-machine-learning/index.md

node build.mjs
```

ファイル名・ディレクトリ名の先頭の `01-` は**並び順のためだけ**のもので、URL にもタイトルにも出ない。順番を変えたければ番号を振り直す。

## 書けるもの

数式は `$...$` と `$$...$$` で書ける。ビルド時に MathML へ静的変換されるので、閲覧側に JavaScript もフォントの追加ダウンロードも要らない。

$$\hat{\theta}_{k+1} = \hat{\theta}_k - a_k \hat{g}_k(\hat{\theta}_k)$$

コードブロックは言語を書けば色が付く。表・脚注・チェックリストなど GitHub Markdown はそのまま通る。

> [!note] ノート間のリンク
> `[[quantum-computing/vqa/spsa-implementation]]` のように二重角括弧で他のノートを参照できる。表示名を変えたいときは `[[slug|表示名]]`。

## 公開する

`node build.mjs` が `dist/study.html` を吐く。外部リソースを一切参照しない 1 枚の HTML なので、そのまま Claude の Artifact として publish できる。同じファイルパスで publish し直せば URL は変わらない。
