import {value} from 'extra-array';

/**
 * Picks an arbitrary entry.
 * @param x an object
 * @param r random seed 0->1
 */
function entry(x: object, r: number=Math.random()): [string, any] {
  return value(Object.entries(x), r);
}
export default entry;
