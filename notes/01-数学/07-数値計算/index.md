---
title: 数値計算
status: 執筆済
summary: 有限の精度と時間で数学的な操作を近似する分野。紙の上の数学と計算機上の計算の差を扱う。
tags: [数学, 数値計算]
---

# 数値計算

**有限の精度と有限の時間で、数学的な操作を近似する**分野。

紙の上の数学と計算機の上の計算は違う。
その差から何が起き、どう対処するかを扱う。

## 2 種類の誤差

| 誤差 | 原因 |
| --- | --- |
| **丸め誤差** | 実数を有限桁で表すことによる |
| **打ち切り誤差** | 無限の操作を有限で止めることによる |

[[数学/数値計算/数値微分\|数値微分]]は両方を含み、
刻み幅を小さくすると打ち切り誤差は減るが丸め誤差が増える、
という綱引きになる。

## この分野で効いてくる場面

- [[最適化/進化計算/CMA-ES/固有値分解と白色化|CMA-ES の共分散行列]]が
  数値的に対称性を失う
- [[最適化/QUBO最適化/ペナルティ項|QUBO の係数]]がハードウェアの
  ダイナミックレンジに収まらない
- 悪条件な問題で[[数学/線形代数/逆行列|逆行列]]が信用できない

## 参考文献

- David Goldberg. What Every Computer Scientist Should Know About Floating-Point Arithmetic. *ACM Computing Surveys* 23(1), 1991. <https://doi.org/10.1145/103162.103163>
- Nicholas J. Higham. *Accuracy and Stability of Numerical Algorithms*, 2nd ed. SIAM, 2002. <https://doi.org/10.1137/1.9780898718027>
- Lloyd N. Trefethen, David Bau III. *Numerical Linear Algebra*. SIAM, 1997. <https://doi.org/10.1137/1.9780898719574>
