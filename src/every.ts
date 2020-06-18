import scanWhile from './scanWhile';
import type {testFn} from './_types';

/**
 * Checks if all values satisfy a test.
 * @param x an object
 * @param ft test function (v, k, x)
 */
function every(x: object, ft: testFn): boolean {
  return scanWhile(x, ft)==null;
}
export default every;
