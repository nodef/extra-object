An [object] is a collection of properties, with associated values. [:running:] [:vhs:] [:package:] [:moon:] [:ledger:]

Methods as separate packages:
- `@extra-array/swap`: use [rollup] to bundle this es module.
- `@extra-array/swap.min`: use in browser ([browserify], [uglify-js]).

Methods look like:
- `swap()`: doesn't modify the array itself (pure).
- `swap$()`: modifies the array itself (update).

Some methods accept a map function for *faster comparision* (like [unique]).
I find the map-approach beautiful, which i learned from Haskell's `sortOn()`.
You can notice that i have followed Javascript naming scheme as far as possible.
Some names are borrowed from Haskell, Python, Java, Processing.

> Stability: Experimental.

```javascript
const array = require('extra-array');
// import * as array from 'extra-array';
// import * as array from 'https://unpkg.com/extra-array@2.8.22/index.mjs'; (deno)

var x = [1, 2, 3];
array.get(x, -1);
// 3

var x = [1, 2, 3, 4];
array.swap(x, 0, 1);
// [2, 1, 3, 4]

var x = [1, 2, 3, 4];
array.rotate(x, 1);
// [4, 1, 2, 3]

var x = [1, 3, 5, 7];
array.bsearch(x, 5);
// 2           ^ found

[...array.permutations([1, 2, 3])];
// [
//   [],          [ 1 ],
//   [ 2 ],       [ 3 ],
//   [ 1, 2 ],    [ 1, 3 ],
//   [ 2, 1 ],    [ 2, 3 ],
//   [ 3, 1 ],    [ 3, 2 ],
//   [ 1, 2, 3 ], [ 1, 3, 2 ],
//   [ 2, 1, 3 ], [ 2, 3, 1 ],
//   [ 3, 1, 2 ], [ 3, 2, 1 ]
// ]
```

### reference

| Method                | Action
|-----------------------|-------
| [is]                  | Checks if value is array.
| [get]                 | Gets value at index.
| [set]                 | Sets value at index.
| [swap]                | Exchanges two values.
| [index]               | Gets zero-based index.
| [indexRange]          | Gets index range of part of array.
| [size]                | Gets size of part of array.
|                       | 
| [fill]                | Fills with given value.
| [copy]                | Copies part of array to another.
| [concat]              | Appends arrays together.
| [slice]               | Gets a part of array.
| [splice]              | Removes or replaces existing values.
| [flat]                | Flattens nested array to given depth.
| [cut]                 | Breaks array at given indices.
| [chunk]               | Breaks array into chunks of given size.
| [cycle]               | Gives values that cycle through array.
| [repeat]              | Repeats an array given times.
| [reverse]             | Reverses the values.
| [rotate]              | Rotates values in array.
| [interleave]          | Merges values from arrays.
|                       | 
| [min]                 | Finds smallest value.
| [max]                 | Finds largest value.
| [range]               | Finds smallest and largest values.
| [map]                 | Updates values based on map function.
| [filter]              | Keeps values which pass a test.
| [count]               | Counts values which satisfy a test.
| [partition]           | Segregates values by test result.
| [group]               | Breaks array keeping similar values together.
| [split]               | Breaks array considering test as separator.
| [zip]                 | Combines values from arrays.
|                       | 
| [unique]              | Removes duplicate values.
| [union]               | Gives values present in any array.
| [intersection]        | Gives values present in both arrays.
| [difference]          | Gives values of array not present in another.
| [isUnique]            | Checks if there are no duplicate values.
| [isDisjoint]          | Checks if arrays have no value in common.
|                       | 
| [value]               | Picks an arbitrary value.
| [prefix]              | Picks an arbitrary prefix.
| [infix]               | Picks an arbitrary infix.
| [suffix]              | Picks an arbitrary suffix.
| [subsequence]         | Picks an arbitrary subsequence.
| [permutation]         | Picks an arbitrary permutation.
|                       | 
| [isEqual]             | Checks if two arrays are equal.
| [compare]             | Compares two arrays.
| [search]              | Searches a value from left.
| [bsearch]             | Binary searches leftmost value in sorted array.
| [find]                | Finds first value passing a test.
| [findIndex]           | Finds index of leftmost value passing a test.
| [sort]                | Arranges values in an order.

<br>

[![nodef](https://merferry.glitch.me/card/extra-array.svg)](https://nodef.github.io)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[browserify]: https://www.npmjs.com/package/browserify
[rollup]: https://www.npmjs.com/package/rollup
[uglify-js]: https://www.npmjs.com/package/uglify-js
