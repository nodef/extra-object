import type {mapFn} from './_types';

/**
 * Updates values based on map function.
 * @param x an object
 * @param fm map function (v, k, x)
 */
function map(x: object, fm: mapFn): object {
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    a[k] = fm(x[k], k, x);
  }
  return a;
}
export default map;
