/**
 * Combines entries from objects, preferring last.
 * @param xs objects
 */
function concat(...xs: object[]): object {
  return Object.assign({}, ...xs);
}
export default concat;
