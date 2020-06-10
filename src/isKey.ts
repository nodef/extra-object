/**
 * Checks if object has a key.
 * @param x an object
 * @param k key?
 */
function isKeyNone(x: object, k: string): boolean {
  return x.hasOwnProperty(k);
}

function isKeyDual(x: object, k: string) {

}
// TODO: isKey(x, k, fc, fm)
export default isKey;
