---
title: REST API
status: 執筆済
tags: [ソフトウェア開発, Web, API]
---

# REST API

**資源を URL で表し、HTTP メソッドで操作する**設計様式。
Fielding が 2000 年の博士論文で提示した
アーキテクチャスタイル。

```
GET    /users        一覧
POST   /users        作成
GET    /users/42     取得
PUT    /users/42     置換
PATCH  /users/42     部分更新
DELETE /users/42     削除
```

## 制約

REST は「こう書く」規則ではなく、
**満たすべき制約の集合**として定義されている。

| 制約 | 内容 |
| --- | --- |
| クライアント・サーバ | 関心の分離 |
| **ステートレス** | 要求に必要な情報がすべて含まれる |
| キャッシュ可能 | 応答がキャッシュ可否を示す |
| 統一インタフェース | 資源、表現、自己記述的メッセージ |
| 階層化 | プロキシや [[ソフトウェア開発/インフラ/CDN\|CDN]] を挟める |

これらを満たすと**スケールしやすくなる**というのが主張。

## 設計の指針

| 指針 | 例 |
| --- | --- |
| 名詞を使う | `/users`（`/getUsers` ではない） |
| 複数形 | `/users/42` |
| 階層で関係を表す | `/users/42/posts` |
| フィルタはクエリで | `/users?role=admin&page=2` |
| 動詞はメソッドで表す | `DELETE /users/42` |

## ステータスコードを正しく使う

```
200 OK      / 201 Created / 204 No Content
400 Bad Request      入力が不正
401 Unauthorized     認証されていない
403 Forbidden        認証済みだが権限が無い
404 Not Found
409 Conflict         競合
422 Unprocessable    意味的に処理できない
429 Too Many Requests
```

**すべて 200 で返して本文にエラーを書く**設計は、
HTTP の仕組み（キャッシュ、再試行、監視）を使えなくする。

## 他の方式との比較

| 方式 | 特徴 |
| --- | --- |
| REST | 単純、キャッシュしやすい、**過不足のあるデータ取得** |
| GraphQL | 必要な項目だけ取得できる。キャッシュが難しい |
| gRPC | バイナリ、型付き、高速。ブラウザからは制約あり |

REST の弱点は over-fetching / under-fetching で、
1 画面に必要なデータが複数のエンドポイントに散る。
GraphQL はここを解決するが、
キャッシュとレート制限が難しくなる。

## 参考文献

- Roy Thomas Fielding. *Architectural Styles and the Design of Network-based Software Architectures*. Ph.D. dissertation, UC Irvine, 2000. <https://ics.uci.edu/~fielding/pubs/dissertation/top.htm>
- Roy T. Fielding, Mark Nottingham, Julian Reschke (eds.). HTTP Semantics. RFC 9110, 2022. <https://doi.org/10.17487/RFC9110>
- MDN Web Docs. HTTP request methods. <https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods>
