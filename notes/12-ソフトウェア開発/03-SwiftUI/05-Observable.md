---
title: Observable
status: 執筆済
tags: [ソフトウェア開発, SwiftUI]
---

# Observable

**参照型のモデルの変更を、SwiftUI に伝える仕組み。**

```swift
@Observable
final class Store {
    var items: [Item] = []
    var isLoading = false
}

struct ListView: View {
    @State private var store = Store()
    var body: some View {
        List(store.items) { ... }
    }
}
```

## ObservableObject との違い

iOS 17 で導入された ``Observable` マクロは、
従来の `ObservableObject` + ``Published` を置き換える。

| | `ObservableObject` | ``Observable` |
| --- | --- | --- |
| 宣言 | ``Published` を各プロパティに | クラスに 1 つ付けるだけ |
| 通知の粒度 | **オブジェクト単位** | **プロパティ単位** |
| 未使用プロパティの変更 | 再描画される | **されない** |
| View 側 | ``StateObject` / ``ObservedObject` | ``State` / ただの `let` |

粒度の違いが重要で、
`ObservableObject` では
**画面が読んでいないプロパティの変更でも再描画されていた**。
``Observable` は実際に読まれたプロパティだけを追跡する。

## 仕組み

``Observable` は Swift マクロで、
コンパイル時に各プロパティへ
アクセス記録と変更通知のコードを挿入する。

```
body の評価中に読まれたプロパティを記録
   ↓
そのプロパティが変わったときだけ body を再評価
```

## 使い分け

| 用途 | 選ぶもの |
| --- | --- |
| View 内の単純な値 | [[ソフトウェア開発/SwiftUI/State\|@State]] |
| 参照型のモデル、View が所有する | ``State` + ``Observable` |
| 親から渡される Observable | ただの `let` でよい |
| 階層全体で共有 | [[ソフトウェア開発/SwiftUI/Environment\|@Environment]] |

## 参考文献

- Apple. Observable — Observation. <https://developer.apple.com/documentation/observation/observable>
- Apple. Migrating from the Observable Object protocol to the Observable macro. <https://developer.apple.com/documentation/swiftui/migrating-from-the-observable-object-protocol-to-the-observable-macro>
