import {value as arrayValue} from 'extra-array';

/**
 * Picks an arbitrary value.
 * @param x an object
 * @param r random seed 0->1
 */
function value(x: object, r: number=Math.random()): string {
  return arrayValue(Object.keys(x), r);
}
export default value;
