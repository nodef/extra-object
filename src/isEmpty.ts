import size from './size';

/**
 * Checks if object is empty.
 * @param x an object
 */
function isEmpty(x: object): boolean {
  return size(x)===0;
}
export default isEmpty;
