---
title: Generics
status: 執筆済
tags: [ソフトウェア開発, Swift]
---

# Generics

**型をパラメータにする。**
同じロジックを、型ごとに書き直さずに済ませる。

```swift
func swapValues<T>(_ a: inout T, _ b: inout T) {
    let tmp = a; a = b; b = tmp
}
```

## 型制約

```swift
func maxOf<T: Comparable>(_ a: T, _ b: T) -> T {
    a > b ? a : b
}
```

`T` に何でも入れられるわけではない。
`>` を使うには `Comparable` が要る。

**制約が「この型に何ができるか」を宣言する。**
実装を見なくても、シグネチャから分かる。

## 型消去との違い

Java のジェネリクスは型消去（実行時には Object になる）だが、
Swift は**特殊化**する。

```
Array<Int> → Int 専用のコードを生成（可能な場合）
```

ボックス化が不要で、
**抽象化のコストを払わずに済む**（zero-cost abstraction）。
モジュールをまたぐ場合は ``inlinable` が必要になることがある。

## where 句

```swift
extension Array where Element: Numeric {
    var total: Element { reduce(0, +) }
}

func allEqual<C: Collection>(_ c: C) -> Bool
    where C.Element: Equatable { ... }
```

関連型にも制約をかけられる。

## 不透明型と存在型

```swift
func makeShape() -> some Shape   // 具体的な1つの型（呼び出し側は知らない）
func makeShape() -> any Shape    // 実行時に決まる。ボックス化
```

| | `some` | `any` |
| --- | --- | --- |
| 型 | 単一で固定 | 複数を混在できる |
| ディスパッチ | 静的 | 動的 |
| コスト | 無い | ボックス化 |

配列に異なる具象型を混ぜたいときは `any`、
そうでなければ `some` が速い。

## 参考文献

- Apple. *The Swift Programming Language*. <https://docs.swift.org/swift-book/>
- Swift Evolution SE-0244: Opaque Result Types. <https://github.com/swiftlang/swift-evolution/blob/main/proposals/0244-opaque-result-types.md>
