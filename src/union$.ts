import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function union$(x: object, y: object, fc: compareFn=null, fm: mapFn=null): object {
  var fc = fc||cmp, fm = fm||id;
  y: for(var k in y) {
    if(!y.hasOwnProperty(k)) continue;
    var v1 = fm(y[k], k, y);
    for(var j in x) {
      if(!x.hasOwnProperty(j)) continue;
      var u1 = fm(x[j], j, x);
      if(fc(u1, v1)===0) continue y;
    }
    x[k] = y[k];
  }
  return x;
}
export default union$;
