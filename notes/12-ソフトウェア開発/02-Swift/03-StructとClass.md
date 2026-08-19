---
title: StructとClass
status: 執筆済
tags: [ソフトウェア開発, Swift]
---

# StructとClass

[[ソフトウェア開発/Swift/値型と参照型|値型と参照型]]の具体的な違い。

## 機能の比較

| 機能 | struct | class |
| --- | --- | --- |
| プロパティ、メソッド | ○ | ○ |
| [[ソフトウェア開発/Swift/Protocol\|プロトコル]]準拠 | ○ | ○ |
| [[ソフトウェア開発/Swift/Extension\|拡張]] | ○ | ○ |
| **継承** | × | ○ |
| **同一性** (`===`) | × | ○ |
| deinit | × | ○ |
| メンバーワイズ初期化子の自動生成 | **○** | × |
| 参照カウント | 不要 | [[ソフトウェア開発/Swift/ARC\|ARC]] |

## mutating

struct のメソッドが自身を変更するには `mutating` が要る。

```swift
struct Counter {
    var count = 0
    mutating func increment() { count += 1 }
}
let c = Counter()
// c.increment()  → エラー。let なので変更できない
```

**変更するかどうかが型に現れる**ので、
呼び出し側で意図が分かる。
class にこの区別は無い（`let` でも中身は変えられる）。

## 継承より合成

Swift は継承を積極的には勧めない。

| 問題 | 内容 |
| --- | --- |
| 密結合 | 親の変更が子すべてに影響する |
| 単一継承 | 1 つしか継承できない |
| 脆い基底クラス | 親の内部実装に子が依存する |

代わりに
[[ソフトウェア開発/Swift/Protocol|プロトコル]]と
[[ソフトウェア開発/Swift/Extension|拡張]]で
**必要な機能だけを合成する**。

```swift
protocol Drawable { func draw() }
extension Drawable { func draw() { /* 既定実装 */ } }
struct Circle: Drawable { }   // 多重に準拠できる
```

## final

継承しないクラスには `final` を付ける。
動的ディスパッチが静的ディスパッチになり、
インライン展開が可能になるため速くなる。

## 参考文献

- Apple. *The Swift Programming Language*. <https://docs.swift.org/swift-book/>
- Apple. Choosing Between Structures and Classes. <https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes>
