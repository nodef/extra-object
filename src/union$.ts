import id from './_id';
import type {combineFn} from './_types';

/**
 * Gives entries present in any object.
 * @param x an object (updated)
 * @param y another object
 * @param fn combine function (a, b)
 * @returns x
 */
function union$(x: object, y: object, fn: combineFn=null): object {
  var fn = fn||id as combineFn;
  for(var k in y) {
    if(!y.hasOwnProperty(k)) continue;
    if(!x.hasOwnProperty(k)) x[k] = y[k];
    else x[k] = fn(x[k], y[k]);
  }
  return x;
}
export default union$;
