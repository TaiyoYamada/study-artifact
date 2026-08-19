---
title: ドメイン・DNS
status: 執筆済
tags: [ソフトウェア開発, インフラ]
---

# ドメイン・DNS

## ドメインの取得

```
レジストリ（TLD を管理。.com は Verisign）
    ↓
レジストラ（販売業者。Cloudflare、お名前.com など）
    ↓
登録者（自分）
```

**「買う」のではなく「借りる」**。
更新しないと失効し、他人が取得できる。

## 設定の実際

サイトを公開するときの典型的な手順。

```
1. ドメインを取得する
2. ネームサーバを、使う DNS 事業者に向ける
3. レコードを設定する
     A     @      → サーバの IP
     CNAME www    → 本体のホスト名
4. 証明書を取得する（Let's Encrypt など。多くは自動）
```

## CNAME の制約

**ルートドメイン（`example.com`）に CNAME は使えない。**
DNS の仕様上、
ルートには SOA / NS レコードが必須で、
CNAME はそれらと共存できないため。

対処。

| 手段 | 内容 |
| --- | --- |
| A レコードで IP を直接指定 | IP が変わると追随が要る |
| **ALIAS / ANAME / CNAME flattening** | 事業者独自の拡張。実質 CNAME |
| `www` に寄せてリダイレクト | 古典的な回避 |

## 移行のときの TTL

```
移行の数日前  … TTL を 300 秒などに下げる
移行当日      … レコードを変更する
安定後        … TTL を戻す
```

**変更してから TTL を下げても遅い。**
既にキャッシュされた分は元の TTL の間残る。

## 所有の確認と保護

| 用途 | 手段 |
| --- | --- |
| 所有証明 | TXT レコード |
| メールのなりすまし対策 | SPF、DKIM、DMARC（すべて TXT） |
| 証明書発行の制限 | CAA レコード |
| **ドメインの乗っ取り防止** | レジストラロック、2 要素認証 |

**ドメインを失うとサービスもメールも止まる。**
更新の自動化と、
登録者情報のメールアドレスが生きていることの確認が要る。

## 参考文献

- ICANN. Registry / Registrar の役割. <https://www.icann.org/resources/pages/registrars-0d-2012-02-25-en>
- IETF. Domain names — implementation and specification. RFC 1035, 1987. <https://doi.org/10.17487/RFC1035>
- Let's Encrypt. How It Works. <https://letsencrypt.org/how-it-works/>
