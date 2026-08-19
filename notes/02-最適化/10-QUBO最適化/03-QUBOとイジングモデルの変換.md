---
title: QUBOとイジングモデルの変換
status: 執筆済
tags: [最適化, QUBO, イジング模型]
---

# QUBOとイジングモデルの変換

両者は**変数の取る値が違うだけ**で、同じ問題を表す。

| | QUBO | イジング |
| --- | --- | --- |
| 変数 | $x_i \in \{0, 1\}$ | $s_i \in \{-1, +1\}$ |
| 目的 | $\min x^\top Q x$ | $\min H(s)$ |
| 出身 | 数理最適化 | 統計物理 |

## 変換式

$$s_i = 2x_i - 1 \qquad \Longleftrightarrow \qquad x_i = \frac{s_i + 1}{2}$$

一次の対応なので、代入して整理すれば係数が移る。

$$J_{ij} = -\frac{Q_{ij}}{4}, \qquad h_i = -\frac{1}{2}\left( Q_{ii} + \frac{1}{2}\sum_{j \ne i} Q_{ij} \right)$$

（符号や係数は $H$ の定義の置き方で変わるので、実装では使うライブラリの規約を確認する。）

## 定数項が出る

変換では**変数に依存しない定数**が現れる。
最適解の位置は変わらないが、**エネルギーの値そのものは一致しない**。

量子アニーラの出力エネルギーを元の目的関数値と比べるときは、
この定数のずれを戻す必要がある。実測値が合わないときに
最初に疑うべき点。

## どちらで書くか

- ハードウェア（D-Wave など）は**イジング形式**が素の入力
- 問題の定式化は $x \in \{0,1\}$ で「選ぶ / 選ばない」と書く方が自然

実務では QUBO で定式化してからイジングに変換する流れが多く、
ライブラリ（PyQUBO、D-Wave Ocean など）がこの変換を担う。

## 参考文献

- Fred Glover, Gary Kochenberger, Yu Du. A Tutorial on Formulating and Using QUBO Models. 2019. <https://arxiv.org/abs/1811.11538>
- Andrew Lucas. Ising formulations of many NP problems. *Frontiers in Physics* 2, 2014. <https://doi.org/10.3389/fphy.2014.00005>
