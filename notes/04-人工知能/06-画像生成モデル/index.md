---
title: 画像生成モデル
status: 執筆済
summary: 画像の分布を学習して標本を生成するモデル。高次元分布をどう扱いやすい形に分解するかで手法が分かれる。
tags: [AI, 生成モデル]
---

# 画像生成モデル

**画像の分布 $p(x)$ を学習し、そこから新しい標本を生成する**モデル。

## 系譜

| モデル | 原理 | 特徴 |
| --- | --- | --- |
| VAE | 潜在変数 + 変分推論 | 学習が安定。ぼやけやすい |
| GAN | 生成器と識別器の敵対 | 鮮明。学習が不安定 |
| 自己回帰 | 画素を 1 つずつ予測 | 尤度が明示的。遅い |
| **[[人工知能/画像生成モデル/拡散モデル\|拡散モデル]]** | ノイズ除去の反復 | 品質・多様性ともに優れる。遅い |
| フローマッチング | 連続時間の輸送 | 拡散より少ないステップ |

2020 年代前半に拡散モデルが主流になり、
近年はフローマッチングやその蒸留による高速化が進んでいる。

## 生成モデルの共通の難しさ

$p(x)$ は $256\times256\times3$ 次元の分布。
まともに扱える対象ではない。

各手法は「この高次元分布をどう扱いやすい形に分解するか」の
異なる答えになっている。

- VAE … 低次元の[[人工知能/画像生成モデル/潜在空間\|潜在空間]]に落とす
- GAN … 分布そのものを推定せず、標本の見分けがつかなければよいとする
- 拡散 … **簡単な問題（少しノイズを取る）の連鎖**に分解する

## 参考文献

- Diederik P. Kingma, Max Welling. Auto-Encoding Variational Bayes. *ICLR*, 2014. <https://arxiv.org/abs/1312.6114>
- Ian J. Goodfellow et al. Generative Adversarial Networks. *NeurIPS*, 2014. <https://arxiv.org/abs/1406.2661>
- Jonathan Ho, Ajay Jain, Pieter Abbeel. Denoising Diffusion Probabilistic Models. *NeurIPS*, 2020. <https://arxiv.org/abs/2006.11239>
