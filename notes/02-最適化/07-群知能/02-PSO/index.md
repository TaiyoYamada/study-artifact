---
title: PSO
summary: 各個体が速度を持ち、自分がこれまでに見つけた最良と、群れが見つけた最良の両方へ引かれながら動く手法。
tags: [最適化, 群知能, PSO]
status: 執筆済
---

# PSO

**Particle Swarm Optimization、粒子群最適化。**
Kennedy と Eberhart が 1995 年に提案した。鳥の群れが餌場へ集まる様子が着想源。

各個体（粒子）は**位置**と**速度**を持ち、
自分の経験と群れの情報の両方に引かれながら空間を飛ぶ。

## 構成

- [[最適化/群知能/PSO/PSOの基本|PSOの基本]] — 全体の流れ
- [[最適化/群知能/PSO/位置と速度の更新|位置と速度の更新]] — 中心となる 2 本の式
- [[最適化/群知能/PSO/pBestとgBest|pBestとgBest]] — 2 種類の記憶
- [[最適化/群知能/PSO/近傍トポロジー|近傍トポロジー]] — 誰が誰の情報を見るか

## 特徴

実装が非常に短く（20 行程度で書ける）、パラメータも 3 つしかない。
そのぶん、問題に応じた調整が要る点は
[[最適化/進化計算/CMA-ES|CMA-ES]]（既定値がよく効く）と対照的。

## 参考文献

- James Kennedy, Russell Eberhart. Particle Swarm Optimization. *Proceedings of ICNN'95*, 1995.（原論文） <https://doi.org/10.1109/ICNN.1995.488968>
- Riccardo Poli, James Kennedy, Tim Blackwell. Particle swarm optimization: An overview. *Swarm Intelligence* 1(1), 2007.（総説） <https://doi.org/10.1007/s11721-007-0002-0>
