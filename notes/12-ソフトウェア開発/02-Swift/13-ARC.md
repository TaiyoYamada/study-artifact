---
title: ARC
status: 執筆済
tags: [ソフトウェア開発, Swift]
---

# ARC

**Automatic Reference Counting.**
参照カウントによる自動メモリ管理。
カウントの増減を**コンパイラが挿入する**。

## GC との違い

| | ARC | トレース GC |
| --- | --- | --- |
| 解放のタイミング | **決定的**（最後の参照が消えた瞬間） | 不定 |
| 停止時間 | 無い | あり |
| 実行時コスト | カウンタ更新が常時 | 収集時にまとめて |
| **循環参照** | **回収できない** | 回収できる |
| メモリ効率 | 良い | 余裕が要る |

停止時間が無いことが、
UI の応答性やリアルタイム処理で重要になる。
代わりに**循環参照は自分で断ち切る必要がある**。

## 循環参照

```swift
class Person { var apartment: Apartment? }
class Apartment { var tenant: Person? }
// 互いに強参照 → どちらも解放されない
```

## weak と unowned

```swift
class Apartment { weak var tenant: Person? }
```

| | `weak` | `unowned` |
| --- | --- | --- |
| 型 | Optional | 非 Optional |
| 解放後 | `nil` になる | **アクセスするとクラッシュ** |
| コスト | side table が要る | 軽い |
| 使う場面 | 相手が先に消えうる | 相手が必ず自分より長生き |

**迷ったら `weak`。**
`unowned` は寿命の関係が確実な場合だけ。

[[ソフトウェア開発/Swift/Closure|クロージャ]]の
捕捉リスト `[weak self]` が
最も頻繁に必要になる場面。

## 値型では不要

`struct` や `enum` は
[[ソフトウェア開発/Swift/値型と参照型|値型]]なので
参照カウントの対象にならない。

**値型中心の設計にすると、
ARC の問題自体が減る。**
これも Swift が struct を勧める理由のひとつ。

ただし struct の中にクラスの参照が入っていれば、
そこには ARC が働く。

## 参考文献

- Apple. *The Swift Programming Language*. <https://docs.swift.org/swift-book/>
- Apple. Automatic Reference Counting. <https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/>
- Richard Jones, Antony Hosking, Eliot Moss. *The Garbage Collection Handbook*, 2nd ed. CRC Press, 2023.
