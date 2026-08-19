---
title: 制約条件のQUBO化
status: 執筆済
tags: [最適化, QUBO]
---

# 制約条件のQUBO化

QUBO は定義上**制約を持てない**（Unconstrained）。
制約は目的関数に取り込むしかない。

## 等式制約

$\sum_i a_i x_i = b$ は、違反量の二乗を足す。

$$P \left( \sum_i a_i x_i - b \right)^2$$

満たされていれば 0、破れば正の値。$P$ が
[[最適化/QUBO最適化/ペナルティ項|ペナルティ係数]]。

**One-hot 制約**（$n$ 個からちょうど 1 つ選ぶ）は特に頻出。

$$P \left( \sum_i x_i - 1 \right)^2$$

## 不等式制約

$\sum_i a_i x_i \le b$ は、そのままでは二乗できない。
**スラック変数**を足して等式にする。

$$\sum_i a_i x_i + \sum_k 2^k y_k = b$$

$y_k$ は 0-1 変数で、二進数表現で $0 \sim b$ の任意の値を作る。
これで等式制約に帰着できるが、**変数が $\lceil \log_2 b \rceil$ 個増える**。

## 変数の増加が実務上の壁

不等式制約の多い問題を QUBO 化すると、変数が急増する。
量子アニーラの量子ビット数には限りがあり、
さらに[[最適化/量子最適化/量子アニーリング|埋め込み]]の際に
1 論理ビットが複数の物理ビットに展開されるため、
実際に扱える問題規模はカタログ上のビット数よりずっと小さくなる。

[[最適化/組合せ最適化/ナップサック問題|ナップサック問題]]が
量子アニーリングの題材として扱いにくいのはこの理由。

## 参考文献

- Fred Glover, Gary Kochenberger, Yu Du. A Tutorial on Formulating and Using QUBO Models. 2019. <https://arxiv.org/abs/1811.11538>
- Andrew Lucas. Ising formulations of many NP problems. *Frontiers in Physics* 2, 2014. <https://doi.org/10.3389/fphy.2014.00005>
