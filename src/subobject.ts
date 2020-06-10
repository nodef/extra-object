import filterAt from './filterAt';
import {subsequence} from 'extra-array';

function subobject(x: object, n: number=-1, r: number=Math.random()) {
  var ks = subsequence(Object.keys(x), n, r);
  return filterAt(x, ks);
}
export default subobject;
