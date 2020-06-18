import type {calledFn} from './_types';

/**
 * Calls a function for each entry.
 * @param x an object
 * @param fc called function (v, k, x)
 * @param ths this argument
 */
function forEach(x: object, fc: calledFn, ths: object=null): void {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    fc.call(ths, x[k], k, x);
  }
}
export default forEach;
