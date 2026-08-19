---
title: Animation
status: 執筆済
tags: [ソフトウェア開発, SwiftUI]
---

# Animation

SwiftUI では**状態の変化に対して**アニメーションを指定する。
「どう動かすか」を手続きで書くのではない。

```swift
withAnimation(.spring) { isExpanded.toggle() }

// または値の変化に紐づける
.animation(.easeInOut(duration: 0.3), value: isExpanded)
```

## 何が起きているか

```
状態が変わる → 新しい View 木を計算する
            → 変化したプロパティを補間する
            → 各フレームで中間値を描画する
```

補間できるのは `Animatable` な値
（位置、大きさ、色、透明度、回転）。
**「無い」から「ある」への変化**は
`transition` で指定する。

## カーブ

| 種類 | 性格 |
| --- | --- |
| `.linear` | 一定速度。機械的 |
| `.easeInOut` | 加速して減速。標準的 |
| **`.spring`** | ばねの物理。**自然に感じられる** |

Apple のプラットフォームは spring を基本にしている。
実世界の運動に近く、
途中で状態が変わっても連続的に繋がる（中断に強い）。

## 暗黙と明示

```swift
// 明示 — この変更に伴う変化をアニメーションする
withAnimation { value += 1 }

// 暗黙 — この値の変化に反応する
.animation(.default, value: value)
```

引数なしの `.animation(_:)` は非推奨。
**どの値の変化に反応するかを明示する**形に統一された。

## アクセシビリティ

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion
withAnimation(reduceMotion ? nil : .spring) { ... }
```

動きに敏感な利用者がいる。
**「動きを減らす」設定を尊重するのは必須**であって
任意の配慮ではない。

## 参考文献

- Apple. Animations — SwiftUI. <https://developer.apple.com/documentation/swiftui/animations>
- Apple. Explore SwiftUI animation. WWDC 2023. <https://developer.apple.com/videos/play/wwdc2023/10156/>
- Apple. Human Interface Guidelines. <https://developer.apple.com/design/human-interface-guidelines>
