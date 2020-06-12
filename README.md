An [object] is a collection of properties, with associated values. [:running:] [:vhs:] [:package:] [:moon:] [:ledger:]

Methods as separate packages:
- `@extra-object/swap`: use [rollup] to bundle this es module.
- `@extra-object/swap.min`: use in browser ([browserify], [uglify-js]).

Methods look like:
- `swap()`: doesn't modify the object itself (pure).
- `swap$()`: modifies the object itself (update).

In the future when you think of just giving up on life, remember
that the letter was in your hands, the cab was at the gate, only
if you had thought about it once more, your entire life would
have been better. [(1)]

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
| [is]                  | Checks if value is object.
| [get]                 | Gets value at key.
| [set]                 | Sets value at key.
| [remove]              | Deletes an entry.
| [swap]                | Exchanges two values.
| [size]                | Gets size of object.
|                       | 
| [head]                | Gets first entry.
| [take]                | Keeps first n entries only.
| [shift]               | Removes first entry.
| [fromEntries]         | Creates object from entries.
|                       | 
| [concat]              | Combines entries from objects, preferring last.
| [flat]                | Flattens nested object to given depth.
| [chunk]               | Breaks object into chunks of given size.
| [filterAt]            | Gets object with given keys.
|                       | 
| [map]                 | Updates values based on map function.
| [filter]              | Keeps entries which pass a test.
| [reduce]              | Reduces values to a single value.
| [range]               | Finds smallest and largest entries.
| [count]               | Counts values which satisfy a test.
| [partition]           | Segregates values by test result.
| [cartesianProduct]    | Lists cartesian product of objects.
| [some]                | Checks if any value satisfies a test.
| [zip]                 | Combines entries from objects.
|                       | 
| [union]               | Gives entries present in any object.
| [intersection]        | Gives entries present in both objects.
| [difference]          | Gives entries of object not present in another.
| [symmetricDifference] | Gives entries not present in both objects.
| [isDisjoint]          | Checks if objects have no common keys.
|                       | 
| [key]                 | Picks an arbitrary key.
| [value]               | Picks an arbitrary value.
| [entry]               | Picks an arbitrary entry.
| [subobject]           | Picks an arbitrary subobject.
|                       | 
| [isEmpty]             | Checks if object is empty.
| [isEqual]             | Checks if two objects are equal.
| [compare]             | Compares two objects.
| [find]                | Finds value of an entry passing a test.
| [search]              | Finds key of an entry passing a test.
| [scanWhile]           | Finds key of first entry not passing a test.

<br>

[![nodef](https://merferry.glitch.me/card/extra-array.svg)](https://nodef.github.io)

[(1)]: https://www.rottentomatoes.com/m/3_idiots/quotes/
[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[browserify]: https://www.npmjs.com/package/browserify
[rollup]: https://www.npmjs.com/package/rollup
[uglify-js]: https://www.npmjs.com/package/uglify-js
[is]: https://github.com/nodef/extra-object/wiki/is
[swap]: https://github.com/nodef/extra-object/wiki/swap
[size]: https://github.com/nodef/extra-object/wiki/size
[concat]: https://github.com/nodef/extra-object/wiki/concat
[flat]: https://github.com/nodef/extra-object/wiki/flat
[chunk]: https://github.com/nodef/extra-object/wiki/chunk
[min]: https://github.com/nodef/extra-object/wiki/min
[max]: https://github.com/nodef/extra-object/wiki/max
[range]: https://github.com/nodef/extra-object/wiki/range
[filter]: https://github.com/nodef/extra-object/wiki/filter
[count]: https://github.com/nodef/extra-object/wiki/count
[partition]: https://github.com/nodef/extra-object/wiki/partition
[zip]: https://github.com/nodef/extra-object/wiki/zip
[union]: https://github.com/nodef/extra-object/wiki/union
[intersection]: https://github.com/nodef/extra-object/wiki/intersection
[difference]: https://github.com/nodef/extra-object/wiki/difference
[symmetricDifference]: https://github.com/nodef/extra-object/wiki/symmetricDifference
[isDisjoint]: https://github.com/nodef/extra-object/wiki/isDisjoint
[key]: https://github.com/nodef/extra-object/wiki/key
[value]: https://github.com/nodef/extra-object/wiki/value
[entry]: https://github.com/nodef/extra-object/wiki/entry
[subobject]: https://github.com/nodef/extra-object/wiki/subobject
[isEqual]: https://github.com/nodef/extra-object/wiki/isEqual
[compare]: https://github.com/nodef/extra-object/wiki/compare
[search]: https://github.com/nodef/extra-object/wiki/search
[find]: https://github.com/nodef/extra-object/wiki/find
[:running:]: https://npm.runkit.com/extra-object
[:package:]: https://www.npmjs.com/package/extra-object
[:moon:]: https://www.npmjs.com/package/extra-object.min
[:ledger:]: https://unpkg.com/extra-object/
[get]: https://github.com/nodef/extra-object/wiki/get
[set]: https://github.com/nodef/extra-object/wiki/set
[remove]: https://github.com/nodef/extra-object/wiki/remove
[head]: https://github.com/nodef/extra-object/wiki/head
[take]: https://github.com/nodef/extra-object/wiki/take
[shift]: https://github.com/nodef/extra-object/wiki/shift
[fromEntries]: https://github.com/nodef/extra-object/wiki/fromEntries
[filterAt]: https://github.com/nodef/extra-object/wiki/filterAt
[map]: https://github.com/nodef/extra-object/wiki/map
[reduce]: https://github.com/nodef/extra-object/wiki/reduce
[cartesianProduct]: https://github.com/nodef/extra-object/wiki/cartesianProduct
[some]: https://github.com/nodef/extra-object/wiki/some
[isEmpty]: https://github.com/nodef/extra-object/wiki/isEmpty
[scanWhile]: https://github.com/nodef/extra-object/wiki/scanWhile
[:vhs:]: https://asciinema.org/a/338711
