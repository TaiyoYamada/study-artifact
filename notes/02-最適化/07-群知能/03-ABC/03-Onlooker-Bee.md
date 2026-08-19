---
title: Onlooker Bee
status: 執筆済
tags: [最適化, ABC]
---

# Onlooker Bee

**蜜量の多い蜜源を選んで調べる蜂。** 傍観蜂、追従蜂。

実際の蜜蜂では、戻ってきた働き蜂が巣で「8 の字ダンス」を踊り、
その激しさで蜜源の良さを伝える。待機していた蜂はそれを見て
どの蜜源へ向かうかを決める。ABC はこれを**確率的な選択**として実装している。

## 選択確率

$$p_i = \frac{\mathrm{fit}_i}{\sum_{j} \mathrm{fit}_j}$$

適応度に比例した確率で蜜源を選ぶ（ルーレット選択）。
選んだあとの操作は[[最適化/群知能/ABC/Employed-Bee|Employed Bee]] と同じで、
近傍に候補を作り、良ければ置き換える。

## 何のためにあるのか

Employed Bee 段階では全蜜源が平等に 1 回ずつ調べられる。
Onlooker Bee 段階では**良い蜜源ほど多く調べられる**。

つまり評価回数の配分を、その時点の情報に応じて偏らせている。
これが ABC における**活用**にあたる。
Onlooker Bee の数は通常 Employed Bee と同数に取るので、
1 サイクルの評価回数は「平等な探索 : 傾斜した活用 = 1 : 1」になる。

## 選択圧の問題

ルーレット選択は、適応度の差が小さいとほぼ一様選択になり、
差が大きいと 1 つの蜜源に集中しすぎる。
目的関数のスケールに結果が左右されるということで、
[[最適化/進化計算/CMA-ES/CMA-ESの基本|順位だけを使う CMA-ES]] が
スケールに対して不変なのと対照的。

改良手法ではトーナメント選択に置き換えるものもある。

## 参考文献

- Dervis Karaboga, Bahriye Basturk. A powerful and efficient algorithm for numerical function optimization: artificial bee colony (ABC) algorithm. *Journal of Global Optimization* 39, 2007.（原論文） <https://doi.org/10.1007/s10898-007-9149-x>
- Dervis Karaboga, Bahriye Basturk. On the performance of artificial bee colony (ABC) algorithm. *Applied Soft Computing* 8(1), 2008. <https://doi.org/10.1016/j.asoc.2007.05.007>
- Dervis Karaboga et al. A comprehensive survey: artificial bee colony (ABC) algorithm and applications. *Artificial Intelligence Review* 42, 2014.（総説） <https://doi.org/10.1007/s10462-012-9328-0>
