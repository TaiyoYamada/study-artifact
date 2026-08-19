---
title: Core Data
status: 執筆済
tags: [ソフトウェア開発, SwiftUI]
---

# Core Data

Apple のオブジェクトグラフ管理・永続化フレームワーク。2005 年から。

**単なる DB ラッパではない。**
オブジェクトの生存期間、関係、変更追跡、
取り消し、遅延読み込みを管理する。

## 構成

```
NSManagedObjectModel     … スキーマの定義
NSPersistentStoreCoordinator … 実際の保存先（既定は SQLite）
NSManagedObjectContext   … 作業用のスクラッチパッド
NSManagedObject          … 個々のオブジェクト
```

`NSPersistentContainer` がこれらをまとめて用意する。

## コンテキスト

変更はまずコンテキスト上（メモリ）で行われ、
`save()` で初めて永続化される。

```
context で変更 → まだディスクに書かれていない
context.save() → [[ソフトウェア開発/データベース/トランザクション|トランザクション]]としてまとめて書く
```

**コンテキストはスレッドに束縛される。**
`viewContext` はメインスレッド専用で、
バックグラウンド処理には
`performBackgroundTask` で別のコンテキストを使う。
これを守らないと、非決定的にクラッシュする。

## 遅延読み込み

関係を辿ると、必要になった時点で読み込まれる（fault）。

省メモリだが、
**リスト表示で 1 件ずつ読み込む**問題（N+1）が起きやすい。
`relationshipKeyPathsForPrefetching` で先読みする。

## 移行

スキーマが変わると既存データを変換する必要がある。

| 種類 | 内容 |
| --- | --- |
| 軽量移行 | 属性の追加・削除など。自動 |
| **重量移行** | マッピングモデルが要る。難しい |

**配布済みアプリのデータは消せない**ので、
移行経路の設計が最も難しい部分になる。

## 位置づけ

[[ソフトウェア開発/SwiftUI/SwiftData|SwiftData]] が
その上に作られており、新規開発では SwiftData が第一候補。
ただし

- iOS 16 以前を対象にする
- 複雑なクエリ・移行が必要
- 既存の大規模な資産がある

といった場合は Core Data を直接使う。

## 参考文献

- Apple. Core Data documentation. <https://developer.apple.com/documentation/coredata>
- Apple. Setting up a Core Data stack. <https://developer.apple.com/documentation/coredata/setting-up-a-core-data-stack>
