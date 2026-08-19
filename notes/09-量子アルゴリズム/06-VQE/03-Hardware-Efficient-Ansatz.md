---
title: Hardware Efficient Ansatz
status: 執筆済
tags: [量子アルゴリズム, VQE]
---

# Hardware Efficient Ansatz

**実機のゲートセットと接続に合わせて設計された [[量子アルゴリズム/VQE/Ansatz|Ansatz]]。**
Kandala らが 2017 年に提案し、実機での VQE 実験を大きく前進させた。

## 構造

```
[回転層 Ry(θ) Rz(θ)] → [CNOT を隣接ビットに] → 繰り返し
```

- 回転は 1 量子ビットゲートのみ
- もつれ層は**実機で隣接するビット間だけ**に CNOT を打つ

これにより[[量子コンピューティング/量子回路|SWAP の挿入]]が不要になり、
回路が浅く保たれる。

## 利点

- 深さが小さく、[[量子コンピューティング/量子ノイズ|ノイズ]]に耐える
- どんなハミルトニアンにも同じ形が使える（問題非依存）
- 実装が単純

## 問題点

**1. 化学的な意味が無い**

UCCSD が電子励起という物理的な操作に対応するのに対し、
HEA は単に「実行しやすい回路」でしかない。
基底状態を含む保証も無い。

**2. barren plateau に陥りやすい**

層を増やすとランダム回路に近づき、
[[量子アルゴリズム/VQE/古典最適化との関係|勾配の分散が指数的に減衰]]する。

**3. 対称性を壊す**

粒子数やスピンの保存則を満たさない状態も探索してしまう。
物理的にありえない解に落ちることがあり、
制約を[[最適化/QUBO最適化/ペナルティ項|ペナルティ]]で課す工夫が要る。

## 位置づけ

**実機で動かすための現実解**であり、
理論的に望ましい設計ではない。
この折り合いの付け方が、
NISQ 期のアルゴリズム研究の性格をよく表している。

## 参考文献

- Abhinav Kandala et al. Hardware-efficient variational quantum eigensolver for small molecules and quantum magnets. *Nature* 549, 2017. <https://doi.org/10.1038/nature23879>
- Marco Cerezo et al. Variational quantum algorithms. *Nature Reviews Physics* 3, 2021. <https://doi.org/10.1038/s42254-021-00348-9>
- Jarrod R. McClean et al. Barren plateaus in quantum neural network training landscapes. *Nature Communications* 9, 2018. <https://doi.org/10.1038/s41467-018-07090-4>
