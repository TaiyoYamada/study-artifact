---
title: Surface Code
status: 執筆済
tags: [量子誤り訂正]
---

# Surface Code

**2 次元格子上の最近接相互作用だけで実装できる**誤り訂正符号。
現在最も有力視されている。

## 構造

データ量子ビットを格子状に並べ、
その間に測定用の補助量子ビットを置く。

- **$X$ スタビライザ** … 周囲 4 個のデータビットの $X$ パリティ
- **$Z$ スタビライザ** … 周囲 4 個の $Z$ パリティ

各スタビライザは**隣接する 4 量子ビットにしか作用しない**。
これが実装上の決定的な利点で、
超伝導回路のような最近接接続のハードウェアにそのまま載る。

## 誤り訂正の流れ

1. スタビライザを繰り返し測定する
2. 測定値が変化した箇所（シンドローム）を記録する
3. **デコーダ**が誤りの位置を推定する（最小重み完全マッチングなど）
4. 訂正を適用する（実際にはソフトウェア上で追跡する）

デコードは古典計算で、**リアルタイムに間に合う必要がある**。
これ自体が工学的な課題になっている。

## しきい値

物理誤り率が**約 1%** を下回れば、
符号距離 $d$ を上げるほど論理誤り率が指数的に下がる。

$$p_L \sim \left(\frac{p}{p_{\text{th}}}\right)^{\lfloor (d+1)/2 \rfloor}$$

この 1% という比較的緩いしきい値が、
surface code が有力とされる最大の理由。
他の符号はより厳しいしきい値を要求する。

## 代償

- 1 論理量子ビットに $\mathcal{O}(d^2)$ の物理量子ビット。
  $d = 25$ なら 1000 個超
- **横断的に実装できるゲートが限られる**。
  $T$ ゲートには魔法状態蒸留が必要で、これが資源の大半を占める

## 実験の進展

Google は 2023 年に距離 5 の符号が距離 3 より
論理誤り率が低いことを示し、
2024 年には距離 7 まで拡張して
**符号距離を上げるほど改善する**領域に入ったと報告した。

## 参考文献

- Austin G. Fowler et al. Surface codes: Towards practical large-scale quantum computation. *Physical Review A* 86(3), 2012. <https://doi.org/10.1103/PhysRevA.86.032324>
- Rajeev Acharya et al. (Google Quantum AI). Suppressing quantum errors by scaling a surface code logical qubit. *Nature* 614, 2023. <https://doi.org/10.1038/s41586-022-05434-1>
- Rajeev Acharya et al. (Google Quantum AI). Quantum error correction below the surface code threshold. *Nature* 638, 2025. <https://doi.org/10.1038/s41586-024-08449-y>
