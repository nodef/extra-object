import {assertEquals} from "@std/assert";
import {
  type Dictionary,
  type MapFunction,
  is,
  keys,
  values,
  entries,
  fromEntries,
  fromLists,
  compare,
  isEqual,
  size,
  isEmpty,
  get,
  getAll,
  getPath,
  hasPath,
  set,
  set$,
  setPath$,
  swap,
  swap$,
  remove,
  remove$,
  removePath$,
  count,
  countAs,
  min,
  minEntry,
  max,
  maxEntry,
  range,
  rangeEntries,
  head,
  tail,
  take,
  take$,
  drop,
  drop$,
  subsets,
  randomKey,
  randomEntry,
  randomSubset,
  has,
  hasValue,
  hasEntry,
  hasSubset,
  find,
  findAll,
  search,
  searchAll,
  searchValue,
  searchValueAll,
  forEach,
  some,
  every,
  map,
  map$,
  reduce,
  filter,
  filter$,
  filterAt,
  filterAt$,
  reject,
  reject$,
  rejectAt,
  rejectAt$,
  flat,
  flatMap,
  zip,
  partition,
  partitionAs,
  chunk,
  concat,
  concat$,
  join,
  isDisjoint,
  unionKeys,
  union,
  union$,
  intersectionKeys,
  intersection,
  intersection$,
  difference,
  difference$,
  symmetricDifference,
  symmetricDifference$,
  cartesianProduct,
} from "./index.ts";
import {
  type EndFunction,
  head  as arrayHead,
  some  as arraySome,
  every as arrayEvery,
} from "@nodef/extra-array";




// ABOUT
// -----

Deno.test("is", () => {
  let a;
  a = is({a: 1, b: 2});
  assertEquals(a, true);
  a = is({});
  assertEquals(a, true);
  a = is(1);
  assertEquals(a, false);
});


Deno.test("keys", () => {
  const x = {a: 1, b: 2, c: 3};
  const a = keys(x);
  assertEquals([...a], ["a", "b", "c"]);
});


Deno.test("values", () => {
  const x = {a: 1, b: 2, c: 3};
  const a = values(x);
  assertEquals([...a], [1, 2, 3]);
});


Deno.test("entries", () => {
  const x = {a: 1, b: 2, c: 3};
  const a = entries(x);
  assertEquals([...a], [["a", 1], ["b", 2], ["c", 3]]);
});




// GENERATE
// --------

Deno.test("fromEntries", () => {
  const es: [string, number][] = [["a", 1], ["b", 2], ["c", 3]];
  const a  = fromEntries(es);
  assertEquals(a, {a: 1, b: 2, c: 3});
});


Deno.test("fromLists", () => {
  const ls: [string[], number[]] = [["a", "b", "c"], [1, 2, 3]];
  const a = fromLists(ls);
  assertEquals(a, {a: 1, b: 2, c: 3});
});




// COMPARE
// -------

Deno.test("compare", () => {
  let z, a;
  const x = {a: 1, b: 2};
  const y = {a: 1, b: 2, c: 3};
  a = compare(x, y);
  assertEquals(a, -1);
  z = {a: 1, b: 2};
  a = compare(x, z);
  assertEquals(a, 0);
  z = {a: 1, b: -2};
  a = compare(x, z);
  assertEquals(a, 1);
  a = compare(x, z, (a, b) => Math.abs(a as number) - Math.abs(b as number));
  assertEquals(a, 0);
  a = compare(x, z, null, v => Math.abs(v as number));
  assertEquals(a, 0);
});


Deno.test("isEqual", () => {
  let a;
  const x = {a: 1, b: 2};
  a = isEqual(x, {a: 1, b: 2});
  assertEquals(a, true);
  a = isEqual(x, {a: 11, b: 12});
  assertEquals(a, false);
  a = isEqual(x, {a: 11, b: 12}, (a, b) => (a as number % 10) - (b as number % 10));
  assertEquals(a, true);
  a = isEqual(x, {a: 11, b: 12}, null, v => (v as number) % 10);
  assertEquals(a, true);
});




// SIZE
// ----

Deno.test("size", () => {
  const x = {a: 1, b: 2, c: 3};
  const a = size(x);
  assertEquals(a, 3);
});


Deno.test("isEmpty", () => {
  let x: Dictionary, a;
  x = {a: 1, b: 2, c: 3};
  a = isEmpty(x);
  assertEquals(a, false);
  x = {};
  a = isEmpty(x);
  assertEquals(a, true);
});




// GET/SET
// -------

Deno.test("get", () => {
  let a;
  const x = {a: 2, b: 4, c: 6, d: 8};
  a = get(x, "b");
  assertEquals(a, 4);
  a = get(x, "d");
  assertEquals(a, 8);
});


Deno.test("getAll", () => {
  let a;
  const x = {a: 2, b: 4, c: 6, d: 8};
  a = getAll(x, ["b", "c"]);
  assertEquals(a, [4, 6]);
  a = getAll(x, ["e"]);
  assertEquals(a, [undefined]);
});


Deno.test("getPath", () => {
  let a;
  const x = {a: {b: 2, c: 3}, d: 4};
  a = getPath(x, ["d"]);
  assertEquals(a, 4);
  a = getPath(x, ["a", "b"]);
  assertEquals(a, 2);
  a = getPath(x, ["a", "b", "c"]);
  assertEquals(a, undefined);
});


Deno.test("hasPath", () => {
  let a;
  const x = {a: {b: 2, c: 3}, d: 4};
  a = hasPath(x, ["d"]);
  assertEquals(a, true);
  a = hasPath(x, ["a", "b"]);
  assertEquals(a, true);
  a = hasPath(x, ["a", "b", "c"]);
  assertEquals(a, false);
});


Deno.test("set", () => {
  let a;
  const x = {a: 2, b: 4, c: 6, d: 8};
  a = set(x, "b", 40);
  assertEquals(a, {a: 2, b: 40, c: 6, d: 8});
  a = set(x, "d", 80);
  assertEquals(a, {a: 2, b: 4, c: 6, d: 80});
});


Deno.test("set$", () => {
  let x, a;
  x = {a: 2, b: 4, c: 6, d: 8};
  a = set$(x, "b", 40);
  assertEquals(a, {a: 2, b: 40, c: 6, d: 8});
  assertEquals(x, {a: 2, b: 40, c: 6, d: 8});
  x = {a: 2, b: 4, c: 6, d: 8};
  a = set$(x, "d", 80);
  assertEquals(a, {a: 2, b: 4, c: 6, d: 80});
});


Deno.test("setPath$", () => {
  let a;
  const x = {a: {b: 2, c: 3}, d: 4};
  a = setPath$(x, ["d"], 40);
  assertEquals(a, {a: {b: 2, c: 3}, d: 40});
  assertEquals(x, {a: {b: 2, c: 3}, d: 40});
  a = setPath$(x, ["a", "b"], 20);
  assertEquals(a, {a: {b: 20, c: 3}, d: 40});
  a = setPath$(x, ["a", "b", "c"], 30);
  assertEquals(a, {a: {b: 20, c: 3}, d: 40});  // no effect
});


Deno.test("swap", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 4};
  a = swap(x, "a", "b");
  assertEquals(a, {a: 2, b: 1, c: 3, d: 4});
  a = swap(x, "a", "d");
  assertEquals(a, {a: 4, b: 2, c: 3, d: 1});
});


Deno.test("swap$", () => {
  let x, a;
  x = {a: 1, b: 2, c: 3, d: 4};
  a = swap$(x, "a", "b");
  assertEquals(a, {a: 2, b: 1, c: 3, d: 4});
  assertEquals(x, {a: 2, b: 1, c: 3, d: 4});
  x = {a: 1, b: 2, c: 3, d: 4};
  a = swap$(x, "a", "d");
  assertEquals(a, {a: 4, b: 2, c: 3, d: 1});
});


Deno.test("remove", () => {
  let a;
  const x = {a: 2, b: 4, c: 6, d: 8};
  a = remove(x, "b");
  assertEquals(a, {a: 2, c: 6, d: 8});
  a = remove(x, "d");
  assertEquals(a, {a: 2, b: 4, c: 6});
});


Deno.test("remove$", () => {
  let x, a;
  x = {a: 2, b: 4, c: 6, d: 8};
  a = remove$(x, "b");
  assertEquals(a, {a: 2, c: 6, d: 8});
  assertEquals(x, {a: 2, c: 6, d: 8});
  x = {a: 2, b: 4, c: 6, d: 8};
  a = remove$(x, "d");
  assertEquals(a, {a: 2, b: 4, c: 6});
});


Deno.test("removePath$", () => {
  let a;
  const x: Dictionary = {a: {b: 2, c: 3}, d: 4};
  a = removePath$(x, ["d"]);
  assertEquals(a, { a: { b: 2, c: 3 } });
  assertEquals(x, { a: { b: 2, c: 3 } });
  a = removePath$(x, ["a", "b"]);
  assertEquals(a, { a: { c: 3 } });
  a = removePath$(x, ["a", "b", "c"]);
  assertEquals(a, { a: { c: 3 } });
})




// PROPERTY
// --------

Deno.test("count", () => {
  let a;
  const x = {a: 1, b: 1, c: 2, d: 2, e: 4};
  a = count(x, v => (v as number) % 2 === 1);
  assertEquals(a, 2);
  a = count(x, v => (v as number) % 2 === 0);
  assertEquals(a, 3);
});


Deno.test("countAs", () => {
  let x: Dictionary, a;
  x = {a: 1, b: 1, c: 2, d: 2, e: 4};
  a = countAs(x);
  assertEquals(a, new Map([[1, 2], [2, 2], [4, 1]]));
  x = {a: 1, b: 2, c: 3, d: 4};
  a = countAs(x, v => (v as number) % 2);
  assertEquals(a, new Map([[1, 2], [0, 2]]));
});


Deno.test("min", () => {
  let a;
  const x = {a: 1, b: 2, c: -3, d: -4};
  a = min(x);
  assertEquals(a, -4);
  a = min(x, (a, b) => Math.abs(a as number) - Math.abs(b as number));
  assertEquals(a, 1);
  a = min(x, null, v => Math.abs(v as number));
  assertEquals(a, 1);
});


Deno.test("minEntry", () => {
  let a;
  const x = {a: 1, b: 2, c: -3, d: -4};
  a = minEntry(x);
  assertEquals(a, ["d", -4]);
  a = minEntry(x, (a, b) => Math.abs(a as number) - Math.abs(b as number));
  assertEquals(a, ["a", 1]);
  a = minEntry(x, null, v => Math.abs(v as number));
  assertEquals(a, ["a", 1]);
});


Deno.test("max", () => {
  let a;
  const x = {a: 1, b: 2, c: -3, d: -4};
  a = max(x);
  assertEquals(a, 2);
  a = max(x, (a, b) => Math.abs(a as number) - Math.abs(b as number));
  assertEquals(a, -4);
  a = max(x, null, v => Math.abs(v as number));
  assertEquals(a, -4);
});


Deno.test("maxEntry", () => {
  let a;
  const x = {a: 1, b: 2, c: -3, d: -4};
  a = maxEntry(x);
  assertEquals(a, ["b", 2]);
  a = maxEntry(x, (a, b) => Math.abs(a as number) - Math.abs(b as number));
  assertEquals(a, ["d", -4]);
  a = maxEntry(x, null, v => Math.abs(v as number));
  assertEquals(a, ["d", -4]);
});


Deno.test("range", () => {
  let a;
  const x = {a: 1, b: 2, c: -3, d: -4};
  a = range(x);
  assertEquals(a, [-4, 2]);
  a = range(x, (a, b) => Math.abs(a as number) - Math.abs(b as number));
  assertEquals(a, [1, -4]);
  a = range(x, null, v => Math.abs(v as number));
  assertEquals(a, [1, -4]);
});


Deno.test("rangeEntries", () => {
  let a;
  const x = {a: 1, b: 2, c: -3, d: -4};
  a = rangeEntries(x);
  assertEquals(a, [["d", -4], ["b", 2]]);
  a = rangeEntries(x, (a, b) => Math.abs(a as number) - Math.abs(b as number));
  assertEquals(a, [["a", 1], ["d", -4]]);
  a = rangeEntries(x, null, v => Math.abs(v as number));
  assertEquals(a, [["a", 1], ["d", -4]]);
});




// PART
// ----

Deno.test("head", () => {
  let a;
  a = head({a: 1, b: 2, c: 3});
  assertEquals(a, ["a", 1]);
  a = head({});
  assertEquals(a, [] as unknown as [string, unknown]);
});


Deno.test("tail", () => {
  let a;
  a = tail({a: 1, b: 2, c: 3});
  assertEquals(a, {b: 2, c: 3});
  a = tail({a: 1});
  assertEquals(a, {});
});


Deno.test("take", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = take(x, 2);
  assertEquals(a, {a: 1, b: 2});
  a = take(x, 3);
  assertEquals(a, {a: 1, b: 2, c: 3});
});


Deno.test("take$", () => {
  let x, a;
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = take$(x, 2);
  assertEquals(a, {a: 1, b: 2});
  assertEquals(x, {a: 1, b: 2});
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = take$(x, 3);
  assertEquals(a, {a: 1, b: 2, c: 3});
});


Deno.test("drop", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = drop(x, 2);
  assertEquals(a, {c: 3, d: 4, e: 5});
  a = drop(x, 3);
  assertEquals(a, {d: 4, e: 5});
});


Deno.test("drop$", () => {
  let x, a;
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = drop$(x, 2);
  assertEquals(a, {c: 3, d: 4, e: 5});
  assertEquals(x, {c: 3, d: 4, e: 5});
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = drop$(x, 3);
  assertEquals(a, {d: 4, e: 5});
});




// ARRANGEMENTS
// ------------

Deno.test("subsets", () => {
  let x: Dictionary, a;
  x = {a: 1, b: 2};
  a = subsets(x);
  assertEquals([...a], [{}, {a: 1}, {b: 2}, {a: 1, b: 2}]);
  x = {a: 1, b: 2, c: 3};
  a = subsets(x);
  assertEquals([...a], [
    {},
    {a: 1},
    {b: 2},
    {a: 1, b: 2},
    {c: 3},
    {a: 1, c: 3},
    {b: 2, c: 3},
    {a: 1, b: 2, c: 3},
  ]);
});


Deno.test("randomKey", () => {
  let a;
  const x = {a: 1, b: 2, c: 3};
  a = randomKey(x);
  assertEquals(has(x, a), true);
  a = randomKey(x);
  assertEquals(has(x, a), true);
});


Deno.test("randomEntry", () => {
  let a;
  const x = {a: 1, b: 2, c: 3};
  a = randomEntry(x);
  assertEquals(hasEntry(x, a), true);
  a = randomEntry(x);
  assertEquals(hasEntry(x, a), true);
});


Deno.test("randomSubset", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 4};
  a = randomSubset(x);
  assertEquals(hasSubset(x, a), true);
  a = randomSubset(x, 3);
  assertEquals(hasSubset(x, a), true);
  a = randomSubset(x, 2);
  assertEquals(hasSubset(x, a), true);
});




// FIND
// ----

Deno.test("has", () => {
  let a;
  const x = {a: 1, b: 2, c: -3};
  a = has(x, "d");
  assertEquals(a, false);
  a = has(x, "c");
  assertEquals(a, true);
});


Deno.test("hasValue", () => {
  let a;
  const x = {a: 1, b: 2, c: -3};
  a = hasValue(x, 3);
  assertEquals(a, false);
  a = hasValue(x, 3, (a, b) => Math.abs(a as number) - Math.abs(b as number));
  assertEquals(a, true);
  a = hasValue(x, 3, null, v => Math.abs(v as number));
  assertEquals(a, true);
});


Deno.test("hasEntry", () => {
  let a;
  const x = {a: 1, b: 2, c: -3};
  a = hasEntry(x, ["c", 3]);
  assertEquals(a, false);
  a = hasEntry(x, ["c", 3], (a, b) => Math.abs(a as number) - Math.abs(b as number));
  assertEquals(a, true);
  a = hasEntry(x, ["c", 3], null, v => Math.abs(v as number));
  assertEquals(a, true);
});


Deno.test("hasSubset", () => {
  let y, a;
  const x = {a: 1, b: 2, c: 3, d: 4};
  y = {b: 2, d: 4};
  a = hasSubset(x, y);
  assertEquals(a, true);
  y = {b: -2, d: -4};
  a = hasSubset(x, y);
  assertEquals(a, false);
  a = hasSubset(x, y, (a, b) => Math.abs(a as number) - Math.abs(b as number));
  assertEquals(a, true);
  a = hasSubset(x, y, null, v => Math.abs(v as number));
  assertEquals(a, true);
});


Deno.test("find", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 4};
  a = find(x, v => (v as number) % 2 === 0);
  assertEquals(a, 2);
  a = find(x, v => (v as number) % 8 === 0);
  assertEquals(a, undefined);
});


Deno.test("findAll", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 4};
  a = findAll(x, v => (v as number) % 2 === 0);
  assertEquals(a, [2, 4]);
  a = findAll(x, v => (v as number) % 8 === 0);
  assertEquals(a, []);
});


Deno.test("search", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 2};
  a = search(x, v => v === 2);
  assertEquals(a, "b");
  a = search(x, v => v === 4);
  assertEquals(a, null);
});


Deno.test("searchAll", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: -2};
  a = searchAll(x, v => (v as number) === 2);
  assertEquals(a, ["b"]);
  a = searchAll(x, v => Math.abs(v as number) === 2);
  assertEquals(a, ["b", "d"]);
});


Deno.test("searchValue", () => {
  let a;
  const x = {a: 1, b: -2, c: 3, d: 2, e: 5};
  a = searchValue(x, 2);
  assertEquals(a, "d");
  a = searchValue(x, 2, (a, b) => Math.abs(a as number) - Math.abs(b as number));
  assertEquals(a, "b");
  a = searchValue(x, 2, null, v => Math.abs(v as number));
  assertEquals(a, "b");
});


Deno.test("searchValueAll", () => {
  let a;
  const x = {a: 1, b: -2, c: 3, d: 2, e: 5};
  a = searchValueAll(x, 2);
  assertEquals(a, ["d"]);
  a = searchValueAll(x, 2, (a, b) => Math.abs(a as number) - Math.abs(b as number));
  assertEquals(a, ["b", "d"]);
  a = searchValueAll(x, 2, null, v => Math.abs(v as number));
  assertEquals(a, ["b", "d"]);
});




// FUNCTIONAL
// ----------

Deno.test("forEach", () => {
  const x = {a: 1, b: 2, c: -3, d: -4};
  const a: number[] = [];
  forEach(x, v => a.push(v as number));
  assertEquals(a, [1, 2, -3, -4]);
});


Deno.test("some", () => {
  let a;
  const x = {a: 1, b: 2, c: -3, d: -4};
  a = some(x, v => (v as number) > 10);
  assertEquals(a, false);
  a = some(x, v => (v as number) < 0);
  assertEquals(a, true);
});


Deno.test("every", () => {
  let a;
  const x = {a: 1, b: 2, c: -3, d: -4};
  a = every(x, v => (v as number) > 0);
  assertEquals(a, false);
  a = every(x, v => (v as number) > -10);
  assertEquals(a, true);
});


Deno.test("map", () => {
  const x = {a: 1, b: 2, c: 3, d: 4};
  const a = map(x, v => (v as number) * 2);
  assertEquals(a, {a: 2, b: 4, c: 6, d: 8});
});


Deno.test("map$", () => {
  const x = {a: 1, b: 2, c: 3, d: 4};
  const a = map$(x, v => (v as number) * 2);
  assertEquals(a, {a: 2, b: 4, c: 6, d: 8});
  assertEquals(x, {a: 2, b: 4, c: 6, d: 8});
});


Deno.test("reduce", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 4};
  a = reduce(x, (acc, v) => (acc as number) + (v as number));
  assertEquals(a, 10);
  a = reduce(x, (acc, v) => (acc as number) + (v as number), 100);
  assertEquals(a, 110);
});


Deno.test("filter", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = filter(x, v => (v as number) % 2 === 1);
  assertEquals(a, {a: 1, c: 3, e: 5});
  a = filter(x, v => (v as number) % 2 === 0);
  assertEquals(a, {b: 2, d: 4});
});


Deno.test("filter$", () => {
  let x, a;
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = filter$(x, v => (v as number) % 2 === 1);
  assertEquals(a, {a: 1, c: 3, e: 5});
  assertEquals(x, {a: 1, c: 3, e: 5});
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = filter$(x, v => (v as number) % 2 === 0);
  assertEquals(a, {b: 2, d: 4});
});


Deno.test("filterAt", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = filterAt(x, ["a", "c", "e"]);
  assertEquals(a, {a: 1, c: 3, e: 5});
  a = filterAt(x, ["b", "d"]);
  assertEquals(a, {b: 2, d: 4});
});


Deno.test("filterAt$", () => {
  let x, a;
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = filterAt$(x, ["a", "c", "e"]);
  assertEquals(a, {a: 1, c: 3, e: 5});
  assertEquals(x, {a: 1, c: 3, e: 5});
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = filterAt$(x, ["b", "d"]);
  assertEquals(a, {b: 2, d: 4});
});


Deno.test("reject", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = reject(x, v => (v as number) % 2 === 1);
  assertEquals(a, {b: 2, d: 4});
  a = reject(x, v => (v as number) % 2 === 0);
  assertEquals(a, {a: 1, c: 3, e: 5});
});


Deno.test("reject$", () => {
  let x, a;
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = reject$(x, v => (v as number) % 2 === 1);
  assertEquals(a, {b: 2, d: 4});
  assertEquals(x, {b: 2, d: 4});
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = reject$(x, v => (v as number) % 2 === 0);
  assertEquals(a, {a: 1, c: 3, e: 5});
});


Deno.test("rejectAt", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = rejectAt(x, ["a", "c", "e"]);
  assertEquals(a, {b: 2, d: 4});
  a = rejectAt(x, ["b", "d"]);
  assertEquals(a, {a: 1, c: 3, e: 5});
});


Deno.test("rejectAt$", () => {
  let x, a;
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = rejectAt$(x, ["a", "c", "e"]);
  assertEquals(a, {b: 2, d: 4});
  assertEquals(x, {b: 2, d: 4});
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = rejectAt$(x, ["b", "d"]);
  assertEquals(a, {a: 1, c: 3, e: 5});
});


Deno.test("flat", () => {
  let a;
  const x = {ab: {a: 1, b: 2}, cde: {c: 3, de: {d: 4, e: {e: 5}}}};
  a = flat(x);
  assertEquals(a, {a: 1, b: 2, c: 3, d: 4, e: 5});
  a = flat(x, 1);
  assertEquals(a, {a: 1, b: 2, c: 3, de: {d: 4, e: {e: 5}}});
  a = flat(x, 2);
  assertEquals(a, {a: 1, b: 2, c: 3, d: 4, e: {e: 5}});
});


Deno.test("flatMap", () => {
  let a;
  const x = {ab: {a: 1, b: 2}, cde: {c: 3, de: {d: 4, e: {e: 5}}}};
  a = flatMap(x);
  assertEquals(a, {a: 1, b: 2, c: 3, de: {d: 4, e: {e: 5}}});
  a = flatMap(x, v => flat(v as Dictionary, 1));
  assertEquals(a, {a: 1, b: 2, c: 3, d: 4, e: {e: 5}});
  a = flatMap(x, v => flat(v as Dictionary, 2));
  assertEquals(a, {a: 1, b: 2, c: 3, d: 4, e: 5});
});


Deno.test("zip", () => {
  let a;
  const x = {a: 1, b: 2, c: 3};
  const y = {a: 10, b: 20};
  a = zip([x, y]);
  assertEquals(a, {a: [1, 10], b: [2, 20]});  // shortest
  a = zip([x, y], (([a, b]: [number, number]) => a + b) as MapFunction);
  assertEquals(a, {a: 11, b: 22});
  a = zip([x, y], null, arraySome);
  assertEquals(a, {a: [1, 10], b: [2, 20]});  // shortest
  a = zip([x, y], null, arrayEvery, 0);
  assertEquals(a, {a: [1, 10], b: [2, 20], c: [3, 0]});  // longest
  a = zip([x, y], null, arrayHead as unknown as EndFunction, 0);
  assertEquals(a, {a: [1, 10], b: [2, 20], c: [3, 0]});  // first
});




// MANIPULATION
// ------------

Deno.test("partition", () => {
  let x: Dictionary, a;
  x = {a: 1, b: 2, c: 3, d: 4};
  a = partition(x, v => (v as number) % 2 == 0);
  assertEquals(a, [{b: 2, d: 4}, {a: 1, c: 3}]);
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = partition(x, v => (v as number) % 2 == 1);
  assertEquals(a, [{a: 1, c: 3, e: 5}, {b: 2, d: 4}]);
});


Deno.test("partitionAs", () => {
  let x: Dictionary, a;
  x = {a: 1, b: 2, c: 3, d: 4};
  a = partitionAs(x, v => (v as number) % 2 == 0);
  assertEquals(a, new Map([[false, {a: 1, c: 3}], [true, {b: 2, d: 4}]]));
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  a = partitionAs(x, v => (v as number) % 3);
  assertEquals(a, new Map([[1, {a: 1, d: 4}], [2, {b: 2, e: 5}], [0, {c: 3}]]));
});


Deno.test("chunk", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8};
  a = chunk(x, 3);
  assertEquals(a, [{a: 1, b: 2, c: 3}, {d: 4, e: 5, f: 6}, {g: 7, h: 8}]);
  a = chunk(x, 2, 3);
  assertEquals(a, [{a: 1, b: 2}, {d: 4, e: 5}, {g: 7, h: 8}]);
  a = chunk(x, 4, 3);
  assertEquals(a, [
    {a: 1, b: 2, c: 3, d: 4},
    {d: 4, e: 5, f: 6, g: 7},
    {g: 7, h: 8},
  ]);
});




// COMBINE
// -------

Deno.test("concat", () => {
  let a;
  const x = {a: 1, b: 2};
  const y = {c: 3, d: 4};
  a = concat(x, y);
  assertEquals(a, {a: 1, b: 2, c: 3, d: 4});
  const z = {d: 40, e: 50};
  a = concat(x, y, z);
  assertEquals(a, {a: 1, b: 2, c: 3, d: 40, e: 50});
});


Deno.test("concat$", () => {
  let x, y, a;
  x = {a: 1, b: 2};
  y = {c: 3, d: 4};
  a = concat$(x, y);
  assertEquals(a, {a: 1, b: 2, c: 3, d: 4});
  assertEquals(x, {a: 1, b: 2, c: 3, d: 4});
  x = {a: 1, b: 2};
  y = {c: 3, d: 4};
  const z = {d: 40, e: 50};
  a = concat$(x, y, z);
  assertEquals(a, {a: 1, b: 2, c: 3, d: 40, e: 50});
});


Deno.test("join", () => {
  let a;
  const x = {a: 1, b: 2, c: 3};
  a = join(x);
  assertEquals(a, "a=1,b=2,c=3");
  a = join(x, ", ", " => ");
  assertEquals(a, "a => 1, b => 2, c => 3");
});




// SET OPERATIONS
// --------------

Deno.test("isDisjoint", () => {
  let a;
  const x = {a: 1, b: 2, c: 3};
  a = isDisjoint(x, {c: 3, d: 4});
  assertEquals(a, false);
  a = isDisjoint(x, {d: 4});
  assertEquals(a, true);
});


Deno.test("unionKeys", () => {
  const x = {a: 1, b: 2, c: 3, d: 4};
  const y = {b: 20, c: 30, e: 50};
  const a = unionKeys(x, y);
  assertEquals(a, new Set(["a", "b", "c", "d", "e"]));
});


Deno.test("union", () => {
  let a;
  const x = {a: 1, b: 2, c: 3};
  const y = {b: 20, c: 30, d: 40};
  a = union(x, y);
  assertEquals(a, {a: 1, b: 2, c: 3, d: 40});
  a = union(x, y, (_a, b) => b);
  assertEquals(a, {a: 1, b: 20, c: 30, d: 40});
});


Deno.test("union$", () => {
  let x, y, a;
  x = {a: 1, b: 2, c: 3};
  y = {b: 20, c: 30, d: 40};
  a = union$(x, y);
  assertEquals(a, {a: 1, b: 2, c: 3, d: 40});
  assertEquals(x, {a: 1, b: 2, c: 3, d: 40});
  x = {a: 1, b: 2, c: 3};
  y = {b: 20, c: 30, d: 40};
  a = union$(x, y, (_a, b) => b);
  assertEquals(a, {a: 1, b: 20, c: 30, d: 40});
});


Deno.test("intersectionKeys", () => {
  const x = {a: 1, b: 2, c: 3, d: 4};
  const y = {b: 20, c: 30, e: 50};
  const a = intersectionKeys(x, y);
  assertEquals(a, new Set(["b", "c"]));
});


Deno.test("intersection", () => {
  let a;
  const x = {a: 1, b: 2, c: 3, d: 4};
  const y = {b: 20, c: 30, e: 50};
  a = intersection(x, y);
  assertEquals(a, {b: 2, c: 3});
  a = intersection(x, y, (_a, b) => b);
  assertEquals(a, {b: 20, c: 30});
});


Deno.test("intersection$", () => {
  let x, y, a;
  x = {a: 1, b: 2, c: 3, d: 4};
  y = {b: 20, c: 30, e: 50};
  a = intersection$(x, y);
  assertEquals(a, {b: 2, c: 3});
  assertEquals(x, {b: 2, c: 3});
  x = {a: 1, b: 2, c: 3, d: 4};
  y = {b: 20, c: 30, e: 50};
  a = intersection$(x, y, (_a, b) => b);
  assertEquals(a, {b: 20, c: 30});
});


Deno.test("difference", () => {
  let y, a;
  const x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  y = {b: 2, d: 4};
  a = difference(x, y);
  assertEquals(a, {a: 1, c: 3, e: 5});
  y = {b: -2, d: -4};
  a = difference(x, y);
  assertEquals(a, {a: 1, c: 3, e: 5});
});


Deno.test("difference$", () => {
  let x, y, a;
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  y = {b: 2, d: 4};
  a = difference$(x, y);
  assertEquals(a, {a: 1, c: 3, e: 5});
  assertEquals(x, {a: 1, c: 3, e: 5});
  x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  y = {b: -2, d: -4};
  a = difference$(x, y);
  assertEquals(a, {a: 1, c: 3, e: 5});
});


Deno.test("symmetricDifference", () => {
  let y, a;
  const x = {a: 1, b: 2, c: 3, d: 4};
  y = {c: 30, d: 40, e: 50, f: 60};
  a = symmetricDifference(x, y);
  assertEquals(a, {a: 1, b: 2, e: 50, f: 60});
  y = {d: 40, e: 50, f: 60};
  a = symmetricDifference(x, y);
  assertEquals(a, {a: 1, b: 2, c: 3, e: 50, f: 60});
});


Deno.test("symmetricDifference$", () => {
  let x, y, a;
  x = {a: 1, b: 2, c: 3, d: 4};
  y = {c: 30, d: 40, e: 50, f: 60};
  a = symmetricDifference$(x, y);
  assertEquals(a, {a: 1, b: 2, e: 50, f: 60});
  assertEquals(x, {a: 1, b: 2, e: 50, f: 60});
  x = {a: 1, b: 2, c: 3, d: 4};
  y = {d: 40, e: 50, f: 60};
  a = symmetricDifference$(x, y);
  assertEquals(a, {a: 1, b: 2, c: 3, e: 50, f: 60});
});


Deno.test("cartesianProduct", () => {
  let a;
  const x = {a: 1, b: 2, c: 3};
  const y = {d: 10, e: 20};
  a = cartesianProduct([x, y]);
  assertEquals([...a], [
    {a: 1, d: 10},
    {a: 1, e: 20},
    {b: 2, d: 10},
    {b: 2, e: 20},
    {c: 3, d: 10},
    {c: 3, e: 20},
  ]);
  a = cartesianProduct([x, y], a => max(a as Dictionary));
  assertEquals([...a], [10, 20, 10, 20, 10, 20]);
});
