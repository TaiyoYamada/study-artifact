---
title: Environment
status: 執筆済
tags: [ソフトウェア開発, SwiftUI]
---

# Environment

**View 階層を通じて、暗黙的に値を受け渡す仕組み。**

```swift
struct Root: View {
    var body: some View {
        Content().environment(settings)     // 注入する
    }
}
struct Deep: View {
    @Environment(Settings.self) var settings   // どの深さでも取り出せる
    @Environment(\.colorScheme) var scheme     // 組み込みの値
}
```

## 何を解決するのか

深い階層に値を届けるとき、
途中の View すべてに引数を足すことになる
（**prop drilling**）。

```
A → B → C → D   // D だけが必要なのに B、C も受け取る
```

Environment は途中を素通りする。

## 組み込みの環境値

| キー | 内容 |
| --- | --- |
| `\.colorScheme` | ライト / ダーク |
| `\.dynamicTypeSize` | 文字サイズ設定 |
| `\.locale` | 地域 |
| `\.dismiss` | 画面を閉じる操作 |
| `\.accessibilityReduceMotion` | アニメーション低減の設定 |

**アクセシビリティ設定を読むのに使う**のが実務上重要。
`reduceMotion` が真ならアニメーションを抑える、といった対応が必要になる。

## 依存性注入として

テスト時に差し替えられる。

```swift
ContentView().environment(MockAPIClient())
```

[[ソフトウェア開発/ソフトウェア設計/依存性注入|依存性注入]]の
軽量な実現手段になっている。

## 注意

- **暗黙的なので、依存関係がコードから見えにくい**
- 注入し忘れると実行時に落ちる（または既定値で動く）
- 何でも Environment に入れると、
  どこで設定されたか追えなくなる

明示的に渡せる範囲なら引数で渡すほうが読みやすい。
**横断的な関心事（テーマ、ロケール、共通の依存）に限る**のが目安。

## 参考文献

- Apple. Environment — SwiftUI. <https://developer.apple.com/documentation/swiftui/environment>
- Apple. EnvironmentValues — SwiftUI. <https://developer.apple.com/documentation/swiftui/environmentvalues>
