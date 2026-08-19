---
title: 量子誤り訂正
status: 執筆済
summary: ノイズによる誤りを検出して訂正する技術。複製不可能・測定が壊す・誤りが連続という3つの障害を越える必要がある。
tags: [量子誤り訂正]
---

# 量子誤り訂正

**ノイズによる誤りを検出して訂正し、正しい計算を続ける**技術。
大規模な量子計算に不可欠。

## 古典との違い

古典なら「3 個にコピーして多数決」で済む。
量子では 3 つの障害がある。

| 障害 | 内容 |
| --- | --- |
| **複製不可能** | 未知の状態をコピーできない |
| **測定が壊す** | 誤りを見ようとすると状態が壊れる |
| **誤りが連続** | ビット反転だけでなく任意の微小回転が起きる |

## 3 つの解決

1. **コピーせず、もつれで分散させる** — 情報を複数の量子ビットの相関に埋める
2. **シンドローム測定** — 状態そのものではなく
   「誤りが起きたか」だけを測る。補助量子ビットを使う
3. **離散化** — 任意の誤りは $\{I, X, Y, Z\}$ の重ね合わせに分解でき、
   測定によりどれかに**射影される**。
   だから[[量子誤り訂正/ビット反転誤り|ビット反転]]と
   [[量子誤り訂正/位相反転誤り|位相反転]]を直せば十分

3 番目が特に重要で、**連続的な誤りが離散的な問題に還元される**。
これが量子誤り訂正を可能にした鍵。

## 代償

1 つの[[量子誤り訂正/論理量子ビット|論理量子ビット]]に
**数百〜数千の物理量子ビット**が要る。
これが実用化を遠ざけている最大の要因。

## 参考文献

- Barbara M. Terhal. Quantum error correction for quantum memories. *Reviews of Modern Physics* 87(2), 2015. <https://doi.org/10.1103/RevModPhys.87.307>
- Austin G. Fowler et al. Surface codes: Towards practical large-scale quantum computation. *Physical Review A* 86(3), 2012. <https://doi.org/10.1103/PhysRevA.86.032324>
- Michael A. Nielsen, Isaac L. Chuang. *Quantum Computation and Quantum Information*. Cambridge University Press, 2010. <https://doi.org/10.1017/CBO9780511976667>
