---
title: 量子化学
status: 執筆済
summary: 分子の性質を量子力学から計算する分野。多電子系は指数的に難しく、量子計算の最有力な応用先とされる。
tags: [量子化学]
---

# 量子化学

**分子の性質を量子力学から計算する**分野。
量子計算機の最有力な応用先とされている。

## 解きたい問題

分子の[[量子力学/ハミルトニアン|ハミルトニアン]]の
**基底状態エネルギー**を求めること。

$$H|\psi\rangle = E|\psi\rangle$$

ここから反応のしやすさ、結合の強さ、
分子構造の安定性といった化学的な性質が導かれる。

## なぜ難しいのか

電子は互いに反発する（[[量子化学/電子相関|電子相関]]）ため、
多電子系の[[量子力学/シュレディンガー方程式|シュレディンガー方程式]]は
**解析的に解けない**。

厳密対角化（Full CI）の計算量は
**電子数と基底関数に対して指数的**に増える。
30 個程度の軌道で古典計算機の限界に達する。

## 近似の階層

| 手法 | 電子相関の扱い | 計算量 |
| --- | --- | --- |
| [[量子化学/ハートリー・フォック法\|Hartree-Fock]] | 平均場のみ | $\mathcal{O}(n^4)$ |
| MP2 | 摂動論で一部 | $\mathcal{O}(n^5)$ |
| CCSD(T) | 高精度。「黄金律」 | $\mathcal{O}(n^7)$ |
| Full CI | 厳密 | **指数的** |

## 量子計算への期待

Full CI を多項式時間で、というのが期待。
ただし[[最適化/量子最適化/VQEによる最適化|VQE]] には
測定コストと最適化の困難があり、
[[量子アルゴリズム/量子位相推定|量子位相推定]]には
誤り訂正が要る。**実用的な優位性はまだ示されていない。**

## 参考文献

- Attila Szabo, Neil S. Ostlund. *Modern Quantum Chemistry*. Dover, 1996. <https://store.doverpublications.com/products/9780486691862>
- Sam McArdle et al. Quantum computational chemistry. *Reviews of Modern Physics* 92(1), 2020. <https://doi.org/10.1103/RevModPhys.92.015003>
- Yudong Cao et al. Quantum Chemistry in the Age of Quantum Computing. *Chemical Reviews* 119(19), 2019. <https://doi.org/10.1021/acs.chemrev.8b00803>
