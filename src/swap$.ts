/**
 * Exchanges two values.
 * @param x an object (updated)
 * @param k a key
 * @param l another key
 * @returns x
 */
function swap$(x: object, k: string, l: string): object {
  var t = x[k]; x[k] = x[l]; x[l] = t;
  return x;
}
export default swap$;
