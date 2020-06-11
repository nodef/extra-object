import type {reduceFn} from './_types';

/**
 * Reduces values to a single value.
 * @param x an object
 * @param fn reduce function (acc, v, k, x)
 * @param acc initial value
 */
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
