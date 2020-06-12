import search from './search';
import type {testFn} from './_types';

/**
 * Finds key of an entry passing a test.
 * @param x an object
 * @param fn test function (v, k, x)
 * @param ths this argument
 */
function searchWhile(x: object, fn: testFn, ths: object=null): string {
  return search(x, fn, ths);
}
export default searchWhile;
