---
title: Self-Attention
status: 執筆済
tags: [AI, LLM, Transformer]
---

# Self-Attention

**同じ系列の中で [[人工知能/大規模言語モデル/Attention|Attention]] を取る。**
$Q$、$K$、$V$ がすべて同じ入力から作られる。

$$Q = XW_Q, \quad K = XW_K, \quad V = XW_V$$

## 何ができるのか

各トークンが**系列内の他のすべてのトークンを参照**できる。

「それ」が何を指すか、動詞の主語がどれか、といった
**長距離の依存関係**を、距離に関わらず 1 ステップで捉えられる。

[[人工知能/深層学習/RNN|RNN]] では距離に比例したステップ数が要り、
その間に情報が減衰していた。

## Multi-Head

1 種類の Attention では 1 つの関係しか捉えられない。
複数の「ヘッド」を並列に走らせ、結果を連結する。

$$\mathrm{MultiHead} = \mathrm{Concat}(\mathrm{head}_1, \dots, \mathrm{head}_h)W_O$$

ヘッドごとに異なる関係（構文的、意味的、位置的）を
学習していることが観察されている。

## 因果マスク

生成モデルでは、**未来のトークンを見てはいけない**。

$$\mathrm{mask}_{ij} = \begin{cases} 0 & j \le i \\ -\infty & j > i\end{cases}$$

softmax の前に $-\infty$ を足すことで、
未来への重みを 0 にする。
これにより訓練時に全位置を並列に計算しながら、
各位置が過去だけを見る状況を再現できる。

## 計算量

$$\mathcal{O}(T^2 d)$$

全トークン対を計算するため、**系列長の 2 乗**。
これが長文脈の主要な制約になっており、
FlashAttention（IO を減らす）、
疎な Attention、線形 Attention などの改良が続いている。

## 参考文献

- Ashish Vaswani et al. Attention Is All You Need. *NeurIPS*, 2017. <https://arxiv.org/abs/1706.03762>
- Tri Dao et al. FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness. *NeurIPS*, 2022. <https://arxiv.org/abs/2205.14135>
- Dan Jurafsky, James H. Martin. *Speech and Language Processing*, 3rd ed. draft.（全文公開） <https://web.stanford.edu/~jurafsky/slp3/>
