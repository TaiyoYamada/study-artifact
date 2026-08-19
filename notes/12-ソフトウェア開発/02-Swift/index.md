---
title: Swift
status: 執筆済
summary: Apple の言語。値型中心・プロトコル指向・型による安全性が設計の軸。
tags: [ソフトウェア開発, Swift]
---

# Swift

Apple が 2014 年に発表した言語。
2015 年にオープンソース化された。

## 設計の方針

| 方針 | 現れかた |
| --- | --- |
| **安全** | [[ソフトウェア開発/Swift/Optional\|Optional]]、境界検査、初期化の強制 |
| **速い** | [[コンピュータ/言語処理系/LLVM\|LLVM]] で AOT、値型中心 |
| 表現力 | [[ソフトウェア開発/Swift/Generics\|ジェネリクス]]、[[ソフトウェア開発/Swift/Protocol\|プロトコル]] |
| 段階的な習得 | 単純な書き方から始められる |

Objective-C の `nil` メッセージ送信のような
「静かに何もしない」挙動を排し、
**誤りをコンパイル時に出す**方向に振っている。

## 特徴的な点

- **値型が中心**（[[ソフトウェア開発/Swift/StructとClass|struct]]、[[ソフトウェア開発/Swift/Enum|enum]]）。
  クラスは必要なときだけ
- **プロトコル指向**。継承より合成
- `nil` を型で表す（Optional）
- エラーを型で表す（`throws`、`Result`）
- GC ではなく [[ソフトウェア開発/Swift/ARC|ARC]]

## 構成

- [[ソフトウェア開発/Swift/Swiftの基本|基本]]・[[ソフトウェア開発/Swift/値型と参照型|値型と参照型]]
- [[ソフトウェア開発/Swift/Optional|Optional]]・[[ソフトウェア開発/Swift/Enum|Enum]]
- [[ソフトウェア開発/Swift/Protocol|Protocol]]・[[ソフトウェア開発/Swift/Extension|Extension]]・[[ソフトウェア開発/Swift/Generics|Generics]]
- [[ソフトウェア開発/Swift/Closure|Closure]]・[[ソフトウェア開発/Swift/Error Handling|Error Handling]]
- [[ソフトウェア開発/Swift/async-await|async/await]]・[[ソフトウェア開発/Swift/Actor|Actor]]・[[ソフトウェア開発/Swift/ARC|ARC]]

## 参考文献

- Apple. *The Swift Programming Language*. <https://docs.swift.org/swift-book/>
- Swift Evolution proposals. <https://github.com/swiftlang/swift-evolution/tree/main/proposals>
