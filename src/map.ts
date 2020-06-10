import type {mapFn} from './_types';

function map(x: object, fn: mapFn, ths: object=null): object {
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var [l, v] = fn(x[k], k, x);
    a[l] = v;
  }
  return a;
}
export default map;
