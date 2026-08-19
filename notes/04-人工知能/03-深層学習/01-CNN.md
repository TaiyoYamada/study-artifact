---
title: CNN
status: 執筆済
tags: [AI, 深層学習, CNN]
---

# CNN

**畳み込みを使うニューラルネットワーク。** 主に画像を扱う。

$$(f * k)(i,j) = \sum_{m,n} f(i+m, j+n)\, k(m,n)$$

小さなフィルタ（カーネル）を画像全体に滑らせる。

## 2 つの帰納バイアス

| バイアス | 内容 |
| --- | --- |
| **局所性** | 近くの画素どうしが関係する |
| **平行移動不変性** | 同じ特徴はどこにあっても同じ |

この 2 つが画像の性質と合っているため、CNN は画像で強い。

## パラメータ共有

全結合層なら $224\times224$ 画像で
入力だけで 5 万次元、パラメータが膨大になる。

畳み込みは**同じフィルタを全位置で使い回す**ので、
$3\times3$ フィルタならパラメータは 9 個（× チャネル数）。

**パラメータ数が画像サイズに依存しない。**
これが CNN を実用的にした最大の要因。

## 階層的な特徴

層を重ねると受容野が広がり、特徴が抽象化される。

```
第1層: エッジ、色 → 第2層: テクスチャ、角 → 深層: 物体の部品 → 物体
```

人手で設計していた特徴量が、**学習で自動的に得られる**。

## 転機

AlexNet が 2012 年の ImageNet で圧勝し、深層学習ブームの起点になった。
GPU による学習、ReLU、Dropout の組み合わせが効いた。

ResNet（2015）は残差接続により
**100 層を超えるネットワークの学習**を可能にした。
勾配が恒等写像を通って直接流れるため、勾配消失が緩和される。

## 参考文献

- Yann LeCun et al. Gradient-based learning applied to document recognition. *Proceedings of the IEEE* 86(11), 1998. <https://doi.org/10.1109/5.726791>
- Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton. ImageNet Classification with Deep Convolutional Neural Networks. *NeurIPS*, 2012. <https://doi.org/10.1145/3065386>
- Kaiming He et al. Deep Residual Learning for Image Recognition. *CVPR*, 2016. <https://arxiv.org/abs/1512.03385>
