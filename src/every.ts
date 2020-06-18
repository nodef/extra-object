import scanWhile from './scanWhile';
import type {testFn} from './_types';

/**
 * Checks if all values satisfy a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @param ths this argument
 */
function every(x: object, ft: testFn, ths: object=null): boolean {
  return scanWhile(x, ft, ths)==null;
}
export default every;
