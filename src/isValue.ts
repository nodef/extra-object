import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function isValueNone(x: object, v: any): boolean {
  return Object.values(x).includes(v);
}

function isValueDual(x: object, v: any, fc: compareFn, fm: mapFn): boolean {
  var fc = fc||cmp, fm = fm||id;
  var v1 = fm(v, null, null);
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var u1 = fm(x[k], k, x);
    if(fc(u1, v1)===0) return true;
  }
  return false;
}

/**
 * Checks if object has a value.
 * @param x an object
 * @param v value?
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 */
function isValue(x: object, v: any, fc: compareFn=null, fm: mapFn=null): boolean {
  if(fc || fm) return isValueDual(x, v, fc, fm);
  else return isValueNone(x, v);
}
export default isValue;
