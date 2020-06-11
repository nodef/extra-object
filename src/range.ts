import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

/**
 * Finds smallest and largest entries.
 * @param x an object
 * @param fc compare function (a, b)
 * @param fm map function (v, k, x)
 * @returns [smallest, largest]
 */
function range(x: object, fc: compareFn=null, fm: mapFn=null): [[string, any], [string, any]] {
  var fc = fc||cmp, fm = fm||id;
  var mk: string, mu: any, mv: any;
  var nk: string, nu: any, nv: any;
  var i = 0;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    var u = x[k], v = fm(u, k, x);
    if(i===0 || fc(v, mv)<0) { mk = k; mu = u; mv = v; }
    if(i===0 || fc(v, nv)>0) { nk = k; nu = u; nv = v; }
    i++;
  }
  return [[mk, mu], [nk, nu]];
}
export default range;
