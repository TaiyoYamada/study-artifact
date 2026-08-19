---
title: QAOA
status: 執筆済
tags: [最適化, 量子計算, QAOA]
---

# QAOA

**ゲート型量子計算機で組合せ最適化を解く**変分アルゴリズム。
Quantum Approximate Optimization Algorithm。
Farhi、Goldstone、Gutmann が 2014 年に提案した。

## 仕組み

2 種類のハミルトニアンを交互に適用する回路を作る。

$$|\psi(\vec{\gamma}, \vec{\beta})\rangle = \prod_{k=1}^{p} e^{-i\beta_k H_M} e^{-i\gamma_k H_C} \, |+\rangle^{\otimes n}$$

- $H_C$ … コストハミルトニアン。解きたい[[最適化/QUBO最適化/イジングモデル|イジング模型]]
- $H_M$ … ミキサー。通常 $\sum_i \sigma_i^x$。状態を混ぜて探索させる
- $p$ … 層の数。深さ

パラメータ $(\vec\gamma, \vec\beta)$ を**古典最適化器で調整**する。
$\langle H_C \rangle$ を測って最小化するので、
[[最適化/量子最適化/VQEによる最適化|VQE]] と同じ構造。

## 断熱過程の離散化として

$p \to \infty$ の極限で[[最適化/量子最適化/量子アニーリング|量子アニーリング]]の
断熱過程を再現できる（トロッター分解）。
つまり QAOA は**断熱過程をゲート型で近似したもの**とも読める。
有限の $p$ でどこまで近づけるかが実用上の問題になる。

## 現状の評価

- $p=1$ の QAOA は 3-正則グラフの [[最適化/組合せ最適化/Max-Cut|Max-Cut]] で
  近似比 0.6924 を保証する（原論文）
- これは古典の [[最適化/組合せ最適化/Max-Cut|Goemans-Williamson (0.878)]] に**及ばない**
- $p$ を上げれば改善するが、パラメータ最適化が難しくなり、
  ノイズの影響も増す

**「QAOA が古典を超えた」という主張は、比較対象を確認する必要がある。**

## パラメータ最適化の難所

- [[最適化/量子最適化/VQEによる最適化|barren plateau]] — 勾配が消える
- 期待値がショットノイズを持つので、[[最適化/導関数を使わない最適化/SPSA|SPSA]] のような
  ノイズ前提の手法が要る
- $p$ 層で $2p$ 個のパラメータ。非凸な景観

## 参考文献

- Edward Farhi, Jeffrey Goldstone, Sam Gutmann. A Quantum Approximate Optimization Algorithm. 2014. <https://arxiv.org/abs/1411.4028>
- Leo Zhou et al. Quantum Approximate Optimization Algorithm: Performance, Mechanism, and Implementation on Near-Term Devices. *Physical Review X* 10(2), 2020. <https://doi.org/10.1103/PhysRevX.10.021067>
- Kishor Bharti et al. Noisy intermediate-scale quantum algorithms. *Reviews of Modern Physics* 94(1), 2022. <https://doi.org/10.1103/RevModPhys.94.015004>
