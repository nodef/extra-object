import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function searchValueAll(x: object, v: any, fc: compareFn=null, fm: mapFn=null): string[] {
  var fc = fc||cmp, fm = fm||id;
  var v1 = fm(v, null, x), a = [];
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var u1 = fm(x[k], k, x);
    if(fc(u1, v1)===0) a.push(x[k]);
  }
  return a;
}
export default searchValueAll;
