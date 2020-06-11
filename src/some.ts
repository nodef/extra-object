import search from './search';
import type {testFn} from './_types';

/**
 * Checks if any value satisfies a test.
 * @param x an object
 * @param fn test function (v, k, x)
 * @param ths this argument
 */
function some(x: object, fn: testFn, ths: object=null) {
  return search(x, fn, ths)!=null;
}
export default some;
