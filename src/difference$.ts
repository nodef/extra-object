/**
 * Gives entries of object not present in another.
 * @param x an object (updated)
 * @param y another object
 * @returns x
 */
function difference$(x: object, y: object): object {
  for(var k in y) {
    if(!y.hasOwnProperty(k)) continue;
    if(x.hasOwnProperty(k)) delete x[k];
  }
  return x;
}
export default difference$;
