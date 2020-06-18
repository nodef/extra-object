import type {testFn} from './_types';

/**
 * Finds value of an entry passing a test.
 * @param x an object
 * @param ft test function (v, k, x)
 */
function find(x: object, ft: testFn): any {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(ft(x[k], k, x)) return x[k];
  }
}
export default find;
