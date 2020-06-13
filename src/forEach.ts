import type {calledFn} from './_types';

/**
 * Calls a function for each entry.
 * @param x an object
 * @param fn called function (v, k, x)
 * @param ths this argument
 */
function forEach(x: object, fn: calledFn, ths: object=null): void {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    fn.call(ths, x[k], k, x);
  }
}
export default forEach;
