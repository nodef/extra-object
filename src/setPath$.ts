import is from './is';
import {last} from 'extra-array';
import getPath from './getPath';

/**
 * Sets value at path in a nested object.
 * @param x a nested object (updated)
 * @param p path
 * @param v value
 * @returns x
 */
function setPath$(x: object, p: string[], v: any): any {
  var y = getPath(x, p.slice(0, -1));
  if(is(y)) y[last(p)] = v;
  return x;
}
export default setPath$;
