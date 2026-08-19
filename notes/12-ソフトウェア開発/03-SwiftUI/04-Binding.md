---
title: Binding
status: 執筆済
tags: [ソフトウェア開発, SwiftUI]
---

# Binding

**他の場所が所有する状態への、読み書き可能な参照。**

```swift
struct Parent: View {
    @State private var text = ""
    var body: some View {
        Child(text: $text)      // $ で Binding を作る
    }
}
struct Child: View {
    @Binding var text: String
    var body: some View { TextField("入力", text: $text) }
}
```

## 実体

```swift
struct Binding<Value> {
    var get: () -> Value
    var set: (Value) -> Void
}
```

**値そのものではなく、読み書きの手続きの組**。
だからコピーされても同じ場所を指す。

## $ の意味

``State` などのプロパティラッパは
`projectedValue` を持ち、`$` でそれを取り出す。

```
count    → 値そのもの (Int)
$count   → Binding<Int>
```

言語機能（プロパティラッパ）の上に構築されていて、
SwiftUI 専用の構文ではない。

## 派生 Binding

```swift
// 変換した Binding
$user.name                            // キーパスで潜れる
Binding(get: { x > 0 }, set: { x = $0 ? 1 : 0 })
```

## 使いどころの原則

**子が親の状態を変更する必要があるときだけ渡す。**

読むだけなら普通の `let` で渡す。
Binding を渡すと「変更されるかもしれない」という
契約が生まれるので、必要以上に渡さない。

```swift
struct Row: View {
    let item: Item          // 表示するだけ
    @Binding var selected: UUID?   // 変更する
}
```

## 参考文献

- Apple. Binding — SwiftUI. <https://developer.apple.com/documentation/swiftui/binding>
- Swift Evolution SE-0258: Property Wrappers. <https://github.com/swiftlang/swift-evolution/blob/main/proposals/0258-property-wrappers.md>
