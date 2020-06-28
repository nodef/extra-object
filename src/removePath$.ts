import is from './is';
import {last} from 'extra-array';
import getPath from './getPath';

/**
 * Removes value at path in a nested object.
 * @param x a nested object (updated)
 * @param p path
 * @returns x
 */
function removePath$(x: object, p: string[]): any {
  var y = getPath(x, p.slice(0, -1));
  if(is(y)) delete y[last(p)];
  return x;
}
export default removePath$;
