---
title: Newton法
status: 執筆済
tags: [数学, 数値計算]
---

# Newton法

$$x_{k+1} = x_k - \frac{f(x_k)}{f'(x_k)}$$

**現在地で接線を引き、その $x$ 切片へ飛ぶ**ことを繰り返す。

## 二次収束

解の近くでは誤差が二乗で減る。

$$|e_{k+1}| \le C |e_k|^2$$

**正しい桁数が反復ごとに倍**になる。
16 桁の精度に 4〜5 回で届く。

## 条件

二次収束が保証されるのは

- $f'(x^\star) \ne 0$（単根）
- $f$ が $C^2$ 級
- 初期値が十分近い

重根では線形収束に落ちる。
初期値が遠いと発散したり、振動したり、
まったく別の解に行き着いたりする。

## 最適化での Newton 法

最小化は $\nabla f(x) = 0$ を解くこと。
$f \to \nabla f$、$f' \to$ [[数学/微分積分/ヘッセ行列|ヘッセ行列]]と
読み替えれば[[最適化/勾配に基づく最適化/Newton法|同じ手法]]になる。

$$x_{k+1} = x_k - H^{-1}\nabla f$$

## 実装上の工夫

そのままでは暴れるので、実用では

- **damped Newton** … ステップ幅を直線探索で決める
- **信頼領域法** … 近似が信用できる範囲内に留める
- $H$ が正定値でないときは修正する

## 参考文献

- William H. Press et al. *Numerical Recipes*, 3rd ed. Cambridge University Press, 2007. <https://numerical.recipes/>
- Jorge Nocedal, Stephen J. Wright. *Numerical Optimization*, 2nd ed. Springer, 2006. <https://doi.org/10.1007/978-0-387-40065-5>
