/**
 * Removes first n entries.
 * @param x an object
 * @param n number of entries (1)
 */
function drop(x: object, n: number=1): object {
  var i = 0, a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(i++>n) a[k] = x[k];
  }
  return a;
}
export default drop;
