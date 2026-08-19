---
title: Actor
status: 執筆済
tags: [ソフトウェア開発, Swift, 並行処理]
---

# Actor

**内部の状態への同時アクセスを、言語が防ぐ参照型。**

```swift
actor Counter {
    private var value = 0
    func increment() { value += 1 }
    func get() -> Int { value }
}

let c = Counter()
await c.increment()      // 外からは await が要る
```

## アクター隔離

アクターの可変状態には、**そのアクターの中からしか触れない**。
外部からのアクセスは `await` を伴う非同期呼び出しになり、
同時に 1 つずつ直列化される。

これにより
[[コンピュータ/並行・並列処理/Race Condition|データ競合]]が
**コンパイル時に排除される**。

[[コンピュータ/並行・並列処理/Mutex|Mutex]] と違い、
ロックの取り忘れや順序ミスが起きない。
**正しく使うのが既定になっている。**

## 再入可能性

アクターは `await` の位置で中断し、
その間に**別の呼び出しを受け付ける**。

```swift
actor Cache {
    var data: [String: Item] = [:]
    func load(_ key: String) async -> Item {
        if let c = data[key] { return c }
        let item = await fetch(key)     // ← ここで中断。他の呼び出しが入りうる
        data[key] = item                 // 二重に取得しているかもしれない
        return item
    }
}
```

**データ競合は防げるが、論理的な競合は防げない。**
`await` をまたいだ前提は再確認する必要がある。

## MainActor

UI 更新はメインスレッドで行わなければならない。
これを型で表すのが ``MainActor`。

```swift
@MainActor
class ViewModel: ObservableObject {
    @Published var items: [Item] = []
}
```

**「メインスレッドで呼ぶこと」というコメントが、
コンパイラが検査する契約になった。**

## Sendable

アクターの境界を越えて渡せる型は
`Sendable` に準拠していなければならない。

- 値型で、中身も Sendable なら自動的に準拠
- クラスは `final` かつ不変か、自前で同期する場合のみ

Swift 6 言語モードでは、この検査が既定で厳格になり、
**データ競合の可能性がコンパイルエラー**になる。

## 参考文献

- Apple. *The Swift Programming Language*. <https://docs.swift.org/swift-book/>
- Swift Evolution SE-0306: Actors. <https://github.com/swiftlang/swift-evolution/blob/main/proposals/0306-actors.md>
- Swift Evolution SE-0302: Sendable and ``Sendable closures. <https://github.com/swiftlang/swift-evolution/blob/main/proposals/0302-concurrent-value-and-concurrent-closures.md>
