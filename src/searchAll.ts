import type {testFn} from './_types';

/**
 * Finds keys of entries passing a test.
 * @param x an object
 * @param fn test function (v, k, x)
 * @param ths this argument
 */
function searchAll(x: object, fn: testFn, ths: object=null): string[] {
  var a = [];
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(fn.call(ths, x[k], k, x)) a.push(k);
  }
  return a;
}
export default searchAll;
