---
title: アプリ開発
status: 執筆済
summary: プラットフォームを問わない共通要素。複雑さの大半は状態から来る。
tags: [ソフトウェア開発]
---

# アプリ開発

プラットフォームを問わず、アプリケーションに共通する要素。

```
[[アプリの設計]]        どう分けるか
    ↓
[[状態管理]]            何をどこに持つか
    ↓
[[データ永続化]]        どこに保存するか
[[API連携]]             外とどうやり取りするか
[[認証]]                誰かをどう確かめるか
[[非同期処理]]          待ち時間をどう扱うか
    ↓
[[テスト]]              壊れていないことをどう確かめるか
[[アプリのライフサイクル]] いつ何が起きるか
```

## 中心にあるのは状態

アプリの複雑さの大半は**状態**から来る。

- どこに置くか（メモリ、ディスク、サーバ）
- 誰が変更してよいか
- 変わったとき何を更新するか
- 複数の場所にある同じデータをどう整合させるか

宣言的 UI（[[ソフトウェア開発/SwiftUI|SwiftUI]]、React）が
広まったのは、
**状態から画面を導出する**形にすれば
「更新し忘れ」が原理的に無くなるため。

## 参考文献

- Robert C. Martin. *Clean Architecture: A Craftsman’s Guide to Software Structure and Design*. Prentice Hall, 2017.
- Apple. Human Interface Guidelines. <https://developer.apple.com/design/human-interface-guidelines>
