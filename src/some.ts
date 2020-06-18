import scanUntil from './scanUntil';
import type {testFn} from './_types';

/**
 * Checks if any value satisfies a test.
 * @param x an object
 * @param ft test function (v, k, x)
 */
function some(x: object, ft: testFn): boolean {
  return scanUntil(x, ft)!=null;
}
export default some;
