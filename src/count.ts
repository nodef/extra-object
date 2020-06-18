import type {testFn} from './_types';

/**
 * Counts values which satisfy a test.
 * @param x an object
 * @param ft test function (v, k, x)
 * @param ths this argument
 */
function count(x: object, ft: testFn, ths: object=null): number {
  var a = 0;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(ft.call(ths, x[k], k, x)) a++;
  }
  return a;
}
export default count;
