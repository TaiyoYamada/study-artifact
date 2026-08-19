---
title: View
status: 執筆済
tags: [ソフトウェア開発, SwiftUI]
---

# View

**画面の一部分を記述する値。**

```swift
struct Card: View {
    let title: String
    var body: some View {
        VStack(alignment: .leading) {
            Text(title).font(.headline)
            Text("subtitle").foregroundStyle(.secondary)
        }
        .padding()
        .background(.regularMaterial, in: .rect(cornerRadius: 12))
    }
}
```

## モディファイア

`.padding()` などは View を変更するのではなく、
**新しい View を返す**。

```
Text("A").padding().background(.red)
  → Background<Padding<Text>>
```

そのため**順序が意味を持つ**。

```swift
Text("A").padding().background(.red)   // 余白も赤くなる
Text("A").background(.red).padding()   // 文字の周りだけ赤い
```

## レイアウト

親子で寸法を交渉する。

```
親が子に「使える大きさ」を提示する
   ↓
子が「自分はこの大きさが欲しい」と返す
   ↓
親が子を配置する
```

子が決めるので、
`.frame()` は「その大きさにする」のではなく
**「その大きさを提案する親を挟む」**。
この理解がないとレイアウトが意図どおりにならない。

## 分割の目安

| 分割する理由 | 内容 |
| --- | --- |
| 再利用する | 複数箇所で使う |
| **更新範囲を狭める** | 状態を持つ部分を小さく切り出す |
| 可読性 | `body` が長くなったら |

小さく分けると、
状態が変わったときに再評価される範囲が狭まり、性能が上がる。
**分割はコストではなく最適化**になる。

## 参考文献

- Apple. View — SwiftUI. <https://developer.apple.com/documentation/swiftui/view>
- Apple. Compose custom layouts with SwiftUI. WWDC 2022. <https://developer.apple.com/videos/play/wwdc2022/10056/>
