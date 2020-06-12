import scanWhile from './scanWhile';
import type {testFn} from './_types';

/**
 * Checks if all values satisfy a test.
 * @param x an object
 * @param fn test function (v, k, x)
 * @param ths this argument
 */
function every(x: object, fn: testFn, ths: object=null): boolean {
  return scanWhile(x, fn, ths)==null;
}
export default every;
