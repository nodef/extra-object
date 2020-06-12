/**
 * Deletes an entry.
 * @param x an object (updated)
 * @param k key
 * @returns x
 */
function remove$(x: object, k: string): object {
  delete x[k];
  return x;
}
export default remove$;
