---
title: iOSアプリの構造
status: 執筆済
tags: [ソフトウェア開発, iOS]
---

# iOSアプリの構造

## バンドル

アプリは `.app` という**ディレクトリ**として配布される。

```
MyApp.app/
├── MyApp                  実行可能ファイル
├── Info.plist             メタデータ
├── Assets.car             画像などのリソース
├── Base.lproj/            ローカライズ
└── Frameworks/            埋め込みライブラリ
```

`Info.plist` にはバンドル ID、バージョン、
必要な権限の説明文、対応する OS などが入る。
**権限の説明文が無いと、その機能を使った瞬間にクラッシュする。**

## サンドボックス

各アプリは自分専用のコンテナ内でのみ読み書きできる。

```
Documents/    利用者のデータ。iCloud バックアップの対象
Library/
  Caches/     再生成できるもの。**OS が消しうる**
  Preferences/ UserDefaults
tmp/          一時的。いつ消えてもよい
```

**Caches に消えると困るものを置かない。**
容量が逼迫すると OS が削除する。

## 起動

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup { ContentView() }
    }
}
```

``main` が入口。
SwiftUI では `App` プロトコル、
UIKit では `UIApplicationDelegate` が担う。

**起動時間が重要**で、
Apple は 400 ミリ秒以内を目安としている。
``main` 以前の処理（動的ライブラリの読み込み、
静的初期化）も含まれるため、
埋め込みフレームワークが多いと起動が遅くなる。

## Scene

iPad や Mac では複数ウィンドウを持てるため、
アプリとウィンドウが分離されている。

```
App（アプリ全体）
 └ Scene（ウィンドウ）
     └ View 階層
```

## 参考文献

- Apple. Bundle Programming Guide / Bundle Structures. <https://developer.apple.com/documentation/foundation/bundle>
- Apple. File System Basics. <https://developer.apple.com/documentation/foundation/filemanager>
