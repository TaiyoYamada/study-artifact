---
title: ABCの改良手法
status: 執筆済
tags: [最適化, ABC]
---

# ABCの改良手法

標準の ABC は**探索は得意だが収束が遅い**と繰り返し指摘されてきた。
原因は[[最適化/群知能/ABC/ABCの基本|近傍生成式]]にある。

$$v_{ij} = x_{ij} + \phi_{ij}(x_{ij} - x_{kj})$$

- 1 サイクルで**1 成分しか変わらない**
- 参照先 $x_k$ が**無作為**で、良い解の情報を使っていない

改良手法の多くは、この 2 点のどちらかを突いている。

## GABC — 最良解の情報を足す

Zhu と Kwong は、[[最適化/群知能/PSO/pBestとgBest|PSO の gBest]] にならって
全体最良への引力を加えた。

$$v_{ij} = x_{ij} + \phi_{ij}(x_{ij} - x_{kj}) + \psi_{ij}(y_j - x_{ij})$$

$y$ が現在の最良解。無作為な参照だけだった探索に方向が入り、収束が速くなる。
代わりに早すぎる収束のリスクが増えるので、$\psi$ の範囲で調整する。

## その他の方向

| 方向 | 内容 |
| --- | --- |
| 複数成分の更新 | 変更する成分数を増やす（$MR$ という修正率を導入） |
| 他手法との融合 | [[最適化/進化計算/差分進化\|差分進化]]の変異を Onlooker 段階に使う (HABCDE) |
| 選択圧の変更 | ルーレット選択をトーナメント選択に置き換える |
| パラメータ適応 | `limit` や $\phi$ の範囲を探索の進み具合で変える |

## 読むときの注意

ABC の改良手法は非常に数が多く、**比較実験の条件が揃っていない**ものも目立つ。
評価回数を揃えているか、[[最適化/最適化アルゴリズムの評価/統計的比較|統計的検定]]を
しているか、[[最適化/最適化アルゴリズムの評価/ベンチマーク関数|ベンチマーク関数]]が
偏っていないかを確認したい。

Sörensen は、群知能の分野で比喩を変えただけの「新手法」が量産されている状況を
批判しており、ABC 系の改良提案を読むときにも念頭に置く価値がある。

## 参考文献

- Guopu Zhu, Sam Kwong. Gbest-guided artificial bee colony algorithm for numerical function optimization. *Applied Mathematics and Computation* 217(7), 2010. <https://doi.org/10.1016/j.amc.2010.09.049>
- Dervis Karaboga et al. A comprehensive survey: artificial bee colony (ABC) algorithm and applications. *Artificial Intelligence Review* 42, 2014. <https://doi.org/10.1007/s10462-012-9328-0>
- Kenneth Sörensen. Metaheuristics — the metaphor exposed. *International Transactions in Operational Research* 22(1), 2015. <https://doi.org/10.1111/itor.12001>
