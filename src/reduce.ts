import type {reduceFn} from './_types';

function reduce<T>(x: object, fn: reduceFn<T>, acc?: T): T {
  var init = arguments.length <= 2;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(init) { acc = x[k]; init = false; }
    else acc = fn(acc, x[k], k, x);
  }
  return acc;
}
export default reduce;
