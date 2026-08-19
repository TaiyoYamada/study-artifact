---
title: Optional
status: 執筆済
tags: [ソフトウェア開発, Swift]
---

# Optional

**「値が無いかもしれない」ことを型で表す。**

```swift
var name: String   = "Swift"   // 必ず値がある
var nick: String?  = nil       // 無いかもしれない
```

## 実体は Enum

```swift
enum Optional<Wrapped> {
    case none
    case some(Wrapped)
}
```

特別な言語機能ではなく、
[[ソフトウェア開発/Swift/Enum|列挙型]]と
[[ソフトウェア開発/Swift/Generics|ジェネリクス]]で表現されている。
`?` は糖衣構文。

## 何を解決したのか

Hoare が自ら「10 億ドルの誤り」と呼んだ null 参照。
問題は**型が嘘をつく**ことにある。

```
String と宣言されているのに null かもしれない
  → 使う側は毎回チェックすべきだが、忘れる
  → 実行時に落ちる
```

Optional は「無いかもしれない」を型に持ち上げ、
**コンパイラがチェックを強制する**。

## 扱い方

```swift
// オプショナルバインディング
if let n = nick { print(n) }

// 早期脱出
guard let n = nick else { return }

// 既定値
let display = nick ?? "no name"

// オプショナルチェーン
let count = nick?.count        // Int? になる

// 強制アンラップ — nil なら実行時クラッシュ
let forced = nick!
```

## 強制アンラップの位置づけ

`!` は「絶対に nil でない」という**主張**であり、
外れればクラッシュする。

正当化できるのは

- IBOutlet のように、初期化の順序が言語で表せない場合
- 直前で検査済みで、論理的にありえない場合

それ以外では `guard let` を使う。
**クラッシュは最悪の失敗ではない**（静かな誤動作より良い）が、
避けられるなら避ける。

## 参考文献

- Apple. *The Swift Programming Language*. <https://docs.swift.org/swift-book/>
- Tony Hoare. Null References: The Billion Dollar Mistake. QCon London, 2009. <https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/>
