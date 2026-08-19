---
title: SQL
status: 執筆済
tags: [ソフトウェア開発, データベース, SQL]
---

# SQL

**関係データベースへの問い合わせ言語。**
「何が欲しいか」を書き、「どう取るか」は DB が決める（宣言的）。

```sql
SELECT u.name, COUNT(p.id) AS post_count
FROM users AS u
LEFT JOIN posts AS p ON p.user_id = u.id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name
HAVING COUNT(p.id) > 5
ORDER BY post_count DESC
LIMIT 10;
```

## 評価の順序

書く順序と評価される順序が違う。

```
FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

これを知らないと

- `WHERE` で `SELECT` の別名が使えない理由
- `WHERE` と `HAVING` の違い（集約の前か後か）

が分からない。

## JOIN

| 種類 | 結果 |
| --- | --- |
| INNER | 両方にある行 |
| LEFT | 左は全部、右は無ければ NULL |
| RIGHT | その逆 |
| FULL | どちらかにあれば |
| CROSS | 直積 |

## NULL

**NULL は「値が無い」であって、0 でも空文字でもない。**

```sql
NULL = NULL        -- 真ではなく UNKNOWN
NULL <> 1          -- UNKNOWN
WHERE x = NULL     -- 常に何も返らない。IS NULL を使う
COUNT(col)         -- NULL を数えない
SUM(col)           -- NULL を無視する
```

3 値論理（真・偽・不明）になるため、
直感と異なる結果になりやすい。

## 実行計画

```sql
EXPLAIN ANALYZE SELECT ...;
```

DB がどう実行するかを見られる。
遅いクエリの調査は必ずここから始める。

| 見るもの | 意味 |
| --- | --- |
| Seq Scan | 全件走査。大きな表では危険 |
| Index Scan | [[ソフトウェア開発/データベース/インデックス\|索引]]を使えている |
| Nested Loop / Hash Join | 結合の方法 |
| 推定行数 vs 実行数 | **大きくずれていたら統計が古い** |

## 参考文献

- PostgreSQL Documentation. SQL Language. <https://www.postgresql.org/docs/current/sql.html>
- Raghu Ramakrishnan, Johannes Gehrke. *Database Management Systems*, 3rd ed. McGraw-Hill, 2003.
- ISO/IEC 9075: Information technology — Database languages — SQL. <https://www.iso.org/standard/76583.html>
