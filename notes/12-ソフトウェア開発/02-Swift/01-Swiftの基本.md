---
title: Swiftの基本
status: 執筆済
tags: [ソフトウェア開発, Swift]
---

# Swiftの基本

## 変数と定数

```swift
let x = 10        // 定数。変更できない
var y = 20        // 変数
```

**`let` を既定にする。**
変わらないと分かっているものは追跡しなくてよい。
コンパイラも最適化しやすい。

## 型推論

```swift
let name = "Swift"       // String と推論される
let pi: Double = 3.14    // 明示もできる
```

静的型付けだが、書く量は動的型付け言語に近い。
[[コンピュータ/プログラミング言語/型システム|型推論]]の恩恵。

推論が複雑になるとコンパイルが遅くなるので、
長い式には型注釈を書くのが実務的。

## 制御構文

```swift
if x > 0 { }                      // 条件に括弧は不要、波括弧は必須
for item in items { }
switch value {
case 1: ...
default: ...                       // switch は網羅的でなければならない
}
```

`switch` の**網羅性検査**が重要。
[[ソフトウェア開発/Swift/Enum|Enum]] に要素を足すと、
対応していない `switch` がコンパイルエラーになる。
**足し忘れを機械が見つけてくれる。**

## 関数

```swift
func greet(to name: String, from city: String = "Tokyo") -> String {
    return "Hello, \(name) from \(city)"
}
greet(to: "Swift")
```

引数ラベル（`to`、`from`）が
呼び出し側の可読性のために分離されている。
`_` を使えば省略できる。

## 文字列補間

`\(式)` で埋め込む。
型安全で、フォーマット文字列の不一致による
クラッシュが起きない。

## 参考文献

- Apple. *The Swift Programming Language*. <https://docs.swift.org/swift-book/>
- Apple. Swift API Design Guidelines. <https://www.swift.org/documentation/api-design-guidelines/>
