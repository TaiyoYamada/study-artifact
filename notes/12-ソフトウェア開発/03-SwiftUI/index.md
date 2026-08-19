---
title: SwiftUI
status: 執筆済
summary: 宣言的UIフレームワーク。画面を状態の関数として表すので、更新し忘れが起きない。
tags: [ソフトウェア開発, SwiftUI]
---

# SwiftUI

Apple の**宣言的 UI フレームワーク**。2019 年発表。

## 命令的との違い

```swift
// 命令的 (UIKit)
label.text = name          // 変わるたびに自分で更新する
if isHidden { label.isHidden = true }

// 宣言的 (SwiftUI)
if !isHidden { Text(name) }   // 状態から画面を導出する
```

$$\text{画面} = f(\text{状態})$$

**「更新し忘れ」が原理的に起きない**のが最大の利点。
命令的 UI のバグの多くは、状態と表示のずれから生じる。

## 中心概念

| 概念 | 役割 |
| --- | --- |
| [[ソフトウェア開発/SwiftUI/View\|View]] | 画面の**設計図**。実体ではない |
| [[ソフトウェア開発/SwiftUI/State\|State]] | View が所有する状態 |
| [[ソフトウェア開発/SwiftUI/Binding\|Binding]] | 他が所有する状態への読み書き |
| [[ソフトウェア開発/SwiftUI/Observable\|Observable]] | 参照型のモデルの変更通知 |
| [[ソフトウェア開発/SwiftUI/Environment\|Environment]] | 階層を通した暗黙の受け渡し |

## 構成

- [[ソフトウェア開発/SwiftUI/SwiftUIの仕組み|仕組み]]・[[ソフトウェア開発/SwiftUI/データフロー|データフロー]]
- [[ソフトウェア開発/SwiftUI/Navigation|Navigation]]・[[ソフトウェア開発/SwiftUI/Animation|Animation]]・[[ソフトウェア開発/SwiftUI/Gesture|Gesture]]
- [[ソフトウェア開発/SwiftUI/SwiftUIとUIKit|UIKit との関係]]
- [[ソフトウェア開発/SwiftUI/SwiftData|SwiftData]]・[[ソフトウェア開発/SwiftUI/Core Data|Core Data]]

## 参考文献

- Apple. SwiftUI documentation. <https://developer.apple.com/documentation/swiftui>
- Apple. Human Interface Guidelines. <https://developer.apple.com/design/human-interface-guidelines>
