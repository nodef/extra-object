import {value} from 'extra-array';

/**
 * Picks an arbitrary key.
 * @param x an object
 * @param r random seed 0->1
 */
function key(x: object, r: number=Math.random()): string {
  return value(Object.keys(x), r);
}
export default key;
