import type {testFn} from './_types';

/**
 * Discards entries which pass a test.
 * @param x an object (updated)
 * @param fn test function (v, k, x)
 * @param ths this argument
 * @returns x
 */
function reject$(x: object, fn: testFn, ths: object=null): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(fn.call(ths, x[k], k, x)) delete x[k];
  }
  return x;
}
export default reject$;
