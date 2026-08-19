---
title: KKT条件
status: 執筆済
tags: [数学, 最適化]
---

# KKT条件

不等式制約を含む最適化の**最適性条件**。
Karush-Kuhn-Tucker。

$$\min f(x) \quad \text{s.t.} \quad g_i(x) \le 0, \; h_j(x) = 0$$

## 4 つの条件

$$\begin{aligned}
&\text{(1) 停留性} && \nabla f + \sum_i \mu_i \nabla g_i + \sum_j \lambda_j \nabla h_j = 0 \\
&\text{(2) 実行可能性} && g_i(x) \le 0, \quad h_j(x) = 0 \\
&\text{(3) 双対実行可能性} && \mu_i \ge 0 \\
&\text{(4) 相補性} && \mu_i \, g_i(x) = 0
\end{aligned}$$

## 相補性が肝

(4) は「$\mu_i = 0$ または $g_i(x) = 0$」を意味する。

- **制約が効いていない**（$g_i < 0$、内点）→ $\mu_i = 0$
- **制約が効いている**（$g_i = 0$、境界上）→ $\mu_i \ge 0$ でよい

つまり**どの制約が実際に効いているか**を条件の中で自動的に切り分けている。
有効制約法はこれを直接利用して、
効いている制約だけを等式として扱う。

## 必要か十分か

| 問題 | KKT 条件 |
| --- | --- |
| 凸（かつ制約想定を満たす） | **必要十分** |
| 非凸 | 必要条件のみ |

非凸では KKT 点が局所解とも限らない（鞍点でも成り立つ）。
「KKT 条件を満たした」＝「最適解を得た」ではない。

## 参考文献

- Stephen Boyd, Lieven Vandenberghe. *Convex Optimization*. Cambridge University Press, 2004.（全文公開） <https://web.stanford.edu/~boyd/cvxbook/>
- Jorge Nocedal, Stephen J. Wright. *Numerical Optimization*, 2nd ed. Springer, 2006. <https://doi.org/10.1007/978-0-387-40065-5>
