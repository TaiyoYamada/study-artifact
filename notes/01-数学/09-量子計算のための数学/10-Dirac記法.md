---
title: Dirac記法
status: 執筆済
tags: [数学, 量子計算]
---

# Dirac記法

量子力学の標準的な記法。ブラケット記法。

| 記法 | 読み | 実体 |
| --- | --- | --- |
| $\|\psi\rangle$ | ケット | 列ベクトル |
| $\langle\psi\|$ | ブラ | 行ベクトル（[[数学/量子計算のための数学/複素共役\|共役転置]]） |
| $\langle\phi\|\psi\rangle$ | ブラケット | [[数学/量子計算のための数学/内積空間\|内積]]。スカラー |
| $\|\psi\rangle\langle\phi\|$ | 外積 | 行列 |

「bracket」を「bra」と「ket」に割ったのが名前の由来。

## なぜ便利か

**演算の型が記号の形で分かる。**

- $\langle\;|\;\rangle$ … 内積。スカラー
- $|\;\rangle\langle\;|$ … 外積。演算子

$$\langle\phi|A|\psi\rangle$$

これを「$\langle\phi|$ と $A|\psi\rangle$ の内積」とも
「$\langle\phi|A$ と $|\psi\rangle$ の内積」とも読める。
結合則がそのまま記法に埋め込まれている。

## 完全性関係

$$\sum_i |i\rangle\langle i| = I$$

正規直交基底の[[数学/線形代数/射影|射影]]の和が恒等演算子。
これを式の途中に挿入すると基底展開ができる。

$$|\psi\rangle = \sum_i |i\rangle\langle i|\psi\rangle = \sum_i c_i |i\rangle$$

$c_i = \langle i|\psi\rangle$ が[[数学/量子計算のための数学/確率振幅|確率振幅]]。

## 計算基底

量子計算では $|0\rangle, |1\rangle$ を基底に取る。

$$|0\rangle = \begin{pmatrix}1\\0\end{pmatrix}, \qquad |1\rangle = \begin{pmatrix}0\\1\end{pmatrix}$$

複数ビットは $|01\rangle = |0\rangle \otimes |1\rangle$ と
[[数学/量子計算のための数学/テンソル積|テンソル積]]で書く。

## 参考文献

- Michael A. Nielsen, Isaac L. Chuang. *Quantum Computation and Quantum Information*, 10th Anniversary Edition. Cambridge University Press, 2010. <https://doi.org/10.1017/CBO9780511976667>
- J. J. Sakurai, Jim Napolitano. *Modern Quantum Mechanics*, 3rd ed. Cambridge University Press, 2020. <https://doi.org/10.1017/9781108587280>
- John Preskill. Quantum Computation Lecture Notes (Caltech Ph219/CS219) <https://www.preskill.caltech.edu/ph219/>
