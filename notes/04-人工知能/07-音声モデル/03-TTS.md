---
title: TTS
status: 執筆済
tags: [AI, 音声]
---

# TTS

Text-To-Speech。テキスト読み上げシステム全体。
[[人工知能/音声モデル/音声合成|音声合成]]のモデルに加え、
前処理と制御を含む。

## 前段のテキスト処理

音響モデルに入れる前に、テキストを整える必要がある。

| 処理 | 例 |
| --- | --- |
| 正規化 | 「2024年」→「にせんにじゅうよねん」 |
| 読み推定 | 「行った」→ いった / おこなった |
| アクセント推定 | 日本語の高低アクセント |
| 分かち書き | 形態素解析 |

**日本語はここが特に難しい。**
漢字の読みが文脈依存で、アクセントも語の結合で変化する。
英語の TTS より前処理の比重が大きい。

## 話者性の制御

| 方式 | 内容 |
| --- | --- |
| 単一話者 | 1 人の声だけ。高品質 |
| 多話者 | 話者埋め込みで切り替える |
| **ゼロショット** | 数秒の参照音声から未知の話者を再現 |

VALL-E は音声を離散トークンとして扱い、
[[人工知能/大規模言語モデル|言語モデル]]の枠組みで
3 秒の参照音声から話者を再現できることを示した。

## 評価

主観評価が基本。**MOS**（Mean Opinion Score、5 段階）が標準指標。
自然さは客観指標で測りにくく、
人間の聴取実験が依然として必要とされる。

## 倫理的な問題

数秒の音声で声を複製できるようになったことで、
**なりすまし**の危険が現実になった。

- 電話での本人確認の無効化
- 政治家などの偽の発言音声

音声の透かし、検出モデル、
学習データの同意取得といった対策が議論されている。
技術の進歩が先行し、制度が追いついていない領域。

## 参考文献

- Chengyi Wang et al. Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers (VALL-E). 2023. <https://arxiv.org/abs/2301.02111>
- Yi Ren et al. FastSpeech 2: Fast and High-Quality End-to-End Text to Speech. *ICLR*, 2021. <https://arxiv.org/abs/2006.04558>
- ITU-T Recommendation P.800. Methods for subjective determination of transmission quality. <https://www.itu.int/rec/T-REC-P.800-199608-I/en>
