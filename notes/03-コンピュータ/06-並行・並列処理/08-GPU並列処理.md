---
title: GPU並列処理
status: 執筆済
tags: [コンピュータ, 並行処理, GPU]
---

# GPU並列処理

[[コンピュータ/コンピュータアーキテクチャ/GPU|GPU]] の上で
どう並列プログラムを書くか。

## 実行モデル

```
グリッド
 └ ブロック（数百スレッド。共有メモリを持つ）
     └ ワープ（32 スレッド。同じ命令を実行する）
         └ スレッド
```

同じカーネル関数を、何万ものスレッドが
**それぞれ異なるデータに対して**実行する。

```
__global__ void add(float* a, float* b, float* c) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    c[i] = a[i] + b[i];
}
```

スレッド ID から自分の担当を計算するのが基本形。

## 性能を決める要因

| 要因 | 内容 |
| --- | --- |
| **コアレスアクセス** | 連続したスレッドが連続したアドレスを読むと 1 回で済む |
| ダイバージェンス | ワープ内で分岐が分かれると両方実行される |
| **オキュパンシー** | 同時に載るスレッド数。レイテンシ隠蔽に必要 |
| 共有メモリ | ブロック内で共有。手動のキャッシュ |
| **転送** | CPU-GPU 間の PCIe が細い |

## 転送がボトルネックになる

```
GPU 内のメモリ帯域   … 1〜3 TB/s
PCIe 5.0 x16        … 約 64 GB/s
```

**1〜2 桁の差**がある。
「転送して 1 回計算して戻す」では
転送時間が支配的になり、GPU の意味がない。

データを GPU 上に置いたまま、
複数の計算を連続して行う設計が必要。
深層学習のフレームワークが
モデルとデータを GPU に常駐させるのはこのため。

## 向く問題・向かない問題

| 向く | 向かない |
| --- | --- |
| 行列積、畳み込み | 逐次的な依存がある処理 |
| 要素ごとの演算 | 分岐が多い処理 |
| モンテカルロ | 少量データの処理 |
| [[科学計算/シミュレーション\|格子上のシミュレーション]] | ポインタを辿る処理 |

**十分な並列度と規則的なメモリアクセス**が前提。
どちらか欠けると CPU に負ける。

## 参考文献

- NVIDIA. CUDA C++ Programming Guide. <https://docs.nvidia.com/cuda/cuda-c-programming-guide/>
- David B. Kirk, Wen-mei W. Hwu. *Programming Massively Parallel Processors*, 4th ed. Morgan Kaufmann, 2022.
- John L. Hennessy, David A. Patterson. *Computer Architecture: A Quantitative Approach*, 6th ed. Morgan Kaufmann, 2017.
