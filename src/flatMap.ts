import is from './is';
import type {mapFn} from './_types';

function flatMapTo(x: object, fn: mapFn, ths: object, a: object): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var v = fn.call(ths, x[k], k, x);
    if(is(v)) flatMapTo(v, fn, ths, a);
    else a[k] = v;
  }
  return a;
}

/**
 * Flattens nested object, using map function.
 * @param x a nested object
 * @param fn map function (v, k, x)
 * @param ths this argument
 */
function flatMap(x: object, fn: mapFn, ths: object=null): object {
  return flatMapTo(x, fn, ths, {});
}
export default flatMap;
