---
title: Nelder-Mead法
status: 執筆済
tags: [最適化, DFO]
---

# Nelder-Mead法

**$n+1$ 個の点からなる単体（シンプレックス）を、変形させながら動かす手法。**
1965 年に Nelder と Mead が提案し、いまも `scipy.optimize.minimize` の
既定手法の一つとして広く使われている。

## 手順

各反復で、単体の頂点を良い順に並べ、最悪の頂点 $x_{n+1}$ を
他の頂点の重心 $\bar{x}$ に対して動かす。

| 操作 | 何をするか | いつ |
| --- | --- | --- |
| 反射 (reflection) | 最悪点を重心の反対側へ飛ばす | まず試す |
| 拡大 (expansion) | 反射先が最良だったので、さらに遠くへ | 反射が大当たり |
| 収縮 (contraction) | 反射しても悪いので、重心寄りに縮める | 反射が外れ |
| 縮小 (shrink) | 全頂点を最良点へ寄せる | 収縮も駄目 |

「上手くいく方向には大きく、駄目なら小さく」という
[[最適化/最適化の基礎/探索と活用|探索と活用]]の調整を、
図形の変形として実現している。

## 収束保証が無い

Nelder-Mead は**広く使われている割に理論保証が弱い**。
McKinnon は 1998 年に、2 次元の狭義凸関数でありながら
単体が**非停留点に収束してしまう**具体例を構成した。

つまり「止まった＝局所最適解」とは言えない。実務では

- 複数の初期単体から試す
- 停止後に再始動する（単体を作り直す）
- 高次元では避ける（$n$ が大きいと極端に遅くなる）

といった対処を併用することになる。

> [!warning] ノイズがあるとき
> 値の大小比較で動くため、評価にノイズが乗ると単体が誤った方向へ変形する。
> 量子デバイス上の期待値のような確率的な評価には向かず、
> [[最適化/導関数を使わない最適化/SPSA|SPSA]] や
> [[最適化/進化計算/CMA-ES|CMA-ES]] が選ばれる。

## 参考文献

- John A. Nelder, Roger Mead. A Simplex Method for Function Minimization. *The Computer Journal* 7(4), 1965. <https://doi.org/10.1093/comjnl/7.4.308>
- Ken I. M. McKinnon. Convergence of the Nelder–Mead Simplex Method to a Nonstationary Point. *SIAM Journal on Optimization* 9(1), 1998. <https://doi.org/10.1137/S1052623496303482>
- Jeffrey C. Lagarias et al. Convergence Properties of the Nelder–Mead Simplex Method in Low Dimensions. *SIAM Journal on Optimization* 9(1), 1998. <https://doi.org/10.1137/S1052623496303470>
