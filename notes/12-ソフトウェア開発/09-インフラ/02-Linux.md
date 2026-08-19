---
title: Linux
status: 執筆済
tags: [ソフトウェア開発, インフラ]
---

# Linux

サーバで最も広く使われている OS。
Linus Torvalds が 1991 年に開発を始めた。

## 構成

```
アプリケーション
   ↓ [[コンピュータ/オペレーティングシステム/システムコール|システムコール]]
カーネル（プロセス、メモリ、ファイル、ネットワーク、ドライバ）
   ↓
ハードウェア
```

「Linux」は本来カーネルの名前で、
配布物（Ubuntu、Debian、Alpine）は
カーネル + ユーザ空間の道具一式。

## 哲学

| 原則 | 内容 |
| --- | --- |
| **すべてはファイル** | デバイスもプロセス情報もファイルとして見える |
| 小さな道具を組み合わせる | パイプで繋ぐ |
| テキストを共通の形式にする | 道具間で受け渡せる |

```bash
ps aux | grep node | awk '{print $2}' | xargs kill
```

**単機能の道具が組み合わさって任意の処理になる。**
[[コンピュータ/オペレーティングシステム/プロセス|fork/exec とパイプ]]がこれを支えている。

## 調査に使う道具

| 目的 | 道具 |
| --- | --- |
| プロセス | `ps`、`top`、`htop` |
| ディスク | `df`、`du`、`ncdu` |
| ネットワーク | `ss`、`netstat`、`tcpdump` |
| ファイル記述子 | `lsof` |
| システムコール追跡 | `strace` |
| ログ | `journalctl`、`/var/log` |
| 性能 | `perf`、`vmstat`、`iostat` |

**「なぜ遅いか」を測らずに推測しない。**

## 権限

```
所有者 / グループ / その他  ×  読み / 書き / 実行
rwxr-xr--  =  754
```

**最小権限の原則** — root で動かさない。
サービスごとに専用ユーザを作る。
コンテナ内でも同じで、
既定の root 実行は避けるべき設定。

## 参考文献

- The Linux Kernel documentation. <https://docs.kernel.org/>
- Brendan Gregg. *Systems Performance*, 2nd ed. Addison-Wesley, 2020. <https://www.brendangregg.com/systems-performance-2nd-edition-book.html>
- Eric S. Raymond. *The Art of Unix Programming*. Addison-Wesley, 2003. <http://www.catb.org/~esr/writings/taoup/html/>
