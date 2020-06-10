import type {compareFn, mapFn} from './_types';

function isSubobject(x: object, y: object, fc: compareFn=null, fm: mapFn=null): boolean {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!y.hasOwnProperty(k)) return false;
    var u1 = fm(x[k], k, x);
    var v1 = fm(y[k], k, y);
    if(fc(u1, v1)!==0) return false;
  }
  return true;
}
export default isSubobject;
