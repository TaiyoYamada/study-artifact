---
title: MVVM
status: 執筆済
tags: [ソフトウェア開発, 設計]
---

# MVVM

**Model-View-ViewModel。**
Microsoft が WPF 向けに 2005 年頃に提唱した。

```
[Model]      データと業務ロジック
   ↑ ↓
[ViewModel]  表示用の状態と、View からの操作を受ける
   ↑ ↓ （バインディング）
[View]       表示だけ
```

## MVC との違い

[[ソフトウェア開発/ソフトウェア設計/MVC|MVC]] の Controller が
View を明示的に更新するのに対し、
ViewModel は**View を知らない**。

```
Controller: view.label.text = "..."     ← View を直接触る
ViewModel : @Published var title: String ← 状態を公開するだけ
```

View がその状態を監視して自分を更新する。
**依存が View → ViewModel の一方向**になる。

## 利点

| 利点 | 内容 |
| --- | --- |
| **テストしやすい** | ViewModel は UI に依存しないので単体テストできる |
| 表示ロジックの置き場所ができる | 日付の書式、状態の判定 |
| View が薄くなる | 宣言だけになる |

## ViewModel が持つもの

```swift
@Observable
final class SearchViewModel {
    var query = ""
    var results: [Item] = []
    var isLoading = false
    var errorMessage: String?

    func search() async { ... }
}
```

**表示のための状態**であって、業務ロジックそのものではない。
業務ロジックは Model 側に置く。

## 落とし穴

| 問題 | 内容 |
| --- | --- |
| Massive ViewModel | 結局肥大化する。責務を分ける必要は消えない |
| 何でも ViewModel | 単純な画面には過剰 |
| Model の不在 | ViewModel が API 呼び出しまで持つと元の木阿弥 |

## SwiftUI での位置づけ

[[ソフトウェア開発/SwiftUI|SwiftUI]] は
バインディングを言語機能として持つため、
MVVM が自然に載る。

一方で、
**単純な画面に ViewModel を作るのは過剰**という議論もある。
Apple 自身のサンプルは
[[ソフトウェア開発/SwiftUI/Observable|@Observable]] なモデルを
直接 View から使う形が多い。

**画面の複雑さに応じて判断する。**

## 参考文献

- John Gossman. Introduction to Model/View/ViewModel pattern for building WPF apps. 2005. <https://learn.microsoft.com/en-us/archive/blogs/johngossman/introduction-to-modelviewviewmodel-pattern-for-building-wpf-apps>
- Martin Fowler. Presentation Model. <https://martinfowler.com/eaaDev/PresentationModel.html>
- Martin Fowler. *Patterns of Enterprise Application Architecture*. Addison-Wesley, 2002.
