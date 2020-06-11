import compare from './compare';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if two objects are equal.
 * @param x an object
 * @param y another object
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 */
function isEqual(x: object, y: object, fc: compareFn=null, fm: mapFn=null): boolean {
  return compare(x, y, fc, fm)===0;
}
export default isEqual;
