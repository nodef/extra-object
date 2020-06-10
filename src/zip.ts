import id from './_id';
import unionKeys from './unionKeys';
import {some} from 'extra-iterable';
import type {mapFn, tillFn} from './_types';

function zip(xs: object[], fm: mapFn=null, ft: tillFn=null, vd?: any): object {
  var fm = fm||id, ft = ft||some as tillFn;
  var ks = unionKeys(...xs), a = {};
  for(var k of ks) {
    var vs = [], ds = [], i = 0;
    for(var x of xs) {
      ds[i] = !x.hasOwnProperty(k);
      vs[i] = ds[i]? vd : x[k];
      i++;
    }
    if(ft(ds)) break;
    a[k] = fm(vs, k, null);
  }
  return a;
}
export default zip;
