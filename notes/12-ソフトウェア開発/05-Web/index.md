---
title: Web
status: 執筆済
summary: URL・HTTP・HTML の3つで成立する分散情報空間。単純さと寛容さが普及を支えた。
tags: [ソフトウェア開発, Web]
---

# Web

**リンクでつながった文書の集まり**として始まり、
今はアプリケーションの実行環境になっている。

## 3 つの発明

Tim Berners-Lee が 1989〜1991 年に作ったもの。

| 要素 | 役割 |
| --- | --- |
| [[ソフトウェア開発/Web/URL\|URL]] | 資源の場所を表す |
| [[ソフトウェア開発/Web/HTTP・HTTPS\|HTTP]] | 資源を取得する手順 |
| [[ソフトウェア開発/Web/HTML\|HTML]] | 資源の中身の形式 |

この 3 つの組み合わせだけで、
**中央の管理者なしに世界規模の情報空間**が成立した。

## 設計の特徴

- **単純さ** — 誰でも実装できる
- **寛容さ** — 壊れた HTML でも表示する
- **後方互換** — 30 年前のページが今も表示できる
- **分散** — 誰の許可も要らない

「寛容さ」が普及を助けた一方、
仕様の曖昧さと互換性の問題も生んだ。

## 構成

- [[ソフトウェア開発/Web/Webの仕組み|Web の仕組み]]・[[ソフトウェア開発/Web/ブラウザ|ブラウザ]]
- [[ソフトウェア開発/Web/HTML|HTML]]・[[ソフトウェア開発/Web/CSS|CSS]]・[[ソフトウェア開発/Web/JavaScript|JavaScript]]
- [[ソフトウェア開発/Web/フロントエンド|フロントエンド]]・[[ソフトウェア開発/Web/バックエンド|バックエンド]]
- [[ソフトウェア開発/Web/REST API|REST API]]・[[ソフトウェア開発/Web/WebSocket|WebSocket]]
- [[ソフトウェア開発/Web/Cookie・Session|Cookie・Session]]・[[ソフトウェア開発/Web/CORS|CORS]]

## 参考文献

- Tim Berners-Lee. Information Management: A Proposal. CERN, 1989. <https://www.w3.org/History/1989/proposal.html>
- Roy T. Fielding, Mark Nottingham, Julian Reschke (eds.). HTTP Semantics. RFC 9110, 2022. <https://doi.org/10.17487/RFC9110>
- WHATWG. HTML Living Standard. <https://html.spec.whatwg.org/multipage/>
