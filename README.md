A collection of methods for working with Objects.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-object),
🌐 [Web](https://www.npmjs.com/package/extra-object.web),
📜 [Files](https://unpkg.com/extra-object/),
📰 [Docs](https://nodef.github.io/extra-object/),
📘 [Wiki](https://github.com/nodef/extra-object/wiki/).

An [Object] is a collection of *properties* (entries), each with a *name* (key) and
a *value*. These properties can be values of any data type, including primitive
data types like strings and numbers, as well as more complex data types like
other objects. Objects in JavaScript are very similar to objects in other
programming languages. They are used to store and organize data, and they can be
manipulated and accessed using a variety of built-in methods and operators.

One of the quirks of objects is that they are **dynamic**, which means that
properties can be *added*, *removed*, and *modified* at any time. This can be useful
for some types of programming, but it can also make it difficult to keep track
of an object's properties and values. Another quirk of JavaScript objects is
that they are **not strongly typed**. This means that the *same* property can hold
values of *different data types*, and the type of a property's value can *change*
*over time*. This can make it difficult to ensure the correctness of your code,
and it can lead to runtime errors if you are not careful. Despite these quirks,
objects are a powerful and versatile tool for organizing and manipulating data
in your code. They are an essential part of any program, and they are used in a
wide range of applications.

This package includes common set functions related to querying **about** objects,
**generating** them, **comparing** one with another, finding their **size**,
**adding** and **removing** entries, obtaining its **characteristics**, getting a
**part** of it, getting **subset** entries in it, **finding** an entry in it,
performing **functional** operations, **manipulating** it in various ways,
**combining** together objects or its entries, of performing **set operations**
upon it.

All functions except `from*()` take object as 1st parameter. Methods like
`swap()` are pure and do not modify the object itself, while methods like
`swap$()` *do modify (update)* the object itself.

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[jsDelivr CDN]: https://cdn.jsdelivr.net/npm/extra-object.web/index.js

<br>

```javascript
const object = require('extra-object');
// import * as object from "extra-object";
// import * as object from "https://unpkg.com/extra-object/index.mjs"; (deno)

var x = {a: 1, b: 2, c: 3, d: 4};
object.swap(x, 'a', 'b');
// → { a: 2, b: 1, c: 3, d: 4 }

var x = {a: 1, b: 2, c: 3, d: 4};
var y = {b: 20, c: 30, e: 50};
object.intersection(x, y);
// → { b: 2, c: 3 }

var x = {a: 1, b: 2, c: 3, d: -2};
object.searchAll(x, v => Math.abs(v) === 2);
// → [ 'b', 'd' ]

var x = {a: 1, b: 2, c: 3};
[...object.subsets(x)];
// → [
// →   {},
// →   { a: 1 },
// →   { b: 2 },
// →   { a: 1, b: 2 },
// →   { c: 3 },
// →   { a: 1, c: 3 },
// →   { b: 2, c: 3 },
// →   { a: 1, b: 2, c: 3 }
// → ]
```

<br>
<br>


## Index

| Property | Description |
|  ----  |  ----  |
| [is] | Check if value is an object. |
| [keys] | List all keys. |
| [values] | List all values. |
| [entries] | List all key-value pairs. |
|  |  |
| [fromEntries] | Convert entries to object. |
| [fromLists] | Convert lists to object. |
|  |  |
| [compare] | Compare two objects. |
| [isEqual] | Check if two objects are equal. |
|  |  |
| [size] | Get the number of keys in an object. |
| [isEmpty] | Check if an object is empty. |
|  |  |
| [get] | Get value at specified key. |
| [getAll] | Get values at keys. |
| [getPath] | Get value at path in a nested object. |
| [hasPath] | Check if nested object has a path. |
| [set] | Set value at specified key. |
| [set$] | Set value at specified key. |
| [setPath$] | Set value at path in a nested object. |
| [swap] | Exchange two values in an object. |
| [swap$] | Exchange two values in an object. |
| [remove] | Remove an entry from object. |
| [remove$] | Remove an entry from object. |
| [removePath$] | Remove value at path in a nested object. |
|  |  |
| [count] | Count values which satisfy a test. |
| [countAs] | Count occurrences of values. |
| [min] | Find smallest value. |
| [minEntry] | Find smallest entry. |
| [max] | Find largest value. |
| [maxEntry] | Find largest entry. |
| [range] | Find smallest and largest values. |
| [rangeEntries] | Find smallest and largest entries. |
|  |  |
| [head] | Gets first entry from object (default order). |
| [tail] | Get object without its first entry (default order). |
| [take] | Keep first n entries only (default order). |
| [take$] | Keep first n entries only (default order). |
| [drop] | Remove first n entries (default order). |
| [drop$] | Remove first n entries (default order). |
|  |  |
| [subsets] | List all possible subsets. |
| [randomKey] | Pick an arbitrary key. |
| [randomEntry] | Pick an arbitrary entry. |
| [randomSubset] | Pick an arbitrary subset. |
|  |  |
| [has] | Check if object has a key. |
| [hasValue] | Check if object has a value. |
| [hasEntry] | Check if object has an entry. |
| [hasSubset] | Check if object has a subset. |
| [find] | Find value of an entry passing a test. |
| [findAll] | Find values of entries passing a test. |
| [search] | Find key of an entry passing a test. |
| [searchAll] | Find all keys of entries passing a test. |
| [searchValue] | Find key with a given value. |
| [searchValueAll] | Find keys with a given value. |
|  |  |
| [forEach] | Call a function for each entry. |
| [some] | Check if any value satisfies a test. |
| [every] | Check if all values satisfy a test. |
| [map] | Transform values of an object. |
| [map$] | Transform values of an object. |
| [reduce] | Reduce values to a single value. |
| [filter] | Keep entries which pass a test. |
| [filter$] | Keep entries which pass a test. |
| [filterAt] | Get object with given keys. |
| [filterAt$] | Get object with given keys. |
| [reject] | Discard entries which pass a test. |
| [reject$] | Discard entries which pass a test. |
| [rejectAt] | Get object without given keys. |
| [rejectAt$] | Get object without given keys. |
| [flat] | Flatten nested object to given depth. |
| [flatMap] | Flatten nested object, using map function. |
| [zip] | Combine matching entries from objects. |
|  |  |
| [partition] | Segregate entries by test result. |
| [partitionAs] | Segregate entries by similarity. |
| [chunk] | Break object into chunks of given size. |
|  |  |
| [concat] | Combine entries from objects, preferring last. |
| [concat$] | Combines entries from objects, preferring last. |
| [join] | Join entries together into a string. |
|  |  |
| [isDisjoint] | Check if objects have no common keys. |
| [unionKeys] | Give keys present in any object. |
| [union] | Give entries present in any object. |
| [union$] | Give entries present in any object. |
| [intersectionKeys] | Give keys present in all objects. |
| [intersection] | Give entries present in both objects. |
| [intersection$] | Give entries present in both objects. |
| [difference] | Give entries not present in another object. |
| [difference$] | Give entries not present in another object. |
| [symmetricDifference] | Give entries not present in both objects. |
| [symmetricDifference$] | Give entries not present in both objects. |
| [cartesianProduct] | List cartesian product of objects. |

<br>
<br>


> In the future when you think of just giving up on life, remember
> that the letter was in your hands, the cab was at the gate, only
> if you had thought about it once more, your entire life would
> have been better. [(1)]

[![](https://i.imgur.com/f9LT8Xu.png)](https://www.youtube.com/watch?v=nrUszqrlvi8)
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
[![Coverage Status](https://coveralls.io/repos/github/nodef/extra-object/badge.svg?branch=master)](https://coveralls.io/github/nodef/extra-object?branch=master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/27933753bc28ffe2e9dd/test_coverage)](https://codeclimate.com/github/nodef/extra-object/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/27933753bc28ffe2e9dd/maintainability)](https://codeclimate.com/github/nodef/extra-object/maintainability)


[(1)]: https://www.youtube.com/watch?v=8-R5_K7WTEM
[is]: https://github.com/nodef/extra-object/wiki/is
[keys]: https://github.com/nodef/extra-object/wiki/keys
[values]: https://github.com/nodef/extra-object/wiki/values
[entries]: https://github.com/nodef/extra-object/wiki/entries
[fromEntries]: https://github.com/nodef/extra-object/wiki/fromEntries
[fromLists]: https://github.com/nodef/extra-object/wiki/fromLists
[compare]: https://github.com/nodef/extra-object/wiki/compare
[isEqual]: https://github.com/nodef/extra-object/wiki/isEqual
[size]: https://github.com/nodef/extra-object/wiki/size
[isEmpty]: https://github.com/nodef/extra-object/wiki/isEmpty
[get]: https://github.com/nodef/extra-object/wiki/get
[getAll]: https://github.com/nodef/extra-object/wiki/getAll
[getPath]: https://github.com/nodef/extra-object/wiki/getPath
[hasPath]: https://github.com/nodef/extra-object/wiki/hasPath
[set]: https://github.com/nodef/extra-object/wiki/set
[set$]: https://github.com/nodef/extra-object/wiki/set$
[setPath$]: https://github.com/nodef/extra-object/wiki/setPath$
[swap]: https://github.com/nodef/extra-object/wiki/swap
[swap$]: https://github.com/nodef/extra-object/wiki/swap$
[remove]: https://github.com/nodef/extra-object/wiki/remove
[remove$]: https://github.com/nodef/extra-object/wiki/remove$
[removePath$]: https://github.com/nodef/extra-object/wiki/removePath$
[count]: https://github.com/nodef/extra-object/wiki/count
[countAs]: https://github.com/nodef/extra-object/wiki/countAs
[min]: https://github.com/nodef/extra-object/wiki/min
[minEntry]: https://github.com/nodef/extra-object/wiki/minEntry
[max]: https://github.com/nodef/extra-object/wiki/max
[maxEntry]: https://github.com/nodef/extra-object/wiki/maxEntry
[range]: https://github.com/nodef/extra-object/wiki/range
[rangeEntries]: https://github.com/nodef/extra-object/wiki/rangeEntries
[head]: https://github.com/nodef/extra-object/wiki/head
[tail]: https://github.com/nodef/extra-object/wiki/tail
[take]: https://github.com/nodef/extra-object/wiki/take
[take$]: https://github.com/nodef/extra-object/wiki/take$
[drop]: https://github.com/nodef/extra-object/wiki/drop
[drop$]: https://github.com/nodef/extra-object/wiki/drop$
[subsets]: https://github.com/nodef/extra-object/wiki/subsets
[randomKey]: https://github.com/nodef/extra-object/wiki/randomKey
[randomEntry]: https://github.com/nodef/extra-object/wiki/randomEntry
[randomSubset]: https://github.com/nodef/extra-object/wiki/randomSubset
[has]: https://github.com/nodef/extra-object/wiki/has
[hasValue]: https://github.com/nodef/extra-object/wiki/hasValue
[hasEntry]: https://github.com/nodef/extra-object/wiki/hasEntry
[hasSubset]: https://github.com/nodef/extra-object/wiki/hasSubset
[find]: https://github.com/nodef/extra-object/wiki/find
[findAll]: https://github.com/nodef/extra-object/wiki/findAll
[search]: https://github.com/nodef/extra-object/wiki/search
[searchAll]: https://github.com/nodef/extra-object/wiki/searchAll
[searchValue]: https://github.com/nodef/extra-object/wiki/searchValue
[searchValueAll]: https://github.com/nodef/extra-object/wiki/searchValueAll
[forEach]: https://github.com/nodef/extra-object/wiki/forEach
[some]: https://github.com/nodef/extra-object/wiki/some
[every]: https://github.com/nodef/extra-object/wiki/every
[map]: https://github.com/nodef/extra-object/wiki/map
[map$]: https://github.com/nodef/extra-object/wiki/map$
[reduce]: https://github.com/nodef/extra-object/wiki/reduce
[filter]: https://github.com/nodef/extra-object/wiki/filter
[filter$]: https://github.com/nodef/extra-object/wiki/filter$
[filterAt]: https://github.com/nodef/extra-object/wiki/filterAt
[filterAt$]: https://github.com/nodef/extra-object/wiki/filterAt$
[reject]: https://github.com/nodef/extra-object/wiki/reject
[reject$]: https://github.com/nodef/extra-object/wiki/reject$
[rejectAt]: https://github.com/nodef/extra-object/wiki/rejectAt
[rejectAt$]: https://github.com/nodef/extra-object/wiki/rejectAt$
[flat]: https://github.com/nodef/extra-object/wiki/flat
[flatMap]: https://github.com/nodef/extra-object/wiki/flatMap
[zip]: https://github.com/nodef/extra-object/wiki/zip
[partition]: https://github.com/nodef/extra-object/wiki/partition
[partitionAs]: https://github.com/nodef/extra-object/wiki/partitionAs
[chunk]: https://github.com/nodef/extra-object/wiki/chunk
[concat]: https://github.com/nodef/extra-object/wiki/concat
[concat$]: https://github.com/nodef/extra-object/wiki/concat$
[join]: https://github.com/nodef/extra-object/wiki/join
[isDisjoint]: https://github.com/nodef/extra-object/wiki/isDisjoint
[unionKeys]: https://github.com/nodef/extra-object/wiki/unionKeys
[union]: https://github.com/nodef/extra-object/wiki/union
[union$]: https://github.com/nodef/extra-object/wiki/union$
[intersectionKeys]: https://github.com/nodef/extra-object/wiki/intersectionKeys
[intersection]: https://github.com/nodef/extra-object/wiki/intersection
[intersection$]: https://github.com/nodef/extra-object/wiki/intersection$
[difference]: https://github.com/nodef/extra-object/wiki/difference
[difference$]: https://github.com/nodef/extra-object/wiki/difference$
[symmetricDifference]: https://github.com/nodef/extra-object/wiki/symmetricDifference
[symmetricDifference$]: https://github.com/nodef/extra-object/wiki/symmetricDifference$
[cartesianProduct]: https://github.com/nodef/extra-object/wiki/cartesianProduct
