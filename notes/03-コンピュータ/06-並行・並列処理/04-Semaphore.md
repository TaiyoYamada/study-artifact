---
title: Semaphore
status: 執筆済
tags: [コンピュータ, 並行処理]
---

# Semaphore

**カウンタを持つ同期プリミティブ。**
Dijkstra が 1965 年に提案した。

```
wait(s) / P(s) … s > 0 なら 1 減らして進む。0 なら待つ
signal(s) / V(s) … s を 1 増やす。待っている者がいれば起こす
```

## Mutex との違い

| | [[コンピュータ/並行・並列処理/Mutex\|Mutex]] | Semaphore |
| --- | --- | --- |
| 値 | 0 か 1 | 0 以上の整数 |
| 所有権 | **ロックした者だけが解除できる** | 誰でも signal できる |
| 用途 | 相互排他 | 資源数の管理、順序制御 |

所有権の有無が本質的な差。
Mutex は「鍵」、Semaphore は「入場券の枚数」。

## 用途

### 資源数の制限

```
sem = Semaphore(10)   // 同時接続を 10 に制限
wait(sem)
    ... 接続を使う ...
signal(sem)
```

コネクションプール、同時実行数の制限に使う。

### 順序の強制

```
スレッドA: 作業1; signal(s)
スレッドB: wait(s); 作業2   // 作業1 の後に必ず実行される
```

初期値 0 のセマフォは**シグナル**として働く。

### 生産者・消費者

```
empty = Semaphore(N)   // 空き枠
full  = Semaphore(0)   // 詰まっている数
mutex = Semaphore(1)   // バッファ保護
```

古典的な問題で、
3 つのセマフォの組み合わせで解ける。
**wait の順序を間違えると
[[コンピュータ/並行・並列処理/Deadlock|デッドロック]]する**（mutex を先に取ると詰まる）。

## 難しさ

セマフォは低水準で、正しく使うのが難しい。
現代のコードでは、
より高水準な抽象（チャネル、Actor、
条件変数付きのモニタ）が好まれる。

## 参考文献

- Edsger W. Dijkstra. Cooperating Sequential Processes. EWD123, 1965. <https://www.cs.utexas.edu/~EWD/transcriptions/EWD01xx/EWD123.html>
- Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau. *Operating Systems: Three Easy Pieces*. Arpaci-Dusseau Books, 2018.（全文公開） <https://pages.cs.wisc.edu/~remzi/OSTEP/>
- Maurice Herlihy, Nir Shavit. *The Art of Multiprocessor Programming*, 2nd ed. Morgan Kaufmann, 2020.
