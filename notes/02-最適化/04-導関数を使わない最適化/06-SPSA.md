---
title: SPSA
status: 執筆済
tags: [最適化, DFO, SPSA, 確率的最適化]
---

# SPSA

**Simultaneous Perturbation Stochastic Approximation。**
全変数を**同時に**ランダムに揺らし、その 2 点の差だけで勾配全体を近似する手法。
Spall が 1992 年に提案した。

## 何が効率的なのか

有限差分で勾配を作ると、$p$ 次元に対して各成分ごとに 2 点、
計 $2p$ 回の評価が要る。SPSA は**次元によらず 2 回**で済む。

$$\hat{g}_{k,i}(\hat{\theta}_k) = \frac{y(\hat{\theta}_k + c_k \Delta_k) - y(\hat{\theta}_k - c_k \Delta_k)}{2 c_k \Delta_{ki}}$$

分子は全成分で**共通**で、分母だけが成分ごとに変わる。
1 回の摂動から全成分の推定値を取り出しているのが要点。

各成分の推定は粗いが、$\Delta_k$ を毎回引き直すため
**期待値としては正しい方向を向く**。反復を重ねるうちに誤差が均される。
Spall は、同じ反復回数なら有限差分と同程度の統計的精度に達することを示した。

## 摂動ベクトルの条件

$\Delta_k$ の各成分は独立に引くが、**逆モーメント $\mathbb{E}[|1/\Delta_{ki}|]$ が
有限**である必要がある。分母に $\Delta_{ki}$ が来るため。

このため**正規分布と一様分布は使えない**。0 付近の値を取りうるので
逆モーメントが発散する。標準は**対称ベルヌーイ分布**（$\pm 1$ を等確率）。

## ゲイン列

$$a_k = \frac{a}{(A + k + 1)^\alpha}, \qquad c_k = \frac{c}{(k+1)^\gamma}$$

漸近的な最適値は $\alpha = 1.0,\ \gamma = 1/6$ だが、
有限回では減衰が速すぎて動かなくなる。実用上は
$\alpha = 0.602,\ \gamma = 0.101$ が推奨される。
$c$ は測定ノイズの標準偏差と同程度、$A$ は想定反復回数の 10% 程度が目安。

## 量子計算での位置づけ

[[最適化/量子最適化/VQEによる最適化|VQE]] のパラメータ最適化で
SPSA が標準的に使われるのは、この分野の制約と噛み合うため。

- パラメータシフト則で厳密な勾配を得ると $\mathcal{O}(p)$ 回の回路評価が要る。
  SPSA は $\mathcal{O}(1)$
- 期待値は有限ショットの標本平均なので、そもそも**ノイズを前提とした手法**が要る。
  SPSA は確率的近似の枠組みで設計されており、ノイズがあることが前提

詳しくは[[論文メモ/spsa-implementation|Spall (1998) の実装ガイド]]のメモを参照。

## 参考文献

- James C. Spall. Multivariate Stochastic Approximation Using a Simultaneous Perturbation Gradient Approximation. *IEEE Transactions on Automatic Control* 37(3), 1992.（原論文） <https://doi.org/10.1109/9.119632>
- James C. Spall. Implementation of the Simultaneous Perturbation Algorithm for Stochastic Optimization. *IEEE Transactions on Aerospace and Electronic Systems* 34(3), 1998.（実装ガイド） <https://doi.org/10.1109/7.705889>
- James C. Spall. *Introduction to Stochastic Search and Optimization*. Wiley, 2003. <https://doi.org/10.1002/0471722138>
