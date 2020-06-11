import id from './_id';
import cmp from './_cmp';
import unionKeys from './unionKeys';
import type {compareFn, mapFn} from './_types';

/**
 * Compares two objects.
 * @param x an object
 * @param y another object
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns x=y: 0, otherwise: -ve/+ve
 */
function compare(x: object, y: object, fc: compareFn=null, fm: mapFn=null): number {
  var fc = fc||cmp, fm = fm||id;
  var ks = unionKeys(x, y);
  for(var k of ks) {
    if(!x.hasOwnProperty(k)) return -1;
    if(!y.hasOwnProperty(k)) return 1;
    var u = fm(x[k], k, x);
    var v = fm(y[k], k, y);
    var c = fc(u, v);
    if(c!==0) return c;
  }
  return 0;
}
export default compare;
