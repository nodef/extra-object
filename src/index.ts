import {
  IDENTITY,
  COMPARE,
} from "extra-function";
import {
  last              as arrayLast,
  randomSubsequence as arrayRandomSubsequence
} from "extra-array";

// - https://www.measurethat.net/Benchmarks/Show/19863/0/object-iterate-keys




// TYPES
// ======

/** Entries is a list of key-value pairs, with unique keys (indices). */
export type Entries = Iterable<[string, any]>;


/** Lists is a pair of key list and value list, with unique keys (indices). */
export type Lists = [Iterable<string>, Iterable<any>];


/**
 * Handle reading of a single value.
 * @returns value
 */
export type ReadFunction = () => any;


/**
 * Handle combining of two values.
 * @param a a value
 * @param b another value
 * @returns combined value
 */
export type CombineFunction = (a: any, b: any) => any;


/**
 * Handle comparison of two values.
 * @param a a value
 * @param b another value
 * @returns a<b: -ve, a=b: 0, a>b: +ve
 */
export type CompareFunction = (a: any, b: any) => number;


/**
 * Handle processing of values in an object.
 * @param v value in object
 * @param k key of value in object
 * @param x object containing the value
 */
export type ProcessFunction = (v: any, k: string, x: object) => void;


/**
 * Handle selection of entries in an object.
 * @param v value in object
 * @param k key of value in object
 * @param x object containing the value
 * @returns selected?
 */
export type TestFunction = (v: any, k: string, x: object) => boolean;


/**
 * Handle transformation of a value to another.
 * @param v value in object
 * @param k key of value in object
 * @param x object containing the value
 * @returns transformed value
 */
export type MapFunction = (v: any, k: string, x: object) => any;


/**
 * Handle reduction of multiple values into a single value.
 * @param acc accumulator (temporary result)
 * @param v value in object
 * @param k key of value in object
 * @param x object containing the value
 * @returns reduced value
 */
export type ReduceFunction = (acc: any, v: any, k: string, x: object) => any;


/**
 * Handle ending of a combined object.
 * @param dones iᵗʰ object done?
 * @returns combined object done?
 */
export type EndFunction = (dones: boolean[]) => boolean;




// CONSTANTS
// =========

/** You-Know-Who. */
const BAD_KEYS = ["__proto__", "prototype", "constructor"];




// METHODS
// =======

// ABOUT
// -----

/**
 * Check if value is an object.
 * @param v a value
 * @returns v is an object?
 */
export function is(v: any): v is object {
  return typeof v==='object';
}


/**
 * List all keys.
 * @param x an object
 * @returns k₀, k₁, ... | [kᵢ, vᵢ] ∈ x
 */
export function keys(x: object): Iterable<string> {
  return Object.keys(x);
}


/**
 * List all values.
 * @param x an object
 * @returns v₀, v₁, ... | [kᵢ, vᵢ] ∈ x
 */
export function values(x: object): Iterable<any> {
  return Object.values(x);
}


/**
 * List all key-value pairs.
 * @param x an object
 * @returns [k₀, v₀], [k₁, v₁], ... | [kᵢ, vᵢ] ∈ x
 */
export function entries(x: object): Entries {
  return Object.entries(x);
}


/**
 * Get value at specified key.
 * @param x an object
 * @param key key
 * @returns x[key]
 */
export function get(x: object, key: string): any {
  return x[key];
}




// GENERATE
// --------

/**
 * Creates object from entries.
 * @param es entries
 */
function fromEntries(es: Iterable<[string, any]>): object {
  var a = {};
  for(var [k, v] of es)
    a[k] = v;
  return a;
}
export default fromEntries;


/**
 * Creates object from lists.
 * @param ls lists, i.e. [keys, values]
 */
function fromLists(ls: [Iterable<string>, Iterable<any>]): object {
  var [ks, vs] = ls, a = {};
  var vi = vs[Symbol.iterator]();
  for(var k of ks)
    a[k] = vi.next().value;
  return a;
}
export default fromLists;




// COMPARE
// -------

/**
 * Compare two objects.
 * @param x an object
 * @param y another object
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns x=y: 0, otherwise: -ve/+ve
 */
export function compare(x: object, y: object, fc: CompareFunction=null, fm: MapFunction=null): number {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var ks = unionKeys(x, y);
  for (var k of ks) {
    if (!x.hasOwnProperty(k)) return -1;
    if (!y.hasOwnProperty(k)) return 1;
    var u = fm(x[k], k, x);
    var v = fm(y[k], k, y);
    var c = fc(u, v);
    if(c!==0) return c;
  }
  return 0;
}


/**
 * Check if two objects are equal.
 * @param x an object
 * @param y another object
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns fm(x[kᵢ]) ≈ fm(y[kᵢ]) ∀ kᵢ ∈ x, y
 */
export function isEqual(x: object, y: object, fc: CompareFunction=null, fm: MapFunction=null): boolean {
  return compare(x, y, fc, fm)===0;
}




// LENGTH
// ------

/**
 * Get the number of keys in an object.
 * @param x an object
 * @returns |x|
 */
export function size(x: object): number {
  return Object.keys(x).length;
}


/**
 * Gets size of object.
 * @param x an object
 */
function length(x: object): number {
  return size(x);
}
export default length;


/**
 * Check if an object is empty.
 * @param x an object
 * @returns |x| = 0?
 */
export function isEmpty(x: object): boolean {
  return size(x)===0;
}




// GET/SET
// -------

/**
 * Get values at keys.
 * @param x an object
 * @param keys keys
 * @returns [x[k], x[l], ...] | [k, l, ...] = keys
 */
export function getAll(x: object, keys: string[]): any[] {
  return keys.map(k => x[k]);
}


/**
 * Get value at path in a nested object.
 * @param x a nested object
 * @param path path
 * @returns x[p][q][...] | [p, q, ...] = path
 */
export function getPath(x: object, path: string[]): any {
  for (var k of path)
    x = is(x) && !BAD_KEYS.includes(k)? x[k] : undefined;
  return x;
}


/**
 * Checks if nested object has a path.
 * @param x a nested object
 * @param p path
 */
function hasPath(x: object, p: string[]): boolean {
  for(var k of p) {
    if(!is(x)) return false;
    x = x[k];
  }
  return true;
}
export default hasPath;


/**
 * Set value at specified key.
 * @param x an object
 * @param key key
 * @param value value
 * @returns ~ {...x, "key": value}
 */
export function set(x: object, key: string, value: any): object {
  return setX(Object.assign({}, x), key, value);
}


/**
 * Set value at specified key.
 * @param x an object (updated)
 * @param key key
 * @param value value
 * @returns x | x[key] = value
 */
export function setX(x: object, key: string, value: any): object {
  x[key] = value;
  return x;
}
export {setX as set$};


/**
 * Set value at path in a nested object.
 * @param x a nested object (updated)
 * @param path path
 * @param value value
 * @returns x | x[p][q][...] = value, [p, q, ...] = path
 */
export function setPathX(x: object, path: string[], value: any): any {
  var y = getPath(x, path.slice(0, -1));
  var k = last(path, '');
  if (is(y) && k && !BAD_KEYS.includes(k)) y[k] = value;
  return x;
}
export {setPathX as setPath$};


/**
 * Exchange two values in an object.
 * @param x an object
 * @param key1 a key
 * @param key2 another key
 * @returns ~ {...x, "key1": x[key2], "key2": x[key1]}
 */
export function swap(x: object, key1: string, key2: string): object {
  return swapX(Object.assign({}, x), key1, key2);
}


/**
 * Exchanges two values in an object.
 * @param x an object (updated)
 * @param k a key
 * @param l another key
 * @returns x
 */
export function swapX(x: object, k: string, l: string): object {
  var t = x[k]; x[k] = x[l]; x[l] = t;
  return x;
}
export {swapX as swap$};


/**
 * Delete an entry from object.
 * @param x an object
 * @param key key
 * @returns ~ {..x, "key": deleted}
 */
export function remove(x: object, key: string): object {
  var a = {};
  for (var k in x) {
    if (!x.hasOwnProperty(k)) continue;
    if (k!==key) a[k] = x[k];
  }
  return a;
}


/**
 * Delete an entry from object.
 * @param x an object (updated)
 * @param key key
 * @returns x | x[key] = deleted
 */
export function removeX(x: object, key: string): object {
  delete x[key];
  return x;
}
export {removeX as remove$};


/**
 * Remove value at path in a nested object.
 * @param x a nested object (updated)
 * @param path path
 * @returns x | x[p][q][...] = deleted, [p, q, ...] = path
 */
export function removePathX(x: object, path: string[]): any {
  var y = getPath(x, path.slice(0, -1));
  var k = last(path, '');
  if (is(y) && k) delete y[k];
  return x;
}
export {removePathX as removePath$};




// PROPERTY
// --------

import type {testFn} from './_types';

/**
 * Counts values which satisfy a test.
 * @param x an object
 * @param ft test function (v, k, x)
 */
function count(x: object, ft: testFn): number {
  var a = 0;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(ft(x[k], k, x)) a++;
  }
  return a;
}
export default count;


import id from './_id';
import type {mapFn} from './_types';

/**
 * Counts occurrences of values.
 * @param x an object
 * @param fm map function (v, k, x)
 * @returns Map {value => count}
 */
function countAs(x: object, fm: mapFn): Map<any, number> {
  var fm = fm||id;
  var a = new Map();
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var v1 = fm(x[k], k, x);
    var n = a.get(v1)||0;
    a.set(v1, n+1);
  }
  return a;
}
export default countAs;


import range from './range';
import type {compareFn, mapFn} from './_types';

/**
 * Finds smallest entry.
 * @param x an object
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 */
function min(x: object, fc: compareFn=null, fm: mapFn=null): [string, any] {
  return range(x, fc, fm)[0];
}
export default min;


import range from './range';
import type {compareFn, mapFn} from './_types';

/**
 * Finds largest entry.
 * @param x an object
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 */
function max(x: object, fc: compareFn=null, fm: mapFn=null): [string, any] {
  return range(x, fc, fm)[1];
}
export default max;


import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

/**
 * Finds smallest and largest entries.
 * @param x an object
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns [smallest, largest]
 */
function range(x: object, fc: compareFn=null, fm: mapFn=null): [[string, any], [string, any]] {
  var fc = fc||cmp, fm = fm||id;
  var mk: string, mu: any, mv: any;
  var nk: string, nu: any, nv: any;
  var i = 0;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var u = x[k], v = fm(u, k, x);
    if(i===0 || fc(v, mv)<0) { mk = k; mu = u; mv = v; }
    if(i===0 || fc(v, nv)>0) { nk = k; nu = u; nv = v; }
    i++;
  }
  return [[mk, mu], [nk, nu]];
}
export default range;




// PART
// ----

/**
 * Gets first entry.
 * @param x an object
 * @param ed default entry
 */
 function head(x: object, ed: [string, any]=[] as any): [string, any] {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    return [k, x[k]];
  }
  return ed;
}
export default head;


import drop from './drop';

/**
 * Gets object without the first entry.
 * @param x an object
 */
function tail(x: object): object {
  return drop(x, 1);
}
export default tail;


/**
 * Keeps first n entries only.
 * @param x an object
 * @param n number of entries (1)
 */
function take(x: object, n: number=1): object {
  var i = 0, a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(i++>=n) break;
    a[k] = x[k];
  }
  return a;
}
export default take;


/**
 * Keeps first n entries only.
 * @param x an object (updated)
 * @param n number of entries (1)
 * @returns x
 */
function take$(x: object, n: number=1): object {
  var i = 0;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(i++>=n) delete x[k];
  }
  return x;
}
export default take$;


/**
 * Removes first n entries.
 * @param x an object
 * @param n number of entries (1)
 */
function drop(x: object, n: number=1): object {
  var i = 0, a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(i++>=n) a[k] = x[k];
  }
  return a;
}
export default drop;


/**
 * Removes first n entries.
 * @param x an object (updated)
 * @param n number of entries (1)
 * @returns x
 */
function drop$(x: object, n: number=1): object {
  var i = 0;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(i++>=n) break;
    delete x[k];
  }
  return x;
}
export default drop$;




// ARRANGEMENTS
// ------------

import filterAt from './filterAt';
import {subsequences} from 'extra-array';

/**
 * Lists all possible subsets.
 * @param x an object
 * @param n number of entries (-1 => any)
 */
function* subsets(x: object, n: number=-1): IterableIterator<object> {
  for(var ks of subsequences(Object.keys(x), n))
    yield filterAt(x, ks);
}
export default subsets;


import {value} from 'extra-array';

/**
 * Picks an arbitrary key.
 * @param x an object
 * @param r random seed 0->1
 */
function key(x: object, r: number=Math.random()): string {
  return value(Object.keys(x), r);
}
export default key;


import {value as arrayValue} from 'extra-array';

/**
 * Picks an arbitrary value.
 * @param x an object
 * @param r random seed 0->1
 */
function value(x: object, r: number=Math.random()): any {
  return arrayValue(Object.values(x), r);
}
export default value;


import {value} from 'extra-array';

/**
 * Picks an arbitrary entry.
 * @param x an object
 * @param r random seed 0->1
 */
function entry(x: object, r: number=Math.random()): [string, any] {
  return value(Object.entries(x), r);
}
export default entry;


import filterAt from './filterAt';
import {subsequence} from 'extra-array';

/**
 * Picks an arbitrary subset.
 * @param x an object
 * @param n number of entries (-1 => any)
 * @param r random seed 0->1
 */
function subset(x: object, n: number=-1, r: number=Math.random()): object {
  var ks = subsequence(Object.keys(x), n, r);
  return filterAt(x, ks);
}
export default subset;




// FIND
// ----

/**
 * Checks if object has a key.
 * @param x an object
 * @param k key?
 */
function has(x: object, k: string): boolean {
  return x.hasOwnProperty(k);
}
export default has;


import searchValue from './searchValue';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if object has a value.
 * @param x an object
 * @param v value?
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 */
function hasValue(x: object, v: any, fc: compareFn=null, fm: mapFn=null): boolean {
  return searchValue(x, v, fc, fm)!=null;
}
export default hasValue;


import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if object has an entry.
 * @param x an object
 * @param e entry?
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 */
function hasEntry(x: object, e: [string, any], fc: compareFn=null, fm: mapFn=null): boolean {
  var fc = fc||cmp, fm = fm||id, [k, v] = e;
  return x.hasOwnProperty(k) && fc(fm(x[k], k, x), v)===0;
}
export default hasEntry;


/**
 * Check if object has a subset object.
 * @param x an object
 * @param y subset object?
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 */
export function hasSubset(x: object, y: object, fc: CompareFunction=null, fm: MapFunction=null): boolean {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  for (var k of Object.keys(y)) {
    if (!x.hasOwnProperty(k)) return false;
    var u1 = fm(x[k], k, x);
    var v1 = fm(y[k], k, y);
    if (fc(u1, v1)!==0) return false;
  }
  return true;
}


/**
 * Find value of an entry passing a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns x[k] | ft(x[k]) passes
 */
export function find(x: object, ft: TestFunction): any {
  for (var k of Object.keys(x))
    if (ft(x[k], k, x)) return x[k];
}


/**
 * Find values of entries passing a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns [x[k₀], x[k₁], ...] | ft(x[kᵢ]) passes
 */
export function findAll(x: object, ft: TestFunction): any[] {
  var a = [];
  for (var k of Object.keys(x))
    if (ft(x[k], k, x)) a.push(x[k]);
  return a;
}


/**
 * Find key of an entry passing a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns k | ft(x[k]) passes
 */
export function search(x: object, ft: TestFunction): string {
  for (var k of Object.keys(x))
    if (ft(x[k], k, x)) return k;
  return null;
}
export {search as scanUntil};


/**
 * Find all keys of entries passing a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns [k₀, k₁, ...] | ft(x[kᵢ]) passes
 */
export function searchAll(x: object, ft: TestFunction): string[] {
  var a = [];
  for (var k of Object.keys(x))
    if (ft(x[k], k, x)) a.push(k);
  return a;
}


/**
 * Find key with a given value.
 * @param x an object
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns k | fm(x[k]) ≈ fm(v)
 */
export function searchValue(x: object, v: any, fc: CompareFunction=null, fm: MapFunction=null): string {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var v1 = fm(v, null, null);
  for (var k of Object.keys(x)) {
    var u1 = fm(x[k], k, x);
    if (fc(u1, v1)===0) return k;
  }
  return null;
}


/**
 * Find keys with a given value.
 * @param x an object
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns [k₀, k₁, ...] | fm(x[kᵢ]) ≈ fm(v)
 */
export function searchValueAll(x: object, v: any, fc: CompareFunction=null, fm: MapFunction=null): string[] {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var v1 = fm(v, null, null), a = [];
  for (var k of Object.keys(x)) {
    var u1 = fm(x[k], k, x);
    if (fc(u1, v1)===0) a.push(k);
  }
  return a;
}


/**
 * Find key of an entry not passing a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns k | ft(x[k]) fails
 */
export function scanWhile(x: object, ft: TestFunction): string {
  for (var k of Object.keys(x))
    if (!ft(x[k], k, x)) return k;
  return null;
}




// FUNCTIONAL
// ----------

import type {calledFn} from './_types';

/**
 * Calls a function for each entry.
 * @param x an object
 * @param fc called function (v, k, x)
 */
function forEach(x: object, fc: calledFn): void {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    fc(x[k], k, x);
  }
}
export default forEach;


import scanUntil from './scanUntil';
import type {testFn} from './_types';

/**
 * Checks if any value satisfies a test.
 * @param x an object
 * @param ft test function (v, k, x)
 */
function some(x: object, ft: testFn): boolean {
  return scanUntil(x, ft)!=null;
}
export default some;


import scanWhile from './scanWhile';
import type {testFn} from './_types';

/**
 * Checks if all values satisfy a test.
 * @param x an object
 * @param ft test function (v, k, x)
 */
function every(x: object, ft: testFn): boolean {
  return scanWhile(x, ft)==null;
}
export default every;


import type {mapFn} from './_types';

/**
 * Updates values based on map function.
 * @param x an object
 * @param fm map function (v, k, x)
 */
function map(x: object, fm: mapFn): object {
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    a[k] = fm(x[k], k, x);
  }
  return a;
}
export default map;


import type {mapFn} from './_types';

/**
 * Updates values based on map function.
 * @param x an object (updated)
 * @param fm map function (v, k, x)
 * @returns x
 */
function map$(x: object, fm: mapFn): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    x[k] = fm(x[k], k, x);
  }
  return x;
}
export default map$;


import type {reduceFn} from './_types';

/**
 * Reduces values to a single value.
 * @param x an object
 * @param fr reduce function (acc, v, k, x)
 * @param acc initial value
 */
function reduce<T>(x: object, fr: reduceFn<T>, acc?: T): T {
  var init = arguments.length <= 2;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(init) { acc = x[k]; init = false; }
    else acc = fr(acc, x[k], k, x);
  }
  return acc;
}
export default reduce;


import type {testFn} from './_types';

/**
 * Keeps entries which pass a test.
 * @param x an object
 * @param ft test function (v, k, x)
 */
function filter(x: object, ft: testFn): object {
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(ft(x[k], k, x)) a[k] = x[k];
  }
  return a;
}
export default filter;


import type {testFn} from './_types';

/**
 * Keeps entries which pass a test.
 * @param x an object (updated)
 * @param ft test function (v, k, x)
 * @returns x
 */
function filter$(x: object, ft: testFn): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!ft(x[k], k, x)) delete x[k];
  }
  return x;
}
export default filter$;


/**
 * Gets object with given keys.
 * @param x an object
 * @param ks keys
 */
function filterAt(x: object, ks: string[]): object {
  var a = {};
  for(var k of ks)
    if(x.hasOwnProperty(k)) a[k] = x[k];
  return a;
}
export default filterAt;


/**
 * Gets object with given keys.
 * @param x an object (updated)
 * @param ks keys
 * @returns x
 */
function filterAt$(x: object, ks: string[]): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!ks.includes(k)) delete x[k];
  }
  return x;
}
export default filterAt$;


import type {testFn} from './_types';

/**
 * Discards entries which pass a test.
 * @param x an object
 * @param ft test function (v, k, x)
 */
function reject(x: object, ft: testFn): object {
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!ft(x[k], k, x)) a[k] = x[k];
  }
  return a;
}
export default reject;


import type {testFn} from './_types';

/**
 * Discards entries which pass a test.
 * @param x an object (updated)
 * @param ft test function (v, k, x)
 * @returns x
 */
function reject$(x: object, ft: testFn): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(ft(x[k], k, x)) delete x[k];
  }
  return x;
}
export default reject$;


/**
 * Gets object without given keys.
 * @param x an object
 * @param ks keys
 */
function rejectAt(x: object, ks: string[]): object {
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!ks.includes(k)) a[k] = x[k];
  }
  return a;
}
export default rejectAt;


/**
 * Gets object without given keys.
 * @param x an object (updated)
 * @param ks keys
 * @returns x
 */
function rejectAt$(x: object, ks: string[]): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(ks.includes(k)) delete x[k];
  }
  return x;
}
export default rejectAt$;


import id from './_id';
import type {mapFn, testFn} from './_types';

function flatTo(x: object, dep: number, fm: mapFn, ft: testFn, a: object): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var v1 = fm(x[k], k, x);
    if(dep!==0 && ft(v1, k, x)) flatTo(v1, dep-1, fm, ft, a);
    else a[k] = v1;
  }
  return a;
}

/**
 * Flattens nested object to given depth.
 * @param x a nested object
 * @param n maximum depth (-1 => all)
 * @param fm map function (v, k, x)
 * @param ft test function (v, k, x)
 */
function flat(x: object, n: number=-1, fm: mapFn=null, ft: testFn=null): object {
  var fm = fm||id, ft = ft||is;
  return flatTo(x, n, fm, ft, {});
}
export default flat;


import id from './_id';
import is from './is';
import type {mapFn, testFn} from './_types';

/**
 * Flattens nested object, using map function.
 * @param x a nested object
 * @param fm map function (v, k, x)
 * @param ft test function (v, k, x)
 */
function flatMap(x: object, fm: mapFn=null, ft: testFn=null): object {
  var fm = fm||id, ft = ft ||is;
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var v1 = fm(x[k], k, x);
    if(ft(v1, k, x)) Object.assign(a, v1);
    else a[k] = v1;
  }
  return a;
}
export default flatMap;


import id from './_id';
import unionKeys from './unionKeys';
import {some} from 'extra-iterable';
import type {mapFn, tillFn} from './_types';

/**
 * Combines entries from objects.
 * @param xs objects
 * @param fm map function (vs, k)
 * @param ft till function (dones) (some)
 * @param vd default value
 */
function zip(xs: object[], fm: mapFn=null, ft: tillFn=null, vd?: any): object {
  var fm = fm||id, ft = ft||some as tillFn;
  var ks = unionKeys(...xs), a = {};
  for(var k of ks) {
    var ds = xs.map(x => !x.hasOwnProperty(k));
    if(ft(ds)) break;
    var vs = xs.map(x => !x.hasOwnProperty(k)? vd : x[k]);
    a[k] = fm(vs, k, null);
  }
  return a;
}
export default zip;




// MANIPULATION
// ------------

import type {testFn} from './_types';

/**
 * Segregates values by test result.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns [satisfies, doesnt]
 */
function partition(x: object, ft: testFn): [object, object] {
  var t = {}, f = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(ft(x[k], k, x)) t[k] = x[k];
    else f[k] = x[k];
  }
  return [t, f];
}
export default partition;


import id from './_id';
import type {mapFn} from './_types';

/**
 * Segregates values by similarity.
 * @param x an object
 * @param fm map function (v, k, x)
 */
function partitionAs(x: object, fm: mapFn): Map<any, object> {
  var fm = fm||id;
  var a = new Map();
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var v1 = fm(x[k], k, x);
    if(!a.has(v1)) a.set(v1, {});
    a.get(v1)[k] = x[k];
  }
  return a;
}
export default partitionAs;


import filterAt from './filterAt';

/**
 * Breaks object into chunks of given size.
 * @param x an object
 * @param n chunk size (1)
 * @param s chunk step (n)
 */
function chunk(x: object, n: number=1, s: number=n): object[] {
  var ks = Object.keys(x), a = [];
  for(var i=0, I=ks.length; i<I; i+=s)
    a.push(filterAt(x, ks.slice(i, i+n)));
  return a;
}
export default chunk;




// COMBINE
// -------

/**
 * Combines entries from objects, preferring last.
 * @param xs objects
 */
function concat(...xs: object[]): object {
  return Object.assign({}, ...xs);
}
export default concat;


/**
 * Combines entries from objects, preferring last.
 * @param x an object (updated)
 * @param ys other objects
 * @returns x
 */
function concat$(x: object, ...ys: object[]): object {
  return Object.assign(x, ...ys);
}
export default concat$;


/**
 * Joins entries together.
 * @param x an object
 * @param sep separator (,)
 * @param asc associator (=)
 */
function join(x: object, sep: string=',', asc: string='='): string {
  var a = '';
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    a += k+asc+x[k]+sep;
  }
  return a.slice(0, -sep.length);
}
export default join;




// SET OPERATIONS
// --------------

/**
 * Checks if objects have no common keys.
 * @param x an object
 * @param y another object
 */
function isDisjoint(x: object, y: object): boolean {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(y.hasOwnProperty(k)) return false;
  }
  return true;
}
export default isDisjoint;


/**
 * Gives keys present in any object.
 * @param xs objects
 */
function unionKeys(...xs: object[]): Set<string> {
  var a = new Set<string>();
  for(var x of xs) {
    for(var k in x)
      if(x.hasOwnProperty(k)) a.add(k);
  }
  return a;
}
export default unionKeys;


import union$ from './union$';
import type {combineFn} from './_types';

/**
 * Gives entries present in any object.
 * @param x an object
 * @param y another object
 * @param fc combine function (a, b)
 */
function union(x: object, y: object, fc: combineFn=null): object {
  return union$(Object.assign({}, x), y, fc);
}
export default union;


import id from './_id';
import type {combineFn} from './_types';

/**
 * Gives entries present in any object.
 * @param x an object (updated)
 * @param y another object
 * @param fc combine function (a, b)
 * @returns x
 */
function union$(x: object, y: object, fc: combineFn=null): object {
  var fc = fc||id as combineFn;
  for(var k in y) {
    if(!y.hasOwnProperty(k)) continue;
    if(!x.hasOwnProperty(k)) x[k] = y[k];
    else x[k] = fc(x[k], y[k]);
  }
  return x;
}
export default union$;


/**
 * Gives keys present in all objects.
 * @param xs objects
 */
function intersectionKeys(...xs: object[]): Set<string> {
  var a = new Set<string>();
  if(xs.length===0) return a;
  var x = xs[0], ys = xs.slice(1);
  x: for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    for(var y of ys)
      if(!y.hasOwnProperty(k)) continue x;
    a.add(k);
  }
  return a;
}
export default intersectionKeys;


import id from './_id';
import type {combineFn} from './_types';

/**
 * Gives entries present in both objects.
 * @param x an object
 * @param y another object
 * @param fc combine function (a, b)
 */
function intersection(x: object, y: object, fc: combineFn=null): object {
  var fc = fc||id as combineFn;
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!y.hasOwnProperty(k)) continue;
    a[k] = fc(x[k], y[k]);
  }
  return a;
}
export default intersection;


import id from './_id';
import type {combineFn} from './_types';

/**
 * Gives entries present in both objects.
 * @param x an object (updated)
 * @param y another object
 * @param fc combine function (a, b)
 * @returns x
 */
function intersection$(x: object, y: object, fc: combineFn=null): object {
  var fc = fc||id as combineFn;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!y.hasOwnProperty(k)) delete x[k];
    else x[k] = fc(x[k], y[k]);
  }
  return x;
}
export default intersection$;


/**
 * Gives entries of object not present in another.
 * @param x an object
 * @param y another object
 */
function difference(x: object, y: object): object {
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!y.hasOwnProperty(k)) a[k] = x[k];
  }
  return a;
}
export default difference;


/**
 * Gives entries of object not present in another.
 * @param x an object (updated)
 * @param y another object
 * @returns x
 */
function difference$(x: object, y: object): object {
  for(var k in y) {
    if(!y.hasOwnProperty(k)) continue;
    if(x.hasOwnProperty(k)) delete x[k];
  }
  return x;
}
export default difference$;


import unionKeys from './unionKeys';

/**
 * Gives entries not present in both objects.
 * @param x an object
 * @param y another object
 */
function symmetricDifference(x: object, y: object): object {
  var a = {};
  for(var k of unionKeys(x, y)) {
    var xk = x.hasOwnProperty(k);
    var yk = y.hasOwnProperty(k);
    if(xk && !yk) a[k] = x[k];
    else if(!xk && yk) a[k] = y[k];
  }
  return a;
}
export default symmetricDifference;


/**
 * Gives entries not present in both objects.
 * @param x an object (updated)
 * @param y another object
 * @returns x
 */
function symmetricDifference$(x: object, y: object): object {
  for(var k in y) {
    if(!y.hasOwnProperty(k)) continue;
    if(x.hasOwnProperty(k)) delete x[k];
    else x[k] = y[k];
  }
  return x;
}
export default symmetricDifference$;


import id from './_id';
import type {mapFn} from './_types';

/**
 * Lists cartesian product of objects.
 * @param xs objects
 * @param fm map function (vs)
 */
function* cartesianProduct(xs: object[], fm: mapFn=null): IterableIterator<any> {
  var fm = fm||id;
  var XS  = xs.length;
  var kss = xs.map(x => Object.keys(x));
  var ls = kss.map(ks => ks.length);
  var is = kss.map(ks => 0);
  while(true) {
    var a = {};
    for(var n=0; n<XS; n++) {
      var i  = is[n],  x = xs[n];
      var ks = kss[n], k = ks[i];
      a[k] = x[k];
    }
    yield fm(a, null, null);
    for(var r=XS-1; r>=0; r--) {
      is[r]++;
      if(is[r]<ls[r]) break;
      is[r] = 0;
    }
    if(r<0) break;
  }
}
export default cartesianProduct;
