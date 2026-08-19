---
title: SwiftData
status: 執筆済
tags: [ソフトウェア開発, SwiftUI]
---

# SwiftData

Swift のマクロを使った永続化フレームワーク。iOS 17 で導入。
[[ソフトウェア開発/SwiftUI/Core Data|Core Data]] の上に構築されている。

```swift
@Model
final class Task {
    var title: String
    var isDone: Bool
    var createdAt: Date
    init(title: String) { ... }
}

struct TaskList: View {
    @Query(sort: \Task.createdAt) private var tasks: [Task]
    @Environment(\.modelContext) private var context

    var body: some View {
        List(tasks) { task in Text(task.title) }
        Button("追加") { context.insert(Task(title: "新規")) }
    }
}
```

## Core Data との違い

| | Core Data | SwiftData |
| --- | --- | --- |
| モデル定義 | `.xcdatamodeld`（GUI） | **Swift のコード** |
| 型 | `NSManagedObject` | 普通のクラス + ``Model` |
| 取得 | `NSFetchRequest` | ``Query` |
| Optional | 表現しにくい | Swift の [[ソフトウェア開発/Swift/Optional\|Optional]] |
| SwiftUI 連携 | ラッパが要る | 組み込み |

**モデルがコードになった**のが最大の違い。
差分が git で読め、リファクタリングが効き、型が Swift のもので済む。

## 仕組み

``Model` マクロが、
プロパティへのアクセスを永続化ストアへの読み書きに変換する。
同時に `Observable` にもなるので、
変更が自動的に [[ソフトウェア開発/SwiftUI|SwiftUI]] に伝わる。

```
@Model class → 永続化 + 変更通知 を自動生成
```

## 注意点

- **成熟していない**。複雑なクエリや移行で問題が報告されている
- 大規模データの性能は Core Data より検証が浅い
- `ModelContext` はスレッドに紐づく。
  バックグラウンド処理では別のコンテキストが要る
- スキーマ移行は `VersionedSchema` で行う。
  **最初から移行を設計に入れておく**

新規の小〜中規模アプリには適するが、
複雑な要件では Core Data を選ぶ判断も依然として妥当。

## 参考文献

- Apple. SwiftData documentation. <https://developer.apple.com/documentation/swiftdata>
- Apple. Meet SwiftData. WWDC 2023. <https://developer.apple.com/videos/play/wwdc2023/10187/>
