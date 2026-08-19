---
title: 量子アルゴリズム
status: 執筆済
summary: 量子計算機で動かすアルゴリズム。指数的加速が確立しているのは構造のある限られた問題だけ。
tags: [量子アルゴリズム]
---

# 量子アルゴリズム

量子計算機で動かすアルゴリズム。

## 高速化の型

量子アルゴリズムの加速は、いくつかの型に分類できる。

| 型 | 加速 | 例 |
| --- | --- | --- |
| 指数的 | $\mathcal{O}(2^n) \to \mathrm{poly}(n)$ | [[量子アルゴリズム/Shorアルゴリズム\|Shor]]、[[量子シミュレーション/Hamiltonian-Simulation\|Hamiltonian simulation]] |
| 二次 | $\mathcal{O}(N) \to \mathcal{O}(\sqrt N)$ | [[量子アルゴリズム/Groverアルゴリズム\|Grover]] |
| 不明・ヒューリスティック | 未確立 | [[最適化/量子最適化/QAOA\|QAOA]]、[[量子アルゴリズム/VQE\|VQE]] |

**指数的加速が確立しているのは限られた問題だけ。**
どんな問題でも速くなるわけではない。

## 何が加速を生むのか

[[量子力学/重ね合わせ|重ね合わせ]]そのものではなく、
**干渉によって誤った答えの[[数学/量子計算のための数学/確率振幅|振幅]]を打ち消す**こと。

Shor が速いのは、周期性という構造を
[[量子アルゴリズム/量子フーリエ変換|量子フーリエ変換]]で
抽出できるから。構造の無い問題では
[[量子アルゴリズム/Groverアルゴリズム|Grover]] の二次加速が上限になる。

## NISQ 期のアルゴリズム

深い回路が実行できないため、
浅い回路と古典最適化を組み合わせる
**変分アルゴリズム**が中心になっている。
[[量子アルゴリズム/VQE|VQE]] と [[最適化/量子最適化/QAOA|QAOA]] が代表。

これらは**理論的な加速の保証が無い**ヒューリスティックである点が、
Shor や Grover と決定的に違う。

## 参考文献

- Ashley Montanaro. Quantum algorithms: an overview. *npj Quantum Information* 2, 2016. <https://doi.org/10.1038/npjqi.2015.23>
- Stephen Jordan. Quantum Algorithm Zoo <https://quantumalgorithmzoo.org/>
- Michael A. Nielsen, Isaac L. Chuang. *Quantum Computation and Quantum Information*, 10th Anniversary Edition. Cambridge University Press, 2010. <https://doi.org/10.1017/CBO9780511976667>
