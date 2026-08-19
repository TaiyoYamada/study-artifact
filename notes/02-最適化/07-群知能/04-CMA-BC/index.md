---
title: CMA-BC
summary: CMA-ES と ABC を組み合わせる構想。名称の出典が確認できていないため、両手法の性質から論点だけを整理してある。
tags: [最適化, 群知能, CMA-ES, ABC]
status: 要確認
---

# CMA-BC

> [!warning] 出典が確認できていない
> 「CMA-BC」という名前の手法について、公表された文献を特定できなかった。
> CMA-ES、ABC、および両者を含むハイブリッド手法の文献は多数あるが、
> この名称の手法は見つからない。
>
> このページは**その名前の手法の解説ではなく**、
> 「CMA-ES と ABC を組み合わせるとき何が論点になるか」を、
> 両者の確認できる性質から整理したもの。
> 元になる論文や実装があれば、それに合わせて書き直す。

## 組み合わせる動機

[[最適化/進化計算/CMA-ES|CMA-ES]] と [[最適化/群知能/ABC|ABC]] は、
得意と不得意がきれいに補い合う関係にある。

| | CMA-ES | ABC |
| --- | --- | --- |
| 変数間の相関 | 共分散行列で学習する | 1 成分ずつしか動かさず捉えられない |
| 収束の速さ | 速い | 遅い |
| 局所解からの脱出 | 外側の[[最適化/進化計算/CMA-ES/再始動戦略\|再始動]]に頼る | [[最適化/群知能/ABC/Scout-Bee\|Scout Bee]] が常時働く |
| スケール不変性 | 順位のみ使うため不変 | 適応度に比例した選択のため影響を受ける |
| パラメータ調整 | 既定値がよく効く | `limit` の設定が要る |

素朴に言えば、**CMA-ES の収束の速さと相関の学習に、
ABC の停滞脱出の仕組みを足したい**という構図になる。

## 中身

- [[最適化/群知能/CMA-BC/CMA-BCの基本|CMA-BCの基本]]
- [[最適化/群知能/CMA-BC/CMA-ESとABCの統合|CMA-ESとABCの統合]]
- [[最適化/群知能/CMA-BC/探索分布|探索分布]]
- [[最適化/群知能/CMA-BC/再始動・停滞対策|再始動・停滞対策]]

## 参考文献

- Nikolaus Hansen. The CMA Evolution Strategy: A Tutorial. 2016. <https://arxiv.org/abs/1604.00772>
- Dervis Karaboga et al. A comprehensive survey: artificial bee colony (ABC) algorithm and applications. *Artificial Intelligence Review* 42, 2014. <https://doi.org/10.1007/s10462-012-9328-0>
- Christian Blum et al. Hybrid metaheuristics in combinatorial optimization: A survey. *Applied Soft Computing* 11(6), 2011. <https://doi.org/10.1016/j.asoc.2011.02.032>
- Kenneth Sörensen. Metaheuristics — the metaphor exposed. *International Transactions in Operational Research* 22(1), 2015. <https://doi.org/10.1111/itor.12001>
