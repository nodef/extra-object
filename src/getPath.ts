import is from './is';

/**
 * Gets value at path in a nested object.
 * @param x a nested object
 * @param p path
 */
function getPath(x: object, p: string[]): any {
  for(var k of p)
    x = is(x)? x[k] : undefined;
  return x;
}
export default getPath;
