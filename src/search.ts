import type {testFn} from './_types';

function search(x: object, fn: testFn, ths: object=null): string {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(fn.call(ths, x[k], k, x)) return k;
  }
}
export default search;
