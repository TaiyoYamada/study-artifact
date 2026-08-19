---
title: Extension
status: 執筆済
tags: [ソフトウェア開発, Swift]
---

# Extension

**既存の型に、後から機能を追加する。**
ソースコードを持っていない型にも適用できる。

```swift
extension String {
    var isBlank: Bool { trimmingCharacters(in: .whitespaces).isEmpty }
}
extension Int {
    func times(_ body: () -> Void) { for _ in 0..<self { body() } }
}
```

## できること・できないこと

| できる | できない |
| --- | --- |
| メソッド、計算プロパティ | **格納プロパティ** |
| イニシャライザ | `deinit` |
| ネスト型 | 既存メソッドの上書き |
| [[ソフトウェア開発/Swift/Protocol\|プロトコル]]準拠 | — |

格納プロパティを追加できないのは、
**型のメモリレイアウトを変えてしまう**から。
すでにコンパイルされたコードが壊れる。

## 用途

### 準拠の分離

```swift
struct User { let id: String; let name: String }

extension User: Equatable { }
extension User: Codable { }
```

型の本体と、プロトコル準拠を分けて書ける。
**関心ごとにコードをまとめられる。**

### 制約付き拡張

```swift
extension Array where Element: Numeric {
    var sum: Element { reduce(0, +) }
}
```

条件を満たす場合だけ機能を足せる。
[[ソフトウェア開発/Swift/Generics|ジェネリクス]]と組み合わせると強力。

## 注意

- 名前が衝突しやすい。ライブラリでは接頭辞を検討する
- 拡張だらけにすると、
  **その型が何をできるのか把握しにくくなる**
- 拡張のメソッドは静的にディスパッチされる（プロトコル要件でない場合）。
  期待した動的ディスパッチにならないことがある

## 参考文献

- Apple. *The Swift Programming Language*. <https://docs.swift.org/swift-book/>
- Apple. Swift API Design Guidelines. <https://www.swift.org/documentation/api-design-guidelines/>
