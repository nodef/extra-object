import scanUntil from './scanUntil';
import type {testFn} from './_types';

/**
 * Checks if any value satisfies a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @param ths this argument
 */
function some(x: object, ft: testFn, ths: object=null): boolean {
  return scanUntil(x, ft, ths)!=null;
}
export default some;
