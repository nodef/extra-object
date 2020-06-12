import type {mapFn} from './_types';

/**
 * Updates values based on map function.
 * @param x an object
 * @param fn map function (v, k, x)
 * @param ths this argument
 */
function map(x: object, fn: mapFn, ths: object=null): object {
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    a[k] = fn.call(ths, x[k], k, x);
  }
  return a;
}
export default map;
