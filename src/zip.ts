import unionKeys from './unionKeys';
import type {mapFn, tillFn} from './_types';

function zip(xs: object[], fm: mapFn, ft: tillFn, vd?: any): object {
  var ks = unionKeys(...xs), a = {};
  for(var k of ks) {
    var ds = xs.map(x => k in x);
    if(ft(ds)) break;
    var vs = xs.map(x => x[k]);
    a[k] = fm(vs, k, null);
  }
  return a;
}
export default zip;
