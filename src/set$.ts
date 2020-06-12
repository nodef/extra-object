/**
 * Sets value at key.
 * @param x an object (updated)
 * @param k key
 * @param v value
 * @returns x
 */
function set$(x: object, k: string, v: any): object {
  x[k] = v;
  return x;
}
export default set$;
