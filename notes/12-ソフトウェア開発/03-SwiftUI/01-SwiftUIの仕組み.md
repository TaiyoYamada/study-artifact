---
title: SwiftUIの仕組み
status: 執筆済
tags: [ソフトウェア開発, SwiftUI]
---

# SwiftUIの仕組み

## View は値型

```swift
struct ContentView: View {
    var body: some View { Text("Hello") }
}
```

`View` は `struct`。
UIKit の `UIView`（参照型のオブジェクト）とは根本的に違う。

**View は画面そのものではなく、
「こう表示してほしい」という記述**。
SwiftUI が実際の描画用の構造（レンダーツリー）を管理する。

だから View を何度作り直しても安い。

## some View と結果ビルダ

```swift
var body: some View {
    VStack {
        Text("A")
        Text("B")
    }
}
```

`some View` は[[ソフトウェア開発/Swift/Generics|不透明型]]。
具体的には `VStack<TupleView<(Text, Text)>>` のような
**巨大な型**になっているが、書き手は意識しなくてよい。

型が具体的なので**静的にディスパッチされ**、速い。

波括弧の中の複数行が 1 つの値にまとまるのは、
``ViewBuilder`（結果ビルダ）による変換。
[[ソフトウェア開発/Swift/Closure|末尾クロージャ]]と
組み合わさって宣言的な記法が成立している。

## 更新の流れ

```
状態が変わる
   ↓
依存している View の body を再評価する
   ↓
新旧の View 木を比較する
   ↓
差分だけを実際の描画に反映する
```

**`body` が呼ばれても、画面全体が描き直されるわけではない。**

## 同一性

差分計算のために、SwiftUI は View の「同一性」を追跡する。

| 種類 | 決まり方 |
| --- | --- |
| 構造的同一性 | View 木の中の位置 |
| 明示的同一性 | `.id()`、`ForEach` の `id` |

`ForEach` の `id` を配列の添字にすると、
挿入・削除で同一性がずれてアニメーションが乱れる。
**安定した ID を渡す**必要がある。

## 参考文献

- Apple. SwiftUI documentation. <https://developer.apple.com/documentation/swiftui>
- Apple. Demystify SwiftUI. WWDC 2021. <https://developer.apple.com/videos/play/wwdc2021/10022/>
