import type {mapFn} from './_types';

function map$(x: object, fn: mapFn, ths: object=null): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var [l, v] = fn(x[k], k, x);
    if(l!==k) delete x[k];
    x[l] = v;
  }
  return x;
}
export default map$;
