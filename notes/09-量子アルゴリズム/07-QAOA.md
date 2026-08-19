---
title: QAOA
status: 執筆済
tags: [量子アルゴリズム, QAOA]
---

# QAOA

[[最適化/量子最適化/QAOA|最適化側のノート]]に詳しく書いた。
ここではアルゴリズムとしての位置づけを記す。

$$|\psi(\vec\gamma,\vec\beta)\rangle = \prod_{k=1}^{p} e^{-i\beta_k H_M} e^{-i\gamma_k H_C}|+\rangle^{\otimes n}$$

## VQE との関係

**QAOA は VQE の一種**と見なせる。
[[量子アルゴリズム/VQE/Ansatz|Ansatz]] が
問題ハミルトニアンとミキサーの交互適用に固定されている点が違う。

| | [[量子アルゴリズム/VQE\|VQE]] | QAOA |
| --- | --- | --- |
| Ansatz | 自由 | 問題由来で固定 |
| 対象 | 化学など連続的な問題 | 組合せ最適化 |
| パラメータ数 | 多い | $2p$ 個と少ない |

パラメータが少ないので最適化しやすく、
**良いパラメータが問題例をまたいで転用できる**という報告もある。

## 断熱過程との対応

$p \to \infty$ で[[最適化/量子最適化/量子アニーリング|量子アニーリング]]の
断熱過程を再現する（トロッター分解）。
**ゲート型で断熱計算を近似したもの**という読み方ができる。

## 性能

$p=1$ での 3-正則グラフ [[最適化/組合せ最適化/Max-Cut|Max-Cut]] の
近似比 0.6924 は原論文で証明されている。
これは古典の Goemans-Williamson (0.878) に及ばない。

$p$ を増やせば改善するが、
回路が深くなりノイズの影響が増す。
**現時点で古典に対する明確な優位性は示されていない。**

## 参考文献

- Edward Farhi, Jeffrey Goldstone, Sam Gutmann. A Quantum Approximate Optimization Algorithm. 2014. <https://arxiv.org/abs/1411.4028>
- Leo Zhou et al. Quantum Approximate Optimization Algorithm: Performance, Mechanism, and Implementation on Near-Term Devices. *Physical Review X* 10(2), 2020. <https://doi.org/10.1103/PhysRevX.10.021067>
- Kishor Bharti et al. Noisy intermediate-scale quantum algorithms. *Reviews of Modern Physics* 94(1), 2022. <https://doi.org/10.1103/RevModPhys.94.015004>
