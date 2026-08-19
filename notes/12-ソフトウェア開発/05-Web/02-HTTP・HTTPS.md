---
title: HTTP・HTTPS
status: 執筆済
tags: [ソフトウェア開発, Web]
---

# HTTP・HTTPS

**資源をやり取りするためのプロトコル。**

```
GET /notes/index.html HTTP/1.1
Host: example.com
Accept: text/html

HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 1234

<!doctype html>...
```

## メソッド

| メソッド | 意味 | 安全 | 冪等 |
| --- | --- | --- | --- |
| GET | 取得 | ○ | ○ |
| HEAD | ヘッダのみ取得 | ○ | ○ |
| POST | 送信・作成 | × | **×** |
| PUT | 置換 | × | ○ |
| PATCH | 部分更新 | × | × |
| DELETE | 削除 | × | ○ |

**安全** = 副作用が無い。**冪等** = 何回やっても結果が同じ。

この 2 つの性質が、
再試行してよいか、キャッシュしてよいかを決める。
GET に副作用を持たせてはいけないのは、
ブラウザやプロキシが勝手に先読みするため。

## ステータスコード

| 範囲 | 意味 |
| --- | --- |
| 2xx | 成功 |
| 3xx | リダイレクト |
| **4xx** | クライアント側の誤り。**再試行しても直らない** |
| **5xx** | サーバ側の誤り。再試行の価値がある |

## バージョン

| 版 | 変更点 |
| --- | --- |
| HTTP/1.1 | 持続的接続、パイプライン（実際は使われず） |
| **HTTP/2** | 多重化、ヘッダ圧縮、サーバプッシュ |
| **HTTP/3** | **QUIC (UDP) の上で動く** |

HTTP/2 は 1 本の TCP 接続に複数の要求を流すが、
TCP のパケット損失が全ストリームを止める
（**head-of-line blocking**）。

HTTP/3 は UDP ベースの QUIC を使うことで
ストリームを独立させ、この問題を解消した。

## HTTPS

HTTP を TLS で包んだもの。

| 保証 | 内容 |
| --- | --- |
| 機密性 | 盗聴されない |
| 完全性 | 改竄されない |
| **認証** | 相手が本物であることを証明書で確認 |

暗号化だけでなく**認証が重要**で、
これが無いと暗号化した相手が偽物かもしれない。

現在は HTTPS が事実上必須。
多くのブラウザ API（位置情報、Service Worker、カメラ）が
セキュアなコンテキストでしか動作しない。

## 参考文献

- Roy T. Fielding, Mark Nottingham, Julian Reschke (eds.). HTTP Semantics. RFC 9110, 2022. <https://doi.org/10.17487/RFC9110>
- Mike Bishop (ed.). HTTP/3. RFC 9114, 2022. <https://doi.org/10.17487/RFC9114>
- Eric Rescorla. The Transport Layer Security (TLS) Protocol Version 1.3. RFC 8446, 2018. <https://doi.org/10.17487/RFC8446>
