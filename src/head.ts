/**
 * Gets first entry.
 * @param x an object
 * @param ed default entry
 */
function head(x: object, ed: [string, any]=[] as any): [string, any] {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    return [k, x[k]];
  }
  return ed;
}
export default head;
