---
title: AOTコンパイル
status: 執筆済
tags: [コンピュータ, 言語処理系]
---

# AOTコンパイル

**実行前にすべて機械語へコンパイルする。** Ahead-Of-Time。
C、C++、Rust、Go、Swift が標準でこの方式。

## 特徴

| 利点 | 欠点 |
| --- | --- |
| 起動が速い | ビルドに時間がかかる |
| 性能が安定する | 実行時の情報が使えない |
| ランタイムが小さい | 対象ごとにビルドが要る |
| **実行時の性能が予測できる** | 動的な最適化ができない |

## JIT との比較

[[コンピュータ/言語処理系/JITコンパイル|JIT]] は
ピーク性能で AOT を上回ることがある
（実行時の型情報や CPU 機能を使えるため）。

しかし AOT が選ばれる場面は多い。

| 場面 | 理由 |
| --- | --- |
| CLI ツール | 起動時間が支配的 |
| サーバレス | コールドスタートが問題 |
| 組み込み | メモリとランタイムの制約 |
| iOS アプリ | **JIT が禁止されている** |
| リアルタイム | 性能のばらつきが許されない |

**平均が速いことと、最悪が保証されることは別の要求。**

## PGO

プロファイル誘導最適化。
一度実行してプロファイルを取り、
それを使って再コンパイルする。

$$\text{AOT} + \text{実行時の情報} \quad \approx \quad \text{JIT の利点の一部}$$

分岐の偏り、ホットな関数のインライン化などに効く。
10〜20% の改善が報告されることが多い。

## ネイティブイメージ

GraalVM Native Image、.NET Native AOT など、
本来 JIT 前提の言語を AOT でネイティブバイナリにする技術。

起動が劇的に速くなる代わりに、
リフレクションや動的なクラスロードが制限される。
**動的な機能と AOT はトレードオフの関係にある。**

## 参考文献

- Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman. *Compilers: Principles, Techniques, and Tools*, 2nd ed. Pearson, 2006.
- Christian Wimmer et al. Initialize Once, Start Fast: Application Initialization at Build Time. *OOPSLA*, 2019. <https://doi.org/10.1145/3360610>
- Chris Lattner, Vikram Adve. LLVM: A Compilation Framework for Lifelong Program Analysis & Transformation. *CGO*, 2004. <https://doi.org/10.1109/CGO.2004.1281665>
