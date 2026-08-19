---
title: 大規模言語モデル
status: 執筆済
summary: 大量のテキストで学習した次トークン予測モデル。条件付き確率の連鎖を Transformer でモデル化したもの。
tags: [AI, LLM]
---

# 大規模言語モデル

**大量のテキストで学習した、次のトークンを予測するモデル。** LLM。

$$p(w_1, \dots, w_T) = \prod_t p(w_t \mid w_{<t})$$

やっていることは[[数学/確率/条件付き確率|条件付き確率の連鎖]]で
文章の確率を分解し、各項を[[人工知能/深層学習/Transformer|Transformer]] で
モデル化することだけ。

## 構成要素

| 段階 | 内容 |
| --- | --- |
| [[人工知能/大規模言語モデル/トークナイザ\|トークン化]] | テキストを[[人工知能/大規模言語モデル/トークン\|トークン]]の列にする |
| [[人工知能/大規模言語モデル/埋め込み\|埋め込み]] | トークンをベクトルにする |
| [[人工知能/大規模言語モデル/Self-Attention\|Self-Attention]] | トークン間の関係を計算 |
| [[人工知能/大規模言語モデル/事前学習\|事前学習]] | 次トークン予測で大量に学習 |
| [[人工知能/大規模言語モデル/ファインチューニング\|ファインチューニング]] | 用途に合わせて調整 |
| [[人工知能/大規模言語モデル/推論\|推論]]・[[人工知能/大規模言語モデル/サンプリング\|サンプリング]] | 生成 |

## スケーリング則

モデルサイズ、データ量、計算量に対して
損失が**べき則で改善する**ことが経験的に見出されている。

$$L \propto N^{-\alpha}$$

これが大規模化を正当化した。
Chinchilla の研究は、当時のモデルが
**データに対してパラメータが多すぎた**（データ不足だった）と示し、
配分の指針を修正した。

## 参考文献

- Dan Jurafsky, James H. Martin. *Speech and Language Processing*, 3rd ed. draft.（全文公開） <https://web.stanford.edu/~jurafsky/slp3/>
- Jared Kaplan et al. Scaling Laws for Neural Language Models. 2020. <https://arxiv.org/abs/2001.08361>
- Jordan Hoffmann et al. Training Compute-Optimal Large Language Models. 2022. <https://arxiv.org/abs/2203.15556>
