---
title: CDN
status: 執筆済
tags: [ソフトウェア開発, インフラ]
---

# CDN

**利用者に地理的に近い場所から配信する**ネットワーク。
Content Delivery Network。

## なぜ効くのか

光の速さは有限。

```
東京 ⇄ 米国東海岸  片道約 1 万 km
光ファイバ中の速度は約 20 万 km/s
→ 往復で最低 100 ms 程度。**物理的に短縮できない**
```

[[ソフトウェア開発/ネットワーク/TCP|TCP]] 確立に 1 往復、
TLS に 1〜2 往復、HTTP に 1 往復。
**距離がそのまま体感速度になる。**

CDN は世界中に拠点（エッジ）を置き、
そこから返すことで距離を縮める。

## キャッシュの制御

```
Cache-Control: public, max-age=31536000, immutable   静的資源
Cache-Control: public, s-maxage=60, stale-while-revalidate=600
Cache-Control: private, no-store                     個人向け
```

| ディレクティブ | 意味 |
| --- | --- |
| `max-age` | ブラウザでの保持時間 |
| `s-maxage` | **共有キャッシュ（CDN）での保持時間** |
| `immutable` | 再検証しない |
| `stale-while-revalidate` | 古いものを返しつつ裏で更新 |

## キャッシュバスティング

ファイル名にハッシュを入れる。

```
app.a3f2b1.js   ← 内容が変われば名前も変わる
```

**内容が変わらない限り名前が同じ**なので、
`immutable` で 1 年キャッシュしても安全。
更新は HTML 側の参照が変わることで反映される。

## パージの難しさ

「キャッシュの無効化はコンピュータサイエンスの
難問のひとつ」という有名な言い回しがある。

| 手段 | 内容 |
| --- | --- |
| TTL で自然に切れるのを待つ | 単純。反映が遅い |
| 明示的にパージ | 即時。全エッジへの伝播に時間差 |
| **バージョン付き URL** | **パージ自体が要らない**。最も確実 |

## CDN の役割の拡大

配信だけでなく

- TLS 終端、[[ソフトウェア開発/インフラ/リバースプロキシ|リバースプロキシ]]
- DDoS 緩和、WAF
- **エッジでの計算**（Cloudflare Workers、Vercel Edge Functions）

利用者に近い場所でコードを動かす方向に広がっている。
このノートサイトも Cloudflare Pages で配信している。

## 参考文献

- Roy T. Fielding, Mark Nottingham, Julian Reschke. HTTP Caching. RFC 9111, 2022. <https://doi.org/10.17487/RFC9111>
- MDN Web Docs. HTTP caching. <https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching>
- Ilya Grigorik. *High Performance Browser Networking*. O’Reilly, 2013. <https://hpbn.co/>
