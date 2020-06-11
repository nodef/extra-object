/**
 * Combines entries from objects, preferring last.
 * @param x an object (updated)
 * @param ys other objects
 * @returns x
 */
function concat$(x: object, ...ys: object[]): object {
  return Object.assign(x, ...ys);
}
export default concat$;
