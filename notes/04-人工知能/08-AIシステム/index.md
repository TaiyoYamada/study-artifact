---
title: AIシステム
status: 執筆済
summary: モデル単体ではなくモデルを組み込んだシステムの設計。確率的な出力をシステム側で吸収する。
tags: [AI, システム]
---

# AIシステム

モデル単体ではなく、**モデルを組み込んだシステム**の設計。

## モデルだけでは足りない理由

| [[人工知能/大規模言語モデル\|LLM]] の限界 | 補う仕組み |
| --- | --- |
| 学習時点の知識しか持たない | [[人工知能/AIシステム/RAG\|RAG]] |
| 計算・検索・実行ができない | [[人工知能/AIシステム/ツール呼び出し\|ツール呼び出し]] |
| 多段の作業を自律的に進められない | [[人工知能/AIシステム/AIエージェント\|エージェント]] |
| ツール接続が実装ごとにばらばら | [[人工知能/AIシステム/MCP\|MCP]] |

## 設計の勘所

**モデルの確率的な性質を、システム側で吸収する。**

- 出力を検証する（スキーマ検証、テスト実行、リンク検査）
- 失敗を前提にリトライ・フォールバックを組む
- 副作用のある操作は人間の確認を挟む

このノート群自体が例で、
出典リンクを機械的に検証する仕組みを置くことで、
**生成された内容の一部を検証可能にしている**。

## 参考文献

- Patrick Lewis et al. Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. *NeurIPS*, 2020. <https://arxiv.org/abs/2005.11401>
- Anthropic. Building Effective Agents. 2024. <https://www.anthropic.com/engineering/building-effective-agents>
