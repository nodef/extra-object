import {
  IDENTITY,
  COMPARE,
} from "@nodef/extra-function";
import {
  last              as arrayLast,
  some              as arraySome,
  subsequences      as arraySubsequences,
  randomValue       as arrayRandomValue,
  randomSubsequence as arrayRandomSubsequence,
} from "@nodef/extra-array";

// - https://www.measurethat.net/Benchmarks/Show/19863/0/object-iterate-keys




// TYPES
// ======

/** A dictionary is a mapping of string keys to unknown values. */
export type Dictionary = Record<string, unknown>;
export type {Dictionary as Dict};


/** Entries is a list of key-value pairs, with unique keys (indices). */
export type Entries = Iterable<[string, unknown]>;


/** Lists is a pair of key list and value list, with unique keys (indices). */
export type Lists = [Iterable<string>, Iterable<unknown>];


/**
 * Handle reading of a single value.
 * @returns value
 */
export type ReadFunction<T> = () => T;


/**
 * Handle combining of two values.
 * @param a a value
 * @param b another value
 * @returns combined value
 */
export type CombineFunction = (a: unknown, b: unknown) => unknown;


/**
 * Handle comparison of two values.
 * @param a a value
 * @param b another value
 * @returns a<b: -ve, a=b: 0, a>b: +ve
 */
export type CompareFunction = (a: unknown, b: unknown) => number;


/**
 * Handle processing of values in an object.
 * @param v value in object
 * @param k key of value in object
 * @param x object containing the value
 */
export type ProcessFunction = (v: unknown, k: string, x: Dictionary) => void;


/**
 * Handle selection of entries in an object.
 * @param v value in object
 * @param k key of value in object
 * @param x object containing the value
 * @returns selected?
 */
export type TestFunction = (v: unknown, k: string, x: Dictionary) => boolean;


/**
 * Handle transformation of a value to another.
 * @param v value in object
 * @param k key of value in object
 * @param x object containing the value
 * @returns transformed value
 */
export type MapFunction = (v: unknown, k: string, x: Dictionary | null) => unknown;


/**
 * Handle reduction of multiple values into a single value.
 * @param acc accumulator (temporary result)
 * @param v value in object
 * @param k key of value in object
 * @param x object containing the value
 * @returns reduced value
 */
export type ReduceFunction = (acc: unknown, v: unknown, k: string, x: Dictionary) => unknown;


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
 * Check if value is a dictionary.
 * @param v a value
 * @returns v is a dictionary?
 */
export function is(v: unknown): v is Dictionary {
  return typeof v==="object";
}


/**
 * List all keys.
 * @param x an object
 * @returns k₀, k₁, ... | [kᵢ, vᵢ] ∈ x
 */
export function keys(x: Dictionary): Iterable<string> {
  return Object.keys(x);
}


/**
 * List all values.
 * @param x an object
 * @returns v₀, v₁, ... | [kᵢ, vᵢ] ∈ x
 */
export function values(x: Dictionary): Iterable<unknown> {
  return Object.values(x);
}


/**
 * List all key-value pairs.
 * @param x an object
 * @returns [k₀, v₀], [k₁, v₁], ... | [kᵢ, vᵢ] ∈ x
 */
export function entries(x: Dictionary): Entries {
  return Object.entries(x);
}




// GENERATE
// --------

/**
 * Convert entries to object.
 * @param x entries
 * @returns x as object
 */
export function fromEntries(x: Entries): Dictionary {
  const a: Dictionary = {};
  for (const [k, v] of x)
    a[k] = v;
  return a;
}


/**
 * Convert lists to object.
 * @param x lists, i.e. [keys, values]
 * @returns x as object
 */
export function fromLists(x: Lists): Dictionary {
  const [ks, vs] = x, a: Dictionary = {};
  const iv = vs[Symbol.iterator]();
  for (const k of ks)
    a[k] = iv.next().value;
  return a;
}




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
export function compare(x: Dictionary, y: Dictionary, fc: CompareFunction | null=null, fm: MapFunction | null=null): number {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const ks = unionKeys(x, y);
  for (const k of ks) {
    if (!has(x, k)) return -1;
    if (!has(y, k)) return 1;
    const wx = fm(x[k], k, x);
    const wy = fm(y[k], k, y);
    const c  = fc(wx, wy);
    if (c!==0) return c;
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
export function isEqual(x: Dictionary, y: Dictionary, fc: CompareFunction | null=null, fm: MapFunction | null=null): boolean {
  return compare(x, y, fc, fm)===0;
}




// SIZE
// ----

/**
 * Get the number of keys in an object.
 * @param x an object
 * @returns |x|
 */
export function size(x: Dictionary): number {
  return Object.keys(x).length;
}
export {size as length};


/**
 * Check if an object is empty.
 * @param x an object
 * @returns |x| = 0?
 */
export function isEmpty(x: Dictionary): boolean {
  return size(x)===0;
}




// GET/SET
// -------

/**
 * Get value at specified key.
 * @param x an object
 * @param k key
 * @returns x[k]
 */
export function get(x: Dictionary, k: string): unknown {
  return x[k];
}


/**
 * Get values at keys.
 * @param x an object
 * @param ks keys
 * @returns [x[k], x[l], ...] | [k, l, ...] = ks
 */
export function getAll(x: Dictionary, ks: string[]): unknown[] {
  return ks.map(k => x[k]);
}


/**
 * Get value at path in a nested object.
 * @param x a nested object
 * @param p path
 * @returns x[k₀][k₁][...] | [k₀, k₁, ...] = p
 */
export function getPath(x: Dictionary, p: string[]): unknown {
  let xany: unknown = x;
  for (const k of p)
    xany = is(xany) && !BAD_KEYS.includes(k)? xany[k] : undefined;
  return xany;
}


/**
 * Check if nested object has a path.
 * @param x a nested object
 * @param p path
 * @returns x[k₀][k₁][...] exists? | [k₀, k₁, ...] = p
 */
export function hasPath(x: Dictionary, p: string[]): boolean {
  let xany: unknown = x;
  for (const k of p) {
    if (!is(xany)) return false;
    xany = xany[k];
  }
  return true;
}


/**
 * Set value at specified key.
 * @param x an object
 * @param k key
 * @param v value
 * @returns x' | x' = x; x'[k] = v
 */
export function set(x: Dictionary, k: string, v: unknown): Dictionary {
  return set$(Object.assign({}, x), k, v);
}


/**
 * Set value at specified key.
 * @param x an object (updated)
 * @param k key
 * @param v value
 * @returns x | x[k] = v
 */
export function set$(x: Dictionary, k: string, v: unknown): Dictionary {
  x[k] = v;
  return x;
}


/**
 * Set value at path in a nested object.
 * @param x a nested object (updated)
 * @param p path
 * @param v value
 * @returns x | x[k₀][k₁][...] = v; [k₀, k₁, ...] = p
 */
export function setPath$(x: Dictionary, p: string[], v: unknown): Dictionary {
  const y = getPath(x, p.slice(0, -1));
  const k = arrayLast(p, "");
  if (is(y) && k && !BAD_KEYS.includes(k)) y[k] = v;
  return x;
}


/**
 * Exchange two values in an object.
 * @param x an object
 * @param k a key
 * @param l another key
 * @returns x' | x' = x; x'[k] = x[l]; x'[l] = x[k]
 */
export function swap(x: Dictionary, k: string, l: string): Dictionary {
  return swap$(Object.assign({}, x), k, l);
}


/**
 * Exchange two values in an object.
 * @param x an object (updated)
 * @param k a key
 * @param l another key
 * @returns x | x[i] ↔ x[j]
 */
export function swap$(x: Dictionary, k: string, l: string): Dictionary {
  const t = x[k];
  x[k] = x[l];
  x[l] = t;
  return x;
}


/**
 * Remove an entry from object.
 * @param x an object
 * @param k key
 * @returns x \\: [k]
 */
export function remove(x: Dictionary, k: string): Dictionary {
  const a: Dictionary = {};
  for (const l in x) {
    if (!has(x, l)) continue;
    if (l!==k) a[l] = x[l];
  }
  return a;
}


/**
 * Remove an entry from object.
 * @param x an object (updated)
 * @param k key
 * @returns x = x \\: [k]
 */
export function remove$(x: Dictionary, k: string): Dictionary {
  delete x[k];
  return x;
}


/**
 * Remove value at path in a nested object.
 * @param x a nested object (updated)
 * @param p path
 * @returns x = x \\: [k₀][k₁][...] | [k₀, k₁, ...] = p
 */
export function removePath$(x: Dictionary, p: string[]): Dictionary {
  const y = getPath(x, p.slice(0, -1));
  const k = arrayLast(p, "");
  if (is(y) && k) delete y[k];
  return x;
}




// PROPERTY
// --------

/**
 * Count values which satisfy a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns Σtᵢ | tᵢ = 1 if ft(vᵢ) else 0; [kᵢ, vᵢ] ∈ x
 */
export function count(x: Dictionary, ft: TestFunction): number {
  let a = 0;
  for (const k in x) {
    if (!has(x, k)) continue;
    if (ft(x[k], k, x)) ++a;
  }
  return a;
}


/**
 * Count occurrences of values.
 * @param x an object
 * @param fm map function (v, k, x)
 * @returns Map \{value ⇒ count\}
 */
export function countAs(x: Dictionary, fm: MapFunction | null=null): Map<unknown, number> {
  fm = fm || IDENTITY;
  const a  = new Map();
  for (const k in x) {
    if (!has(x, k)) continue;
    const w = fm(x[k], k, x);
    const n = a.get(w) || 0;
    a.set(w, n+1);
  }
  return a;
}


/**
 * Find smallest value.
 * @param x an object
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns v | v ≤ vᵢ; [kᵢ, vᵢ] ∈ x
 */
export function min(x: Dictionary, fc: CompareFunction | null=null, fm: MapFunction | null=null): unknown {
  return rangeEntries(x, fc, fm)[0][1];
}


/**
 * Find smallest entry.
 * @param x an object
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns [min_key, min_value]
 */
export function minEntry(x: Dictionary, fc: CompareFunction | null=null, fm: MapFunction | null=null): [string, unknown] {
  return rangeEntries(x, fc, fm)[0];
}


/**
 * Find largest value.
 * @param x an object
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns v | v ≥ vᵢ; [kᵢ, vᵢ] ∈ x
 */
export function max(x: Dictionary, fc: CompareFunction | null=null, fm: MapFunction | null=null): unknown {
  return rangeEntries(x, fc, fm)[1][1];
}


/**
 * Find largest entry.
 * @param x an object
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns [max_key, max_value]
 */
export function maxEntry(x: Dictionary, fc: CompareFunction | null=null, fm: MapFunction | null=null): [string, unknown] {
  return rangeEntries(x, fc, fm)[1];
}


/**
 * Find smallest and largest values.
 * @param x a map
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns [min_value, max_value]
 */
export function range(x: Dictionary, fc: CompareFunction | null=null, fm: MapFunction | null=null): [unknown, unknown] {
  const [a, b] = rangeEntries(x, fc, fm);
  return [a[1], b[1]];
}


/**
 * Find smallest and largest entries.
 * @param x an object
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns [min_entry, max_entry]
 */
export function rangeEntries(x: Dictionary, fc: CompareFunction | null=null, fm: MapFunction | null=null): [[string, unknown], [string, unknown]] {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  let mk: string | undefined, mu: unknown, mv: unknown;
  let nk: string | undefined, nu: unknown, nv: unknown;
  let i = 0;
  for (const k in x) {
    if (!has(x, k)) continue;
    const u = x[k], v = fm(u, k, x);
    if (i===0 || fc(v, mv)<0) { mk = k; mu = u; mv = v; }
    if (i===0 || fc(v, nv)>0) { nk = k; nu = u; nv = v; }
    ++i;
  }
  return [[mk as string, mu], [nk as string, nu]];
}




// PART
// ----

/**
 * Gets first entry from object (default order).
 * @param x an object
 * @param ed default entry
 * @returns [k₀, v₀] if x ≠ Φ else ed | [k₀, v₀] ∈ x
 */
export function head(x: Dictionary, ed: [string, unknown]=[] as unknown as [string, unknown]): [string, unknown] {
  for (const k in x) {
    if (!has(x, k)) continue;
    return [k, x[k]];
  }
  return ed;
}


/**
 * Get object without its first entry (default order).
 * @param x an object
 * @returns x \\ \{[k₀, v₀]\} if x ≠ Φ else x | [k₀, v₀] ∈ x
 */
export function tail(x: Dictionary): Dictionary {
  return drop(x, 1);
}


/**
 * Keep first n entries only (default order).
 * @param x an object
 * @param n number of entries [1]
 * @returns \{[k₀, v₀], [k₁, v₁], ...\} | [kᵢ, vᵢ] ∈ x and |\{[k₀, v₀], [k₁, v₁], ...\}| ≤ n
 */
export function take(x: Dictionary, n: number=1): Dictionary {
  let i = -1; const a: Dictionary = {};
  for (const k in x) {
    if (!has(x, k)) continue;
    if (++i>=n) break;
    a[k] = x[k];
  }
  return a;
}


/**
 * Keep first n entries only (default order).
 * @param x an object (updated)
 * @param n number of entries [1]
 * @returns x = \{[k₀, v₀], [k₁, v₁], ...\} | [kᵢ, vᵢ] ∈ x and |\{[k₀, v₀], [k₁, v₁], ...\}| ≤ n
 */
export function take$(x: Dictionary, n: number=1): Dictionary {
  let i = -1;
  for (const k in x) {
    if (!has(x, k)) continue;
    if (++i>=n) delete x[k];
  }
  return x;
}


/**
 * Remove first n entries (default order).
 * @param x an object
 * @param n number of entries [1]
 * @returns \{[kₙ, vₙ], [kₙ₊₁, vₙ₊₁], ...\} | [kᵢ, vᵢ] ∈ x and |\{[kₙ, vₙ], [kₙ₊₁, vₙ₊₁], ...\}| ≤ max(|x| - n, 0)
 */
export function drop(x: Dictionary, n: number=1): Dictionary {
  let i = -1; const a: Dictionary = {};
  for (const k in x) {
    if (!has(x, k)) continue;
    if (++i>=n) a[k] = x[k];
  }
  return a;
}


/**
 * Remove first n entries (default order).
 * @param x an object (updated)
 * @param n number of entries [1]
 * @returns x = \{[kₙ, vₙ], [kₙ₊₁, vₙ₊₁], ...\} | [kᵢ, vᵢ] ∈ x and |\{[kₙ, vₙ], [kₙ₊₁, vₙ₊₁], ...\}| ≤ max(|x| - n, 0)
 */
export function drop$(x: Dictionary, n: number=1): Dictionary {
  let i = -1;
  for (const k in x) {
    if (!has(x, k)) continue;
    if (++i>=n) break;
    delete x[k];
  }
  return x;
}




// ARRANGEMENTS
// ------------

/**
 * List all possible subsets.
 * @param x an object
 * @param n number of entries [-1 ⇒ any]
 * @returns entries selected by bit from 0..2^|x| if n<0; only of length n otherwise
 */
export function* subsets(x: Dictionary, n: number=-1): IterableIterator<object> {
  for (const ks of arraySubsequences(Object.keys(x), n))
    yield filterAt(x, ks);
}


/**
 * Pick an arbitrary key.
 * @param x an object
 * @param fr random number generator ([0, 1))
 * @returns kᵢ | [kᵢ, vᵢ] ∈ x
 */
export function randomKey(x: Dictionary, fr: ReadFunction<number> | null=Math.random): string {
  return arrayRandomValue(Object.keys(x), fr);
}
export {randomKey as key};


/**
 * Pick an arbitrary entry.
 * @param x an object
 * @param fr random number generator ([0, 1))
 * @returns [kᵢ, vᵢ] | [kᵢ, vᵢ] ∈ x
` */
export function randomEntry(x: Dictionary, fr: ReadFunction<number> | null=Math.random): [string, unknown] {
  return arrayRandomValue(Object.entries(x), fr);
}
export {randomEntry as entry};


/**
 * Pick an arbitrary subset.
 * @param x an object
 * @param n number of entries [-1 ⇒ any]
 * @param fr random number generator ([0, 1))
 * @returns \{[kᵢ, vᵢ], [kⱼ, vⱼ], ...\} | [kᵢ, vᵢ], [kⱼ, vⱼ], ... ∈ x; |\{[kᵢ, vᵢ], [kⱼ, vⱼ], ...\}| = |x| if n<0 else n
 */
export function randomSubset(x: Dictionary, n: number=-1, fr: ReadFunction<number> | null=Math.random): Dictionary {
  const ks = arrayRandomSubsequence(Object.keys(x), n, fr);
  return filterAt(x, ks as string[]);
}
export {randomSubset as subset};




// FIND
// ----

/**
 * Check if object has a key.
 * @param x an object
 * @param k search key
 * @returns [k, *] ∈ x?
 */
export function has(x: Dictionary, k: string): boolean {
  return Object.prototype.hasOwnProperty.call(x, k);
}
export {has as hasKey};


/**
 * Check if object has a value.
 * @param x an object
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns [*, v] ∈ x?
 */
export function hasValue(x: Dictionary, v: unknown, fc: CompareFunction | null=null, fm: MapFunction | null=null): boolean {
  return searchValue(x, v, fc, fm)!=null;
}


/**
 * Check if object has an entry.
 * @param x an object
 * @param e search entry ([k, v])
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns [k, v] ∈ x? | [k, v] = e
 */
export function hasEntry(x: Dictionary, e: [string, unknown], fc: CompareFunction | null=null, fm: MapFunction | null=null): boolean {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const [k, v] = e;
  return has(x, k) && fc(fm(x[k], k, x), v)===0;
}


/**
 * Check if object has a subset.
 * @param x an object
 * @param y search subset
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns y ⊆ x?
 */
export function hasSubset(x: Dictionary, y: Dictionary, fc: CompareFunction | null=null, fm: MapFunction | null=null): boolean {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  for (const k of Object.keys(y)) {
    if (!has(x, k)) return false;
    const wx = fm(x[k], k, x);
    const wy = fm(y[k], k, y);
    if (fc(wx, wy)!==0) return false;
  }
  return true;
}


/**
 * Find value of an entry passing a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns v | ft(v) = true; [k, v] ∈ x
 */
export function find(x: Dictionary, ft: TestFunction): unknown {
  for (const k of Object.keys(x))
    if (ft(x[k], k, x)) return x[k];
}


/**
 * Find values of entries passing a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns [vₒ, v₁, ...] | ft(vᵢ) = true; [kᵢ, vᵢ] ∈ x
 */
export function findAll(x: Dictionary, ft: TestFunction): unknown[] {
  const a = [];
  for (const k of Object.keys(x))
    if (ft(x[k], k, x)) a.push(x[k]);
  return a;
}


/**
 * Find key of an entry passing a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns k | ft(x[k]) passes
 */
export function search(x: Dictionary, ft: TestFunction): string | null {
  for (const k of Object.keys(x))
    if (ft(x[k], k, x)) return k;
  return null;
}


/**
 * Find all keys of entries passing a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns [k₀, k₁, ...] | ft(x[kᵢ]) passes
 */
export function searchAll(x: Dictionary, ft: TestFunction): string[] {
  const a = [];
  for (const k of Object.keys(x))
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
export function searchValue(x: Dictionary, v: unknown, fc: CompareFunction | null=null, fm: MapFunction | null=null): string | null {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const w  = fm(v, null as unknown as string, null);
  for (const k of Object.keys(x)) {
    const wx = fm(x[k], k, x);
    if (fc(wx, w)===0) return k;
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
export function searchValueAll(x: Dictionary, v: unknown, fc: CompareFunction | null=null, fm: MapFunction | null=null): string[] {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const w  = fm(v, null as unknown as string, null), a = [];
  for (const k of Object.keys(x)) {
    const wx = fm(x[k], k, x);
    if (fc(wx, w)===0) a.push(k);
  }
  return a;
}




// FUNCTIONAL
// ----------

/**
 * Call a function for each entry.
 * @param x an object
 * @param fp called function (v, k, x)
 */
export function forEach(x: Dictionary, fp: ProcessFunction): void {
  for (const k in x) {
    if (!has(x, k)) continue;
    fp (x[k], k, x);
  }
}


/**
 * Check if any value satisfies a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns true if ft(vᵢ) = true for some [kᵢ, vᵢ] ∈ x
 */
export function some(x: Dictionary, ft: TestFunction | null=null): boolean {
  ft = ft || IDENTITY as TestFunction;
  for (const k in x) {
    if (!has(x, k)) continue;
    if (ft(x[k], k, x)) return true;
  }
  return false;
}


/**
 * Check if all values satisfy a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns true if ft(vᵢ) = true for all [kᵢ, vᵢ] ∈ x
 */
export function every(x: Dictionary, ft: TestFunction): boolean {
  for (const k in x) {
    if (!has(x, k)) continue;
    if (!ft(x[k], k, x)) return false;
  }
  return true;
}


/**
 * Transform values of an object.
 * @param x an object
 * @param fm map function (v, k, x)
 * @returns \{[k₀, fm(v₀)], [k₁, fm(v₁)], ...\} | [kᵢ, vᵢ] ∈ x
 */
export function map(x: Dictionary, fm: MapFunction): Dictionary {
  const a: Dictionary = {};
  for (const k in x) {
    if (!has(x, k)) continue;
    a[k] = fm(x[k], k, x);
  }
  return a;
}


/**
 * Transform values of an object.
 * @param x an object (updated)
 * @param fm map function (v, k, x)
 * @returns x = \{[k₀, fm(v₀)], [k₁, fm(v₁)], ...\} | [kᵢ, vᵢ] ∈ x
 */
export function map$(x: Dictionary, fm: MapFunction): Dictionary {
  for (const k in x) {
    if (!has(x, k)) continue;
    x[k] = fm(x[k], k, x);
  }
  return x;
}


/**
 * Reduce values to a single value.
 * @param x an object
 * @param fr reduce function (acc, v, k, x)
 * @param acc initial value
 * @returns fr(fr(acc, v₀), v₁)... | fr(acc, v₀) = v₀ if acc not given
 */
export function reduce(x: Dictionary, fr: ReduceFunction, acc?: unknown): unknown {
  let init = arguments.length <= 2;
  for (const k in x) {
    if (!has(x, k)) continue;
    if (init) { acc = x[k]; init = false; }
    else acc = fr(acc, x[k], k, x);
  }
  return acc;
}


/**
 * Keep entries which pass a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns \{[k₀, v₀], [k₁, v₁], ...\} | ft(vᵢ) = true; [kᵢ, vᵢ] ∈ x
 */
export function filter(x: Dictionary, ft: TestFunction): Dictionary {
  const a: Dictionary = {};
  for (const k in x) {
    if (!has(x, k)) continue;
    if (ft(x[k], k, x)) a[k] = x[k];
  }
  return a;
}


/**
 * Keep entries which pass a test.
 * @param x an object (updated)
 * @param ft test function (v, k, x)
 * @returns x = \{[k₀, v₀], [k₁, v₁], ...\} | ft(vᵢ) = true; [kᵢ, vᵢ] ∈ x
 */
export function filter$(x: Dictionary, ft: TestFunction): Dictionary {
  for (const k in x) {
    if (!has(x, k)) continue;
    if (!ft(x[k], k, x)) delete x[k];
  }
  return x;
}


/**
 * Get object with given keys.
 * @param x an object
 * @param ks keys
 * @returns \{[k₀, v₀], [k₁, v₁], ...\} | kᵢ ∈ ks; [kᵢ, vᵢ] ∈ x
 */
export function filterAt(x: Dictionary, ks: string[]): Dictionary {
  const a: Dictionary = {};
  for (const k of ks)
    if (has(x, k)) a[k] = x[k];
  return a;
}


/**
 * Get object with given keys.
 * @param x an object (updated)
 * @param ks keys
 * @returns x = \{[k₀, v₀], [k₁, v₁], ...\} | kᵢ ∈ ks; [kᵢ, vᵢ] ∈ x
 */
export function filterAt$(x: Dictionary, ks: string[]): Dictionary {
  for (const k in x) {
    if (!has(x, k)) continue;
    if (!ks.includes(k)) delete x[k];
  }
  return x;
}


/**
 * Discard entries which pass a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns \{[k₀, v₀], [k₁, v₁], ...\} | ft(vᵢ) = false; [kᵢ, vᵢ] ∈ x
 */
export function reject(x: Dictionary, ft: TestFunction): Dictionary {
  const a: Dictionary = {};
  for (const k in x) {
    if (!has(x, k)) continue;
    if (!ft(x[k], k, x)) a[k] = x[k];
  }
  return a;
}


/**
 * Discard entries which pass a test.
 * @param x an object (updated)
 * @param ft test function (v, k, x)
 * @returns x = \{[k₀, v₀], [k₁, v₁], ...\} | ft(vᵢ) = false; [kᵢ, vᵢ] ∈ x
 */
export function reject$(x: Dictionary, ft: TestFunction): Dictionary {
  for (const k in x) {
    if (!has(x, k)) continue;
    if (ft(x[k], k, x)) delete x[k];
  }
  return x;
}


/**
 * Get object without given keys.
 * @param x an object
 * @param ks keys
 * @returns \{[k₀, v₀], [k₁, v₁], ...\} | kᵢ ∉ ks; [kᵢ, vᵢ] ∈ x
 */
export function rejectAt(x: Dictionary, ks: string[]): Dictionary {
  const a: Dictionary = {};
  for (const k in x) {
    if (!has(x, k)) continue;
    if (!ks.includes(k)) a[k] = x[k];
  }
  return a;
}


/**
 * Get object without given keys.
 * @param x an object (updated)
 * @param ks keys
 * @returns x = \{[k₀, v₀], [k₁, v₁], ...\} | kᵢ ∉ ks; [kᵢ, vᵢ] ∈ x
 */
export function rejectAt$(x: Dictionary, ks: string[]): Dictionary {
  for (const k in x) {
    if (!has(x, k)) continue;
    if (ks.includes(k)) delete x[k];
  }
  return x;
}


/**
 * Flatten nested object to given depth.
 * @param x a nested object
 * @param n maximum depth [-1 ⇒ all]
 * @param fm map function (v, k, x)
 * @param ft test function for flatten (v, k, x)
 * @returns flat map
 */
export function flat(x: Dictionary, n: number=-1, fm: MapFunction | null=null, ft: TestFunction | null=null): Dictionary {
  fm = fm || IDENTITY;
  ft = ft || is;
  return flatTo$({}, x, n, fm, ft);
}

function flatTo$(a: Dictionary, x: Dictionary, dep: number, fm: MapFunction, ft: TestFunction): Dictionary {
  for (const k in x) {
    if (!has(x, k)) continue;
    const w = fm(x[k], k, x);
    if (dep!==0 && ft(w, k, x)) flatTo$(a, w as Dictionary, dep-1, fm, ft);
    else a[k] = w;
  }
  return a;
}


/**
 * Flatten nested object, using map function.
 * @param x a nested object
 * @param fm map function (v, k, x)
 * @param ft test function (v, k, x)
 * @returns flat map
 */
export function flatMap(x: Dictionary, fm: MapFunction | null=null, ft: TestFunction | null=null): Dictionary {
  fm = fm || IDENTITY;
  ft = ft || is;
  const a: Dictionary = {};
  for (const k in x) {
    if (!has(x, k)) continue;
    const w = fm(x[k], k, x);
    if (ft(w, k, x)) Object.assign(a, w);
    else a[k] = w;
  }
  return a;
}


/**
 * Combine matching entries from objects.
 * @param xs objects
 * @param fm map function (vs, k)
 * @param fe end function (dones) [array.some]
 * @param vd default value
 * @returns \{"k₀": fm([x₀[k₀], x₁[k₀], ...]), "k₁": fm([x₀[k₁], x₁[k₁], ...]), ...\}
 */
export function zip(xs: Dictionary[], fm: MapFunction | null=null, fe: EndFunction | null=null, vd?: unknown): Dictionary {
  fm = fm || IDENTITY;
  fe = fe || arraySome as EndFunction;
  const ks = unionKeys(...xs), a: Dictionary = {};
  for (const k of ks) {
    const ds = xs.map(x => !has(x, k));
    if (fe(ds)) break;
    const vs = xs.map(x => !has(x, k)? vd : x[k]);
    a[k] = fm(vs, k, null);
  }
  return a;
}




// MANIPULATION
// ------------

/**
 * Segregate entries by test result.
 * @param x an object
 * @param ft test function (v, k, x)
 * @returns [satisfies, doesnt]
 */
export function partition(x: Dictionary, ft: TestFunction): [object, object] {
  const t: Dictionary = {};
  const f: Dictionary = {};
  for (const k in x) {
    if (!has(x, k)) continue;
    if (ft(x[k], k, x)) t[k] = x[k];
    else f[k] = x[k];
  }
  return [t, f];
}


/**
 * Segregate entries by similarity.
 * @param x an object
 * @param fm map function (v, k, x)
 * @returns Map \{key ⇒ values\}
 */
export function partitionAs(x: Dictionary, fm: MapFunction): Map<unknown, object> {
  fm = fm || IDENTITY;
  const a = new Map();
  for (const k in x) {
    if (!has(x, k)) continue;
    const w = fm(x[k], k, x);
    if (!a.has(w)) a.set(w, {});
    a.get(w)[k] = x[k];
  }
  return a;
}


/**
 * Break object into chunks of given size.
 * @param x an object
 * @param n chunk size [1]
 * @param s chunk step [n]
 * @returns [x[0..n], x[s..s+n], x[2s..2s+n], ...]
 */
export function chunk(x: Dictionary, n: number=1, s: number=n): Dictionary[] {
  const ks = Object.keys(x), a = [];
  const I = ks.length;
  for (let i=0; i<I; i+=s)
    a.push(filterAt(x, ks.slice(i, i+n)));
  return a;
}




// COMBINE
// -------

/**
 * Combine entries from objects, preferring last.
 * @param xs objects
 * @returns x₀ ∪ x₁ ∪ ... | [x₀, x₁, ...] = xs
 */
export function concat(...xs: Dictionary[]): Dictionary {
  return Object.assign({}, ...xs);
}


/**
 * Combines entries from objects, preferring last.
 * @param x an object (updated)
 * @param ys other objects
 * @returns x = x ∪ y₀ ∪ y₁ ∪ ... | [y₀, y₁, ...] = ys
 */
export function concat$(x: Dictionary, ...ys: Dictionary[]): Dictionary {
  return Object.assign(x, ...ys);
}


/**
 * Join entries together into a string.
 * @param x an object
 * @param sep separator [,]
 * @param asc associator [=]
 * @returns "k₀=v₀,k₁=v₁,..." | [kᵢ, vᵢ] ∈ x
 */
export function join(x: Dictionary, sep: string=",", asc: string="="): string {
  let a = "";
  for (const k in x) {
    if (!has(x, k)) continue;
    a += k + asc + x[k] + sep;
  }
  return a.slice(0, -sep.length);
}




// SET OPERATIONS
// --------------

/**
 * Check if objects have no common keys.
 * @param x an object
 * @param y another object
 * @returns x ∩ y = Φ?
 */
export function isDisjoint(x: Dictionary, y: Dictionary): boolean {
  for (const k in x) {
    if (!has(x, k)) continue;
    if (has(y, k)) return false;
  }
  return true;
}


/**
 * Obtain keys present in any object.
 * @param xs objects
 * @returns [k₀, k₁, ...] | [kᵢ, vᵢ] ∈ x₀ ∪ x₁, ...; [x₀, x₁, ...] = xs
 */
export function unionKeys(...xs: Dictionary[]): Set<string> {
  const a = new Set<string>();
  for (const x of xs) {
    for (const k in x)
      if (has(x, k)) a.add(k);
  }
  return a;
}


/**
 * Obtain entries present in any object.
 * @param x an object
 * @param y another object
 * @param fc combine function (a, b)
 * @returns x ∪ y = \{[kᵢ, vᵢ] | [kᵢ, vᵢ] ∈ x or [kᵢ, vᵢ] ∈ y\}
 */
export function union(x: Dictionary, y: Dictionary, fc: CombineFunction | null=null): Dictionary {
  return union$(Object.assign({}, x), y, fc);
}


/**
 * Obtain entries present in any object.
 * @param x an object (updated)
 * @param y another object
 * @param fc combine function (a, b)
 * @returns x = x ∪ y = \{[kᵢ, vᵢ] | [kᵢ, vᵢ] ∈ x or [kᵢ, vᵢ] ∈ y\}
 */
export function union$(x: Dictionary, y: Dictionary, fc: CombineFunction | null=null): Dictionary {
  fc = fc || IDENTITY as CombineFunction;
  for (const k in y) {
    if (!has(y, k)) continue;
    if (!has(x, k)) x[k] = y[k];
    else x[k] = fc(x[k], y[k]);
  }
  return x;
}


/**
 * Obtain keys present in all objects.
 * @param xs objects
 * @returns [k₀, k₁, ...] | [kᵢ, vᵢ] ∈ x₀ ∩ x₁, ...; [x₀, x₁, ...] = xs
 */
export function intersectionKeys(...xs: Dictionary[]): Set<string> {
  const a = new Set<string>();
  if (xs.length===0) return a;
  const x = xs[0], ys = xs.slice(1);
  LOOPX: for(const k in x) {
    if (!has(x, k)) continue;
    for (const y of ys)
      if (!has(y, k)) continue LOOPX;
    a.add(k);
  }
  return a;
}


/**
 * Obtain entries present in both objects.
 * @param x an object
 * @param y another object
 * @param fc combine function (a, b)
 * @returns x ∩ y = \{[kᵢ, vᵢ] | [kᵢ, vᵢ] ∈ x and [kᵢ, vᵢ] ∈ y\}
 */
export function intersection(x: Dictionary, y: Dictionary, fc: CombineFunction | null=null): Dictionary {
  fc = fc || IDENTITY as CombineFunction;
  const a: Dictionary = {};
  for (const k in x) {
    if (!has(x, k)) continue;
    if (!has(y, k)) continue;
    a[k] = fc(x[k], y[k]);
  }
  return a;
}


/**
 * Obtain entries present in both objects.
 * @param x an object (updated)
 * @param y another object
 * @param fc combine function (a, b)
 * @returns x = x ∩ y = \{[kᵢ, vᵢ] | [kᵢ, vᵢ] ∈ x and [kᵢ, vᵢ] ∈ y\}
 */
export function intersection$(x: Dictionary, y: Dictionary, fc: CombineFunction | null=null): Dictionary {
  fc = fc || IDENTITY as CombineFunction;
  for (const k in x) {
    if (!has(x, k)) continue;
    if (!has(y, k)) delete x[k];
    else x[k] = fc(x[k], y[k]);
  }
  return x;
}


/**
 * Obtain entries not present in another object.
 * @param x an object
 * @param y another object
 * @returns x - y = \{[kᵢ, vᵢ] | [kᵢ, vᵢ] ∈ x, [kᵢ, *] ∉ y\}
 */
export function difference(x: Dictionary, y: Dictionary): Dictionary {
  const a: Dictionary = {};
  for (const k in x) {
    if (!has(x, k)) continue;
    if (!has(y, k)) a[k] = x[k];
  }
  return a;
}


/**
 * Obtain entries not present in another object.
 * @param x an object (updated)
 * @param y another object
 * @returns x = x - y = \{[kᵢ, vᵢ] | [kᵢ, vᵢ] ∈ x, [kᵢ, *] ∉ y\}
 */
export function difference$(x: Dictionary, y: Dictionary): Dictionary {
  for (const k in y) {
    if (!has(y, k)) continue;
    if (has(x, k)) delete x[k];
  }
  return x;
}


/**
 * Obtain entries not present in both objects.
 * @param x an object
 * @param y another object
 * @returns x-y ∪ y-x
 */
export function symmetricDifference(x: Dictionary, y: Dictionary): Dictionary {
  const a: Dictionary = {};
  for (const k of unionKeys(x, y)) {
    const xk = has(x, k);
    const yk = has(y, k);
    if (xk && !yk) a[k] = x[k];
    else if (!xk && yk) a[k] = y[k];
  }
  return a;
}


/**
 * Obtain entries not present in both objects.
 * @param x an object (updated)
 * @param y another object
 * @returns x = x-y ∪ y-x
 */
export function symmetricDifference$(x: Dictionary, y: Dictionary): Dictionary {
  for (const k in y) {
    if (!has(y, k)) continue;
    if (has(x, k)) delete x[k];
    else x[k] = y[k];
  }
  return x;
}


/**
 * List cartesian product of objects.
 * @param xs objects
 * @param fm map function (vs)
 * @returns x₀ × x₁ × ... = \{\{[k₀, v₀], [k₁, v₁], ...\} | [k₀, v₀] ∈ x₀, [k₁, v₁] ∈ x₁, ...]\}
 */
export function* cartesianProduct(xs: Dictionary[], fm: MapFunction | null=null): IterableIterator<unknown> {
  fm = fm || IDENTITY;
  const XS = xs.length;
  const kx = xs.map(x => Object.keys(x));
  const ls = kx.map(ks => ks.length);
  const is = kx.map(_ks => 0);
  while (true) {
    const a: Dictionary = {};
    for (let n=0; n<XS; ++n) {
      const i  = is[n], x = xs[n];
      const ks = kx[n], k = ks[i];
      a[k] = x[k];
    }
    yield fm(a, null as unknown as string, null);
    let r = XS-1;
    for(; r>=0; --r) {
      if (++is[r] < ls[r]) break;
      is[r] = 0;
    }
    if (r<0) break;
  }
}
