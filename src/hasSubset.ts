import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if object has a subset.
 * @param x an object
 * @param y subset?
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 */
function hasSubset(x: object, y: object, fc: compareFn=null, fm: mapFn=null): boolean {
  var fc = fc||cmp, fm = fm||id;
  for(var k in y) {
    if(!y.hasOwnProperty(k)) continue;
    if(!x.hasOwnProperty(k)) return false;
    var u1 = fm(x[k], k, x);
    var v1 = fm(y[k], k, y);
    if(fc(u1, v1)!==0) return false;
  }
  return true;
}
export default hasSubset;
