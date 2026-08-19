---
title: AWS Lambda
status: 執筆済
tags: [ソフトウェア開発, インフラ]
---

# AWS Lambda

AWS の [[ソフトウェア開発/インフラ/サーバーレス|FaaS]]。2014 年に登場し、
この分野を切り開いた。

## 実行モデル

```
イベント（HTTP、S3 への配置、キュー、定期実行）
   ↓
Lambda が実行環境を用意（または再利用）
   ↓
ハンドラ関数を呼ぶ
   ↓
結果を返す
```

```js
export const handler = async (event) => {
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
```

## 課金

$$\text{料金} \propto \text{リクエスト数} + (\text{実行時間} \times \text{メモリ})$$

**メモリを増やすと CPU も比例して増える。**
そのため、メモリを増やして実行時間が短くなれば
**総額が下がることがある**。
最適点は測定して決める。

## 実行環境の再利用

コンテナは呼び出し後もしばらく保持され、再利用される。

```js
const db = createClient();       // ← 初期化はハンドラの外（再利用される）
export const handler = async () => { await db.query(...); };
```

- ハンドラ外の初期化は**コールドスタート時のみ**実行される
- `/tmp` の内容も残る（ただし当てにしない）
- **グローバル変数に前の呼び出しの状態が残る**ので、
  利用者データを持たせない

## Firecracker

Lambda の隔離は**軽量 VM**（Firecracker）で行われる。

- コンテナより強い隔離
- 起動が 125 ms 程度と速い
- 異なる利用者のコードを同じ物理機で安全に動かせる

[[ソフトウェア開発/インフラ/コンテナ|コンテナ]]の
隔離の弱さを、VM の強さで補う設計。

## 制限

| 項目 | 上限 |
| --- | --- |
| 実行時間 | 15 分 |
| メモリ | 10 GB |
| 一時領域 | 512 MB〜10 GB |
| デプロイパッケージ | 50 MB (zip) / 10 GB (コンテナイメージ) |

## 参考文献

- AWS Lambda Developer Guide. <https://docs.aws.amazon.com/lambda/latest/dg/welcome.html>
- Alexandru Agache et al. Firecracker: Lightweight Virtualization for Serverless Applications. *NSDI*, 2020. <https://www.usenix.org/conference/nsdi20/presentation/agache>
