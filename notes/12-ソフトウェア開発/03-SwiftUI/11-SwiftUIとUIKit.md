---
title: SwiftUIとUIKit
status: 執筆済
tags: [ソフトウェア開発, SwiftUI]
---

# SwiftUIとUIKit

両者は共存し、相互に埋め込める。

## 対比

| | UIKit | SwiftUI |
| --- | --- | --- |
| 様式 | 命令的 | 宣言的 |
| View | 参照型のオブジェクト | **値型の記述** |
| 更新 | 自分で行う | 状態から導出される |
| 対応 OS | iOS 2 以降 | iOS 13 以降 |
| 成熟度 | 高い | 発展途上 |
| 細かい制御 | **可能** | 限界がある |

## 相互運用

```swift
// UIKit の View を SwiftUI で使う
struct MapViewWrapper: UIViewRepresentable {
    func makeUIView(context: Context) -> MKMapView { MKMapView() }
    func updateUIView(_ view: MKMapView, context: Context) { ... }
}

// SwiftUI の View を UIKit で使う
let hosting = UIHostingController(rootView: ContentView())
```

`Coordinator` がデリゲートを受け持ち、
命令的な世界と宣言的な世界の橋渡しをする。

## 使い分け

| 状況 | 選択 |
| --- | --- |
| 新規、対応 OS が新しい | SwiftUI |
| 既存の大規模アプリ | UIKit を保ち、部分的に SwiftUI |
| 細かい描画・スクロール制御 | UIKit |
| 複雑なテキスト編集 | UIKit |
| 標準的な画面 | **SwiftUI が圧倒的に速く書ける** |

## SwiftUI の限界

- 内部実装が隠蔽されており、**回避策が見つからないことがある**
- OS バージョンごとに挙動が変わる
- 性能問題の原因が特定しにくい（再描画の追跡が難しい）

`Instruments` の SwiftUI テンプレートや
`_printChanges()` で再描画の原因を調べられるが、
UIKit ほど透明ではない。

**「宣言的にできない部分だけ UIKit に降りる」**のが
現実的な方針。

## 参考文献

- Apple. UIViewRepresentable — SwiftUI. <https://developer.apple.com/documentation/swiftui/uiviewrepresentable>
- Apple. UIHostingController — SwiftUI. <https://developer.apple.com/documentation/swiftui/uihostingcontroller>
