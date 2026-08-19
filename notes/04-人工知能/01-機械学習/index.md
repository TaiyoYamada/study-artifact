---
title: 機械学習
status: 執筆済
summary: データから規則を推定し未知のデータに一般化する枠組み。経験誤差と汎化誤差の差が過学習の正体。
tags: [AI, 機械学習]
---

# 機械学習

**データから規則を推定し、未知のデータに一般化する**枠組み。

## 何を最小化しているのか

本当に小さくしたいのは、まだ見ぬデータに対する誤差（**汎化誤差**）。

$$R(\theta) = \mathbb{E}_{(x,y)\sim p}\bigl[L(f_\theta(x), y)\bigr]$$

しかし $p$ は分からないので、手元のデータでの平均（**経験誤差**）を代わりに最小化する。

$$\hat{R}(\theta) = \frac{1}{m}\sum_i L(f_\theta(x_i), y_i)$$

**この差が[[人工知能/機械学習/過学習と汎化|過学習]]の正体。**

## 分類

| 種類 | 教師 | 例 |
| --- | --- | --- |
| [[人工知能/機械学習/教師あり学習\|教師あり]] | 正解ラベルがある | [[人工知能/機械学習/回帰\|回帰]]、[[人工知能/機械学習/分類\|分類]] |
| [[人工知能/機械学習/教師なし学習\|教師なし]] | 無い | [[人工知能/機械学習/クラスタリング\|クラスタリング]]、次元削減 |
| [[人工知能/強化学習\|強化学習]] | 報酬 | 制御、ゲーム |

## 参考文献

- Trevor Hastie, Robert Tibshirani, Jerome Friedman. *The Elements of Statistical Learning*, 2nd ed. Springer, 2009.（全文公開） <https://hastie.su.domains/ElemStatLearn/>
- Kevin P. Murphy. *Probabilistic Machine Learning: An Introduction*. MIT Press, 2022. <https://probml.github.io/pml-book/book1.html>
- Christopher M. Bishop. *Pattern Recognition and Machine Learning*. Springer, 2006. <https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/>
