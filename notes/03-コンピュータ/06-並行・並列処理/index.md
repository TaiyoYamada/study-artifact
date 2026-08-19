---
title: 並行・並列処理
status: 執筆済
summary: クロック頭打ち以降、性能向上の唯一の道。アムダールの法則が並列化の上限を規定する。
tags: [コンピュータ, 並行処理]
---

# 並行・並列処理

クロック周波数が 2000 年代半ばに頭打ちになって以降、
性能向上の道は**並列化**しかなくなった。

## なぜ避けられなくなったのか

$$P \propto f V^2$$

周波数を上げると電力が急増し、冷却が追いつかない。
トランジスタは増やせる（微細化は続いた）ので、
**コアを増やす**方向に転換した。

その結果、性能を引き出す責任が
ハードウェアからソフトウェアに移った。

## 構成

- [[コンピュータ/並行・並列処理/並行処理と並列処理|並行処理と並列処理]] — 概念の区別
- [[コンピュータ/並行・並列処理/プロセスとスレッド|プロセスとスレッド]]
- [[コンピュータ/並行・並列処理/Mutex|Mutex]]・[[コンピュータ/並行・並列処理/Semaphore|Semaphore]]
- [[コンピュータ/並行・並列処理/Race Condition|Race Condition]]・[[コンピュータ/並行・並列処理/Deadlock|Deadlock]]
- [[コンピュータ/並行・並列処理/SIMD|SIMD]]・[[コンピュータ/並行・並列処理/GPU並列処理|GPU 並列処理]]

## アムダールの法則

並列化できない部分の割合を $s$ とすると、
$n$ 並列での高速化は

$$S(n) = \frac{1}{s + \frac{1-s}{n}} \quad \xrightarrow{n \to \infty} \quad \frac{1}{s}$$

**5% が逐次なら、どれだけ並列化しても 20 倍が上限。**

一方グスタフソンの法則は、
問題規模を並列度に応じて大きくできる場合には
この制約が緩むことを示している。
科学計算では規模を上げられることが多く、
実際にはこちらが当てはまる場面も多い。

## 参考文献

- Maurice Herlihy, Nir Shavit. *The Art of Multiprocessor Programming*, 2nd ed. Morgan Kaufmann, 2020.
- Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau. *Operating Systems: Three Easy Pieces*. Arpaci-Dusseau Books, 2018.（全文公開） <https://pages.cs.wisc.edu/~remzi/OSTEP/>
- Gene M. Amdahl. Validity of the single processor approach to achieving large scale computing capabilities. *AFIPS*, 1967. <https://doi.org/10.1145/1465482.1465560>
- John L. Gustafson. Reevaluating Amdahl's law. *Communications of the ACM* 31(5), 1988. <https://doi.org/10.1145/42411.42415>
