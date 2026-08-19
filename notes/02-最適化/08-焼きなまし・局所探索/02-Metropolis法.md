---
title: Metropolis法
status: 執筆済
tags: [最適化, 焼きなまし, MCMC]
---

# Metropolis法

**確率 $\exp(-\Delta E / T)$ で状態遷移を受け入れる**という規則。
1953 年に Metropolis らが統計力学の数値計算のために導入した。
[[最適化/焼きなまし・局所探索/焼きなまし法|焼きなまし法]]の受理規則はこれそのもの。

## 何のための規則か

目的は最適化ではなく、**ボルツマン分布からの標本抽出**だった。

$$p(x) \propto \exp\!\left(-\frac{E(x)}{k_B T}\right)$$

温度 $T$ の熱平衡にある系で状態 $x$ が現れる確率。
これを直接計算するには全状態の和（分配関数）が要り、実行不可能。
Metropolis 法は**分配関数を計算せずにこの分布から引く**手続きを与える。

## 手続き

1. 現在の状態 $x$ から候補 $x'$ を提案する
2. $\Delta E = E(x') - E(x)$
3. $\Delta E \le 0$ なら受け入れる
4. $\Delta E > 0$ なら確率 $\exp(-\Delta E / T)$ で受け入れる

比 $p(x')/p(x)$ だけで判定できるので、分配関数が消えるのが要点。

## 最適化への転用

Kirkpatrick らは、**エネルギーを目的関数、温度を制御パラメータ**と読み替えた。
$T \to 0$ の極限でボルツマン分布は最小エネルギー状態に集中するので、
温度を下げながら Metropolis 法を回せば最適解に近づく、という論法になる。

$T$ を固定すれば標本抽出（MCMC）、$T$ を下げれば最適化（焼きなまし）。
同じ手続きの目的が違うだけ。

## 参考文献

- Nicholas Metropolis et al. Equation of State Calculations by Fast Computing Machines. *The Journal of Chemical Physics* 21(6), 1953. <https://doi.org/10.1063/1.1699114>
- W. Keith Hastings. Monte Carlo sampling methods using Markov chains and their applications. *Biometrika* 57(1), 1970. <https://doi.org/10.1093/biomet/57.1.97>
- Scott Kirkpatrick, C. Daniel Gelatt, Mario P. Vecchi. Optimization by Simulated Annealing. *Science* 220(4598), 1983. <https://doi.org/10.1126/science.220.4598.671>
