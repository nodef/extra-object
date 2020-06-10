/**
 * Compares two values.
 * @param a a value
 * @param b another value
 * @returns a<b: -ve, a=b: 0, a>b: +ve
 */
function cmp(a: any, b: any): number {
  return a<b? -1:(a>b? 1:0);
}
export default cmp;
