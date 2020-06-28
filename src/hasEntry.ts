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
