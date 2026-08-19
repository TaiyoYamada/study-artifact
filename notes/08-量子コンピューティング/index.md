---
title: 量子コンピューティング
status: 執筆済
summary: 量子力学の規則に従って計算する枠組みと実装。高速化の源は重ね合わせではなく干渉にある。
tags: [量子計算]
---

# 量子コンピューティング

**量子力学の規則に従って計算する**枠組みと、その実装。

## 古典計算との対応

| 古典 | 量子 |
| --- | --- |
| ビット $\{0,1\}$ | [[量子コンピューティング/量子ビット\|量子ビット]]（$\mathbb{C}^2$ の単位ベクトル） |
| 論理ゲート | [[量子コンピューティング/量子ゲート\|量子ゲート]]（[[数学/量子計算のための数学/ユニタリ行列\|ユニタリ]]） |
| 回路 | [[量子コンピューティング/量子回路\|量子回路]] |
| 出力の読み出し | [[量子コンピューティング/測定\|測定]]（確率的、状態を壊す） |

## 何が違うのか

1. **[[量子力学/重ね合わせ|重ね合わせ]]** — 状態が $2^n$ 個の複素振幅を持つ
2. **[[量子力学/量子もつれ|もつれ]]** — 部分に分解できない状態
3. **干渉** — [[数学/量子計算のための数学/確率振幅|振幅]]が打ち消し合う
4. **可逆性** — ゲートは常に可逆。情報を捨てられない
5. **測定の破壊性** — 読み出すと状態が壊れる

高速化の源は 1 ではなく **3 の干渉**にある。

## 現在の位置

[[量子コンピューティング/量子ノイズ|ノイズ]]により回路の深さが制限される
**NISQ (Noisy Intermediate-Scale Quantum)** 期にある。
誤り訂正された大規模な量子計算機はまだ存在しない。

## 参考文献

- Michael A. Nielsen, Isaac L. Chuang. *Quantum Computation and Quantum Information*, 10th Anniversary Edition. Cambridge University Press, 2010. <https://doi.org/10.1017/CBO9780511976667>
- John Preskill. Quantum Computing in the NISQ era and beyond. *Quantum* 2, 2018. <https://doi.org/10.22331/q-2018-08-06-79>
- John Preskill. Quantum Computation Lecture Notes (Caltech Ph219/CS219) <https://www.preskill.caltech.edu/ph219/>
