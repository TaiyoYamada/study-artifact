---
title: ACID
status: 執筆済
tags: [ソフトウェア開発, データベース]
---

# ACID

[[ソフトウェア開発/データベース/トランザクション|トランザクション]]が
満たすべき 4 つの性質。

| 頭文字 | 名前 | 内容 |
| --- | --- | --- |
| **A** | 原子性 (Atomicity) | 全部やるか、全部やらないか |
| **C** | 一貫性 (Consistency) | 制約を満たした状態から状態へ |
| **I** | 分離性 (Isolation) | 並行実行が逐次実行と同等に見える |
| **D** | 永続性 (Durability) | コミットしたら消えない |

## それぞれの実現

| 性質 | 仕組み |
| --- | --- |
| 原子性 | UNDO ログ、WAL でロールバック |
| 一貫性 | 制約検査。**実はアプリケーションの責任も大きい** |
| 分離性 | ロック、MVCC |
| 永続性 | WAL + `fsync` |

## C だけ性質が違う

A・I・D は DB が保証する技術的な性質だが、
**C（一貫性）は「アプリケーションが定義する正しさ」**を指す。

「口座残高の合計が変わらない」といった不変条件は、
DB が知る由もない。
Kleppmann は C が語呂合わせのために入れられた面があると指摘している。

## 分散システムでの困難

複数ノードにまたがると ACID の維持が難しくなる。

**CAP 定理** — ネットワーク分断が起きたとき、
一貫性 (C) と可用性 (A) の両方は満たせない。

$$\text{Partition tolerance が必須} \Rightarrow C \text{ か } A \text{ を選ぶ}$$

ただし CAP は誤解も多い。
「分断していない平常時」には両方満たせるし、
C は線形化可能性という強い定義を指す。

## BASE

NoSQL 側の対比的な標語。

```
Basically Available, Soft state, Eventually consistent
```

**最終的には一貫する**が、一時的にはずれる。
可用性と規模を優先する立場。

近年は分散でも ACID を提供する系
（Google Spanner、CockroachDB）が現れ、
「分散なら諦める」という前提は絶対ではなくなっている。

## 参考文献

- Theo Haerder, Andreas Reuter. Principles of Transaction-Oriented Database Recovery. *ACM Computing Surveys* 15(4), 1983. <https://doi.org/10.1145/289.291>
- Seth Gilbert, Nancy Lynch. Brewer's conjecture and the feasibility of consistent, available, partition-tolerant web services. *ACM SIGACT News* 33(2), 2002. <https://doi.org/10.1145/564585.564601>
- Martin Kleppmann. *Designing Data-Intensive Applications*. O’Reilly, 2017.
