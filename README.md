An [object] is a collection of properties, with associated values. [:running:] [:vhs:] [:package:] [:moon:] [:ledger:]

Methods as separate packages:
- `@extra-object/swap`: use [rollup] to bundle this es module.
- `@extra-object/swap.min`: use in browser ([browserify], [uglify-js]).

Methods look like:
- `swap()`: doesn't modify the object itself (pure).
- `swap$()`: modifies the object itself (update).

Some note i will fill up later.

> Stability: Experimental.

```javascript
const object = require('extra-object');
// import * as object from 'extra-object';
// import * as object from 'https://unpkg.com/extra-object@2.0.130/index.mjs'; (deno)

var x = {a: 1, b: 2, c: 3, d: 4};
object.swap(x, 'a', 'b');
// { a: 2, b: 1, c: 3, d: 4 }

var x = {a: 1, b: 2, c: 3, d: 4};
var y = {b: 20, c: 30, e: 50};
object.intersection(x, y);
// { b: 2, c: 3 }

var x = {a: 1, b: 2, c: 3, d: -2};
object.searchAll(x, v => Math.abs(v) === 2);
// [ 'b', 'd' ]

var x = {a: 1, b: 2, c: 3};
[...object.subobjects(x)];
// [
//   {},
//   { a: 1 },
//   { b: 2 },
//   { a: 1, b: 2 },
//   { c: 3 },
//   { a: 1, c: 3 },
//   { b: 2, c: 3 },
//   { a: 1, b: 2, c: 3 }
// ]
```

### reference

| Method                | Action
|-----------------------|-------
| [is]                  | Checks if value is array.
| [swap]                | Exchanges two values.
| [size]                | Gets size of part of array.
|                       | 
| [concat]              | Appends arrays together.
| [flat]                | Flattens nested array to given depth.
| [chunk]               | Breaks array into chunks of given size.
|                       | 
| [min]                 | Finds smallest value.
| [max]                 | Finds largest value.
| [range]               | Finds smallest and largest values.
| [filter]              | Keeps values which pass a test.
| [count]               | Counts values which satisfy a test.
| [partition]           | Segregates values by test result.
| [zip]                 | Combines values from arrays.
|                       | 
| [union]               | Gives values present in any array.
| [intersection]        | Gives values present in both arrays.
| [difference]          | Gives values of array not present in another.
| [symmetricDifference] | Gives values of array not present in another.
| [isDisjoint]          | Checks if arrays have no value in common.
|                       | 
| [key]                 | Picks an arbitrary value.
| [value]               | Picks an arbitrary value.
| [entry]               | Picks an arbitrary prefix.
| [subobject]           | Picks an arbitrary subsequence.
|                       | 
| [isEqual]             | Checks if two arrays are equal.
| [compare]             | Compares two arrays.
| [search]              | Searches a value from left.
| [find]                | Finds first value passing a test.

<br>

[![nodef](https://merferry.glitch.me/card/extra-array.svg)](https://nodef.github.io)

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[browserify]: https://www.npmjs.com/package/browserify
[rollup]: https://www.npmjs.com/package/rollup
[uglify-js]: https://www.npmjs.com/package/uglify-js
