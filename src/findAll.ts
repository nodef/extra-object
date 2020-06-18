import type {testFn} from './_types';

/**
 * Finds values of entries passing a test.
 * @param x an object
 * @param ft test function (v, k, x)
 */
function findAll(x: object, ft: testFn): any[] {
  var a = [];
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(ft(x[k], k, x)) a.push(x[k]);
  }
  return a;
}
export default findAll;
