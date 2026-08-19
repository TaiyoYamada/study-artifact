---
title: Mutex
status: 執筆済
tags: [コンピュータ, 並行処理]
---

# Mutex

**同時に 1 つのスレッドだけが臨界区間に入れるようにする。**
mutual exclusion。

```
lock(m)
    共有データを操作する    ← 臨界区間
unlock(m)
```

## 満たすべき性質

| 性質 | 内容 |
| --- | --- |
| 相互排他 | 同時に 1 つだけ |
| 進行性 | 誰も入っていなければ、入りたい者が入れる |
| 有限待ち | いつかは順番が来る（飢餓しない） |

## 実装の基盤

ソフトウェアだけでは効率的に実現できない。
**ハードウェアのアトミック命令**が要る。

| 命令 | 内容 |
| --- | --- |
| test-and-set | 値を読んで 1 を書く。これが不可分 |
| **compare-and-swap (CAS)** | 期待値と一致したら書き換える |
| load-linked / store-conditional | ARM、RISC-V の方式 |

CAS は多くの並行データ構造の基礎になっている。

## スピンロックとブロッキング

| | スピン | ブロック |
| --- | --- | --- |
| 待ち方 | ループで確認し続ける | スレッドを寝かせる |
| コスト | CPU を消費する | コンテキストスイッチ |
| 適する場面 | **待ちが極めて短い** | 待ちが長い |

実用的な実装（Linux の futex）は、
**まず少しスピンし、駄目なら寝る**というハイブリッド。
短い待ちでスイッチのコストを避けつつ、
長い待ちで CPU を無駄にしない。

## 粒度

| 粒度 | 並列性 | 危険 |
| --- | --- | --- |
| 粗い（全体を 1 つのロック） | 低い | 安全だが遅い |
| 細かい（要素ごと） | 高い | **[[コンピュータ/並行・並列処理/Deadlock\|デッドロック]]しやすい** |

細粒度化は性能を上げるが、
ロック順序の管理が難しくなる。
**まず粗いロックで正しく作り、
測ってから細かくする**のが実務的な順序。

## 参考文献

- Maurice Herlihy, Nir Shavit. *The Art of Multiprocessor Programming*, 2nd ed. Morgan Kaufmann, 2020.
- Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau. *Operating Systems: Three Easy Pieces*. Arpaci-Dusseau Books, 2018.（全文公開） <https://pages.cs.wisc.edu/~remzi/OSTEP/>
- Hubertus Franke, Rusty Russell, Matthew Kirkwood. Fuss, Futexes and Furwocks: Fast Userlevel Locking in Linux. *Ottawa Linux Symposium*, 2002. <https://www.kernel.org/doc/ols/2002/ols2002-pages-479-495.pdf>
