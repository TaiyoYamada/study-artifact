---
title: 量子シミュレーション
status: 執筆済
summary: 量子系の振る舞いを量子計算機で再現する。Feynman が量子計算機を構想した動機であり、最有力な応用先。
tags: [量子シミュレーション]
---

# 量子シミュレーション

**量子系の振る舞いを量子計算機で再現する。**
Feynman が 1982 年に量子計算機を構想した、そもそもの動機。

## Feynman の議論

量子系を古典計算機でシミュレートすると、
状態の記述に $2^n$ 個の複素数が要る（[[数学/量子計算のための数学/テンソル積|テンソル積]]）。
**指数的に増えるので原理的に無理がある。**

ならば「量子系を量子系でシミュレートすればよい」というのが Feynman の提案。
自然が量子的に計算しているなら、同じ規則で動く装置を使えば効率的なはず。

## 2 つの方式

| 方式 | 内容 |
| --- | --- |
| **デジタル** | [[量子コンピューティング/量子ゲート\|ゲート]]で $e^{-iHt}$ を組み立てる。汎用 |
| **アナログ** | 目的の $H$ を持つ物理系を直接作る。専用だが実現しやすい |

冷却原子や超伝導回路によるアナログ量子シミュレータは
すでに古典計算が困難な領域の実験を行っている。

## なぜ有望なのか

他の量子アルゴリズムと違い、
**入出力の問題が比較的軽い**。

- 入力 … 物理的に自然な初期状態を用意すればよい
- 出力 … 相関関数や秩序変数など、少数の観測量で足りる

[[量子アルゴリズム/HHL|HHL]] のように
「結果を全部読めない」問題に当たりにくい。
**量子計算の最初の実用的応用**として最も期待されている。

## 参考文献

- Richard P. Feynman. Simulating physics with computers. *International Journal of Theoretical Physics* 21, 1982. <https://doi.org/10.1007/BF02650179>
- Iulia M. Georgescu, Sahel Ashhab, Franco Nori. Quantum simulation. *Reviews of Modern Physics* 86(1), 2014. <https://doi.org/10.1103/RevModPhys.86.153>
- Michael A. Nielsen, Isaac L. Chuang. *Quantum Computation and Quantum Information*. Cambridge University Press, 2010. <https://doi.org/10.1017/CBO9780511976667>
