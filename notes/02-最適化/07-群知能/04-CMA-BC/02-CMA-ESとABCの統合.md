---
title: CMA-ESとABCの統合
status: 要確認
tags: [最適化, CMA-ES, ABC]
---

# CMA-ESとABCの統合

> [!warning] 出典が確認できていない
> 「CMA-BC」という名前の手法について、公表された文献を特定できなかった。
> CMA-ES、ABC、および両者を含むハイブリッド手法の文献は多数あるが、
> この名称の手法は見つからない。
>
> このページは**その名前の手法の解説ではなく**、
> 「CMA-ES と ABC を組み合わせるとき何が論点になるか」を、
> 両者の確認できる性質から整理したもの。
> 元になる論文や実装があれば、それに合わせて書き直す。

## ハイブリッド化の型

メタヒューリスティクスの組み合わせ方には、既存研究で整理された型がある。
Blum らの分類に沿うと、CMA-ES と ABC の統合も次のどれかに当てはまる。

| 型 | 内容 | この組み合わせでの意味 |
| --- | --- | --- |
| 逐次実行 | 一方を回してから他方に渡す | ABC で広く探し、良い領域から CMA-ES を始める |
| 交互実行 | 段階ごとに切り替える | Employed / Onlooker 段階を CMA-ES のサンプリングに置き換える |
| 埋め込み | 一方の部品を他方に組み込む | CMA-ES に Scout Bee 相当の打ち直しを足す |
| 並列 | 別々に回して情報を交換する | 集団を分け、定期的に良い解を移す |

**逐次実行**が最も安全で、元の手法の性質を壊さない。
**埋め込み**は最も踏み込むが、CMA-ES の不変性や
[[最適化/進化計算/CMA-ES/ステップサイズ適応|ステップサイズ適応]]の
前提が崩れないかを個別に確かめる必要がある。

## 壊れうる前提

CMA-ES の各部品は互いに噛み合って動いている。
外から個体を注入すると、次の前提が崩れる可能性がある。

- **進化パスの意味** — [[最適化/進化計算/CMA-ES/進化パス|$p_\sigma$]] は
  「ランダムに動いたときの長さ」を基準に大小を判定する。
  分布外から来た個体で中心を動かすと、この基準が成り立たなくなる
- **重みの正規化** — $\sum w_i = 1$ と $\mu_{\text{eff}}$ を前提に
  学習率が決まっている
- **単調変換への不変性** — 順位だけを使うことで成り立っている。
  適応度比例の選択を混ぜると失われる

これらは「動かなくなる」のではなく「既定パラメータが最適でなくなる」形で
効いてくるので、不具合として現れにくい。比較実験で
CMA-ES 単体に負けたとき、手法の問題かパラメータの問題かの切り分けが難しくなる。

## 参考文献

- Nikolaus Hansen. The CMA Evolution Strategy: A Tutorial. 2016. <https://arxiv.org/abs/1604.00772>
- Dervis Karaboga et al. A comprehensive survey: artificial bee colony (ABC) algorithm and applications. *Artificial Intelligence Review* 42, 2014. <https://doi.org/10.1007/s10462-012-9328-0>
- Christian Blum et al. Hybrid metaheuristics in combinatorial optimization: A survey. *Applied Soft Computing* 11(6), 2011. <https://doi.org/10.1016/j.asoc.2011.02.032>
- Kenneth Sörensen. Metaheuristics — the metaphor exposed. *International Transactions in Operational Research* 22(1), 2015. <https://doi.org/10.1111/itor.12001>
