---
title: iOS
status: 執筆済
summary: Apple のモバイル OS 固有の事情。制約が多いのは電池・安全性・一貫性のため。
tags: [ソフトウェア開発, iOS]
---

# iOS

Apple のモバイル OS 上でアプリを作るときに固有の事情。

## 制約が強いプラットフォーム

| 制約 | 内容 |
| --- | --- |
| サンドボックス | 自分の領域の外に触れない |
| **バックグラウンド実行の制限** | 電池のため厳しく制限される |
| [[ソフトウェア開発/iOS/権限\|権限]] | 利用者の許可が要る |
| [[ソフトウェア開発/iOS/App Storeへの公開\|審査]] | 配布に Apple の承認が要る |
| JIT 禁止 | 動的なコード生成ができない |

**制約が多いのは、電池・安全性・一貫性のため**という
明確な意図がある。
Web と違い「とりあえず動かす」ことができず、
プラットフォームの規則を先に理解する必要がある。

## 構成

- [[ソフトウェア開発/iOS/iOSアプリの構造|アプリの構造]]
- [[ソフトウェア開発/iOS/UIKit|UIKit]]
- [[ソフトウェア開発/iOS/アプリのライフサイクル|ライフサイクル]]
- [[ソフトウェア開発/iOS/権限|権限]]・[[ソフトウェア開発/iOS/通知|通知]]
- [[ソフトウェア開発/iOS/バックグラウンド処理|バックグラウンド処理]]
- [[ソフトウェア開発/iOS/App Storeへの公開|App Store への公開]]

## 参考文献

- Apple. iOS Developer documentation. <https://developer.apple.com/documentation/>
- Apple. Human Interface Guidelines. <https://developer.apple.com/design/human-interface-guidelines>
