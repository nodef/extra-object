/**
 * Keeps first n entries only.
 * @param x an object
 * @param n number of entries (1)
 */
function take(x: object, n: number=1): object {
  var i = 0, a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(i++>=n) break;
    a[k] = x[k];
  }
  return a;
}
export default take;
