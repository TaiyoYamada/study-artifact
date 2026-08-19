---
title: URL
status: 執筆済
tags: [ソフトウェア開発, Web]
---

# URL

**資源の場所を一意に表す文字列。**

```
https://user@example.com:8443/path/to/page?q=swift&page=2#section
└─┬─┘  └───┬────┘└─┬─┘└──┬──────┘└─────┬─────┘└──┬──┘
scheme   host    port   path        query    fragment
```

## 各部分

| 部分 | 内容 |
| --- | --- |
| scheme | プロトコル。`https`、`mailto`、`file` |
| host | ドメイン名または IP |
| port | 省略時は scheme の既定値（http:80、https:443） |
| path | サーバ内の位置 |
| query | `?key=value&key2=value2` |
| **fragment** | `#` 以降。**サーバに送られない** |

fragment がサーバに送られないのは重要で、
クライアント側だけで使われる（ページ内の位置、SPA のルート）。

## URI・URL・URN

| 用語 | 意味 |
| --- | --- |
| URI | 識別子の総称 |
| **URL** | 場所で識別する URI |
| URN | 名前で識別する URI（`urn:isbn:...`） |

実務ではほぼ URL のことを指す。

## エンコーディング

ASCII 以外や予約文字は
パーセントエンコードする。

```
日本語 → %E6%97%A5%E6%9C%AC%E8%AA%9E   (UTF-8 の各バイト)
空白   → %20
```

**どの部分をエンコードするかで規則が違う。**
パスの `/` は区切りだが、
クエリの値に含まれる `/` はエンコードが要る。
手で組み立てず、専用の API を使うのが安全。

## 設計の指針

| 指針 | 理由 |
| --- | --- |
| **変えない** | リンクが切れる。Cool URIs don't change |
| 意味が読み取れる | 人が見て分かる |
| **秘密情報を入れない** | ログ、履歴、Referer に残る |
| 小文字、ハイフン区切り | 慣習 |

クエリ文字列に個人情報やトークンを入れるのは、
アクセスログとブラウザ履歴に平文で残るため危険。

## 参考文献

- Tim Berners-Lee, Roy Fielding, Larry Masinter. Uniform Resource Identifier (URI): Generic Syntax. RFC 3986, 2005. <https://doi.org/10.17487/RFC3986>
- WHATWG. URL Living Standard. <https://url.spec.whatwg.org/>
- Tim Berners-Lee. Cool URIs don't change. W3C, 1998. <https://www.w3.org/Provider/Style/URI>
