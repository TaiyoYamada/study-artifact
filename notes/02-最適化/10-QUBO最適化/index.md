---
title: QUBO最適化
status: 執筆済
summary: 0-1 変数の二次式を最小化する単一の形式。多くの NP 困難問題がこの形に書き直せるため、量子・専用ハードウェアの入口になっている。
tags: [最適化, QUBO]
---

# QUBO最適化

**0-1 変数の二次式を最小化する**という、たった一つの形式。
Quadratic Unconstrained Binary Optimization。

$$\min_{x \in \{0,1\}^n} \; x^\top Q x$$

制約が無い（unconstrained）のが定義に含まれる点が重要で、
制約は[[最適化/QUBO最適化/ペナルティ項|ペナルティ項]]として
目的関数に取り込む。

## なぜこの形が重要なのか

多くの [[最適化/組合せ最適化|NP 困難な組合せ問題]]が、
この単一の形式に書き直せる。Lucas は主要な NP 完全問題群について
イジング形式（QUBO と等価）を体系的に与えた。

つまり **QUBO を解く装置を 1 つ作れば、多くの問題に使える**。
[[最適化/量子最適化/量子アニーリング|量子アニーリングマシン]]や
[[最適化/量子最適化/QAOA|QAOA]]、専用の古典ハードウェア（イジングマシン）が
QUBO を入口にしているのはこのため。

## 中身

- [[最適化/QUBO最適化/QUBO|QUBO]] — 形式そのもの
- [[最適化/QUBO最適化/イジングモデル|イジングモデル]] — 物理側の等価な表現
- [[最適化/QUBO最適化/QUBOとイジングモデルの変換|両者の変換]]
- [[最適化/QUBO最適化/制約条件のQUBO化|制約条件のQUBO化]]
- [[最適化/QUBO最適化/ペナルティ項|ペナルティ項]]
- [[最適化/QUBO最適化/組合せ問題のQUBO定式化|組合せ問題のQUBO定式化]]

## 参考文献

- Fred Glover, Gary Kochenberger, Yu Du. A Tutorial on Formulating and Using QUBO Models. 2019. <https://arxiv.org/abs/1811.11538>
- Andrew Lucas. Ising formulations of many NP problems. *Frontiers in Physics* 2, 2014. <https://doi.org/10.3389/fphy.2014.00005>
