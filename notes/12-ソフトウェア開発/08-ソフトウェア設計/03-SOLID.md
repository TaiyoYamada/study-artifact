---
title: SOLID
status: 執筆済
tags: [ソフトウェア開発, 設計]
---

# SOLID

オブジェクト指向設計の 5 原則。Robert C. Martin が整理した。

## S — 単一責任の原則

**モジュールが変更される理由は 1 つであるべき。**

「1 つのことだけする」ではなく、
**「1 人のアクター（変更を要求する立場）にだけ責任を負う」**。

給与計算クラスが、経理・人事・IT のそれぞれの都合で
変更されるなら分けるべき、という判断基準。

## O — 開放閉鎖の原則

**拡張には開かれ、修正には閉じている。**

新しい種類を追加するとき、
既存のコードを書き換えずに済む構造。

```swift
protocol Shape { func area() -> Double }
// 新しい図形を足すとき、既存の計算コードは触らない
```

`switch` で型を分岐していると、
追加のたびに全箇所を直すことになる。

## L — リスコフの置換原則

**部分型は、基底型と置き換えても正しく動くべき。**

```
Rectangle を継承した Square で
setWidth が高さも変えると、
Rectangle として使うコードが壊れる
```

「is-a」で判断せず、**振る舞いの契約**で判断する。
Liskov と Wing の形式的な定義がある。

## I — インタフェース分離の原則

**使わないメソッドへの依存を強制しない。**

大きなインタフェースより、
小さく目的別のインタフェースに分ける。

## D — 依存性逆転の原則

**上位も下位も、抽象に依存すべき。**

```
[誤] 業務ロジック → データベース実装
[正] 業務ロジック → Repository（抽象） ← データベース実装
```

矢印の向きが変わることで、
業務ロジックが DB の都合から独立する。
[[ソフトウェア開発/ソフトウェア設計/クリーンアーキテクチャ|クリーンアーキテクチャ]]の核心。

## 注意

**原則は目的ではなく手段。**
小規模なコードにすべて適用すると、
抽象だらけで読めなくなる。

「この変更をするとき何箇所触るか」で
必要性を判断する。

## 参考文献

- Robert C. Martin. Design Principles and Design Patterns. 2000. <https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf>
- Robert C. Martin. *Clean Architecture: A Craftsman’s Guide to Software Structure and Design*. Prentice Hall, 2017.
- Barbara Liskov, Jeannette Wing. A behavioral notion of subtyping. *ACM TOPLAS* 16(6), 1994. <https://doi.org/10.1145/197320.197383>
