---
title: ネットワーク
status: 執筆済
summary: 層に分けることで、各層を独立に入れ替えられるようにした設計。
tags: [ソフトウェア開発, ネットワーク]
---

# ネットワーク

離れた機械の間でデータを届ける仕組み。

## 層に分ける

```
アプリケーション   HTTP, DNS, SMTP
    ↓
トランスポート     [[TCP]], [[UDP]]        … どのプロセスへ、確実に届けるか
    ↓
インターネット     IP                 … どの機械へ
    ↓
リンク            Ethernet, Wi-Fi    … 隣までどう送るか
```

各層は**下の層の詳細を知らない**。
HTTP は Wi-Fi か光ファイバかを知らないし、
IP はその上が HTTP かゲームかを知らない。

**この独立性があるから、
新しい技術を層ごとに入れ替えられた。**
Wi-Fi も光ファイバも 5G も、上位層を変えずに導入できた。

## 構成

- [[ソフトウェア開発/ネットワーク/TCP-IP|TCP/IP]]
- [[ソフトウェア開発/ネットワーク/IPアドレス|IP アドレス]]・[[ソフトウェア開発/ネットワーク/ルーティング|ルーティング]]
- [[ソフトウェア開発/ネットワーク/TCP|TCP]]・[[ソフトウェア開発/ネットワーク/UDP|UDP]]
- [[ソフトウェア開発/ネットワーク/DNS|DNS]]
- [[ソフトウェア開発/ネットワーク/ソケット通信|ソケット通信]]

## 参考文献

- James F. Kurose, Keith W. Ross. *Computer Networking: A Top-Down Approach*, 8th ed. Pearson, 2021.
- Ilya Grigorik. *High Performance Browser Networking*. O’Reilly, 2013.（全文公開） <https://hpbn.co/>
