---
title: VQEの仕組み
status: 執筆済
tags: [量子アルゴリズム, VQE]
---

# VQEの仕組み

## 手順

1. パラメータ $\theta$ で[[量子コンピューティング/パラメータ付き量子回路|試行状態]] $|\psi(\theta)\rangle$ を作る
2. [[量子アルゴリズム/VQE/期待値計算|期待値]] $\langle\psi(\theta)|H|\psi(\theta)\rangle$ を測定で推定する
3. 古典最適化器が $\theta$ を更新する
4. 収束するまで 1〜3 を繰り返す

**量子と古典の往復**が特徴で、ハイブリッドアルゴリズムと呼ばれる。

## 役割分担

| 担当 | 仕事 | 理由 |
| --- | --- | --- |
| 量子 | 状態の準備と測定 | 古典では $2^n$ 次元を扱えない |
| 古典 | パラメータの更新 | 最適化の道具が揃っている |

量子側は**浅い回路を多数回**実行するだけで済む。
これがコヒーレンス時間の制約に合う。

## 変分原理が保証すること

$$\langle\psi(\theta)|H|\psi(\theta)\rangle \ge E_0$$

**どんな $\theta$ でも基底エネルギーを下回らない。**
だから得られた値は常に上界であり、
低いほど良い（低すぎて誤りということが無い）。

ただし保証されるのはここまでで、

- 最小値に到達できるか … 保証なし（[[量子アルゴリズム/VQE/Ansatz|Ansatz]] の表現力次第）
- 最適化が収束するか … 保証なし（非凸）

## 測定コストが支配的

1 回の期待値推定に多数のショットが要り、
[[量子力学/ハミルトニアン|ハミルトニアンの項数]]だけ回路を実行する。
分子系では項数が $\mathcal{O}(n^4)$ になるため、
**測定回数が実行時間のほとんどを占める**。

## 参考文献

- Alberto Peruzzo et al. A variational eigenvalue solver on a photonic quantum processor. *Nature Communications* 5, 2014. <https://doi.org/10.1038/ncomms5213>
- Jarrod R. McClean et al. The theory of variational hybrid quantum-classical algorithms. *New Journal of Physics* 18, 2016. <https://doi.org/10.1088/1367-2630/18/2/023023>
- Marco Cerezo et al. Variational quantum algorithms. *Nature Reviews Physics* 3, 2021. <https://doi.org/10.1038/s42254-021-00348-9>
