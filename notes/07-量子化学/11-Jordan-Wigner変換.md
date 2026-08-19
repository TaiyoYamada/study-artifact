---
title: Jordan-Wigner変換
status: 執筆済
tags: [量子化学]
---

# Jordan-Wigner変換

**[[量子化学/フェルミオン|フェルミオン]]の演算子を、量子ビットのパウリ演算子に写す**変換。

$$a_p = \left(\prod_{k<p} Z_k\right) \frac{X_p + iY_p}{2}$$

## 何をしているのか

問題は、フェルミオンが**反交換**するのに
異なる量子ビットのパウリ演算子は**交換**すること。

Jordan-Wigner 変換は、
$p$ より前のすべての量子ビットに $Z$ を掛けることで、
**符号を追跡する**。$Z$ の連鎖が「これまでに何個の電子があったか」の
パリティを持ち、それが反交換の符号を再現する。

## 対応

| フェルミオン | 量子ビット |
| --- | --- |
| 軌道 $p$ の占有数 | 量子ビット $p$ の $\|0\rangle / \|1\rangle$ |
| $a_p^\dagger a_p$ | $(I - Z_p)/2$ |
| 反交換の符号 | $Z$ の連鎖 |

**軌道 1 つが量子ビット 1 つ**という素直な対応が得られるのが利点。

## 代償

$Z$ の連鎖が最大 $M$ 個に及ぶため、
**演算子が非局所的**になる。

$$a_p^\dagger a_q \;\longrightarrow\; \text{最大 } \mathcal{O}(M) \text{ 個のパウリ演算子の積}$$

回路が深くなり、実機の限られた接続性では
さらに SWAP が要る。

## 代替の変換

| 変換 | 演算子の重み |
| --- | --- |
| Jordan-Wigner | $\mathcal{O}(M)$ |
| Parity | $\mathcal{O}(M)$ |
| **Bravyi-Kitaev** | $\mathcal{O}(\log M)$ |

Bravyi-Kitaev は占有数とパリティを木構造で保持することで
重みを対数に抑える。実装は複雑になるが、
大規模系では有利になる。

## 参考文献

- Pascual Jordan, Eugene Wigner. Über das Paulische Äquivalenzverbot. *Zeitschrift für Physik* 47, 1928. <https://doi.org/10.1007/BF01331938>
- Jacob T. Seeley, Martin J. Richard, Peter J. Love. The Bravyi-Kitaev transformation for quantum computation of electronic structure. *The Journal of Chemical Physics* 137(22), 2012. <https://doi.org/10.1063/1.4768229>
- Sam McArdle et al. Quantum computational chemistry. *Reviews of Modern Physics* 92(1), 2020. <https://doi.org/10.1103/RevModPhys.92.015003>
