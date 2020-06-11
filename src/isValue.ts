import searchValue from './searchValue';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if object has a value.
 * @param x an object
 * @param v value?
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 */
function isValue(x: object, v: any, fc: compareFn=null, fm: mapFn=null): boolean {
  return searchValue(x, v, fc, fm)!=null;
}
export default isValue;
