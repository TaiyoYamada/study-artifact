---
title: Scout Bee
status: 執筆済
tags: [最適化, ABC]
---

# Scout Bee

**枯れた蜜源を捨て、新しい場所を無作為に探す蜂。** 偵察蜂。

ABC において**局所解から抜け出す唯一の仕組み**であり、
この手法の設計上もっとも特徴的な部分。

## 判定

各蜜源は「何回連続で改善しなかったか」のカウンタを持つ
（[[最適化/群知能/ABC/Employed-Bee|Employed Bee]] が更新する）。
これが閾値 `limit` を超えたら、その蜜源を捨てる。

$$x_i \leftarrow x^{\min} + \mathrm{rand}(0,1) \odot (x^{\max} - x^{\min})$$

つまり探索範囲から**一様に引き直す**。周辺を探すのではなく、完全に新しい場所へ飛ぶ。

## limit の決め方

原論文では次が目安とされる。

$$\texttt{limit} = SN \times n$$

$SN$ は蜜源の数、$n$ は次元。次元が高いほど 1 成分ずつしか動かない
ABC は改善に時間がかかるので、その分待つ、という理屈。

- **小さすぎる** … まだ改善の余地がある蜜源まで捨ててしまい、
  ランダム探索に近づく
- **大きすぎる** … 枯れた蜜源を抱え続け、評価回数を無駄にする

## 1 サイクルに 1 匹まで

標準の ABC では、`limit` を超えた蜜源が複数あっても
**1 サイクルで捨てるのは 1 つだけ**。集団が一度に崩れるのを防ぐため。

## 位置づけ

多くの手法では、停滞対策が
[[最適化/進化計算/CMA-ES/再始動戦略|再始動]]という外側のループになっている。
ABC はこれを**アルゴリズムの内側に、常時動く仕組みとして**持っている点が珍しい。
集団の一部だけを入れ替えるので、良い解を保ったまま探索をやり直せる。

## 参考文献

- Dervis Karaboga, Bahriye Basturk. A powerful and efficient algorithm for numerical function optimization: artificial bee colony (ABC) algorithm. *Journal of Global Optimization* 39, 2007.（原論文） <https://doi.org/10.1007/s10898-007-9149-x>
- Dervis Karaboga, Bahriye Basturk. On the performance of artificial bee colony (ABC) algorithm. *Applied Soft Computing* 8(1), 2008. <https://doi.org/10.1016/j.asoc.2007.05.007>
- Dervis Karaboga et al. A comprehensive survey: artificial bee colony (ABC) algorithm and applications. *Artificial Intelligence Review* 42, 2014.（総説） <https://doi.org/10.1007/s10462-012-9328-0>
