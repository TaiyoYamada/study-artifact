---
title: Protocol
status: 執筆済
tags: [ソフトウェア開発, Swift]
---

# Protocol

**型が満たすべき要件を定義する。** インタフェースにあたる。

```swift
protocol Identifiable {
    var id: String { get }
    func describe() -> String
}
```

## プロトコル指向

Swift の設計思想の中心。
**継承の階層を作るのではなく、能力を組み合わせる。**

```swift
struct User: Identifiable, Equatable, Codable, Sendable { }
```

値型（struct、enum）にも適用できるのが、
クラス継承との決定的な違い。

## 既定実装

[[ソフトウェア開発/Swift/Extension|extension]] で実装を与えられる。

```swift
extension Identifiable {
    func describe() -> String { "ID: \(id)" }
}
```

準拠する型は `id` だけ書けばよい。
**要件を減らしつつ機能を提供できる。**

## 関連型

```swift
protocol Container {
    associatedtype Item
    var count: Int { get }
    func item(at index: Int) -> Item
}
```

型のプレースホルダを持てる。
準拠する側が具体的な型を決める。

関連型を持つプロトコルは
**そのままでは型として使えない**
（存在型の制約）。
`some`（不透明型）や `any`（存在型）で扱う。

- `some Container` … 具体的な 1 つの型。静的ディスパッチ。速い
- `any Container` … 実行時に決まる。ボックス化のコストがある

## 標準ライブラリでの利用

`Equatable`、`Comparable`、`Hashable`、
`Codable`、`Sequence`、`Collection` など、
標準ライブラリの多くがプロトコルで構成されている。

`Codable` に準拠するだけで
JSON との相互変換がコンパイラ生成されるのは、
プロトコルとコード生成を組み合わせた設計。

## 参考文献

- Apple. *The Swift Programming Language*. <https://docs.swift.org/swift-book/>
- Apple. Protocol-Oriented Programming in Swift. WWDC 2015. <https://developer.apple.com/videos/play/wwdc2015/408/>
- Swift Evolution SE-0335: Introduce existential `any`. <https://github.com/swiftlang/swift-evolution/blob/main/proposals/0335-existential-any.md>
