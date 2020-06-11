import id from './_id';
import type {mapFn} from './_types';

/**
 * Segregates values by similarity.
 * @param x an object
 * @param fn map function (v, k, x)
 * @param ths this argument
 */
function partitionAs(x: object, fn: mapFn, ths: object=null): Map<any, object> {
  var fn = fn||id;
  var a = new Map();
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var v1 = fn.call(ths, x[k], k, x);
    if(!a.has(v1)) a.set(v1, {});
    a.get(v1)[k] = x[k];
  }
  return a;
}
export default partitionAs;
