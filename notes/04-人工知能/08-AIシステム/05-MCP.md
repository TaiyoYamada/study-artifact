---
title: MCP
status: 執筆済
tags: [AI, システム, MCP]
---

# MCP

**Model Context Protocol.** LLM アプリケーションと
外部データ・ツールをつなぐ標準プロトコル。
Anthropic が 2024 年 11 月に公開した。

## 解決する問題

$M$ 個のアプリと $N$ 個のデータソースをつなぐのに、
個別に実装すると $M \times N$ 通りの統合が要る。

標準プロトコルがあれば $M + N$ で済む。

**USB-C のような役割**、という説明がよくされる。

## 構成

| 役割 | 内容 |
| --- | --- |
| **ホスト** | LLM を持つアプリケーション |
| **クライアント** | ホスト内でサーバと 1 対 1 に接続する |
| **サーバ** | データやツールを提供する側 |

サーバが提供するもの。

- **Tools** — LLM が呼べる関数（[[人工知能/AIシステム/ツール呼び出し|ツール呼び出し]]）
- **Resources** — 読み取れるデータ
- **Prompts** — 再利用可能なテンプレート

## 技術的な基盤

JSON-RPC 2.0 上に構築されている。
トランスポートは標準入出力（ローカル）または
HTTP（リモート）。

既存の枯れた規格の上に載せることで、
実装の負担を下げている。

## 位置づけ

プロトコルの標準化は、
**エコシステムを作るための投資**という側面が強い。
仕様が公開され、複数のベンダーが採用することで
初めて $M+N$ の利点が現れる。

## 参考文献

- Anthropic. Introducing the Model Context Protocol. 2024. <https://www.anthropic.com/news/model-context-protocol>
- Model Context Protocol 仕様 <https://modelcontextprotocol.io/>
- JSON-RPC 2.0 Specification <https://www.jsonrpc.org/specification>
