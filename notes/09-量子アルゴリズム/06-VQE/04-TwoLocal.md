---
title: TwoLocal
status: 執筆済
tags: [量子アルゴリズム, VQE]
---

# TwoLocal

Qiskit が提供する、**汎用のパラメータ付き回路テンプレート**。
[[量子アルゴリズム/VQE/Hardware-Efficient-Ansatz|HEA]] の実装のひとつ。

## 構成要素

| 要素 | 指定するもの | 例 |
| --- | --- | --- |
| 回転ブロック | 1 量子ビットゲート | `ry`、`rz`、`['ry','rz']` |
| もつれブロック | 2 量子ビットゲート | `cx`、`cz` |
| もつれ方 | 接続パターン | `full`、`linear`、`circular` |
| 繰り返し | 層の数 | `reps` |

名前の "two-local" は、**2 量子ビットまでの操作だけで構成される**ことを指す。

## パラメータ数

回転ブロックが $r$ 種類、量子ビット $n$、層 $L$ のとき

$$p = r \times n \times (L+1)$$

たとえば `ry` のみ、$n=4$、`reps=3` なら 16 個。

パラメータ数が増えると

- 表現力は上がる
- 最適化の次元が上がり、[[最適化/量子最適化/VQEによる最適化|局所解]]が増える
- [[量子アルゴリズム/VQE/期待値計算|測定回数]]も増える

## もつれ方の選択

| パターン | CNOT 数 | 特徴 |
| --- | --- | --- |
| `linear` | $n-1$ | 隣接のみ。実機に優しい |
| `circular` | $n$ | 端どうしも繋ぐ |
| `full` | $n(n-1)/2$ | 全対全。実機では SWAP が大量に要る |

実機では `linear` が現実的。
`full` は理論的な表現力は高いが、
トランスパイル後の深さが跳ね上がる。

## 参考文献

- Qiskit Documentation: TwoLocal <https://quantum.cloud.ibm.com/docs/en/api/qiskit/qiskit.circuit.library.TwoLocal>
- Abhinav Kandala et al. Hardware-efficient variational quantum eigensolver for small molecules and quantum magnets. *Nature* 549, 2017. <https://doi.org/10.1038/nature23879>
- Marco Cerezo et al. Variational quantum algorithms. *Nature Reviews Physics* 3, 2021. <https://doi.org/10.1038/s42254-021-00348-9>
