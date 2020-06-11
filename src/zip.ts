import id from './_id';
import unionKeys from './unionKeys';
import {some} from 'extra-iterable';
import type {mapFn, tillFn} from './_types';

/**
 * Combines entries from objects.
 * @param xs objects
 * @param fm map function (vs, k, null)
 * @param ft till function (dones) (some)
 * @param vd default value
 */
function zip(xs: object[], fm: mapFn=null, ft: tillFn=null, vd?: any): object {
  var fm = fm||id, ft = ft||some as tillFn;
  var ks = unionKeys(...xs), a = {};
  for(var k of ks) {
    var ds = xs.map(x => !x.hasOwnProperty(k));
    if(ft(ds)) break;
    var vs = xs.map(x => !x.hasOwnProperty(k)? vd : x[k]);
    a[k] = fm(vs, k, null);
  }
  return a;
}
export default zip;
