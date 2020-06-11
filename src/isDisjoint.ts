/**
 * Checks if objects have no common keys.
 * @param x an object
 * @param y another object
 */
function isDisjoint(x: object, y: object): boolean {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    if(y.hasOwnProperty(k)) return false;
  }
  return true;
}
export default isDisjoint;
