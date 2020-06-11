/**
 * Gets object without given keys.
 * @param x an object
 * @param ks keys
 */
function rejectAt(x: object, ks: string[]): object {
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!ks.includes(k)) a[k] = x[k];
  }
  return a;
}
export default rejectAt;
