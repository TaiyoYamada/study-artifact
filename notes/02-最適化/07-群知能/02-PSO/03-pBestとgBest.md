---
title: pBestとgBest
status: 執筆済
tags: [最適化, PSO]
---

# pBestとgBest

PSO が持つ 2 種類の記憶。

| 記憶 | 記号 | 中身 | 役割 |
| --- | --- | --- | --- |
| pBest | $p_i$ | その粒子が過去に訪れた最良の位置 | 個体の経験 |
| gBest | $g$ | 群れ全体が見つけた最良の位置 | 共有された知識 |

## なぜ両方要るのか

**gBest だけ**にすると、全粒子が同じ 1 点へ向かう。収束は速いが、
その点が局所解なら全員がそこで止まる（早すぎる収束）。

**pBest だけ**にすると、各粒子が自分の周りを独立に探すだけになり、
良い解が見つかっても他へ伝わらない。群れである意味が無くなる。

両方を足すことで、粒子は「自分の経験」と「仲間の発見」の間を漂う。
$p_i$ と $g$ の中間あたりが最も密に探索される領域になる。

## 更新のタイミング

- $p_i$ … その粒子の現在位置が $p_i$ より良ければ置き換える
- $g$ … 全 $p_i$ の中で最良のものを取る

$g$ を更新する範囲を群れ全体ではなく近傍に限ると
[[最適化/群知能/PSO/近傍トポロジー|lBest 型]]になり、
情報の伝わり方が変わる。

## 停滞の兆候

$p_i$ が長く更新されなくなり、かつ全粒子が $g$ の近くに集まったら、
群れは動けなくなっている。速度がほぼ 0 になるためで、
このとき粒子数を増やしても改善しない。再初期化するか、
[[最適化/群知能/ABC/Scout-Bee|ABC の Scout Bee]] のような
打ち直しの仕組みが要る。

## 参考文献

- James Kennedy, Russell Eberhart. Particle Swarm Optimization. *Proceedings of ICNN'95*, 1995.（原論文） <https://doi.org/10.1109/ICNN.1995.488968>
- Riccardo Poli, James Kennedy, Tim Blackwell. Particle swarm optimization: An overview. *Swarm Intelligence* 1(1), 2007.（総説） <https://doi.org/10.1007/s11721-007-0002-0>
