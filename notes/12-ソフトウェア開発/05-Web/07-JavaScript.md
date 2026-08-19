---
title: JavaScript
status: 執筆済
tags: [ソフトウェア開発, Web]
---

# JavaScript

ブラウザで動く唯一の言語として始まり、
今はサーバでも動く汎用言語。

## 特徴

| 特徴 | 内容 |
| --- | --- |
| 動的型付け | 実行時に型が決まる |
| **プロトタイプベース** | クラスではなくオブジェクトを継承する |
| 第一級関数 | 関数を値として扱える |
| **単一スレッド + イベントループ** | 並行だが並列ではない |
| 自動メモリ管理 | GC |

## 有名な奇妙さ

```js
0.1 + 0.2 === 0.30000000000000004   // IEEE 754 の性質（他言語も同じ）
[] + {}      // "[object Object]"
NaN !== NaN  // 仕様どおり
typeof null  // "object" — 初期実装のバグが互換のため残っている
```

多くは**後方互換のために直せない**。
Web は「壊さない」ことを最優先にしてきた。

`===`（厳密等価）を使う、`let`/`const` を使う、
といった規律で回避する。

## イベントループ

```
コールスタックが空になる
  → マイクロタスク（Promise）を**すべて**処理
  → 必要なら描画
  → マクロタスク（setTimeout、I/O）を**1 つ**処理
  → 繰り返す
```

マイクロタスクが優先されるので、
Promise の連鎖は `setTimeout(0)` より先に処理される。

**同期処理が長いと画面が固まる。**
1 フレーム 16.7 ms を超える処理は分割するか Worker へ。

## 非同期

```js
const res  = await fetch(url);
const data = await res.json();
```

[[ソフトウェア開発/アプリ開発/非同期処理|async/await]] は
Promise の糖衣構文。
背後では `then` の連鎖になっている。

## TypeScript

型注釈を加えた上位互換の言語。
コンパイル時に型を検査し、
実行時には**型情報が消える**（型消去）。

大規模なコードでは事実上の標準になっている。
[[コンピュータ/プログラミング言語/型システム|健全性]]は
意図的に犠牲にしており、
型が付いても実行時に壊れることはある。

## 参考文献

- ECMA-262: ECMAScript Language Specification. <https://tc39.es/ecma262/>
- MDN Web Docs. JavaScript. <https://developer.mozilla.org/en-US/docs/Web/JavaScript>
- Axel Rauschmayer. Exploring JS（JavaScript の各種書籍を全文公開）. <https://exploringjs.com/>
