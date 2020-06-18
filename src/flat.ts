import is from './is';
import type {mapFn, testFn} from './_types';
import id from './_id';

function flatTo(x: object, dep: number, fm: mapFn, ft: testFn, a: object): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var v1 = fm(x[k], k, x);
    if(dep!==0 && ft(v1, k, x)) flatTo(v1, dep-1, fm, ft, a);
    else a[k] = v1;
  }
  return a;
}

/**
 * Flattens nested object to given depth.
 * @param x a nested object
 * @param n maximum depth (-1 => all)
 * @param fm map function (v, k, x)
 * @param ft test function (v, k, x)
 */
function flat(x: object, n: number=-1, fm: mapFn=null, ft: testFn=null): object {
  var fm = fm||id, ft = ft||is;
  return flatTo(x, n, fm, ft, {});
}
export default flat;
