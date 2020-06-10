import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function searchValue(x: object, v: any, fc: compareFn=null, fm: mapFn=null): string {
  var fc = fc||cmp, fm = fm||id;
  var v1 = fm(v, null, x);
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var u1 = fm(v, k, x);
    if(fc(u1, v1)===0) return k;
  }
}
export default searchValue;