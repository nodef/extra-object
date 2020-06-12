import type {testFn} from './_types';

/**
 * Finds values of entries passing a test.
 * @param x an object
 * @param fn test function (v, k, x)
 * @param ths this argument
 */
function findAll(x: object, fn: testFn, ths: object=null): any[] {
  var a = [];
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(fn.call(ths, x[k], k, x)) a.push(x[k]);
  }
  return a;
}
export default findAll;
