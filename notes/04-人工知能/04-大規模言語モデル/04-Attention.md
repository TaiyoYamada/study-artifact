---
title: Attention
status: 執筆済
tags: [AI, LLM, Transformer]
---

# Attention

**入力のどこに注目するかを、重みとして計算する**仕組み。

$$\mathrm{Attention}(Q,K,V) = \mathrm{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$$

## 3 つの役割

| 記号 | 名前 | 役割 |
| --- | --- | --- |
| $Q$ | Query | 「何を探しているか」 |
| $K$ | Key | 「自分は何であるか」 |
| $V$ | Value | 「実際に渡す情報」 |

辞書検索の比喩。$Q$ と $K$ の[[数学/線形代数/内積|内積]]で
一致度を測り、softmax で重みにして $V$ を加重平均する。

**「どこを見るか」を微分可能な形で表現している**のが核心。

## $\sqrt{d_k}$ で割る理由

$Q$ と $K$ の成分が独立で分散 1 なら、
内積の[[数学/確率/分散|分散]]は $d_k$ になる。

$d_k$ が大きいと内積の値が大きくなり、
softmax が極端に偏る（ほぼ one-hot になる）。
すると**勾配が消える**。

$\sqrt{d_k}$ で割ることで分散を 1 に戻し、
softmax が適度な分布を保つ。
細かいが実用上重要な工夫。

## 起源

Bahdanau らが 2014 年に機械翻訳の RNN に導入した。
それまで固定長ベクトルに押し込んでいた入力文の情報を、
**必要なときに必要な部分を参照できる**ようにした。

Transformer はこれを RNN から切り離し、
**Attention だけで系列処理を行う**ようにしたもの。

## 参考文献

- Dzmitry Bahdanau, Kyunghyun Cho, Yoshua Bengio. Neural Machine Translation by Jointly Learning to Align and Translate. *ICLR*, 2015. <https://arxiv.org/abs/1409.0473>
- Ashish Vaswani et al. Attention Is All You Need. *NeurIPS*, 2017. <https://arxiv.org/abs/1706.03762>
- Dan Jurafsky, James H. Martin. *Speech and Language Processing*, 3rd ed. draft.（全文公開） <https://web.stanford.edu/~jurafsky/slp3/>
