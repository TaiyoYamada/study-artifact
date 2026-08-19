---
title: VQE
status: 執筆済
summary: ハミルトニアンの最小固有値を、浅い量子回路と古典最適化の往復で求める手法。NISQ 期の主力。
tags: [量子アルゴリズム, VQE]
---

# VQE

**Variational Quantum Eigensolver。**
ハミルトニアンの最小固有値（基底エネルギー）を、
量子回路と古典最適化器の往復で求める手法。

Peruzzo らが 2014 年に提案した。

$$E_0 \le \min_{\theta} \langle\psi(\theta)|H|\psi(\theta)\rangle$$

## 変分原理

どんな状態を試しても、期待値は**最小固有値を下回らない**。
だから最小化すれば基底エネルギーに近づく。
これが理論的な支え。

## 構成

- [[量子アルゴリズム/VQE/VQEの仕組み|VQEの仕組み]] — 全体の流れ
- [[量子アルゴリズム/VQE/Ansatz|Ansatz]] — 試行状態の作り方
- [[量子アルゴリズム/VQE/Hardware-Efficient-Ansatz|Hardware Efficient Ansatz]]
- [[量子アルゴリズム/VQE/TwoLocal|TwoLocal]]
- [[量子アルゴリズム/VQE/期待値計算|期待値計算]]
- [[量子アルゴリズム/VQE/古典最適化との関係|古典最適化との関係]]

## なぜ NISQ 向きなのか

[[量子アルゴリズム/量子位相推定|量子位相推定]]が
指数的に深い回路を要するのに対し、
VQE は**浅い回路を何度も実行する**。
コヒーレンス時間の制約に合う。

代わりに失うものがある。

| | QPE | VQE |
| --- | --- | --- |
| 回路の深さ | 深い | 浅い |
| 精度保証 | あり | なし |
| 収束保証 | — | なし（非凸最適化） |
| 測定回数 | 少ない | **膨大** |

## 参考文献

- Alberto Peruzzo et al. A variational eigenvalue solver on a photonic quantum processor. *Nature Communications* 5, 2014. <https://doi.org/10.1038/ncomms5213>
- Marco Cerezo et al. Variational quantum algorithms. *Nature Reviews Physics* 3, 2021. <https://doi.org/10.1038/s42254-021-00348-9>
- Kishor Bharti et al. Noisy intermediate-scale quantum algorithms. *Reviews of Modern Physics* 94(1), 2022. <https://doi.org/10.1103/RevModPhys.94.015004>
