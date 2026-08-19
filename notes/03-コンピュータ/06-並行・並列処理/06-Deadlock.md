---
title: Deadlock
status: 執筆済
tags: [コンピュータ, 並行処理]
---

# Deadlock

**複数のスレッドが互いの解放を待ち、永久に進まない**状態。

```
スレッドA: lock(X); lock(Y);
スレッドB: lock(Y); lock(X);
```

A が X を、B が Y を取った時点で双方が詰む。

## 4 つの必要条件（Coffman 条件）

すべて成り立つときにだけ起きる。

| 条件 | 内容 |
| --- | --- |
| 相互排他 | 資源を同時に使えない |
| 保持と待機 | 持ったまま次を待つ |
| **非preemption** | 強制的に取り上げられない |
| **循環待ち** | 待ちの関係が輪になる |

**どれか 1 つを崩せば防げる。**

## 対処

| 方針 | 手段 |
| --- | --- |
| **予防** | ロック順序を全体で統一する（循環待ちを崩す） |
| 予防 | 一度にすべて取るか、何も取らない |
| 回避 | 銀行家アルゴリズム（実用性は低い） |
| 検出と回復 | 待ちグラフの循環を検出して 1 つを中断 |
| **タイムアウト** | 一定時間で諦めて再試行 |

実務では**ロック順序の統一**が最も現実的。
「常にアドレスの小さい順にロックする」といった規則を決める。

## 関連する状態

| 状態 | 内容 |
| --- | --- |
| **ライブロック** | 動いているが進まない（互いに譲り合う） |
| **飢餓** | 特定のスレッドだけ順番が回ってこない |
| 優先度逆転 | 低優先度が資源を握り、高優先度が待つ |

優先度逆転は Mars Pathfinder（1997 年）で
実際に発生し、探査機が繰り返し再起動した。
優先度継承プロトコルの有効化で解決された。
**理論上の問題が実機で起きた有名な例。**

## 設計での回避

- ロックを保持したまま外部を呼ばない（コールバック、I/O）
- ロックの数を減らす
- 共有状態そのものを減らす
- メッセージパッシングに置き換える

## 参考文献

- Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau. *Operating Systems: Three Easy Pieces*. Arpaci-Dusseau Books, 2018.（全文公開） <https://pages.cs.wisc.edu/~remzi/OSTEP/>
- Maurice Herlihy, Nir Shavit. *The Art of Multiprocessor Programming*, 2nd ed. Morgan Kaufmann, 2020.
- E. G. Coffman, M. Elphick, A. Shoshani. System Deadlocks. *ACM Computing Surveys* 3(2), 1971. <https://doi.org/10.1145/356586.356588>
