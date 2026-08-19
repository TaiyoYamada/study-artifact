---
title: RNN
status: 執筆済
tags: [AI, 深層学習]
---

# RNN

**内部状態を持ち、系列を 1 要素ずつ処理する**ネットワーク。

$$h_t = \sigma(W_h h_{t-1} + W_x x_t + b)$$

前の時刻の隠れ状態 $h_{t-1}$ を次に渡す。
これが「記憶」の役割を果たす。

## 利点

- **系列長に依存しないパラメータ数**。同じ重みを使い回す
- 任意の長さの入力を扱える

## 勾配消失・爆発

時刻を遡って[[人工知能/ニューラルネットワーク/誤差逆伝播法|逆伝播]]すると
（BPTT）、同じ行列 $W_h$ が何度も掛かる。

$$\frac{\partial h_t}{\partial h_0} = \prod_{k=1}^{t} W_h^\top \mathrm{diag}(\sigma')$$

[[数学/線形代数/固有値・固有ベクトル|固有値]]が

- 1 未満 … 指数的に**消失**。長距離の依存が学習できない
- 1 超 … 指数的に**爆発**。学習が発散する

爆発は勾配クリッピングで抑えられるが、
**消失は本質的な問題**。これを緩和するのが
[[人工知能/深層学習/LSTM|LSTM]]。

## 逐次性という制約

$h_t$ が $h_{t-1}$ に依存するので、
**時間方向に並列化できない**。

系列長 $T$ に対して $T$ ステップの逐次計算が必要で、
GPU の並列性を活かせない。
この制約が[[人工知能/深層学習/Transformer|Transformer]] への
置き換えを促した最大の理由。

## 参考文献

- Ian Goodfellow, Yoshua Bengio, Aaron Courville. *Deep Learning*. MIT Press, 2016.（全文公開） <https://www.deeplearningbook.org/>
- Yoshua Bengio, Patrice Simard, Paolo Frasconi. Learning long-term dependencies with gradient descent is difficult. *IEEE Transactions on Neural Networks* 5(2), 1994. <https://doi.org/10.1109/72.279181>
- Aston Zhang et al. *Dive into Deep Learning*. Cambridge University Press, 2023.（全文公開） <https://d2l.ai/>
