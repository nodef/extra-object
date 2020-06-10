import drop$ from './drop$';

/**
 * Removes first entry.
 * @param x an object (updated)
 * @returns x
 */
function shift$(x: object): object {
  return drop$(x, 1);
}
export default shift$;
