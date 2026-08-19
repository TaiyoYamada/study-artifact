---
title: Closure
status: 執筆済
tags: [ソフトウェア開発, Swift]
---

# Closure

**周囲の環境を捕捉する、名前のない関数。**

```swift
let add = { (a: Int, b: Int) -> Int in a + b }
numbers.sorted { $0 < $1 }
numbers.map { $0 * 2 }
```

## 捕捉

```swift
func makeCounter() -> () -> Int {
    var count = 0
    return { count += 1; return count }   // count を捕捉する
}
```

`count` は関数を抜けても生き続ける。
クロージャが参照を保持するため、
**ヒープに移される**（boxing）。

これが「クロージャ = 関数 + 環境」と言われる所以で、
[[コンピュータ/プログラミング言語/意味解析|静的スコープ]]の帰結。

## 循環参照

クロージャは参照型なので、
[[ソフトウェア開発/Swift/ARC|ARC]] の循環を作りうる。

```swift
class VC {
    var handler: (() -> Void)?
    func setup() {
        handler = { self.doSomething() }   // self を強参照 → 循環
    }
}
```

```swift
handler = { [weak self] in self?.doSomething() }
```

捕捉リスト `[weak self]` で断ち切る。
**エスケープするクロージャで `self` を捕捉したら疑う。**

## escaping と non-escaping

| | non-escaping（既定） | ``escaping` |
| --- | --- | --- |
| 寿命 | 関数の実行中だけ | 関数を超えて保持される |
| `self` | 暗黙に書ける | **明示が必要** |
| 最適化 | スタックに置ける | ヒープ確保 |

既定が non-escaping なのは、
**保持されないことが分かれば最適化できる**から。
`self` の明示が要求されるのは、
循環参照の危険を書き手に意識させるため。

## 末尾クロージャ

```swift
items.filter { $0.isActive }
Button("OK") { save() }
```

最後の引数がクロージャなら括弧の外に出せる。
[[ソフトウェア開発/SwiftUI|SwiftUI]] の宣言的な記法は
この構文の上に成り立っている。

## 参考文献

- Apple. *The Swift Programming Language*. <https://docs.swift.org/swift-book/>
- Swift Evolution SE-0103: Make non-escaping closures the default. <https://github.com/swiftlang/swift-evolution/blob/main/proposals/0103-make-noescape-default.md>
