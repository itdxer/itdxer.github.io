---
title: "Knuth's numbers and impractical memory devices"
date: 2021-10-10
layout: post


description: "In this article, I will show that many of the properties of the Knuth's numbers can be understood by imagining a rather impractical memory device which can be directly connected to the Knuth's numbers. In addition, the recursive construction process of the numbers can tell us how to create such a device."



tags: ['math']

comments: true
share: true
---



I've encountered Knuth's numbers in the "Concrete Mathematics: A Foundation for
Computer Science" book by Ronald Graham, Donald Knuth and Oren Patashnik. In the
book, the numbers are being defined by the following recurrence relation:

$$
\begin{align}
K_{n+1} = 1 + \min \left(2K_{\left\lfloor{\frac{n}{2}}\right\rfloor},
3K_{\left\lfloor{\frac{n}{3}}\right\rfloor}\right)
\end{align}
$$

with \\(K_0=1\\).

The sequence of these numbers can be found on OEIS
[A007448](http://oeis.org/A007448) and starts with the following terms

```
1, 3, 3, 4, 7, 7, 7, 9, 9, 10, 13, 13, 13, 15, 15, 19, 19, 19, 19, 21, 21, 22,
27, 27, 27, 27, 27, 28, 31, 31, 31, 39, 39, 39, 39, 39, 39, 39, 39, 40, 43, 43,
43, 45, 45, 46, 55, 55, 55, 55, 55, 55, 55, 55, 55, 57, 57, 58, 63, 63, 63, 63,
63, 64, 67, 67, 67, 79, 79, 79, 79, ...
```



Although the equation might look tedious and boring at the first glance I think
the sequence that it produces is far more interesting. From the few first terms
which were generated by the sequence it's not difficult to spot a few properties
which can be proven individually, but I believe that there is a better way to
understand the sequence. Shifting perspective can not only allow us to prove
some of the properties, but also discover new patterns.

In this article, I will show that many of the properties can be understood by
imagining a rather impractical memory device which can be directly connected to
the Knuth's numbers. In addition, the recursive construction process of the
numbers can tell us exactly how to create such a device.



## Memory devices







<style>
.center-block { 
}

.memory {
    margin: 0.5rem auto;
    width: auto !important;
    border: 0px solid black !important;
}

.memory td {
    width: 3rem !important;
    height: 3rem !important;
    text-align: center !important;
    
}
</style>




Before we get back to Knuth's numbers it might be important to start with the
overview of the simplest memory devices as well as their construction process
from a mathematical perspective. In the article, we're only interested in
theoretical devices which means that we should be encouraged to ignore the
complexities introduced by actual engineering.

In the remainder of the section we will focus on two most crucial properties of
the memory devices. Specifically, any memory device considered should be able to
have a specific state and allow an external device to retrieve it. Naturally,
the simplest memory device should be able to store two states represented by two
numbers, namely, 0 and 1. Such a device consists of a single binary cell and can
be represented in the following way.

<table class="memory center-block">
<tr>
<td>2</td>
</tr>
</table>

Multiple binary cells can be stacked together in order to create a memory device
which will be able to store more than two different states. For example, 4
binary cells can form the following device

<table class="memory center-block">
<tr>
<td>2</td>
<td>2</td>
<td>2</td>
<td>2</td>
</tr>
</table>

Each cell can have exactly two states and a specific combination of 0s and 1s
across all of the cells can represent a unique state. Since there are 4 cells it
means that overall such a memory device can have up to \\(2^4=16\\) states. Or a
bit more generally we can say that if a device consists of \\(N\\) binary cells
then it will be able to have up to \\(2^N\\) states.



Number of states can be increased for the fixed number of cells if we replace
each binary cell with a cell that can have more than two states. For example, we
can replace each binary cell with a trinary cell and if a device has 4 cells in
it then the device should be able to have up to \\(3^4=81\\) states.

<table class="memory center-block">
<tr>
<td>3</td>
<td>3</td>
<td>3</td>
<td>3</td>
</tr>
</table>

We can even start mixing binary and trinary cells.

<table class="memory center-block">
<tr>
<td>2</td>
<td>3</td>
<td>2</td>
<td>2</td>
<td>3</td>
</tr>
</table>

The device represented by the scheme above should be able to store up to \\(2^3
3^2 = 72\\) states and generally we can say that if the device consists of
\\(L\\) binary cells and \\(M\\) trinary cells then it should be able to store
up to \\(2^L 3^M\\) states. Notice that the formula suggests that actual order
between binary and trinary cells doesn't affect the maximum number of states
that such a device can have. Alternatively we can say that each device with
mixed binary and trinary cells can be represented as one binary memory device
(device that consists of only binary memory cells) and one trinary memory
device.



Up until this point we always estimated the upper bounds on the number of states
that each of the memory devices would be able to have. In fact, the estimates
are exact if we think that each of the devices represents a digit of the number
encoded in binary/ternary base or [mixed
radix](https://en.wikipedia.org/wiki/Mixed_radix). In other words, we can also
say that relation between cells is multiplicative with respect to the memory's
size. For example, in binary memory devices the total number of possible states
can be obtained by multiplying memory sizes of all of the individual cells
together. Multiplicative relations between cells makes them extremely practical
in real world applications, since memory size scales exponentially with respect
to the number of cells.

As opposed to multiplicative memory devices we can create additive memory
devices. Unlike in multiplicative memory devices, size of memory changes
additively with each additional cell. For example, we can create a memory device
that can have 4 distinct states and if we add one more binary cell to it the
device will be able to store 5 distinct states. Although the device doesn't
utilise cells efficiently it has its own useful property. Such a device can be
designed to have any desired number of states where with binary memory devices
it's only possible if the number happened to be a power of two. Additive memory
devices are easy to design (but perhaps difficult to build in practice). If one
wants to have a memory unit that stores exactly \\(N\\) distinct states then we
will need \\(N-1\\) binary cells to store it. If each cell stores 0 or 1 we just
have to count the number of cells that were set to 1 and the number will
represent the state in which the device is in. It's easy to see that such a
device will be able to store exactly \\(N\\) distinct states.

Everything described above will be needed in order to understand how Knuth's
number can be related to the memory devices. As we will see in the next section,
such a device combines multiplicative and additive memory devices into a single
device which uses properties of both.



## Mixing multiplicative and additive memory devices



### Adjusted Knuth's numbers
Before we continue, it will be important to add a small modification to the
sequence which will not affect the properties of the Knuth's numbers.
Specifically, it will be useful to subtract one from each of the numbers in the
sequence.

$$
P_{n} = K_{n} - 1
$$

or alternatively we can write it in the following way

$$
P_{n} = \min \left(2P_{\left\lfloor{\frac{n-1}{2}}\right\rfloor} + 2,
3P_{\left\lfloor{\frac{n-1}{3}}\right\rfloor} + 3\right)
$$

We will continue exploring properties of the "new" sequence, but the same
properties will be valid for the Knuth's numbers as well.





### Adjusted Knuth's number and memory device

In order to see the connection between the sequence and memory devices it might
be useful to unroll the recursions and look through a couple of examples.

$$
\begin{align}
P_{11} &= 3 \cdot 3 + 3 = 12 \\
P_{18} &= 2 \cdot 2 \cdot 3 + 2 \cdot 2 + 2 = 18 \\
P_{24} &= 2 \cdot 3 \cdot 3 + 2 \cdot 3 + 2 = 26 \\
P_{37} &= 2 \cdot 2 \cdot 2 \cdot 3 + 2 \cdot 2 \cdot 2 + 2 \cdot 2 + 2 = 38
\end{align}
$$

Notice that in formulas above each subsequent addend is 2 or 3 times less than
the previous one. This happens because of the way numbers are constructed which
is easy to see from the \\(P_n\\)'s recursive definition.

Numbers in each unrolled formula can be rearrange in the 2D grid. For example,
\\(P_{24}\\) can be written in the following way

<table class="memory center-block">
<tr>
<td>2</td>
<td>3</td>
<td>3</td>
</tr>
<tr>
<td>2</td>
<td>3</td>
</tr>
<tr>
<td>2</td>
</tr>
</table>

If you compare the grid to the \\(P_{24}\\) formula you can notice that each
addend occupies a separate row, meaning that the relation between numbers within
a row is multiplicative and relation between rows is additive. Perhaps it can
remind you of the discussion in the previous section. In fact, we can think that
each row is a multiplicative memory device, but each row relates to each other
as additive memory devices. Unlike in the examples in the previous section the
memory device defined by the grid above is a mixture between multiplicative and
additive memory devices. Because of the way the grid has been constructed, the
same construction process can be applied for any \\(P_n\\). Each memory device
will be arranged in the triangular grid with the following properties.

1. Each row has one less memory cell compared to the row above it.
2. Each column contains either binary or trinary memory cells, and never a
mixture of those.
3. Last most row has only one cell.



Although we can design a memory device for each \\(P_n\\) it is still not clear
what is the relation between the device and number \\(n\\). The main relation
can be understood from the following inequality \\(P_n \ge n \\) (See [Proof
1](#proof-1-p_n-ge-n-)). In other words, equality suggests that memory devices
with memory capacity \\(P_n\\) can always have at least \\(n\\) states. But it's
also obvious that there are infinitely many memory devices of this type that can
have at least \\(n\\) states which makes the property a bit less surprising.
What's actually interesting is that \\(P_n\\) is the memory size of the most
optimal memory device in the sense that there are no smaller memory devices that
follow previous defined construction and can have at least \\(n\\) states (See
[Proof 2](#proof-2-optimality)).






These two properties are actually very important since they indicate that if we
want to construct a memory device following our construction process then for
each \\(n\\) we can find how grid cells of the optimal memory device have to be
rearranged in order to build it. We can go back to the example of \\(P_{24}\\)
in order to better illustrate the point.

$$
P_{24} = 2 \cdot 3 \cdot 3 + 2 \cdot 3 + 2 = 26
$$

Notice that the first most addend contains all of the most important
information. The recursion has \\(\min\\) function that can be thought of as a
split point in the binary tree and within each step we either take a left pass
or the right pass. The sequence’s first addend \\(2 \cdot 3 \cdot 3\\) says that
recursion goes first through the left brand and then twice through the right
branch (it's important that the order between numbers is preserved when
recursion is being unrolled). This gives us the first row in the memory device
grid

<table class="memory center-block">
<tr>
<td>2</td>
<td>3</td>
<td>3</td>
</tr>
</table>

And all of the subsequent rows can be reconstructed from the first row. We only
have to copy the bottom most row, remove the last most cell and add it below the
last row. The process should be repeated until we get a row with a single cell
in it.

<table class="memory center-block">
<tr>
<td>2</td>
<td>3</td>
<td>3</td>
</tr>
<tr>
<td>2</td>
<td>3</td>
</tr>
<tr>
<td>2</td>
</tr>
</table>





### Sorting out details

Some of the readers might have noticed a difficulty associated with the additive
property between rows. If you try making such a device and adding states across
all rows then you might notice that memory size is smaller compared to the value
of the \\(P_n\\). It's probably easier to see from the example. Let's say that
we want to store 6 states and the recursive formula tells us that \\(P_6 = 2
\cdot 2 + 2 = 6\\)

<table class="memory center-block">
<tr>
<td>2</td>
<td>2</td>
</tr>
<tr>
<td>2</td>
</tr>
</table>

The first row can store states 0, 1, 2, 3 and the second row can store only 0
and 1. If we store these numbers as we do in binary memory devices and just
simply add them together we can only get 5 different numbers (0, 1, 2, 3, 4)
rather than 6. This clearly creates a problem, but luckily, with slight
modifications to the way cells in the grid interact, we can make sure that
exactly \\(P_n\\) distinct numbers can be stored.



In order to show how this problem can be resolved we can imagine that we have a
simple computer program that reads a number from the memory, increments it by 1
and writes it back into the memory. We can execute the program for \\(P_n - 1\\)
iterations and show that with each iteration the memory device will have a
unique state.

1. We start with a memory where all cells are equal to zero which is the first
most state.
2. We create a pointer which points to a row in the memory device grid and set
it to 1 (first row)
3. We keep incrementing value in the row with the pointer on it until value
cannot be incremented further in which case we move to the next step.
4. There are two possible outcomes
   1. If the pointer points to the last row then we go to Step 5.
   2. Otherwise we increment the pointer, decrement the value in the first row
and increment the value in the row with the pointer and move to Step 3.
5. Continue incrementing the value in the first most row until the maximum
number is reached. When that happens, terminate the program.

The state can be extracted from the memory device in the following way. First we
need to find out what number is encoded in each row. Then we add them together
as before, but in addition to it we also add +1 for every non-zero state row
excluding the first one. The last part actually explains why we need to
decrement value in the first row in step (4.B). Equivalently we can say that the
first row encodes numbers \\(0, 1, 2, 3, ...\\) and each other row encodes
numbers \\(0, 2, 3, 4, ...\\) . This trick allows us to ensure that the memory
device can have exactly \\(P_n\\) distinct states. Also notice that in the step
(4.B) we will never reach 0 in the first row, since memory size of the first row
is much larger compared to the number of rows and therefore memory size of the
first row is always greater than the number of rows.





## Consequences

In the previous section we showed the relation between \\(P_n\\) numbers and
some special memory devices. Obviously, since \\(P_n\\) is one less than the
Knuth's number \\(K_n\\) the same findings can be applied to the Knuth's numbers
as well. We can state them explicitly

1. Lower bound: \\(K_n \ge n + 1\\)
2. Optimality: There are no other \\(m \lt n\\) such that \\(K_n \gt K_m \ge
n+1\\)

We can also give an interpretation to the \\(P_n + 1\\). For example, additional
1 can be represented by one more binary cell which encodes one extra state if we
decide to combine it additively with the memory device.

The connection between Knuth's numbers and memory devices is interesting by
itself, but it also can not only help us to discover and better understand some
of the other properties of the sequence.

### Repeated numbers and change points

The fact that \\(K_n\\) equals to the memory capacity of the optimal memory
device that can have at least \\(n\\) states instantly explains why do we
observe repeated streaks of numbers. It happens because some of the memory
devices will have larger memory capacity then \\(n\\) and therefore can be
reused for the cases when \\(n+1\\) distinct states should be encoded. For
example, \\(K_4=7\\) tells us that \\(K_5=K_6=7\\). Basically if
\\(K_{i-1}=b\\), \\(K_i=c\\) and \\(b \neq c\\), then \\(b=i\\), \\(K_{i} =
K_{i+1} = ... = K_{c-1} = c \\) and \\(K_{c-1} \lt K_{c}\\). Alternatively we
can say that the difference between two distinct numbers defines length of the
streaks.

### Short streaks and increasing density

Similar to the sequence of prime numbers, Knuth's numbers are much more sparse,
but there are infinitely many numbers that have constant gaps between them.
Specifically, there are infinitely many numbers \\(i\\) for which the following
equation holds \\(K_{i+1}-K_{i}=1\\). Sparseness can be easily measured by
taking some number \\(m\\) which would be equal to the number of cell in the top
most row and comparing the largest memory size that can be constructed with
\\(m\\) cells in the row (e.g. memory device with only trinary cells) to the
upper bound of the total number of the distinct memory devices.

Short streaks of length one can be easily constructed from any memory device
that has 2 in the first column and 3 in the second one. For example,

<table class="memory center-block">
<tr>
<td>2</td>
<td>3</td>
<td>...</td>
<td>...</td>
</tr>
<tr>
<td>2</td>
<td>3</td>
<td>...</td>
</tr>
<tr>
<td>2</td>
<td>3</td>
</tr>
<tr>
<td>2</td>
</tr>
</table>

And then we can replace numbers in the first column by 3 and in the second one
by 2.


<table class="memory center-block">
<tr>
<td>3</td>
<td>2</td>
<td>...</td>
<td>...</td>
</tr>
<tr>
<td>3</td>
<td>2</td>
<td>...</td>
</tr>
<tr>
<td>3</td>
<td>2</td>
</tr>
<tr>
<td>3</td>
</tr>
</table>

Notice that memory size only changed in the last most row and since it increased
by 1 the difference between memory sizes of these devices should be equal to 1.
Also, since we know that the construction is optimal it means that if the first
device can be associated with some number \\(K_{i}\\) (and perhaps with some
numbers \\(j\\) for sume \\(j < i\\)) then that second memory device has to be
associated with the number \\(K_{i+1}\\) (and that's the only number that can be
associated to it)

By following similar logic it can be shown that there are lots of different
pairs of numbers with constant size gaps between them and constriction of these
numbers would require having columns of specific type that can be swapped in
order to be able to get a second number of the pair.



## Proofs



### Proof 1: \\(P_n \ge n \\)

If we assume \\(k, m, n \in N\\) then result can be proved by applying strong
induction

1. \\(P_0 = 0\\) (e.g. \\(P_0 \ge 0\\))
2. Assume \\(P_k \ge k \, \forall \,  k \lt n\\)
3. In order to show that \\(P_n \ge n\\) we need to consider two cases

  $$
  \begin{align}
  P_{\left\lfloor{\frac{n-1}{2}}\right\rfloor} &\ge
\left\lfloor{\frac{n-1}{2}}\right\rfloor \\
  &= \begin{cases}
      m - 1,& \text{if } n = 2m \\
      m,              & \text{otherwise}
  \end{cases} \\
  &\ge \frac{n}{2} - 1 \\
  P_{\left\lfloor{\frac{n-1}{3}}\right\rfloor} &\ge
\left\lfloor{\frac{n-1}{3}}\right\rfloor \\
  &= \begin{cases}
      m - 1,& \text{if } n = 3m \\
      m,              & \text{otherwise}
  \end{cases} \\
  &\ge \frac{n}{3} - 1 \\
  \end{align}
  $$

  From the two inequalities above we can show

  $$
  \begin{align}
  2P_{\left\lfloor{\frac{n-1}{2}}\right\rfloor} + 2 &\ge n \\
  3P_{\left\lfloor{\frac{n-1}{3}}\right\rfloor} + 3 &\ge n \\
  \end{align}
  $$

  From the last two inequalities and definition of \\(P_n\\) it follows that

  $$
  P_{n} \ge n
  $$




### Proof 2: Optimality

Result can be proven by contradiction. Let's assume that we discovered first
\\(P_n\\) for which memory device construction is not optimal (\\(n \gt 0\\),
since \\(P_0\\) is optimal). This implies the following inequalities

$$
P_n = x \gt y \gt n
$$

where \\(x\\) is the size of the non optimal memory device and \\(y\\) is the
size of the most optimal memory device of the given construction.

Because of the way memory devices are being constructed there are two different
forms for \\(x\\) and \\(y\\) which means there are 4 different use cases that
we have to consider.

1. \\(x = 2x'+2\\) and \\(y = 2y'+2\\)
2. \\(x = 3x'+3\\) and \\(y = 3y'+3\\)
3. \\(x = 3x'+3\\) and \\(y = 2y'+2\\)
4. \\(x = 2x'+2\\) and \\(y = 3y'+3\\)

From Option 1 follows that

$$
P_{\left\lfloor{\frac{n-1}{2}}\right\rfloor} = x' \gt y' \gt \frac{n}{2} - 1
$$

We know that \\(y'\\) is an integer and equation on the right side can be a
fraction, which means that the equation can be rewritten without loss of
generality

$$
P_{\left\lfloor{\frac{n-1}{2}}\right\rfloor} = x' \gt y' \ge
\left\lfloor{\frac{n-1}{2}}\right\rfloor
$$

We assumed that \\(x\\) is a first nonoptimal value, but since we've shown that
\\(x'\\) is not optimal as well then \\(x\\) is not a first nonoptimal encoding
which means we got a contradiction. Exactly the same proof can be used for
option 2 except all of the 2 numbers will be replaced by 3.

Option 3 and 4 are not much more difficult, in fact just like with options 1 and
2 it's enough to prove option 3 and for option 4 prove is identical. From option
3 and \\(P_n\\) definition we know that

$$
P_n = x = 3x'+3 = \min(2x''+2, 3x'+3)
$$

From which it follows that

$$
2x''+2 \ge P_n = 3x'+3 \gt 2y'+2 \gt n
$$

And with \\(2x'' + 2 \gt 2y'+2 \gt n\\) we will arrive at the same contradiction
as in option 1 since \\(x'' = P_{\left\lfloor{\frac{n-1}{2}}\right\rfloor}\\).


