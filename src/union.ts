import union$ from './union$';
import type {combineFn} from './_types';

/**
 * Gives entries present in any object.
 * @param x an object
 * @param y another object
 * @param fn combine function (a, b)
 */
function union(x: object, y: object, fn: combineFn=null): object {
  return union$(Object.assign({}, x), y, fn);
}
export default union;
