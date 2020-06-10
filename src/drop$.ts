/**
 * Drops given number of entries.
 * @param x an object (updated)
 * @param n number of entries (1)
 * @returns x
 */
function drop$(x: object, n: number=1): object {
  var i = 0;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(i++<n) delete x[k];
  }
  return x;
}
export default drop$;
