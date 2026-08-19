---
title: CMA-BCの基本
status: 要確認
tags: [最適化, CMA-ES, ABC]
---

# CMA-BCの基本

> [!warning] 出典が確認できていない
> 「CMA-BC」という名前の手法について、公表された文献を特定できなかった。
> CMA-ES、ABC、および両者を含むハイブリッド手法の文献は多数あるが、
> この名称の手法は見つからない。
>
> このページは**その名前の手法の解説ではなく**、
> 「CMA-ES と ABC を組み合わせるとき何が論点になるか」を、
> 両者の確認できる性質から整理したもの。
> 元になる論文や実装があれば、それに合わせて書き直す。

## 何を決めなければならないか

CMA-ES と ABC を混ぜる、と言ったときに実際に決めるべき事項は次の 4 つ。
どれを選ぶかで別物になるので、論文を読むときはここを確認することになる。

**1. 集団をどちらの形で持つか**

CMA-ES は分布 $\mathcal{N}(m, \sigma^2 C)$ を状態として持ち、
個体は毎世代使い捨てる。ABC は蜜源（＝解）そのものを状態として持ち続け、
それぞれに試行回数カウンタが付く。両立させるなら、
分布と蜜源集合の**どちらが主でどちらが従か**を決める必要がある。

**2. 候補をどの規則で作るか**

CMA-ES は多変量正規分布から引く。ABC は
[[最適化/群知能/ABC/ABCの基本|$v_{ij} = x_{ij} + \phi_{ij}(x_{ij}-x_{kj})$]] で
1 成分だけ動かす。混ぜるなら、段階ごとに使い分けるのか、
確率的に選ぶのか、式そのものを合成するのか。

**3. 選択をどうするか**

CMA-ES は上位 $\mu$ 個の重み付き平均で中心を動かす（順位のみ使用）。
ABC は貪欲な置き換えと、適応度比例のルーレット選択を使う。
ここを混ぜると、CMA-ES が持っていた**スケール不変性が失われうる**。

**4. 停滞をどう判定するか**

ABC のカウンタは「その蜜源が改善しない回数」を数える。
CMA-ES に持ち込むには、分布のどの部分に対してカウンタを持つのかを決める必要がある。

## 気をつけたいこと

組み合わせた手法が元の手法より良いことを主張するには、
[[最適化/最適化アルゴリズムの評価/アルゴリズム比較|比較の作法]]が要る。
評価回数を揃え、[[最適化/最適化アルゴリズムの評価/統計的比較|統計的検定]]を行い、
[[最適化/最適化アルゴリズムの評価/ベンチマーク関数|ベンチマーク]]の選び方に
偏りが無いか確かめる。ハイブリッド手法は部品が増えるぶん
「どの部品が効いたのか」が曖昧になりやすいので、
アブレーション（部品を 1 つずつ外して測る）が特に重要になる。

## 参考文献

- Nikolaus Hansen. The CMA Evolution Strategy: A Tutorial. 2016. <https://arxiv.org/abs/1604.00772>
- Dervis Karaboga et al. A comprehensive survey: artificial bee colony (ABC) algorithm and applications. *Artificial Intelligence Review* 42, 2014. <https://doi.org/10.1007/s10462-012-9328-0>
- Christian Blum et al. Hybrid metaheuristics in combinatorial optimization: A survey. *Applied Soft Computing* 11(6), 2011. <https://doi.org/10.1016/j.asoc.2011.02.032>
- Kenneth Sörensen. Metaheuristics — the metaphor exposed. *International Transactions in Operational Research* 22(1), 2015. <https://doi.org/10.1111/itor.12001>
