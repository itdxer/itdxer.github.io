---
title: "Three solutions to the Putnam's 2006 statistical problem"
date: 2020-10-18
layout: post


description: "Three solutions to one of the problems from the Putnam's exam."



tags: ['math', 'puzzle', 'statistics']

comments: true
share: true
---



Putnam's 2006 exam included the following statistical problem

> Let \\(S={1,2,...,n}\\) for some integer \\(n>1\\). Say a permutation \\(π\\)
of \\(S\\) has alocal maximum at \\(k∈S\\) if
>
> 1. \\(π(k)>π(k+1)\\) for \\(k=1\\);
> 2. \\(π(k−1)<π(k)\\) and \\(π(k)>π(k+1)\\) for \\(1<k<n\\);
> 3. \\(π(k−1)<π(k)\\) for \\(k=n\\).
>
> (For example, if \\(n=5\\) and \\(π\\) takes values at 1,2,3,4,5 of 2,1,4,5,3,
then \\(π\\) has a local maximum of 2 at \\(k=1\\),  and a local maximum of 5 at
\\(k=4.\\)) What is the average number of local maxima of a permutation of
\\(S\\), averaging over all permutations of \\(S\\)?



## Intuitive solution



The problem gets simplified significantly when we realize that each permutation
is equally likely. The last statement asks to produce expectation as the
"averaging over all permutations of \\(𝑆\\)" which means that each permutation
will be used only once in the average which is the same as saying that each
permutation is equally likely.

The problem can be simplified by focusing our attention on short subsequences
within the sequence. Initially, we can look at the positions \\(i = 2, 3,
\ldots, n - 1 \, \forall \, n \ge 3 \\) and observe number \\(a_i\\) along with
its neighbours, namely \\(a_{i-1}\\) and \\(a_{i+1}\\). We know that these
numbers are all different by definition. And because each permutation is equally
likely the largest among these number will appear one third of the time in the
middle which will produce local maximum and the other two thirds of the time it
will be at \\(a_{i-1}\\) or \\(a_{i+1}\\) positions. This observation will be
true for any position in the sequence except the first and last most places. In
left and right most positions we always have only one neighbour and it's always
greater or smaller compare to the observed position. This means that there is a
50% chance of getting a local maximum and 50% change of getting a local minimum.
Since we know the probability of getting a local maximum per each position we
can combine this information and calculate the average number of local maximums
per sequence.

\\(E = (n - 2) \cdot \frac{1}{3} + 2 \cdot \frac{1}{2} = \frac{n+1}{3}\\)

We can also see that the average number of local maximas is also equal to the
average number of local minimums, since we can easily replace each number
\\(a_i\\) with the number \\(n - a_i\\). This trick will allow us to replace
each local maxima with local minima. It's an interesting observation, since it
indicates that there is an equal amount of local maximas and minimas, but there
are slightly less non extremum points on average. It happens because of the bias
introduced by the left most and right most points. These points cannot be non-
extremum points, so they have to be either local minimas or maximas.

Basically, in the sequence there are \\(\frac{n+1}{3}\\) local maximas,
\\(\frac{n+1}{3}\\) local minimas and \\(\frac{n-2}{3}\\) non extremum points.



## Improved intuitive solution



Solution above is rather simple, but it's not very pretty since in each sequence
there are always two exceptions that have a slightly different behaviour by
definition since they cannot be extremums.

The problem could be redefined in much nicer way. We can modify each sequence by
adding 0 to the beginning and to the end of it. For example, sequence `4, 2, 1,
3` will be converted to `0, 4, 2, 1, 3, 0`. Note that this trick increased
number of digits in the sequence, but it didn't change number of local maximas
in it. Zero cannot force it's neighbor to change from local maximum to non-
maximum since it's always smaller than its neighbour. It also cannot create
local maximum from non-maximum since if the number wasn't a local maximum before
then it means that it's other neighbor is larger and therefore the value cannot
become local maximum.

Next, instead of looking at the linear sequence we can write these numbers along
the circumference of the circle such that the order of the sequences is
preserved. And on the circle we will write one zero on top of the other so that
there will remain only one zero. This will allow us to view each sequence as a
circular sequence. Notice that this trick didn't change the number of local
maximas; each number has exactly the same neighbours as before.

Each possible sequence could be converted to a circular sequence by adding extra
zero and it's easy to show that these sequences are unique, meaning that there
is always one circular sequence which could be converted back to the unique
sequence from the original set. All we need to do is just split circular
sequence at zero and read it clockwise or counterclockwise, depending in which
way it was encoded.

Now imagine the following process, we randomly sample a circular sequence, write
it on the wheel with a pointer on it and rotate it. When it stops spinning we
can see at which number it points. We can look at the number and its neighbours
in order to decide whether it's larger than both of its neighbors or not. By
doing this procedure we will observe local maximums one third of the time by
using the same logic as in the previous Solution #1. And finally, we can
multiply the probability of getting a local maximum by playing the game by the
number of digits on the wheel, which is equal to \\(n+1\\) (plus one for the
additional 0 in the sequence). Multiplication will give us the same answer which
is \\(\frac{n+1}{3}\\). In fact, in the circular sequence, local maximas,
minimas and non-extream points have exactly the same probability and therefore
equal expected number of them in the sequence.

Another way to see why this is true is by noticing that in each sequence there
is always at least one global maxima which is equal to \\(n\\) and one global
minima - which is equal \\(1\\). When we add zero to the sequence it basically
replaces the role of the digit 1 and becomes a global minima and now 1 can be
either local minima or non-extream point.



## Mathematical solution



Another solution could be found mathematically by noticing a recursive pattern
in the sequence. We can assume that we start with all possible permutations of
the sequences \\(n-1\\) unique numbers. From the available permutations we can
generate all possible permutations of the sequences with \\(n\\) unique numbers
by adding \\(n\\) in each sequence to every possible position. For example, from
the sequence `1, 3, 2` we can create 4 new sequences by adding number 4 in every
possible position and we will get `4, 1, 3, 2`, `1, 4, 3, 2`, `1, 3, 4, 2` and
`1, 3, 2, 4`. Notice that it doesn't matter where we put the largest number in
the sequence, it will always be a global maximum. The new number will either be
added between numbers that aren't local maximas or near numbers where one of
them is local maxima (but never both). Basically, the new number will either add
one local maxima to the sequence or won't change the number of local maximas (it
will absorb one of the existing maximas).

Let's define \\(s_{n}\\) as a random sequence. We can imagine that there is a
deterministic function \\(l(s_{n})\\) that takes a sequence as an input and
returns a number of maximas in it. The expected number of local maximas can be
defined as \\(\mathbb{E}[l(s_n)]\\). By the law of total expectation we can
rewrite expectation in the following way

$$
\mathbb{E}[l(s_n)] = \mathbb{E}[\mathbb{E}[l(s_n)|s_{n-1}]]
$$

The conditional expectation is much simpler since by the recursive definition we
assume that the number of local maximas is known for the \\(s_{n-1}\\) sequence.
Also, we know that the new number either increases the number of local maximas
by one or doesn't change it at all. In addition, we know that the number of
local maximas doesn't change when a new number is being added near one of the
maximas (and there is always at least one in each sequence). We assume that
there are \\(m=l(s_{n-1})\\) local maximas in the \\(s_{n-1}\\) sequence which
means that there are \\(2m\\) places where we can add a new number \\(n\\)
without changing number of local maximas and \\(n-2m\\) places where number of
local maximas will increase. Therefore

$$
\begin{align}
\mathbb{E}[l(s_n)|s_{n-1}] &= \frac{2\,l(s_{n-1})}{n} l(s_{n-1}) + \left(1 -
\frac{2\,l(s_{n-1})}{n}\right) (l(s_{n-1}) + 1) \\
&= \frac{n-2}{n}l(s_{n-1}) + 1 \\
\end{align}
$$

And by the linearity of the expectation we can see the recursive dependency
between expectations

$$
\begin{align}
\mathbb{E}[l(s_n)] &= \mathbb{E}[\mathbb{E}[l(s_n)|s_{n-1}]] \\
                   &= \frac{n-2}{n}\mathbb{E}[l(s_{n-1})] + 1
\end{align}
$$

And finally, we can prove by induction that the valid formula for expectation is

$$
\mathbb{E}[l(s_n)] = \frac{n+1}{3}
$$

1. We know that \\(\mathbb{E}[l(s_2)] = 1\\)
2. Let's assume \\(\mathbb{E}[l(s_n)] = \frac{n+1}{3}\\)
3. We can show that the same holds for the \\(\mathbb{E}[l(s_{n+1})]\\)

$$
\begin{align}
\mathbb{E}[l(s_{n+1})] &= \mathbb{E}[\mathbb{E}[l(s_{n+1})|s_{n}]] \\
                       &= \frac{n-1}{n+1}\mathbb{E}[l(s_{n})] + 1 \\
                       &= \frac{n-1}{n+1} \, \frac{n+1}{3} + 1 \\
                       &= \frac{n+2}{3} \\
\end{align}
$$





