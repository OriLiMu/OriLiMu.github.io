---
title: Leetcode上面有哪些错题?
date: 2026-01-11 23:20:59
categories: 算法文章
---

# Leetcode上面有哪些错题？

126. Word Ladder II官方题解被我给叉了，复杂度是错的。讨论区一堆高票跟着中枪，基本团灭。

题本身是能做的。

一个数据团灭所有bfs代码(包括官方题解)update. 后来官方把数据范围改小了若干次，发现还是有很多高票能被叉掉，最终弃疗了。

39. Combination Sum官方题解超时，没有标准输出。

我测了一下国服题解区的高票，没见到哪个dfs能跑出来的。

历经千辛万苦终于从美服找到了一个能跑出来这个数据的代码。

题本身是能做的，不过纯用dfs的话可能比较困难。

963. Minimum Area Rectangle II官方题解的复杂度分析是错的，讨论区应该有很多人不知道自己算法的实际复杂度是多少(各种枚举所有矩形的算法，包括US的前两名高票)。

据我所知这个问题应该还是open的(划掉，已经被解决了)，输入点在 \mathbb{R}^2\mathbb{R}^2 内的话总矩形数量的已知上界是 O(n^{5/2})O(n^{5/2})，下界是 \Omega(n^2\log n)\Omega(n^2\log n) [1]。

题本身是能做的，不枚举所有矩形的话可以 O(n^2)O(n^2) 复杂度。

update. 仔细看了下那篇paper的journal version，官方题解的复杂度是对的，确实是 \Theta(n^2\log n)\Theta(n^2\log n) (不过分析是错的)。

正确的上界证明来自[Sharir'89, Personal communication]，似乎不好找(Sharir paper太多了...)。

\Omega(n^2\log n)\Omega(n^2\log n) 的下界对整数坐标也成立，因为最坏情况是正方形格点。

1675. Minimize Deviation in Array大部分人的做法应该都是 O(n\log n\log U)O(n\log n\log U) 的复杂度。

我构造了一个合法的极限数据叉掉了评论区里的若干高票并反馈给leetcode官方，但官方选择把这个做法放过去了，使我非常怀疑官方做法也是这个复杂度。

这个题本身也是能做的，不过就没那么简单了。

O(n)题解1638. Count Substrings That Differ by One Character这题的英文题目描述应该是错的，中文版半错半对，就特别离谱。

我提过一个issue，不过官方表示没有问题。

得找个会算法的native speaker验证一下...因为题目描述中有“In other words”的存在，题意算上中英文版和样例一共有5种理解：以输入 s = "aba", t = "baba"为例，按英文前半部分的意思答案为3(第一个a->b，第二个a->b，b->a)，英文后半部分的意思答案也为3(第一个a，第二个a，b；

但和英文前半部分的意思不等价)。

中文前半部分的意思等价于英文后半部分，而中文后半部分的意思答案为6。样例输出为6(等价于中文后半部分)。

问题是这几种方式理解出来的题目难度会相差较大...2117. Abbreviating the Product of a Range这题的绝大部分代码(包括标程)都存在精度问题。

我测试了比赛中前150名内的所有C++选手，仅有一人幸存。

关于这些困难的数据是如何生成的，以及误差分析的一些知识，可以看我的这篇文章。

update. 数据被改小了，但是仍然需要比较细心地处理精度才能通过本题。

还有些数据范围不明确的题，还是以 126.Word Ladder II 为例，可以构造输入范围内的合法数据使标程OLE，导致没有标准输出。

363. Max Sum of Rectangle No Larger Than K 在前段时间可以构造输入范围内的合法数据使标程TLE，同样导致没有标准输出。

不过现在似乎修好了，官方把数据范围缩小了一点。

当时截了个图：301. Remove Invalid Parentheses 以前有OLE相关的问题，现在把数据范围缩小之后修好了。

历史遗迹472. Concatenated Words经评论区提醒加上这个。

以前老题是没有数据范围的，现在感觉数据范围被改大了，以前的代码在最坏数据下都过不了了，并且存在让标程超时无输出的极限数据。

现在CN站官方题解的前半部分也是有问题的(指数级复杂度)。

我在github上交了个issue，原post在这里(消失了)。如果你成为了高票，那你就不会出错了。

这个题本身还是能做的，不过我不知道足够简单的做法。

我知道的大概能过的办法有如下几种：O(m\cdot \ell)O(m\cdot \ell) 的DP+trie，其中 mm 为字符串总长度， \ell\ell 为单个字符串最大长度。

这样是一亿的复杂度，单点数据能过，但数据组数上去了的话有超时的风险。参见目前CN站排名第一的C++代码。

(US站第一是我针对数据写的 O(m\cdot \ell^2)O(m\cdot \ell^2) 记忆化搜索+hash，偷懒用的标准库hash函数所以会多个 O(\ell)O(\ell) 。

当时的数据 \ell\ell 是很小的，现在已经跪了)2. O(m\cdot \frac{\ell}{w})O(m\cdot \frac{\ell}{w}) 的AC自动机+压位，可以看这里。

3. O(m\cdot \sqrt{m})O(m\cdot \sqrt{m}) 的AC自动机，复杂度分析见Chao Xu的post。

这个算法可以解决该问题的优化版本(对每个word求出最少能用几个words拼成)。

4. 这题的最快复杂度是Bringmann et al.的 \tilde{O}(n^{4/3})\tilde{O}(n^{4/3}) [2]，并且有match的conditional lower bound。

不过需要用到FFT所以实际不会太快。

顺便提一句，我们的paper可以在同样的复杂度内解决该问题的优化版本。

756. Pyramid Transition Matrix这个题可以用来模拟 O(n)O(n) 个格子，运行 O(n)O(n) 步的非确定性图灵机，所以是NPC的，除了搜索之外大概也没什么好办法。

@灵剑 给出了几组让标程超时的数据，使得没有标准输出。可以看这里。题本身并不难，应该是标程没写好。

update. 现在数据被改小了。

913. Cat and Mouse这题的官方题解被人叉掉了。

老鼠的最优移动路线是有可能重复经过一个点的，所以可能需要判断超过 2n2n 步(或许最坏情况是 \Omega(n^2)\Omega(n^2) 步级别的，但不容易找到具体的例子)。

如果修正这一点的话复杂度又会太高，变成了 O(n^5)O(n^5) 。

题本身是可做的，有 O(nm)O(nm) 的拓扑排序算法，关于状态图的大小线性。

2013. Detect Squares这题答案会爆int... 然而int的返回值类型都已经给我们写好了，所以也没人注意。

提了个issue.这个数据其实是合法的，只是标程炸了所以强行“invalid”了。

solution.cpp: 我规定让我出错的数据都是错的，所以我一定是对的。update. 数据被改小了。

2040. Kth Smallest Product of Two Sorted Arrays也曾经有溢出的问题。

10. Regular Expression Matching好多人偷懒用了正则表达式，但很多语言都会有性能问题。

顺便把官方标程也给叉掉了，跑不出答案。题本身是能做的。国服标程无输出。美服直接连空代码都返回TLE了。

更新：现在国服的官方题解是对的了。

2307. Check for Contradictions in Equations这题有不可避免的精度问题。

虽然题目描述中有绝对误差小于1e-5则视为相等的描述，但这事实上并不能对解决精度问题产生任何帮助，因为判断1和1+1e-5是否相等时仍然会对精度十分敏感。

我在github上交了四个数据，没有任何已知代码能够全部通过它们。

官方回复于是官方又试图通过对输入数据的小数点后位数进行限制来解决精度问题，但这仍然是治标不治本。

更新：后来他们加了这一条。

p.s. 可能有同学好奇这题的困难数据是怎么造出来的。

可以通过解一个近似子集和问题来造出一个乘积约等于1+1e-5的环，大概取 2^{O(\sqrt{\log1/\epsilon})}2^{O(\sqrt{\log1/\epsilon})} 个数字就可以造出一个困难的数据了。

843. Guess the Word经评论区提醒补充上这个。对于最坏数据是没法在十次之内猜出来的。

另外还有几个猜东西的交互题也是在最坏情况下没法做的，但是有的题说了输入数据随机，就没问题了。

另外还有一些“很容易做错的题”，顺便也提一下，不知道题的实际难度是否符合出题人的原始意图：1705. Maximum Number of Eaten Apples讨论区存在大量错误的贪心算法。

我试着叉了一些，不确定有没有漏网之鱼。

44. Wildcard Matching老原题了，hdu3901。有大量题解用的是kmp，复杂度是错的。

AC自动机应该只能做到 O(\#\mathrm{wildcards}\cdot n)O(\#\mathrm{wildcards}\cdot n) 。

网上有大量假的题解...488. Zuma Game这题原来的数据很弱，绝大多数AC代码都是错的或者会超时，我叉掉了几百份代码吧。

其实老老实实搜索就可以过了，别加奇奇怪怪的剪枝，会自作聪明。

1240. Tiling a Rectangle with the Fewest Squares不少人用了各种奇怪的DP方法来做这个题。

目前没有DP做法是已经被证明正确的，事实上题解区里的绝大多数DP在n足够大时都已经被找到了反例，只是本题数据范围太小， n\leq 13n\leq 13 时不存在反例。

本题是否是NP-hard的还是未知状态。

这引申出了一个有趣的问题，一个渐近意义下错误，但在题设范围内不存在反例的算法能被称为是“正确算法”么？

1521. Find a Value of a Mysterious Function Closest to Target之前有大量水过的贪心算法，排名前几的code全是错的。

我交了一堆数据叉掉了一片之后现在数据强度应该够了(不过榜过了这么久还没更新，现在us站排名第二三和cn站排名第二的代码还是错的)。

我的O(n)题解update. 光速打脸，又发现两条漏网之鱼。那我再交几个数据吧。

笑死。这份代码是错的。

参考^Van Kreveld M J, De Berg M T. Finding squares and rectangles in sets of points[J]. BIT Numerical Mathematics, 1991, 31(2): 202-219.^Bringmann K, Grønlund A, Larsen K G. A dichotomy for regular expression membership testing[C]//2017 IEEE 58th Annual Symposium on Foundations of Computer Science (FOCS). IEEE, 2017: 307-318.

**图片**:

![](https://picx.zhimg.com/50/v2-2bd50d30c594a281a061f4920f11dcde_720w.jpg?source=2c26e567)

![](https://pic1.zhimg.com/50/v2-e7664db4fe143156c990fc49b01f3ef0_720w.jpg?source=2c26e567)

![](https://pica.zhimg.com/50/v2-1ccad058c331474d46dbc62ba083980c_720w.jpg?source=2c26e567)

![](https://pica.zhimg.com/50/v2-8379eac8c8195b354b4946c8b81518b8_720w.jpg?source=2c26e567)

![](https://pic1.zhimg.com/50/v2-3276d05d4c783c617672e93a435b6180_720w.jpg?source=2c26e567)

![](https://picx.zhimg.com/50/v2-1b492dddc19e7fb403868ab5a7b00d86_720w.jpg?source=2c26e567)

![](https://pica.zhimg.com/50/v2-975e9720c35650aec9d91dfad13906dc_720w.jpg?source=2c26e567)

![](https://pica.zhimg.com/50/v2-e9dd685c695a44cbb42e6942bdc2fe66_720w.jpg?source=2c26e567)

![](https://pic1.zhimg.com/50/v2-291111e095e590939c668cfc467ed9f8_720w.jpg?source=2c26e567)

![](https://pica.zhimg.com/50/v2-c841aa7d228d8aaf7491490ad4a5a1de_720w.jpg?source=2c26e567)

![](https://picx.zhimg.com/50/v2-b0b277fd589a2499e5dc58a3bcaba7eb_720w.jpg?source=2c26e567)

![](https://picx.zhimg.com/50/v2-2f583f140cddf9a5ba88f932822027ab_720w.jpg?source=2c26e567)

![](https://pica.zhimg.com/50/v2-4ea75f0eab3ddc44a0b8c7a14fdd32e5_720w.jpg?source=2c26e567)

![](https://pic1.zhimg.com/50/v2-b26a6128a141857d0e91630d49ff79dc_720w.jpg?source=2c26e567)
