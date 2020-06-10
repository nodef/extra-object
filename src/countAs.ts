import type {mapFn} from './_types';

function countAs(x: object, fn: mapFn, ths: object=null): Map<any, number> {
  var a = new Map();
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var v1 = fn.call(ths, x[k], k, x);
    var n = a.get(v1)||0;
    a.set(v1, n+1);
  }
  return a;
}
export default countAs;
