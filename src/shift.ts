/**
 * Removes first entry.
 * @param x an object
 */
function shift(x: object): object {
  var i = 0, a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(i++>0) a[k] = x[k];
  }
  return a;
}
export default shift;
