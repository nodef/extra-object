import id from './_id';
import type {mapFn} from './_types';

/**
 * Counts occurrences of values.
 * @param x an object
 * @param fn map function (v, k, x)
 * @param ths this argument
 * @returns Map {value => count}
 */
function countAs(x: object, fn: mapFn, ths: object=null): Map<any, number> {
  var fn = fn||id;
  var a = new Map();
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var v1 = fn.call(ths, x[k], k, x);
    var n = a.get(v1)||0;
    a.set(v1, n+1);
  }
  return a;
}
export default countAs;
