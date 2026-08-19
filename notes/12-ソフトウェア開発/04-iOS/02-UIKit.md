---
title: UIKit
status: 執筆済
tags: [ソフトウェア開発, iOS]
---

# UIKit

iOS の**命令的な** UI フレームワーク。2008 年から。

## 構成

```
UIApplication
 └ UIWindow
     └ UIViewController      画面 1 つ分を管理する
         └ UIView (階層)
```

`UIViewController` が中心で、
ライフサイクル、レイアウト、遷移を担う。

## ライフサイクル

```
init → loadView → viewDidLoad          (1 回だけ)
     → viewWillAppear → viewDidAppear   (表示のたび)
     → viewWillDisappear → viewDidDisappear
```

`viewDidLoad` は**1 回しか呼ばれない**。
表示のたびに更新したいものは
`viewWillAppear` に置く。
この区別を誤ると「戻ってきたら古いデータのまま」になる。

## レイアウト

| 方式 | 内容 |
| --- | --- |
| frame | 座標を直接指定する。単純だが柔軟性が無い |
| **Auto Layout** | 制約を宣言し、解に基づいて配置する |
| Stack View | 並べる方向と間隔だけ指定する |

Auto Layout は制約の充足問題を解く
（Cassowary という線形制約ソルバに基づく）。
制約が足りないと不定になり、
多すぎると矛盾する。
**曖昧・矛盾のどちらもコンソールに警告が出る。**

## セル再利用

`UITableView`、`UICollectionView` は
画面外のセルを使い回す。

```swift
let cell = tableView.dequeueReusableCell(withIdentifier: "Cell")
```

10 万件でも数十個のセルしか作らない。
**再利用されるので、状態を必ず初期化する**必要がある。
これを忘れると、スクロール時に前の内容が残る。

## SwiftUI との関係

[[ソフトウェア開発/SwiftUI/SwiftUIとUIKit|相互運用]]できる。
UIKit は成熟していて細かい制御が効くため、
SwiftUI で困った部分だけ降りる、という使い方が現実的。

## 参考文献

- Apple. UIKit documentation. <https://developer.apple.com/documentation/uikit>
- Apple. Auto Layout Guide. <https://developer.apple.com/documentation/uikit/uiview>
- Greg J. Badros, Alan Borning, Peter J. Stuckey. The Cassowary linear arithmetic constraint solving algorithm. *ACM TOCHI* 8(4), 2001. <https://doi.org/10.1145/504704.504705>
