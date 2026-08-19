---
title: VQEによる最適化
status: 執筆済
tags: [最適化, 量子計算, VQE]
---

# VQEによる最適化

**量子回路のパラメータを古典最適化器で調整する**という枠組みを、
最適化の側から見たもの。Variational Quantum Eigensolver。

$$\min_{\theta} \; \langle \psi(\theta) | H | \psi(\theta) \rangle$$

Peruzzo らが 2014 年に提案した。詳しい仕組みは
[[量子アルゴリズム/VQE|量子アルゴリズム側の VQE]] を参照。

## 最適化問題として何が特殊か

VQE のパラメータ探索は、古典的な最適化問題として見ると
かなり厳しい条件が揃っている。

| 条件 | 内容 | 効いてくること |
| --- | --- | --- |
| 評価が確率的 | 期待値は有限ショットの標本平均 | 値の比較そのものが不確か |
| 評価が高価 | 1 点あたり多数のショットと回路実行 | 評価回数を절約する必要 |
| 勾配が高い | パラメータシフト則で $\mathcal{O}(p)$ 回の回路評価 | 勾配法が割に合わない |
| 非凸 | 局所解が多数 | 初期値依存が強い |
| barren plateau | 勾配の分散が量子ビット数に対し指数的に減衰 | そもそも進めない |

## 手法の選択

これらの条件から、実際に使われる最適化器は絞られる。

- [[最適化/導関数を使わない最適化/SPSA|SPSA]] — 次元によらず 2 回の評価で勾配を近似。
  ノイズを前提とした設計。Qiskit の既定手法のひとつ
- [[最適化/進化計算/CMA-ES|CMA-ES]] — 順位のみを使うためノイズに比較的頑健
- [[最適化/導関数を使わない最適化/Nelder-Mead法|Nelder-Mead]] — 値の大小比較で動くため
  ノイズに弱く、実機では不安定になりやすい

比較実験は[[論文メモ/optimizer-benchmark|量子化学 VQA での最適化器ベンチマーク]]と
[[論文メモ/noisy-landscapes|ノイズ景観での最適化戦略]]のメモを参照。

## barren plateau

McClean らは、ランダムに初期化された深い回路では
**勾配の分散が量子ビット数に対して指数的に減衰する**ことを示した。
平坦な景観では勾配法もランダム探索も等しく進めないため、
最適化器を変えるだけでは解決しない。
回路構造（Ansatz）や初期化の工夫が要る、という問題設定になっている。

## 参考文献

- Alberto Peruzzo et al. A variational eigenvalue solver on a photonic quantum processor. *Nature Communications* 5, 2014. <https://doi.org/10.1038/ncomms5213>
- Marco Cerezo et al. Variational quantum algorithms. *Nature Reviews Physics* 3, 2021. <https://doi.org/10.1038/s42254-021-00348-9>
- Jarrod R. McClean et al. Barren plateaus in quantum neural network training landscapes. *Nature Communications* 9, 2018. <https://doi.org/10.1038/s41467-018-07090-4>
