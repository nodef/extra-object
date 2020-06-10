import drop from './drop';

/**
 * Removes first entry.
 * @param x an object
 */
function shift(x: object): object {
  return drop(x, 1);
}
export default shift;
