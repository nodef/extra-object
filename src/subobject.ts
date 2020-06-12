import filterAt from './filterAt';
import {subsequence} from 'extra-array';

/**
 * Picks an arbitrary subobject.
 * @param x an object
 * @param n number of entries (-1 => any)
 * @param r random seed 0->1
 */
function subobject(x: object, n: number=-1, r: number=Math.random()): object {
  var ks = subsequence(Object.keys(x), n, r);
  return filterAt(x, ks);
}
export default subobject;
