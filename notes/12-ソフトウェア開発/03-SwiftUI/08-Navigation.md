---
title: Navigation
status: 執筆済
tags: [ソフトウェア開発, SwiftUI]
---

# Navigation

**画面遷移。** iOS 16 で API が刷新された。

```swift
NavigationStack(path: $path) {
    List(items) { item in
        NavigationLink(item.name, value: item)
    }
    .navigationDestination(for: Item.self) { item in
        DetailView(item: item)
    }
}
```

## 値ベースへの転換

| | 旧 (`NavigationView`) | 新 (`NavigationStack`) |
| --- | --- | --- |
| 遷移の指定 | 遷移先の View を直接埋める | **値**を渡し、型で遷移先を決める |
| 状態 | 暗黙 | `path` として**明示的に持てる** |
| 深いリンク | 難しい | path を組み立てるだけ |
| 一気に戻る | 難しい | `path.removeAll()` |

**遷移の状態が値になった**のが本質的な変更。
これにより

- ディープリンクで任意の階層へ飛べる
- 遷移状態を保存・復元できる
- テストで遷移を検証できる

宣言的 UI の原則（画面は状態の関数）が
ナビゲーションにも適用された形。

## 3 つのコンテナ

| コンテナ | 用途 |
| --- | --- |
| `NavigationStack` | push / pop の積み重ね |
| `NavigationSplitView` | サイドバーのある 2〜3 列。iPad、Mac |
| `TabView` | 並列な区画の切り替え |

## モーダル

```swift
.sheet(item: $selected) { item in DetailView(item: item) }
.fullScreenCover(isPresented: $showing) { ... }
.alert("確認", isPresented: $confirming) { ... }
```

`item:` 版は Optional が nil でなくなったら表示する。
**表示するかどうかと、何を表示するかを 1 つの状態で表せる**ので、
`isPresented` + 別の変数より安全。

## 参考文献

- Apple. NavigationStack — SwiftUI. <https://developer.apple.com/documentation/swiftui/navigationstack>
- Apple. Human Interface Guidelines. <https://developer.apple.com/design/human-interface-guidelines>
