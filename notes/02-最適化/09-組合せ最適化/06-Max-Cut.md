---
title: Max-Cut
status: 執筆済
tags: [最適化, 組合せ最適化, Max-Cut]
---

# Max-Cut

**グラフの頂点を 2 つに分け、両側をまたぐ辺の重みの合計を最大にする**問題。

$$\max_{s \in \{-1,+1\}^n} \; \frac{1}{2}\sum_{(i,j) \in E} w_{ij} \, (1 - s_i s_j)$$

$s_i$ がどちら側に属するかを表す。

## なぜよく出てくるのか

**イジング模型そのもの**だから。上式を整理すると

$$\text{const} - \frac{1}{2}\sum_{(i,j)} w_{ij} s_i s_j$$

となり、[[最適化/QUBO最適化/イジングモデル|イジング模型]]の
エネルギー最小化と一致する。変換も近似も要らず、
**そのまま量子ハードウェアの問題になる**。

このため [[最適化/量子最適化/QAOA|QAOA]] の性能評価では
Max-Cut が事実上の標準ベンチマークになっている。

## 近似の到達点

Goemans と Williamson は、半正定値計画 (SDP) に緩和してから
ランダム超平面で丸める手法により、
**最適値の 0.87856 倍以上**を保証した。

さらに、Unique Games 予想が正しければ、
多項式時間でこれを超える近似は不可能であることが示されている。
つまり **0.878 は理論的な限界に到達している可能性が高い**。

> [!note] QAOA の評価で気をつけること
> QAOA の近似比を報告する論文は多いが、
> 浅い層では 0.878 に届かないことがほとんど。
> 「量子だから優れている」ではなく、
> 古典の SDP 緩和という強い基準線と比べる必要がある。

## 参考文献

- Michel X. Goemans, David P. Williamson. Improved approximation algorithms for maximum cut and satisfiability problems using semidefinite programming. *Journal of the ACM* 42(6), 1995. <https://doi.org/10.1145/227683.227684>
- Subhash Khot et al. Optimal Inapproximability Results for MAX-CUT and Other 2-Variable CSPs? *SIAM Journal on Computing* 37(1), 2007. <https://doi.org/10.1137/S0097539705447372>
- Andrew Lucas. Ising formulations of many NP problems. *Frontiers in Physics* 2, 2014. <https://doi.org/10.3389/fphy.2014.00005>
