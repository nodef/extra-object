import type {testFn} from './_types';

/**
 * Checks if any value satisfies a test.
 * @param x an object
 * @param fn test function (v, k, x)
 * @param ths this argument
 */
function some(x: object, fn: testFn, ths: object=null) {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(fn.call(ths, x[k], k, x)) return true;
  }
  return false;
}
export default some;
