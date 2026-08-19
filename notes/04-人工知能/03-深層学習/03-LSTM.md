---
title: LSTM
status: 執筆済
tags: [AI, 深層学習]
---

# LSTM

**ゲート機構で情報の流れを制御する [[人工知能/深層学習/RNN|RNN]]。**
Long Short-Term Memory。Hochreiter と Schmidhuber が 1997 年に提案した。

## セル状態

通常の隠れ状態とは別に、**セル状態** $c_t$ を持つ。

$$c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t$$

$c_{t-1}$ が**加算的に**伝わる点が要点。
RNN のように行列を掛け続けないので、
勾配が指数的に減衰しない。

## 3 つのゲート

| ゲート | 記号 | 役割 |
| --- | --- | --- |
| 忘却 | $f_t$ | 過去の情報をどれだけ残すか |
| 入力 | $i_t$ | 新しい情報をどれだけ入れるか |
| 出力 | $o_t$ | セル状態をどれだけ出力するか |

各ゲートはシグモイドで $[0,1]$ の値を出し、
要素ごとの掛け算で流量を調節する。
**何を覚え、何を忘れるかをデータから学習する。**

## 何を解決したか

RNN の勾配消失を緩和し、
数百ステップの長距離依存が学習できるようになった。
機械翻訳、音声認識で 2010 年代前半の標準になった。

## 限界

- **逐次計算のまま**。並列化できない
- 数千トークンの依存は依然として難しい
- 情報を固定長のベクトルに押し込む必要がある

これらを[[人工知能/深層学習/Transformer|Transformer]] が
[[人工知能/大規模言語モデル/Attention|Attention]] によって解消した。

GRU は LSTM を簡略化（ゲート 2 つ）したもので、
性能が近く計算が軽い。

## 参考文献

- Sepp Hochreiter, Jürgen Schmidhuber. Long Short-Term Memory. *Neural Computation* 9(8), 1997. <https://doi.org/10.1162/neco.1997.9.8.1735>
- Ian Goodfellow, Yoshua Bengio, Aaron Courville. *Deep Learning*. MIT Press, 2016.（全文公開） <https://www.deeplearningbook.org/>
- Aston Zhang et al. *Dive into Deep Learning*. Cambridge University Press, 2023.（全文公開） <https://d2l.ai/>
