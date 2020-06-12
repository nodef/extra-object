import type {mapFn} from './_types';

/**
 * Updates values based on map function.
 * @param x an object (updated)
 * @param fn map function (v, k, x)
 * @param ths this argument
 * @returns x
 */
function map$(x: object, fn: mapFn, ths: object=null): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    x[k] = fn.call(ths, x[k], k, x);
  }
  return x;
}
export default map$;
