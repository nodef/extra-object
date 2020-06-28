import is from './is';

/**
 * Checks if nested object has a path.
 * @param x a nested object
 * @param p path
 */
function hasPath(x: object, p: string[]): boolean {
  for(var k of p) {
    if(!is(x)) return false;
    x = x[k];
  }
  return true;
}
export default hasPath;
