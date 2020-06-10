import type {testFn} from './_types';

function filter(x: object, fn: testFn, ths: object=null): object {
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(fn.call(ths, x[k], k, x)) a[k] = x[k];
  }
  return a;
}
export default filter;
