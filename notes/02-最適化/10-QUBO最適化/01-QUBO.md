---
title: QUBO
status: 執筆済
tags: [最適化, QUBO]
---

# QUBO

$$\min_{x \in \{0,1\}^n} \; x^\top Q x = \sum_{i \le j} Q_{ij} x_i x_j$$

$Q$ は上三角（または対称）行列。変数は 0 か 1 の二値。

## 一次の項は要らない

$x_i \in \{0,1\}$ なので $x_i^2 = x_i$。
つまり対角成分 $Q_{ii} x_i^2$ が一次の項 $Q_{ii} x_i$ になる。
**一次と二次を分けて書く必要がない**のはこのため。

## なぜ二次で止めるのか

三次以上の項があっても、補助変数を導入すれば二次に落とせる
（次数削減、quadratization）。ただし変数が増える。

二次に限る理由はハードウェア側にある。
[[最適化/量子最適化/量子アニーリング|量子アニーラ]]も
イジングマシンも**2 体相互作用しか実装できない**。
物理的に実現しやすい形が二次だった、という順序。

## 難しさ

QUBO は NP 困難。$Q$ が任意なら
[[最適化/組合せ最適化/Max-Cut|Max-Cut]] を含むので当然。

一方で $Q$ に構造があれば解ける場合もある。
たとえば $Q$ の非対角成分がすべて非正なら、
最小カット問題に帰着して多項式時間で解ける。

## 解く手段

| 種類 | 例 |
| --- | --- |
| 汎用ソルバ | Gurobi、CPLEX（MIQP として） |
| ヒューリスティック | [[最適化/焼きなまし・局所探索/焼きなまし法\|焼きなまし]]、タブー探索 |
| 専用ハードウェア | イジングマシン、[[最適化/量子最適化/量子アニーリング\|量子アニーラ]] |
| 量子回路 | [[最適化/量子最適化/QAOA\|QAOA]] |

## 参考文献

- Fred Glover, Gary Kochenberger, Yu Du. A Tutorial on Formulating and Using QUBO Models. 2019. <https://arxiv.org/abs/1811.11538>
- Andrew Lucas. Ising formulations of many NP problems. *Frontiers in Physics* 2, 2014. <https://doi.org/10.3389/fphy.2014.00005>
