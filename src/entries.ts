/**
 * Lists all key-value pairs.
 * @param x an object
 */
function entries(x: object): [string, any][] {
  return Object.entries(x);
}
export default entries;
