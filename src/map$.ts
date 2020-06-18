import type {mapFn} from './_types';

/**
 * Updates values based on map function.
 * @param x an object (updated)
 * @param fm map function (v, k, x)
 * @returns x
 */
function map$(x: object, fm: mapFn): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    x[k] = fm(x[k], k, x);
  }
  return x;
}
export default map$;
