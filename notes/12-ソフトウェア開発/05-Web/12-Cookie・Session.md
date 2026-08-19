---
title: Cookie・Session
status: 執筆済
tags: [ソフトウェア開発, Web, セキュリティ]
---

# Cookie・Session

[[ソフトウェア開発/Web/Webの仕組み|ステートレスな HTTP]] の上で
「ログイン中」のような状態を保つ仕組み。

## Cookie

```
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax; Max-Age=3600
```

以降のリクエストにブラウザが自動で添える。

## 属性が重要

| 属性 | 効果 |
| --- | --- |
| **`HttpOnly`** | JavaScript から読めない。**XSS で盗まれない** |
| **`Secure`** | HTTPS でのみ送る |
| **`SameSite`** | 他サイトからの送信を制限。**CSRF 対策** |
| `Domain` / `Path` | 送信範囲 |
| `Max-Age` / `Expires` | 寿命 |

`SameSite` の値。

```
Strict  他サイトからの遷移では一切送らない
Lax     トップレベルの GET 遷移では送る（既定）
None    常に送る。Secure が必須
```

**認証 Cookie には HttpOnly + Secure + SameSite を必ず付ける。**

## セッション方式

| 方式 | 状態の保管場所 |
| --- | --- |
| **サーバセッション** | サーバ側（DB、Redis）。Cookie には ID だけ |
| **トークン (JWT)** | トークン自体に情報を持つ |

| | サーバセッション | JWT |
| --- | --- | --- |
| 失効 | **即座にできる** | 難しい（有効期限まで有効） |
| スケール | 共有ストアが要る | サーバに状態が要らない |
| 大きさ | 小さい | 大きい |
| 情報の秘匿 | できる | **署名のみ。中身は読める** |

**JWT は暗号化ではなく署名**。
Base64 を解けば誰でも中身を読める。
秘密情報を入れてはいけない。

即座に失効させたい要件（ログアウト、権限剥奪）があるなら、
サーバセッションか、短命なアクセストークン +
サーバ側で管理するリフレッシュトークンにする。

## 参考文献

- Adam Barth. HTTP State Management Mechanism. RFC 6265, 2011. <https://doi.org/10.17487/RFC6265>
- MDN Web Docs. Using HTTP cookies. <https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies>
- OWASP. Session Management Cheat Sheet. <https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html>
