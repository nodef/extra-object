/**
 * Gets values at keys.
 * @param x an object
 * @param ks keys
 */
function getAll(x: object, ks: string[]): any[] {
  return ks.map(k => x[k]);
}
export default getAll;
