---
title: API連携
status: 執筆済
tags: [ソフトウェア開発]
---

# API連携

**外部のサーバとデータをやり取りする。**

## 基本の流れ

```
リクエスト組み立て → 送信 → 待つ → 応答の検証 → 変換 → 反映
                      ↓
                    失敗しうる（すべての段階で）
```

## 失敗の種類

| 種類 | 対処 |
| --- | --- |
| ネットワーク不通 | 再試行、オフライン表示 |
| タイムアウト | 再試行、上限を設ける |
| 4xx（クライアント誤り） | **再試行しない**。修正が必要 |
| 5xx（サーバ誤り） | 指数バックオフで再試行 |
| 429（レート制限） | `Retry-After` に従う |
| 形式が違う | 検証して落とす。想定外を通さない |

**再試行してよいのは冪等な操作だけ。**
POST の再送は二重登録を起こしうるので、
冪等キーをサーバに渡す設計が要る。

## 指数バックオフ

$$\text{待ち時間} = \min(\text{base} \times 2^n, \text{max}) + \text{jitter}$$

ジッタ（乱数のゆらぎ）が重要で、
これが無いと全クライアントが同時に再試行して
サーバをさらに落とす（**thundering herd**）。

## 型の境界

外から来る JSON は**信用できない**。

```
JSON（未知） → 検証・変換 → 自分の型（信用できる）
```

この境界を 1 か所に集めておくと、
API の変更に強くなる。
Swift の `Codable`、TypeScript の zod などが担う役割。

## 参考文献

- Roy T. Fielding, Julian Reschke (eds.). HTTP Semantics. RFC 9110, 2022. <https://doi.org/10.17487/RFC9110>
- Marc Brooker. Exponential Backoff And Jitter. AWS Architecture Blog, 2015. <https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/>
- Martin Kleppmann. *Designing Data-Intensive Applications*. O’Reilly, 2017.
