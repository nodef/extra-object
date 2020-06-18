import type {testFn} from './_types';

/**
 * Discards entries which pass a test.
 * @param x an object
 * @param ft test function (v, k, x)
 */
function reject(x: object, ft: testFn): object {
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!ft(x[k], k, x)) a[k] = x[k];
  }
  return a;
}
export default reject;
