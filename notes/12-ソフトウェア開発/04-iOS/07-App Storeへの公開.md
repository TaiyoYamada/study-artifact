---
title: App Storeへの公開
status: 執筆済
tags: [ソフトウェア開発, iOS]
---

# App Storeへの公開

## 流れ

```
Apple Developer Program に登録（年額）
    ↓
証明書・プロビジョニングプロファイル
    ↓
Xcode で Archive → App Store Connect へアップロード
    ↓
TestFlight で内部・外部テスト
    ↓
審査に提出
    ↓
承認 → 公開（手動 or 自動）
```

## 署名

すべてのアプリはコード署名されている必要がある。

| 要素 | 役割 |
| --- | --- |
| 証明書 | 開発者の身元 |
| Provisioning Profile | どのアプリを、どの端末で、どの権限で |
| Entitlements | 使える機能（プッシュ、iCloud など） |

**署名は改竄検出と身元確認の両方**を担う。
仕組みは複雑だが、
「誰が作ったか分からないコードを実行しない」
という原則の実装。

## 審査

主な却下理由。

| 理由 | 内容 |
| --- | --- |
| 不具合 | クラッシュ、機能しない |
| 情報不足 | テストアカウント、機能の説明が無い |
| **プライバシー** | 説明文、プライバシーポリシー、データ収集の申告 |
| 課金 | デジタルコンテンツは App 内課金が必須 |
| 価値が低い | 単なる Web サイトのラッパ |
| 権限の過剰要求 | 機能に不要な権限 |

**却下は普通のこと**で、修正して再提出すればよい。
審査は通常 24〜48 時間程度。

## プライバシー

- **Privacy Nutrition Label** — 収集するデータの申告
- **Privacy Manifest** — SDK ごとの収集内容と使用理由の宣言
- ATT — トラッキングには明示的な許可が要る

第三者 SDK を入れると、
その SDK の収集内容も自分の責任で申告することになる。

## リリース後

- クラッシュレポート（Xcode Organizer）を見る
- 段階的リリースで影響を限定する
- 深刻な不具合には緊急審査を申請できる

## 参考文献

- Apple. App Review Guidelines. <https://developer.apple.com/app-store/review/guidelines/>
- Apple. Distributing your app for beta testing and releases. <https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases>
- Apple. Privacy manifest files. <https://developer.apple.com/documentation/bundleresources/privacy-manifest-files>
