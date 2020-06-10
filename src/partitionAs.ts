import type {mapFn} from './_types';

function partitionAs(x: object, fn: mapFn, ths: object=null): Map<any, object> {
  var a = new Map();
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var v1 = fn.call(ths, x[k], k, x);
    if(!a.has(v1)) a.set(v1, {});
    a.get(v1)[k] = x[k];
  }
  return a;
}
export default partitionAs;
