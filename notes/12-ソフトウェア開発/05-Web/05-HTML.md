---
title: HTML
status: 執筆済
tags: [ソフトウェア開発, Web]
---

# HTML

**文書の構造を表すマークアップ言語。**
見た目ではなく**意味**を書く。

```html
<article>
  <h1>見出し</h1>
  <p>本文と<a href="/link">リンク</a>。</p>
</article>
```

## セマンティクス

```html
<div class="header">      ← 機械には意味が分からない
<header>                  ← ヘッダだと分かる
```

意味のある要素を使うと

| 恩恵 | 内容 |
| --- | --- |
| **アクセシビリティ** | スクリーンリーダーが構造を伝えられる |
| SEO | 検索エンジンが内容を理解する |
| 既定の挙動 | `<button>` はキーボードで押せる |
| 保守性 | 構造が読み取れる |

`<div onclick>` でボタンを作ると、
キーボード操作、フォーカス、
支援技術への通知をすべて自分で実装することになる。
**`<button>` を使えば全部付いてくる。**

## フォーム

```html
<label for="email">メール</label>
<input id="email" type="email" required autocomplete="email">
```

- `<label>` の関連付けで、ラベルを押しても入力できる
- `type` が適切だと、モバイルで適したキーボードが出る
- `autocomplete` で自動入力が働く

**細部が使いやすさを大きく左右する。**

## アクセシビリティ

| 指針 | 内容 |
| --- | --- |
| 見出しを順に使う | h1 → h2 → h3。飛ばさない |
| `alt` を書く | 装飾画像は `alt=""` |
| **ARIA より標準要素** | 「ARIA を使わないのが最良の ARIA」 |
| 色だけに頼らない | 色覚特性 |
| キーボードで操作できる | Tab で辿れるか |

WCAG が国際的な基準で、
公共性の高いサイトでは法的要件になる国もある。

## 寛容な解析

HTML は壊れていても表示される。
閉じタグを忘れても、ブラウザが補う。

この寛容さが普及を助けたが、
**ブラウザごとに補い方が違う**問題を生んだ。
HTML5 は誤り処理まで仕様化してこれを解決した。

## 参考文献

- WHATWG. HTML Living Standard. <https://html.spec.whatwg.org/multipage/>
- MDN Web Docs. HTML: HyperText Markup Language. <https://developer.mozilla.org/en-US/docs/Web/HTML>
- W3C. Web Content Accessibility Guidelines (WCAG) 2.2. <https://www.w3.org/TR/WCAG22/>
