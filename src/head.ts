/**
 * Gets first entry.
 * @param x an object
 */
function head(x: object): [string, any] {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    return [k, x[k]];
  }
  return [null, undefined];
}
export default head;
