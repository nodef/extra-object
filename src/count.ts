import type {testFn} from './_types';

function count(x: object, fn: testFn, ths: object=null): number {
  var a = 0;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(fn.call(ths, x[k], k, x)) a++;
  }
  return a;
}
export default count;
