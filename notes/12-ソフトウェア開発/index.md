---
title: ソフトウェア開発
status: 執筆済
summary: ソフトウェアの難しさは規模から来る。多くの技法は一度に考える範囲を狭めるためにある。
tags: [ソフトウェア開発]
---

# ソフトウェア開発

動くものを作り、動き続けるようにするための知識。

## 構成

| 領域 | 内容 |
| --- | --- |
| [[ソフトウェア開発/アプリ開発\|アプリ開発]] | 種類を問わず共通する土台 |
| [[ソフトウェア開発/Swift\|Swift]]・[[ソフトウェア開発/SwiftUI\|SwiftUI]]・[[ソフトウェア開発/iOS\|iOS]] | Apple プラットフォーム |
| [[ソフトウェア開発/Web\|Web]]・[[ソフトウェア開発/ネットワーク\|ネットワーク]] | ブラウザと通信 |
| [[ソフトウェア開発/データベース\|データベース]] | 状態の永続化 |
| [[ソフトウェア開発/ソフトウェア設計\|ソフトウェア設計]] | 構造の作り方 |
| [[ソフトウェア開発/インフラ\|インフラ]] | 動かす場所 |

## 共通する視点

**ソフトウェアの難しさは規模から来る。**
1000 行なら全部覚えていられるが、
10 万行では覚えていられない。

そのため多くの技法が
「**一度に考える範囲を狭める**」ことを目的にしている。

- モジュール分割、カプセル化 — 中を知らなくても使える
- 型システム — 機械が整合性を保証する
- テスト — 変更しても壊れていないことを確かめる
- 不変性 — 変わらないものは追跡しなくてよい

Brooks の言う「本質的な複雑さ」と「偶有的な複雑さ」の区別が
今も有効で、道具の改善が効くのは後者だけ。

## 参考文献

- Frederick P. Brooks, Jr. No Silver Bullet: Essence and Accidents of Software Engineering. *IEEE Computer* 20(4), 1987. <https://doi.org/10.1109/MC.1987.1663532>
- Robert C. Martin. *Clean Architecture: A Craftsman’s Guide to Software Structure and Design*. Prentice Hall, 2017.
- Martin Kleppmann. *Designing Data-Intensive Applications*. O’Reilly, 2017.
