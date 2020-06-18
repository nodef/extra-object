/**
 * Gives entries of object not present in another.
 * @param x an object
 * @param y another object
 */
function difference(x: object, y: object): object {
  var a = {};
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(!y.hasOwnProperty(k)) a[k] = x[k];
  }
  return a;
}
export default difference;
