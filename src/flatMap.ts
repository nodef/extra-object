import id from './_id';
import is from './is';
import type {mapFn, testFn} from './_types';

/**
 * Flattens nested object, using map function.
 * @param x a nested object
 * @param fm map function (v, k, x)
 * @param ft test function (v, k, x)
 */
function flatMap(x: object, fm: mapFn=null, ft: testFn=null): object {
  var fm = fm||id, ft = ft ||is;
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var v1 = fm(x[k], k, x);
    if(ft(v1, k, x)) Object.assign(a, v1);
    else a[k] = v1;
  }
  return a;
}
export default flatMap;
