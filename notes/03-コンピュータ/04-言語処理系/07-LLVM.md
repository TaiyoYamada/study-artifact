---
title: LLVM
status: 執筆済
tags: [コンピュータ, 言語処理系, LLVM]
---

# LLVM

**再利用可能なコンパイラ基盤。**
Clang、Swift、Rust、Julia などが共通して使っている。

## 中心にあるもの — LLVM IR

言語にもアーキテクチャにも依存しない中間表現。

```
define i32 @add(i32 %a, i32 %b) {
entry:
  %sum = add nsw i32 %a, %b
  ret i32 %sum
}
```

特徴。

- **SSA 形式**（各変数への代入は 1 回だけ）
- 静的に型が付いている
- テキスト・バイナリ・メモリ内の 3 表現が等価

## $M \times N$ を $M + N$ にする

```
C/C++ ┐                    ┌ x86-64
Swift ┼→ [LLVM IR] → 最適化 ┼→ ARM64
Rust  ┤                    ├ RISC-V
Julia ┘                    └ WASM
```

言語側は IR を出すだけ、
アーキテクチャ側は IR を受けるだけでよい。

新しい言語を作るとき、
最適化とコード生成を自分で書かなくて済む。
**Swift や Rust が実用的な性能で登場できたのは、
LLVM があったから**という側面が大きい。

## パス構造

最適化は独立した**パス**の列として構成される。

```
mem2reg → インライン展開 → 定数伝播 → GVN → ループ最適化 → …
```

パスを足す・並べ替えることで最適化方針を変えられる。
`-O0` 〜 `-O3` はパスの選び方の違い。

## 影響

- GCC の独占を崩し、コンパイラ研究の共通基盤になった
- Clang の**質の高いエラーメッセージ**が業界の水準を引き上げた
- MLIR（多層 IR）に発展し、機械学習コンパイラの基盤にもなっている

## 参考文献

- Chris Lattner, Vikram Adve. LLVM: A Compilation Framework for Lifelong Program Analysis & Transformation. *CGO*, 2004. <https://doi.org/10.1109/CGO.2004.1281665>
- LLVM Language Reference Manual. <https://llvm.org/docs/LangRef.html>
- Chris Lattner et al. MLIR: Scaling Compiler Infrastructure for Domain Specific Computation. *CGO*, 2021. <https://doi.org/10.1109/CGO51591.2021.9370308>
