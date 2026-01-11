---
title: 戴克斯特拉算法（Dijkstra）的本质是贪心，还是动态规划?
date: 2026-01-11 23:20:59
categories: 算法文章
---

# 戴克斯特拉算法（Dijkstra）的本质是贪心，还是动态规划？

咱就不说什么贪心或者动态规划这种老调重弹了，换一个全新的视角，Dijkstra 算法的本质是 —— 线性规划问题的原始-对偶方法（Primal-Dual Method）！

考虑一个简单连通有向图 G=(V,E)G=(V,E) 上的最短路径问题，其中 |V|=n|V|=n ， |E|=m|E|=m ；

起点为 s=v_1s=v_1 ，终点为 t=v_nt=v_n 。

以下图为例：定义关联矩阵 \bm A=(a_{ij})_{n\times m}\bm A=(a_{ij})_{n\times m} ：其中每一行对应一个顶点，每一列对应一条边，若一条边 e_ie_i 是一个顶点 v_jv_j 的出边，则 a_{ij}=1a_{ij}=1 ；

若一条边 e_ie_i 是一个顶点 v_jv_j 的入边，则 a_{ij}=-1a_{ij}=-1 ；

否则， a_{ij}=0a_{ij}=0 。

例如，前面那张图所对应的关联矩阵为：\begin{array}{ccc} &&\begin{matrix}\; e_1&\; e_2&\; e_3&\; e_4&\; e_5&\; e_6&\; e_7&\; e_8\end{matrix}\\ \bm A=&\begin{matrix}s\\v_2\\v_3 \\v_4 \\v_5 \\ t\end{matrix}&\begin{pmatrix} 1&1&&&&&&\\ -1&&1&1&&&\\ &-1&-1&&1&&\\ &&&-1&&-1&1\\ &&&&-1&1&&1\\ &&&&&&-1&-1 \end{pmatrix} \end{array}\begin{array}{ccc} &&\begin{matrix}\; e_1&\; e_2&\; e_3&\; e_4&\; e_5&\; e_6&\; e_7&\; e_8\end{matrix}\\ \bm A=&\begin{matrix}s\\v_2\\v_3 \\v_4 \\v_5 \\ t\end{matrix}&\begin{pmatrix} 1&1&&&&&&\\ -1&&1&1&&&\\ &-1&-1&&1&&\\ &&&-1&&-1&1\\ &&&&-1&1&&1\\ &&&&&&-1&-1 \end{pmatrix} \end{array} 我们记 \bm f=(f_1,f_2,\cdots,f_m)^\top\bm f=(f_1,f_2,\cdots,f_m)^\top 代表一条路径 PP ， f_i=\left\{\begin{align*} 0,\enspace&e_i\not\in P\\ 1,\enspace&e_i\in P \end{align*}\right.f_i=\left\{\begin{align*} 0,\enspace&e_i\not\in P\\ 1,\enspace&e_i\in P \end{align*}\right. 。

那么，对于任意一条从 ss 到 tt 的路径所对应的向量 ff ，必有\begin{array}{cc} &s\qquad\qquad\quad t\enspace\\ \bm{Af}=&(1,0,\cdots,0,-1)^\top \end{array}\begin{array}{cc} &s\qquad\qquad\quad t\enspace\\ \bm{Af}=&(1,0,\cdots,0,-1)^\top \end{array} 因为该路径总体上对 ss 有一条出边，对 tt 有一条入边，对中间节点要么没有出入边（不经过）要么有一条出边有一条入边（经过）。

设每一条边 e_ie_i 的长度为 c_i>0c_i>0 ，那么我们可以写出最短路问题的线性规划模型，记作问题 (P)(P) （代表原始问题），\begin{array}{ccl} &\min\;&\bm c^\top\bm f\equiv\sum\limits_{i=1}^mc_if_i\\ (P)&\text{s.t. }& \bm{Af}=(1,0,\cdots,-1)^\top\\ &&\; \bm{f}\ge \bm{0} \end{array}\begin{array}{ccl} &\min\;&\bm c^\top\bm f\equiv\sum\limits_{i=1}^mc_if_i\\ (P)&\text{s.t. }& \bm{Af}=(1,0,\cdots,-1)^\top\\ &&\; \bm{f}\ge \bm{0} \end{array} 不过，注意到最优解中的元素不是 0 就是 1，为什么这还是一个线性规划问题，而非整数规划问题呢？

我们可以证明，对于该线性规划问题，每一个基可行解中的元素都是整数。

首先证明一个定理：定理 1： \bm{A}\bm{A} 是一个全幺模矩阵（total unimodular matrix）。

全幺模矩阵的定义是：一个整数矩阵称为全幺模矩阵，如果它的任何一个子方阵的行列式取值为 0，1 或 -1。

证明：对 \bm{A}\bm{A} 的子方阵的边长 ll 做归纳法。

对于任意 l=1l=1 的子方阵，显然其行列式取值为 0，1 或者 -1 。

假设对于其任意 1\le l\le k1\le l\le k 的子方阵都有行列式取值为 0，1，-1，那么对于任意 l=k+1l=k+1 的子方阵 \bm{B}\bm{B} ，根据关联矩阵定义，这个子方阵的每一列至多有两个非 0 元素，且至多有一个为 1，至多一个为 -1；

假设 \bm{B}\bm{B} 存在一列没有非 0 元素，那么其行列式为 0；

假设 \bm{B}\bm{B} 存在一列有且仅有一个非零元素 b_{ij}\in\{1,-1\}b_{ij}\in\{1,-1\} ，则 \mathrm{det}(\bm{B})=(-1)^{i+j}b_{ij}\mathrm{det}(b_{ij}\text{ 对应的余子式})\mathrm{det}(\bm{B})=(-1)^{i+j}b_{ij}\mathrm{det}(b_{ij}\text{ 对应的余子式}) ，根据归纳假设，这三项的取值都是 0，1 或者 -1，则三者相乘的结果也是 0，1 或者 -1；

假设 \bm{B}\bm{B} 每一列都有两个非零元素，那么根据关联矩阵定义，对该子方阵每一行求和，将会得到一个元素都是 0 的行向量，因此 \bm{B}\bm{B} 奇异，其行列式为 0。

根据上述数学归纳法，关联矩阵 \bm{A}\bm{A} 是全幺模矩阵。

\boxed{}\boxed{} 回忆一下单纯形法求解 (P)(P) 问题的步骤，我们需要把系数矩阵拆分为一个满秩的基矩阵 \bm A_B\bm A_B 和一个非基矩阵 \bm{A}_N\bm{A}_N ，即 \bm{A}=\begin{pmatrix}\bm{A}_B&\bm{A}_N\end{pmatrix}\bm{A}=\begin{pmatrix}\bm{A}_B&\bm{A}_N\end{pmatrix} ；

其中基矩阵大小为 n\times nn\times n ，非基矩阵大小为 n\times(m-n)n\times(m-n) ，而基可行解的形式为 \bm{A}_B^{-1}(1,0,\cdots,-1)^\top\bm{A}_B^{-1}(1,0,\cdots,-1)^\top 。

根据定理 1 以及 \bm A_B\bm A_B 可逆，可知 \mathrm{det}(\bm A_B)=\pm 1\mathrm{det}(\bm A_B)=\pm 1 ；

由于 \bm A_B\bm A_B 是个整数矩阵，所以 \bm A_B\bm A_B 的伴随矩阵 \bm{A}_B^*\bm{A}_B^* 也是个整数矩阵，则 \bm{A}_B^{-1}=\bm{A}_B^*/\mathrm{det}(\bm{A}_B)\bm{A}_B^{-1}=\bm{A}_B^*/\mathrm{det}(\bm{A}_B) 是整数矩阵，因此 (P)(P) 的所有基可行解都是整数解。

根据关联矩阵的定义很容易发现，把 \bm{A}\bm{A} 的每一行加起来，最后会获得全 0 的行向量，因此 \bm{A}\bm{A} 的行向量是线性相关的，不妨从 \bm{A}\bm{A} 中去掉代表终点 tt 的最后一行，得到新矩阵 \bar{\bm{A}}\bar{\bm{A}} 。

将 (P)(P) 问题重新改写，并顺手写出 (P)(P) 问题的对偶问题 (DP)(DP) 、限制的原始问题 (RP)(RP) 、限制的对偶问题 (DRP)(DRP) ：\begin{array}{c|c} \begin{array}{ccl} &\min\;&\bm c^\top\bm{f}\equiv\sum\limits_{i=1}^{m}c_if_i\\ (P)&\text{s.t. }& \bar{\bm{A}}\bm{f}=(1,0,\cdots,0)^\top\\ &&\; \bm{f}\ge \bm{0} \end{array}& \begin{array}{ccl} &\max &y_s\\ (D)&\text{s.t.}& y_i-y_j\le c_{ij},e_{ij}\in E\\ &&y_t=0 \end{array}\\ \hline \begin{array}{ccl} &\min&\sum\limits_{i=1}^{n-1}\tilde{x}_i\\ (RP)& \text{s.t.}&\bar{\bm{A}}\bm{f}+\tilde{\bm x}=(1,0,\cdots,0)^\top\\ && f_{e_{ij}}=0,\;e_{ij}\not\in J\\ && f_{e_{ij}}\ge 0,\;e_{ij}\in J\\ && \tilde{\bm{x}}\ge\bm{0} \end{array}& \begin{array}{ccl} &\max& \tilde y_s\\ (DRP)& \text{s.t.}& \tilde y_j-\tilde y_i\le 0,\;e_{ij}\in J\\ && \tilde y_i\le 1,\;i=1,\dots,n-1\\ && \tilde y_t=0 \end{array} \end{array}\begin{array}{c|c} \begin{array}{ccl} &\min\;&\bm c^\top\bm{f}\equiv\sum\limits_{i=1}^{m}c_if_i\\ (P)&\text{s.t. }& \bar{\bm{A}}\bm{f}=(1,0,\cdots,0)^\top\\ &&\; \bm{f}\ge \bm{0} \end{array}& \begin{array}{ccl} &\max &y_s\\ (D)&\text{s.t.}& y_i-y_j\le c_{ij},e_{ij}\in E\\ &&y_t=0 \end{array}\\ \hline \begin{array}{ccl} &\min&\sum\limits_{i=1}^{n-1}\tilde{x}_i\\ (RP)& \text{s.t.}&\bar{\bm{A}}\bm{f}+\tilde{\bm x}=(1,0,\cdots,0)^\top\\ && f_{e_{ij}}=0,\;e_{ij}\not\in J\\ && f_{e_{ij}}\ge 0,\;e_{ij}\in J\\ && \tilde{\bm{x}}\ge\bm{0} \end{array}& \begin{array}{ccl} &\max& \tilde y_s\\ (DRP)& \text{s.t.}& \tilde y_j-\tilde y_i\le 0,\;e_{ij}\in J\\ && \tilde y_i\le 1,\;i=1,\dots,n-1\\ && \tilde y_t=0 \end{array} \end{array} 其中 e_{ij}e_{ij} 代表一条从第 ii 个顶点连到第 jj 个顶点的边， f_{e_{ij}}f_{e_{ij}} 代表向量 \bm{f}\bm{f} 中 e_{ij}e_{ij} 所对应的元素；

c_{ij}c_{ij} 代表边 e_{ij}e_{ij} 的长度；

J=\{e_{ij}|y_i-y_j=c_{ij}\}J=\{e_{ij}|y_i-y_j=c_{ij}\} 是允许指标集，代表对偶问题 (D)(D) 里所有紧的约束。

（值得注意的是，可以发现 (DP)(DP) 是一个差分约束求极大值的问题；

因此最短路径的问题总对应于一个差分约束求极大值问题，这两个问题的解相同。

）观察 (DRP)(DRP) 问题，其最优值 \tilde{y}_s^*\le 1\tilde{y}_s^*\le 1 ，而影响 \tilde{y}_s^*\tilde{y}_s^* 取值的约束只有 \tilde{y}_j\le \tilde{y}_i,e_{ij}\in J\tilde{y}_j\le \tilde{y}_i,e_{ij}\in J 。

因此我们只需要关注 JJ 中的边。

若 e_{ti}\in Je_{ti}\in J ， \tilde{y}_i\le \tilde{y}_t=0\tilde{y}_i\le \tilde{y}_t=0 ， \tilde{y}_i\tilde{y}_i 必然为 0；

进而，如果 e_{ti}\in Je_{ti}\in J 且 e_{ij}\in Je_{ij}\in J ，则 \tilde{y}_j\le\tilde{y}_i\le\tilde{y}_t=0\tilde{y}_j\le\tilde{y}_i\le\tilde{y}_t=0 ；

因此，若在 JJ 中有一条从 tt 到 v_jv_j 的路径，那么 \tilde{y}_j\tilde{y}_j 为 0；

若在 JJ 中不存在一条从 tt 到 v_jv_j 的路径，那么 \tilde{y}_j\tilde{y}_j 可以取 1。

所以说，我们完全不需要解线性规划问题，因为可以直接看出 (DRP)(DRP) 的解。

如果 JJ 中包含了一条 ss 到 tt 的路径，那么 \tilde{y}_s\tilde{y}_s 必然取 0，即 (DRP)(DRP) 问题目标函数的最优值 \tilde{y}_s^*=0\tilde{y}_s^*=0 ，根据强对偶定理， (RP)(RP) 的最优值也是 0，则对偶松弛条件满足，说明我们找到了 (P)(P) 和 (D)(D) 的最优解。

如果 JJ 中没有这样一条路径呢？

回忆一下原始-对偶方法中进行迭代的过程，此时 (D)(D) 中的 y_sy_s 还不是最优解，我们需要借助当前的 \tilde{y}^*_s\tilde{y}^*_s 来改进 y_sy_s ，也就是说y_s\leftarrow y_s+\theta\tilde{y}_s^*y_s\leftarrow y_s+\theta\tilde{y}_s^* 其中步长 \begin{align*} \theta=\min\{c_{ij}-(y_i-y_j)\,|\,\tilde{y}_i-\tilde{y}_j>0\;, e_{ij}\not\in J\} \end{align*}\begin{align*} \theta=\min\{c_{ij}-(y_i-y_j)\,|\,\tilde{y}_i-\tilde{y}_j>0\;, e_{ij}\not\in J\} \end{align*} 。

注意到 \tilde{y}_s^*\tilde{y}_s^* 如果非 0，那么必然为 1，因此迭代规则变为 y_s\leftarrow y_s+\thetay_s\leftarrow y_s+\theta ；

y_sy_s 必然是增加了的，因此 (D)(D) 的目标函数值得到了改进。

然后来看 JJ 的变化，若 e_{ij}\in Je_{ij}\in J ， y_i-y_j=c_{ij}y_i-y_j=c_{ij} ，那么在下一轮迭代中，\begin{align*} y_i-y_j\leftarrow (y_i-y_j)+\theta(\underbrace{\tilde{y}_i-\tilde{y}_j}_{=0})=y_i-y_j \end{align*}\begin{align*} y_i-y_j\leftarrow (y_i-y_j)+\theta(\underbrace{\tilde{y}_i-\tilde{y}_j}_{=0})=y_i-y_j \end{align*} 因此， e_{ij}e_{ij} 一旦在 JJ 中，那么将一直居于 JJ 中。

我们进行原始-对偶算法的过程，也就是不断扩展可到达 tt 的顶点集合，直到 ss 也进入该集合。

因此，该算法至多进行 O(n)O(n) 次迭代。

可以将上述的分析总结为算法，如下：\begin{array}{l} \textbf{Algorithm:}\\ \hline \bm y\leftarrow\bm 0\\ \tilde{\bm{y}}\leftarrow(1,1,\cdots,1,0)\\ J\leftarrow\emptyset\\ \textbf{while}\;\tilde{y}_1\ne 0\;\textbf{do:}\\ \quad \theta\leftarrow\min\{c_{ij}-(y_i-y_j)\,|\,\tilde{y}_i-\tilde{y}_j>0\;, e_{ij}\not\in J\}\\ \quad \bm y\leftarrow \bm{y}+\theta\tilde{\bm y}\\ \quad J\leftarrow\{e_{ij}|y_i-y_j=c_{ij}\}\\ \quad \tilde{y}_i\leftarrow\left\{\begin{aligned}&0,\; J\text{ 中存在一条到 } v_i\text{ 的路径}\\&1,\; J\text{ 中不存在一条到 } v_i\text{ 的路径}\end{aligned}\right.\quad i=1,\dots,n-1\\ \mathbf{return}\;y_1 \end{array}\begin{array}{l} \textbf{Algorithm:}\\ \hline \bm y\leftarrow\bm 0\\ \tilde{\bm{y}}\leftarrow(1,1,\cdots,1,0)\\ J\leftarrow\emptyset\\ \textbf{while}\;\tilde{y}_1\ne 0\;\textbf{do:}\\ \quad \theta\leftarrow\min\{c_{ij}-(y_i-y_j)\,|\,\tilde{y}_i-\tilde{y}_j>0\;, e_{ij}\not\in J\}\\ \quad \bm y\leftarrow \bm{y}+\theta\tilde{\bm y}\\ \quad J\leftarrow\{e_{ij}|y_i-y_j=c_{ij}\}\\ \quad \tilde{y}_i\leftarrow\left\{\begin{aligned}&0,\; J\text{ 中存在一条到 } v_i\text{ 的路径}\\&1,\; J\text{ 中不存在一条到 } v_i\text{ 的路径}\end{aligned}\right.\quad i=1,\dots,n-1\\ \mathbf{return}\;y_1 \end{array} 还是以最开始那个例子为例，设 e_1,\cdots,e_8e_1,\cdots,e_8 对应的长度为 \bm c = (c_1,\cdots,c_8)^\top=(2,1,3,3,1,2,2,5)^\top\bm c = (c_1,\cdots,c_8)^\top=(2,1,3,3,1,2,2,5)^\top ，初始时 (D)(D) 显而易见有一个可行解 y_i=0,\;i=1,\dots, ny_i=0,\;i=1,\dots, n ，我们记作 \bm y=(0,0,0,0,0,0)\bm y=(0,0,0,0,0,0) ；

同时令初始的 J=\emptysetJ=\emptyset ；

(DRP)(DRP) 也有一个显而易见的可行解 \tilde{y}_i=1,\; i=1,\cdots,n-1\tilde{y}_i=1,\; i=1,\cdots,n-1 ， \tilde{y}_t\equiv \tilde{y}_{n-1}=0\tilde{y}_t\equiv \tilde{y}_{n-1}=0 ，我们记作 \tilde{\bm{y}}=(1,1,1,1,1,0)\tilde{\bm{y}}=(1,1,1,1,1,0) ；

根据步长 \theta\theta 的公式，我们选择 \theta=c_7-(y_4-y_t)=2\theta=c_7-(y_4-y_t)=2 ，并将 \bm y\bm y 更新为 \bm{y}\leftarrow \bm{y}+\theta\tilde{\bm y}=(2,2,2,2,2,0)\bm{y}\leftarrow \bm{y}+\theta\tilde{\bm y}=(2,2,2,2,2,0) ；

第二次迭代中， J=\{e_7\}=\{(v_4,t)\}J=\{e_7\}=\{(v_4,t)\} ，得到 \tilde{\bm{y}}=(1,1,1,0,1,0)\tilde{\bm{y}}=(1,1,1,0,1,0) ，选择 \theta=c_6-(y_4-y_5)=2\theta=c_6-(y_4-y_5)=2 ，将 \bm y\bm y 更新为 \bm{y}\leftarrow \bm{y}+\theta\tilde{\bm y}=(4,4,4,2,4,0)\bm{y}\leftarrow \bm{y}+\theta\tilde{\bm y}=(4,4,4,2,4,0) ；

第三次迭代中， J=\{e_7,e_6\}=\{(v_4,t),(v_5,v_4)\}J=\{e_7,e_6\}=\{(v_4,t),(v_5,v_4)\} ，得到 \tilde{\bm{y}}=(1,1,1,0,0,0)\tilde{\bm{y}}=(1,1,1,0,0,0) ，选择 \theta=c_5-(y_3-y_5)=c_4-(y_2-y_4)=1\theta=c_5-(y_3-y_5)=c_4-(y_2-y_4)=1 ，将 \bm y\bm y 更新为 \bm{y}\leftarrow \bm{y}+\theta\tilde{\bm y}=(5,5,5,2,4,0)\bm{y}\leftarrow \bm{y}+\theta\tilde{\bm y}=(5,5,5,2,4,0) ；

第四次迭代中， J=\{e_7,e_6,e_5,e_4\}=\{(v_4,t),(v_5,v_4),(v_3,v_5),(v_2,v_4)\}J=\{e_7,e_6,e_5,e_4\}=\{(v_4,t),(v_5,v_4),(v_3,v_5),(v_2,v_4)\} ，得到 \tilde{\bm{y}}=(1,0,0,0,0,0)\tilde{\bm{y}}=(1,0,0,0,0,0) ，选择 \theta=c_2-(y_1-y_3)=1\theta=c_2-(y_1-y_3)=1 ，将 \bm y\bm y 更新为 \bm{y}\leftarrow \bm{y}+\theta\tilde{\bm y}=(6,5,5,2,4,0)\bm{y}\leftarrow \bm{y}+\theta\tilde{\bm y}=(6,5,5,2,4,0) ；

此时 J=\{e_7,e_6,e_5,e_4,e_2\}=\{(v_4,t),(v_5,v_4),(v_3,v_5),(v_2,v_4),(s,v_2)\} J=\{e_7,e_6,e_5,e_4,e_2\}=\{(v_4,t),(v_5,v_4),(v_3,v_5),(v_2,v_4),(s,v_2)\} 中包含了一条到 ss 的路径， \tilde{\bm{y}}=(0,0,0,0,0,0)\tilde{\bm{y}}=(0,0,0,0,0,0) 。

我们获得最终的最短路 \bm f=(0,1,0,0,1,1,1,0)^\top\bm f=(0,1,0,0,1,1,1,0)^\top ，最短路径长为 \bm{c}^\top\bm f=y_s=6\bm{c}^\top\bm f=y_s=6 。

注意到两个事实：首先， JJ 中之前加入的元素会一直留在其中；

其次， \tilde{\bm y}\tilde{\bm y} 中更新的元素仅取决于 JJ 中新加入的边（的端点），所以我们每次只关心新加入的边就行。

因此，可以稍微把上面的算法改写一下，设 KK 代表“ \tilde{\bm {y}}\tilde{\bm {y}} 中对应元素为 0 的顶点集合”，\begin{array}{l} \textbf{Algorithm:}\\ \hline \bm y\leftarrow\bm 0\\ K\leftarrow \{v_n\}\\ \textbf{while}\;v_1\not\in K\;\textbf{do:}\\ \quad \theta\leftarrow \min\{c_{ij}-(y_i-y_j)\,|\,v_i\in V/K,v_j\in K,e_{ij}\in E\}\\ \quad I^*\leftarrow \{i^*\,|\,i^*,j^*\text{ 是使得上一步最小值能取到的 } i,j\}\\ \quad\textbf{for}\;v_i\in V/K\;\textbf{do:}\\ \quad\quad y_i\leftarrow y_i+\theta\\ \quad K\leftarrow K\cup \{v_{i^*}|i^*\in I^*\}\\ \mathbf{return}\;y_1 \end{array}\begin{array}{l} \textbf{Algorithm:}\\ \hline \bm y\leftarrow\bm 0\\ K\leftarrow \{v_n\}\\ \textbf{while}\;v_1\not\in K\;\textbf{do:}\\ \quad \theta\leftarrow \min\{c_{ij}-(y_i-y_j)\,|\,v_i\in V/K,v_j\in K,e_{ij}\in E\}\\ \quad I^*\leftarrow \{i^*\,|\,i^*,j^*\text{ 是使得上一步最小值能取到的 } i,j\}\\ \quad\textbf{for}\;v_i\in V/K\;\textbf{do:}\\ \quad\quad y_i\leftarrow y_i+\theta\\ \quad K\leftarrow K\cup \{v_{i^*}|i^*\in I^*\}\\ \mathbf{return}\;y_1 \end{array} 看起来有点熟悉了？

这其实就是在做 Dijkstra 算法做的事情 :-) 在刚才的例子中， \bm{y}\bm{y} 的取值变化是：\begin{array}{c|cccccc} \text{iter}&y_1&y_2&y_3&y_4&y_5&y_6\\ 0& 0& 0& 0& 0& 0& 0\\ 1&2& 2& 2& 2& 2& 0\\ 2& 4& 4& 4& 2& 4 & 0\\ 3& 5 & 5& 5& 2& 4& 0\\ 4& 6& 5& 5& 2& 4& 0 \end{array}\begin{array}{c|cccccc} \text{iter}&y_1&y_2&y_3&y_4&y_5&y_6\\ 0& 0& 0& 0& 0& 0& 0\\ 1&2& 2& 2& 2& 2& 0\\ 2& 4& 4& 4& 2& 4 & 0\\ 3& 5 & 5& 5& 2& 4& 0\\ 4& 6& 5& 5& 2& 4& 0 \end{array} 这其实就是我们熟悉的 Dijkstra 算法的流程，只不过是从终点往起点反向寻找一条路径。

上面 y_iy_i 代表终点（也就是 v_6v_6 ）到顶点 v_iv_i 的距离的下界，而 \tilde{\bm{y}}\tilde{\bm{y}} （集合 KK ）代表这些下界中有哪些值是“紧”的， 亦即， \tilde{y}_i=0\tilde{y}_i=0 （ v_i\in Kv_i\in K ）代表 v_6v_6 到 v_iv_i 的距离可以取到下界 y_iy_i ；

因此， v_i\in V/Kv_i\in V/K 代表 y_iy_i 这个下界是“松”的，算法中 \textbf{for}\textbf{for} 循环干的事情是更新所有“松”的下界， \theta\theta 就是其中最小的一个 gap，也就是允许在 \tilde{\bm{y}}\tilde{\bm{y}} 方向上允许走的最大步长。

**图片**:

![](https://picx.zhimg.com/50/v2-aecb2dd5a345af852b235931720da72d_720w.jpg?source=2c26e567)

![](https://picx.zhimg.com/50/v2-c2a48555165772779dcc9b4047459704_720w.jpg?source=2c26e567)

![](https://picx.zhimg.com/50/v2-7349a7cf696cbd569a3d30d0e543ec3e_720w.jpg?source=2c26e567)

![](https://pic1.zhimg.com/50/v2-481e3f14dd362969446713bd660f16e9_720w.jpg?source=2c26e567)
