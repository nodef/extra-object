import type {testFn} from './_types';

function some(x: object, fn: testFn, ths: object=null) {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(fn.call(ths, x[k], k, x)) return true;
  }
  return false;
}
export default some;
