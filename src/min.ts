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
