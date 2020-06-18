import id from './_id';
import type {combineFn} from './_types';

/**
 * Gives entries present in any object.
 * @param x an object (updated)
 * @param y another object
 * @param fc combine function (a, b)
 * @returns x
 */
function union$(x: object, y: object, fc: combineFn=null): object {
  var fc = fc||id as combineFn;
  for(var k in y) {
    if(!y.hasOwnProperty(k)) continue;
    if(!x.hasOwnProperty(k)) x[k] = y[k];
    else x[k] = fc(x[k], y[k]);
  }
  return x;
}
export default union$;
