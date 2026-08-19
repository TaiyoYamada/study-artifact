---
title: Groverアルゴリズム
status: 執筆済
tags: [量子アルゴリズム, Grover]
---

# Groverアルゴリズム

**構造の無い探索を $\mathcal{O}(\sqrt N)$ で行う**アルゴリズム。
Grover が 1996 年に提案した。

$N$ 個の候補から条件を満たすものを探すとき、
古典では平均 $N/2$ 回の確認が要る。Grover は $\mathcal{O}(\sqrt N)$。

## 仕組み

一様重ね合わせから始め、次の 2 操作を $\mathcal{O}(\sqrt N)$ 回繰り返す。

1. **オラクル** — 解の[[数学/量子計算のための数学/確率振幅|振幅]]の符号を反転する
2. **拡散変換** — 平均のまわりで振幅を反転する

この 2 つの組み合わせが、解の振幅だけを少しずつ増やす（**振幅増幅**）。

幾何的には、状態ベクトルを 2 次元平面内で
**一定角度ずつ回転させている**操作になる。

## 回し過ぎると悪化する

$\frac{\pi}{4}\sqrt{N}$ 回が最適で、
**それを超えると成功確率が下がる**。
回転なので通り過ぎるため。

古典アルゴリズムと違い「長く回せば良くなる」ではない点が特徴的。

## 最適性

BBBV 定理により、構造の無い探索には
$\Omega(\sqrt N)$ のクエリが必要。
**Grover はこの下限を達成しており、改善の余地が無い。**

## 実用上の注意

- 二次加速であり、指数的ではない。
  $N = 10^{12}$ でも $10^6$ 回の反復が要る
- **オラクルの実装コスト**が無視できない
- 深い回路が要り、NISQ 期には実行できない
- 総当たりが必要な問題は、そもそも古典でも並列化しやすい

「Grover で NP 完全問題が解ける」は誤り。
二次加速では指数時間が指数時間のままである。

## 参考文献

- Lov K. Grover. A fast quantum mechanical algorithm for database search. *STOC*, 1996. <https://arxiv.org/abs/quant-ph/9605043>
- Charles H. Bennett et al. Strengths and Weaknesses of Quantum Computing. *SIAM Journal on Computing* 26(5), 1997. <https://doi.org/10.1137/S0097539796300933>
- Michael A. Nielsen, Isaac L. Chuang. *Quantum Computation and Quantum Information*, 10th Anniversary Edition. Cambridge University Press, 2010. <https://doi.org/10.1017/CBO9780511976667>
