import id from './_id';
import is from './is';
import type {mapFn} from './_types';

/**
 * Flattens nested object, using map function.
 * @param x a nested object
 * @param fm map function (v, k, x)
 * @param ths this argument
 */
function flatMap(x: object, fm: mapFn=null, ths: object=null): object {
  var fm = fm||id;
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var v1 = fm.call(ths, x[k], k, x);
    if(is(v1)) Object.assign(a, v1);
    else a[k] = v1;
  }
  return a;
}
export default flatMap;
