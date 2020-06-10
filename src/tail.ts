import shift from './shift';

/**
 * Gets object except first entry.
 * @param x an object
 */
function tail(x: object): object {
  return shift(x);
}
export default tail;
