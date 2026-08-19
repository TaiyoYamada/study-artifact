---
title: 組合せ問題のQUBO定式化
status: 執筆済
tags: [最適化, QUBO]
---

# 組合せ問題のQUBO定式化

代表的な問題を QUBO に落とすときの型。

## Max-Cut

最も素直。変換も[[最適化/QUBO最適化/ペナルティ項|ペナルティ]]も要らない。

$$\max \frac{1}{2}\sum_{(i,j)} w_{ij}(1 - s_i s_j)$$

そのまま[[最適化/QUBO最適化/イジングモデル|イジング模型]]。
[[最適化/量子最適化/QAOA|QAOA]] の標準ベンチマークになっている理由。

## 数分割問題

$$H = \left(\sum_i a_i s_i\right)^2$$

これも制約なし。ただし全変数が結合する**完全結合**になる。

## 巡回セールスマン問題

$x_{i,t} = 1$ を「時刻 $t$ に都市 $i$ にいる」と定義する。
$n$ 都市に $n^2$ 変数が要る。

$$H = A\sum_i\Bigl(\sum_t x_{i,t} - 1\Bigr)^2 + A\sum_t\Bigl(\sum_i x_{i,t} - 1\Bigr)^2 + B\sum_{i,j,t} d_{ij}\, x_{i,t} x_{j,t+1}$$

前 2 項が制約（各都市はちょうど 1 回、各時刻はちょうど 1 都市）、
第 3 項が経路長。$A > B \cdot \max d_{ij}$ が必要条件。

## 定式化の良し悪し

同じ問題でも定式化次第で解けるかが変わる。見るべき点は 3 つ。

| 観点 | 望ましい方向 |
| --- | --- |
| 変数の個数 | 少ないほどよい。TSP の $n^2$ は重い |
| 結合の密度 | 疎なほどハードウェアに載せやすい |
| 係数のレンジ | 狭いほどよい。[[最適化/QUBO最適化/ペナルティ項\|精度の問題]]を避けられる |

Lucas は主要な NP 完全問題について、
必要な変数数まで含めた定式化を体系的に与えており、
この分野の実質的な出発点になっている。

## 参考文献

- Andrew Lucas. Ising formulations of many NP problems. *Frontiers in Physics* 2, 2014. <https://doi.org/10.3389/fphy.2014.00005>
- Fred Glover, Gary Kochenberger, Yu Du. A Tutorial on Formulating and Using QUBO Models. 2019. <https://arxiv.org/abs/1811.11538>
