import {IDENTITY} from "extra-function";
import {COMPARE}  from "extra-function";
import {last}        from "extra-array";
import {subsequence} from "extra-array";




// CUSTOM
// ======
// - https://www.measurethat.net/Benchmarks/Show/19863/0/object-iterate-keys

// TYPES: *FUNCTION
// -----------------

/**
 * Handle comparison of two values.
 * @param a a value
 * @param b another value
 * @returns a<b: -ve, a=b: 0, a>b: +ve
 */
export type CompareFunction = (a: any, b: any) => number;


/**
 * Handle selection of entries in an object.
 * @param v value of entry in object
 * @param k key of entry in object
 * @param x object containing the entry
 * @returns whether it is selected
 */
export type TestFunction = (v: any, k: string, x: object) => boolean;

/**
 * Handle transformation of a value to another.
 * @param v value of entry in object
 * @param k key of entry in object
 * @param x object containing the entry
 * @returns transformed value
 */
export type MapFunction = (v: any, k: string, x: object) => any;




// ABOUT: GET, SET, REMOVE
// -----------------------

/**
 * Check if a value is object.
 * @param value a value
 * @returns is object?
 */
export function is(value: any): value is object {
  return typeof value==='object';
}


const BAD_KEYS = ['__proto__', 'prototype', 'constructor'];

/**
 * Get value at specified key.
 * @param x an object
 * @param key key
 * @returns x[key]
 */
export function get(x: object, key: string): any {
  return x[key];
}


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
 * Get values at keys.
 * @param x an object
 * @param keys keys
 * @returns [x[k], x[l], ...] | [k, l, ...] = keys
 */
export function getAll(x: object, keys: string[]): any[] {
  return keys.map(k => x[k]);
}


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




// ABOUT: SWAP, SIZE
// -----------------

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
 * Get the number of keys in an object.
 * @param x an object
 * @returns |x|
 */
export function size(x: object): number {
  return Object.keys(x).length;
}




// RANDOM PICK: *SUBSET*
// ---------------------





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




// SEARCH: IS*, COMPARE
// --------------------

/**
 * Check if an object is empty.
 * @param x an object
 * @returns |x| = 0?
 */
export function isEmpty(x: object): boolean {
  return size(x)===0;
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




// SEARCH: FIND*, SEARCH*, SCAN*
// -----------------------------

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
