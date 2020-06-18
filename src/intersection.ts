import id from './_id';
import type {combineFn} from './_types';

/**
 * Gives entries present in both objects.
 * @param x an object
 * @param y another object
 * @param fc combine function (a, b)
 */
function intersection(x: object, y: object, fc: combineFn=null): object {
  var fc = fc||id as combineFn;
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!y.hasOwnProperty(k)) continue;
    a[k] = fc(x[k], y[k]);
  }
  return a;
}
export default intersection;
