import id from './_id';
import type {mapFn} from './_types';

/**
 * Lists cartesian product of objects.
 * @param xs objects
 * @param fm map function (vs)
 */
function* cartesianProduct(xs: object[], fm: mapFn=null): IterableIterator<any> {
  var fm = fm||id;
  var XS  = xs.length;
  var kss = xs.map(x => Object.keys(x));
  var ls = kss.map(ks => ks.length);
  var is = kss.map(ks => 0);
  while(true) {
    var a = {};
    for(var n=0; n<XS; n++) {
      var i  = is[n],  x = xs[n];
      var ks = kss[n], k = ks[i];
      a[k] = x[k];
    }
    yield fm(a, null, null);
    for(var r=XS-1; r>=0; r--) {
      is[r]++;
      if(is[r]<ls[r]) break;
      is[r] = 0;
    }
    if(r<0) break;
  }
}
export default cartesianProduct;
