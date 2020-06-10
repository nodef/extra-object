import type {testFn} from './_types';

function find(x: object, fn: testFn, ths: object=null): any {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(fn.call(ths, x[k], k, x)) return x[k];
  }
}
export default find;
