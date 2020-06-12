import rejectAt from './rejectAt';

/**
 * Deletes an entry.
 * @param x an object
 * @param k key
 */
function remove(x: object, k: string): object {
  return rejectAt(x, [k]);
}
export default remove;
