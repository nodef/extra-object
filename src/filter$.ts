import type {testFn} from './_types';

/**
 * Keeps entries which pass a test.
 * @param x an object (updated)
 * @param ft test function (v, k, x)
 * @returns x
 */
function filter$(x: object, ft: testFn): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!ft(x[k], k, x)) delete x[k];
  }
  return x;
}
export default filter$;
