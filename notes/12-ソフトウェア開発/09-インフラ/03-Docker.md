---
title: Docker
status: 執筆済
tags: [ソフトウェア開発, インフラ]
---

# Docker

**アプリケーションと依存関係をまとめて、
どこでも同じように動かす**道具。2013 年公開。

## 何を解決したか

```
「私の環境では動くのに」
```

原因は環境差（OS のバージョン、ライブラリ、設定）。
Docker は**実行に必要なものを全部イメージに含める**ことで、
開発・検証・本番の差をなくす。

## 主な概念

| 概念 | 内容 |
| --- | --- |
| **イメージ** | 実行に必要なファイル一式。読み取り専用 |
| **コンテナ** | イメージを動かした実体 |
| Dockerfile | イメージの作り方の手順書 |
| レジストリ | イメージの置き場所 |
| ボリューム | 永続化する領域 |

```dockerfile
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["node", "server.js"]
```

## レイヤとキャッシュ

各命令が**レイヤ**になり、変わらなければ再利用される。

```
package.json だけ先にコピー → 依存のインストールをキャッシュ
ソースは後でコピー         → コード変更で依存を入れ直さない
```

**変わりにくいものを先に書く**のがビルド高速化の基本。

## イメージを小さくする

| 手段 | 効果 |
| --- | --- |
| **マルチステージビルド** | ビルド用と実行用を分ける |
| slim / alpine ベース | 数百 MB → 数十 MB |
| `.dockerignore` | 不要ファイルを送らない |
| 不要なレイヤをまとめる | 中間ファイルを残さない |

小さいと、転送も起動も速く、
**攻撃面（含まれるパッケージ）も減る**。

## 注意

- **コンテナ内のファイルは消える。** 永続化はボリュームか外部へ
- root で動かさない（`USER` を指定する）
- 秘密情報をイメージに焼き込まない（履歴に残る）
- タグを `latest` に固定しない（再現性が失われる）

## 参考文献

- Docker Documentation. <https://docs.docker.com/>
- Dirk Merkel. Docker: Lightweight Linux Containers for Consistent Development and Deployment. *Linux Journal* 2014(239), 2014. <https://www.linuxjournal.com/content/docker-lightweight-linux-containers-consistent-development-and-deployment>
- Open Container Initiative. Image Format Specification. <https://github.com/opencontainers/image-spec>
