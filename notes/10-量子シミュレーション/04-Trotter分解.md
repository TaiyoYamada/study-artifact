---
title: Trotter分解
status: 執筆済
tags: [量子シミュレーション]
---

# Trotter分解

**交換しない演算子の指数関数を、各項の指数関数の積で近似する**手法。

$$e^{-i(A+B)t} \approx \left( e^{-iAt/n} e^{-iBt/n} \right)^n$$

$n \to \infty$ で厳密（Lie-Trotter の公式）。

## 誤差

1 次の Trotter 分解の誤差は

$$\left\| e^{-i(A+B)t} - \left(e^{-iAt/n}e^{-iBt/n}\right)^n \right\| = \mathcal{O}\!\left(\frac{t^2 \|[A,B]\|}{n}\right)$$

**交換子の大きさが誤差を決める。**
$[A,B] = 0$ なら分解は厳密になる。

## 高次の公式

対称化すると精度が上がる（2 次の Suzuki-Trotter）。

$$e^{-iAt/2}\, e^{-iBt}\, e^{-iAt/2} \qquad \text{誤差 } \mathcal{O}(t^3/n^2)$$

Suzuki の再帰的構成により任意の次数が作れるが、
高次ほど 1 ステップのゲート数が増えるので、
**総ゲート数が最小になる次数を選ぶ**ことになる。

## 量子回路での意味

各 $e^{-iH_k t}$ は、パウリ項なら
**CNOT で挟んだ回転ゲート**として実装できる。

```
CNOT ... CNOT — Rz(2θ) — CNOT ... CNOT
```

Trotter ステップ数を増やすと精度は上がるが、
**回路が深くなりノイズが増える**。
NISQ 期には最適なステップ数が存在し、
それ以上刻むと誤りが精度改善を上回る。

## 近年の理解

Childs らは、実際の Trotter 誤差が
最悪ケースの見積もりよりずっと小さいことを示した。
物理的なハミルトニアンでは交換子の構造が効くためで、
**Trotter は理論上の劣位ほど実用上不利ではない**。

## 参考文献

- Masuo Suzuki. Generalized Trotter's formula and systematic approximants of exponential operators. *Communications in Mathematical Physics* 51, 1976. <https://doi.org/10.1007/BF01609348>
- Andrew M. Childs et al. Theory of Trotter Error with Commutator Scaling. *Physical Review X* 11(1), 2021. <https://doi.org/10.1103/PhysRevX.11.011020>
- Michael A. Nielsen, Isaac L. Chuang. *Quantum Computation and Quantum Information*. Cambridge University Press, 2010. <https://doi.org/10.1017/CBO9780511976667>
