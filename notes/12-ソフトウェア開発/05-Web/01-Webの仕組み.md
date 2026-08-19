---
title: Webの仕組み
status: 執筆済
tags: [ソフトウェア開発, Web]
---

# Webの仕組み

URL を入力してから画面が出るまで。

```
1. [[ソフトウェア開発/ネットワーク/DNS|DNS]] で名前を IP アドレスに変換する
2. [[ソフトウェア開発/ネットワーク/TCP|TCP]] 接続を確立する（3-way handshake）
3. TLS ハンドシェイクで暗号化する（HTTPS）
4. HTTP リクエストを送る
5. サーバが応答を返す
6. [[ソフトウェア開発/Web/ブラウザ|ブラウザ]]が HTML を解析する
7. CSS・JS・画像を追加で取得する
8. レイアウトして描画する
```

## クライアント・サーバ

| | 役割 |
| --- | --- |
| クライアント | 要求する。ブラウザ、アプリ |
| サーバ | 応答する |

**サーバから勝手に送りつけることはできない**のが原則。
これを乗り越えるのが
[[ソフトウェア開発/Web/WebSocket|WebSocket]] や
Server-Sent Events。

## ステートレス

HTTP は**前の要求を覚えていない**。

| 利点 | 帰結 |
| --- | --- |
| サーバを増やしやすい | どのサーバが応答してもよい |
| 障害に強い | 途中で落ちても影響が限定的 |
| 単純 | 状態の同期が要らない |

その代わり「ログイン中」といった状態を保つには、
[[ソフトウェア開発/Web/Cookie・Session|Cookie]] などで
毎回の要求に情報を添える必要がある。

**スケールしやすさは、この設計判断から来ている。**

## 何が遅いか

| 要因 | おおよそ |
| --- | --- |
| DNS 解決 | 20〜120 ms |
| TCP 接続 | 1 往復 |
| TLS | 1〜2 往復 |
| 応答の生成 | サーバ次第 |
| 描画をブロックする資源 | CSS、同期 JS |

往復（RTT）の回数が効くので、
HTTP/2 の多重化、HTTP/3 の 0-RTT、
[[ソフトウェア開発/インフラ/CDN|CDN]] による距離短縮が
性能改善の主要な手段になる。

## 参考文献

- Roy T. Fielding, Mark Nottingham, Julian Reschke (eds.). HTTP Semantics. RFC 9110, 2022. <https://doi.org/10.17487/RFC9110>
- MDN Web Docs. What is a web server? <https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server>
- Ilya Grigorik. *High Performance Browser Networking*. O’Reilly, 2013.（全文公開） <https://hpbn.co/>
