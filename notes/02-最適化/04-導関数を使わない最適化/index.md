---
title: 導関数を使わない最適化
summary: 目的関数の値しか使えないときの最適化。微分できない、式が分からない、値にノイズが乗る、といった場面で選ぶことになる。
tags: [最適化, DFO]
status: 執筆済
---

# 導関数を使わない最適化

**目的関数の値だけを手がかりに最適化する手法の総称。**
Derivative-Free Optimization、DFO。

## いつ必要になるか

[[最適化/勾配に基づく最適化|勾配が使えるなら、勾配を使うべき]]。
それでも導関数を使わない手法に頼るのは、次のどれかに当てはまるとき。

1. **微分できない** — 目的関数が不連続、あるいは離散的な判断を含む
2. **式が分からない** — シミュレータや実機が中身で、入力と出力しか見えない
3. **微分が高価すぎる** — 数値微分すると次元数に比例して評価が増える
4. **値にノイズが乗る** — 差分を取ると、ノイズが差の分母で拡大される

量子計算での[[最適化/量子最適化/VQEによる最適化|VQE のパラメータ探索]]は
2 と 4 に当てはまる。期待値は有限ショットの標本平均なので、
測るたびに値がぶれる。

## 系統

| 系統 | 考え方 | 例 |
| --- | --- | --- |
| 直接探索 | 近傍を調べて良い方へ動く | [[最適化/導関数を使わない最適化/山登り法\|山登り法]]、[[最適化/導関数を使わない最適化/Nelder-Mead法\|Nelder-Mead 法]] |
| 確率的勾配近似 | 少ない評価で勾配を推定する | [[最適化/導関数を使わない最適化/SPSA\|SPSA]] |
| 分布ベース | 分布から引き、分布を更新する | [[最適化/進化計算/CMA-ES\|CMA-ES]] |
| 代理モデル | 関数を近似してから最適化する | [[最適化/導関数を使わない最適化/ベイズ最適化\|ベイズ最適化]] |

## 選び方の目安

評価回数の予算で決まる、と考えると整理しやすい。

- **数十〜数百回** … ベイズ最適化。1 回の評価が高価な場合
- **数千回** … CMA-ES、Nelder-Mead
- **ノイズが大きい** … SPSA、CMA-ES（値ではなく順位を使うため頑健）

## 参考文献

- Jeffrey Larson, Matt Menickelly, Stefan M. Wild. Derivative-free optimization methods. *Acta Numerica* 28, 2019.（現代的な総説） <https://arxiv.org/abs/1904.11585>
- Andrew R. Conn, Katya Scheinberg, Luís N. Vicente. *Introduction to Derivative-Free Optimization*. SIAM, 2009. <https://doi.org/10.1137/1.9780898718768>
- Luis Miguel Rios, Nikolaos V. Sahinidis. Derivative-free optimization: a review of algorithms and comparison of software implementations. *Journal of Global Optimization* 56, 2013. <https://doi.org/10.1007/s10898-012-9951-y>
