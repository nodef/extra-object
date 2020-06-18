import type {calledFn} from './_types';

/**
 * Calls a function for each entry.
 * @param x an object
 * @param fc called function (v, k, x)
 */
function forEach(x: object, fc: calledFn): void {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    fc(x[k], k, x);
  }
}
export default forEach;
