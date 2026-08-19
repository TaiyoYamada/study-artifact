---
title: HHL
status: 執筆済
tags: [量子アルゴリズム, HHL]
---

# HHL

**連立一次方程式 $Ax = b$ を解く**量子アルゴリズム。
Harrow、Hassidim、Lloyd が 2009 年に提案した。

$$\mathcal{O}\bigl(\log(N) \, s^2 \kappa^2 / \epsilon\bigr)$$

$N$ が次元、$s$ が疎性、$\kappa$ が[[数学/数値計算/条件数|条件数]]。
古典の $\mathcal{O}(N s \kappa)$ に対し、
$N$ について**指数的に速い**ように見える。

## 仕組み

1. $|b\rangle$ を用意する
2. [[量子アルゴリズム/量子位相推定|量子位相推定]]で $A$ の固有値を取り出す
3. 固有値の**逆数**を振幅に載せる（制御回転）
4. 位相推定を巻き戻す

$A = \sum \lambda_i |u_i\rangle\langle u_i|$ に対し
$A^{-1} = \sum \lambda_i^{-1}|u_i\rangle\langle u_i|$ を作る、という発想。

## 但し書きが多い

**「指数的に速い」を額面通り受け取ってはいけない。**
Aaronson が整理した注意点。

| 条件 | 内容 |
| --- | --- |
| 入力 | $\|b\rangle$ を効率的に準備できる必要がある |
| 出力 | 得られるのは $\|x\rangle$ という**量子状態**。全成分は読めない |
| 疎性 | $A$ が疎でなければ加速が失われる |
| 条件数 | $\kappa$ に依存。悪条件だと遅い |

出力が量子状態なので、
**$x$ の全成分を知りたいなら $N$ 回の測定が要り、加速が消える**。
$\langle x|M|x\rangle$ のような要約量を求める用途に限られる。

## 量子機械学習への影響

HHL は一時期「量子機械学習」の基盤として注目されたが、
Tang らによる**脱量子化 (dequantization)** の研究により、
同様の仮定を置けば古典アルゴリズムでも
同等の計算量が達成できる例が複数示された。

これにより、期待されていた加速の一部が失われた。
**入出力の仮定が加速の源だった**という教訓を残した事例。

## 参考文献

- Aram W. Harrow, Avinatan Hassidim, Seth Lloyd. Quantum Algorithm for Linear Systems of Equations. *Physical Review Letters* 103(15), 2009. <https://doi.org/10.1103/PhysRevLett.103.150502>
- Scott Aaronson. Read the fine print. *Nature Physics* 11, 2015. <https://doi.org/10.1038/nphys3272>
- Ewin Tang. A quantum-inspired classical algorithm for recommendation systems. *STOC*, 2019. <https://doi.org/10.1145/3313276.3316310>
