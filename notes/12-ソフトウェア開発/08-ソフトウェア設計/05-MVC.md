---
title: MVC
status: 執筆済
tags: [ソフトウェア開発, 設計]
---

# MVC

**Model-View-Controller。**
Trygve Reenskaug が 1979 年に Smalltalk-80 で考案した。

```
   [Model]      データと業務ロジック
      ↑ ↓
 [Controller]   入力を受け、Model を更新する
      ↓
   [View]       表示する
```

## 元の意図

**表示とデータを分離する**こと。

同じデータに複数の表示（表、グラフ）を付けられ、
表示を変えてもデータの扱いは変わらない。

## 実装ごとに意味が違う

MVC は最も多義的な用語のひとつ。

| 系統 | Controller の役割 |
| --- | --- |
| Smalltalk 系（元祖） | 入力の解釈 |
| **Web の MVC**（Rails 等） | リクエストを受け、Model を呼び、View を選ぶ |
| **Apple の MVC** | View と Model の仲介。ViewController |

「MVC で作る」と言っても、
どの系統かで構造が違う。

## Massive View Controller 問題

iOS の MVC では、
ViewController に

- 画面のライフサイクル
- レイアウト
- 入力処理
- ネットワーク呼び出し
- データ変換

がすべて集まりがちで、
**数千行のクラスになる**現象が広く観察された。

原因は「View と Model の間にあるもの全部」が
Controller に押し込まれること。

対処として
[[ソフトウェア開発/ソフトウェア設計/MVVM|MVVM]]、
VIPER、
[[ソフトウェア開発/ソフトウェア設計/クリーンアーキテクチャ|クリーンアーキテクチャ]]などが
提案された。

## 宣言的 UI での位置づけ

[[ソフトウェア開発/SwiftUI|SwiftUI]] や React では
View が状態の関数になるため、
「View を更新する」Controller の役割自体が消える。

残るのは
**状態をどこに置き、誰が変更するか**という問題で、
これは MVC の枠組みとは別に考える必要がある。

## 参考文献

- Trygve Reenskaug. MODELS - VIEWS - CONTROLLERS. Xerox PARC, 1979. <https://folk.universitetetioslo.no/trygver/1979/mvc-2/1979-12-MVC.pdf>
- Martin Fowler. *Patterns of Enterprise Application Architecture*. Addison-Wesley, 2002.
- Martin Fowler. GUI Architectures. <https://martinfowler.com/eaaDev/uiArchs.html>
