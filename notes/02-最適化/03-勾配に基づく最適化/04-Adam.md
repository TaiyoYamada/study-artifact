---
title: Adam
status: 執筆済
tags: [最適化, 勾配法, Adam]
---

# Adam

**成分ごとに学習率を自動調整する**確率的最適化。
Kingma と Ba が 2014 年に提案し、深層学習の既定手法として広く使われている。

## 更新式

一次モーメント（勾配の平均）と二次モーメント（勾配の二乗平均）を
それぞれ指数移動平均で持つ。

$$m_k = \beta_1 m_{k-1} + (1-\beta_1) g_k, \qquad v_k = \beta_2 v_{k-1} + (1-\beta_2) g_k^2$$

$$\hat{m}_k = \frac{m_k}{1-\beta_1^k}, \qquad \hat{v}_k = \frac{v_k}{1-\beta_2^k}$$

$$x_{k+1} = x_k - \eta \frac{\hat{m}_k}{\sqrt{\hat{v}_k} + \epsilon}$$

既定値は $\beta_1 = 0.9$、$\beta_2 = 0.999$、$\epsilon = 10^{-8}$。

## 3 つの工夫

1. **$m$ は[[最適化/勾配に基づく最適化/モメンタム|モメンタム]]** — 方向を安定させる
2. **$\sqrt{v}$ で割る** — 勾配が大きい成分は小さく、小さい成分は大きく動かす。
   成分ごとのスケール差を吸収する
3. **バイアス補正** — $m_0 = v_0 = 0$ から始めるため初期は 0 に偏る。
   $1-\beta^k$ で割って補正する

## 弱点

Reddi らは、Adam が**収束しない凸問題の反例**を構成した。
二次モーメントの指数移動平均が、大きいが稀な勾配を忘れてしまうのが原因。
AMSGrad はこれを $\hat{v}$ の最大値を保つことで修正する。

また、重み減衰を勾配に足す実装では $\sqrt{v}$ で割られてしまい
本来の $L_2$ 正則化にならない。これを分離したのが **AdamW** で、
現在は多くの実装でこちらが既定になっている。

## 参考文献

- Diederik P. Kingma, Jimmy Ba. Adam: A Method for Stochastic Optimization. *ICLR*, 2015. <https://arxiv.org/abs/1412.6980>
- Sashank J. Reddi, Satyen Kale, Sanjiv Kumar. On the Convergence of Adam and Beyond. *ICLR*, 2018. <https://arxiv.org/abs/1904.09237>
- Ilya Loshchilov, Frank Hutter. Decoupled Weight Decay Regularization. *ICLR*, 2019. <https://arxiv.org/abs/1711.05101>
