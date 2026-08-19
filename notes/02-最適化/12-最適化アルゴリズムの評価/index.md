---
title: 最適化アルゴリズムの評価
status: 執筆済
summary: どの手法が良いかをどう測って主張するか。ノーフリーランチ定理がある以上、主張は必ず条件付きになる。
tags: [最適化, 評価]
---

# 最適化アルゴリズムの評価

**どの手法が良いかを、どう測って主張するか。**
最適化の論文を読むとき、手法そのものと同じくらい重要な部分。

## なぜ難しいのか

[[最適化/ブラックボックス最適化/ブラックボックス最適化の考え方|ノーフリーランチ定理]]により、
**すべての問題で最良の手法は存在しない**。
したがって「A は B より良い」という主張は必ず
「どの問題群で、どの予算で、どの指標で」という条件付きになる。

この条件が曖昧なまま提案手法の優位が主張されている論文は多い。

## 確かめるべきこと

| 観点 | 見るところ |
| --- | --- |
| [[最適化/最適化アルゴリズムの評価/ベンチマーク関数\|問題群]] | 提案手法に有利な関数だけを選んでいないか |
| [[最適化/最適化アルゴリズムの評価/計算コスト\|予算]] | 評価回数を揃えているか。時間で揃えるのは公平か |
| [[最適化/最適化アルゴリズムの評価/ハイパーパラメータ\|調整]] | 比較対象も同じ手間で調整したか |
| [[最適化/最適化アルゴリズムの評価/統計的比較\|統計]] | 試行回数と検定。平均だけで語っていないか |
| 再現性 | 乱数種、実装、環境が書かれているか |

## 参考文献

- Nikolaus Hansen et al. COCO: A Platform for Comparing Continuous Optimizers in a Black-Box Setting. *Optimization Methods and Software* 36(1), 2021. <https://doi.org/10.1080/10556788.2020.1808977>
- Joaquín Derrac et al. A practical tutorial on the use of nonparametric statistical tests as a methodology for comparing evolutionary and swarm intelligence algorithms. *Swarm and Evolutionary Computation* 1(1), 2011. <https://doi.org/10.1016/j.swevo.2011.02.002>
