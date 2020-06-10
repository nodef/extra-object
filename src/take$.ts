/**
 * Extracts given number of entries from object.
 * @param x an object (updated)
 * @param n number of entries (1)
 * @returns x
 */
function take$(x: object, n: number=1) {
  var i = 0;
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(++i>n) delete x[k];
  }
  return x;
}
export default take$;
