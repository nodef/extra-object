/**
 * Gives entries not present in both objects.
 * @param x an object (updated)
 * @param y another object
 * @returns x
 */
function symmetricDifference$(x: object, y: object): object {
  for(var k in y) {
    if(!y.hasOwnProperty(k)) continue;
    if(x.hasOwnProperty(k)) delete x[k];
    else x[k] = y[k];
  }
  return x;
}
export default symmetricDifference$;
