---
title: NumPy
status: 執筆済
tags: [科学計算]
---

# NumPy

Python の数値計算の基盤。多次元配列 `ndarray` を中心とする。

## ndarray

```python
a = np.zeros((1000, 1000), dtype=np.float64)
```

| 性質 | 内容 |
| --- | --- |
| **同一の型** | 全要素が同じ dtype |
| **連続したメモリ** | 一続きの領域に並ぶ |
| 形 (shape) | 多次元の構造 |
| ストライド | 各軸を 1 進むときのバイト数 |

Python のリストは
「ポインタの配列 → 各所に散らばったオブジェクト」なので、
**キャッシュに乗らず、型の判定も毎回要る**。
ndarray は連続した数値の並びなので、
[[コンピュータ/コンピュータアーキテクチャ/キャッシュ|キャッシュ]]も
[[コンピュータ/並行・並列処理/SIMD|SIMD]] も効く。

## ビューとコピー

```python
b = a[10:20]        # ビュー — 同じメモリを指す
c = a[[1, 5, 9]]    # ファンシー索引 — コピー
d = a.reshape(...)  # 可能ならビュー
```

**ビューへの書き込みは元にも反映される。**
意図しない書き換えの原因になるので、
独立させたいときは `.copy()` を明示する。

同時に、ビューで済むなら**巨大なコピーを避けられる**。

## ブロードキャスト

形の違う配列を、規則に従って自動的に揃える。

```python
a = np.ones((3, 4))
b = np.array([1, 2, 3, 4])
a + b               # b が各行に足される
```

規則は**末尾の軸から比較し、
一致するか片方が 1 なら拡張**。

$$(3,4) + (4,) ;\to; (3,4)$$

実際にメモリを複製せず、ストライドを 0 にして実現するので安価。

## エコシステム

| ライブラリ | 用途 |
| --- | --- |
| SciPy | 最適化、積分、統計、疎行列 |
| pandas | 表形式データ |
| Matplotlib | 可視化 |
| scikit-learn | 機械学習 |
| JAX、CuPy | GPU、自動微分 |

**同じ配列インタフェースを共有する**ことで、
道具が組み合わせられる。

## 参考文献

- Charles R. Harris et al. Array programming with NumPy. *Nature* 585, 2020. <https://doi.org/10.1038/s41586-020-2649-2>
- NumPy documentation. <https://numpy.org/doc/stable/>
- Pauli Virtanen et al. SciPy 1.0: fundamental algorithms for scientific computing in Python. *Nature Methods* 17, 2020. <https://doi.org/10.1038/s41592-019-0686-2>
