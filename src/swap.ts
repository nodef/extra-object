import swap$ from './swap$';

/**
 * Exchanges two values.
 * @param x an object
 * @param k a key
 * @param l another key
 */
function swap(x: object, k: string, l: string): object {
  return swap$(Object.assign({}, x), k, l);
}
export default swap;
