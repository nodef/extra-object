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
