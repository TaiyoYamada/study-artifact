---
title: ABC
summary: 蜜蜂の採餌行動を模した最適化。役割の違う 3 種の蜂が、既知の蜜源の活用・有望な蜜源への集中・枯れた蜜源の放棄を分担する。
tags: [最適化, 群知能, ABC]
status: 執筆済
---

# ABC

**Artificial Bee Colony、人工蜂コロニー。**
Karaboga が 2005 年に提案し、2007 年の論文で数値最適化での性能が示された。

蜜蜂の採餌を模しているが、要点は**役割分担**にある。
3 種類の蜂がそれぞれ違う仕事をすることで、
[[最適化/最適化の基礎/探索と活用|探索と活用]]と停滞対策が
アルゴリズムの構造として分離されている。

| 蜂 | 仕事 | 対応する働き |
| --- | --- | --- |
| [[最適化/群知能/ABC/Employed-Bee\|Employed Bee]] | 担当する蜜源の近くを調べる | 局所的な活用 |
| [[最適化/群知能/ABC/Onlooker-Bee\|Onlooker Bee]] | 良い蜜源に人手を集中させる | 有望領域への傾斜 |
| [[最適化/群知能/ABC/Scout-Bee\|Scout Bee]] | 枯れた蜜源を捨てて新規開拓 | 停滞からの脱出 |

**蜜源 = 解候補**、**蜜量 = 適応度**（最小化なら目的関数値が小さいほど良い）。

## 全体の流れ

1. 蜜源を無作為に初期化する
2. Employed Bee 段階 — 各蜜源の近傍に候補を作り、良ければ置き換える
3. Onlooker Bee 段階 — 蜜量に比例した確率で蜜源を選び、同じことをする
4. Scout Bee 段階 — 一定回数改善しなかった蜜源を捨て、無作為に打ち直す
5. 2〜4 を繰り返す

## 特徴と弱点

パラメータが**蜂の数と放棄の閾値 (`limit`) だけ**と少なく、扱いやすい。
一方で、近傍生成が 1 成分しか動かさないため
**収束が遅い**ことが繰り返し指摘されている。
[[最適化/群知能/ABC/ABCの改良手法|改良手法]]の多くはここを突いている。

## 参考文献

- Dervis Karaboga, Bahriye Basturk. A powerful and efficient algorithm for numerical function optimization: artificial bee colony (ABC) algorithm. *Journal of Global Optimization* 39, 2007.（原論文） <https://doi.org/10.1007/s10898-007-9149-x>
- Dervis Karaboga, Bahriye Basturk. On the performance of artificial bee colony (ABC) algorithm. *Applied Soft Computing* 8(1), 2008. <https://doi.org/10.1016/j.asoc.2007.05.007>
- Dervis Karaboga et al. A comprehensive survey: artificial bee colony (ABC) algorithm and applications. *Artificial Intelligence Review* 42, 2014.（総説） <https://doi.org/10.1007/s10462-012-9328-0>
