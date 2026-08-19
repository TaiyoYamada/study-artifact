---
title: CMA-ESの基本
status: 執筆済
tags: [最適化, CMA-ES]
---

# CMA-ESの基本

1 世代でやることは 3 段階しかない。

## 1. 生成

分布から $\lambda$ 個の候補を引く。

$$x_i = m + \sigma \, y_i, \qquad y_i \sim \mathcal{N}(0, C), \qquad i = 1, \dots, \lambda$$

## 2. 評価と並べ替え

$f(x_i)$ を測り、良い順に並べる。以降 $x_{i:\lambda}$ は $i$ 番目に良い候補を指す。

ここで**値そのものは使わず、順位だけを使う**のが重要。
$f$ を単調増加関数で変換しても（たとえば $f^3$ や $\log f$ にしても）
挙動が変わらない。この**単調変換に対する不変性**が、
スケールの分からない目的関数に対する頑健さの源になっている。

## 3. 更新

上位 $\mu$ 個の重み付き平均で中心を動かす。

$$m \leftarrow m + c_m \sum_{i=1}^{\mu} w_i (x_{i:\lambda} - m)$$

重み $w_i$ は上位ほど大きく、$\sum w_i = 1$。既定では
$\mu = \lfloor \lambda / 2 \rfloor$、$w_i \propto \ln(\mu + 0.5) - \ln i$。

続けて[[最適化/進化計算/CMA-ES/共分散行列適応|共分散行列]]と
[[最適化/進化計算/CMA-ES/ステップサイズ適応|ステップサイズ]]を更新する。

## 既定値

CMA-ES の実用上の強みは、**ハイパーパラメータをほぼ触らなくてよい**こと。
集団サイズの既定値は次元 $n$ から決まる。

$$\lambda = 4 + \lfloor 3 \ln n \rfloor$$

利用者が決めるのは初期点 $m^{(0)}$ と初期ステップサイズ $\sigma^{(0)}$ の 2 つだけ。
$\sigma^{(0)}$ は「探索したい範囲の 1/4 程度」が目安とされる。

> [!tip] 多峰性が強いとき
> $\lambda$ を既定より大きくすると、局所解に落ちにくくなる。
> [[最適化/進化計算/CMA-ES/再始動戦略|再始動戦略]] (IPOP-CMA-ES) は
> これを自動化したもの。

## 参考文献

- Nikolaus Hansen. The CMA Evolution Strategy: A Tutorial. 2016.（実装まで踏み込んだ標準的な解説） <https://arxiv.org/abs/1604.00772>
- Nikolaus Hansen, Andreas Ostermeier. Completely Derandomized Self-Adaptation in Evolution Strategies. *Evolutionary Computation* 9(2), 2001.（CMA-ES の原論文） <https://doi.org/10.1162/106365601750190398>
- CMA-ES 公式サイトと参照実装 pycma <https://github.com/CMA-ES/pycma>
