---
title: WebSocket
status: 執筆済
tags: [ソフトウェア開発, Web]
---

# WebSocket

**双方向・全二重の通信路。**
HTTP の「クライアントが要求し、サーバが応答する」制約を超える。

## 確立の流れ

```
GET /ws HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: ...

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
```

**HTTP でハンドシェイクしてからプロトコルを切り替える。**
既存のポート（80/443）を使えるので、
ファイアウォールやプロキシを通りやすい。

## 何に使うか

| 用途 | 理由 |
| --- | --- |
| チャット | 双方向、低遅延 |
| 共同編集 | 頻繁な小さい更新 |
| 対戦ゲーム | 低遅延 |
| 株価・センサ | サーバからの継続的な送信 |

## 代替との比較

| 方式 | 方向 | 適する場面 |
| --- | --- | --- |
| ポーリング | 要求のたび | 単純。無駄が多い |
| ロングポーリング | 擬似的な push | 互換性が要る場合 |
| **SSE** | サーバ → クライアントのみ | **通知だけならこちらが単純** |
| **WebSocket** | 双方向 | 双方向が必要なとき |

**双方向が要らないなら SSE の方が扱いやすい。**
SSE は HTTP のままで、自動再接続も仕様に入っている。

## 運用上の課題

| 課題 | 対処 |
| --- | --- |
| **接続が切れる** | 自動再接続 + 指数バックオフ |
| 状態が失われる | 再接続後に差分を取得する仕組み |
| **ステートフル** | 水平スケール時に接続の割り当てが要る |
| 中間装置のタイムアウト | ping/pong で生存を伝える |
| 認証 | 確立時に検査する（ヘッダを付けにくい制約あり） |

WebSocket はステートフルなので、
[[ソフトウェア開発/Web/Webの仕組み|HTTP のステートレス性]]による
スケールのしやすさを失う。
サーバレス環境と相性が悪いのもこのため。

## 参考文献

- Ian Fette, Alexey Melnikov. The WebSocket Protocol. RFC 6455, 2011. <https://doi.org/10.17487/RFC6455>
- MDN Web Docs. The WebSocket API. <https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API>
- MDN Web Docs. Server-sent events. <https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events>
