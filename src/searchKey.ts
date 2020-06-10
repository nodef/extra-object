import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function searchKey(x: object, k: string, fc: compareFn=null, fm: mapFn=null): string {
  var fc = fc||cmp, fm = fm||id;
  var k1 = fm(k, k, null);
  for(var j in x) {
    if(!x.hasOwnProperty(j)) continue;
    var j1 = fm(j, j, x);
    if(fc(j1, k1)===0) return j;
  }
}
export default searchKey;
