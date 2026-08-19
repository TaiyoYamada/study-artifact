---
title: CSS
status: 執筆済
tags: [ソフトウェア開発, Web]
---

# CSS

**文書の見た目を指定する言語。**

```css
.card {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
}
```

## カスケードと詳細度

同じ要素に複数の規則が当たったとき、どれが勝つか。

```
1. 重要度      !important
2. 詳細度      ID(1,0,0) > class(0,1,0) > 要素(0,0,1)
3. 記述順      後に書いた方
```

詳細度の競争になると保守できなくなるので、
**詳細度を低く保つ**のが現代の指針。
`!important` は最後の手段。

## レイアウト

| 方式 | 適する対象 |
| --- | --- |
| **Flexbox** | 1 次元（行または列） |
| **Grid** | 2 次元（行と列） |
| position | 特殊な配置 |
| float | 回り込み（本来の用途） |

Flexbox と Grid の登場前は、
float や table で無理にレイアウトしていた。
現在は用途に応じて使い分ければよい。

## カスタムプロパティ

```css
:root { --accent: #27459a; }
.button { background: var(--accent); }
```

**実行時に変更でき、継承する**のが
プリプロセッサの変数との違い。
テーマ切り替えやコンポーネント単位の調整に使える。

## 相対単位

| 単位 | 基準 |
| --- | --- |
| `rem` | ルートの文字サイズ。**利用者の設定に追従する** |
| `em` | 親の文字サイズ |
| `%` | 親の寸法 |
| `vw` / `vh` / `dvh` | ビューポート |
| `ch` | 文字幅。行長の指定に有効 |

`px` で文字サイズを固定すると、
**文字を大きくしたい利用者の設定を無視する**ことになる。

## 現代的な機能

- ``container` — 親要素の幅に応じたスタイル
- `:has()` — 子を条件にした親の選択
- ``media (prefers-color-scheme)` — ダークモード
- ``media (prefers-reduced-motion)` — 動きの低減

利用者の設定を尊重する仕組みが増えている。

## 参考文献

- MDN Web Docs. CSS: Cascading Style Sheets. <https://developer.mozilla.org/en-US/docs/Web/CSS>
- W3C CSS Working Group. CSS Specifications. <https://www.w3.org/Style/CSS/specs.en.html>
- web.dev. Learn CSS. <https://web.dev/learn/css>
