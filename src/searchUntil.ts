import type {testFn} from './_types';

/**
 * Finds key of an entry failing a test.
 * @param x an object
 * @param fn test function (v, k, x)
 * @param ths this argument
 */
function searchUntil(x: object, fn: testFn, ths: object=null): string {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!fn.call(ths, x[k], k, x)) return k;
  }
  return null;
}
export default searchUntil;
