import search from './search';
import type {testFn} from './_types';

/**
 * Finds key of first entry passing a test.
 * @param x an object
 * @param ft test function (v, k, x)
 */
function scanUntil(x: object, ft: testFn): string {
  return search(x, ft);
}
export default scanUntil;
