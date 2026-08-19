---
title: Mahalanobis距離
status: 執筆済
tags: [数学, 最適化, 統計]
---

# Mahalanobis距離

**分布の形を考慮した距離。**

$$d_M(x, \mu) = \sqrt{(x-\mu)^\top \Sigma^{-1} (x-\mu)}$$

$\Sigma$ が[[数学/線形代数/共分散行列|共分散行列]]。

## ユークリッド距離との違い

ユークリッド距離はすべての方向を等しく扱う。
しかしデータのばらつきが方向によって違うなら、
**ばらつきの大きい方向のずれは軽く、小さい方向のずれは重く**見るべき。

$\Sigma^{-1}$ がこの重み付けを担う。
$\Sigma = I$（等方的）ならユークリッド距離に一致する。

## 白色化との関係

$$d_M = \|\Sigma^{-1/2}(x - \mu)\|$$

[[数学/線形代数/行列の逆平方根|逆平方根]]で
[[数学/線形代数/共分散行列|分布を球状に戻して]]から、
ふつうのユークリッド距離を測っているのと同じ。
「歪みを取り除いてから測る」という操作。

## どこで使うか

- [[数学/確率/多変量正規分布|多変量正規分布]]の指数部がこの二乗
- 外れ値検出。$d_M$ が閾値を超えたら異常
- 判別分析、クラスタリング
- [[最適化/進化計算/CMA-ES/ステップサイズ適応|CMA-ES]] が
  進化パスの長さを白色化空間で測るのも同じ考え方

## 注意

$\Sigma$ を推定して使うので、
標本数が次元より少ないと $\Sigma$ が特異になり、
$\Sigma^{-1}$ が計算できない。
高次元では正則化や次元削減が要る。

## 参考文献

- Prasanta Chandra Mahalanobis. On the generalised distance in statistics. *Proceedings of the National Institute of Sciences of India* 2(1), 1936.（復刻） <https://doi.org/10.1007/s13171-019-00164-5>
- Christopher M. Bishop. *Pattern Recognition and Machine Learning*, §2.3. Springer, 2006. <https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/>
