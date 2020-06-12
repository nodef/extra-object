import set$ from './set$';

/**
 * Sets value at key.
 * @param x an object
 * @param k key
 * @param v value
 */
function set(x: object, k: string, v: any): object {
  return set$(Object.assign({}, x), k, v);
}
export default set;
