/**
 * Checks if object has a key.
 * @param x an object
 * @param k key?
 */
function isKey(x: object, k: string): boolean {
  return x.hasOwnProperty(k);
}
// TODO: isKey(x, k, fc, fm)
export default isKey;
