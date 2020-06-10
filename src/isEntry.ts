import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function isEntry(x: object, e: [string, any], fc: compareFn=null, fm: mapFn=null): boolean {
  var fc = fc||cmp, fm = fm||id, [k, v] = e;
  return k in x && fc(fm(x[k], k, x), v)===0;
}
export default isEntry;
