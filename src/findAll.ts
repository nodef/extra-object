import type {testFn} from './_types';

function findAll(x: object, fn: testFn, ths: object=null): any[] {
  var a = [];
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(fn.call(ths, x[k], k, x)) a.push(x[k]);
  }
  return a;
}
export default findAll;
