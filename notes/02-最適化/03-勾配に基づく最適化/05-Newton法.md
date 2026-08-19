---
title: Newton法
status: 執筆済
tags: [最適化, 勾配法, Newton法]
---

# Newton法

**二階の情報を使い、二次近似の最小点へ直接飛ぶ**手法。

$$x_{k+1} = x_k - H(x_k)^{-1} \nabla f(x_k)$$

$H$ が[[数学/微分積分/ヘッセ行列|ヘッセ行列]]。

## なぜ速いのか

$f$ をテイラー展開して二次までで打ち切る。

$$f(x_k + d) \approx f(x_k) + \nabla f^\top d + \tfrac{1}{2} d^\top H d$$

この二次関数を厳密に最小化する $d$ が $-H^{-1}\nabla f$。
つまり**曲がり具合まで考えて一気に底へ行く**。
解の近くでは**二次収束**し、正しい桁数が反復ごとに倍になる。

[[最適化/勾配に基づく最適化/勾配降下法|勾配降下法]]がジグザグする原因は
座標のスケール差だったが、Newton 法は $H^{-1}$ を掛けることで
**実質的に座標系を正規化している**。だから条件数の影響を受けない。

## 実用上の問題

| 問題 | 対処 |
| --- | --- |
| $H$ の計算が $\mathcal{O}(n^2)$、逆行列が $\mathcal{O}(n^3)$ | [[最適化/勾配に基づく最適化/準Newton法\|準 Newton 法]]で近似 |
| $H$ が正定値でないと下る方向にならない | 修正 Newton 法（$H + \lambda I$ とする） |
| 遠方では二次近似が当てにならない | 直線探索、信頼領域法 |

深層学習でほとんど使われないのは、パラメータ数 $n$ が
数百万〜数十億で $H$ を持てないため。

## 方程式を解く Newton 法

$g(x) = 0$ を解く[[数学/数値計算/Newton法|Newton 法]]と同じもの。
最適化は $\nabla f(x) = 0$ を解くことなので、
$g = \nabla f$、$g' = H$ と置き換えれば一致する。

## 参考文献

- Jorge Nocedal, Stephen J. Wright. *Numerical Optimization*, 2nd ed. Springer, 2006. <https://doi.org/10.1007/978-0-387-40065-5>
- Stephen Boyd, Lieven Vandenberghe. *Convex Optimization*, §9.5. Cambridge University Press, 2004. <https://web.stanford.edu/~boyd/cvxbook/>
