---
title: ニューラルネットワーク
status: 執筆済
summary: 線形変換と非線形関数を交互に重ねた関数近似器。表現力があることと学習できることは別問題。
tags: [AI, ニューラルネットワーク]
---

# ニューラルネットワーク

**単純な計算単位を層状に重ねた関数近似器。**

$$f(x) = W_L\,\sigma(W_{L-1}\,\sigma(\cdots \sigma(W_1 x)))$$

線形変換と非線形関数の交互の繰り返し。それだけ。

## なぜ表現力があるのか

**万能近似定理** — 隠れ層 1 層でも、
十分な幅があれば任意の連続関数を任意の精度で近似できる。

ただしこの定理は

- 必要な幅を教えない（指数的に大きいかもしれない）
- 学習で到達できるかを保証しない

**「表現できる」と「学習できる」は別**。
実務で層を深くするのは、同じ表現力をより少ないパラメータで
得られる場合が多いため。

## 構成

- [[人工知能/ニューラルネットワーク/パーセプトロン|パーセプトロン]] — 最小単位
- [[人工知能/ニューラルネットワーク/活性化関数|活性化関数]] — 非線形性
- [[人工知能/ニューラルネットワーク/損失関数|損失関数]] — 何を最小化するか
- [[人工知能/ニューラルネットワーク/順伝播|順伝播]]・[[人工知能/ニューラルネットワーク/誤差逆伝播法|誤差逆伝播法]]
- [[人工知能/ニューラルネットワーク/ニューラルネットワークの学習|学習]]

## 参考文献

- Ian Goodfellow, Yoshua Bengio, Aaron Courville. *Deep Learning*. MIT Press, 2016.（全文公開） <https://www.deeplearningbook.org/>
- Aston Zhang et al. *Dive into Deep Learning*. Cambridge University Press, 2023.（全文公開） <https://d2l.ai/>
- Kurt Hornik, Maxwell Stinchcombe, Halbert White. Multilayer feedforward networks are universal approximators. *Neural Networks* 2(5), 1989. <https://doi.org/10.1016/0893-6080(89)90020-8>
