/**
 * Gets object with given keys.
 * @param x an object
 * @param ks keys
 */
function filterAt(x: object, ks: string[]): object {
  var a = {};
  for(var k of ks)
    if(x.hasOwnProperty(k)) a[k] = x[k];
  return a;
}
export default filterAt;
