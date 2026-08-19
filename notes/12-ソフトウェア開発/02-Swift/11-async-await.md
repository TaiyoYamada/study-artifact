---
title: async-await
status: 執筆済
tags: [ソフトウェア開発, Swift]
---

# async-await

**非同期処理を、同期コードのように書く。**
Swift 5.5（2021）で導入された。

```swift
func loadUser() async throws -> User {
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(User.self, from: data)
}
```

## 何が変わったか

```swift
// 従来
fetchUser { result in
    switch result {
    case .success(let u): fetchPosts(u) { ... }   // ネストが深くなる
    case .failure(let e): handle(e)
    }
}

// async/await
let user = try await fetchUser()
let posts = try await fetchPosts(user)
```

- 制御フローが素直（`if`、`for`、`try` が普通に使える）
- エラー処理が[[ソフトウェア開発/Swift/Error Handling|通常の throw]] に統一される
- 呼び忘れ・二重呼び出しが起きない

## await は中断点

`await` の位置でタスクが**中断されうる**。
スレッドは解放され、他の仕事に使われる。

```
await の前後で、他のコードが実行されている可能性がある
  → 前提が変わっていないか確認する必要がある
```

これが [[ソフトウェア開発/Swift/Actor|Actor]] の
再入可能性の問題につながる。

## 構造化並行性

```swift
async let a = fetchA()      // 並行に開始
async let b = fetchB()
let (x, y) = try await (a, b)

try await withThrowingTaskGroup(of: Item.self) { group in
    for id in ids { group.addTask { try await fetch(id) } }
    for try await item in group { results.append(item) }
}
```

**タスクが木構造をなす**のが構造化並行性。

- 親が終わるまで子は生き、親が取り消されると子も取り消される
- 子のエラーが親に伝播する
- **やり残しのタスクが漏れない**

`Task { }` で作る非構造化タスクはこの保証が無く、
自分で寿命を管理する必要がある。

## 参考文献

- Apple. *The Swift Programming Language*. <https://docs.swift.org/swift-book/>
- Swift Evolution SE-0296: async/await. <https://github.com/swiftlang/swift-evolution/blob/main/proposals/0296-async-await.md>
- Swift Evolution SE-0304: Structured concurrency. <https://github.com/swiftlang/swift-evolution/blob/main/proposals/0304-structured-concurrency.md>
