import type {testFn} from './_types';

/**
 * Segregates values by test result.
 * @param x an object
 * @param ft test function (v, k, x)
 * @param ths this argument
 * @returns [satisfies, doesnt]
 */
function partition(x: object, ft: testFn, ths: object=null): [object, object] {
  var t = {}, f = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(ft.call(ths, x[k], k, x)) t[k] = x[k];
    else f[k] = x[k];
  }
  return [t, f];
}
export default partition;
