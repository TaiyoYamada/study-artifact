---
title: CORS
status: 執筆済
tags: [ソフトウェア開発, Web, セキュリティ]
---

# CORS

**同一オリジンポリシーを、サーバの許可のもとで緩める仕組み。**
Cross-Origin Resource Sharing。

## 同一オリジンポリシー

オリジン = **スキーム + ホスト + ポート**。

```
https://example.com/a  と  https://example.com/b     … 同一
https://example.com    と  http://example.com        … 別（スキーム）
https://example.com    と  https://api.example.com   … 別（ホスト）
```

別オリジンの応答を JavaScript から**読めない**。

これが無いと、
悪意あるサイトが利用者の Cookie を使って
銀行サイトの情報を読めてしまう。
**Web のセキュリティの土台。**

## CORS の流れ

```
ブラウザ: Origin: https://app.example.com
サーバ:   Access-Control-Allow-Origin: https://app.example.com
          → ブラウザが読み取りを許可する
```

## プリフライト

単純でない要求（PUT、DELETE、カスタムヘッダなど）では、
本番の要求の前に `OPTIONS` で確認する。

```
OPTIONS /api/items
Access-Control-Request-Method: DELETE
Access-Control-Request-Headers: authorization

Access-Control-Allow-Methods: GET, POST, DELETE
Access-Control-Allow-Headers: authorization
Access-Control-Max-Age: 86400
```

**副作用のある要求を、許可の確認前に送らない**ための仕組み。
`Max-Age` でキャッシュすれば往復を減らせる。

## 誤解されやすい点

| 誤解 | 実際 |
| --- | --- |
| CORS がサーバを守る | **守らない。**ブラウザ内の制限にすぎない |
| CORS エラー = サーバが拒否 | 多くの場合、リクエスト自体は届いている |
| クライアント側で直せる | **サーバ側の設定でしか解決しない** |

curl やサーバ間通信には CORS が働かない。
**攻撃者はブラウザを使わない**ので、
CORS を認可の代わりにしてはいけない。

## 設定の注意

```
Access-Control-Allow-Origin: *          ← 認証情報付きでは使えない
Access-Control-Allow-Credentials: true  ← このとき Origin は具体的に指定する
```

`*` と資格情報の併用は仕様上禁止されている。
**Origin をリクエストの値でそのまま返す実装は危険**で、
任意のサイトからのアクセスを許すことになる。

## 参考文献

- WHATWG. Fetch Living Standard (CORS protocol). <https://fetch.spec.whatwg.org/#http-cors-protocol>
- MDN Web Docs. Cross-Origin Resource Sharing (CORS). <https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS>
- MDN Web Docs. Same-origin policy. <https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy>
