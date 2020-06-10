import type {testFn} from './_types';

function partition(x: object, fn: testFn, ths: object=null): [object, object] {
  var t = {}, f = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(fn.call(ths, x[k], k, x)) t[k] = x[k];
    else f[k] = x[k];
  }
  return [t, f];
}
export default partition;
