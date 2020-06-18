import id from './_id';
import type {mapFn} from './_types';

/**
 * Segregates values by similarity.
 * @param x an object
 * @param fm map function (v, k, x)
 * @param ths this argument
 */
function partitionAs(x: object, fm: mapFn, ths: object=null): Map<any, object> {
  var fm = fm||id;
  var a = new Map();
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var v1 = fm.call(ths, x[k], k, x);
    if(!a.has(v1)) a.set(v1, {});
    a.get(v1)[k] = x[k];
  }
  return a;
}
export default partitionAs;
