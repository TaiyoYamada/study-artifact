---
title: Shorアルゴリズム
status: 執筆済
tags: [量子アルゴリズム, Shor]
---

# Shorアルゴリズム

**素因数分解を多項式時間で行う**アルゴリズム。
Shor が 1994 年に発表し、量子計算への関心を決定的に高めた。

$$\mathcal{O}\bigl((\log N)^3\bigr) \qquad \text{（古典の最良は準指数時間）}$$

## 素因数分解を周期発見に帰着する

要点は**数論的な変換**にある。

1. $a$ をランダムに選ぶ
2. 関数 $f(x) = a^x \bmod N$ の**周期 $r$** を求める
3. $r$ が偶数かつ $a^{r/2} \not\equiv -1$ なら、
   $\gcd(a^{r/2} \pm 1, N)$ が $N$ の非自明な因数

**量子的な部分は 2 だけ。** 1 と 3 は古典計算。

## 周期発見に量子を使う

周期の抽出に[[量子アルゴリズム/量子フーリエ変換|量子フーリエ変換]]を使う。
重ね合わせに周期構造を作り、QFT で周波数成分として取り出す。

古典の高速フーリエ変換が $\mathcal{O}(N\log N)$ なのに対し、
QFT は $\mathcal{O}((\log N)^2)$。
ただし**結果を全部読み出せない**ので、
「周期を知る」という特定の目的にしか使えない。

## 暗号への影響

RSA は素因数分解の困難性に、
楕円曲線暗号は離散対数の困難性に依拠する。
Shor はどちらも破る。

このため**耐量子計算機暗号 (PQC)** への移行が進んでおり、
NIST は 2024 年に最初の標準（ML-KEM など）を公表した。

## 実行にはまだ遠い

2048 ビット RSA を破るには、誤り訂正された
**数百万の物理量子ビット**が要ると見積もられている。
現在の数百量子ビット規模とは大きな隔たりがある。

## 参考文献

- Peter W. Shor. Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer. *SIAM Journal on Computing* 26(5), 1997. <https://doi.org/10.1137/S0097539795293172>
- Craig Gidney, Martin Ekerå. How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits. *Quantum* 5, 2021. <https://doi.org/10.22331/q-2021-04-15-433>
- NIST. Post-Quantum Cryptography Standardization <https://csrc.nist.gov/projects/post-quantum-cryptography>
