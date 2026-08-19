---
title: 深層学習
status: 執筆済
summary: 多層のニューラルネットワークによる学習。アーキテクチャの設計とは帰納バイアスの設計である。
tags: [AI, 深層学習]
---

# 深層学習

**多層のニューラルネットワークによる学習。**

## なぜ深くするのか

万能近似定理によれば 1 層でも十分な表現力があるが、
**同じ表現に必要な幅が指数的に大きくなる**場合がある。

深くすることで

- 階層的な特徴を学べる（低次 → 高次）
- 同じ表現力をより少ないパラメータで得られる
- 特徴量の設計を人手でやらなくてよい

最後が特に大きい。従来は人間が設計していた特徴抽出を、
**データから学習する**ようになった。

## 主なアーキテクチャ

| 種類 | 帰納バイアス | 適する対象 |
| --- | --- | --- |
| [[人工知能/深層学習/CNN\|CNN]] | 局所性、平行移動不変性 | 画像 |
| [[人工知能/深層学習/RNN\|RNN]]・[[人工知能/深層学習/LSTM\|LSTM]] | 逐次性 | 系列（旧来） |
| [[人工知能/深層学習/Transformer\|Transformer]] | 要素間の関係 | 系列（現在の標準） |

**アーキテクチャとは帰納バイアスの設計**であり、
問題の構造に合ったものを選ぶのが要点。

## 参考文献

- Ian Goodfellow, Yoshua Bengio, Aaron Courville. *Deep Learning*. MIT Press, 2016.（全文公開） <https://www.deeplearningbook.org/>
- Aston Zhang et al. *Dive into Deep Learning*. Cambridge University Press, 2023.（全文公開） <https://d2l.ai/>
- Yann LeCun, Yoshua Bengio, Geoffrey Hinton. Deep learning. *Nature* 521, 2015. <https://doi.org/10.1038/nature14539>
