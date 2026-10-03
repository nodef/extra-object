A collection of methods for working with Objects.<br>

▌
📦 [JSR](https://jsr.io/@nodef/extra-object),
📦 [NPM](https://www.npmjs.com/package/@nodef/extra-object),
📰 [Docs](https://jsr.io/@nodef/extra-object/doc).

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

[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

<br>

```javascript
import * as xobject from "jsr:@nodef/extra-object";

var x = {a: 1, b: 2, c: 3, d: 4};
xobject.swap(x, 'a', 'b');
// → { a: 2, b: 1, c: 3, d: 4 }

var x = {a: 1, b: 2, c: 3, d: 4};
var y = {b: 20, c: 30, e: 50};
xobject.intersection(x, y);
// → { b: 2, c: 3 }

var x = {a: 1, b: 2, c: 3, d: -2};
xobject.searchAll(x, v => Math.abs(v) === 2);
// → [ 'b', 'd' ]

var x = {a: 1, b: 2, c: 3};
[...xobject.subsets(x)];
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
| [unionKeys] | Obtain keys present in any object. |
| [union] | Obtain entries present in any object. |
| [union$] | Obtain entries present in any object. |
| [intersectionKeys] | Obtain keys present in all objects. |
| [intersection] | Obtain entries present in both objects. |
| [intersection$] | Obtain entries present in both objects. |
| [difference] | Obtain entries not present in another object. |
| [difference$] | Obtain entries not present in another object. |
| [symmetricDifference] | Obtain entries not present in both objects. |
| [symmetricDifference$] | Obtain entries not present in both objects. |
| [cartesianProduct] | List cartesian product of objects. |

<br>
<br>


> In the future when you think of just giving up on life, remember
> that the letter was in your hands, the cab was at the gate, only
> if you had thought about it once more, your entire life would
> have been better. [(1)]

[![](https://raw.githubusercontent.com/qb40/designs/gh-pages/0/image/11.png)](https://wolfram77.github.io)<br>
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/extra-object)


[(1)]: https://www.youtube.com/watch?v=8-R5_K7WTEM
[is]: https://jsr.io/@nodef/extra-object/doc/~/is
[keys]: https://jsr.io/@nodef/extra-object/doc/~/keys
[values]: https://jsr.io/@nodef/extra-object/doc/~/values
[entries]: https://jsr.io/@nodef/extra-object/doc/~/entries
[fromEntries]: https://jsr.io/@nodef/extra-object/doc/~/fromEntries
[fromLists]: https://jsr.io/@nodef/extra-object/doc/~/fromLists
[compare]: https://jsr.io/@nodef/extra-object/doc/~/compare
[isEqual]: https://jsr.io/@nodef/extra-object/doc/~/isEqual
[size]: https://jsr.io/@nodef/extra-object/doc/~/size
[isEmpty]: https://jsr.io/@nodef/extra-object/doc/~/isEmpty
[get]: https://jsr.io/@nodef/extra-object/doc/~/get
[getAll]: https://jsr.io/@nodef/extra-object/doc/~/getAll
[getPath]: https://jsr.io/@nodef/extra-object/doc/~/getPath
[hasPath]: https://jsr.io/@nodef/extra-object/doc/~/hasPath
[set]: https://jsr.io/@nodef/extra-object/doc/~/set
[set$]: https://jsr.io/@nodef/extra-object/doc/~/set$
[setPath$]: https://jsr.io/@nodef/extra-object/doc/~/setPath$
[swap]: https://jsr.io/@nodef/extra-object/doc/~/swap
[swap$]: https://jsr.io/@nodef/extra-object/doc/~/swap$
[remove]: https://jsr.io/@nodef/extra-object/doc/~/remove
[remove$]: https://jsr.io/@nodef/extra-object/doc/~/remove$
[removePath$]: https://jsr.io/@nodef/extra-object/doc/~/removePath$
[count]: https://jsr.io/@nodef/extra-object/doc/~/count
[countAs]: https://jsr.io/@nodef/extra-object/doc/~/countAs
[min]: https://jsr.io/@nodef/extra-object/doc/~/min
[minEntry]: https://jsr.io/@nodef/extra-object/doc/~/minEntry
[max]: https://jsr.io/@nodef/extra-object/doc/~/max
[maxEntry]: https://jsr.io/@nodef/extra-object/doc/~/maxEntry
[range]: https://jsr.io/@nodef/extra-object/doc/~/range
[rangeEntries]: https://jsr.io/@nodef/extra-object/doc/~/rangeEntries
[head]: https://jsr.io/@nodef/extra-object/doc/~/head
[tail]: https://jsr.io/@nodef/extra-object/doc/~/tail
[take]: https://jsr.io/@nodef/extra-object/doc/~/take
[take$]: https://jsr.io/@nodef/extra-object/doc/~/take$
[drop]: https://jsr.io/@nodef/extra-object/doc/~/drop
[drop$]: https://jsr.io/@nodef/extra-object/doc/~/drop$
[subsets]: https://jsr.io/@nodef/extra-object/doc/~/subsets
[randomKey]: https://jsr.io/@nodef/extra-object/doc/~/randomKey
[randomEntry]: https://jsr.io/@nodef/extra-object/doc/~/randomEntry
[randomSubset]: https://jsr.io/@nodef/extra-object/doc/~/randomSubset
[has]: https://jsr.io/@nodef/extra-object/doc/~/has
[hasValue]: https://jsr.io/@nodef/extra-object/doc/~/hasValue
[hasEntry]: https://jsr.io/@nodef/extra-object/doc/~/hasEntry
[hasSubset]: https://jsr.io/@nodef/extra-object/doc/~/hasSubset
[find]: https://jsr.io/@nodef/extra-object/doc/~/find
[findAll]: https://jsr.io/@nodef/extra-object/doc/~/findAll
[search]: https://jsr.io/@nodef/extra-object/doc/~/search
[searchAll]: https://jsr.io/@nodef/extra-object/doc/~/searchAll
[searchValue]: https://jsr.io/@nodef/extra-object/doc/~/searchValue
[searchValueAll]: https://jsr.io/@nodef/extra-object/doc/~/searchValueAll
[forEach]: https://jsr.io/@nodef/extra-object/doc/~/forEach
[some]: https://jsr.io/@nodef/extra-object/doc/~/some
[every]: https://jsr.io/@nodef/extra-object/doc/~/every
[map]: https://jsr.io/@nodef/extra-object/doc/~/map
[map$]: https://jsr.io/@nodef/extra-object/doc/~/map$
[reduce]: https://jsr.io/@nodef/extra-object/doc/~/reduce
[filter]: https://jsr.io/@nodef/extra-object/doc/~/filter
[filter$]: https://jsr.io/@nodef/extra-object/doc/~/filter$
[filterAt]: https://jsr.io/@nodef/extra-object/doc/~/filterAt
[filterAt$]: https://jsr.io/@nodef/extra-object/doc/~/filterAt$
[reject]: https://jsr.io/@nodef/extra-object/doc/~/reject
[reject$]: https://jsr.io/@nodef/extra-object/doc/~/reject$
[rejectAt]: https://jsr.io/@nodef/extra-object/doc/~/rejectAt
[rejectAt$]: https://jsr.io/@nodef/extra-object/doc/~/rejectAt$
[flat]: https://jsr.io/@nodef/extra-object/doc/~/flat
[flatMap]: https://jsr.io/@nodef/extra-object/doc/~/flatMap
[zip]: https://jsr.io/@nodef/extra-object/doc/~/zip
[partition]: https://jsr.io/@nodef/extra-object/doc/~/partition
[partitionAs]: https://jsr.io/@nodef/extra-object/doc/~/partitionAs
[chunk]: https://jsr.io/@nodef/extra-object/doc/~/chunk
[concat]: https://jsr.io/@nodef/extra-object/doc/~/concat
[concat$]: https://jsr.io/@nodef/extra-object/doc/~/concat$
[join]: https://jsr.io/@nodef/extra-object/doc/~/join
[isDisjoint]: https://jsr.io/@nodef/extra-object/doc/~/isDisjoint
[unionKeys]: https://jsr.io/@nodef/extra-object/doc/~/unionKeys
[union]: https://jsr.io/@nodef/extra-object/doc/~/union
[union$]: https://jsr.io/@nodef/extra-object/doc/~/union$
[intersectionKeys]: https://jsr.io/@nodef/extra-object/doc/~/intersectionKeys
[intersection]: https://jsr.io/@nodef/extra-object/doc/~/intersection
[intersection$]: https://jsr.io/@nodef/extra-object/doc/~/intersection$
[difference]: https://jsr.io/@nodef/extra-object/doc/~/difference
[difference$]: https://jsr.io/@nodef/extra-object/doc/~/difference$
[symmetricDifference]: https://jsr.io/@nodef/extra-object/doc/~/symmetricDifference
[symmetricDifference$]: https://jsr.io/@nodef/extra-object/doc/~/symmetricDifference$
[cartesianProduct]: https://jsr.io/@nodef/extra-object/doc/~/cartesianProduct
