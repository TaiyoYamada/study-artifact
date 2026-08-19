---
title: Gesture
status: 執筆済
tags: [ソフトウェア開発, SwiftUI]
---

# Gesture

タッチやポインタの操作を扱う。

```swift
.onTapGesture { select() }
.gesture(
    DragGesture()
        .onChanged { offset = $0.translation }
        .onEnded { _ in withAnimation { offset = .zero } }
)
```

## 主なジェスチャ

| 種類 | 用途 |
| --- | --- |
| `TapGesture` | 選択、実行 |
| `LongPressGesture` | 補助的な操作 |
| `DragGesture` | 移動、スワイプ |
| `MagnifyGesture` | 拡大縮小 |
| `RotateGesture` | 回転 |

## 合成

```swift
gestureA.simultaneously(with: gestureB)   // 同時
gestureA.sequenced(before: gestureB)      // 順番に
gestureA.exclusively(before: gestureB)    // どちらか一方
```

長押ししてからドラッグ（並べ替え）などは
`sequenced` で表す。

## 競合

親と子、あるいはスクロールビューとの間で
**どちらがジェスチャを取るか**の問題が起きる。

| 手段 | 効果 |
| --- | --- |
| `.highPriorityGesture` | 子より優先する |
| `.simultaneousGesture` | 両方に届ける |
| `.allowsHitTesting(false)` | 受け取らない |

スクロール可能な領域の中で横方向のドラッグを扱うのは
特に競合しやすい。

## 使いやすさ

| 指針 | 内容 |
| --- | --- |
| **タップ領域は 44×44 pt 以上** | Apple の指針。指で押せる最小 |
| 発見できるようにする | 隠れたジェスチャだけの機能を作らない |
| 代替手段を用意する | ボタンでもできるようにする |
| 即座に反応を返す | 押された状態を見せる |

**ジェスチャは補助**であって、
それ以外の方法で到達できない機能を作ってはいけない。
アクセシビリティの観点でも、
複雑なジェスチャを実行できない利用者がいる。

## 参考文献

- Apple. Gestures — SwiftUI. <https://developer.apple.com/documentation/swiftui/gestures>
- Apple. Human Interface Guidelines. <https://developer.apple.com/design/human-interface-guidelines>
