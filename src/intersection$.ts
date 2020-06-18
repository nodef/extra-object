import id from './_id';
import type {combineFn} from './_types';

/**
 * Gives entries present in both objects.
 * @param x an object (updated)
 * @param y another object
 * @param fn combine function (a, b)
 * @returns x
 */
function intersection$(x: object, y: object, fn: combineFn=null): object {
  var fn = fn||id as combineFn;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!y.hasOwnProperty(k)) delete x[k];
    else x[k] = fn(x[k], y[k]);
  }
  return x;
}
export default intersection$;
