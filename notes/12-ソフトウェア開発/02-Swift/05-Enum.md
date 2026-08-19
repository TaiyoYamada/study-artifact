---
title: Enum
status: 執筆済
tags: [ソフトウェア開発, Swift]
---

# Enum

**取りうる値を列挙して型にする。**
Swift の enum は他言語のものより強力で、代数的データ型に近い。

```swift
enum Direction { case north, south, east, west }
```

## 関連値

各ケースが**異なる型のデータを持てる**。

```swift
enum Result<Success, Failure: Error> {
    case success(Success)
    case failure(Failure)
}

enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}
```

これにより「状態と、その状態でのみ意味を持つデータ」を
**一体で表現できる**。

```swift
enum LoadState {
    case idle
    case loading
    case loaded(items: [Item])
    case failed(Error)
}
```

`isLoading` と `items` と `error` を
別々のプロパティで持つと、
「loading なのに items がある」といった
**ありえない状態が表現できてしまう**。
enum はそれを型で禁止する。

## 網羅性

```swift
switch state {
case .idle: ...
case .loading: ...
case .loaded(let items): ...
case .failed(let e): ...
}
```

`default` を書かなければ、
**ケースを追加したときに全 switch がエラーになる**。
対応漏れを機械が見つける。

これが enum の実務上最大の利点で、
`default` を安易に書くとその恩恵を失う。

## 再帰的な列挙

`indirect` を付けると再帰的な構造を作れる。

```swift
indirect enum Expr {
    case number(Int)
    case add(Expr, Expr)
    case multiply(Expr, Expr)
}
```

[[コンピュータ/プログラミング言語/抽象構文木|AST]] の表現に
そのまま使える。

## 参考文献

- Apple. *The Swift Programming Language*. <https://docs.swift.org/swift-book/>
- Swift Evolution SE-0155: Normalize Enum Case Representation. <https://github.com/swiftlang/swift-evolution/blob/main/proposals/0155-normalize-enum-case-representation.md>
