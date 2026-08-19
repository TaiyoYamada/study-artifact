---
title: Hamiltonian Simulation
status: 執筆済
tags: [量子シミュレーション]
---

# Hamiltonian Simulation

**$e^{-iHt}$ を量子回路として実装する**問題。
量子シミュレーションの中核。

## 難しさ

$H = \sum_k H_k$ と項に分かれていても、
項どうしが**交換しない**（$[H_j, H_k] \ne 0$）ため

$$e^{-iHt} \ne \prod_k e^{-iH_k t}$$

各項の指数関数は簡単に実装できるのに、
**単純に掛けても正しくない**。

## 主な手法

| 手法 | ゲート数 | 特徴 |
| --- | --- | --- |
| [[量子シミュレーション/Trotter分解\|Trotter-Suzuki]] | $\mathcal{O}(t^{1+1/2k}/\epsilon^{1/2k})$ | 単純。実装しやすい |
| LCU (線形結合) | $\mathcal{O}(t\,\mathrm{polylog}(1/\epsilon))$ | 精度依存が対数 |
| 量子ウォーク / qubitization | 最適に近い | 理論的に洗練 |
| QSVT | 統一的な枠組み | 多くの手法を包含 |

精度 $\epsilon$ への依存が
Trotter では多項式、LCU 以降は**対数**になるのが大きな違い。
高精度が要る場面では後者が有利。

## 下限

時間 $t$ に対して $\Omega(t)$ のクエリが必要（no fast-forwarding 定理）。
**時間発展を「早送り」することはできない。**
現代の手法はこの下限にほぼ到達している。

## NISQ での現実

LCU や qubitization は補助量子ビットと深い回路を要するため、
現在の実機では実行できない。
NISQ 期には[[量子シミュレーション/Trotter分解|Trotter 分解]]の
浅いステップ数で試すのが現実解になっている。

## 参考文献

- Dominic W. Berry et al. Simulating Hamiltonian dynamics with a truncated Taylor series. *Physical Review Letters* 114(9), 2015. <https://doi.org/10.1103/PhysRevLett.114.090502>
- Guang Hao Low, Isaac L. Chuang. Hamiltonian Simulation by Qubitization. *Quantum* 3, 2019. <https://doi.org/10.22331/q-2019-07-12-163>
- Iulia M. Georgescu, Sahel Ashhab, Franco Nori. Quantum simulation. *Reviews of Modern Physics* 86(1), 2014. <https://doi.org/10.1103/RevModPhys.86.153>
