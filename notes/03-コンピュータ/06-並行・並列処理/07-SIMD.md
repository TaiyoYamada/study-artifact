---
title: SIMD
status: 執筆済
tags: [コンピュータ, 並行処理]
---

# SIMD

**1 つの命令で複数のデータを同時に処理する。**
Single Instruction, Multiple Data。

```
通常  : a[0]+b[0], a[1]+b[1], a[2]+b[2], a[3]+b[3]  … 4 命令
SIMD  : [a0 a1 a2 a3] + [b0 b1 b2 b3]              … 1 命令
```

## Flynn の分類

| | 単一データ | 複数データ |
| --- | --- | --- |
| **単一命令** | SISD（普通の逐次実行） | **SIMD** |
| **複数命令** | MISD（稀） | MIMD（マルチコア） |

## 命令セット

| ISA | 幅 |
| --- | --- |
| SSE | 128 bit（float 4 個） |
| AVX2 | 256 bit（float 8 個） |
| AVX-512 | 512 bit（float 16 個） |
| ARM NEON | 128 bit |
| **SVE / RVV** | 可変長（実装依存） |

固定長は世代ごとに再コンパイルが要る。
SVE や RISC-V ベクトル拡張は
**長さに依存しないコード**を書けるようにした設計。

## 使い方

| 方法 | 制御 | 手間 |
| --- | --- | --- |
| **自動ベクトル化** | コンパイラ任せ | 無し |
| 組み込み関数 | 明示的 | 大きい |
| ライブラリ | 間接的 | 小さい |
| アセンブリ | 完全 | 非常に大きい |

自動ベクトル化が効かない主な理由。

- **エイリアスの可能性**（2 つのポインタが重なるかもしれない）
- ループ内の分岐
- 依存関係（前の反復の結果を使う）
- 関数呼び出し

C の `restrict`、`#pragma omp simd` は
コンパイラに「重ならない」と伝えるための手段。

## 制約

- **データが連続していないと遅い**。ギャザー／スキャッタは高価
- アライメントが揃っていないと性能が落ちる
- 分岐はマスク演算で表現するため、両側を実行することになる

配列構造 (SoA) が構造体配列 (AoS) より
SIMD に向くのはこのため。

## 参考文献

- John L. Hennessy, David A. Patterson. *Computer Architecture: A Quantitative Approach*, 6th ed. Morgan Kaufmann, 2017.
- Michael J. Flynn. Some Computer Organizations and Their Effectiveness. *IEEE Transactions on Computers* C-21(9), 1972. <https://doi.org/10.1109/TC.1972.5009071>
- Intel Intrinsics Guide. <https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html>
