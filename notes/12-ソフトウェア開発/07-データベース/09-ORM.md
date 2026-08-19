---
title: ORM
status: 執筆済
tags: [ソフトウェア開発, データベース]
---

# ORM

**オブジェクトと関係表を対応づける**層。
Object-Relational Mapping。

```
User オブジェクト  ⇄  users 表
```

## 利点

| 利点 | 内容 |
| --- | --- |
| 型安全 | 列名の打ち間違いをコンパイル時に検出 |
| 記述量 | SQL の組み立てとマッピングを省略 |
| **SQL インジェクション対策** | 自動的にプレースホルダを使う |
| DB 非依存 | 方言の差を吸収 |
| 移行管理 | スキーマ変更をコードで管理 |

## インピーダンスミスマッチ

オブジェクトと関係モデルは**根本的に構造が違う**。

| オブジェクト | 関係 |
| --- | --- |
| 参照でつながる | 外部キーで結合する |
| 継承がある | 継承が無い |
| 同一性がある | 値で識別する |
| 入れ子 | 平坦 |

この差を埋めきれないのが ORM の宿命的な難しさ。

## N+1 問題

最も頻出する落とし穴。

```
users = User.all              -- クエリ 1 回
for u in users:
    print(u.posts)            -- 各ユーザごとに 1 回 → N 回
```

100 人なら 101 回のクエリ。
**コードは自然に見えるのに、性能が壊滅的に落ちる。**

対処は先読み（eager loading）。

```
users = User.includes(:posts).all   -- 2 回で済む
```

**ORM を使っていても、発行される SQL を見る必要がある。**
ログを有効にして確認するのが基本。

## 使い分け

| 手段 | 適する場面 |
| --- | --- |
| ORM | 単純な CRUD、大部分の処理 |
| クエリビルダ | 中程度の複雑さ。型は欲しい |
| **生の SQL** | 複雑な集計、性能が要る箇所 |

**全部を ORM で書こうとしない。**
複雑な問い合わせは SQL で書いた方が
短く、速く、読みやすい。

## 参考文献

- Martin Kleppmann. *Designing Data-Intensive Applications*. O’Reilly, 2017.
- Martin Fowler. *Patterns of Enterprise Application Architecture*. Addison-Wesley, 2002.
- Ted Neward. The Vietnam of Computer Science. 2006. <https://web.archive.org/web/20220823105749/http://blogs.tedneward.com/post/the-vietnam-of-computer-science/>
