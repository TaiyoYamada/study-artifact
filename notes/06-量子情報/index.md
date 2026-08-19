---
title: 量子情報
status: 執筆済
summary: 量子力学の枠組みで情報をどう扱えるかを研究する分野。ノイズのある実機を議論するには密度行列が要る。
tags: [量子情報]
---

# 量子情報

**量子力学の枠組みで、情報をどう扱えるか**を研究する分野。

古典情報理論（Shannon）の量子版であり、
量子計算・量子通信・量子暗号の共通の土台になる。

## 純粋状態だけでは足りない

理想的な孤立系なら[[量子力学/量子状態|状態ベクトル]]で書けるが、
実際には

- 環境と相互作用してノイズが乗る（[[量子情報/デコヒーレンス|デコヒーレンス]]）
- 系の一部だけに注目する（[[量子情報/部分トレース|部分トレース]]）

このどちらでも**状態ベクトルでは書けない**状態が現れる。
これを扱うのが[[量子情報/密度行列|密度行列]]。

**実機を議論するなら密度行列が必須**になる。

## 中身

- [[量子情報/純粋状態と混合状態|純粋状態と混合状態]]
- [[量子情報/密度行列|密度行列]]・[[量子情報/部分トレース|部分トレース]]
- [[量子情報/量子エンタングルメント|量子エンタングルメント]]・[[量子情報/量子エントロピー|量子エントロピー]]
- [[量子情報/量子チャネル|量子チャネル]]・[[量子情報/デコヒーレンス|デコヒーレンス]]
- [[量子情報/量子測定|量子測定]]

## 参考文献

- Michael A. Nielsen, Isaac L. Chuang. *Quantum Computation and Quantum Information*, 10th Anniversary Edition. Cambridge University Press, 2010. <https://doi.org/10.1017/CBO9780511976667>
- Mark M. Wilde. *Quantum Information Theory*, 2nd ed. Cambridge University Press, 2017. <https://doi.org/10.1017/9781316809976>
- John Preskill. Quantum Computation Lecture Notes (Caltech Ph219/CS219) <https://www.preskill.caltech.edu/ph219/>
