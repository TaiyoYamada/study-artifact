---
title: Employed Bee
status: 執筆済
tags: [最適化, ABC]
---

# Employed Bee

**それぞれが 1 つの蜜源を担当し、その近くを調べる蜂。**
働き蜂、就職蜂などと訳される。

蜜源の数と Employed Bee の数は**同じ**。
つまり「解の集団のサイズ = Employed Bee の数」で、
各蜂が 1 つの解を受け持つ。

## 1 サイクルでやること

各蜜源 $x_i$ について、

1. [[最適化/群知能/ABC/ABCの基本|近傍生成式]]で候補 $v_i$ を作る
2. $f(v_i)$ を評価する
3. $v_i$ の方が良ければ $x_i$ を置き換え、**試行回数カウンタを 0 に戻す**
4. 悪ければ $x_i$ を残し、**カウンタを 1 増やす**

## カウンタが重要

3 と 4 のカウンタ（`trial` と呼ばれる）が、
[[最適化/群知能/ABC/Scout-Bee|Scout Bee]] の判断材料になる。
「この蜜源は何回試しても改善しない＝枯れている」を数えている。

このカウンタがあるおかげで、ABC は**どの解が停滞しているかを
アルゴリズム自身が把握している**。多くの手法では停滞の検知が
外付けの停止条件になっているのに対し、ABC は構造に組み込んでいる。

## 全数を等しく扱う

Employed Bee 段階では、蜜源の良し悪しに関わらず
**すべての蜜源が 1 回ずつ**調べられる。
良い蜜源に人手を寄せるのは次の
[[最適化/群知能/ABC/Onlooker-Bee|Onlooker Bee]] 段階の仕事で、
ここでは平等に探索する。この分担が探索と活用の切り分けになっている。

## 参考文献

- Dervis Karaboga, Bahriye Basturk. A powerful and efficient algorithm for numerical function optimization: artificial bee colony (ABC) algorithm. *Journal of Global Optimization* 39, 2007.（原論文） <https://doi.org/10.1007/s10898-007-9149-x>
- Dervis Karaboga, Bahriye Basturk. On the performance of artificial bee colony (ABC) algorithm. *Applied Soft Computing* 8(1), 2008. <https://doi.org/10.1016/j.asoc.2007.05.007>
- Dervis Karaboga et al. A comprehensive survey: artificial bee colony (ABC) algorithm and applications. *Artificial Intelligence Review* 42, 2014.（総説） <https://doi.org/10.1007/s10462-012-9328-0>
