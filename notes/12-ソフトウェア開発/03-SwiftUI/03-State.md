---
title: State
status: 執筆済
tags: [ソフトウェア開発, SwiftUI]
---

# State

**View が所有する、変更されると再描画を引き起こす状態。**

```swift
struct Counter: View {
    @State private var count = 0
    var body: some View {
        Button("Count: \(count)") { count += 1 }
    }
}
```

## なぜ特別な仕組みが要るのか

[[ソフトウェア開発/SwiftUI/View|View は値型]]で、
更新のたびに作り直される。
普通のプロパティでは値が失われる。

``State` は値を**View の外（SwiftUI が管理する記憶域）**に置き、
View が作り直されても保持する。
そして変更を検知して再描画を促す。

```
View（作り直される）  ──→  State の実体（保持される）
```

## 使い方の原則

| 原則 | 理由 |
| --- | --- |
| **`private` にする** | この View が所有することを示す |
| 単純な値に使う | 参照型なら [[ソフトウェア開発/SwiftUI/Observable\|Observable]] |
| 初期値は宣言時に | 外から渡すものは `let` か [[ソフトウェア開発/SwiftUI/Binding\|Binding]] |
| 最小の範囲に置く | 上に置くほど再描画の範囲が広がる |

## 所有と参照の区別

```swift
@State   private var text = ""    // 自分が所有する
@Binding var text: String         // 他が所有するものを読み書きする
```

**所有者は 1 つ**という原則が
SwiftUI のデータフローの基本。
所有者が ``State` を持ち、
必要な子に `$` で [[ソフトウェア開発/SwiftUI/Binding|Binding]] を渡す。

## よくある誤り

```swift
// 外から渡した初期値が反映され続けると思ってしまう
@State private var name: String
init(name: String) { _name = State(initialValue: name) }
```

``State` の初期値は**最初の 1 回しか使われない**。
外の値の変化を反映したいなら、
`Binding` にするか `.onChange` で明示的に更新する。

## 参考文献

- Apple. State — SwiftUI. <https://developer.apple.com/documentation/swiftui/state>
- Apple. Managing user interface state. <https://developer.apple.com/documentation/swiftui/managing-user-interface-state>
