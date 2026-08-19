---
title: ABCの基本
status: 執筆済
tags: [最適化, ABC]
---

# ABCの基本

## 近傍生成

ABC で新しい候補を作る式はこれひとつ。

$$v_{ij} = x_{ij} + \phi_{ij} (x_{ij} - x_{kj})$$

- $i$ … いま担当している蜜源
- $k$ … 無作為に選んだ別の蜜源（$k \ne i$）
- $j$ … 無作為に選んだ**1 つの成分**
- $\phi_{ij}$ … $[-1, 1]$ の一様乱数

## 2 つの設計判断

**1 成分しか変えない。** 残りの成分は $x_i$ のまま。
1 回の試行で変わるのは 1 次元だけになる。

**差分を使う。** $x_{ij} - x_{kj}$ は
[[最適化/進化計算/差分進化|差分進化]]と同じ発想で、
集団が広く散っていれば大きく動き、収束すれば自然に小さく動く。
ステップサイズを別に管理しなくてよい。

この「1 成分だけ」が ABC の性格を決めている。
探索は慎重になり局所解に落ちにくい一方、
**次元が上がるほど収束が遅くなる**。$n$ 次元なら
全成分を一巡するのに最低 $n$ 回の試行が要る。

## 貪欲な選択

作った $v_i$ と元の $x_i$ を比べ、良い方だけを残す。
悪化は決して受け入れない。
[[最適化/焼きなまし・局所探索/焼きなまし法|焼きなまし法]]と対照的で、
ABC が局所解から抜け出す役目は
[[最適化/群知能/ABC/Scout-Bee|Scout Bee]] に分離されている。

## 適応度

最小化問題では、目的関数値をそのまま確率に使えないので変換する。

$$\mathrm{fit}_i = \begin{cases} \dfrac{1}{1 + f_i} & f_i \ge 0 \\[6pt] 1 + |f_i| & f_i < 0 \end{cases}$$

これを[[最適化/群知能/ABC/Onlooker-Bee|Onlooker Bee]] の選択確率に使う。

## 参考文献

- Dervis Karaboga, Bahriye Basturk. A powerful and efficient algorithm for numerical function optimization: artificial bee colony (ABC) algorithm. *Journal of Global Optimization* 39, 2007.（原論文） <https://doi.org/10.1007/s10898-007-9149-x>
- Dervis Karaboga, Bahriye Basturk. On the performance of artificial bee colony (ABC) algorithm. *Applied Soft Computing* 8(1), 2008. <https://doi.org/10.1016/j.asoc.2007.05.007>
- Dervis Karaboga et al. A comprehensive survey: artificial bee colony (ABC) algorithm and applications. *Artificial Intelligence Review* 42, 2014.（総説） <https://doi.org/10.1007/s10462-012-9328-0>
