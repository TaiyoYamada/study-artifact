---
title: 準Newton法
status: 執筆済
tags: [最適化, 勾配法]
---

# 準Newton法

**ヘッセ行列を計算せず、勾配の履歴から近似する**手法。quasi-Newton。

$$x_{k+1} = x_k - \alpha_k B_k^{-1} \nabla f(x_k)$$

$B_k$ がヘッセ行列の近似。

## セカント条件

近似が満たすべき関係は、勾配の変化から導かれる。

$$B_{k+1} \, s_k = y_k, \qquad s_k = x_{k+1} - x_k, \quad y_k = \nabla f(x_{k+1}) - \nabla f(x_k)$$

「移動した量」と「勾配が変化した量」の比が曲率を表す、という一次元の割線法を
多次元に持ち上げたもの。この条件を満たす $B$ は無数にあるので、
更新則の違いが手法の違いになる。

## BFGS

最も広く使われる更新則。$B_k$ に**ランク 2 の修正**を加える。

- 正定値性が保たれる（下る方向が保証される）
- 逆行列を直接更新できるので $\mathcal{O}(n^2)$ で済む
- Wolfe 条件を満たす直線探索と組み合わせると超線形収束

## L-BFGS

$n$ が大きいと $n \times n$ 行列すら持てない。
**直近 $m$ 組の $(s_k, y_k)$ だけを保持**し、行列を陽に作らずに
$B_k^{-1}\nabla f$ を計算する。$m = 5 \sim 20$ が典型で、
記憶量は $\mathcal{O}(mn)$。大規模問題の標準手法になっている。

## CMA-ES との関係

[[最適化/進化計算/CMA-ES/共分散行列適応|CMA-ES の共分散行列]]も、
標本から二階の情報を推定して座標系を直している。
勾配が使えるかどうかが違うだけで、目的は同じ。

## 参考文献

- Jorge Nocedal, Stephen J. Wright. *Numerical Optimization*, 2nd ed. Springer, 2006. <https://doi.org/10.1007/978-0-387-40065-5>
- Dong C. Liu, Jorge Nocedal. On the limited memory BFGS method for large scale optimization. *Mathematical Programming* 45, 1989. <https://doi.org/10.1007/BF01589116>
