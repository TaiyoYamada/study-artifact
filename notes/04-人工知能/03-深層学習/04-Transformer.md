---
title: Transformer
status: 執筆済
tags: [AI, 深層学習, Transformer]
---

# Transformer

**[[人工知能/大規模言語モデル/Attention|Attention]] だけで系列を処理する**アーキテクチャ。
Vaswani らが 2017 年に提案し、現在の [[人工知能/大規模言語モデル|LLM]] の基盤になっている。

## 何を捨てたか

論文の題名どおり、**再帰も畳み込みも使わない**。

| 捨てたもの | 得たもの |
| --- | --- |
| 再帰（[[人工知能/深層学習/RNN\|RNN]]） | **並列計算**。系列全体を同時に処理できる |
| 畳み込み | 任意の位置間の直接的な結合 |

RNN が $\mathcal{O}(T)$ の逐次ステップを要したのに対し、
Transformer は $\mathcal{O}(1)$ ステップで全位置を関係づける。
**GPU で完全に並列化できる**ことが、
大規模化を可能にした決定的な要因。

## 構成

```
入力 → [埋め込み + 位置情報]
     → [Self-Attention → 残差 + 層正規化]
     → [フィードフォワード → 残差 + 層正規化]  × N層
     → 出力
```

- [[人工知能/大規模言語モデル/Self-Attention|Self-Attention]] … トークン間の関係を計算
- フィードフォワード … 各位置で独立に非線形変換
- 残差接続 … 勾配を通す（ResNet と同じ発想）
- [[人工知能/大規模言語モデル/位置情報|位置エンコーディング]] … 順序の情報を注入

## 計算量の代償

Self-Attention は全トークン対を計算するので

$$\mathcal{O}(T^2 d)$$

**系列長の 2 乗**。これが長文脈の壁になっており、
FlashAttention（メモリ効率化）、疎な Attention、
状態空間モデル（Mamba など）といった改良が続いている。

## 応用の広がり

言語だけでなく、画像（ViT）、音声、タンパク質構造（AlphaFold）など
系列・集合として表せるものに広く適用されている。
**帰納バイアスが弱い代わりに汎用性が高い**という性格。

## 参考文献

- Ashish Vaswani et al. Attention Is All You Need. *NeurIPS*, 2017. <https://arxiv.org/abs/1706.03762>
- Dan Jurafsky, James H. Martin. *Speech and Language Processing*, 3rd ed. draft.（全文公開） <https://web.stanford.edu/~jurafsky/slp3/>
- Alexey Dosovitskiy et al. An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale. *ICLR*, 2021. <https://arxiv.org/abs/2010.11929>
