/**
 * Keeps first n entries only.
 * @param x an object (updated)
 * @param n number of entries (1)
 * @returns x
 */
function take$(x: object, n: number=1): object {
  var i = 0;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(i++>=n) delete x[k];
  }
  return x;
}
export default take$;
