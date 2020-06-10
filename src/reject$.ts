import type {testFn} from './_types';

function reject$(x: object, fn: testFn, ths: object=null): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(fn.call(ths, x[k], k, x)) delete x[k];
  }
  return x;
}
export default reject$;
