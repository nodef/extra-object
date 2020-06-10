import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function isKeyNone(x: object, k: string): boolean {
  return x.hasOwnProperty(k);
}

function isKeyDual(x: object, k: string, fc: compareFn, fm: mapFn): boolean {
  var fc = fc||cmp, fm = fm||id;
  var k1 = fm(k, k, null);
  for(var j of Object.keys(x)) {
    var j1 = fm(j, j, x);
    if(fc(j1, k1)===0) return true;
  }
  return false;
}

/**
 * Checks if object has a key.
 * @param x an object
 * @param k key?
 * @param fc compare function (a, b)
 * @param fm map function (k, k, x)
 */
function isKey(x: object, k: string, fc: compareFn=null, fm: mapFn=null): boolean {
  if(fc || fm) return isKeyDual(x, k, fc, fm);
  else return isKeyNone(x, k);
}
export default isKey;
