---
title: Ansatz
status: 執筆済
tags: [量子アルゴリズム, VQE]
---

# Ansatz

**試行状態を作る回路の形。** ドイツ語で「approach」「試み」の意。

$$|\psi(\theta)\rangle = U(\theta)|0\rangle^{\otimes n}$$

VQE の性能を最も強く左右する部分。

## 満たしたい条件

| 条件 | 内容 | 対立 |
| --- | --- | --- |
| 表現力 | 基底状態を含む範囲を張れる | 深くなる |
| 浅さ | ノイズに耐えられる | 表現力が落ちる |
| 学習しやすさ | 勾配が消えない | 表現力が高いと消えやすい |

**この 3 つは同時に満たせない**というのが VQE 設計の核心的な難しさ。

## 2 系統

**問題由来型** — 物理・化学の構造を反映させる。

- **UCCSD** — 単励起・二重励起を取り込む。化学的に意味が明確。深い
- **[[最適化/量子最適化/QAOA|QAOA]]** — 問題ハミルトニアンとミキサーの交互適用

**ハードウェア効率型** — 実機で実行しやすい形を優先する。

- [[量子アルゴリズム/VQE/Hardware-Efficient-Ansatz|HEA]]
- [[量子アルゴリズム/VQE/TwoLocal|TwoLocal]]

浅く作れるが、**化学的な意味づけが無く、
[[量子アルゴリズム/VQE/古典最適化との関係|barren plateau]] に陥りやすい**。

## 表現力の逆説

表現力を上げると（層を深く、ランダムに近くすると）、
状態空間を広く張れる代わりに**勾配が指数的に小さくなる**。

つまり「到達できるはずだが、辿り着けない」状態になる。
McClean らが示したこの現象が、
Ansatz 設計を単なる表現力の問題でなくしている。

## 参考文献

- Marco Cerezo et al. Variational quantum algorithms. *Nature Reviews Physics* 3, 2021. <https://doi.org/10.1038/s42254-021-00348-9>
- Jarrod R. McClean et al. Barren plateaus in quantum neural network training landscapes. *Nature Communications* 9, 2018. <https://doi.org/10.1038/s41467-018-07090-4>
- Kishor Bharti et al. Noisy intermediate-scale quantum algorithms. *Reviews of Modern Physics* 94(1), 2022. <https://doi.org/10.1103/RevModPhys.94.015004>
