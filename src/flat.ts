import is from './is';

function flatTo(x: object, dep: number, a: object): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(dep!==0 && is(x[k])) flatTo(x[k], dep-1, a);
    else a[k] = x[k];
  }
  return a;
}

/**
 * Flattens nested object to given depth.
 * @param x a nested object
 * @param dep maximum depth (-1)
 */
function flat(x: object, dep: number=-1): object {
  return flatTo(x, dep, {});
}
export default flat;
