---
title: Error Handling
status: 執筆済
tags: [ソフトウェア開発, Swift]
---

# Error Handling

**失敗を型と構文で明示する。**

```swift
enum NetworkError: Error {
    case timeout
    case badStatus(Int)
}

func fetch() throws -> Data { ... }

do {
    let data = try fetch()
} catch NetworkError.timeout {
    ...
} catch {
    print(error)
}
```

## 設計の特徴

| 特徴 | 効果 |
| --- | --- |
| `throws` がシグネチャに出る | **失敗しうることが呼び出し側で分かる** |
| `try` を書かされる | どの行が失敗しうるか目視できる |
| エラーは [[ソフトウェア開発/Swift/Enum\|enum]] で表す | 種類を網羅的に扱える |
| 検査例外ではない | どんな型を投げるかは宣言しない（※） |

※ Swift 6 では `throws(MyError)` という型付きスローが導入された。

## try の変種

```swift
let a = try fetch()      // エラーを伝播する
let b = try? fetch()     // 失敗したら nil（Optional になる）
let c = try! fetch()     // 失敗したらクラッシュ
```

`try?` は**エラーの情報を捨てる**ので、
原因が分からなくなる。使いどころは限られる。

## Result 型

```swift
enum Result<Success, Failure: Error> {
    case success(Success)
    case failure(Failure)
}
```

値として持ち回れるので、
非同期の完了ハンドラで使われてきた。
[[ソフトウェア開発/Swift/async-await|async/await]] の普及後は
`try await` で書けるため、出番は減っている。

## 回復可能かどうかで分ける

| 種類 | 手段 |
| --- | --- |
| 回復できる（通信失敗、入力誤り） | `throws` |
| 回復できない（前提条件違反） | `fatalError`、`precondition` |
| プログラムの誤り | `assert`（デバッグ時のみ） |

**回復できない状況で握りつぶすと、
壊れた状態のまま進んでしまう。**
早く落とす方が安全なことがある。

## 参考文献

- Apple. *The Swift Programming Language*. <https://docs.swift.org/swift-book/>
- Swift Evolution SE-0413: Typed throws. <https://github.com/swiftlang/swift-evolution/blob/main/proposals/0413-typed-throws.md>
