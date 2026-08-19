---
title: Race Condition
status: 執筆済
tags: [コンピュータ, 並行処理]
---

# Race Condition

**複数のスレッドが同じデータに同時にアクセスし、
実行のタイミングによって結果が変わる**状態。競合状態。

## 典型例

```
counter = counter + 1
```

1 行に見えるが、機械語では 3 段階。

```
load  counter → レジスタ
add   1
store レジスタ → counter
```

2 スレッドが同時に実行すると、
両方が同じ値を読み、両方が同じ値を書く。
**2 回足したのに 1 しか増えない。**

## なぜ厄介なのか

| 性質 | 影響 |
| --- | --- |
| 非決定的 | 再現しない |
| タイミング依存 | デバッガを付けると消える |
| 環境依存 | 本番の負荷でだけ起きる |
| **静かに壊れる** | エラーにならず、値だけおかしい |

「テストは通るが本番で稀に壊れる」典型的な原因。

## 対処

| 手段 | 内容 |
| --- | --- |
| [[コンピュータ/並行・並列処理/Mutex\|Mutex]] | 臨界区間を保護する |
| アトミック演算 | ハードウェアの不可分命令を使う |
| **不変性** | 変更しなければ競合しない |
| **共有しない** | メッセージパッシング、スレッドローカル |

**最も確実なのは、可変な状態を共有しないこと。**
Go の「メモリを共有して通信するのではなく、
通信してメモリを共有せよ」という指針、
Rust の所有権システムはいずれもこの方針。

## メモリモデルの問題

ロックが無いとき、
**コンパイラと CPU が命令を並べ替える**。

```
data = 42;        ┐ 順序が入れ替わりうる
ready = true;     ┘
```

他スレッドから見ると `ready` が先に真になり、
まだ書かれていない `data` を読んでしまう。

メモリバリアやアトミック変数の
メモリ順序指定（acquire / release）が必要になる。
**「見た目の順序で実行される」という直感は成り立たない。**

## 検出

- ThreadSanitizer（実行時検出）
- Rust の借用検査（コンパイル時に防ぐ）
- Go の `-race` フラグ

## 参考文献

- Maurice Herlihy, Nir Shavit. *The Art of Multiprocessor Programming*, 2nd ed. Morgan Kaufmann, 2020.
- Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau. *Operating Systems: Three Easy Pieces*. Arpaci-Dusseau Books, 2018.（全文公開） <https://pages.cs.wisc.edu/~remzi/OSTEP/>
- Sarita V. Adve, Hans-J. Boehm. Memory Models: A Case for Rethinking Parallel Languages and Hardware. *Communications of the ACM* 53(8), 2010. <https://doi.org/10.1145/1787234.1787255>
