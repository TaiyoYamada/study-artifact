---
title: 科学計算
status: 執筆済
summary: 数値計算を正しく・速く・再現できるように行う。Python の速さは二層構造で得ている。
tags: [科学計算]
---

# 科学計算

**数値を大量に扱う計算を、正しく・速く・再現できるように行う。**

## 3 つの関心

| 関心 | 問い |
| --- | --- |
| **正しさ** | [[数学/数値計算/丸め誤差|丸め誤差]]で答えが崩れていないか |
| **速さ** | 現実的な時間で終わるか |
| **再現性** | 同じ結果が後からもう一度得られるか |

3 つ目が研究では特に重要で、
[[研究/再現実験|再現できない結果]]は
主張として成立しない。

## 構成

- [[科学計算/NumPy|NumPy]]・[[科学計算/ベクトル化|ベクトル化]]・[[科学計算/行列計算|行列計算]]
- [[科学計算/シミュレーション|シミュレーション]]・[[科学計算/乱数|乱数]]
- [[科学計算/数値実験|数値実験]]・[[科学計算/再現性|再現性]]

## Python が使われる理由

Python 自体は遅い（[[コンピュータ/言語処理系/インタプリタ|インタプリタ]]）。
それでも科学計算の標準になったのは

```
書きやすい Python の層
      ↓ 実際の計算は
C / Fortran / CUDA で書かれた高速な実装
```

という**二層構造**が成立しているため。
ループを Python で書かず、
配列演算として渡す（[[科学計算/ベクトル化|ベクトル化]]）ことが前提になる。

## 参考文献

- Charles R. Harris et al. Array programming with NumPy. *Nature* 585, 2020. <https://doi.org/10.1038/s41586-020-2649-2>
- Pauli Virtanen et al. SciPy 1.0: fundamental algorithms for scientific computing in Python. *Nature Methods* 17, 2020. <https://doi.org/10.1038/s41592-019-0686-2>
- Gene H. Golub, Charles F. Van Loan. *Matrix Computations*, 4th ed. Johns Hopkins University Press, 2013.
