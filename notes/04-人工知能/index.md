---
title: 人工知能
status: 執筆済
summary: データから規則を学び取る手法。学習とは最適化であり、勾配法が中核にある。
tags: [AI]
---

# 人工知能

**データから規則を学び取る**手法を中心にまとめる。

## 構成

| 分野 | 内容 |
| --- | --- |
| [[人工知能/機械学習\|機械学習]] | 学習の枠組みと基本概念 |
| [[人工知能/ニューラルネットワーク\|ニューラルネットワーク]] | 層を重ねた関数近似 |
| [[人工知能/深層学習\|深層学習]] | CNN、RNN、Transformer |
| [[人工知能/大規模言語モデル\|大規模言語モデル]] | LLM の仕組み |
| [[人工知能/強化学習\|強化学習]] | 試行錯誤から方策を学ぶ |
| [[人工知能/画像生成モデル\|画像生成モデル]]・[[人工知能/音声モデル\|音声モデル]] | 生成の技術 |
| [[人工知能/AIシステム\|AIシステム]] | RAG、エージェント、MCP |

## 最適化との関係

**学習とは最適化である。** 損失関数を最小化するパラメータを探す。

$$\min_\theta \; \frac{1}{m}\sum_{i=1}^m L\bigl(f_\theta(x_i), y_i\bigr)$$

そのため[[最適化/勾配に基づく最適化|勾配に基づく最適化]]、
特に[[最適化/勾配に基づく最適化/確率的勾配降下法|SGD]] と
[[最適化/勾配に基づく最適化/Adam|Adam]] が学習の中核にある。

違いは規模で、パラメータが $10^6 \sim 10^{12}$ に及ぶため、
[[最適化/勾配に基づく最適化/Newton法|二階の手法]]が使えない。

## 参考文献

- Ian Goodfellow, Yoshua Bengio, Aaron Courville. *Deep Learning*. MIT Press, 2016.（全文公開） <https://www.deeplearningbook.org/>
- Kevin P. Murphy. *Probabilistic Machine Learning: An Introduction*. MIT Press, 2022. <https://probml.github.io/pml-book/book1.html>
- Trevor Hastie, Robert Tibshirani, Jerome Friedman. *The Elements of Statistical Learning*, 2nd ed. Springer, 2009.（全文公開） <https://hastie.su.domains/ElemStatLearn/>
