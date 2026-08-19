---
title: DNS
status: 執筆済
tags: [ソフトウェア開発, ネットワーク]
---

# DNS

**ドメイン名を IP アドレスに変換する**分散データベース。

```
example.com  →  93.184.215.14
```

## 階層構造

```
.                  ルート（13 系統の権威サーバ）
└ com              TLD
   └ example.com   権威サーバ
      └ www.example.com
```

**名前空間が階層的に委譲されている**ので、
中央で全てを管理しなくてよい。
Web と同じく、分散が設計の核心。

## 解決の流れ

```
クライアント → リゾルバ（ISP など）
                 ↓ キャッシュに無ければ
              ルートサーバ  「com は あのサーバへ」
                 ↓
              TLD サーバ    「example.com は あのサーバへ」
                 ↓
              権威サーバ    「93.184.215.14 です」
```

## 主なレコード

| 種類 | 内容 |
| --- | --- |
| A / AAAA | IPv4 / IPv6 アドレス |
| CNAME | 別名。**ルートドメインには使えない** |
| MX | メールサーバ |
| TXT | 任意の文字列。所有証明、SPF |
| NS | 権威サーバの指定 |

## TTL とキャッシュ

各レコードに TTL（秒）があり、その間キャッシュされる。

| TTL | 帰結 |
| --- | --- |
| 長い | 問い合わせが減る。**変更の反映が遅い** |
| 短い | 反映が速い。負荷が増える |

**移行の前に TTL を短くしておく**のが定石。
変更してから短くしても、
古い TTL でキャッシュされた分は待つしかない。

## セキュリティ

DNS は当初、認証も暗号化も無かった。

| 仕組み | 内容 |
| --- | --- |
| **DNSSEC** | 応答に署名して**改竄を検出** |
| DoH / DoT | 問い合わせを暗号化して**盗聴を防ぐ** |

両者は別の問題を解く。
DNSSEC は完全性、DoH/DoT は機密性。

## 参考文献

- James F. Kurose, Keith W. Ross. *Computer Networking: A Top-Down Approach*, 8th ed. Pearson, 2021.
- Domain names — concepts and facilities. RFC 1034, 1987. <https://doi.org/10.17487/RFC1034>
- Domain names — implementation and specification. RFC 1035, 1987. <https://doi.org/10.17487/RFC1035>
- Cloudflare Learning. What is DNS? <https://www.cloudflare.com/learning/dns/what-is-dns/>
